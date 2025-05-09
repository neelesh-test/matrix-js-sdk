/*
Copyright 2023 The Matrix.org Foundation C.I.C.

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

import fetchMockJest from "fetch-mock-jest";

import { OidcError } from "../../../src/oidc/error";
import { type OidcRegistrationClientMetadata, registerOidcClient } from "../../../src/oidc/register";
import { makeDelegatedAuthConfig } from "../../test-utils/oidc";

describe("registerOidcClient()", () => {
    const issuer = "https://auth.com/";
    const clientName = "Element";
    const baseUrl = "https://just.testing";
    const metadata: OidcRegistrationClientMetadata = {
        clientUri: baseUrl,
        redirectUris: [baseUrl],
        clientName,
        applicationType: "web",
        tosUri: "https://just.testing/tos",
        policyUri: "https://policy.just.testing",
        contacts: ["admin@example.com"],
        logoUri: `${baseUrl}:8443/logo.png`,
    };
    const dynamicClientId = "xyz789";

    const delegatedAuthConfig = makeDelegatedAuthConfig(issuer);
    beforeEach(() => {
        fetchMockJest.mockClear();
        fetchMockJest.resetBehavior();
    });

    it("should make correct request to register client", async () => {
        fetchMockJest.post(delegatedAuthConfig.registration_endpoint!, {
            status: 200,
            body: JSON.stringify({ client_id: dynamicClientId }),
        });
        expect(await registerOidcClient(delegatedAuthConfig, metadata)).toEqual(dynamicClientId);
        expect(fetchMockJest).toHaveBeenCalledWith(
            delegatedAuthConfig.registration_endpoint,
            expect.objectContaining({
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
            }),
        );
        expect(JSON.parse(fetchMockJest.mock.calls[0][1]!.body as string)).toEqual(
            expect.objectContaining({
                client_name: clientName,
                client_uri: baseUrl,
                response_types: ["code"],
                grant_types: ["authorization_code", "refresh_token"],
                redirect_uris: [baseUrl],
                id_token_signed_response_alg: "RS256",
                token_endpoint_auth_method: "none",
                application_type: "web",
                tos_uri: "https://just.testing/tos",
                policy_uri: "https://policy.just.testing",
                logo_uri: `${baseUrl}:8443/logo.png`,
            }),
        );
    });

    it("should throw when registration request fails", async () => {
        fetchMockJest.post(delegatedAuthConfig.registration_endpoint!, {
            status: 500,
        });
        await expect(() => registerOidcClient(delegatedAuthConfig, metadata)).rejects.toThrow(
            OidcError.DynamicRegistrationFailed,
        );
    });

    it("should throw when registration response is invalid", async () => {
        fetchMockJest.post(delegatedAuthConfig.registration_endpoint!, {
            status: 200,
            // no clientId in response
            body: "{}",
        });
        await expect(() => registerOidcClient(delegatedAuthConfig, metadata)).rejects.toThrow(
            OidcError.DynamicRegistrationInvalid,
        );
    });

    it("should throw when required endpoints are unavailable", async () => {
        await expect(() =>
            registerOidcClient(
                {
                    ...delegatedAuthConfig,
                    registration_endpoint: undefined,
                },
                metadata,
            ),
        ).rejects.toThrow(OidcError.DynamicRegistrationNotSupported);
    });

    it("should throw when required scopes are unavailable", async () => {
        await expect(() =>
            registerOidcClient(
                {
                    ...delegatedAuthConfig,
                    grant_types_supported: [delegatedAuthConfig.grant_types_supported[0]],
                },
                metadata,
            ),
        ).rejects.toThrow(OidcError.DynamicRegistrationNotSupported);
    });

    it("should filter out invalid URIs", async () => {
        fetchMockJest.post(delegatedAuthConfig.registration_endpoint!, {
            status: 200,
            body: JSON.stringify({ client_id: dynamicClientId }),
        });
        expect(
            await registerOidcClient(delegatedAuthConfig, {
                ...metadata,
                tosUri: "http://just.testing/tos",
                policyUri: "https://policy-uri/",
            }),
        ).toEqual(dynamicClientId);
        expect(JSON.parse(fetchMockJest.mock.calls[0][1]!.body as string)).not.toEqual(
            expect.objectContaining({
                tos_uri: "http://just.testing/tos",
                policy_uri: "https://policy-uri/",
            }),
        );
    });
});
