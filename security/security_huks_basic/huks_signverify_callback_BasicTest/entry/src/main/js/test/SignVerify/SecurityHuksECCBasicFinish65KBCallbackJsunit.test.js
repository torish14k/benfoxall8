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
import { HuksSignVerifyECC } from '../../../../../../../utils/param/signverify/publicSignverifyParam';
import { stringToUint8Array } from '../../../../../../../utils/param/publicFunc';
import { publicSignVerifyFunc } from '../../../../../../../utils/param/signverify/publicSignverifyPromise.js';
let srcData65 = Data.Data65b;
let srcData65Kb = stringToUint8Array(srcData65);
describe('SecurityHuksSignVerifyECCCallbackJsunit', function () {
  it('testSignVerifyECC003', 0, async function (done) {
    const srcKeyAlies = 'testSignVerifyECCSize224SIGNNONEKeyAlias003';
    let HuksOptions = {
      properties: new Array(
        HuksSignVerifyECC.HuksKeyAlgECC,
        HuksSignVerifyECC.HuksKeyECCPurposeSIGN,
        HuksSignVerifyECC.HuksTagECCDigestNONE,
        HuksSignVerifyECC.HuksKeyECCSize224
      ),
      inData: srcData65Kb,
    };
    await publicSignVerifyFunc(
      srcKeyAlies,
      srcKeyAlies + 'New',
      HuksOptions,
      'finish',
      true
    );
    HuksOptions = {
      properties: new Array(
        HuksSignVerifyECC.HuksKeyAlgECC,
        HuksSignVerifyECC.HuksKeyECCPurposeVERIFY,
        HuksSignVerifyECC.HuksTagECCDigestNONE,
        HuksSignVerifyECC.HuksKeyECCSize224
      ),
      inData: srcData65Kb,
    };
    await publicSignVerifyFunc(
      srcKeyAlies,
      srcKeyAlies + 'New',
      HuksOptions,
      'finish',
      false
    );
    done();
  });
});
