/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let HksKeyPurpose = {
    HKS_KEY_PURPOSE_MAC: 128,
    HKS_KEY_PURPOSE_SIGN: 4,
    HKS_KEY_PURPOSE_VERIFY: 8,
    HKS_KEY_PURPOSE_DERIVE: 16,
    HKS_KEY_PURPOSE_ENCRYPT: 1,
    HKS_KEY_PURPOSE_DECRYPT: 2,
    HKS_KEY_PURPOSE_AGREE: 256,
}

let HksKeyPadding = {
    HKS_PADDING_NONE: 0,
    HKS_PADDING_OAEP: 1,
    HKS_PADDING_PSS: 2,
    HKS_PADDING_PKCS1_V1_5: 3,
    HKS_PADDING_PKCS5: 4,
    HKS_PADDING_PKCS7: 5,
}

let HksKeyAlg = {
    HKS_ALG_RSA: 1,
    HKS_ALG_HMAC: 50,
    HKS_ALG_AES: 20,
    HKS_ALG_HKDF: 51,
    HKS_ALG_PBKDF2: 52,
    HKS_ALG_DH: 103,
    HKS_ALG_ECDH: 100,
    HKS_ALG_X25519: 102,
    HKS_ALG_ECC: 2,
    HKS_ALG_DSA: 3
}

let HksTagType = {
    HKS_TAG_TYPE_UINT: 2 << 28,
    HKS_TAG_TYPE_BYTES: 5 << 28,
    HKS_TAG_TYPE_BOOL: 4 << 28,
}

let HksTag = {
    HKS_TAG_ALGORITHM: HksTagType.HKS_TAG_TYPE_UINT | 1,
    HKS_TAG_PURPOSE: HksTagType.HKS_TAG_TYPE_UINT | 2,
    HKS_TAG_KEY_SIZE: HksTagType.HKS_TAG_TYPE_UINT | 3,
    HKS_TAG_DIGEST: HksTagType.HKS_TAG_TYPE_UINT | 4,
    HKS_TAG_PADDING: HksTagType.HKS_TAG_TYPE_UINT | 5,
    HKS_TAG_AGREE_PUBLIC_KEY: HksTagType.HKS_TAG_TYPE_BYTES | 22,
    HKS_TAG_KEY_ALIAS: HksTagType.HKS_TAG_TYPE_BYTES | 23,
    HKS_TAG_DERIVE_KEY_SIZE: HksTagType.HKS_TAG_TYPE_UINT | 24,
    HKS_TAG_KEY_STORAGE_FLAG: HksTagType.HKS_TAG_TYPE_UINT | 1002,
    HKS_TAG_IS_KEY_ALIAS: HksTagType.HKS_TAG_TYPE_BOOL | 1001,
    HKS_TAG_BLOCK_MODE: HksTagType.HKS_TAG_TYPE_UINT | 6,
    HKS_TAG_IV: HksTagType.HKS_TAG_TYPE_BYTES | 10,
    HKS_TAG_ASSOCIATED_DATA: HksTagType.HKS_TAG_TYPE_BYTES | 8,
    HKS_TAG_NONCE: HksTagType.HKS_TAG_TYPE_BYTES | 9,
    HKS_TAG_AE_TAG: HksTagType.HKS_TAG_TYPE_BYTES | 10009,
}

let HksKeyDigest = {
    HKS_DIGEST_NONE: 0,
    HKS_DIGEST_MD5: 1,
    HKS_DIGEST_SHA1: 10,
    HKS_DIGEST_SHA224: 11,
    HKS_DIGEST_SHA256: 12,
    HKS_DIGEST_SHA384: 13,
    HKS_DIGEST_SHA512: 14,
}

let HksKeySize = {
    DERIVE_KEY_SIZE_32: 32,

    HKS_KEY_SIZE_128: 128,
    HKS_KEY_SIZE_192: 192,
    HKS_KEY_SIZE_224: 224,
    HKS_KEY_SIZE_256: 256,
    HKS_KEY_SIZE_384: 384,
    HKS_KEY_SIZE_512: 512,
    HKS_KEY_SIZE_521: 521,
    HKS_KEY_SIZE_768: 768,
    HKS_KEY_SIZE_1024: 1024,
    HKS_KEY_SIZE_2048: 2048,
    HKS_KEY_SIZE_3072: 3072,
    HKS_KEY_SIZE_4096: 4096,

}

let HksKeyStorageType = {
    HKS_STORAGE_TEMP: 0,
    HKS_STORAGE_PERSISTENT: 1,
};

let HksCipherMode = {
    HKS_MODE_ECB: 1,
    HKS_MODE_CBC: 2,
    HKS_MODE_CTR: 3,
    HKS_MODE_OFB: 4,
    HKS_MODE_CCM: 31,
    HKS_MODE_GCM: 32,
}

export {
    HksKeyPurpose,
    HksKeyAlg,
    HksTagType,
    HksTag,
    HksKeyDigest,
    HksKeySize,
    HksKeyPadding,
    HksKeyStorageType,
    HksCipherMode
};
