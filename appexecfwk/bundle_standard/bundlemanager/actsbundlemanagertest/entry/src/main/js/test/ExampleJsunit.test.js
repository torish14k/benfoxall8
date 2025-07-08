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

import app from '@system.app'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'
import demo from '@ohos.bundle'

const PATH = "/data/"
const ERROR = "error.hap"
const BMSJSTEST1 = "bmsJstest1.hap"
const BMSJSTEST2 = "bmsJstest2.hap"
const BMSJSTEST3 = "bmsJstest3.hap"
const BMSJSTEST4 = "bmsJstest4.hap"
const BMSJSTEST5 = "bmsJstest5.hap"
const BMSJSTEST6 = "bmsJstest6.hap"
const BMSJSTEST7 = "bmsJstest7.hap"
const BMSJSTEST8 = "bmsJstest8.hap"
const BMSJSTEST9 = "bmsJstest9.hap"
const NAME1 = "com.example.myapplication1"
const NAME2 = "com.example.myapplication2"
const NAME3 = "com.example.myapplication4"
const NAME4 = "com.example.myapplication5"
const NAME5 = "com.example.myapplication6"
const THIRD1 = "com.example.third1"
const LAUNCHER = "com.ohos.launcher"
const VERSIONCODE1 = 1
const VERSIONCODE2 = 2
const VERSIONNAME1 = "1.0"
const VERSIONNAME2 = "2.0"
const UIDMINVALUE = 9999
const OBJECT = "object"
const SUCCESS = "SUCCESS"
const DIR1 = "/data/accounts/account_0/applications/com.example.myapplication1/com.example.myapplication1"
const DIR2 = "/data/accounts/account_0/applications/com.example.myapplication2/com.example.myapplication2"
const SYSTEMDIR1 = "/data/accounts/account_0/applications/com.ohos.launcher/com.ohos.launcher.settings"
const CAMERA = 'com.permission.CAMERA'
const MUSIC = 'com.permission.music'
const WECHAT = 'com.permission.WeChat'
describe('ActsBundleManagerTest', function () {

    /**
     * @tc.number getBundleInfo_0100
     * @tc.name BUNDLEMGR::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with one hap.
     */
    it('getBundleInfo_0100', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST1], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        setTimeout(getInfo, 1)
        async function getInfo(){
            var datainfo = await demo.getBundleInfo(NAME1, 1)
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(VERSIONCODE1)
            expect(datainfo.versionName).assertEqual(VERSIONNAME1)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME1)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
            expect(datainfo.appInfo.supportedModes).assertEqual(0)
            expect(datainfo.appInfo.entryDir).assertEqual(DIR1)
            for (var j = 0; j < datainfo.appInfo.moduleInfos; j++) {
                expect(datainfo.appInfo.moduleInfos[j].moduleName).assertEqual("entry")
                expect(datainfo.appInfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR1)
            }
            expect(datainfo.appInfo.enabled).assertEqual(true)
            done()
        }
        done()
    })

    /**
     * @tc.number getBundleInfo_0600
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with one hap.
     */
    it('getBundleInfo_0600', 0, async function (done) {
        await demo.getBundleInfo(NAME1, 1, OnReceiveEvent)
        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(VERSIONCODE1)
            expect(datainfo.versionName).assertEqual(VERSIONNAME1)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME1)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
            expect(datainfo.appInfo.supportedModes).assertEqual(0)
            expect(datainfo.appInfo.entryDir).assertEqual(DIR1)
            for (var j = 0; j < datainfo.appInfo.moduleInfos; j++) {
                expect(datainfo.appInfo.moduleInfos[j].moduleName).assertEqual("entry")
                expect(datainfo.appInfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR1)
            }
            expect(datainfo.appInfo.enabled).assertEqual(true)
        }

        done()
    })

    /**
     * @tc.number getBundleInfo_1100
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with one hap and different param.
     */
    it('getBundleInfo_1100', 0, async function (done) {
        var datainfo = await demo.getBundleInfo(NAME1, 0)
        expect(datainfo.name).assertEqual(NAME1)
        expect(datainfo.vendor).assertEqual("example")
        expect(datainfo.versionCode).assertEqual(VERSIONCODE1)
        expect(datainfo.versionName).assertEqual(VERSIONNAME1)
        expect(datainfo.entryModuleName).assertEqual("entry")
        expect(datainfo.appInfo.name).assertEqual(NAME1)
        expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.appInfo.icon).assertEqual("$media:icon")
        expect(datainfo.appInfo.iconId).assertEqual(16777218)
        expect(datainfo.appInfo.label).assertEqual("$string:app_name")
        expect(datainfo.appInfo.labelId).assertEqual(16777216)
        expect(datainfo.appInfo.systemApp).assertEqual(false)
        expect(datainfo.appInfo.supportedModes).assertEqual(0)
        expect(datainfo.appInfo.entryDir).assertEqual(DIR1)
        expect(datainfo.appInfo.enabled).assertEqual(true)
        done()
    })

    /**
     * @tc.number getBundleInfo_1200
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with one hap and different param.
     */
    it('getBundleInfo_1200', 0, async function (done) {
        await demo.getBundleInfo(NAME1, 0, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(VERSIONCODE1)
            expect(datainfo.versionName).assertEqual(VERSIONNAME1)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME1)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
            expect(datainfo.appInfo.supportedModes).assertEqual(0)
            expect(datainfo.appInfo.entryDir).assertEqual(DIR1)
            for (var j = 0; j < datainfo.appInfo.moduleInfos; j++) {
                expect(datainfo.appInfo.moduleInfos[j].moduleName).assertEqual("entry")
                expect(datainfo.appInfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR1)
            }
            expect(datainfo.appInfo.enabled).assertEqual(true)
        }

        done()
    })

    /**
     * @tc.number getApplicationInfos_0100
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with one hap.
     */
    it('getApplicationInfos_0100', 0, async function (done) {
        var datainfo = await demo.getApplicationInfos(8, 0)
        checkgetApplicationInfos(datainfo)
        done()
    })
    function checkgetApplicationInfos(datainfo) {
        console.log("=============datainfo.length===============" + datainfo.length)
        expect(datainfo.length).assertLarger(0)
        for (var i = 0; i < datainfo.length; i++) {
            expect(datainfo[i].name.length).assertLarger(0)
            expect(datainfo[i].description.length).assertLarger(0)
            expect(datainfo[i].icon.length).assertLarger(0)
            expect(datainfo[i].label.length).assertLarger(0)
            expect(datainfo[i].entryDir.length).assertLarger(0)
            expect(datainfo[i].moduleSourceDirs.length).assertLarger(0)
            expect(datainfo[i].moduleInfos.length).assertLarger(0)
            expect(datainfo[i].supportedModes).assertEqual(0)
            expect(datainfo[i].flags).assertEqual(0)
            for(var j = 0; j < datainfo[i].moduleInfos; j++) {
                expect(datainfo[i].moduleInfos[j].moduleName.length).assertLarger(0)
                expect(datainfo[i].moduleInfos[j].moduleSourceDir.length).assertLarger(0)
            }
        }
    }

    /**
     * @tc.number getApplicationInfos_0600
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with one hap.
     */
    it('getApplicationInfos_0600', 0, async function (done) {
        await  demo.getApplicationInfos(8, 0, (error, datainfo) => {
            expect(datainfo.length).assertLarger(0)
            for (var i = 0; i < datainfo.length; i++) {
                expect(datainfo[i].name.length).assertLarger(0)
                expect(datainfo[i].description.length).assertLarger(0)
                expect(datainfo[i].icon.length).assertLarger(0)
                expect(datainfo[i].label.length).assertLarger(0)
                expect(datainfo[i].entryDir.length).assertLarger(0)
                expect(datainfo[i].moduleSourceDirs.length).assertLarger(0)
                expect(datainfo[i].moduleInfos.length).assertLarger(0)
                expect(datainfo[i].supportedModes).assertEqual(0)
                expect(datainfo[i].flags).assertEqual(0)
                for(var j = 0; j < datainfo[i].moduleInfos; j++) {
                    expect(datainfo[i].moduleInfos[j].moduleName.length).assertLarger(0)
                    expect(datainfo[i].moduleInfos[j].moduleSourceDir.length).assertLarger(0)
                }
            }
        });
        done()
    })

    /**
     * @tc.number getBundleInfos_0100
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with one hap.
     */
    it('getBundleInfos_0100', 0, async function (done) {
        var data = await demo.getBundleInfos(0)
        expect(typeof data).assertEqual(OBJECT)
        expect(data.length).assertLarger(0)
        for (var i = 0; i < data.length; i++) {
            expect(data[i].name.length).assertLarger(0)
            expect(data[i].entryModuleName.length).assertLarger(0)
            expect(data[i].appInfo.name.length).assertLarger(0)
            expect(data[i].appInfo.description.length).assertLarger(0)
            expect(data[i].appInfo.icon.length).assertLarger(0)
            expect(data[i].appInfo.label.length).assertLarger(0)
            expect(data[i].appInfo.supportedModes).assertEqual(0)
            expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
        }
        done();
    })

    /**
     * @tc.number getApplicationInfo_0100
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with one hap.
     */
    it('getApplicationInfo_0100', 0, async function (done) {
        var datainfo = await demo.getApplicationInfo(NAME1, 8, 1)
        expect(typeof datainfo).assertEqual(OBJECT)
        expect(datainfo.name.length).assertLarger(0)
        expect(datainfo.description.length).assertLarger(0)
        expect(datainfo.icon.length).assertLarger(0)
        expect(datainfo.label.length).assertLarger(0)
        expect(datainfo.entryDir.length).assertLarger(0)
        expect(datainfo.moduleSourceDirs.length).assertLarger(0)
        expect(datainfo.moduleInfos.length).assertLarger(0)
        expect(datainfo.name).assertEqual(NAME1)
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.systemApp).assertEqual(false)
        expect(datainfo.descriptionId).assertEqual(16777217)
        expect(datainfo.iconId).assertEqual(16777218)
        expect(datainfo.labelId).assertEqual(16777216)
        expect(datainfo.supportedModes).assertEqual(0)
        expect(datainfo.process).assertEqual("")
        expect(datainfo.enabled).assertEqual(true)
        expect(datainfo.flags).assertEqual(0)
        expect(datainfo.entryDir).assertEqual(DIR1)
        expect(datainfo.moduleSourceDirs).assertEqual(DIR1)
        for(var j = 0; j < datainfo.moduleInfos; j++) {
            expect(datainfo.moduleInfos[j].moduleName).assertEqual("entry")
            expect(datainfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR1)

        }
        done()
    })

    /**
     * @tc.number getBundleInfos_0600
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with one hap.
     */
    it('getBundleInfos_0600', 0, async function (done) {
        await demo.getBundleInfos(0, (error, data) => {
            expect(typeof data).assertEqual(OBJECT)
            expect(data.length).assertLarger(0)
            for (var i = 0; i < data.length; i++) {
                expect(data[i].name.length).assertLarger(0)
                expect(data[i].entryModuleName.length).assertLarger(0)
                expect(data[i].appInfo.name.length).assertLarger(0)
                expect(data[i].appInfo.description.length).assertLarger(0)
                expect(data[i].appInfo.icon.length).assertLarger(0)
                expect(data[i].appInfo.label.length).assertLarger(0)
                expect(data[i].appInfo.supportedModes).assertEqual(0)
                expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
            }
        })
        done();
    })

    /**
     * @tc.number getApplicationInfo_0600
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with one hap.
     */
    it('getApplicationInfo_0600', 0, async function (done) {
        await demo.getApplicationInfo(NAME1, 8, 1, (error, datainfo) => {
            expect(typeof datainfo).assertEqual(OBJECT)
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.descriptionId).assertEqual(16777217)
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.iconId).assertEqual(16777218)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.labelId).assertEqual(16777216)
            expect(datainfo.systemApp).assertEqual(false)
            expect(datainfo.supportedModes).assertEqual(0)
            expect(datainfo.entryDir).assertEqual(DIR1)
            expect(datainfo.enabled).assertEqual(true)
            for(var j = 0; j < datainfo.moduleInfos; j++) {
                expect(datainfo.moduleInfos[j].moduleName).assertEqual("entry")
                expect(datainfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR1)

            }
        })
        done()
    })

    /**
     * @tc.number getApplicationInfo_1100
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with one hap and different param.
     */
    it('getApplicationInfo_1100', 0, async function (done) {
        var datainfo = await demo.getApplicationInfo(NAME1, 0, 1)
        expect(typeof datainfo).assertEqual(OBJECT)
        expect(datainfo.name).assertEqual(NAME1)
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.name).assertEqual(NAME1)
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.descriptionId).assertEqual(16777217)
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.iconId).assertEqual(16777218)
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.labelId).assertEqual(16777216)
        expect(datainfo.systemApp).assertEqual(false)
        expect(datainfo.supportedModes).assertEqual(0)
        done()
    })

    /**
     * @tc.number getApplicationInfo_1200
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with one hap and different param.
     */
    it('getApplicationInfo_1200', 0, async function (done) {
        await demo.getApplicationInfo(NAME1, 0, 1, (error, datainfo) => {
            expect(typeof datainfo).assertEqual(OBJECT)
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.descriptionId).assertEqual(16777217)
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.iconId).assertEqual(16777218)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.labelId).assertEqual(16777216)
            expect(datainfo.systemApp).assertEqual(false)
            expect(datainfo.supportedModes).assertEqual(0)
        })
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0100
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with one hap.
     */
    it('getBundleArchiveInfo_0100', 0, async function (done) {
        var datainfo = await demo.getBundleArchiveInfo(PATH + BMSJSTEST1, 1)
        expect(datainfo.name).assertEqual(NAME1)
        expect(datainfo.vendor).assertEqual("example")
        expect(datainfo.versionCode).assertEqual(1)
        expect(datainfo.versionName).assertEqual(1.0)
        expect(datainfo.entryModuleName).assertEqual("entry")
        expect(datainfo.appInfo.name).assertEqual(NAME1)
        expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.appInfo.icon).assertEqual("$media:icon")
        expect(datainfo.appInfo.iconId).assertEqual(16777218)
        expect(datainfo.appInfo.label).assertEqual("$string:app_name")
        expect(datainfo.appInfo.labelId).assertEqual(16777216)
        expect(datainfo.appInfo.systemApp).assertEqual(false)
        expect(datainfo.appInfo.supportedModes).assertEqual(0)
        for (var j = 0; j < datainfo.appInfo.moduleInfos; j++) {
            expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
        }
        for (var j = 0; j < datainfo.abilityInfos; j++) {
            expect(datainfo.abilityInfos[j].name).assertEqual(".MainAbility")
            expect(datainfo.abilityInfos[j].label).assertEqual("$string:app_name")
            expect(datainfo.abilityInfos[j].description).assertEqual("$string:mainability_description")
            expect(datainfo.abilityInfos[j].icon).assertEqual("$media:icon")
            expect(datainfo.abilityInfos[j].isVisible).assertEqual(false)
            expect(datainfo.abilityInfos[j].bundleName).assertEqual(NAME1)
            expect(datainfo.abilityInfos[j].moduleName).assertEqual("entry")
        }
        done()
    })

    /**
     * @tc.number queryAbilityByWant_0400
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with one hap.
     */
    it('queryAbilityByWant_0400', 0, async function (done) {
        var datainfo =
            await demo.queryAbilityByWant({
                want: {
                    action: "action.system.home",
                    entities: ["entity.system.home"],
                    elementName: {
                        deviceId: "0",
                        bundleName: "com.example.myapplication1",
                        abilityName: "",
                    },
                }
            }, {
                params: {
                    flags: 8,
                    userId: "0",
                }
            })
        expect(datainfo.name.length).assertEqual(0)
        done();
    })

    /**
     * @tc.number queryAbilityByWant_0500
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with one hap.
     */
    it('queryAbilityByWant_0500', 0, async function (done) {
        var datainfo =
            await demo.queryAbilityByWant({
                want: {
                    action: "action.system.home",
                    entities: ["entity.system.home"],
                    elementName: {
                        deviceId: "0",
                        bundleName: "",
                        abilityName: "",
                    },
                }
            }, {
                params: {
                    flags: 8,
                    userId: "0",
                }
            })
        expect(datainfo.name.length).assertEqual(0)
        done();
    })

    /**
     * @tc.number queryAbilityByWant_0600
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with one hap.
     */
    it('queryAbilityByWant_0600', 0, async function (done) {
        await demo.queryAbilityByWant({
            want: {
                action: "action.system.home",
                entities: ["entity.system.home"],
                elementName: {
                    deviceId: "0",
                    bundleName: "com.example.myapplication1",
                    abilityName: ".MainAbility",
                },
            }
        }, {
            params: {
                flags: 8,
                userId: "0",
            }
        }, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(".MainAbility")
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.moduleName).assertEqual("entry")
            expect(datainfo.bundleName).assertEqual(NAME1)
            expect(datainfo.applicationInfo.name).assertEqual(NAME1)
            expect(datainfo.applicationInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.applicationInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.applicationInfo.icon).assertEqual("$media:icon")
            expect(datainfo.applicationInfo.iconId).assertEqual(16777218)
            expect(datainfo.applicationInfo.label).assertEqual("$string:app_name")
            expect(datainfo.applicationInfo.labelId).assertEqual(16777216)
            expect(datainfo.applicationInfo.systemApp).assertEqual(false)
            expect(datainfo.applicationInfo.supportedModes).assertEqual(0)
            expect(datainfo.applicationInfo.entryDir).assertEqual(DIR1)
            expect(datainfo.applicationInfo.enabled).assertEqual(true)
            for (var j = 0; j < datainfo.applicationInfo.moduleInfos; j++) {
                expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
                expect(datainfo.applicationInfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR1)
            }
            done()
        }
    })

    /**
     * @tc.number queryAbilityByWant_0900
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with one hap.
     */
    it('queryAbilityByWant_0900', 0, async function (done) {
        await demo.queryAbilityByWant({
            want: {
                action: "action.system.home",
                entities: ["entity.system.home"],
                elementName: {
                    deviceId: "0",
                    bundleName: "com.example.myapplication1",
                    abilityName: "",
                },
            }
        }, {
            params: {
                flags: 8,
                userId: "0",
            }
        }, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name.length).assertEqual(0)
            done();
        }
    })

    /**
     * @tc.number getBundleInfo_0200
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with two haps.
     */
    it('getBundleInfo_0200', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST2], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.install([PATH + BMSJSTEST3], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });

        });
        var datainfo = await demo.getBundleInfo(NAME2, 1)
        expect(datainfo.name).assertEqual(NAME2)
        expect(datainfo.vendor).assertEqual("example")
        expect(datainfo.versionCode).assertEqual(1)
        expect(datainfo.versionName).assertEqual(1.0)
        expect(datainfo.entryModuleName).assertEqual("entry")
        expect(datainfo.appInfo.name).assertEqual(NAME2)
        expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.appInfo.icon).assertEqual("$media:icon")
        expect(datainfo.appInfo.iconId).assertEqual(16777218)
        expect(datainfo.appInfo.label).assertEqual("$string:app_name")
        expect(datainfo.appInfo.labelId).assertEqual(16777216)
        expect(datainfo.appInfo.systemApp).assertEqual(false)
        done()
    })

    /**
     * @tc.number getBundleInfo_0700
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with two haps.
     */
    it('getBundleInfo_0700', 0, async function (done) {
        await demo.getBundleInfo(NAME2, 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME2)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(1)
            expect(datainfo.versionName).assertEqual(1.0)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME2)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
        }

        done()
    })

    /**
     * @tc.number getApplicationInfos_0200
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with two haps.
     */
    it('getApplicationInfos_0200', 0, async function (done) {
        var datainfo = await demo.getApplicationInfos(8, 0)
        console.info("==========ActsBmsGetInfosSecondScene is =========="+ JSON.stringify(datainfo));
        checkgetApplicationInfos(datainfo)
        done()
    })

    /**
     * @tc.number getApplicationInfos_0400
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with two haps and different param.
     */
    it('getApplicationInfos_0400', 0, async function (done) {
        var datainfo = await demo.getApplicationInfos(0, 0)
        expect(datainfo.length).assertLarger(0)
        checkgetApplicationInfos(datainfo)
        done()
    })

    /**
     * @tc.number getApplicationInfos_0700
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with two haps.
     */
    it('getApplicationInfos_0700', 0, async function (done) {
        await  demo.getApplicationInfos(8, 0, (error, datainfo) => {
            expect(datainfo.length).assertLarger(0)
            for (var i = 0; i < datainfo.length; i++) {
                expect(datainfo[i].name.length).assertLarger(0)
                expect(datainfo[i].description.length).assertLarger(0)
                expect(datainfo[i].icon.length).assertLarger(0)
                expect(datainfo[i].label.length).assertLarger(0)
                expect(datainfo[i].entryDir.length).assertLarger(0)
                expect(datainfo[i].moduleSourceDirs.length).assertLarger(0)
                expect(datainfo[i].moduleInfos.length).assertLarger(0)
                expect(datainfo[i].supportedModes).assertEqual(0)
                expect(datainfo[i].flags).assertEqual(0)
                for(var j = 0; j < datainfo[i].moduleInfos; j++) {
                    expect(datainfo[i].moduleInfos[j].moduleName.length).assertLarger(0)
                    expect(datainfo[i].moduleInfos[j].moduleSourceDir.length).assertLarger(0)
                }
            }
        });
        done()
    })

    /**
     * @tc.number getApplicationInfos_0900
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with two haps and different param.
     */
    it('getApplicationInfos_0900', 0, async function (done) {
        await  demo.getApplicationInfos(0, 0, (error, datainfo) => {
            expect(datainfo.length).assertLarger(0)
            for (var i = 0; i < datainfo.length; i++) {
                expect(datainfo[i].name.length).assertLarger(0)
                expect(datainfo[i].description.length).assertLarger(0)
                expect(datainfo[i].icon.length).assertLarger(0)
                expect(datainfo[i].label.length).assertLarger(0)
                expect(datainfo[i].entryDir.length).assertLarger(0)
                expect(datainfo[i].moduleSourceDirs.length).assertLarger(0)
                expect(datainfo[i].moduleInfos.length).assertLarger(0)
                expect(datainfo[i].supportedModes).assertEqual(0)
                expect(datainfo[i].flags).assertEqual(0)
                for(var j = 0; j < datainfo[i].moduleInfos; j++) {
                    expect(datainfo[i].moduleInfos[j].moduleName.length).assertLarger(0)
                    expect(datainfo[i].moduleInfos[j].moduleSourceDir.length).assertLarger(0)
                }
            }
        });
        done()
    })

    /**
     * @tc.number getBundleInfos_0200
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with two haps.
     */
    it('getBundleInfos_0200', 0, async function (done) {
        var data = await demo.getBundleInfos(0)
        expect(typeof data).assertEqual(OBJECT)
        expect(data.length).assertLarger(0)
        for (var i = 0; i < data.length; i++) {
            expect(data[i].name.length).assertLarger(0)
            expect(data[i].entryModuleName.length).assertLarger(0)
            expect(data[i].appInfo.name.length).assertLarger(0)
            expect(data[i].appInfo.description.length).assertLarger(0)
            expect(data[i].appInfo.icon.length).assertLarger(0)
            expect(data[i].appInfo.label.length).assertLarger(0)
            expect(data[i].appInfo.supportedModes).assertEqual(0)
            expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
        }
        done();
    })

    /**
     * @tc.number getBundleInfos_0400
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with two haps and different param.
     */
    it('getBundleInfos_0400', 0, async function (done) {
        var data = await demo.getBundleInfos(1)
        expect(typeof data).assertEqual(OBJECT)
        expect(data.length).assertLarger(0)
        for (var i = 0; i < data.length; i++) {
            expect(data[i].name.length).assertLarger(0)
            expect(data[i].entryModuleName.length).assertLarger(0)
            expect(data[i].appInfo.name.length).assertLarger(0)
            expect(data[i].appInfo.description.length).assertLarger(0)
            expect(data[i].appInfo.icon.length).assertLarger(0)
            expect(data[i].appInfo.label.length).assertLarger(0)
            expect(data[i].appInfo.supportedModes).assertEqual(0)
            expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
        }
        done();
    })

    /**
     * @tc.number getBundleInfos_0700
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with two haps.
     */
    it('getBundleInfos_0700', 0, async function (done) {
        await demo.getBundleInfos(0, (error, data) => {
            expect(typeof data).assertEqual(OBJECT)
            expect(data.length).assertLarger(0)
            for (var i = 0; i < data.length; i++) {
                expect(data[i].name.length).assertLarger(0)
                expect(data[i].entryModuleName.length).assertLarger(0)
                expect(data[i].appInfo.name.length).assertLarger(0)
                expect(data[i].appInfo.description.length).assertLarger(0)
                expect(data[i].appInfo.icon.length).assertLarger(0)
                expect(data[i].appInfo.label.length).assertLarger(0)
                expect(data[i].appInfo.supportedModes).assertEqual(0)
                expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
            }
        })
        done()
    })

    /**
     * @tc.number getBundleInfos_0900
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with two haps and different param.
     */
    it('getBundleInfos_0900', 0, async function (done) {
        await demo.getBundleInfos(1, (error, data) => {
            expect(typeof data).assertEqual(OBJECT)
            expect(data.length).assertLarger(0)
            for (var i = 0; i < data.length; i++) {
                expect(data[i].name.length).assertLarger(0)
                expect(data[i].entryModuleName.length).assertLarger(0)
                expect(data[i].appInfo.name.length).assertLarger(0)
                expect(data[i].appInfo.description.length).assertLarger(0)
                expect(data[i].appInfo.icon.length).assertLarger(0)
                expect(data[i].appInfo.label.length).assertLarger(0)
                expect(data[i].appInfo.supportedModes).assertEqual(0)
                expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
            }
        })
        done()
    })

    /**
     * @tc.number getApplicationInfo_0200
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with two haps.
     */
    it('getApplicationInfo_0200', 0, async function (done) {
        var datainfo = await demo.getApplicationInfo(NAME2, 8, 1)
        expect(typeof datainfo).assertEqual(OBJECT)
        expect(datainfo.name).assertEqual(NAME2)
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.name).assertEqual(NAME2)
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.descriptionId).assertEqual(16777217)
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.iconId).assertEqual(16777218)
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.labelId).assertEqual(16777216)
        expect(datainfo.systemApp).assertEqual(false)
        expect(datainfo.supportedModes).assertEqual(0)
        done()
    })

    /**
     * @tc.number getApplicationInfo_0700
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with two haps.
     */
    it('getApplicationInfo_0700', 0, async function (done) {
        await demo.getApplicationInfo(NAME2, 8, 1, (error, datainfo) => {
            expect(typeof datainfo).assertEqual(OBJECT)
            expect(datainfo.name).assertEqual(NAME2)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.name).assertEqual(NAME2)
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.descriptionId).assertEqual(16777217)
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.iconId).assertEqual(16777218)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.labelId).assertEqual(16777216)
            expect(datainfo.systemApp).assertEqual(false)
            expect(datainfo.supportedModes).assertEqual(0)
        })
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0200
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with two haps.
     */
    it('getBundleArchiveInfo_0200', 0, async function (done) {
        var datainfo = await demo.getBundleArchiveInfo(PATH + BMSJSTEST2, 1)
        expect(datainfo.name).assertEqual(NAME2)
        expect(datainfo.vendor).assertEqual("example")
        expect(datainfo.versionCode).assertEqual(1)
        expect(datainfo.versionName).assertEqual(1.0)
        expect(datainfo.entryModuleName).assertEqual("entry")
        expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.appInfo.icon).assertEqual("$media:icon")
        expect(datainfo.appInfo.iconId).assertEqual(16777218)
        expect(datainfo.appInfo.label).assertEqual("$string:app_name")
        expect(datainfo.appInfo.labelId).assertEqual(16777216)
        expect(datainfo.appInfo.systemApp).assertEqual(false)
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0700
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with two hap.
     */
    it('getBundleArchiveInfo_0700', 0, async function (done) {
        await demo.getBundleArchiveInfo(PATH + BMSJSTEST2, 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME2)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(1)
            expect(datainfo.versionName).assertEqual(1.0)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
        }

        done()
    })

    /**
     * @tc.number queryAbilityByWant_0200
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with two haps.
     */
    it('queryAbilityByWant_0200', 0, async function (done) {
        var datainfo =
            await demo.queryAbilityByWant({
                want: {
                    action: "action.system.home",
                    entities: ["entity.system.home"],
                    elementName: {
                        deviceId: "0",
                        bundleName: "com.example.myapplication2",
                        abilityName: ".MainAbility",
                    },
                }
            }, {
                params: {
                    flags: 8,
                    userId: "0",
                }
            })
        expect(datainfo.name).assertEqual(".MainAbility")
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.moduleName).assertEqual("entry")
        expect(datainfo.bundleName).assertEqual(NAME2)
        expect(datainfo.applicationInfo.name).assertEqual(NAME2)
        expect(datainfo.applicationInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.applicationInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.applicationInfo.icon).assertEqual("$media:icon")
        expect(datainfo.applicationInfo.iconId).assertEqual(16777218)
        expect(datainfo.applicationInfo.label).assertEqual("$string:app_name")
        expect(datainfo.applicationInfo.labelId).assertEqual(16777216)
        expect(datainfo.applicationInfo.systemApp).assertEqual(false)
        expect(datainfo.applicationInfo.supportedModes).assertEqual(0)
        expect(datainfo.applicationInfo.entryDir).assertEqual(DIR2)
        expect(datainfo.applicationInfo.enabled).assertEqual(true)
        for (var j = 0; j < datainfo.applicationInfo.moduleInfos; j++) {
            expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
            expect(datainfo.applicationInfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR2)
        }
        done();
    })

    /**
     * @tc.number queryAbilityByWant_0700
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with two haps.
     */
    it('queryAbilityByWant_0700', 0, async function (done) {
        await demo.queryAbilityByWant({
            want: {
                action: "action.system.home",
                entities: ["entity.system.home"],
                elementName: {
                    deviceId: "0",
                    bundleName: "com.example.myapplication2",
                    abilityName: ".MainAbility",
                },
            }
        }, {
            params: {
                flags: 8,
                userId: "0",
            }
        }, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(".MainAbility")
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.moduleName).assertEqual("entry")
            expect(datainfo.bundleName).assertEqual(NAME2)
            expect(datainfo.applicationInfo.name).assertEqual(NAME2)
            expect(datainfo.applicationInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.applicationInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.applicationInfo.icon).assertEqual("$media:icon")
            expect(datainfo.applicationInfo.iconId).assertEqual(16777218)
            expect(datainfo.applicationInfo.label).assertEqual("$string:app_name")
            expect(datainfo.applicationInfo.labelId).assertEqual(16777216)
            expect(datainfo.applicationInfo.systemApp).assertEqual(false)
            expect(datainfo.applicationInfo.supportedModes).assertEqual(0)
            expect(datainfo.applicationInfo.entryDir).assertEqual(DIR2)
            expect(datainfo.applicationInfo.enabled).assertEqual(true)
            for (var j = 0; j < datainfo.applicationInfo.moduleInfos; j++) {
                expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
                expect(datainfo.applicationInfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR2)
            }
            done()
        }
    })

    /**
     * @tc.number getBundleInfo_0300
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with three haps.
     */
    it('getBundleInfo_0300', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST4], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.install([PATH + BMSJSTEST5], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.install([PATH + BMSJSTEST6], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        var datainfo = await demo.getBundleInfo(NAME3, 1)
        expect(datainfo.name).assertEqual(NAME3)
        expect(datainfo.vendor).assertEqual("example")
        expect(datainfo.versionCode).assertEqual(1)
        expect(datainfo.versionName).assertEqual(1.0)
        expect(datainfo.entryModuleName).assertEqual("entry")
        expect(datainfo.appInfo.name).assertEqual(NAME3)
        expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.appInfo.icon).assertEqual("$media:icon")
        expect(datainfo.appInfo.iconId).assertEqual(16777218)
        expect(datainfo.appInfo.label).assertEqual("$string:app_name")
        expect(datainfo.appInfo.labelId).assertEqual(16777216)
        expect(datainfo.appInfo.systemApp).assertEqual(false)
        done()
    })

    /**
     * @tc.number getBundleInfo_0800
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with three haps.
     */
    it('getBundleInfo_0800', 0, async function (done) {
        await demo.getBundleInfo(NAME3, 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME3)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(1)
            expect(datainfo.versionName).assertEqual(1.0)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME3)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
        }

        done()
    })

    /**
     * @tc.number getApplicationInfos_0300
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with three haps.
     */
    it('getApplicationInfos_0300', 0, async function (done) {
        console.info('===start getApplicationInfos===')
        var datainfo = await demo.getApplicationInfos(8, 0)
        expect(datainfo.length).assertLarger(0)
        checkgetApplicationInfos(datainfo)
        done()
    })

    /**
     * @tc.number getApplicationInfos_0500
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with three haps and different param.
     */
    it('getApplicationInfos_0500', 0, async function (done) {
        await  demo.getApplicationInfos(0, 0, (error, datainfo) => {
            expect(datainfo.length).assertLarger(0)
            for (var i = 0; i < datainfo.length; i++) {
                expect(datainfo[i].name.length).assertLarger(0)
                expect(datainfo[i].description.length).assertLarger(0)
                expect(datainfo[i].icon.length).assertLarger(0)
                expect(datainfo[i].label.length).assertLarger(0)
                expect(datainfo[i].entryDir.length).assertLarger(0)
                expect(datainfo[i].moduleSourceDirs.length).assertLarger(0)
                expect(datainfo[i].moduleInfos.length).assertLarger(0)
                expect(datainfo[i].supportedModes).assertEqual(0)
                expect(datainfo[i].flags).assertEqual(0)
                for(var j = 0; j < datainfo[i].moduleInfos; j++) {
                    expect(datainfo[i].moduleInfos[j].moduleName.length).assertLarger(0)
                    expect(datainfo[i].moduleInfos[j].moduleSourceDir.length).assertLarger(0)
                }
            }
        });
        done()
    })

    /**
     * @tc.number getApplicationInfos_0800
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with three haps.
     */
    it('getApplicationInfos_0800', 0, async function (done) {
        await demo.getApplicationInfos(8, 0, (error, datainfo) => {
            expect(datainfo.length).assertLarger(0)
            for (var i = 0; i < datainfo.length; i++) {
                expect(datainfo[i].name.length).assertLarger(0)
                expect(datainfo[i].description.length).assertLarger(0)
                expect(datainfo[i].icon.length).assertLarger(0)
                expect(datainfo[i].label.length).assertLarger(0)
                expect(datainfo[i].entryDir.length).assertLarger(0)
                expect(datainfo[i].moduleSourceDirs.length).assertLarger(0)
                expect(datainfo[i].moduleInfos.length).assertLarger(0)
                expect(datainfo[i].supportedModes).assertEqual(0)
                expect(datainfo[i].flags).assertEqual(0)
                for(var j = 0; j < datainfo[i].moduleInfos; j++) {
                    expect(datainfo[i].moduleInfos[j].moduleName.length).assertLarger(0)
                    expect(datainfo[i].moduleInfos[j].moduleSourceDir.length).assertLarger(0)
                }
            }
        })
        done()
    })

    /**
     * @tc.number getApplicationInfos_1000
     * @tc.name BUNDLE::getApplicationInfos
     * @tc.desc Test getApplicationInfos interfaces with three haps and different param.
     */
    it('getApplicationInfos_1000', 0, async function (done) {
        await demo.getApplicationInfos(0, 0, (error, datainfo) => {
            expect(datainfo.length).assertLarger(0)
            for (var i = 0; i < datainfo.length; i++) {
                expect(datainfo[i].name.length).assertLarger(0)
                expect(datainfo[i].description.length).assertLarger(0)
                expect(datainfo[i].icon.length).assertLarger(0)
                expect(datainfo[i].label.length).assertLarger(0)
                expect(datainfo[i].entryDir.length).assertLarger(0)
                expect(datainfo[i].moduleSourceDirs.length).assertLarger(0)
                expect(datainfo[i].moduleInfos.length).assertLarger(0)
                expect(datainfo[i].supportedModes).assertEqual(0)
                expect(datainfo[i].flags).assertEqual(0)
                for(var j = 0; j < datainfo[i].moduleInfos; j++) {
                    expect(datainfo[i].moduleInfos[j].moduleName.length).assertLarger(0)
                    expect(datainfo[i].moduleInfos[j].moduleSourceDir.length).assertLarger(0)
                }
            }
        })
        done()
    })

    /**
     * @tc.number getBundleInfos_0300
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with three haps.
     */
    it('getBundleInfos_0300', 0, async function (done) {
        var data = await demo.getBundleInfos(0)
        expect(data.length).assertLarger(0)
        for (var i = 0; i < data.length; i++) {
            expect(data[i].name.length).assertLarger(0)
            expect(data[i].entryModuleName.length).assertLarger(0)
            expect(data[i].appInfo.name.length).assertLarger(0)
            expect(data[i].appInfo.description.length).assertLarger(0)
            expect(data[i].appInfo.icon.length).assertLarger(0)
            expect(data[i].appInfo.label.length).assertLarger(0)
            expect(data[i].appInfo.supportedModes).assertEqual(0)
            expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
        }
        done()
    })

    /**
     * @tc.number getBundleInfos_0500
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with three haps and different param.
     */
    it('getBundleInfos_0500', 0, async function (done) {
        var data = await demo.getBundleInfos(1)
        expect(data.length).assertLarger(0)
        for (var i = 0; i < data.length; i++) {
            expect(data[i].name.length).assertLarger(0)
            expect(data[i].entryModuleName.length).assertLarger(0)
            expect(data[i].appInfo.name.length).assertLarger(0)
            expect(data[i].appInfo.description.length).assertLarger(0)
            expect(data[i].appInfo.icon.length).assertLarger(0)
            expect(data[i].appInfo.label.length).assertLarger(0)
            expect(data[i].appInfo.supportedModes).assertEqual(0)
            expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
        }
        done()
    })

    /**
     * @tc.number getBundleInfos_0800
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with three haps.
     */
    it('getBundleInfos_0800', 0, async function (done) {
        await demo.getBundleInfos(0, (error, data) => {
            expect(data.length).assertLarger(0)
            for (var i = 0; i < data.length; i++) {
                expect(data[i].name.length).assertLarger(0)
                expect(data[i].entryModuleName.length).assertLarger(0)
                expect(data[i].appInfo.name.length).assertLarger(0)
                expect(data[i].appInfo.description.length).assertLarger(0)
                expect(data[i].appInfo.icon.length).assertLarger(0)
                expect(data[i].appInfo.label.length).assertLarger(0)
                expect(data[i].appInfo.supportedModes).assertEqual(0)
                expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
            }
        })
        done()
    })

    /**
     * @tc.number getBundleInfos_1000
     * @tc.name BUNDLE::getBundleInfos
     * @tc.desc Test getBundleInfos interfaces with three haps and different param.
     */
    it('getBundleInfos_1000', 0, async function (done) {
        await demo.getBundleInfos(1, (error, data) => {
            expect(data.length).assertLarger(0)
            for (var i = 0; i < data.length; i++) {
                expect(data[i].name.length).assertLarger(0)
                expect(data[i].entryModuleName.length).assertLarger(0)
                expect(data[i].appInfo.name.length).assertLarger(0)
                expect(data[i].appInfo.description.length).assertLarger(0)
                expect(data[i].appInfo.icon.length).assertLarger(0)
                expect(data[i].appInfo.label.length).assertLarger(0)
                expect(data[i].appInfo.supportedModes).assertEqual(0)
                expect(data[i].appInfo.moduleInfos.length).assertLarger(0)
            }
        })
        done()
    })

    /**
     * @tc.number getApplicationInfo_0300
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with three haps.
     */
    it('getApplicationInfo_0300', 0, async function (done) {
        var datainfo = await demo.getApplicationInfo(NAME3, 8, 1)
        expect(datainfo.name).assertEqual(NAME3)
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.name).assertEqual(NAME3)
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.descriptionId).assertEqual(16777217)
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.iconId).assertEqual(16777218)
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.labelId).assertEqual(16777216)
        expect(datainfo.systemApp).assertEqual(false)
        expect(datainfo.supportedModes).assertEqual(0)
        done()
    })

    /**
     * @tc.number getApplicationInfo_0800
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with three haps.
     */
    it('getApplicationInfo_0800', 0, async function (done) {
        await demo.getApplicationInfo(NAME3, 8, 1, (error, datainfo) => {
            expect(datainfo.name).assertEqual(NAME3)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.name).assertEqual(NAME3)
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.descriptionId).assertEqual(16777217)
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.iconId).assertEqual(16777218)
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.labelId).assertEqual(16777216)
            expect(datainfo.systemApp).assertEqual(false)
            expect(datainfo.supportedModes).assertEqual(0)
        })
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0300
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with three haps.
     */
    it('getBundleArchiveInfo_0300', 0, async function (done) {
        var datainfo = await demo.getBundleArchiveInfo(PATH + BMSJSTEST4, 1)
        expect(datainfo.name).assertEqual(NAME3)
        expect(datainfo.vendor).assertEqual("example")
        expect(datainfo.versionCode).assertEqual(1)
        expect(datainfo.versionName).assertEqual(1.0)
        expect(datainfo.entryModuleName).assertEqual("entry")
        expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.appInfo.icon).assertEqual("$media:icon")
        expect(datainfo.appInfo.iconId).assertEqual(16777218)
        expect(datainfo.appInfo.label).assertEqual("$string:app_name")
        expect(datainfo.appInfo.labelId).assertEqual(16777216)
        expect(datainfo.appInfo.systemApp).assertEqual(false)
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0800
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with three hap.
     */
    it('getBundleArchiveInfo_0800', 0, async function (done) {
        await demo.getBundleArchiveInfo(PATH + BMSJSTEST4, 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME3)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(1)
            expect(datainfo.versionName).assertEqual(1.0)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
        }

        done()
    })

    /**
     * @tc.number queryAbilityByWant_0300
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with three haps.
     */
    it('queryAbilityByWant_0300', 0, async function (done) {
        var datainfo =
            await demo.queryAbilityByWant({
                want: {
                    action: "action.system.home",
                    entities: ["entity.system.home"],
                    elementName: {
                        deviceId: "0",
                        bundleName: "com.example.myapplication4",
                        abilityName: ".MainAbility",
                    },
                }
            }, {
                params: {
                    flags: 8,
                    userId: "0",
                }
            })
        expect(datainfo.name).assertEqual(".MainAbility")
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.moduleName).assertEqual("entry")
        expect(datainfo.bundleName).assertEqual(NAME3)
        expect(datainfo.applicationInfo.name).assertEqual(NAME3)
        expect(datainfo.applicationInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.applicationInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.applicationInfo.icon).assertEqual("$media:icon")
        expect(datainfo.applicationInfo.iconId).assertEqual(16777218)
        expect(datainfo.applicationInfo.label).assertEqual("$string:app_name")
        expect(datainfo.applicationInfo.labelId).assertEqual(16777216)
        expect(datainfo.applicationInfo.systemApp).assertEqual(false)
        expect(datainfo.applicationInfo.supportedModes).assertEqual(0)
        expect(datainfo.applicationInfo.enabled).assertEqual(true)
        for (var j = 0; j < datainfo.applicationInfo.moduleInfos; j++) {
            expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
        }
        done();
    })

    /**
     * @tc.number queryAbilityByWant_0800
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with three haps.
     */
    it('queryAbilityByWant_0800', 0, async function (done) {
        await demo.queryAbilityByWant({
            want: {
                action: "action.system.home",
                entities: ["entity.system.home"],
                elementName: {
                    deviceId: "0",
                    bundleName: "com.example.myapplication4",
                    abilityName: ".MainAbility",
                },
            }
        }, {
            params: {
                flags: 8,
                userId: "0",
            }
        }, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(".MainAbility")
            expect(datainfo.label).assertEqual("$string:app_name")
            expect(datainfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.icon).assertEqual("$media:icon")
            expect(datainfo.moduleName).assertEqual("entry")
            expect(datainfo.bundleName).assertEqual(NAME3)
            expect(datainfo.applicationInfo.name).assertEqual(NAME3)
            expect(datainfo.applicationInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.applicationInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.applicationInfo.icon).assertEqual("$media:icon")
            expect(datainfo.applicationInfo.iconId).assertEqual(16777218)
            expect(datainfo.applicationInfo.label).assertEqual("$string:app_name")
            expect(datainfo.applicationInfo.labelId).assertEqual(16777216)
            expect(datainfo.applicationInfo.systemApp).assertEqual(false)
            expect(datainfo.applicationInfo.supportedModes).assertEqual(0)
            expect(datainfo.applicationInfo.enabled).assertEqual(true)
            for (var j = 0; j < datainfo.applicationInfo.moduleInfos; j++) {
                expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
            }
            done()
        }
    })

    /**
     * @tc.number getBundleInfo_0400
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with error hap.
     */
    it('getBundleInfo_0400', 0, async function (done) {
        var datainfo = await demo.getBundleInfo('error', 1);
        expect(datainfo.name.length).assertEqual(0)
        done();
    })

    /**
     * @tc.number getBundleInfo_0900
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with error hap.
     */
    it('getBundleInfo_0900', 0, async function (done) {
        await demo.getBundleInfo('error', 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name.length).assertEqual(0)
        }

        done()
    })

    /**
     * @tc.number getApplicationInfo_0400
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with error hap.
     */
    it('getApplicationInfo_0400', 0, async function (done) {
        var datainfo = await demo.getApplicationInfo(ERROR, 8, 1)
        checkgetApplicationInfoe(datainfo)
        done()
    })
    function checkgetApplicationInfoe(datainfo) {
        expect(datainfo.name.length).assertEqual(0)
    }

    /**
     * @tc.number getApplicationInfo_0900
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with error hap.
     */
    it('getApplicationInfo_0900', 0, async function (done) {
        await demo.getApplicationInfo(ERROR, 8, 1, (error, datainfo) => {
            expect(datainfo.name.length).assertEqual(0)
        })
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0400
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with error hap.
     */
    it('getBundleArchiveInfo_0400', 0, async function (done) {
        var datainfo = await demo.getBundleArchiveInfo(PATH + ERROR, 1)
        expect(datainfo.name.length).assertEqual(0)
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0900
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with error hap.
     */
    it('getBundleArchiveInfo_0900', 0, async function (done) {
        await demo.getBundleArchiveInfo(PATH + ERROR, 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name.length).assertEqual(0)
        }

        done()
    })

    /**
     * @tc.number getBundleInfo_1000
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with none hap.
     */
    it('getBundleInfo_1000', 0, async function (done) {
        await demo.getBundleInfo(' ', 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name.length).assertEqual(0)
        }

        done()
    })

    /**
     * @tc.number getApplicationInfo_0500
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with none hap.
     */
    it('getApplicationInfo_0500', 0, async function (done) {
        await demo.getApplicationInfo('', 8, 1, (error, datainfo) => {
            expect(datainfo.name.length).assertEqual(0)
        })
        done()
    })

    /**
     * @tc.number getBundleInfo_0500
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with none hap.
     */
    it('getBundleInfo_0500', 0, async function (done) {
        var datainfo = await demo.getBundleInfo(' ', 1);
        expect(datainfo.name.length).assertEqual(0)
        done();
    })

    /**
     * @tc.number getApplicationInfo_1000
     * @tc.name BUNDLE::getApplicationInfo
     * @tc.desc Test getApplicationInfo interfaces with none hap.
     */
    it('getApplicationInfo_1000', 0, async function (done) {
        await demo.getApplicationInfo('', 8, 1, (error, datainfo) => {
            expect(datainfo.name.length).assertEqual(0)
        })
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0500
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with none hap.
     */
    it('getBundleArchiveInfo_0500', 0, async function (done) {
        var datainfo = await demo.getBundleArchiveInfo(' ', 1)
        expect(datainfo.name.length).assertEqual(0)
        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_0600
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with none hap.
     */
    it('getBundleArchiveInfo_0600', 0, async function (done) {
        await demo.getBundleArchiveInfo(PATH + BMSJSTEST1, 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(1)
            expect(datainfo.versionName).assertEqual(1.0)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME1)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
            expect(datainfo.appInfo.supportedModes).assertEqual(0)
            for (var j = 0; j < datainfo.appInfo.moduleInfos; j++) {
                expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
            }
            for (var j = 0; j < datainfo.abilityInfos; j++) {
                expect(datainfo.abilityInfos[j].name).assertEqual(".MainAbility")
                expect(datainfo.abilityInfos[j].label).assertEqual("$string:app_name")
                expect(datainfo.abilityInfos[j].description).assertEqual("$string:mainability_description")
                expect(datainfo.abilityInfos[j].icon).assertEqual("$media:icon")
                expect(datainfo.abilityInfos[j].isVisible).assertEqual(false)
                expect(datainfo.abilityInfos[j].bundleName).assertEqual(NAME1)
                expect(datainfo.abilityInfos[j].moduleName).assertEqual("entry")
            }
        }

        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_1000
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with none hap.
     */
    it('getBundleArchiveInfo_1000', 0, async function (done) {
        await demo.getBundleArchiveInfo(' ', 1, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name.length).assertEqual(0)
        }

        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_1100
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with none hap.
     */
    it('getBundleArchiveInfo_1100', 0, async function (done) {
        await demo.getBundleArchiveInfo(PATH + BMSJSTEST1, 0, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(1)
            expect(datainfo.versionName).assertEqual(1.0)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME1)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
            expect(datainfo.appInfo.supportedModes).assertEqual(0)
            for (var j = 0; j < datainfo.appInfo.moduleInfos; j++) {
                expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
            }
            for (var j = 0; j < datainfo.abilityInfos; j++) {
                expect(datainfo.abilityInfos[j].name).assertEqual(".MainAbility")
                expect(datainfo.abilityInfos[j].label).assertEqual("$string:app_name")
                expect(datainfo.abilityInfos[j].description).assertEqual("$string:mainability_description")
                expect(datainfo.abilityInfos[j].icon).assertEqual("$media:icon")
                expect(datainfo.abilityInfos[j].isVisible).assertEqual(false)
                expect(datainfo.abilityInfos[j].bundleName).assertEqual(NAME1)
                expect(datainfo.abilityInfos[j].moduleName).assertEqual("entry")
            }
        }

        done()
    })

    /**
     * @tc.number getBundleArchiveInfo_1200
     * @tc.name BUNDLE::getBundleArchiveInfo
     * @tc.desc Test getBundleArchiveInfo interfaces with none hap.
     */
    it('getBundleArchiveInfo_1200', 0, async function (done) {
        await demo.getBundleArchiveInfo(PATH + BMSJSTEST1, 0, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name).assertEqual(NAME1)
            expect(datainfo.vendor).assertEqual("example")
            expect(datainfo.versionCode).assertEqual(1)
            expect(datainfo.versionName).assertEqual(1.0)
            expect(datainfo.entryModuleName).assertEqual("entry")
            expect(datainfo.appInfo.name).assertEqual(NAME1)
            expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
            expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
            expect(datainfo.appInfo.icon).assertEqual("$media:icon")
            expect(datainfo.appInfo.iconId).assertEqual(16777218)
            expect(datainfo.appInfo.label).assertEqual("$string:app_name")
            expect(datainfo.appInfo.labelId).assertEqual(16777216)
            expect(datainfo.appInfo.systemApp).assertEqual(false)
            expect(datainfo.appInfo.supportedModes).assertEqual(0)
            for (var j = 0; j < datainfo.appInfo.moduleInfos; j++) {
                expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
            }
            for (var j = 0; j < datainfo.abilityInfos; j++) {
                expect(datainfo.abilityInfos[j].name).assertEqual(".MainAbility")
                expect(datainfo.abilityInfos[j].label).assertEqual("$string:app_name")
                expect(datainfo.abilityInfos[j].description).assertEqual("$string:mainability_description")
                expect(datainfo.abilityInfos[j].icon).assertEqual("$media:icon")
                expect(datainfo.abilityInfos[j].isVisible).assertEqual(false)
                expect(datainfo.abilityInfos[j].bundleName).assertEqual(NAME1)
                expect(datainfo.abilityInfos[j].moduleName).assertEqual("entry")
            }
        }

        done()
    })

    /**
     * @tc.number queryAbilityByWant_0100
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with none hap.
     */
    it('queryAbilityByWant_0100', 0, async function (done) {
        var datainfo =
            await demo.queryAbilityByWant({
                want: {
                    action: "action.system.home",
                    entities: ["entity.system.home"],
                    elementName: {
                        deviceId: "0",
                        bundleName: "com.example.myapplication1",
                        abilityName: ".MainAbility",
                    },
                }
            }, {
                params: {
                    flags: 8,
                    userId: "0",
                }
            })
        expect(datainfo.name).assertEqual(".MainAbility")
        expect(datainfo.label).assertEqual("$string:app_name")
        expect(datainfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.icon).assertEqual("$media:icon")
        expect(datainfo.moduleName).assertEqual("entry")
        expect(datainfo.bundleName).assertEqual(NAME1)
        expect(datainfo.applicationInfo.name).assertEqual(NAME1)
        expect(datainfo.applicationInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.applicationInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.applicationInfo.icon).assertEqual("$media:icon")
        expect(datainfo.applicationInfo.iconId).assertEqual(16777218)
        expect(datainfo.applicationInfo.label).assertEqual("$string:app_name")
        expect(datainfo.applicationInfo.labelId).assertEqual(16777216)
        expect(datainfo.applicationInfo.systemApp).assertEqual(false)
        expect(datainfo.applicationInfo.supportedModes).assertEqual(0)
        expect(datainfo.applicationInfo.entryDir).assertEqual(DIR1)
        expect(datainfo.applicationInfo.enabled).assertEqual(true)
        for (var j = 0; j < datainfo.applicationInfo.moduleInfos; j++) {
            expect(datainfo.applicationInfo.moduleInfos[j].moduleName).assertEqual("entry")
            expect(datainfo.applicationInfo.moduleInfos[j].moduleSourceDir).assertEqual(DIR1)
        }
        done();
    })

    /**
     * @tc.number getBundleInfo_1300
     * @tc.name BUNDLE::getBundleInfo
     * @tc.desc Test getBundleInfo interfaces with LAUNCHER hap.
     */
    it('getBundleInfo_1300', 0, async function (done) {
        var datainfo = await demo.getBundleInfo(LAUNCHER, 1)
        expect(datainfo.name).assertEqual(LAUNCHER)
        expect(datainfo.vendor).assertEqual("ohos")
        expect(datainfo.versionCode).assertEqual(1000000)
        expect(datainfo.versionName).assertEqual('1.0.0')
        expect(datainfo.entryModuleName).assertEqual("settings")
        expect(datainfo.uid).assertLarger(2099)
        expect(datainfo.appInfo.name).assertEqual(LAUNCHER)
        expect(datainfo.appInfo.description).assertEqual("$string:mainability_description")
        expect(datainfo.appInfo.descriptionId).assertEqual(16777217)
        expect(datainfo.appInfo.icon).assertEqual("$media:icon")
        expect(datainfo.appInfo.iconId).assertEqual(16777218)
        expect(datainfo.appInfo.label).assertEqual("$string:app_name")
        expect(datainfo.appInfo.labelId).assertEqual(16777216)
        expect(datainfo.appInfo.systemApp).assertEqual(true)
        expect(datainfo.appInfo.supportedModes).assertEqual(0)
        expect(datainfo.appInfo.entryDir).assertEqual(SYSTEMDIR1)
        expect(datainfo.appInfo.moduleInfos.length).assertLarger(0)
        expect(datainfo.appInfo.enabled).assertEqual(true)
        done()
    })

    /**
     * @tc.number queryAbilityByWant_1000
     * @tc.name BUNDLE::queryAbilityByWant
     * @tc.desc Test queryAbilityByWant interfaces with system hap.
     */
    it('queryAbilityByWant_1000', 0, async function (done) {
        await demo.queryAbilityByWant({
            want: {
                action: "action.system.home",
                entities: ["entity.system.home"],
                elementName: {
                    deviceId: "0",
                    bundleName: "",
                    abilityName: "",
                },
            }
        }, {
            params: {
                flags: 8,
                userId: "0",
            }
        }, OnReceiveEvent)

        function OnReceiveEvent(err, datainfo) {
            expect(datainfo.name.length).assertEqual(0)
            done()
        }
    })

    /**
     * @tc.number getPermissionDef_0100
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0100', 0, async function(done){
        await demo.getPermissionDef(CAMERA).then((infos) => {
            expect(infos.name).assertEqual("com.permission.CAMERA");
            expect(infos.grantMode).assertEqual(1);
            expect(infos.availableScope).assertEqual(2);
            expect(infos.label).assertEqual("CAMERA permission");
            expect(infos.description).assertEqual("CAMERA permission in detail");
        });
        done();
    })

    /**
     * @tc.number getPermissionDef_0200
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0200', 0, async function(done){
        await demo.getPermissionDef(CAMERA).then((infos) => {
            expect(infos.name).assertEqual("com.permission.CAMERA");
            expect(infos.grantMode).assertEqual(1);
            expect(infos.availableScope).assertEqual(2);
            expect(infos.label).assertEqual("CAMERA permission");
            expect(infos.description).assertEqual("CAMERA permission in detail");
        });
        await demo.getPermissionDef(MUSIC).then((infos) => {
            expect(infos.name).assertEqual("com.permission.music");
            expect(infos.grantMode).assertEqual(1);
            expect(infos.availableScope).assertEqual(2);
            expect(infos.label).assertEqual("music permission");
            expect(infos.description).assertEqual("music permission in detail");
        });
        done();
    })

    /**
     * @tc.number getPermissionDef_0300
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0300', 0, async function(done){
        await demo.getPermissionDef(CAMERA).then((infos) => {
            expect(infos.name).assertEqual("com.permission.CAMERA");
            expect(infos.grantMode).assertEqual(1);
            expect(infos.availableScope).assertEqual(2);
            expect(infos.label).assertEqual("CAMERA permission");
            expect(infos.description).assertEqual("CAMERA permission in detail");
        });

        await demo.getPermissionDef(MUSIC).then((infos) => {
            expect(infos.name).assertEqual("com.permission.music");
            expect(infos.grantMode).assertEqual(1);
            expect(infos.availableScope).assertEqual(2);
            expect(infos.label).assertEqual("music permission");
            expect(infos.description).assertEqual("music permission in detail");
        });

        await demo.getPermissionDef(WECHAT).then((infos) => {
            expect(infos.name).assertEqual("com.permission.WeChat");
            expect(infos.grantMode).assertEqual(1);
            expect(infos.availableScope).assertEqual(2);
            expect(infos.label).assertEqual("WeChat permission");
            expect(infos.description).assertEqual("WeChat permission in detail");
        });

        done();

    })

    /**
     * @tc.number getPermissionDef_0400
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0400', 0, async function(done){
        await demo.getPermissionDef('').then((infos) => {
            expect(infos.name).assertEqual("");
            expect(infos.grantMode).assertEqual("");
            expect(infos.availableScope).assertEqual(0);
            expect(infos.label).assertEqual("");
            expect(infos.description).assertEqual("");
        });
        done();
    })

    /**
     * @tc.number getPermissionDef_0500
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0500', 0, async function(done){

        await demo.getPermissionDef('error').then((infos) => {
            expect(infos.name).assertEqual("");
            expect(infos.grantMode).assertEqual("");
            expect(infos.availableScope).assertEqual(0);
            expect(infos.label).assertEqual("");
            expect(infos.description).assertEqual("");
        });

        done();
    })

    /**
     * @tc.number getPermissionDef_0600
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0600', 0, async function(done){
        await demo.getPermissionDef(CAMERA, OnReceiveEvent);

        function OnReceiveEvent(err, data) {
            expect(data.name).assertEqual("com.permission.CAMERA");
            expect(data.grantMode).assertEqual(1);
            expect(data.availableScope).assertEqual(2);
            expect(data.label).assertEqual("CAMERA permission");
            expect(data.description).assertEqual("CAMERA permission in detail");
        }
        done();
    })

    /**
     * @tc.number getPermissionDef_0700
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0700', 0, async function(done){
        await demo.getPermissionDef(CAMERA, OnReceiveEvent1);

        await demo.getPermissionDef(MUSIC, OnReceiveEvent2);

        function OnReceiveEvent1(err, data) {
            expect(data.name).assertEqual("com.permission.CAMERA");
            expect(data.grantMode).assertEqual(1);
            expect(data.availableScope).assertEqua(2);
            expect(data.label).assertEqual("CAMERA permission");
            expect(data.description).assertEqual("CAMERA permission in detail");
        }

        function OnReceiveEvent2(err, data) {
            expect(data.name).assertEqual("com.permission.music");
            expect(data.grantMode).assertEqual(1);
            expect(data.availableScope).assertEqual(2);
            expect(data.label).assertEqual("music permission");
            expect(data.description).assertEqual("music permission in detail");
        }

        done();
    })

    /**
     * @tc.number getPermissionDef_0800
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0800', 0, async function(done){
        await demo.getPermissionDef(CAMERA, OnReceiveEvent1);
        await demo.getPermissionDef(MUSIC, OnReceiveEvent2);
        await demo.getPermissionDef(WECHAT, OnReceiveEvent3);

        demo.getBundleInstaller().then((data) => {
            data.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME2, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME3, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME4, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME5, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        })
        done();
    })
    function OnReceiveEvent1(err, data) {
        expect(data.name).assertEqual("com.permission.CAMERA");
        expect(data.grantMode).assertEqual(1);
        expect(data.availableScope).assertEqual(2);
        expect(data.label).assertEqual("CAMERA permission");
        expect(data.description).assertEqual("CAMERA permission in detail");
    }
    function OnReceiveEvent2(err, data) {
        expect(data.name).assertEqual("com.permission.music");
        expect(data.grantMode).assertEqual(1);
        expect(data.availableScope).assertEqual(2);
        expect(data.label).assertEqual("music permission");
        expect(data.description).assertEqual("music permission in detail");
    }
    function OnReceiveEvent3(err, data) {
        expect(data.name).assertEqual("com.permission.WeChat");
        expect(data.grantMode).assertEqual(1);
        expect(data.availableScope).assertEqual(2);
        expect(data.label).assertEqual("WeChat permission");
        expect(data.description).assertEqual("WeChat permission in detail");
    }

    /**
     * @tc.number getPermissionDef_0900
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_0900', 0, async function(done)
    {
        await demo.getPermissionDef('', OnReceiveEvent);

        function OnReceiveEvent(err, data) {
            expect(data.name).assertEqual("");
            expect(data.availableScope).assertEqual(0);
            expect(data.grantMode).assertEqual("");
            expect(data.label).assertEqual("");
            expect(data.description).assertEqual("");
        }

        done();
    })

    /**
     * @tc.number getPermissionDef_1000
     * @tc.name BUNDLE::getPermissionDef
     * @tc.desc Test getPermissionDef interfaces.
     */
    it('getPermissionDef_1000', 0, async function(done){
        await demo.getPermissionDef('error', OnReceiveEvent);
        function OnReceiveEvent(err, data) {
            expect(data.name).assertEqual("");
            expect(data.availableScope).assertEqual(0);
            expect(data.grantMode).assertEqual("");
            expect(data.label).assertEqual("");
            expect(data.description).assertEqual("");

        }
        done();
    })

    /**
     * @tc.number install_0100
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0100', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME2, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME3, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME4, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.uninstall(NAME5, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.install([PATH + BMSJSTEST1], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEventO);
        });
        var datainfo = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo.name).assertEqual(NAME1);
        expect(datainfo.uid).assertLarger(UIDMINVALUE);
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        done();
    })
    function OnReceiveinstallEventO(err, data) {
        expect(typeof data).assertEqual(OBJECT);
        expect(data.statusMessage).assertEqual(SUCCESS);
    }

    /**
     * @tc.number install_0200
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0200', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST2], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);
            data.install([PATH + BMSJSTEST3], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }

        });
        var datainfo = await demo.getBundleInfo(NAME2, 1);
        expect(datainfo.name).assertEqual(NAME2);
        expect(datainfo.uid).assertLarger(UIDMINVALUE);
        done();
    })

    /**
     * @tc.number install_0300
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0300', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST4], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);
            data.install([PATH + BMSJSTEST5], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);
            data.install([PATH + BMSJSTEST6], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo1 = await demo.getBundleInfo(NAME3, 1);
        expect(datainfo1.name).assertEqual(NAME3);
        expect(datainfo1.uid).assertLarger(UIDMINVALUE);
        var datainfo2 = await demo.getBundleInfo(NAME4, 1);
        expect(datainfo2.name).assertEqual(NAME4);
        expect(datainfo2.uid).assertLarger(UIDMINVALUE);
        var datainfo3 = await demo.getBundleInfo(NAME5, 1);
        expect(datainfo3.name).assertEqual(NAME5);
        expect(datainfo3.uid).assertLarger(UIDMINVALUE);
        done();
    })

    /**
     * @tc.number install_0400
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0400', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + ERROR], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual("STATUS_INSTALL_FAILURE_INVALID");
            }
        });
        done();
    })

    /**
     * @tc.number install_0500
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0500', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([''], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual("STATUS_INSTALL_FAILURE_INVALID");
            }

        });
        done();
    })

    /**
     * @tc.number install_0600
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0600', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST1], {
                param: {
                    userId: 0,
                    isKeepData: true
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo1 = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo1.name).assertEqual(NAME1);
        expect(datainfo1.uid).assertLarger(UIDMINVALUE);
        await demo.getBundleInstaller().then((info) => {
            info.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: true
                }
            });
        });
        done();
    })

    /**
     * @tc.number install_0700
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0700', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST7], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual("STATUS_INSTALL_FAILURE_INVALID");
            }

        });
        done();
    })

    /**
     * @tc.number install_0800
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0800', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST8], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo = await demo.getBundleInfo(THIRD1, 1);
        expect(datainfo.name).assertEqual(THIRD1);
        expect(datainfo.uid).assertLarger(UIDMINVALUE);
        expect(datainfo.versionCode).assertEqual(VERSIONCODE1);
        expect(datainfo.versionName).assertEqual(VERSIONNAME1);
        await demo.getBundleInstaller().then((info) => {
            info.install([PATH + BMSJSTEST9], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo = await demo.getBundleInfo(THIRD1, 1);
        expect(datainfo.name).assertEqual(THIRD1);
        expect(datainfo.uid).assertLarger(UIDMINVALUE);
        expect(datainfo.versionCode).assertEqual(VERSIONCODE2);
        expect(datainfo.versionName).assertEqual(VERSIONNAME2);
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(THIRD1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        done();
    })

    /**
     * @tc.number install_0900
     * @tc.name BUNDLE::install
     * @tc.desc Test install interfaces.
     */
    it('install_0900', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST9], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo = await demo.getBundleInfo(THIRD1, 1);
        expect(datainfo.name).assertEqual(THIRD1);
        expect(datainfo.uid).assertLarger(UIDMINVALUE);
        expect(datainfo.versionCode).assertEqual(VERSIONCODE2);
        expect(datainfo.versionName).assertEqual(VERSIONNAME2);
        await demo.getBundleInstaller().then((info) => {
            info.install([PATH + BMSJSTEST8], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual("STATUS_INSTALL_FAILURE_INCOMPATIBLE");
            }
        });
        var datainfo = await demo.getBundleInfo(THIRD1, 1);
        expect(datainfo.name).assertEqual(THIRD1);
        expect(datainfo.uid).assertLarger(UIDMINVALUE);
        expect(datainfo.versionCode).assertEqual(VERSIONCODE2);
        expect(datainfo.versionName).assertEqual(VERSIONNAME2);
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(THIRD1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        done();
    })

    /**
     * @tc.number uninstall_0100
     * @tc.name BUNDLE::uninstall
     * @tc.desc Test uninstall interfaces.
     */
    it('uninstall_0100', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST1], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        var datainfo1 = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo1.name).assertEqual(NAME1);
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo2 = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo2.name).assertEqual('');
        done();
    })

    /**
     * @tc.number uninstall_0200
     * @tc.name BUNDLE::uninstall
     * @tc.desc Test uninstall interfaces.
     */
    it('uninstall_0200', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST1], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.install([PATH + BMSJSTEST2], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        var datainfo1 = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo1.name).assertEqual(NAME1);
        var datainfo2 = await demo.getBundleInfo(NAME2, 1);
        expect(datainfo2.name).assertEqual(NAME2);
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);
            data.uninstall(NAME2, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo3 = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo3.name).assertEqual('');
        var datainfo4 = await demo.getBundleInfo(NAME2, 1);
        expect(datainfo4.name).assertEqual('');
        done();
    })

    /**
     * @tc.number uninstall_0300
     * @tc.name BUNDLE::uninstall
     * @tc.desc Test uninstall interfaces.
     */
    it('uninstall_0300', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST4], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.install([PATH + BMSJSTEST5], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
            data.install([PATH + BMSJSTEST6], {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            });
        });
        var datainfo1 = await demo.getBundleInfo(NAME3, 1);
        expect(datainfo1.name).assertEqual(NAME3);
        var datainfo2 = await demo.getBundleInfo(NAME4, 1);
        expect(datainfo2.name).assertEqual(NAME4);
        var datainfo3 = await demo.getBundleInfo(NAME5, 1);
        expect(datainfo3.name).assertEqual(NAME5);
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(NAME3, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);
            data.uninstall(NAME4, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);
            data.uninstall(NAME5, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo4 = await demo.getBundleInfo(NAME3, 1);
        expect(datainfo4.name).assertEqual('');
        var datainfo5 = await demo.getBundleInfo(NAME4, 1);
        expect(datainfo5.name).assertEqual('');
        var datainfo6 = await demo.getBundleInfo(NAME5, 1);
        expect(datainfo6.name).assertEqual('');
        done();
    })

    /**
     * @tc.number uninstall_0400
     * @tc.name BUNDLE::uninstall
     * @tc.desc Test uninstall interfaces.
     */
    it('uninstall_0400', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(ERROR, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual("STATUS_UNINSTALL_FAILURE");
            }
        });
        done();
    })

    /**
     * @tc.number uninstall_0500
     * @tc.name BUNDLE::uninstall
     * @tc.desc Test uninstall interfaces.
     */
    it('uninstall_0500', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.uninstall('', {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual("STATUS_UNINSTALL_FAILURE_ABORTED");
            }
        });
        done();
    })

    /**
     * @tc.number uninstall_0600
     * @tc.name BUNDLE::uninstall
     * @tc.desc Test uninstall interfaces.
     */
    it('uninstall_0600', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(LAUNCHER, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual("STATUS_UNINSTALL_FAILURE_CONFLICT");
            }
        });
        done();
    })

    /**
     * @tc.number uninstall_0700
     * @tc.name BUNDLE::uninstall
     * @tc.desc Test uninstall interfaces.
     */
    it('uninstall_0700', 0, async function (done) {
        await demo.getBundleInstaller().then((data) => {
            data.install([PATH + BMSJSTEST1], {
                param: {
                    userId: 0,
                    isKeepData: true
                }
            });
        });
        var datainfo1 = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo1.name).assertEqual(NAME1);
        await demo.getBundleInstaller().then((data) => {
            data.uninstall(NAME1, {
                param: {
                    userId: 0,
                    isKeepData: false
                }
            }, OnReceiveinstallEvent);

            function OnReceiveinstallEvent(err, data) {
                expect(typeof data).assertEqual(OBJECT);
                expect(data.statusMessage).assertEqual(SUCCESS);
            }
        });
        var datainfo2 = await demo.getBundleInfo(NAME1, 1);
        expect(datainfo2.name).assertEqual('');
        done();
    })
})

