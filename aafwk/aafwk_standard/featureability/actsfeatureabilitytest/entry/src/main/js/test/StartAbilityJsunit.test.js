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
import featureAbility from '@ohos.ability.featureAbility'
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit/index'

let resultCode = 123;
let bundleName = 'ohso.act.aafwk';
let mainAbilityName = 'ohos.acts.aafwk.jsap';
const errCode = -104;
const errCode1 = 2097152;
const errCode2 = 29360157;

describe('ConnectAbilityTest', function () {
  
    /*
    * @tc.number: SUB_AA_JsApi_StartAbility_0100
    * @tc.name: testAbility0100.
    * @tc.desc: StartAbility fail with want nothing.
    */
    it("SUB_AA_JsApi_StartAbility_0100", 0, async function (done) {
        let parameter = {
            'want': {}
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAbility0100 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAbility0100 error: ' + JSON.stringify(error))
            expect(errCode1).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_StartAbility_0200
    * @tc.name: testAbility0200.
    * @tc.desc: StartAbility fail with error parameter.
    */
    it("SUB_AA_JsApi_StartAbility_0200", 0, async function (done) {
        let parameter = {
            'StartAbilityParameter': {
                'want': {}
            }
        }
        featureAbility.startAbility((parameter), (error, data) => {
            console.log('testAbility0200 data: ' + JSON.stringify(data))
            console.log('testAbility0200 error: ' + JSON.stringify(error))
            expect(errCode).assertEqual(error.code)
            done()
        })
    })

    /*
    * @tc.number: SUB_AA_JsApi_StartAbility_0300
    * @tc.name: testAbility0300.
    * @tc.desc: StartAbility-want only configure the bundleName and abilityName-abilityName
    *           values to be wrong values.
    */
    it("SUB_AA_JsApi_StartAbility_0300", 0, async function (done) {
        let parameter = {
            'want': {
                'bundleName': bundleName,
                'abilityName': 'com.example.mytestw.TwoAbility1111'
            }
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAbility0300 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAbility0300 error: ' + JSON.stringify(error))
            expect(errCode1).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_StartAbility_0400
    * @tc.name: testAbility0400.
    * @tc.desc: StartAbility-want only configure the bundleName and abilityName-bundleName
    *           values to be wrong values.
    */
    it("SUB_AA_JsApi_StartAbility_0400", 0, async function (done) {
        let parameter = {
            'want': {
                'bundleName': 'com.example.mytestw.TwoAbility1111',
                'abilityName': mainAbilityName
            }
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAbility0400 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAbility0400 error: ' + JSON.stringify(error))
            expect(errCode1).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_StartAbility_0500
    * @tc.name: testAbility0500.
    * @tc.desc: startAbility-want-configuration bundleName and abilityName+deviceId error.
    */
    it("SUB_AA_JsApi_StartAbility_0500", 0, async function (done) {
        let parameter = {
            'want': {
                'deviceId': '123123',
                'bundleName': bundleName,
                'abilityName': mainAbilityName
            }
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAbility0500 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAbility0500 error: ' + JSON.stringify(error))
            expect(errCode2).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_0400
    * @tc.name: testAbility0400.
    * @tc.desc: StartAbility-want only configure action (implicit start) - Ability
    *            without corresponding action (custom action).
    */
    it("SUB_AA_JsApi_Ability_0400", 0, async function (done) {
        let parameter = {
            'want': {
                'action': 'action.com.example.mytestw.TwoAbility123'
            }
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAbility0600 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAbility0600 error: ' + JSON.stringify(error))
            expect(errCode1).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_0500
    * @tc.name: testAblity0500.
    * @tc.desc: startAbility-want configure action+entities- there is no Ability corresponding to entities.
    */
    it("SUB_AA_JsApi_Ability_0500", 0, async function (done) {
        let parameter = {
            'want': {
                'action': 'action.ohos.acts.aafwk.jsapi.MainAbility',
                'entities': [
                    'entity.com.example.mytestw.ENITIES22'
                ]
            }
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAblity0500 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAblity0500 error: ' + JSON.stringify(error))
            expect(errCode1).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_0600
    * @tc.name: testAblity0600.
    * @tc.desc: startAbility-want-configuration action+entities-entities is configured as a string.
    */
    it("SUB_AA_JsApi_Ability_0600", 0, async function (done) {
        let parameter = {
            'want': {
                'action': 'action.ohos.acts.aafwk.jsapi.MainAbility',
                'entities': 'abc123'
            }
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAblity0600 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAblity0600 error: ' + JSON.stringify(error))
            expect(errCode1).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_0700
    * @tc.name: testAblity0700.
    * @tc.desc: startAbility-want configure action+entities- entities is configurd as a string.
    */
    it("SUB_AA_JsApi_Ability_0700", 0, async function (done) {
        let parameter = {
            'startAbilityParameter': {
                'want': {
                    'bundleName': bundleName,
                    'abilityName': mainAbilityName
                }

            }
        }
        await featureAbility.startAbility(parameter).then((data) => {
            console.log('testAblity0700 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAblity0700 error: ' + JSON.stringify(error))
            expect(errCode).assertEqual(error.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_0800
    * @tc.name: testAblity0800.
    * @tc.desc: startAbility-want configure action+entities- entities is configurd as a string.
    */
    it("SUB_AA_JsApi_Ability_0800", 0, async function (done) {
        let parameter = {
           'want': {}
        }
        featureAbility.startAbility(parameter, (err, data) => {
            console.log('testAblity0800 data: ' + JSON.stringify(data) + ',err: ' + JSON.stringify(err))
            expect(errCode1).assertEqual(err.code)
            done();
        })
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_0900
    * @tc.name: testAblity0900.
    * @tc.desc: startAbility: The input parameter want is not configured (the value is {}).
    */
    it("SUB_AA_JsApi_Ability_0900", 0, async function (done) {
        let parameter = {}
        featureAbility.startAbility(parameter, (err, data) => {
            console.log('testAblity0900 data: ' + JSON.stringify(data) + ',err: ' + JSON.stringify(err))
            expect(errCode).assertEqual(err.code)
            done();
        })
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_1000
    * @tc.name: testAblity1000.
    * @tc.desc: startAbility: The input parameter is uddefined.
    */
    it("SUB_AA_JsApi_Ability_1000", 0, async function (done) {
        await featureAbility.startAbility(undefined).then((data) => {
            console.log('testAblity1000 data: ' + JSON.stringify(data))
            expect().assertFail()
        }).catch((error) => {
            console.log('testAblity1000 error: ' + JSON.stringify(error))
            expect(errCode).assertEqual(error.code)
        })
        done()
    })


    /*
    * @tc.number: SUB_AA_JsApi_Ability_1200
    * @tc.name: testAblity1200.
    * @tc.desc: startAbilityForResult: The input parameter want is not configured (the value is {}).
    */
    it("SUB_AA_JsApi_Ability_1200", 0, async function (done) {
        let parameter = {}
        await featureAbility.startAbilityForResult(parameter).then((data) => {
            console.log('testAblity2900 data: ' + JSON.stringify(data) + ',err: ' + JSON.stringify(err))
            expect.assertFail()
        }).catch((err) => {
            console.log('testAblity1200' + JSON.stringify(err));
            expect().assertEqual(err.code)
        })
        done()
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_1300
    * @tc.name: testAblity1300.
    * @tc.desc: startAbilityForResult: The input parameter optParam is undefined.
    */
    it("SUB_AA_JsApi_Ability_1300", 0, async function (done) {
        featureAbility.startAbilityForResult(undefined, (err) => {
            console.log('testAblity1300' + JSON.stringify(err));
            expect(errCode1).assertEqual(err.code)
            done()
        })
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_1400
    * @tc.name: testAblity1400.
    * @tc.desc: startAbilityForResult-wrong input parameter format want a layer outside.
    */
    it("SUB_AA_JsApi_Ability_1400", 0, async function (done) {
        let parameter = {
            'StartAbilityParameter': {
                'want': {
                    'bundleName': bundleName,
                    'abilityName': mainAbilityName,
                    'parameters': {
                        'key': resultCode,
                        'terminate': true
                    }
                }
            }
        }
        featureAbility.startAbilityForResult(parameter, (err, data) => {
            console.log('testAblity1400' + JSON.stringify(err));
            expect(errCode1).assertEqual(err.code)
            done()
        }) 
    })

    /*
    * @tc.number: SUB_AA_JsApi_Ability_2100
    * @tc.name: testAblity2100.
    * @tc.desc: startAbilityForResult-want-Set bundleName and abilityName+flag-flag to character strings.
    */
    it("SUB_AA_JsApi_Ability_2100", 0, async function (done) {
        let parameter = {
            'want': {
                'bundleName': bundleName,
                'abilityName': mainAbilityName,
                'flages': 'abc',
                'parameters': {
                    'key': resultCode,
                    'terminate': true
                }
            }
        }
        await featureAbility.startAbilityForResult(parameter).then((data) => {
            console.log('testAblity2100 data: ' + JSON.stringify(data))
            expect.assertFail()
        }).catch((err) => {
            console.log('testAblity2100' + JSON.stringify(err));
            expect(undefined).assertEqual(err.code)
        })
        done()
    })
})
