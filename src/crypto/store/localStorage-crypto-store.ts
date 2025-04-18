/*
Copyright 2017 - 2021 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { logger } from "../../logger.ts";
import { MemoryCryptoStore } from "./memory-crypto-store.ts";
import {
    type CryptoStore,
    type ISession,
    type SessionExtended,
    type ISessionInfo,
    type IWithheld,
    MigrationState,
    type Mode,
    type SecretStorePrivateKeys,
    SESSION_BATCH_SIZE,
    type InboundGroupSessionData,
    type IRoomEncryption,
} from "./base.ts";
import { type CrossSigningKeyInfo } from "../../crypto-api/index.ts";

/**
 * Internal module. Partial localStorage backed storage for e2e.
 * This is not a full crypto store, just the in-memory store with
 * some things backed by localStorage. It exists because indexedDB
 * is broken in Firefox private mode or set to, "will not remember
 * history".
 */

const E2E_PREFIX = "crypto.";
const KEY_END_TO_END_MIGRATION_STATE = E2E_PREFIX + "migration";
const KEY_END_TO_END_ACCOUNT = E2E_PREFIX + "account";
const KEY_CROSS_SIGNING_KEYS = E2E_PREFIX + "cross_signing_keys";
const KEY_INBOUND_SESSION_PREFIX = E2E_PREFIX + "inboundgroupsessions/";
const KEY_INBOUND_SESSION_WITHHELD_PREFIX = E2E_PREFIX + "inboundgroupsessions.withheld/";
const KEY_ROOMS_PREFIX = E2E_PREFIX + "rooms/";
const KEY_SESSIONS_NEEDING_BACKUP = E2E_PREFIX + "sessionsneedingbackup";

function keyEndToEndSessions(deviceKey: string): string {
    return E2E_PREFIX + "sessions/" + deviceKey;
}

function keyEndToEndInboundGroupSession(senderKey: string, sessionId: string): string {
    return KEY_INBOUND_SESSION_PREFIX + senderKey + "/" + sessionId;
}

function keyEndToEndInboundGroupSessionWithheld(senderKey: string, sessionId: string): string {
    return KEY_INBOUND_SESSION_WITHHELD_PREFIX + senderKey + "/" + sessionId;
}

function keyEndToEndRoomsPrefix(roomId: string): string {
    return KEY_ROOMS_PREFIX + roomId;
}

export class LocalStorageCryptoStore extends MemoryCryptoStore implements CryptoStore {
    public static exists(store: Storage): boolean {
        const length = store.length;
        for (let i = 0; i < length; i++) {
            if (store.key(i)?.startsWith(E2E_PREFIX)) {
                return true;
            }
        }
        return false;
    }

    public constructor(private readonly store: Storage) {
        super();
    }

    /**
     * Returns true if this CryptoStore has ever been initialised (ie, it might contain data).
     *
     * Implementation of {@link CryptoStore.containsData}.
     *
     * @internal
     */
    public async containsData(): Promise<boolean> {
        return LocalStorageCryptoStore.exists(this.store);
    }

    /**
     * Get data on how much of the libolm to Rust Crypto migration has been done.
     *
     * Implementation of {@link CryptoStore.getMigrationState}.
     *
     * @internal
     */
    public async getMigrationState(): Promise<MigrationState> {
        return getJsonItem(this.store, KEY_END_TO_END_MIGRATION_STATE) ?? MigrationState.NOT_STARTED;
    }

    /**
     * Set data on how much of the libolm to Rust Crypto migration has been done.
     *
     * Implementation of {@link CryptoStore.setMigrationState}.
     *
     * @internal
     */
    public async setMigrationState(migrationState: MigrationState): Promise<void> {
        setJsonItem(this.store, KEY_END_TO_END_MIGRATION_STATE, migrationState);
    }

    // Olm Sessions

    public countEndToEndSessions(txn: unknown, func: (count: number) => void): void {
        let count = 0;
        for (let i = 0; i < this.store.length; ++i) {
            const key = this.store.key(i);
            if (key?.startsWith(keyEndToEndSessions(""))) {
                const sessions = getJsonItem(this.store, key);
                count += Object.keys(sessions ?? {}).length;
            }
        }
        func(count);
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _getEndToEndSessions(deviceKey: string): Record<string, ISessionInfo> {
        const sessions = getJsonItem(this.store, keyEndToEndSessions(deviceKey));
        const fixedSessions: Record<string, ISessionInfo> = {};

        // fix up any old sessions to be objects rather than just the base64 pickle
        for (const [sid, val] of Object.entries(sessions || {})) {
            if (typeof val === "string") {
                fixedSessions[sid] = {
                    session: val,
                };
            } else {
                fixedSessions[sid] = val;
            }
        }

        return fixedSessions;
    }

    public getEndToEndSession(
        deviceKey: string,
        sessionId: string,
        txn: unknown,
        func: (session: ISessionInfo) => void,
    ): void {
        const sessions = this._getEndToEndSessions(deviceKey);
        func(sessions[sessionId] ?? {});
    }

    public getEndToEndSessions(
        deviceKey: string,
        txn: unknown,
        func: (sessions: { [sessionId: string]: ISessionInfo }) => void,
    ): void {
        func(this._getEndToEndSessions(deviceKey) ?? {});
    }

    public storeEndToEndSession(deviceKey: string, sessionId: string, sessionInfo: ISessionInfo, txn: unknown): void {
        const sessions = this._getEndToEndSessions(deviceKey) || {};
        sessions[sessionId] = sessionInfo;
        setJsonItem(this.store, keyEndToEndSessions(deviceKey), sessions);
    }

    /**
     * Fetch a batch of Olm sessions from the database.
     *
     * Implementation of {@link CryptoStore.getEndToEndSessionsBatch}.
     *
     * @internal
     */
    public async getEndToEndSessionsBatch(): Promise<null | ISessionInfo[]> {
        const result: ISessionInfo[] = [];
        for (let i = 0; i < this.store.length; ++i) {
            if (this.store.key(i)?.startsWith(keyEndToEndSessions(""))) {
                const deviceKey = this.store.key(i)!.split("/")[1];
                for (const session of Object.values(this._getEndToEndSessions(deviceKey))) {
                    result.push(session);
                    if (result.length >= SESSION_BATCH_SIZE) {
                        return result;
                    }
                }
            }
        }

        if (result.length === 0) {
            // No sessions left.
            return null;
        }

        // There are fewer sessions than the batch size; return the final batch of sessions.
        return result;
    }

    /**
     * Delete a batch of Olm sessions from the database.
     *
     * Implementation of {@link CryptoStore.deleteEndToEndSessionsBatch}.
     *
     * @internal
     */
    public async deleteEndToEndSessionsBatch(sessions: { deviceKey: string; sessionId: string }[]): Promise<void> {
        for (const { deviceKey, sessionId } of sessions) {
            const deviceSessions = this._getEndToEndSessions(deviceKey) || {};
            delete deviceSessions[sessionId];
            if (Object.keys(deviceSessions).length === 0) {
                // No more sessions for this device.
                this.store.removeItem(keyEndToEndSessions(deviceKey));
            } else {
                setJsonItem(this.store, keyEndToEndSessions(deviceKey), deviceSessions);
            }
        }
    }

    // Inbound Group Sessions

    public getEndToEndInboundGroupSession(
        senderCurve25519Key: string,
        sessionId: string,
        txn: unknown,
        func: (groupSession: InboundGroupSessionData | null, groupSessionWithheld: IWithheld | null) => void,
    ): void {
        func(
            getJsonItem(this.store, keyEndToEndInboundGroupSession(senderCurve25519Key, sessionId)),
            getJsonItem(this.store, keyEndToEndInboundGroupSessionWithheld(senderCurve25519Key, sessionId)),
        );
    }

    public storeEndToEndInboundGroupSession(
        senderCurve25519Key: string,
        sessionId: string,
        sessionData: InboundGroupSessionData,
        txn: unknown,
    ): void {
        setJsonItem(this.store, keyEndToEndInboundGroupSession(senderCurve25519Key, sessionId), sessionData);
    }

    /**
     * Count the number of Megolm sessions in the database.
     *
     * Implementation of {@link CryptoStore.countEndToEndInboundGroupSessions}.
     *
     * @internal
     */
    public async countEndToEndInboundGroupSessions(): Promise<number> {
        let count = 0;
        for (let i = 0; i < this.store.length; ++i) {
            const key = this.store.key(i);
            if (key?.startsWith(KEY_INBOUND_SESSION_PREFIX)) {
                count += 1;
            }
        }
        return count;
    }

    /**
     * Fetch a batch of Megolm sessions from the database.
     *
     * Implementation of {@link CryptoStore.getEndToEndInboundGroupSessionsBatch}.
     *
     * @internal
     */
    public async getEndToEndInboundGroupSessionsBatch(): Promise<SessionExtended[] | null> {
        const sessionsNeedingBackup = getJsonItem<string[]>(this.store, KEY_SESSIONS_NEEDING_BACKUP) || {};
        const result: SessionExtended[] = [];
        for (let i = 0; i < this.store.length; ++i) {
            const key = this.store.key(i);
            if (key?.startsWith(KEY_INBOUND_SESSION_PREFIX)) {
                const key2 = key.slice(KEY_INBOUND_SESSION_PREFIX.length);

                // we can't use split, as the components we are trying to split out
                // might themselves contain '/' characters. We rely on the
                // senderKey being a (32-byte) curve25519 key, base64-encoded
                // (hence 43 characters long).

                result.push({
                    senderKey: key2.slice(0, 43),
                    sessionId: key2.slice(44),
                    sessionData: getJsonItem(this.store, key)!,
                    needsBackup: key2 in sessionsNeedingBackup,
                });

                if (result.length >= SESSION_BATCH_SIZE) {
                    return result;
                }
            }
        }

        if (result.length === 0) {
            // No sessions left.
            return null;
        }

        // There are fewer sessions than the batch size; return the final batch of sessions.
        return result;
    }

    /**
     * Delete a batch of Megolm sessions from the database.
     *
     * Implementation of {@link CryptoStore.deleteEndToEndInboundGroupSessionsBatch}.
     *
     * @internal
     */
    public async deleteEndToEndInboundGroupSessionsBatch(
        sessions: { senderKey: string; sessionId: string }[],
    ): Promise<void> {
        for (const { senderKey, sessionId } of sessions) {
            const k = keyEndToEndInboundGroupSession(senderKey, sessionId);
            this.store.removeItem(k);
        }
    }

    public getEndToEndRooms(txn: unknown, func: (rooms: Record<string, IRoomEncryption>) => void): void {
        const result: Record<string, IRoomEncryption> = {};
        const prefix = keyEndToEndRoomsPrefix("");

        for (let i = 0; i < this.store.length; ++i) {
            const key = this.store.key(i);
            if (key?.startsWith(prefix)) {
                const roomId = key.slice(prefix.length);
                result[roomId] = getJsonItem(this.store, key)!;
            }
        }
        func(result);
    }

    public markSessionsNeedingBackup(sessions: ISession[]): Promise<void> {
        const sessionsNeedingBackup =
            getJsonItem<{
                [senderKeySessionId: string]: boolean;
            }>(this.store, KEY_SESSIONS_NEEDING_BACKUP) || {};
        for (const session of sessions) {
            sessionsNeedingBackup[session.senderKey + "/" + session.sessionId] = true;
        }
        setJsonItem(this.store, KEY_SESSIONS_NEEDING_BACKUP, sessionsNeedingBackup);
        return Promise.resolve();
    }

    /**
     * Delete all data from this store.
     *
     * @returns Promise which resolves when the store has been cleared.
     */
    public deleteAllData(): Promise<void> {
        this.store.removeItem(KEY_END_TO_END_ACCOUNT);
        return Promise.resolve();
    }

    // Olm account

    public getAccount(txn: unknown, func: (accountPickle: string | null) => void): void {
        const accountPickle = getJsonItem<string>(this.store, KEY_END_TO_END_ACCOUNT);
        func(accountPickle);
    }

    public storeAccount(txn: unknown, accountPickle: string): void {
        setJsonItem(this.store, KEY_END_TO_END_ACCOUNT, accountPickle);
    }

    public getCrossSigningKeys(txn: unknown, func: (keys: Record<string, CrossSigningKeyInfo> | null) => void): void {
        const keys = getJsonItem<Record<string, CrossSigningKeyInfo>>(this.store, KEY_CROSS_SIGNING_KEYS);
        func(keys);
    }

    public getSecretStorePrivateKey<K extends keyof SecretStorePrivateKeys>(
        txn: unknown,
        func: (key: SecretStorePrivateKeys[K] | null) => void,
        type: K,
    ): void {
        const key = getJsonItem<SecretStorePrivateKeys[K]>(this.store, E2E_PREFIX + `ssss_cache.${type}`);
        func(key);
    }

    public storeSecretStorePrivateKey<K extends keyof SecretStorePrivateKeys>(
        txn: unknown,
        type: K,
        key: SecretStorePrivateKeys[K],
    ): void {
        setJsonItem(this.store, E2E_PREFIX + `ssss_cache.${type}`, key);
    }

    public doTxn<T>(mode: Mode, stores: Iterable<string>, func: (txn: unknown) => T): Promise<T> {
        return Promise.resolve(func(null));
    }
}

function getJsonItem<T>(store: Storage, key: string): T | null {
    try {
        // if the key is absent, store.getItem() returns null, and
        // JSON.parse(null) === null, so this returns null.
        return JSON.parse(store.getItem(key)!);
    } catch (e) {
        logger.log("Error: Failed to get key %s: %s", key, (<Error>e).message);
        logger.log((<Error>e).stack);
    }
    return null;
}

function setJsonItem<T>(store: Storage, key: string, val: T): void {
    store.setItem(key, JSON.stringify(val));
}
