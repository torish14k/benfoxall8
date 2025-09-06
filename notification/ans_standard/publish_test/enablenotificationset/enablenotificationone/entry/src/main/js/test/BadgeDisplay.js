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

describe('ActsAnsEnableNotificationSetOneTest', function () {
    console.info("===========ActsEnableNotificationSetTest1 start====================>");
    /*
     * @tc.number: ActsEnableNotification_test_0100
     * @tc.name: enableNotification()
     * @tc.desc: verify the function of enableNotification
     */
    it('ActsEnableNotificationSet_test_0100', 0, async function (done) {
        await notify.enableNotification({
            bundle:"com.neu.actsanslocalnotificationtest",
        },true,(err) => {
            console.log("==========================>ActsEnableNotificationSet_test_0100 success=======================>"+err)
        })
        done();
    })
    /*
     * @tc.number: ActsEnableNotificationSet_test_0200
     * @tc.name: enableNotification()
     * @tc.desc: verify the function of enableNotification
     */
    it('ActsEnableNotificationSet_test_0200', 0, async function (done) {
        await notify.enableNotification(
            {
                bundle:"com.neu.actsanslocalnotificationtest",
            },true).then(console.log("==========================>ActsEnableNotificationSet_test_0200 success=======================>"))
        done();
    })
    /*
     * @tc.number: ActsSystemNotificationSet_test_0100
     * @tc.name: isNotificationEnabled(bundle)
     * @tc.desc: verify the function of isNotificationEnabled
     */
    it('ActsSystemNotificationSet_test_0100', 0, async function (done) {
        await notify.isNotificationEnabled({
            bundle:"com.neu.actsanslocalnotificationtest",
        },(err,data) => {
            console.log("==========================>ActsSystemNotificationSet_test_0100 success=======================>"+err+data)
            expect(typeof(data)).assertEqual('boolean')
        })
        done();
    })
    /*
     * @tc.number: ActsSystemNotificationSet_test_0200
     * @tc.name: isNotificationEnabled(bundle)
     * @tc.desc: verify the function of isNotificationEnabled
     */
    it('ActsSystemNotificationSet_test_0200', 0, async function (done) {
        var promise = await notify.isNotificationEnabled(
            {
                bundle:"com.neu.actsanslocalnotificationtest",
            })
        expect(typeof(promise)).assertEqual('boolean')
        console.log("==========================>ActsSystemNotificationSet_test_0200 success=======================>"+promise)
        done();
    })

})

