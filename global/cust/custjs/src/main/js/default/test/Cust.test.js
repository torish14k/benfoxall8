/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import cust from '@ohos.cust'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe('CustTest', function () {
    console.log('CustTest**************************start');

    /* *
    * @tc.number SUB_CUST_JS_0100
    * @tc.name test getOneCfgFile method in callback mode
    * @tc.desc get getOneCfgFile in callback mode
    */
    it('getOneCfgFile_test_001', 0, async function (done) {
        cust.getOneCfgFile('custxml/none.xml', (error, value) => {
            expect(value.length == 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_001, none.xml:' + value);
        });
        cust.getOneCfgFile('custxml/system.xml', (error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_001, system.xml:' + value);
        });
        cust.getOneCfgFile('custxml/both.xml', (error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_001, both.xml:' + value);
        });
        cust.getOneCfgFile('custxml/user.xml', (error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_001, user.xml:' + value);
        });
        done();
    })

    /* *
    * @tc.number SUB_CUST_JS_0200
    * @tc.name test getOneCfgFile method in promise mode
    * @tc.desc get getOneCfgFile in promise mode
    */
    it('getOneCfgFile_test_002', 0, async function (done) {
        cust.getOneCfgFile('custxml/none.xml').then(value => {
            expect(value.length == 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_002, none.xml:' + value);
        });
        cust.getOneCfgFile('custxml/system.xml').then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_002, system.xml:' + value);
        });
        cust.getOneCfgFile('custxml/both.xml').then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_002, both.xml:' + value);
        });
        cust.getOneCfgFile('custxml/user.xml').then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getOneCfgFile_test_002, user.xml:' + value);
        });
        done();
    })

    /* *
    * @tc.number SUB_CUST_JS_0300
    * @tc.name test getCfgFiles method in callback mode
    * @tc.desc get getCfgFiles in callback mode
    */
    it('getCfgFiles_test_003', 0, async function (done) {
        cust.getCfgFiles('custxml/none.xml', (error, value) => {
            expect(value.length == 0).assertTrue();
            console.log('CustTest getCfgFiles_test_003, none.xml:' + value);
        });
        cust.getCfgFiles('custxml/system.xml', (error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgFiles_test_003, system.xml:' + value);
        });
        cust.getCfgFiles('custxml/both.xml', (error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgFiles_test_003, both.xml:' + value);
        });
        cust.getCfgFiles('custxml/user.xml', (error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgFiles_test_003, user.xml:' + value);
        });
        done();
    })

    /* *
    * @tc.number SUB_CUST_JS_0400
    * @tc.name test getCfgFiles method in promise mode
    * @tc.desc get getCfgFiles in promise mode
    */
    it('getCfgFiles_test_004', 0, async function (done) {
        cust.getCfgFiles('custxml/none.xml').then(value => {
            expect(value.length == 0).assertTrue();
            console.log('CustTest getCfgFiles_test_004, none.xml:' + value);
        });
        cust.getCfgFiles('custxml/system.xml').then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgFiles_test_004, system.xml:' + value);
        });
        cust.getCfgFiles('custxml/both.xml').then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgFiles_test_004, both.xml:' + value);
        });
        cust.getCfgFiles('custxml/user.xml').then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgFiles_test_004, user.xml:' + value);
        });
        done();
    })

    /* *
    * @tc.number SUB_CUST_JS_0500
    * @tc.name test getCfgDirList method in callback mode
    * @tc.desc get getCfgDirList in callback mode
    */
    it('getCfgDirList_test_005', 0, async function (done) {
        cust.getCfgDirList((error, value) => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgDirList_test_005:' + value);
        });
        done();
    })

    /* *
    * @tc.number SUB_CUST_JS_060
    * @tc.name test getCfgDirList method in promise mode
    * @tc.desc get getCfgDirList in promise mode
    */
    it('getCfgDirList_test_006', 0, async function (done) {
        cust.getCfgDirList().then(value => {
            expect(value.length != 0).assertTrue();
            console.log('CustTest getCfgDirList_test_006:' + value);
        });
        done();
    })

    console.log('CustTest**************************end');
})