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
import { HuksDerivePBKDF2 } from '../../../../../../../utils/param/derive/publicDeriveParam';
import { stringToUint8Array } from '../../../../../../../utils/param/publicFunc';
import { publicDeriveFunc } from '../../../../../../../utils/param/derive/publicDeriveCallback';
import { HksTag } from '../../../../../../../utils/param/publicParam';

let srcData63 = Data.Date63KB;
let srcData63Kb = stringToUint8Array(srcData63);
let HuksOptions63kb = {
  properties: new Array(
    HuksDerivePBKDF2.HuksKeyAlgAES,
    HuksDerivePBKDF2.HuksKeyPurposePBKDF2,
    HuksDerivePBKDF2.HuksTagPBKDF2DigestSHA256,
    HuksDerivePBKDF2.HuksKeyPBKDF2Size128
  ),
  inData: srcData63Kb,
};

describe('SecurityHuksDerivePBKDF2CallbackJsunit', function () {
  it('testDerivePBKDF2Finish63KB001', 0, async function (done) {
    const srcKeyAliesFirst =
      'testDerivePBKDF2Size128SHA256Finish63KBDeriveKeyAlias_01_001';
    let huksOptionsFinish = {
      properties: new Array(
        HuksDerivePBKDF2.HuksKeySTORAGE,
        HuksDerivePBKDF2.HuksKeyISKEYALIAS,
        HuksDerivePBKDF2.HuksKeyALGORITHMAES,
        HuksDerivePBKDF2.HuksKeySIZE256,
        HuksDerivePBKDF2.HuksKeyPurposeENCRYPTDECRYPT,
        HuksDerivePBKDF2.HuksKeyDIGESTNONE,
        {
          tag: HksTag.HKS_TAG_KEY_ALIAS,
          value: stringToUint8Array(srcKeyAliesFirst),
        },
        HuksDerivePBKDF2.HuksKeyPADDINGNONE,
        HuksDerivePBKDF2.HuksKeyBLOCKMODEECB
      ),
      inData: srcData63Kb,
    };
    await publicDeriveFunc(
      srcKeyAliesFirst,
      HuksOptions63kb,
      huksOptionsFinish,
      'finish'
    );
    done();
  });
});
