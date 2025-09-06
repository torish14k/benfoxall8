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

describe('ActsAnsEnableNotificationFourTest', function () {
    console.info("===========ActsEnableNotificationTest4 start====================>");
    /*
     * @tc.number: ActsEnableNotification_test_0700
     * @tc.name: enableNotification()
     * @tc.desc: verify the function of enableNotification
     */
    it('ActsEnableNotification_test_0700', 0, async function (done) {
        await notify.enableNotification({
            bundle:"com.neu.actsanslocalnotificationtest",
        },100,(err) => {
            console.log("==========================>ActsEnableNotification_test_0700 success=======================>"+err)
        })
        done();
    })
    /*
     * @tc.number: ActsEnableNotification_test_0800
     * @tc.name: enableNotification()
     * @tc.desc: verify the function of enableNotification
     */
    it('ActsEnableNotification_test_0800', 0, async function (done) {
        await notify.enableNotification(
            {
                bundle:"com.neu.actsanslocalnotificationtest",
            },100).then(console.log("==========================>ActsEnableNotification_test_0800 success=======================>"))
        done();
    })
    /*
     * @tc.number: ActsSystemNotification_test_0700
     * @tc.name: isNotificationEnabled(bundle)
     * @tc.desc: verify the function of isNotificationEnabled
     */
    it('ActsSystemNotification_test_0700', 0, async function (done) {
        await notify.isNotificationEnabled({
            bundle:"com.neu.actsanslocalnotificationtest",
        },(err,data) => {
            console.log("==========================>ActsSystemNotification_test_0700 success=======================>"+err+data)
            expect(typeof(data)).assertEqual('boolean')
        })
        done();
    })
    /*
     * @tc.number: ActsSystemNotification_test_0800
     * @tc.name: isNotificationEnabled(bundle)
     * @tc.desc: verify the function of isNotificationEnabled
     */
    it('ActsSystemNotification_test_0800', 0, async function (done) {
        var promise = await notify.isNotificationEnabled(
            {
                bundle:"com.neu.actsanslocalnotificationtest",
            })
        expect(typeof(promise)).assertEqual('boolean')
        console.log("==========================>ActsSystemNotification_test_0800 success=======================>"+promise)
        done();
    })

})

