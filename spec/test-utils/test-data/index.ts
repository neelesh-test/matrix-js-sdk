/* Test data for cryptography tests
 *
 * Do not edit by hand! This file is generated by `./generate-test-data.py`
 */

import { type IDeviceKeys, type IMegolmSessionData } from "../../../src/@types/crypto";
import { type IDownloadKeyResult, type IEvent } from "../../../src";
import { type KeyBackupSession, type KeyBackupInfo } from "../../../src/crypto-api/keybackup";

/* eslint-disable comma-dangle */

// Alice data

export const TEST_USER_ID = "@alice:localhost";
export const TEST_DEVICE_ID = "test_device";
export const TEST_ROOM_ID = "!room:id";

/** The base64-encoded public ed25519 key for this device */
export const TEST_DEVICE_PUBLIC_ED25519_KEY_BASE64 = "YI/7vbGVLpGdYtuceQR8MSsKB/QjgfMXM1xqnn+0NWU";

/** Signed device data, suitable for returning from a `/keys/query` call */
export const SIGNED_TEST_DEVICE_DATA: IDeviceKeys = {
    "algorithms": [
        "m.olm.v1.curve25519-aes-sha2",
        "m.megolm.v1.aes-sha2"
    ],
    "device_id": "test_device",
    "keys": {
        "curve25519:test_device": "F4uCNNlcbRvc7CfBz95ZGWBvY1ALniG1J8+6rhVoKS0",
        "ed25519:test_device": "YI/7vbGVLpGdYtuceQR8MSsKB/QjgfMXM1xqnn+0NWU"
    },
    "user_id": "@alice:localhost",
    "signatures": {
        "@alice:localhost": {
            "ed25519:test_device": "LmQC/yAUZJmkxZ+3L0nEwvtVWOzjqQqADWBhk+C47SPaFYHeV+E291mgXaSCJVeGltX+HC49Aw7nb6ga7sw0Aw"
        }
    }
};

/** base64-encoded public master cross-signing key */
export const MASTER_CROSS_SIGNING_PUBLIC_KEY_BASE64 = "J+5An10v1vzZpAXTYFokD1/PEVccFnLC61EfRXit0UY";

/** base64-encoded private master cross-signing key */
export const MASTER_CROSS_SIGNING_PRIVATE_KEY_BASE64 = "ZG95b3VzcGVha3doYWFhYWFhYWFhYWFhYWFhYWFhbGU";

/** base64-encoded public self cross-signing key */
export const SELF_CROSS_SIGNING_PUBLIC_KEY_BASE64 = "aU2+2CyXQTCuDcmWW0EL2bhJ6PdjFW2LbAsbHqf02AY";

/** base64-encoded private self signing cross-signing key */
export const SELF_CROSS_SIGNING_PRIVATE_KEY_BASE64 = "c2VsZnNlbGZzZWxmc2VsZnNlbGZzZWxmc2VsZnNlbGY";

/** base64-encoded public user cross-signing key */
export const USER_CROSS_SIGNING_PUBLIC_KEY_BASE64 = "g5TC/zjQXyZYuDLZv7a41z5fFVrXpYPypG//AFQj8hY";

/** base64-encoded private user signing cross-signing key */
export const USER_CROSS_SIGNING_PRIVATE_KEY_BASE64 = "dXNlcnVzZXJ1c2VydXNlcnVzZXJ1c2VydXNlcnVzZXI";

/** Signed cross-signing keys data, also suitable for returning from a `/keys/query` call */
export const SIGNED_CROSS_SIGNING_KEYS_DATA: Partial<IDownloadKeyResult> = {
    "master_keys": {
        "@alice:localhost": {
            "keys": {
                "ed25519:J+5An10v1vzZpAXTYFokD1/PEVccFnLC61EfRXit0UY": "J+5An10v1vzZpAXTYFokD1/PEVccFnLC61EfRXit0UY"
            },
            "user_id": "@alice:localhost",
            "usage": [
                "master"
            ]
        }
    },
    "self_signing_keys": {
        "@alice:localhost": {
            "keys": {
                "ed25519:aU2+2CyXQTCuDcmWW0EL2bhJ6PdjFW2LbAsbHqf02AY": "aU2+2CyXQTCuDcmWW0EL2bhJ6PdjFW2LbAsbHqf02AY"
            },
            "user_id": "@alice:localhost",
            "usage": [
                "self_signing"
            ],
            "signatures": {
                "@alice:localhost": {
                    "ed25519:J+5An10v1vzZpAXTYFokD1/PEVccFnLC61EfRXit0UY": "XfhYEhZmOs8BJdb3viatILBZ/bElsHXEW28V4tIaY5CxrBR0YOym3yZHWmRmypXessHZAKOhZn3yBMXzdajyCw"
                }
            }
        }
    },
    "user_signing_keys": {
        "@alice:localhost": {
            "keys": {
                "ed25519:g5TC/zjQXyZYuDLZv7a41z5fFVrXpYPypG//AFQj8hY": "g5TC/zjQXyZYuDLZv7a41z5fFVrXpYPypG//AFQj8hY"
            },
            "user_id": "@alice:localhost",
            "usage": [
                "user_signing"
            ],
            "signatures": {
                "@alice:localhost": {
                    "ed25519:J+5An10v1vzZpAXTYFokD1/PEVccFnLC61EfRXit0UY": "6AkD1XM2H0/ebgP9oBdMKNeft7uxsrb0XN1CsjjHgeZCvCTMmv3BHlLiT/Hzy4fe8H+S1tr484dcXN/PIdnfDA"
                }
            }
        }
    }
};

/** Signed OTKs, returned by `POST /keys/claim` */
export const ONE_TIME_KEYS = {
    "@alice:localhost": {
        "test_device": {
            "signed_curve25519:AAAAHQ": {
                "key": "j3fR3HemM16M7CWhoI4Sk5ZsdmdfQHsKL1xuSft6MSw",
                "signatures": {
                    "@alice:localhost": {
                        "ed25519:test_device": "25djC6Rk6gIgFBMVawY9X9LnY8XMMziey6lKqL8Q5Bbp7T1vw9uk0RE7eKO2a/jNLcYroO2xRztGhBrKz5sOCQ"
                    }
                }
            }
        }
    }
};

/** base64-encoded backup decryption (private) key */
export const BACKUP_DECRYPTION_KEY_BASE64 = "dwdtCnMYpX08FsFyUbJmRd9ML4frwJkqsXf7pR25LCo=";

/** Backup decryption key in export format */
export const BACKUP_DECRYPTION_KEY_BASE58 = "EsTc LW2K PGiF wKEA 3As5 g5c4 BXwk qeeJ ZJV8 Q9fu gUMN UE4d";

/** Signed backup data, suitable for return from `GET /_matrix/client/v3/room_keys/keys/{roomId}/{sessionId}` */
export const SIGNED_BACKUP_DATA: KeyBackupInfo = {
    "algorithm": "m.megolm_backup.v1.curve25519-aes-sha2",
    "version": "1",
    "auth_data": {
        "public_key": "hSDwCYkwp1R0i33ctD73Wg2/Og0mOBr066SpjqqbTmo",
        "signatures": {
            "@alice:localhost": {
                "ed25519:test_device": "KDSNeumirTsd8piI0oVfv/wzg4J4HlEc7rs5XhODFcJ/YAcUdg65ajsZG+rLI0TQOSSGjorJqcrSiSB1HRSCAA"
            }
        }
    }
};

/** A set of megolm keys that can be imported via CryptoAPI#importRoomKeys */
export const MEGOLM_SESSION_DATA_ARRAY: IMegolmSessionData[] = [
    {
        "algorithm": "m.megolm.v1.aes-sha2",
        "room_id": "!room:id",
        "sender_key": "WimPd2udAU/1S/+YBpPbmr9L+0H5H+BnAVHSwDxlPGc",
        "session_id": "FYOoKQSwe4d9jhTZ/LQCZFJINjPEqZ7Or4Z08reP92M",
        "session_key": "AQAAAABZ0jXQOprFfXe41tIFmAtHxflJp4O2hM/vzQQpOazOCFeWSoW5P3Z9Q+voU3eXehMwyP8/hm/Q8xLP6/PmJdy+71se/17kdFwcDGgLxBWfa4ODM9zlI4EjKbNqmiii5loJ7rBhA/XXaw80m0hfU6zTDX/KrO55J0Pt4vJ0LDa3LBWDqCkEsHuHfY4U2fy0AmRSSDYzxKmezq+GdPK3j/dj",
        "sender_claimed_keys": {
            "ed25519": "QdgHgdpDgihgovpPzUiThXur1fbErTFh7paFvNKSgN0"
        },
        "forwarding_curve25519_key_chain": []
    },
    {
        "algorithm": "m.megolm.v1.aes-sha2",
        "room_id": "!room:id",
        "sender_key": "WimPd2udAU/1S/+YBpPbmr9L+0H5H+BnAVHSwDxlPGc",
        "session_id": "mPYSGA2l1tOQiipEDEVYhDSdTSFh2lDW1qpGKYZRxTc",
        "session_key": "AQAAAAAHwgkB49BTPAEGTCK6degxUIbl8GPG2ugPRYhNtOpNic63u11+baXFfjDw5fmVfD1gJXpQQjGsqrIYioxrB1xzl7mfb942UHhYdaMQZowpp1fSpJVsxR5TddUU2EWifYD9EQsoz8mY1zqoazm4vUP4v9yxaTcUBj2c6HMJCY0gCJj2EhgNpdbTkIoqRAxFWIQ0nU0hYdpQ1taqRimGUcU3",
        "sender_claimed_keys": {
            "ed25519": "IrkbT6H+0urDf6wKDSyVC1fh1t84Vz6T62snni86Cog"
        },
        "forwarding_curve25519_key_chain": []
    }
];

/** An exported megolm session */
export const MEGOLM_SESSION_DATA: IMegolmSessionData = {
    "algorithm": "m.megolm.v1.aes-sha2",
    "room_id": "!room:id",
    "sender_key": "WimPd2udAU/1S/+YBpPbmr9L+0H5H+BnAVHSwDxlPGc",
    "session_id": "ipdI6Zs/7DzFTEhiA2iGaMDfHkIYCleqXT6L+5e1/co",
    "session_key": "AQAAAABXGO+Z9jlQJhIL6ByhXrv2BwCIxkhh7MXpKLsYmXkJcWrQlirmXmD79ga1zo+I4DCtEZzyGSpDWXBC6G7ez3H4gDMBam1RE3Jm5tc+oTlIri32UkYgSL0kBkcEnttqmIXBlK8tAfJo3cJnlh7F4ltEOAqrdME6dU0zXTkqXmURqYqXSOmbP+w8xUxIYgNohmjA3x5CGApXql0+i/uXtf3K",
    "sender_claimed_keys": {
        "ed25519": "Bhbpt6hqMZlSH4sJV7xiEEEiPVeTWz4Vkujl1EMdIPI"
    },
    "forwarding_curve25519_key_chain": []
};

/** A ratcheted version of MEGOLM_SESSION_DATA */
export const RATCHTED_MEGOLM_SESSION_DATA: IMegolmSessionData = {
    "algorithm": "m.megolm.v1.aes-sha2",
    "room_id": "!room:id",
    "sender_key": "WimPd2udAU/1S/+YBpPbmr9L+0H5H+BnAVHSwDxlPGc",
    "session_id": "ipdI6Zs/7DzFTEhiA2iGaMDfHkIYCleqXT6L+5e1/co",
    "session_key": "AQAAAAFXGO+Z9jlQJhIL6ByhXrv2BwCIxkhh7MXpKLsYmXkJcWrQlirmXmD79ga1zo+I4DCtEZzyGSpDWXBC6G7ez3H4gDMBam1RE3Jm5tc+oTlIri32UkYgSL0kBkcEnttqmIUWvpwC7by/yg231+gyzu9lDHAU4ivCj48pt7WGiORWmIqXSOmbP+w8xUxIYgNohmjA3x5CGApXql0+i/uXtf3K",
    "sender_claimed_keys": {
        "ed25519": "Bhbpt6hqMZlSH4sJV7xiEEEiPVeTWz4Vkujl1EMdIPI"
    },
    "forwarding_curve25519_key_chain": []
};

/** The key from MEGOLM_SESSION_DATA, encrypted for backup using `m.megolm_backup.v1.curve25519-aes-sha2` algorithm*/
export const CURVE25519_KEY_BACKUP_DATA: KeyBackupSession = {
    "first_message_index": 1,
    "forwarded_count": 0,
    "is_verified": false,
    "session_data": {
        "ciphertext": "r6HRk2/Im2yJe5cLP8R81aVjFWjYWPHpw7TVxphiSK1cdIDZTTK57r6MfU+0i/mTPn+/PosT74OvYwCnehy2d1BPGxhDl8AhPcBu3//Kzlq2o5CssPsw+88gRehkAsPg9Zp5G9sL9to6giltvTWTbsaQpmvv3HLmBOYSFIxvyZrOT/Ffqu325f0IEsKcyV2BdIkw8Ob9Xt+VWoe4MYEGG6y1T8W125zeFgKWI4Ow76uput64H9zZjIo+Cc+hCTO9Ea4EnosSjizCotevkNck7C/zGgfhBikiohROb6SbaZgxicSsEDZ+f7brnri9yP3iXS3PMDHHpa1+XzG2VOG/Y9OQZpkPq+pbLrCC+NWJeJPslDAK5i+RURwzjnPmaHKCRHTq86CwhFyiCDf61MGwCY3xjrmBJg44BCdxWqCx0YJvwsvVqqnl4vTieUfrwThNPsQ81aVkDHvlmrgrTt8icDa8jTJhu34jem+pbRSEM5aJikV4B+zYiLz+dH/v6UpYA2eG8ReOvwpPXp6CAcIlplRPpWbMBeLFVcPkT4KAXTp9exFpB4on4pf8OsaDomlt4qAA0rhAZmhPWPKcU/A0Tz4gyMu54OivVtw1SPj+5Iq+YDQ8jB6Po3ApzMf6fwF9x/FjevbboFB05X2Jr0NrbFqXMOUwXHMgDAGiIWX8+gkmmbaiNWqg2etjN94pobQSGZelb18XGN7kuwMk+Zwk7A",
        "ephemeral": "q+P1WdRtEiPIEtNuuGrRcueZxUbLnSKdsuTAkxewXgU",
        "mac": "OibmACbORhI"
    }
};

/** A test clear event */
export const CLEAR_EVENT: Partial<IEvent> = {
    "type": "m.room.message",
    "room_id": "!room:id",
    "sender": "@alice:localhost",
    "content": {
        "msgtype": "m.text",
        "body": "Hello world"
    }
};

/** The encrypted CLEAR_EVENT by MEGOLM_SESSION_DATA */
export const ENCRYPTED_EVENT: Partial<IEvent> = {
    "type": "m.room.encrypted",
    "room_id": "!room:id",
    "sender": "@alice:localhost",
    "content": {
        "algorithm": "m.megolm.v1.aes-sha2",
        "sender_key": "WimPd2udAU/1S/+YBpPbmr9L+0H5H+BnAVHSwDxlPGc",
        "ciphertext": "AwgAEnAkBmciEAyhh1j6DCk29UXJ7kv/kvayUNfuNT0iAioLxcXjFXOZ5ho3jF1/wrytlt0Lb298uMM67OxdVMi+/mMfYpwlvi07P9cIH6CMSj8tyhYoWl0SrKY6tkPf5GWOlRSRRKbziXa96FHXvnA3V2FCAIGtAe3G4ei5RPbhkmKAFBLAen33/D6MjJVqU8Ojr5vTkgls5eyirarlVpsmnH06alDaxO8avrU0NL+Vsw26xvlUQgEMOnUJ",
        "session_id": "ipdI6Zs/7DzFTEhiA2iGaMDfHkIYCleqXT6L+5e1/co",
        "device_id": "TEST_DEVICE"
    },
    "event_id": "$event1",
    "origin_server_ts": 1507753886000
};

// Bob data

export const BOB_TEST_USER_ID = "@bob:xyz";
export const BOB_TEST_DEVICE_ID = "bob_device";
export const BOB_TEST_ROOM_ID = "!room:id";

/** The base64-encoded public ed25519 key for this device */
export const BOB_TEST_DEVICE_PUBLIC_ED25519_KEY_BASE64 = "jmY0h8QS6Te6gxyjOmMc0eKOqmbAtXpVo4CCWFubk50";

/** Signed device data, suitable for returning from a `/keys/query` call */
export const BOB_SIGNED_TEST_DEVICE_DATA: IDeviceKeys = {
    "algorithms": [
        "m.olm.v1.curve25519-aes-sha2",
        "m.megolm.v1.aes-sha2"
    ],
    "device_id": "bob_device",
    "keys": {
        "curve25519:bob_device": "F4uCNNlcbRvc7CfBz95ZGWBvY1ALniG1J8+6rhVoKS0",
        "ed25519:bob_device": "jmY0h8QS6Te6gxyjOmMc0eKOqmbAtXpVo4CCWFubk50"
    },
    "user_id": "@bob:xyz",
    "signatures": {
        "@bob:xyz": {
            "ed25519:bob_device": "4ApBs9jaeGyfdYaWRUdBvQAkDyXjACJ9KJ0xLHMgiFT/1yo6VqPTx2iziKGnrBiGhbtKNxEhDPOvZZkBU73cDQ"
        }
    }
};

/** base64-encoded public master cross-signing key */
export const BOB_MASTER_CROSS_SIGNING_PUBLIC_KEY_BASE64 = "KKVOHOB2LsW7hFJwqyzXpA+vp7u5+gaMWUJvBS7mjuA";

/** base64-encoded private master cross-signing key */
export const BOB_MASTER_CROSS_SIGNING_PRIVATE_KEY_BASE64 = "RG95b3VzcGVha3doYWFhYWFhYWFhYWFhYWFhYWFhbGU";

/** base64-encoded public self cross-signing key */
export const BOB_SELF_CROSS_SIGNING_PUBLIC_KEY_BASE64 = "DaScI3WulBvDjf/d2vdyP5Cgjdypn1c/PSDX23MgN+A";

/** base64-encoded private self signing cross-signing key */
export const BOB_SELF_CROSS_SIGNING_PRIVATE_KEY_BASE64 = "U2VsZnNlbGZzZWxmc2VsZnNlbGZzZWxmc2VsZnNlbGY";

/** base64-encoded public user cross-signing key */
export const BOB_USER_CROSS_SIGNING_PUBLIC_KEY_BASE64 = "lXP89FP6zvFH9TSbU1S8uSdAsVawm1NmV6z+Rfr3lEw";

/** base64-encoded private user signing cross-signing key */
export const BOB_USER_CROSS_SIGNING_PRIVATE_KEY_BASE64 = "VXNlcnVzZXJ1c2VydXNlcnVzZXJ1c2VydXNlcnVzZXI";

/** Signed cross-signing keys data, also suitable for returning from a `/keys/query` call */
export const BOB_SIGNED_CROSS_SIGNING_KEYS_DATA: Partial<IDownloadKeyResult> = {
    "master_keys": {
        "@bob:xyz": {
            "keys": {
                "ed25519:KKVOHOB2LsW7hFJwqyzXpA+vp7u5+gaMWUJvBS7mjuA": "KKVOHOB2LsW7hFJwqyzXpA+vp7u5+gaMWUJvBS7mjuA"
            },
            "user_id": "@bob:xyz",
            "usage": [
                "master"
            ]
        }
    },
    "self_signing_keys": {
        "@bob:xyz": {
            "keys": {
                "ed25519:DaScI3WulBvDjf/d2vdyP5Cgjdypn1c/PSDX23MgN+A": "DaScI3WulBvDjf/d2vdyP5Cgjdypn1c/PSDX23MgN+A"
            },
            "user_id": "@bob:xyz",
            "usage": [
                "self_signing"
            ],
            "signatures": {
                "@bob:xyz": {
                    "ed25519:KKVOHOB2LsW7hFJwqyzXpA+vp7u5+gaMWUJvBS7mjuA": "RxM8iJU6ZkyzQSVtNnXIJMPyEahVsN+fQQTBNKAs+kqySFyXBgchx+8czZaAhJCpXh9gD1nskT4yyFd2eyUXBw"
                }
            }
        }
    },
    "user_signing_keys": {
        "@bob:xyz": {
            "keys": {
                "ed25519:lXP89FP6zvFH9TSbU1S8uSdAsVawm1NmV6z+Rfr3lEw": "lXP89FP6zvFH9TSbU1S8uSdAsVawm1NmV6z+Rfr3lEw"
            },
            "user_id": "@bob:xyz",
            "usage": [
                "user_signing"
            ],
            "signatures": {
                "@bob:xyz": {
                    "ed25519:KKVOHOB2LsW7hFJwqyzXpA+vp7u5+gaMWUJvBS7mjuA": "jF8fvnPZulrPyh/4E8dNDVBP3iHHl9bRc+rRArVyGzoom+uVrokOck7BN2YmPyCRFZJJx7fgRA1Bveyu+mTVAg"
                }
            }
        }
    }
};

/** Signed OTKs, returned by `POST /keys/claim` */
export const BOB_ONE_TIME_KEYS = {
    "@bob:xyz": {
        "bob_device": {
            "signed_curve25519:AAAAHQ": {
                "key": "j3fR3HemM16M7CWhoI4Sk5ZsdmdfQHsKL1xuSft6MSw",
                "signatures": {
                    "@bob:xyz": {
                        "ed25519:bob_device": "dlZc9VA/hP980Mxvu9qwi0qJx8VK7sADGOM48CE01YM7K/Mbty9lis/QjtQAWqDg371QyynVRjEzt9qj7eSFCg"
                    }
                }
            }
        }
    }
};

/** base64-encoded backup decryption (private) key */
export const BOB_BACKUP_DECRYPTION_KEY_BASE64 = "DwdtCnMYpX08FsFyUbJmRd9ML4frwJkqsXf7pR25LCo=";

/** Backup decryption key in export format */
export const BOB_BACKUP_DECRYPTION_KEY_BASE58 = "EsT5 Sd5m mEXs NQYE ibRe 3q9E 4aXW rHih 5f9J 6rU6 AfwY mASR";

/** Signed backup data, suitable for return from `GET /_matrix/client/v3/room_keys/keys/{roomId}/{sessionId}` */
export const BOB_SIGNED_BACKUP_DATA: KeyBackupInfo = {
    "algorithm": "m.megolm_backup.v1.curve25519-aes-sha2",
    "version": "1",
    "auth_data": {
        "public_key": "ZRuVWcWlDuvOwZRygccUCD4Avtnt130800I+WQNwwRY",
        "signatures": {
            "@bob:xyz": {
                "ed25519:bob_device": "lDIMj3VC0WazE2FamGHpmbiqKf9Z4pO4qapZ5TL5BnD3c+dvb+2waOEd6pgay/pmrQ6MW4Eu2KDEpe1fnHc3BA"
            }
        }
    }
};

/** A set of megolm keys that can be imported via CryptoAPI#importRoomKeys */
export const BOB_MEGOLM_SESSION_DATA_ARRAY: IMegolmSessionData[] = [
    {
        "algorithm": "m.megolm.v1.aes-sha2",
        "room_id": "!room:id",
        "sender_key": "FOvlmz18LLI3k/llCpqRoKT90+gFF8YhuL+v1YBXHlw",
        "session_id": "/2K+V777vipCxPZ0gpY9qcpz1DYaXwuMRIu0UEP0Wa0",
        "session_key": "AQAAAAAclzWVMeWBKH+B/WMowa3rb4ma3jEl6n5W4GCs9ue65CruzD3ihX+85pZ9hsV9Bf6fvhjp76WNRajoJYX0UIt7aosjmu0i+H+07hEQ0zqTKpVoSH0ykJ6stAMhdr6Q4uW5crBmdTTBIsqmoWsNJZKKoE2+ldYrZ1lrFeaJbjBIY/9ivle++74qQsT2dIKWPanKc9Q2Gl8LjESLtFBD9Fmt",
        "sender_claimed_keys": {
            "ed25519": "F4P7f1Z0RjbiZMgHk1xBCG3KC4/Ng9PmxLJ4hQ13sHA"
        },
        "forwarding_curve25519_key_chain": []
    },
    {
        "algorithm": "m.megolm.v1.aes-sha2",
        "room_id": "!room:id",
        "sender_key": "FOvlmz18LLI3k/llCpqRoKT90+gFF8YhuL+v1YBXHlw",
        "session_id": "+07YOpSgdZ1X9le3n3NMByw0V1B0H0Djnbm76jgmWoo",
        "session_key": "AQAAAAAjWfIMo9+BWS8IvhfsQuomxXXXGy11tJs0ej505xxd1RzOIP4ftq3MbZYsfH8kqSMBc2l1Ym2u3Dksv2/nR0zGQeNIgOxeMuwHU3Ry7+DdV1I96blPylVCCn/f5RAy6smKoaeylptPdXgVXmw3YBBUVYpHpm+xCIUUp9foAdb8hftO2DqUoHWdV/ZXt59zTAcsNFdQdB9A4525u+o4JlqK",
        "sender_claimed_keys": {
            "ed25519": "OsZMdC1gQ5nPr+L9tuT6xXsaFJkVPkgxP2FexHF1/QM"
        },
        "forwarding_curve25519_key_chain": []
    }
];

/** An exported megolm session */
export const BOB_MEGOLM_SESSION_DATA: IMegolmSessionData = {
    "algorithm": "m.megolm.v1.aes-sha2",
    "room_id": "!room:id",
    "sender_key": "FOvlmz18LLI3k/llCpqRoKT90+gFF8YhuL+v1YBXHlw",
    "session_id": "gywydBrIJcJWktC/ic3tunKZM1XZm1MpYiYtdbj8Rpc",
    "session_key": "AQAAAADZJL7OdM/KHfPzXPZ3CtlLBIlzbwk06dnZTd3bvkcdP5u73rdmThBKdqGA4xzCyxZsHdYLZRrlmD3VwOmNfvWMqYdPxA1X0vs3d172y9EIG8i+N/skJxTRypcVSV9XoinBNIWr/gkyepuAKiQqemlc8J5amD9OkmbVkmnrxP1uyYMsMnQayCXCVpLQv4nN7bpymTNV2ZtTKWImLXW4/EaX",
    "sender_claimed_keys": {
        "ed25519": "zBdpQwWYyz1MkZuEUhXqcdMfUNN/B9psLFDDDTJOg64"
    },
    "forwarding_curve25519_key_chain": []
};

/** A ratcheted version of BOB_MEGOLM_SESSION_DATA */
export const BOB_RATCHTED_MEGOLM_SESSION_DATA: IMegolmSessionData = {
    "algorithm": "m.megolm.v1.aes-sha2",
    "room_id": "!room:id",
    "sender_key": "FOvlmz18LLI3k/llCpqRoKT90+gFF8YhuL+v1YBXHlw",
    "session_id": "gywydBrIJcJWktC/ic3tunKZM1XZm1MpYiYtdbj8Rpc",
    "session_key": "AQAAAAHZJL7OdM/KHfPzXPZ3CtlLBIlzbwk06dnZTd3bvkcdP5u73rdmThBKdqGA4xzCyxZsHdYLZRrlmD3VwOmNfvWMqYdPxA1X0vs3d172y9EIG8i+N/skJxTRypcVSV9Xoil2JdGx9oPqR0dFVh661Aqs86rJRbQ4IeRiuEm35VMxboMsMnQayCXCVpLQv4nN7bpymTNV2ZtTKWImLXW4/EaX",
    "sender_claimed_keys": {
        "ed25519": "zBdpQwWYyz1MkZuEUhXqcdMfUNN/B9psLFDDDTJOg64"
    },
    "forwarding_curve25519_key_chain": []
};

/** The key from BOB_MEGOLM_SESSION_DATA, encrypted for backup using `m.megolm_backup.v1.curve25519-aes-sha2` algorithm*/
export const BOB_CURVE25519_KEY_BACKUP_DATA: KeyBackupSession = {
    "first_message_index": 1,
    "forwarded_count": 0,
    "is_verified": false,
    "session_data": {
        "ciphertext": "d7UVOK17WEVky/8hK0h3HsTQrFMEbKbfqMcl2KtyTWcI9S5gGFWK9Git5BzVRxRggvxQ0c8PDfqL+dr3zHytAMW+71BJqIPQW910vV7SX3IcGylnoUcS3doVkJZiprXytXMP89AKcgv5Dj7mS2ZdvNGE+Atro74bzZ5yot5BrE0ZE5SjoUBPLaLMMu9HopLIV+qx01Rc3F0wmkocSPo51N0nv6wvO5Cst0FiOGHDK6r1pFlgDEJLmBkOyC4e8oMVbKTJzsSQVbJ8tJ37xuhI+T5P0ZlmiqKDqYRp8uh50w+txLEixYhEUunFgCTt1DAmiS9pLNYhLyl1ggwuQjzZe+AV6timbRxNJy18/AEcPomJw7z/pxYIiNLHRKOC13Wp8kGWx9cOgfMQ5KmBuLS8psGiLTBkfWPLOfNYqjbeqAR+OGZQoS6hUjbBYU7QuFa4FOYBHkNB2UqNsdsMb9qB/qs7QGTSb8Lok5YjW1c81BUpmIyKvuqnKma0MZskrpTYGQD2eJDABFCZwLFm+LgDyUTeSiV5xguYztLrHOk8LHKo9M8dIZgoBjeFVJxyjbcXKsVS3aQkMXKCrRlKLqhZTws/ZJwVfW9DbktZ9dT+tRZQvI7tjJofojcLX61AGJDnqUf5+2Gv1tEnmUI953gIzc8NlcFabPOsDsZEODt7MdOCTPT3w29umyhKbCsslpb64LoS/AB2QRPRCgkJS7snRA",
        "ephemeral": "oO0VX84OUIzm2i/12zAhTWOZT5IFRH5mXaKZ8fXkCgU",
        "mac": "lEfHlqfJQwU"
    }
};

/** A test clear event */
export const BOB_CLEAR_EVENT: Partial<IEvent> = {
    "type": "m.room.message",
    "room_id": "!room:id",
    "sender": "@alice:localhost",
    "content": {
        "msgtype": "m.text",
        "body": "Hello world"
    }
};

/** The encrypted CLEAR_EVENT by MEGOLM_SESSION_DATA */
export const BOB_ENCRYPTED_EVENT: Partial<IEvent> = {
    "type": "m.room.encrypted",
    "room_id": "!room:id",
    "sender": "@alice:localhost",
    "content": {
        "algorithm": "m.megolm.v1.aes-sha2",
        "sender_key": "FOvlmz18LLI3k/llCpqRoKT90+gFF8YhuL+v1YBXHlw",
        "ciphertext": "AwgAEnA/mEqZm2lSrhoG11OpDqsohGSBJWsudbuoItLlivmpFZQHrKMbE6z/dhCTwUi76vwfRCtf4tyPMD845cqZH1nL0bowq3/awyzZ8Q263Y3WrLfkUTFBU6oPF/IULUFZZuw6kLdfd5g5+uigvqUhFFpICoj7KNHznv4sFNssd00/WgJquZ6PRt6e1v6ANFNiZPAwghIL+kBc6pb8i6MUWt9JnXilJhTqFDHdXiY4qkaKBWbwebC26PYM",
        "session_id": "gywydBrIJcJWktC/ic3tunKZM1XZm1MpYiYtdbj8Rpc",
        "device_id": "TEST_DEVICE"
    },
    "event_id": "$event1",
    "origin_server_ts": 1507753886000
};

/** A second set of signed cross-signing keys data, also suitable for returning from a `/keys/query` call */
export const BOB_ALT_SIGNED_CROSS_SIGNING_KEYS_DATA: Partial<IDownloadKeyResult> = {
    "master_keys": {
        "@bob:xyz": {
            "keys": {
                "ed25519:MCYxU7myKVkoQ55VYw/rXdg5cEupRfDdHmFPJUmR5+E": "MCYxU7myKVkoQ55VYw/rXdg5cEupRfDdHmFPJUmR5+E"
            },
            "user_id": "@bob:xyz",
            "usage": [
                "master"
            ]
        }
    },
    "self_signing_keys": {
        "@bob:xyz": {
            "keys": {
                "ed25519:DaScI3WulBvDjf/d2vdyP5Cgjdypn1c/PSDX23MgN+A": "DaScI3WulBvDjf/d2vdyP5Cgjdypn1c/PSDX23MgN+A"
            },
            "user_id": "@bob:xyz",
            "usage": [
                "self_signing"
            ],
            "signatures": {
                "@bob:xyz": {
                    "ed25519:MCYxU7myKVkoQ55VYw/rXdg5cEupRfDdHmFPJUmR5+E": "eDZETBRUw9yW0WJnBZ7vxo12TW09Yb7/47qBPKZzPZzZEvs9M82dnAOtWUv00mcTdp2K9GpeFYDQJ6qLQgxaCA"
                }
            }
        }
    },
    "user_signing_keys": {
        "@bob:xyz": {
            "keys": {
                "ed25519:lXP89FP6zvFH9TSbU1S8uSdAsVawm1NmV6z+Rfr3lEw": "lXP89FP6zvFH9TSbU1S8uSdAsVawm1NmV6z+Rfr3lEw"
            },
            "user_id": "@bob:xyz",
            "usage": [
                "user_signing"
            ],
            "signatures": {
                "@bob:xyz": {
                    "ed25519:MCYxU7myKVkoQ55VYw/rXdg5cEupRfDdHmFPJUmR5+E": "Q1CbIXvp2BxBsu3F/eZ1ZpuR5rXIt0+FrrA/l6itskpW748xwMoIKxQRVQqs87kh7pCsWEoTy6FzIL8nV+P6BQ"
                }
            }
        }
    }
};

