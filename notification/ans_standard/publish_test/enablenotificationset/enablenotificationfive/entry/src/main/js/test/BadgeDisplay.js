/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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

import notify from '@ohos.notification'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'
var time = 1000
describe('ActsAnsEnableNotificationSetFiveTest', function () {
    console.info("===ActsEnableNotificationSetTest5 start===>");

    /*
     * @tc.number: ActsEnableNotificationSet_test_0900
     * @tc.name: enableNotification()
     * @tc.desc: verify the function of enableNotification
     */
    it('ActsEnableNotificationSet_test_0900', 0, async function (done) {
        await notify.enableNotification({
            bundle:"com.example.actsanslocalnotificationtest",
        },"",(err) => {
            console.log("====>ActsEnableNotificationSet_test_0900 success====>"+err)
        })
        done();
        setTimeout(function(){
            console.debug("====>time out ActsEnableNotificationSet_test_0900====>");
        }, time);
    })

    /*
     * @tc.number: ActsEnableNotificationSet_test_1000
     * @tc.name: enableNotification()
     * @tc.desc: verify the function of enableNotification
     */
    it('ActsEnableNotificationSet_test_1000', 0, async function (done) {
        var promise =  notify.enableNotification(
            {
                bundle:"com.example.actsanslocalnotificationtest",
            },"")
	expect(promise).assertEqual(undefined)
        done();
        setTimeout(function(){
            console.debug("====>time out ActsEnableNotificationSet_test_1000====>");
        }, time);
    })

    /*
     * @tc.number: ActsSystemNotificationSet_test_0900
     * @tc.name: isNotificationEnabled(bundle)
     * @tc.desc: verify the function of isNotificationEnabled
     */
    it('ActsSystemNotificationSet_test_0900', 0, async function (done) {
        await notify.isNotificationEnabled({
            bundle:"com.example.actsanslocalnotificationtest",
        },(err,data) => {
            console.log("====>ActsSystemNotificationSet_test_0900 success====>"+err+data)
            expect(typeof(data)).assertEqual('boolean')
        })
        done();
        setTimeout(function(){
            console.debug("====>time out ActsSystemNotificationSet_test_0900====>");
        }, time);
    })

    /*
     * @tc.number: ActsSystemNotificationSet_test_1000
     * @tc.name: isNotificationEnabled(bundle)
     * @tc.desc: verify the function of isNotificationEnabled
     */
    it('ActsSystemNotificationSet_test_1000', 0, async function (done) {
        var promise = await notify.isNotificationEnabled(
            {
                bundle:"com.example.actsanslocalnotificationtest",
            })
        expect(typeof(promise)).assertEqual('boolean')
        console.log("====>ActsSystemNotificationSet_test_1000 success====>"+promise)
        done();
        setTimeout(function(){
            console.debug("====>time out ActsSystemNotificationSet_test_1000====>");
        }, time);
    })

})

