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
describe('ActsAnsBadgeDisplaySetTwoTest', function () {
    console.info("===ActsDoNotDisturbModeSetTest2 start===>");

    /*
     * @tc.number: ActsBadgeDisplaySet_test_0300
     * @tc.name: displayBadge()
     * @tc.desc: verify the function of displayBadge
     */
    it('ActsBadgeDisplaySet_test_0300', 0, async function (done) {
        await notify.displayBadge({
            bundle:"com.neu.actsanslocalcandisplaytest"
        },false,(err) => {
            console.log("====>ActsBadgeDisplaySet_test_0300 success====>"+err)
        })
        done();
        setTimeout(function(){
            console.debug("====>time out ActsBadgeDisplaySet_test_0300====>");
        }, time);
    })

    /*
     * @tc.number: ActsBadgeDisplaySet_test_0400
     * @tc.name: displayBadge()
     * @tc.desc: verify the function of displayBadge
     */
    it('ActsBadgeDisplaySet_test_0400', 0, async function (done) {
        await notify.displayBadge(
            {
                bundle:"com.neu.actsanslocalcandisplaytest"
            },false).then(console.log("====>ActsBadgeDisplaySet_test_0400 success====>"))
        done();
        setTimeout(function(){
            console.debug("====>time out ActsBadgeDisplaySet_test_0400====>");
        }, time);
    })

    /*
     * @tc.number: ActsSystemCanDisplaySet_test_0300
     * @tc.name: isBadgeDisplayed(bundle)
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsSystemCanDisplaySet_test_0300', 0, async function (done) {
        await notify.isBadgeDisplayed({
            bundle:"com.neu.actsanslocalcandisplaytest",
        },(err,data) => {
            console.log("====>ActsSystemCanDisplaySet_test_0300 success====>"+err+data)
            expect(typeof(data)).assertEqual('boolean')
        })
        done();
        setTimeout(function(){
            console.debug("====>time out ActsSystemCanDisplaySet_test_0300====>");
        }, time);
    })

    /*
     * @tc.number: ActsSystemCanDisplaySet_test_0400
     * @tc.name: isBadgeDisplayed(bundle)
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsSystemCanDisplaySet_test_0400', 0, async function (done) {
        var promise = await notify.isBadgeDisplayed(
            {
                bundle:"com.neu.actsanslocalcandisplaytest",
            })
        console.log("====>ActsSystemCanDisplaySet_test_0400 success====>"+promise)
        expect(typeof(promise)).assertEqual('boolean')
        done();
        setTimeout(function(){
            console.debug("====>time out ActsSystemCanDisplaySet_test_0400====>");
        }, time);
    })

})

