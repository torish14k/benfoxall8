/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import bundle from '@ohos.bundle'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit/index'

const TIMEOUT = 3000;

describe('ActsBmsJsTest', function () {

    /*
    * @tc.number: bms_getJsAbility_0100
    * @tc.name: test the multi js ability
    * @tc.desc: 1.install a js hap which has an ability with full domain name
    *           2.check the ability name by the interface of getBundleInfo
    */
    it('bms_getJsAbility_0100', 0, async function (done) {
        console.info('=====================bms_getJsAbility_0100==================');
        let bundleName = 'com.example.third2';
        let abilityName = 'com.example.third2.MainAbility';
        await install(['/data/test/bmsThirdBundleTest2.hap']);
        let data = await bundle.getBundleInfo(bundleName, 1);
        expect(data.abilityInfo.length).assertEqual(1);
        if(data.abilityInfo.length == 1){
            console.debug('========check abilityName ========' + JSON.stringify(data.abilityInfo));
            expect(data.abilityInfo[0].name).assertEqual(abilityName);
            expect(data.abilityInfo[0].srcLanguage).assertEqual('js');
            expect(data.abilityInfo[0].srcPath).assertEqual('');
        }
        await uninstall(bundleName);
        done();
        setTimeout(function () {
            console.info('=====================bms_getJsAbility_0100==================end');
        }, TIMEOUT)
    })

    /*
    * @tc.number: bms_getJsAbility_0200
    * @tc.name: test the multi js ability
    * @tc.desc: 1.install a js hap with two ability
    *           2.check the ability name by the interface of getBundleInfo
    */
    it('bms_getJsAbility_0200', 0, async function (done) {
        console.info('=====================bms_getJsAbility_0200==================');
        var bundleName = 'com.example.third5';
        let abilityName1 = 'com.example.third5.AMainAbility';
        let abilityName2 = 'com.example.third5.BMainAbility';
        await install(['/data/test/bmsThirdBundleTest5.hap']);
        let data = await bundle.getBundleInfo(bundleName, 1)
        console.debug('==========bundleInfo==========' + JSON.stringify(data))
        expect(data.abilityInfo.length).assertEqual(2);
        if(data.abilityInfo.length == 2){
            console.debug('========check abilityName ========' + JSON.stringify(data.abilityInfo));
            expect(data.abilityInfo[0].name).assertEqual(abilityName1);
            expect(data.abilityInfo[0].srcLanguage).assertEqual('js');
            expect(data.abilityInfo[0].srcPath).assertEqual('');
            expect(data.abilityInfo[1].name).assertEqual(abilityName2);
            expect(data.abilityInfo[1].srcLanguage).assertEqual('js');
            expect(data.abilityInfo[1].srcPath).assertEqual('');
        }
        await uninstall(bundleName);
        done();
        setTimeout(function () {
            console.info('=====================bms_getJsAbility_0200==================end');
        }, TIMEOUT)
    })

    /*
    * @tc.number: bms_getJsAbility_0300
    * @tc.name: test the multi js ability
    * @tc.desc: 1.install a js hap which has an ability with short domain name
    *           2.check the ability name by the interface of getBundleInfo
    */
    it('bms_getJsAbility_0300', 0, async function (done) {
        console.info('=====================bms_getJsAbility_0300==================');
        let bundleName = 'com.example.js';
        let abilityName = 'com.example.js.MainAbility';
        await install(['/data/test/bmsThirdBundleJs.hap']);
        let data = await bundle.getBundleInfo(bundleName, 1);
        expect(data.abilityInfo.length).assertEqual(1);
        if(data.abilityInfo.length == 1){
            console.debug('========check abilityName ========' + JSON.stringify(data.abilityInfo));
            expect(data.abilityInfo[0].name).assertEqual(abilityName);
            expect(data.abilityInfo[0].srcLanguage).assertEqual('js');
            expect(data.abilityInfo[0].srcPath).assertEqual('default');
        }
        await uninstall(bundleName);
        done();
        setTimeout(function () {
            console.info('=====================bms_getJsAbility_0300==================end');
        }, TIMEOUT)
    })

    /*
    * @tc.number: bms_getJsAbility_0400
    * @tc.name: test the multi js ability
    * @tc.desc: 1.install a c++ hap which has an ability with short domain name
    *           2.check the ability name by the interface of getBundleInfo
    */
    it('bms_getJsAbility_0400', 0, async function (done) {
        console.info('=====================bms_getJsAbility_0400==================');
        let bundleName = 'com.example.c';
        let abilityName = '.MainAbility';
        await install(['/data/test/bmsThirdBundleC.hap']);
        let data = await bundle.getBundleInfo(bundleName, 1);
        expect(data.abilityInfo.length).assertEqual(1);
        if(data.abilityInfo.length == 1){
            console.debug('========check abilityName ========' + JSON.stringify(data.abilityInfo));
            expect(data.abilityInfo[0].name).assertEqual(abilityName);
            expect(data.abilityInfo[0].srcLanguage).assertEqual('c++');
            expect(data.abilityInfo[0].srcPath).assertEqual('default/c++/');
        }
        await uninstall(bundleName);
        done();
        setTimeout(function () {
            console.info('=====================bms_getJsAbility_0300==================end');
        }, TIMEOUT)
    })

    async function install(bundlePath) {
        var installer = await bundle.getBundleInstaller();
        installer.install(bundlePath, {
            param: {
                userId: 0,
                installFlag: 1,
                isKeepData: false
            }
        }, onReceiveInstallEvent);

        function onReceiveInstallEvent(err, data) {
            console.info('========install Finish========');
            expect(typeof err).assertEqual('object');
            expect(err.code).assertEqual(0);
            expect(typeof data).assertEqual('object');
            expect(data.status).assertEqual(0);
            expect(data.statusMessage).assertEqual('SUCCESS');
        }
    }
    async function uninstall(bundleName)
    {
        var installer = await bundle.getBundleInstaller();
        installer.uninstall(bundleName, {
            param: {
                userId: 0,
                installFlag: 1,
                isKeepData: false
            }
        }, onReceiveUninstallEvent);

        function onReceiveUninstallEvent(err, data) {
            console.info('========uninstall Finish========');
            expect(typeof err).assertEqual('object');
            expect(err.code).assertEqual(0);
            expect(typeof data).assertEqual('object');
            expect(data.status).assertEqual(0);
            expect(data.statusMessage).assertEqual('SUCCESS');
        }
    }
})