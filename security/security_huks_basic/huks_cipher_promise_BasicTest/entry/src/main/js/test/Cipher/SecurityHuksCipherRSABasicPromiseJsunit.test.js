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

import { describe, it, expect } from 'deccjsunit/index';
import huks from '@ohos.security.huks';
import { HuksCipherRSA } from '../../../../../../../utils/param/cipher/publicCipherParam';
import {
  stringToUint8Array,
  uint8ArrayToString,
} from '../../../../../../../utils/param/publicFunc';
let gInData64 =
  'RSA_64_ttttttttttttttttttttttttttttttttttttttttttttttttttttttttt';

let defaultData = '0';

let gInData64Array = stringToUint8Array(gInData64);

let encryptedData;
let inputInData;
var handle;
let updateResult = new Array();
let exportKey;

let genHuksOptions = {
  properties: new Array(
    HuksCipherRSA.HuksKeyAlgRSA,
    HuksCipherRSA.HuksKeyPurpose,
    HuksCipherRSA.HuksKeyRSASize512
  ),
  inData: new Uint8Array(defaultData),
};

async function publicGenerateKeyFunc(srcKeyAlies, genHuksOptionsNONC) {
  console.log(
    `test Generate HuksOptions: ${JSON.stringify(genHuksOptionsNONC)}`
  );
  await huks
    .generateKey(srcKeyAlies, genHuksOptionsNONC)
    .then((data) => {
      console.log(`test generateKey data: ${JSON.stringify(data)}`);
      expect(data.errorCode == 0).assertTrue();
    })
    .catch((err) => {
      console.log('test generateKey err information: ' + JSON.stringify(err));
      expect(null).assertFail();
    });
}

async function publicExportKeyFunc(srcKeyAlies, genHuksOptionsNONC) {
  console.log(
    `test ExportKey HuksOptions: ${JSON.stringify(genHuksOptionsNONC)}`
  );
  await huks
    .exportKey(srcKeyAlies, genHuksOptionsNONC)
    .then((data) => {
      console.log(`test ExportKey data: ${JSON.stringify(data)}`);
      exportKey = data.outData;
      expect(data.errorCode == 0).assertTrue();
    })
    .catch((err) => {
      console.log('test ImportKey err information: ' + JSON.stringify(err));
      expect(null).assertFail();
    });
}

async function publicImportKeyFunc(srcKeyAlies, HuksOptions) {
  HuksOptions.inData = exportKey;
  console.log(`test importKey HuksOptions: ${JSON.stringify(HuksOptions)}`);
  await huks
    .importKey(srcKeyAlies, HuksOptions)
    .then((data) => {
      console.log(`test ImportKey data: ${JSON.stringify(data)}`);
      expect(data.errorCode == 0).assertTrue();
    })
    .catch((err) => {
      console.log('test ImportKey err information: ' + JSON.stringify(err));
      expect(null).assertFail();
    });
}

async function publicInitFunc(srcKeyAlies, HuksOptions) {
  console.log(`test init HuksOptions: ${JSON.stringify(HuksOptions)}`);
  await huks
    .init(srcKeyAlies, HuksOptions)
    .then((data) => {
      console.log(`test init data: ${JSON.stringify(data)}`);
      handle = data.handle;
      expect(data.errorCode == 0).assertTrue();
    })
    .catch((err) => {
      console.log('test init err information: ' + JSON.stringify(err));
      expect(null).assertFail();
    });
}

async function publicUpdateFunc(HuksOptions) {
  console.log(
    `test update before handle: ${JSON.stringify(
      handle
    )} HuksOptions: ${JSON.stringify(HuksOptions)}`
  );
  let dateSize = 64;
  let huksOptionsInData = HuksOptions.inData;
  let inDataArray = HuksOptions.inData;
  console.log(
    'test update finish HuksOptions inData: ' + Array.from(inDataArray).length
  );
  if (Array.from(inDataArray).length < dateSize) {
    await update(handle, HuksOptions);
    HuksOptions.inData = stringToUint8Array('0');
  } else {
    let count = Math.floor(Array.from(inDataArray).length / dateSize);
    let remainder = Array.from(inDataArray).length % dateSize;
    for (let i = 0; i < count; i++) {
      HuksOptions.inData = new Uint8Array(
        Array.from(huksOptionsInData).slice(dateSize * i, dateSize * (i + 1))
      );
      console.log(
        'test ' +
          uint8ArrayToString(
            new Uint8Array(
              Array.from(huksOptionsInData).slice(
                dateSize * i,
                dateSize * (i + 1)
              )
            )
          )
      );
      await update(handle, HuksOptions);
      HuksOptions.inData = huksOptionsInData;
    }
    if (remainder !== 0) {
      HuksOptions.inData = new Uint8Array(
        Array.from(huksOptionsInData).slice(
          dateSize * count,
          uint8ArrayToString(inDataArray).length
        )
      );
      await update(handle, HuksOptions);
      console.log(
        'test ' +
          uint8ArrayToString(
            new Uint8Array(
              Array.from(huksOptionsInData).slice(
                dateSize * count,
                uint8ArrayToString(inDataArray).length
              )
            )
          )
      );
    }
  }
}

async function update(handle, HuksOptions) {
  console.log(`test update data ${JSON.stringify(HuksOptions)}`);
  await huks
    .update(handle, HuksOptions)
    .then(async (data) => {
      console.log(`test update data ${JSON.stringify(data)}`);
      expect(data.errorCode == 0).assertTrue();
    })
    .catch((err) => {
      console.log('test update err information: ' + err);
      expect(null).assertFail();
    });
}

async function publicFinishAbortFunc(
  HuksOptions,
  thirdInderfaceName,
  isEncrypt
) {
  if (thirdInderfaceName == 'finish') {
    HuksOptions.outData = new Uint8Array(new Array(1024));
    HuksOptions.inData = new Uint8Array(new Array());
    await finish(HuksOptions, isEncrypt);
  } else if (thirdInderfaceName == 'abort') {
    await abort(HuksOptions);
  }
}

async function finish(HuksOptions, isEncrypt) {
  console.log('test before finish HuksOptions inData: ' + HuksOptions.inData);
  console.log('test before finish HuksOptions outData: ' + HuksOptions.outData);
  console.log(
    'test before finish HuksOptions outData: ' + HuksOptions.outData.length
  );
  console.log(
    'test before finish HuksOptions properties: ' +
      JSON.stringify(HuksOptions.properties)
  );

  await huks
    .finish(handle, HuksOptions)
    .then((data) => {
      console.log(`test finish data: ${JSON.stringify(data)}`);
      if (isEncrypt) {
        updateResult = Array.from(data.outData);
        if (
          uint8ArrayToString(data.outData) === uint8ArrayToString(encryptedData)
        ) {
          console.log(
            `test finish Encrypt fail ${uint8ArrayToString(encryptedData)}`
          );
          console.log(
            `test finish Encrypt fail ${uint8ArrayToString(data.outData)}`
          );
          expect(null).assertFail();
        } else {
          console.log(
            `test finish Encrypt success ${uint8ArrayToString(encryptedData)}`
          );
          console.log(
            `test finish Encrypt success ${uint8ArrayToString(data.outData)}`
          );
          expect(data.errorCode == 0).assertTrue();
        }
      }
      if (!isEncrypt) {
        if (
          uint8ArrayToString(data.outData) === uint8ArrayToString(encryptedData)
        ) {
          console.log(
            `test finish Decrypt success ${uint8ArrayToString(encryptedData)}`
          );
          console.log(
            `test finish Decrypt success ${uint8ArrayToString(data.outData)}`
          );
          expect(data.errorCode == 0).assertTrue();
        } else {
          console.log(
            `test finish Encrypt fail ${uint8ArrayToString(encryptedData)}`
          );
          console.log(
            `test finish Encrypt fail ${uint8ArrayToString(data.outData)}`
          );
          expect(null).assertFail();
        }
      }
    })
    .catch((err) => {
      console.log('test finish err information: ' + JSON.stringify(err));
      expect(null).assertFail();
    });
}

async function abort(HuksOptions) {
  await huks
    .abort(handle, HuksOptions)
    .then((data) => {
      console.log(`test abort data: ${JSON.stringify(data)}`);
      expect(data.errorCode == 0).assertTrue();
    })
    .catch((err) => {
      console.log('test abort err information: ' + JSON.stringify(err));
      expect(null).assertFail();
    });
}

async function publicDeleteKeyFunc(srcKeyAlies, genHuksOptionsNONC) {
  await huks
    .deleteKey(srcKeyAlies, genHuksOptionsNONC)
    .then((data) => {
      console.log(`test deleteKey data: ${JSON.stringify(data)}`);
      expect(data.errorCode == 0).assertTrue();
    })
    .catch((err) => {
      console.log('test deleteKey err information: ' + JSON.stringify(err));
      expect(null).assertFail();
    });
}

async function publicCipherFunc(
  srcKeyAlies,
  newSrcKeyAlies,
  genHuksOptionsNONC,
  HuksOptions,
  thirdInderfaceName,
  isEncrypt
) {
  inputInData = HuksOptions.inData;
  try {
    updateResult = new Array();
    let KeyAlias = srcKeyAlies;
    if (isEncrypt) {
      await publicGenerateKeyFunc(srcKeyAlies, genHuksOptionsNONC);
      encryptedData = HuksOptions.inData;
      await publicExportKeyFunc(srcKeyAlies, genHuksOptionsNONC);
      await publicImportKeyFunc(newSrcKeyAlies, HuksOptions);
      KeyAlias = newSrcKeyAlies;
    }
    HuksOptions.inData = inputInData;
    await publicInitFunc(KeyAlias, HuksOptions);
    await publicUpdateFunc(HuksOptions);
    await publicFinishAbortFunc(HuksOptions, thirdInderfaceName, isEncrypt);
    if (!isEncrypt || (isEncrypt && thirdInderfaceName == 'abort')) {
      await publicDeleteKeyFunc(srcKeyAlies, genHuksOptionsNONC);
      await publicDeleteKeyFunc(newSrcKeyAlies, genHuksOptionsNONC);
    }
  } catch (e) {
    expect(null).assertFail();
  }
}

describe('SecurityHuksCipherRSAPromiseJsunit', function () {
  it('testCipherRSA101', 0, async function (done) {
    const srcKeyAlies = 'testCipherRSASize512PADDINGNONESHA256KeyAlias101';
    const newSrcKeyAlies =
      'testCipherRSASize512PADDINGNONESHA256NewKeyAlias101';
    genHuksOptions.properties.splice(
      3,
      1,
      HuksCipherRSA.HuksKeyRSABLOCKMODEECB
    );
    genHuksOptions.properties.splice(4, 1, HuksCipherRSA.HuksKeyRSAPADDINGNONE);
    genHuksOptions.properties.splice(
      5,
      1,
      HuksCipherRSA.HuksKeyRSADIGESTSHA256
    );

    let HuksOptions = {
      properties: new Array(
        HuksCipherRSA.HuksKeyAlgRSA,
        HuksCipherRSA.HuksKeyPurposeENCRYPT,
        HuksCipherRSA.HuksKeyRSASize512,
        HuksCipherRSA.HuksKeyRSAPADDINGNONE,
        HuksCipherRSA.HuksKeyRSABLOCKMODEECB,
        HuksCipherRSA.HuksKeyRSADIGESTSHA256
      ),
      inData: gInData64Array,
      outData: stringToUint8Array('0'),
    };
    await publicCipherFunc(
      srcKeyAlies,
      newSrcKeyAlies,
      genHuksOptions,
      HuksOptions,
      'finish',
      true
    );
    HuksOptions = {
      properties: new Array(
        HuksCipherRSA.HuksKeyAlgRSA,
        HuksCipherRSA.HuksKeyPurposeDECRYPT,
        HuksCipherRSA.HuksKeyRSASize512,
        HuksCipherRSA.HuksKeyRSAPADDINGNONE,
        HuksCipherRSA.HuksKeyRSABLOCKMODEECB,
        HuksCipherRSA.HuksKeyRSADIGESTSHA256
      ),
      inData: new Uint8Array(updateResult),
      outData: stringToUint8Array('0'),
    };
    await publicCipherFunc(
      srcKeyAlies,
      newSrcKeyAlies,
      genHuksOptions,
      HuksOptions,
      'finish',
      false
    );
    done();
  });

  it('testCipherRSA102', 0, async function (done) {
    const srcKeyAlies = 'testCipherRSASize512PADDINGNONESHA256KeyAlias102';
    const newSrcKeyAlies =
      'testCipherRSASize512PADDINGNONESHA256NewKeyAlias101';
    let HuksOptions = {
      properties: new Array(
        HuksCipherRSA.HuksKeyAlgRSA,
        HuksCipherRSA.HuksKeyPurposeENCRYPT,
        HuksCipherRSA.HuksKeyRSASize512,
        HuksCipherRSA.HuksKeyRSAPADDINGNONE,
        HuksCipherRSA.HuksKeyRSABLOCKMODEECB,
        HuksCipherRSA.HuksKeyRSADIGESTSHA256
      ),
      inData: gInData64Array,
      outData: stringToUint8Array('0'),
    };
    await publicCipherFunc(
      srcKeyAlies,
      newSrcKeyAlies,
      genHuksOptions,
      HuksOptions,
      'abort',
      true
    );
    done();
  });

  it('testCipherRSA103', 0, async function (done) {
    const srcKeyAlies = 'testCipherRSASize512PADDINGNONESHA256KeyAlias103';
    const newSrcKeyAlies =
      'testCipherRSASize512PADDINGNONESHA256NewKeyAlias103';
    let HuksOptions = {
      properties: new Array(
        HuksCipherRSA.HuksKeyAlgRSA,
        HuksCipherRSA.HuksKeyPurposeENCRYPT,
        HuksCipherRSA.HuksKeyRSASize512,
        HuksCipherRSA.HuksKeyRSAPADDINGNONE,
        HuksCipherRSA.HuksKeyRSABLOCKMODEECB,
        HuksCipherRSA.HuksKeyRSADIGESTSHA256
      ),
      inData: gInData64Array,
      outData: stringToUint8Array('0'),
    };
    await publicCipherFunc(
      srcKeyAlies,
      newSrcKeyAlies,
      genHuksOptions,
      HuksOptions,
      'finish',
      true
    );
    HuksOptions = {
      properties: new Array(
        HuksCipherRSA.HuksKeyAlgRSA,
        HuksCipherRSA.HuksKeyPurposeDECRYPT,
        HuksCipherRSA.HuksKeyRSASize512,
        HuksCipherRSA.HuksKeyRSAPADDINGNONE,
        HuksCipherRSA.HuksKeyRSABLOCKMODEECB,
        HuksCipherRSA.HuksKeyRSADIGESTSHA256
      ),
      inData: new Uint8Array(updateResult),
      outData: stringToUint8Array('0'),
    };
    await publicCipherFunc(
      srcKeyAlies,
      newSrcKeyAlies,
      genHuksOptions,
      HuksOptions,
      'finish',
      false
    );
    done();
  });

  it('testCipherRSA104', 0, async function (done) {
    const srcKeyAlies = 'testCipherRSASize512PADDINGNONESHA256KeyAlias104';
    const newSrcKeyAlies =
      'testCipherRSASize512PADDINGNONESHA256NewKeyAlias104';
    let HuksOptions = {
      properties: new Array(
        HuksCipherRSA.HuksKeyAlgRSA,
        HuksCipherRSA.HuksKeyPurposeENCRYPT,
        HuksCipherRSA.HuksKeyRSASize512,
        HuksCipherRSA.HuksKeyRSAPADDINGNONE,
        HuksCipherRSA.HuksKeyRSABLOCKMODEECB,
        HuksCipherRSA.HuksKeyRSADIGESTSHA256
      ),
      inData: gInData64Array,
      outData: stringToUint8Array('0'),
    };
    await publicCipherFunc(
      srcKeyAlies,
      newSrcKeyAlies,
      genHuksOptions,
      HuksOptions,
      'abort',
      true
    );
    done();
  });
});
