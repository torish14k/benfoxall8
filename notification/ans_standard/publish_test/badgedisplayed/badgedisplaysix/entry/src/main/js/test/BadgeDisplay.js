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
describe('ActsAnsBadgeDisplaySixTest', function () {
    console.info("====ActsDoNotDisturbModeTest1 start====>");

    /*
     * @tc.number: ActsBadgeDisplay_test_0100
     * @tc.name: isBadgeDisplayed()
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsBadgeDisplay_test_1100', 0, async function (done) {
        await notify.displayBadge({
            bundle:"com.neu.actsanslocalcandisplaytest"
        },true,(err) => {
            console.log("====>ActsBadgeDisplay_test_1100 success====>"+err)
        })
        done();
        setTimeout(function(){
            console.debug("====>time out ActsBadgeDisplay_test_1100====>");
        }, time);
    })

    /*
     * @tc.number: ActsBadgeDisplay_test_1200
     * @tc.name: displayBadge()
     * @tc.desc: verify the function of displayBadge
     */
    it('ActsBadgeDisplay_test_1200', 0, async function (done) {
        await notify.displayBadge(
            {
                bundle:"com.neu.actsanslocalcandisplaytest"
            },true).then(console.log("====>ActsBadgeDisplay_test_1200 success====>"))
        done();
        setTimeout(function(){
            console.debug("====>time out ActsBadgeDisplay_test_1200====>");
        }, time);
    })

    /*
     * @tc.number: ActsSystemCanDisplay_test_1100
     * @tc.name: isBadgeDisplayed(bundle)
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsSystemCanDisplay_test_1100', 0, async function (done) {
        await notify.isBadgeDisplayed({bundle:""},(err,data) => {
            console.log("====>ActsSystemCanDisplay_test_1100 success====>"+err+data)
            expect(typeof(data)).assertEqual('boolean')
        })
        done();
        setTimeout(function(){
            console.debug("====>time out ActsSystemCanDisplay_test_1100====>");
        }, time);
    })

    /*
     * @tc.number: ActsSystemCanDisplay_test_1200
     * @tc.name: isBadgeDisplayed(bundle)
     * @tc.desc: verify the function of isBadgeDisplayed
     */
    it('ActsSystemCanDisplay_test_1200', 0, async function (done) {
        var promise = await notify.isBadgeDisplayed({bundle:""})
        console.log("====>ActsSystemCanDisplay_test_1200 success====>"+promise)
        expect(typeof(promise)).assertEqual('boolean')
        done();
        setTimeout(function(){
            console.debug("====>time out ActsSystemCanDisplay_test_1200====>");
        }, time);
    })
})

