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
import { HuksSignVerifyED25519 } from '../../../../../../../utils/param/signverify/publicSignverifyParam';
import { stringToUint8Array } from '../../../../../../../utils/param/publicFunc';
import { publicSignVerifyFunc } from '../../../../../../../utils/param/signverify/publicSignverifyPromise.js';
let srcData63 = Data.Data63b;
let srcData63Kb = stringToUint8Array(srcData63);
let srcData65 = Data.Data65b;
let srcData65Kb = stringToUint8Array(srcData65);
describe('SecurityHuksSignVerifyED25519PromiseJsunit', function () {
  it('testSignVerifyED25519101', 0, async function (done) {
    const srcKeyAlies = 'testSignVerifyED25519Size256SIGNKeyAlias101';
    let HuksOptions = {
      properties: new Array(
        HuksSignVerifyED25519.HuksKeyAlgED25519,
        HuksSignVerifyED25519.HuksKeyED25519PurposeSIGN,
        HuksSignVerifyED25519.HuksKeyED25519Size256,
        HuksSignVerifyED25519.HuksTagDigestSHA1
      ),
      inData: srcData63Kb,
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
        HuksSignVerifyED25519.HuksKeyAlgED25519,
        HuksSignVerifyED25519.HuksKeyED25519PurposeVERIFY,
        HuksSignVerifyED25519.HuksKeyED25519Size256,
        HuksSignVerifyED25519.HuksTagDigestSHA1
      ),
      inData: srcData63Kb,
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

  it('testSignVerifyED25519102', 0, async function (done) {
    const srcKeyAlies = 'testSignVerifyED25519Size256SIGNKeyAlias102';
    let HuksOptions = {
      properties: new Array(
        HuksSignVerifyED25519.HuksKeyAlgED25519,
        HuksSignVerifyED25519.HuksKeyED25519PurposeSIGN,
        HuksSignVerifyED25519.HuksKeyED25519Size256,
        HuksSignVerifyED25519.HuksTagDigestSHA1
      ),
      inData: srcData63Kb,
    };
    await publicSignVerifyFunc(
      srcKeyAlies,
      srcKeyAlies + 'New',
      HuksOptions,
      'abort',
      true
    );
    done();
  });

  it('testSignVerifyED25519103', 0, async function (done) {
    const srcKeyAlies = 'testSignVerifyED25519Size256SIGNKeyAlias103';
    let HuksOptions = {
      properties: new Array(
        HuksSignVerifyED25519.HuksKeyAlgED25519,
        HuksSignVerifyED25519.HuksKeyED25519PurposeSIGN,
        HuksSignVerifyED25519.HuksKeyED25519Size256,
        HuksSignVerifyED25519.HuksTagDigestSHA1
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
        HuksSignVerifyED25519.HuksKeyAlgED25519,
        HuksSignVerifyED25519.HuksKeyED25519PurposeVERIFY,
        HuksSignVerifyED25519.HuksKeyED25519Size256,
        HuksSignVerifyED25519.HuksTagDigestSHA1
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

  it('testSignVerifyED25519104', 0, async function (done) {
    const srcKeyAlies = 'testSignVerifyED25519Size256SIGNKeyAlias104';
    let HuksOptions = {
      properties: new Array(
        HuksSignVerifyED25519.HuksKeyAlgED25519,
        HuksSignVerifyED25519.HuksKeyED25519PurposeSIGN,
        HuksSignVerifyED25519.HuksKeyED25519Size256,
        HuksSignVerifyED25519.HuksTagDigestSHA1
      ),
      inData: srcData65Kb,
    };
    await publicSignVerifyFunc(
      srcKeyAlies,
      srcKeyAlies + 'New',
      HuksOptions,
      'abort',
      true
    );
    done();
  });
});
