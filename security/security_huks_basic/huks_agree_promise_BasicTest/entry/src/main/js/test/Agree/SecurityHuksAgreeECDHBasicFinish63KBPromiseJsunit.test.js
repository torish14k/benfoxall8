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

import { describe, it, beforeEach } from 'deccjsunit/index';
import * as Data from '../../../../../../../utils/data.json';
import { stringToUint8Array } from '../../../../../../../utils/param/publicFunc';
import { HuksAgreeECDH } from '../../../../../../../utils/param/agree/publicAgreeParam';
import { publicAgreeFunc } from '../../../../../../../utils/param/agree/publicAgreePromise';
import { HksTag } from '../../../../../../../utils/param/publicParam';

let srcData63 = Data.Date63KB;
let srcData63Kb = stringToUint8Array(srcData63);

let HuksOptions63kb = {
  properties: new Array(
    HuksAgreeECDH.HuksKeyAlgECC,
    HuksAgreeECDH.HuksKeyPurposeECDH,
    HuksAgreeECDH.HuksKeyECCSize224,
    HuksAgreeECDH.HuksKeyECCDIGEST,
    HuksAgreeECDH.HuksKeyECCPADDING,
    HuksAgreeECDH.HuksKeyECCBLOCKMODE
  ),
  inData: srcData63Kb,
};

describe('SecurityHuksAgreeECDHPromiseJsunit', function () {
  beforeEach(function () {
    HuksOptions63kb = {
      properties: new Array(
        HuksAgreeECDH.HuksKeyAlgECC,
        HuksAgreeECDH.HuksKeyPurposeECDH,
        HuksAgreeECDH.HuksKeyECCSize224,
        HuksAgreeECDH.HuksKeyECCDIGEST,
        HuksAgreeECDH.HuksKeyECCPADDING,
        HuksAgreeECDH.HuksKeyECCBLOCKMODE
      ),
      inData: srcData63Kb,
    };
    console.info('test beforeEach called');
  });

  it('testAgreeECDHFinish63KBAgree101', 0, async function (done) {
    const srcKeyAliesFirst =
      'testAgreeECDHSize224Finish63KBAgreeKeyAlias_01_101';
    const srcKeyAliesSecond =
      'testAgreeECDHSize224Finish63KBAgreeKeyAlias_02_101';
    let huksOptionsFinish = {
      properties: new Array(
        HuksAgreeECDH.HuksKeySTORAGE,
        HuksAgreeECDH.HuksKeyISKEYALIAS,
        HuksAgreeECDH.HuksKeyALGORITHMAES,
        HuksAgreeECDH.HuksKeySIZE256,
        HuksAgreeECDH.HuksKeyPurposeENCRYPTDECRYPT,
        HuksAgreeECDH.HuksKeyDIGESTNONE,
        {
          tag: HksTag.HKS_TAG_KEY_ALIAS,
          value: stringToUint8Array(srcKeyAliesFirst),
        },
        HuksAgreeECDH.HuksKeyPADDINGNONE,
        HuksAgreeECDH.HuksKeyBLOCKMODEECB
      ),
      inData: srcData63Kb,
    };
    await publicAgreeFunc(
      srcKeyAliesFirst,
      srcKeyAliesSecond,
      HuksOptions63kb,
      huksOptionsFinish,
      'finish'
    );
    done();
  });
});
