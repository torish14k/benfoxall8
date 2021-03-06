/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from "deccjsunit/index.ets"
import bundle from '@ohos.bundle'

const DEFAULT_FLAG = bundle.BundleFlag.GET_BUNDLE_DEFAULT;
const INVALID_CODE = 1;
const LAUNCHER_BUNDLE_NAME = "com.ohos.launcher";
const SELF_BUNDLENAME = "com.example.actsbmsetsunpermissiontest";
const SELF_ABILITYNAME = "com.example.actsbmsetsunpermissiontest.MainAbility";

export default function actsBmsJsUnPermissionTest() {
    describe('actsBmsJsUnPermissionTest', function () {

        /**
        * @tc.number    getApplicationInfos_1300
        * @tc.name      getApplicationInfos_1300
        * @tc.desc      test getAllApplicationInfo 
        */
        it('getApplicationInfos_1300', 0, async function (done) {
            await bundle.getAllApplicationInfo(DEFAULT_FLAG).then(data => {
                expect().assertFail();
                done();
            }).catch(err => {
                expect(err).assertEqual(INVALID_CODE);
                done();
            });
            bundle.getAllApplicationInfo(DEFAULT_FLAG, (err, data) => {
                expect(err).assertEqual(INVALID_CODE);
                expect(data).assertEqual(undefined);
                done();
            });
        });

        /**
        * @tc.number    getBundleInfo_2000
        * @tc.name      getBundleInfo_2000
        * @tc.desc      test getBundleInfo
        */
        it('getBundleInfo_2000', 0, async function (done) {
            await bundle.getBundleInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_FLAG, { userId: 100 }).then(data => {
                expect().assertFail();
                done();
            }).catch(err => {
                expect(err).assertEqual(INVALID_CODE);
                done();
            });
            bundle.getBundleInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_FLAG, { userId: 100 }, (err, data) => {
                expect(err).assertEqual(INVALID_CODE);
                expect(data).assertEqual(undefined);
                done();
            });
        });

        /**
        * @tc.number    getApplicationInfo_1800
        * @tc.name      getApplicationInfo_1800
        * @tc.desc      test getApplicationInfo 
        */
        it('getApplicationInfo_1800', 0, async function (done) {
            await bundle.getApplicationInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_FLAG).then(data => {
                expect().assertFail();
                done();
            }).catch(err => {
                expect(err).assertEqual(INVALID_CODE);
                done();
            });
            bundle.getApplicationInfo(LAUNCHER_BUNDLE_NAME, DEFAULT_FLAG, (err, data) => {
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
        it('getAbilityInfo_200', 0, async function (done) {
            await bundle.getAbilityInfo(SELF_BUNDLENAME, SELF_ABILITYNAME).then(res => {
                console.info('actwsBundleManager getAbilityInfo promise success res:' + JSON.stringify(res));
                for (const item in res) {
                    const a = res[item];
                    console.info(item + ":" + JSON.stringify(a));
                };
                checkAbilityInfo(res);
            }).catch(err => {
                expect(err).assertFail();
            });
            bundle.getAbilityInfo(SELF_BUNDLENAME, SELF_ABILITYNAME, (err, res) => {
                if (err) {
                    expect(err).assertFail();
                    done();
                    return;
                }
                console.info('actwsBundleManager getAbilityInfo callback success res:' + JSON.stringify(res));
                for (const item in res) {
                    const a = res[item];
                    console.info(item + ":" + JSON.stringify(a));
                };
                checkAbilityInfo(res);
                done();
            });
        });

        async function checkAbilityInfo(data) {
            console.info("checkAbilityInfo start !!!");
            expect(data.bundleName).assertEqual("com.example.actsbmsetsunpermissiontest");
            expect(data.name).assertEqual("com.example.actsbmsetsunpermissiontest.MainAbility");
            expect(data.label).assertEqual("$string:entry_MainAbility");
            expect(data.description).assertEqual("$string:description_mainability");
            expect(data.icon).assertEqual("$media:icon");
            expect(data.srcPath).assertEqual("MainAbility");
            expect(data.srcLanguage).assertEqual("ets");
            expect(data.isVisible).assertEqual(true);
            expect(data.deviceTypes[0]).assertEqual("phone");
            expect(data.process).assertEqual("");
            expect(data.uri).assertEqual("");
            expect(data.moduleName).assertEqual("entry");
            expect(data.type).assertEqual(1);
            expect(data.orientation).assertEqual(0);
            expect(data.launchMode).assertEqual(1);
            expect(data.backgroundModes).assertEqual(0);
            expect(data.descriptionId).assertLarger(0);
            expect(data.formEnabled).assertEqual(false);
            expect(data.iconId).assertLarger(0);
            except(data.labelId).assertLarger(0);
            expect(data.subType).assertEqual(0);
            except(data.enabled).assertEqual(true);
            expect(data.readPermission).assertEqual("");
            expect(data.writePermission).assertEqual("");
            expect(data.targetAbility).assertEqual("");
            expect(data.theme).assertEqual("");
            expect(data.metaData).assertEqual([]);
            expect(data.metadata).assertEqual([]);
            checkApplicationInfo(data.applicationInfo);
            console.log("---checkAbilityInfo_other End---  ");
        }

        async function checkApplicationInfo(info) {
            console.info("checkApplicationInfo start !!!");
            expect(info.name).assertEqual("com.example.actsbmsetsunpermissiontest");
            expect(info.codePath).assertEqual("/data/app/el1/bundle/public/com.example.actsbmsetsunpermissiontest");
            expect(info.accessTokenId > 0).assertTrue();
            expect(info.description).assertEqual("$string:description_mainability");
            expect(info.descriptionId > 0).assertTrue();
            expect(info.icon).assertEqual("$media:icon");
            expect(info.iconId > 0).assertTrue();
            expect(info.label).assertEqual("$string:entry_MainAbility");
            expect(info.labelId > 0).assertTrue();
            expect(info.systemApp).assertEqual(true);
            expect(info.entryDir).assertEqual("/data/app/el1/bundle/public/com.example.actsbmsetsunpermissiontest/com.example.actsbmsetsunpermissiontest");
            expect(info.supportedModes).assertEqual(0);
            expect(info.process).assertEqual("");
            expect(info.moduleSourceDirs[0]).assertEqual("/data/app/el1/bundle/public/com.example.actsbmsetsunpermissiontest/com.example.actsbmsetsunpermissiontest");
            expect(info.metaData).expect({});
            expect(info.metadata).expect({});
            expect(info.enabled).expect(true);
            expect(info.flags).expect(0);
            expect(info.uid).assertLarger(0);
            expect(info.entityType).assertEqual("unspecified");
            expect(info.removable).assertEqual(true);
            console.info("checkApplicationInfo end !!!");
        }
    })
}
