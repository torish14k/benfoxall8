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

import bundle from '@ohos.bundle'
import { describe, it, expect } from 'deccjsunit/index'

const LAUNCHER_BUNDLE_NAME = 'com.ohos.launcher';
const LAUNCHER_MAIN_ABILITY = 'com.ohos.launcher.MainAbility';
const DEFAULT_FLAG = bundle.BundleFlag.GET_BUNDLE_DEFAULT;
const DEFAULT_USER_ID = 100;
const INVALID_CODE = 1;

describe('ActsBmsJsUnPermissionTest', function () {

    /*
     * @tc.number: getApplicationInfoTest_100
     * @tc.name: test getApplicationInfo
     * @tc.desc: test getApplicationInfo
     */
    it('getApplicationInfoTest_100', 0, async function (done) {
        await bundle.getApplicationInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_FLAG, DEFAULT_USER_ID).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
        bundle.getApplicationInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_FLAG, DEFAULT_USER_ID, (err, data) => {
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual(undefined);
            done();
        });
    });

    /*
     * @tc.number: getAllApplicationInfoTest_100
     * @tc.name: test getAllApplicationInfo
     * @tc.desc: test getAllApplicationInfo
     */
    it('getAllApplicationInfoTest_100', 0, async function (done) {
        await bundle.getAllApplicationInfo(DEFAULT_FLAG, DEFAULT_USER_ID).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
        bundle.getAllApplicationInfo(DEFAULT_FLAG, DEFAULT_USER_ID, (err, data) => {
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual(undefined);
            done();
        });
    });

    /*
     * @tc.number: getBundleInfoTest_100
     * @tc.name: test getBundleInfo
     * @tc.desc: test getBundleInfo
     */
    it('getBundleInfoTest_100', 0, async function (done) {
        await bundle.getBundleInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_USER_ID).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
        bundle.getBundleInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_USER_ID, (err, data) => {
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual(undefined);
            done();
        });
    });

    /*
     * @tc.number: getAllBundleInfoTest_100
     * @tc.name: test getAllBundleInfo
     * @tc.desc: test getAllBundleInfo
     */
    it('getAllBundleInfoTest_100', 0, async function (done) {
        await bundle.getAllBundleInfo(DEFAULT_FLAG).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
        bundle.getAllBundleInfo(DEFAULT_FLAG, (err, data) => {
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual(undefined);
            done();
        });
    });

    /*
     * @tc.number: queryAbilityByWantTest_100
     * @tc.name: test queryAbilityByWant
     * @tc.desc: test queryAbilityByWant
     */
    it('queryAbilityByWantTest_100', 0, async function (done) {
        await bundle.queryAbilityByWant({
            bundleName: LAUNCHER_BUNDLE_NAME,
            abilityName: LAUNCHER_MAIN_ABILITY
        }, DEFAULT_FLAG, DEFAULT_USER_ID).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
        bundle.queryAbilityByWant({
            bundleName: LAUNCHER_BUNDLE_NAME,
            abilityName: LAUNCHER_MAIN_ABILITY
        }, DEFAULT_FLAG, DEFAULT_USER_ID, (err, data) => {
            console.info("data ===================:" + data);
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual("QueryAbilityInfos failed");
            done();
        });
    });

    /*
     * @tc.number: getLaunchWantForBundleTest_100
     * @tc.name: test getLaunchWantForBundle
     * @tc.desc: test getLaunchWantForBundle
     */
    it('getLaunchWantForBundleTest_100', 0, async function (done) {
        await bundle.getLaunchWantForBundle(LAUNCHER_BUNDLE_NAME).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
        bundle.getLaunchWantForBundle(LAUNCHER_BUNDLE_NAME, (err, data) => {
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual(undefined);
            done();
        });
    });

    /*
     * @tc.number: setApplicationEnabledTest_100
     * @tc.name: test setApplicationEnabled
     * @tc.desc: test setApplicationEnabled
     */
    it('setApplicationEnabledTest_100', 0, async function (done) {
        await bundle.setApplicationEnabled(LAUNCHER_BUNDLE_NAME, false).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
    });

    /*
     * @tc.number: setAbilityEnabledTest_100
     * @tc.name: test setAbilityEnabled
     * @tc.desc: test setAbilityEnabled
     */
    it('setAbilityEnabledTest_100', 0, async function (done) {
        let abilityInfo = {
            bundleName: LAUNCHER_BUNDLE_NAME,
            name: LAUNCHER_MAIN_ABILITY
        };
        await bundle.setAbilityEnabled(abilityInfo, false).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
    });

    /*
    * @tc.number: getAbilityLabelTest_100
    * @tc.name: getAbilityLabel : Gets the specified ability label
    * @tc.desc: Check the return value of the interface
    * @tc.level   0
    */
    it('getAbilityLabelTest_100', 0, async function (done) {
        await bundle.getAbilityLabel(LAUNCHER_BUNDLE_NAME, LAUNCHER_MAIN_ABILITY)
            .then((data) => {
                expect().assertFail();
                done();
            })
            .catch((error) => {
                expect(error).assertEqual(INVALID_CODE);
                done();
            });
        bundle.getAbilityLabel(LAUNCHER_BUNDLE_NAME, LAUNCHER_MAIN_ABILITY, (err, data) => {
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual(undefined);
            done();
        });
    });

    /*
     * @tc.number: getAbilityInfo_100
     * @tc.name: test getAbilityInfo
     * @tc.desc: test getAbilityInfo
     */
    it('getAbilityInfo_100', 0, async function (done) {
        await bundle.getAbilityInfo(LAUNCHER_BUNDLE_NAME, LAUNCHER_MAIN_ABILITY).then(data => {
            expect().assertFail();
            done();
        }).catch(err => {
            expect(err).assertEqual(INVALID_CODE);
            done();
        });
        bundle.getAbilityInfo(LAUNCHER_BUNDLE_NAME, LAUNCHER_MAIN_ABILITY, (err, data) => {
            expect(err).assertEqual(INVALID_CODE);
            expect(data).assertEqual(undefined);
            done();
        });
    });
})
