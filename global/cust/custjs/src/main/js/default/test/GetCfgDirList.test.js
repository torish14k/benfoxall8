/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

import configPolicy from '@ohos.configPolicy'

describe('GetCfgDirListTest', function () {

    /* *
    * @tc.number SUB_CUST_JS_005
    * @tc.name test getCfgDirList method in callback mode
    * @tc.desc get getCfgDirList in callback mode
    */
    it('getCfgDirList_test_005', 0, async function (done) {
        configPolicy.getCfgDirList((error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgDirList_test_005:' + value);
        });
        done();
    })

    /* *
    * @tc.number SUB_CUST_JS_006
    * @tc.name test getCfgDirList method in promise mode
    * @tc.desc get getCfgDirList in promise mode
    */
    it('getCfgDirList_test_006', 0, async function (done) {
        configPolicy.getCfgDirList().then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgDirList_test_006:' + value);
        });
        done();
    })
})