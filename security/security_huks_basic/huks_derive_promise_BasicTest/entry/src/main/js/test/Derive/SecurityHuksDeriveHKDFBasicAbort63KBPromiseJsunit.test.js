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

import { describe, it } from 'deccjsunit/index';
import Data from '../../../../../../../utils/data.json';
import { HuksDeriveHKDF } from '../../../../../../../utils/param/derive/publicDeriveParam';
import { stringToUint8Array } from '../../../../../../../utils/param/publicFunc';
import { publicDeriveFunc } from '../../../../../../../utils/param/derive/publicDerivePromise';
import { HksTag } from '../../../../../../../utils/param/publicParam';

let srcData63 = Data.Date63KB;
let srcData63Kb = stringToUint8Array(srcData63);

let HuksOptions63kb = {
  properties: new Array(
    HuksDeriveHKDF.HuksKeyAlgAES,
    HuksDeriveHKDF.HuksKeyPurposeHKDF,
    HuksDeriveHKDF.HuksTagHKDFDigestSHA256,
    HuksDeriveHKDF.HuksKeyHKDFSize128
  ),
  inData: srcData63Kb,
};

describe('SecurityHuksDeriveHKDFPromiseJsunit', function () {
  it('testDeriveHKDFAbort63KBDerive101', 0, async function (done) {
    const srcKeyAliesFirst =
      'testDeriveHKDFSize128SHA256Abort63KBDeriveKeyAlias_01_101';
    let huksOptionsFinish = {
      properties: new Array(
        HuksDeriveHKDF.HuksKeySTORAGE,
        HuksDeriveHKDF.HuksKeyISKEYALIAS,
        HuksDeriveHKDF.HuksKeyALGORITHMAES,
        HuksDeriveHKDF.HuksKeySIZE256,
        HuksDeriveHKDF.HuksKeyPurposeENCRYPTDECRYPT,
        HuksDeriveHKDF.HuksKeyDIGESTNONE,
        {
          tag: HksTag.HKS_TAG_KEY_ALIAS,
          value: stringToUint8Array(srcKeyAliesFirst),
        },
        HuksDeriveHKDF.HuksKeyPADDINGNONE,
        HuksDeriveHKDF.HuksKeyBLOCKMODEECB
      ),
      inData: srcData63Kb,
    };
    await publicDeriveFunc(
      srcKeyAliesFirst,
      HuksOptions63kb,
      huksOptionsFinish,
      'abort'
    );
    done();
  });
});
