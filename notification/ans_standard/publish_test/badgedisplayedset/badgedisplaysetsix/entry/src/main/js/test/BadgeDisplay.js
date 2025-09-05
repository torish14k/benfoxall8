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

describe('ActsAnsBadgeDisplaySetSixTest', function () {
    console.info("===========ActsDoNotDisturbModeSetTest1 start====================>");
    /*
     * @tc.number: ActsBadgeDisplaySet_test_1100
     * @tc.name: isBadgeDisplayed()
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsBadgeDisplaySet_test_1100', 0, async function (done) {
        await notify.displayBadge({
            bundle:"com.neu.actsanslocalcandisplaytest"
        },true,(err) => {
            console.log("==========================>ActsBadgeDisplaySet_test_1100 success=======================>"+err)
        })
        done();
    })
    /*
     * @tc.number: ActsBadgeDisplaySet_test_1200
     * @tc.name: displayBadge()
     * @tc.desc: verify the function of displayBadge
     */
    it('ActsBadgeDisplaySet_test_1200', 0, async function (done) {
        await notify.displayBadge(
            {
                bundle:"com.neu.actsanslocalcandisplaytest"
            },true).then(console.log("==========================>ActsBadgeDisplaySet_test_1200 success=======================>"))
        done();
    })
    /*
     * @tc.number: ActsSystemCanDisplaySet_test_1100
     * @tc.name: isBadgeDisplayed(bundle)
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsSystemCanDisplaySet_test_1100', 0, async function (done) {
        await notify.isBadgeDisplayed({bundle:""},(err,data) => {
            console.log("==========================>ActsSystemCanDisplaySet_test_1100 success=======================>"+err+data)
            expect(typeof(data)).assertEqual('boolean')
        })
        done();
    })
    /*
     * @tc.number: ActsSystemCanDisplaySet_test_1200
     * @tc.name: isBadgeDisplayed(bundle)
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsSystemCanDisplaySet_test_1200', 0, async function (done) {
        var promise = await notify.isBadgeDisplayed({bundle:""})
        console.log("==========================>ActsSystemCanDisplaySet_test_1200 success=======================>"+promise)
        expect(typeof(promise)).assertEqual('boolean')
        done();
    })
})

