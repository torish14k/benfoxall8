import { describe, it, expect } from 'deccjsunit/index'
import huks from '@ohos.security.huks'
import * as Data from '../data.js';

let exportKey_1;
let exportKey_2;
let handle = {};
let handle1;
let handle2;
let finishData_1;
let finishData_2;
let srcData65 = Data.Date_65KB;
let srcData65Kb = stringToUint8Array(srcData65);
let HksKeyAlg = {
    HKS_ALG_DH: 103,
    HKS_ALG_AES: 20,
    HKS_ALG_HMAC: 50,
}
let HksKeyPurpose = {
    HKS_KEY_PURPOSE_AGREE: 256,
    HKS_KEY_PURPOSE_DERIVE: 16,
    HKS_KEY_PURPOSE_ENCRYPT: 1,
    HKS_KEY_PURPOSE_DECRYPT: 2,
    HKS_KEY_PURPOSE_MAC: 128,
}
let HksKeySize = {
    HKS_DH_KEY_SIZE_128: 128,
    HKS_DH_KEY_SIZE_192: 192,
    HKS_DH_KEY_SIZE_256: 256,
    HKS_DH_KEY_SIZE_512: 512,
    HKS_DH_KEY_SIZE_2048: 2048,
    HKS_DH_KEY_SIZE_3072: 3072,
    HKS_DH_KEY_SIZE_4096: 4096
}
let HksKeyStorageType = {
    HKS_STORAGE_TEMP: 0,
    HKS_STORAGE_PERSISTENT: 1,
}
let HksTagType = {
    HKS_TAG_TYPE_UINT: 2 << 28,
    HKS_TAG_TYPE_BOOL: 4 << 28,
    HKS_TAG_TYPE_BYTES: 5 << 28
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
let HksKeyPadding = {
    HKS_PADDING_NONE: 0,
    HKS_PADDING_OAEP: 1,
    HKS_PADDING_PSS: 2,
    HKS_PADDING_PKCS1_V1_5: 3,
    HKS_PADDING_PKCS5: 4,
    HKS_PADDING_PKCS7: 5,
}
let HksCipherMode = {
    HKS_MODE_ECB: 1,
    HKS_MODE_CBC: 2,
    HKS_MODE_CTR: 3,
    HKS_MODE_OFB: 4,
    HKS_MODE_CCM: 31,
    HKS_MODE_GCM: 32,
}
let HksTag = {
    HKS_TAG_ALGORITHM: HksTagType.HKS_TAG_TYPE_UINT | 1,
    HKS_TAG_PURPOSE: HksTagType.HKS_TAG_TYPE_UINT | 2,
    HKS_TAG_KEY_SIZE: HksTagType.HKS_TAG_TYPE_UINT | 3,
    HKS_TAG_DIGEST: HksTagType.HKS_TAG_TYPE_UINT | 4,
    HKS_TAG_PADDING: HksTagType.HKS_TAG_TYPE_UINT | 5,
    HKS_TAG_BLOCK_MODE: HksTagType.HKS_TAG_TYPE_UINT | 6,
    HKS_TAG_KEY_STORAGE_FLAG: HksTagType.HKS_TAG_TYPE_UINT | 1002,
    HKS_TAG_IS_KEY_ALIAS: HksTagType.HKS_TAG_TYPE_BOOL | 1001,
    HKS_TAG_KEY_ALIAS: HksTagType.HKS_TAG_TYPE_BYTES | 23
}
let HuksAgree002 = {
    HuksKeySTORAGE: { "tag": HksTag.HKS_TAG_KEY_STORAGE_FLAG, "value": HksKeyStorageType.HKS_STORAGE_PERSISTENT },
    HuksKeyISKEYALIAS: { "tag": HksTag.HKS_TAG_IS_KEY_ALIAS, "value": true },
    HuksKeyDIGESTNONE: { "tag": HksTag.HKS_TAG_DIGEST, "value": HksKeyDigest.HKS_DIGEST_NONE },
    HuksKeyDIGESTSHA1: { "tag": HksTag.HKS_TAG_DIGEST, "value": HksKeyDigest.HKS_DIGEST_SHA1 },
    HuksKeyDIGESTSHA224: { "tag": HksTag.HKS_TAG_DIGEST, "value": HksKeyDigest.HKS_DIGEST_SHA224 },
    HuksKeyDIGESTSHA256: { "tag": HksTag.HKS_TAG_DIGEST, "value": HksKeyDigest.HKS_DIGEST_SHA256 },
    HuksKeyDIGESTSHA384: { "tag": HksTag.HKS_TAG_DIGEST, "value": HksKeyDigest.HKS_DIGEST_SHA384 },
    HuksKeyDIGESTSHA512: { "tag": HksTag.HKS_TAG_DIGEST, "value": HksKeyDigest.HKS_DIGEST_SHA512 },
    HuksKeyPADDINGNONE: { "tag": HksTag.HKS_TAG_PADDING, "value": HksKeyPadding.HKS_PADDING_NONE },
    HuksKeyPADDINGPKCS7: { "tag": HksTag.HKS_TAG_PADDING, "value": HksKeyPadding.HKS_PADDING_PKCS7 },
    HuksKeyBLOCK_MODECBC: { "tag": HksTag.HKS_TAG_BLOCK_MODE, "value": HksCipherMode.HKS_MODE_CBC },
    HuksKeyBLOCK_MODECCM: { "tag": HksTag.HKS_TAG_BLOCK_MODE, "value": HksCipherMode.HKS_MODE_CCM },
    HuksKeyBLOCK_MODEECB: { "tag": HksTag.HKS_TAG_BLOCK_MODE, "value": HksCipherMode.HKS_MODE_ECB },
    HuksKeyBLOCK_MODECTR: { "tag": HksTag.HKS_TAG_BLOCK_MODE, "value": HksCipherMode.HKS_MODE_CTR },
    HuksKeyBLOCK_MODEGCM: { "tag": HksTag.HKS_TAG_BLOCK_MODE, "value": HksCipherMode.HKS_MODE_GCM },
    HuksKeyALGORITHMAES: { "tag": HksTag.HKS_TAG_ALGORITHM, "value": HksKeyAlg.HKS_ALG_AES },
    HuksKeyALGORITHMHMAC: { "tag": HksTag.HKS_TAG_ALGORITHM, "value": HksKeyAlg.HKS_ALG_HMAC },
    HuksKeySIZE256: { "tag": HksTag.HKS_TAG_KEY_SIZE, "value": HksKeySize.HKS_DH_KEY_SIZE_256 },
    HuksKeySIZE128: { "tag": HksTag.HKS_TAG_KEY_SIZE, "value": HksKeySize.HKS_DH_KEY_SIZE_128 },
    HuksKeySIZE192: { "tag": HksTag.HKS_TAG_KEY_SIZE, "value": HksKeySize.HKS_DH_KEY_SIZE_192 },
    HuksKeyAlgDH: { "tag": HksTag.HKS_TAG_ALGORITHM, "value": HksKeyAlg.HKS_ALG_DH },
    HuksKeyAlgAES: { "tag": HksTag.HKS_TAG_ALGORITHM, "value": HksKeyAlg.HKS_ALG_AES },
    HuksKeyAlgHMAC: { "tag": HksTag.HKS_TAG_ALGORITHM, "value": HksKeyAlg.HKS_ALG_HMAC },
    HuksKeyPurposeDERIVE: { "tag": HksTag.HKS_TAG_PURPOSE, "value": HksKeyPurpose.HKS_KEY_PURPOSE_DERIVE },
    HuksKeyPurposeMAC: { "tag": HksTag.HKS_TAG_PURPOSE, "value": HksKeyPurpose.HKS_KEY_PURPOSE_MAC },
    HuksKeyPurposeENCRYPTDECRYPT: { "tag": HksTag.HKS_TAG_PURPOSE, "value": HksKeyPurpose.HKS_KEY_PURPOSE_ENCRYPT | HksKeyPurpose.HKS_KEY_PURPOSE_DECRYPT },
    HuksKeyPurposeDH: { "tag": HksTag.HKS_TAG_PURPOSE, "value": HksKeyPurpose.HKS_KEY_PURPOSE_AGREE },
    HuksKeyDHSize2048: { "tag": HksTag.HKS_TAG_KEY_SIZE, "value": HksKeySize.HKS_DH_KEY_SIZE_2048 },
    HuksKeyDHSize3072: { "tag": HksTag.HKS_TAG_KEY_SIZE, "value": HksKeySize.HKS_DH_KEY_SIZE_3072 },
    HuksKeyDHSize4096: { "tag": HksTag.HKS_TAG_KEY_SIZE, "value": HksKeySize.HKS_DH_KEY_SIZE_4096 },
}
let HuksOptions_65kb = {
    "properties": new Array(HuksAgree002.HuksKeyAlgDH, HuksAgree002.HuksKeyPurposeDH, HuksAgree002.HuksKeyDHSize2048),
    "inData": srcData65Kb,
}

function stringToUint8Array(str) {
    var arr = [];
    for (var i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }
    var tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array
}

function Uint8ArrayToString(fileData){
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString
}

async function publicAgreeGenFunc(srcKeyAlies, HuksOptions) {
    await generateKey(srcKeyAlies, HuksOptions).then((data) => {
        console.log(`test generateKey data: ${JSON.stringify(data)}`);
        expect(data.errorCode == 0).assertTrue()
    }).catch((err) => {
        console.log("test generateKey err information: " + JSON.stringify(err))
        expect(null).assertFail();
    });
}

function generateKey(srcKeyAlies, HuksOptions) {
    return new Promise((resolve,reject)=>{
        huks.generateKey(srcKeyAlies, HuksOptions, function(err,data){
            console.log(`test generateKey data: ${JSON.stringify(data)}`);
            if (err.code !== 0) {
                console.log("test generateKey err information: " + JSON.stringify(err) );
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}


async function publicAgreeExport1Func(srcKeyAlies, HuksOptions, exportKeys) {
    await exportKey(srcKeyAlies, HuksOptions).then((data) => {
        console.log(`test exportKey data: ${JSON.stringify(data)}`);
        if (exportKeys == 1) {
            exportKey_1 = data.outData;
        } else {
            exportKey_2 = data.outData;
        }
    }).catch((err) => {
        console.log("test exportKey err information: " + JSON.stringify(err))
        expect(null).assertFail();
    });

}

function exportKey(srcKeyAlies, HuksOptions) {
    return new Promise((resolve,reject)=>{
        huks.exportKey(srcKeyAlies, HuksOptions, function(err,data){
            console.log(`test exportKey data: ${JSON.stringify(data)}`);
            if (err.code !== 0) {
                console.log("test exportKey err information: " + JSON.stringify(err) );
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}


async function publicAgreeInitFunc(srcKeyAlies, HuksOptions) {
    await init(srcKeyAlies, HuksOptions).then((data) => {
        console.log(`test init data ${JSON.stringify(data)}`);
        handle1 = data.handle1;
        handle2 = data.handle2;
        handle = {
            "handle1": handle1,
            "handle2": handle2
        };
        expect(data.errorCode == 0).assertTrue()
    }).catch((err) => {
        console.log("test init err information: " + JSON.stringify(err))
        expect(null).assertFail();
    });
}

function init(srcKeyAlies, HuksOptions) {
    return new Promise((resolve,reject)=>{
        huks.init(srcKeyAlies, HuksOptions, function(err,data){
            if (err.code !== 0) {
                console.log("test init err information: " + JSON.stringify(err) );
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}


async function publicAgreeUpdateFunc(HuksOptions, exportKey) {
    let _inData = HuksOptions.inData;
    if (exportKey == 1) {
        HuksOptions.inData = exportKey_2;
    } else {
        HuksOptions.inData = exportKey_1;
    }
    await update(handle, HuksOptions).then((data) => {
        console.log(`test update data ${JSON.stringify(data)}`);
        expect(data.errorCode == 0).assertTrue()
    }).catch((err) => {
        console.log("test update err information: " + JSON.stringify(err))
        expect(null).assertFail();
    });
    HuksOptions.inData = _inData;
}

function update(handle, HuksOptions){
    return new Promise((resolve,reject)=>{
        huks.update(handle, HuksOptions, function(err,data){
            if (err.code !== 0) {
                console.log("test update err information: " + JSON.stringify(err) );
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}


async function publicAgreeFinishAbortFunc(HuksOptions_Finish, thirdInderfaceName, finishData) {
    if (thirdInderfaceName == "finish") {
        console.log(`test befor finish HuksOptions_Finish ${JSON.stringify(HuksOptions_Finish)}`);
        await finish(handle, HuksOptions_Finish).then((data) => {
            console.log(`test finish data ${JSON.stringify(data)}`);
            if(finishData == 1){
                finishData_1 = data.outData;
            }else{
                finishData_2 = data.outData;
            }
            expect(data.errorCode == 0).assertTrue()
        }).catch((err) => {
            console.log("test finish err information: " + JSON.stringify(err))
            expect(null).assertFail();
        });
    } else {
        let HuksOptions_Abort = new Array({ "tag": HksTag.HKS_TAG_KEY_STORAGE_FLAG, "value": HksKeyStorageType.HKS_STORAGE_TEMP });
        await abort(handle, HuksOptions_Abort).then((data) => {
            console.log(`test abort data ${JSON.stringify(data)}`);
            expect(data.errorCode == 0).assertTrue()
        }).catch((err) => {
            console.log("test abort err information: " + JSON.stringify(err))
            expect(null).assertFail();
        });
    }
}

function abort(handle, HuksOptions_Abort){
    return new Promise((resolve,reject)=>{
        huks.abort(handle, HuksOptions_Abort, function(err,data){
            if (err.code !== 0) {
                console.log("test abort err information: " + JSON.stringify(err) );
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}

function finish(handle, HuksOptions_Finish){
    return new Promise((resolve,reject)=>{
        huks.finish(handle, HuksOptions_Finish,function(err,data){
            if (err.code !== 0) {
                console.log("test generateKey err information: " + JSON.stringify(err) );
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}


async function publicAgreeDeleteFunc(srcKeyAlies, HuksOptions) {
    await deleteKey(srcKeyAlies, HuksOptions).then((data) => {
        console.log(`test deleteKey data ${JSON.stringify(data)}`);
        expect(data.errorCode == 0).assertTrue()
    }).catch((err) => {
        console.log("test deleteKey err information: " + JSON.stringify(err))
        expect(null).assertFail();
    });
}

function deleteKey(srcKeyAlies, HuksOptions) {
    return new Promise((resolve,reject)=>{
        huks.deleteKey(srcKeyAlies, HuksOptions, function(err,data){
            if (err.code !== 0) {
                console.log("test deleteKey err information: " + JSON.stringify(err) );
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}

async function publicAgreeFunc(srcKeyAlies_1, srcKeyAlies_2, HuksOptions, HuksOptions_Finish, thirdInderfaceName) {
    try {
        await publicAgreeGenFunc(srcKeyAlies_1, HuksOptions);
        await publicAgreeGenFunc(srcKeyAlies_2, HuksOptions);
        await publicAgreeExport1Func(srcKeyAlies_1, HuksOptions, 1);
        await publicAgreeExport1Func(srcKeyAlies_2, HuksOptions, 2);

        await publicAgreeInitFunc(srcKeyAlies_1,HuksOptions);
        await publicAgreeUpdateFunc(HuksOptions,1);
        await publicAgreeFinishAbortFunc(HuksOptions_Finish,thirdInderfaceName,1);

        let _HuksOptions_Finish = HuksOptions_Finish
        let HuksOptions_Finish_2 = _HuksOptions_Finish
        HuksOptions_Finish_2.properties.splice(6, 1, {"tag": HksTag.HKS_TAG_KEY_ALIAS,"value": stringToUint8Array(srcKeyAlies_2 + "final")})
        
        await publicAgreeInitFunc(srcKeyAlies_2,HuksOptions);
        await publicAgreeUpdateFunc(HuksOptions,2);
        await publicAgreeFinishAbortFunc(HuksOptions_Finish_2,thirdInderfaceName,2);

        await publicAgreeDeleteFunc(srcKeyAlies_1, HuksOptions);
        await publicAgreeDeleteFunc(srcKeyAlies_2, HuksOptions);

    } catch (e) {
        expect(null).assertFail();
    }
}

describe('SecurityHuksAgreeDHCallbackJsunit', function () {
    /**
     * @tc.name: testAgreeDHAbort65KB001
     * @tc.desc: keysize-KEY_SIZE_2048 FLAG-PERSISTENT  ALG-ALG_AES  PURPOSE-PURPOSE_ENCRYPT|PURPOSE_DECRYPT PADDING-PADDING_NONE MODE-MODE_ECB size-2048 inputdate-500kb  init>update>finish
     * @tc.type: FUNC
     */
    it('testAgreeDHAbort65KB001', 0, async function (done) {
        const srcKeyAlies_1 = 'testAgreeDHSize2048Abort65KBAgreeKeyAlias_01_001'
        const srcKeyAlies_2 = 'testAgreeDHSize2048Abort65KBAgreeKeyAlias_02_001'
        let HuksOptions_Finish = {
            "properties": new Array(HuksAgree002.HuksKeySTORAGE,HuksAgree002.HuksKeyISKEYALIAS,HuksAgree002.HuksKeyALGORITHMAES,HuksAgree002.HuksKeySIZE256,HuksAgree002.HuksKeyPurposeENCRYPTDECRYPT,HuksAgree002.HuksKeyDIGESTNONE,{ "tag": HksTag.HKS_TAG_KEY_ALIAS, "value": stringToUint8Array(srcKeyAlies_1) },HuksAgree002.HuksKeyPADDINGNONE,HuksAgree002.HuksKeyBLOCK_MODEECB),
            "inData": srcData65Kb,
        }
        await publicAgreeFunc(srcKeyAlies_1, srcKeyAlies_2, HuksOptions_65kb, HuksOptions_Finish, "abort");
        done();
    })
})