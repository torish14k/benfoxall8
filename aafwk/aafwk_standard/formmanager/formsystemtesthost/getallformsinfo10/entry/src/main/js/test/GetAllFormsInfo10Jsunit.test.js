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

import formManager from '@ohos.ability.formManager'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

const TIMEOUT = 3000;
describe('getAllFormsInfoTest', function () {
    console.log("system application and has permissions Test");

    /**
     * @tc.name getAllFormsInfo test
     * @tc.number FMS_getFormsInfo_0300
     * @tc.desc All form configuration information is empty (by AsyncCallback)
     */
    it('FMS_getFormsInfo_0300_callback', 0, async function (done) {
        console.log("FMS_getFormsInfo_0300_callback begin");

        var ret = formManager.getAllFormsInfo(
            (result, data) => {
                console.log("FMS_getFormsInfo_0300_callback async::sucess, data json:"
                    + JSON.stringify(data));
                console.log("FMS_getFormsInfo_0300_callback async::result, result:" + result);
                expect(result).assertEqual(0);
                console.log("FMS_getFormsInfo_0300_callback result end");
                done();
            }
        );

        setTimeout(function () {
            console.info('=====================FMS_getFormsInfo_0300_callback==================end');
        }, TIMEOUT)
        console.log("FMS_getFormsInfo_0300_callback end, ret:"+ret);
    })

    /**
     * @tc.name getAllFormsInfo test
     * @tc.number FMS_getFormsInfo_0300
     * @tc.desc All form configuration information is empty (by Promise)
     */
    it('FMS_getFormsInfo_0300_promise', 0, async function (done) {
        console.log("FMS_getFormsInfo_0300_promise begin");

        var promise = formManager.getAllFormsInfo();
        promise.then((result) => {
            console.log("FMS_getFormsInfo_0300_promise result:" + result);
            expect(result).assertEqual(0);
            console.log("FMS_getFormsInfo_0300_promise result end");
            done();
        }
        );

        setTimeout(function () {
            console.info('=====================FMS_getFormsInfo_0300_promise==================end');
        }, TIMEOUT)
    })

}) 
