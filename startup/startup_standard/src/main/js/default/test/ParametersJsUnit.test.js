/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

// @ts-nocheck

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from 'deccjsunit/index'
import systemparameter from '@ohos.systemParameter'

describe('SystemParameterTest', function () {

    console.info('SystemParameterTest start################################start');
    let PROPERTY_MAX_VALUE = 'a';
    for (let i = 0; i < 127; i++) {
        PROPERTY_MAX_VALUE = 'a' + PROPERTY_MAX_VALUE;
    }

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0100
     * @tc.name      testSet0100
     * @tc.desc      Set the value for the given key with parameter callback.
     */
    it('system_parameter_test_0100', 0, async function (done) {
        console.info('system_parameter_test_0100 start');
        let ret = false;
        try {
            systemparameter.set('hw_sc.build.os.version', '10.20.30.4', function (err) {
                if (err == undefined) {
                    ret = true;
                    console.info('system_parameter_test_0100 set callback hw_sc.build.os.version value success ');
                } else {
                    console.info('system_parameter_test_0100 set callback hw_sc.build.os.version value err:'
                    + err.code);
                }
            });
            done();
        } catch (e) {
            console.info('system_parameter_test_0100 set callback hw_sc.build.os.version unexpect err:' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0100 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0110
     * @tc.name      testSet0110
     * @tc.desc      Set a value that is not a string to the property value
     */
    it('system_parameter_test_0110', 0, async function (done) {
        console.info('system_parameter_test_0110 start');
        let ret = false;
        try {
            systemparameter.set('hw_sc.build.os.version', 111, function (e) {
                if (err == undefined) {
                    console.info('system_parameter_test_0110 set callback hw_sc.build.os.version value success');
                } else {
                    console.info('system_parameter_test_0110 set callback hw_sc.build.os.version value err:'
                    + e.code)
                }
            });

        } catch (e) {
            ret = true;
            console.info('system_parameter_test_0110 set callback hw_sc.build.os.version unexpect err:' + e)
            done();
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0110 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0120
     * @tc.name      testSet0120
     * @tc.desc      Set the property value to an extra long string
     */
    it('system_parameter_test_0120', 0, async function (done) {
        console.info('system_parameter_test_0120 start');
        let ret = false;
        try {
            systemparameter.set('hw_sc.build.os.version', PROPERTY_MAX_VALUE, function (e) {
                if (e == undefined) {
                    console.info('system_parameter_test_0120 set callback hw_sc.build.os.version value success');
                } else {
                    ret = true;
                    console.info('system_parameter_test_0120 set callback hw_sc.build.os.version value err:' +
                    e.code);
                    done();
                }
            });

        } catch (e) {
            console.info('system_parameter_test_0120 set callback hw_sc.build.os.version unexpect err:' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0120 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0200
     * @tc.name      testSet0200
     * @tc.desc      Set the value for the given key.
     */
    it('system_parameter_test_0200', 0, async function (done) {
        console.info('system_parameter_test_0200 start');
        let parameterInfo = systemparameter.set('hw_sc.build.os.version', '1.5.3.6');
        let ret = false;
        try {
            parameterInfo.then(function (value) {
                console.info('system_parameter_test_0200 promise  set hw_sc.build.os.version success: ' + value);
                ret = true;
                done();
            }).catch(function (err) {
                console.info('system_parameter_test_0200 promise  set hw_sc.build.os.version error: ' + err.code);
            });
        } catch (e) {
            console.info('system_parameter_test_0200 set callback hw_sc.build.os.version unexpect err:' + e)
        }

        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0200 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0220
     * @tc.name      testSet0220
     * @tc.desc      Set the property value to an extra long string
     */
    it('system_parameter_test_0220', 0, async function (done) {
        console.info('system_parameter_test_0220 start');
        let ret = false;
        try {
            let parameterInfo = systemparameter.set('hw_sc.build.os.version', PROPERTY_MAX_VALUE);
            parameterInfo.then(function (value) {
                console.info('system_parameter_test_0220 promise  set hw_sc.build.os.version success: ' + value);
            }).catch(function (err) {
                ret = true;
                console.info('system_parameter_test_0220 promise  set hw_sc.build.os.version error: ' + err.code);
                done();
            });
        } catch (e) {
            console.info('system_parameter_test_0220 set callback hw_sc.build.os.version unexpect err:' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0220 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0230
     * @tc.name      testSet0230
     * @tc.desc      Set a value that is not a string to the property value
     */
    it('system_parameter_test_0230', 0, async function (done) {
        console.info('system_parameter_test_0230 start');
        let ret = false;
        try {
            let parameterInfo = systemparameter.set('hw_sc.build.os.version', 111);
            parameterInfo.then(function (value) {
                console.info('system_parameter_test_0230 promise  set hw_sc.build.os.version success: ' + value);
            }).catch(function (err) {
                console.info('system_parameter_test_0230 promise  set hw_sc.build.os.version error: ' + err.code);
            });
        } catch (e) {
            ret = true;
            console.info('system_parameter_test_0230 set callback hw_sc.build.os.version unexpect err:' + e);
            done();
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0230 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0300
     * @tc.name      testSetSync0300
     * @tc.desc      Set the value for the given key.
     */
    it('system_parameter_test_0300', 0, function () {
        console.info('system_parameter_test_0300 start');
        let ret = false;
        try {
            systemparameter.setSync('hw_sc.build.os.version', '2.5.3.10');
            console.info('system_parameter_test_0300 promise  setSync hw_sc.build.os.version success');
            ret = true;
        } catch (e) {
            console.info('system_parameter_test_0300 promise  setSync hw_sc.build.os.version: ' + e);
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0300 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0310
     * @tc.name      testSetSync0310
     * @tc.desc      Set the property value to an extra long string
     */
    it('system_parameter_test_0310', 0, async function (done) {
        console.info('system_parameter_test_0310 start');
        let ret = false;
        let sysValue = null;
        try {
            systemparameter.setSync('hw_sc.build.os.version', PROPERTY_MAX_VALUE);
            let parameterInfo = systemparameter.get('hw_sc.build.os.version');
            parameterInfo.then(function (value) {
                ret = true;
                console.info(' get testcast0310 system version : ' + value);
                sysValue = value;
                if (sysValue === PROPERTY_MAX_VALUE) {
                    console.info('system_parameter_test_0310 promise  setSynchw_sc.build.os.version failed :' 
                    + sysValue);
                } else {
                    console.info('system_parameter_test_0310 promise  setSync hw_sc.build.os.version: ' + sysValue);
                    ret = true;
                    done();
                }
            })
        } catch (e) {
            console.info('system_parameter_test_0310 promise  setSync hw_sc.build.os.version: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0310 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0320
     * @tc.name      testSetSync0320
     * @tc.desc      Set a value that is not a string to the property value
     */
    it('system_parameter_test_0320', 0, function () {
        console.info('system_parameter_test_0320 start');
        let ret = false;
        try {
            systemparameter.setSync('hw_sc.build.os.version', 111);
            console.info('system_parameter_test_0320 promise  setSync hw_sc.build.os.version success: ');

        } catch (e) {
            console.info('system_parameter_test_0320 promise  setSync hw_sc.build.os.version error: ' + e);
            ret = true;
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0320 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0340
     * @tc.name      testSetSync0340
     * @tc.desc      Set parameter value ' '
     */
    it('system_parameter_test_0340', 0, async function (done) {
        console.info('system_parameter_test_0340 start');
        let ret = false;
        let sysValue = 0;
        try {
            systemparameter.setSync('hw_sc.build.os.version', ' ');
            let parameterInfo = systemparameter.get('hw_sc.build.os.version');
            parameterInfo.then(function (value) {
                ret = true;
                console.info(' get testcast0340 system version : ' + value);
                sysValue = value;
                if (sysValue === ' ') {
                    console.info('system_parameter_test_0340 promise  get rhw_sc.build.os.version :' + sysValue);
                    ret = true;
                    done();
                } else {
                    console.info('system_parameter_test_0340 promise  get hw_sc.build.os.version: ' + sysValue);
                }
            })
        } catch (e) {
            ret = true;
            console.info('promise  get hw_sc.build.os.version: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0340 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0400
     * @tc.name      testGet0400
     * @tc.desc      get systemparameter value
     */
    it('system_parameter_test_0400', 0, async function (done) {
        console.info('system_parameter_test_0400 start');
        let ret = false;
        try {
            let parameterInfo = systemparameter.get('hw_sc.build.os.version');
            parameterInfo.then(function (value) {
                ret = true;
                console.info(' system_parameter_test_0400 promise get hw_sc.build.os.version success: ' + value);
                done();
            }).catch(function (err) {
                console.info(' system_parameter_test_0400 promise get hw_sc.build.os.version error: ' + err.code);
            });
        } catch (e) {
            console.info('system_parameter_test_0400 promise  setSync hw_sc.build.os.version error: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0400 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0410
     * @tc.name      testGet0410
     * @tc.desc      Get an attribute key that successfully sets value
     */
    it('system_parameter_test_0410', 0, async function (done) {
        console.info('system_parameter_test_0410 start');
        let ret = false;
        try {
            systemparameter.set('hw_sc.build.os.version', '1.1.1.1').then((data, err) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0410 set sucess :' + data);
                } else {
                    console.info('system_parameter_test_0410 set failed :' + err.code());
                }
                return p;
            })
            let parameterInfo = systemparameter.get('hw_sc.build.os.version');
            parameterInfo.then(function (value) {
                if (value === '1.1.1.1') {
                    console.info(' system_parameter_test_0410 promise get hw_sc.build.os.version success: ' + value);
                    done();
                }
            }).catch(function (err) {
                console.info(' system_parameter_test_0410 promise get hw_sc.build.os.version error: ' + err.code);
            });
        } catch (e) {
            console.info('system_parameter_test_0400 promise  get shw_sc.build.os.version error: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0400 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0420
     * @tc.name      testGet0420
     * @tc.desc      Get an attribute key value that sets the qualified value
     */
    it('system_parameter_test_0420', 0, async function (done) {
        console.info('system_parameter_test_0420 start');
        let ret = false;
        let sysValue = 0;
        try {
            systemparameter.set('hw_sc.build.os.version', '1.1.1.1').then((data, err) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0420 set sucess :' + data);
                } else {
                    console.info('system_parameter_test_0420 set failed :' + err.code());
                }
            })
            let parameter = systemparameter.get('hw_sc.build.os.version', '10.3.4.5.63');
            parameter.then(function (value) {
                sysValue = value;
                if (sysValue === '10.3.4.5.63') {
                    ret = true;
                    console.info(' system_parameter_test_0420 promise get hw_sc.build.os.version success: ' + value);

                } else {
                    console.info(' system_parameter_test_0420 promise get hw_sc.build.os.version faile ' + value);
                }
            }).catch(function (err) {
                console.info(' system_parameter_test_0420 promise get hw_sc.build.os.version error: ' + err.code);
            });
            done();
        } catch (e) {
            console.info('system_parameter_test_0420 promise  get hw_sc.build.os.version error: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0420 : end');
    })

    /**
    * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0430
    * @tc.name      testGet0430
    * @tc.desc      Get a value without attribute key
    */
    it('system_parameter_test_0430', 0, async function (done) {
        console.info('system_parameter_test_0430 start');
        let ret = false;
        try {
            systemparameter.get(' ', '0.0.0.0').then((data, err) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0430 promise  success: ' + data);
                    ret = true;
                    done();
                } else {
                    console.info(' system_parameter_test_0430 promise get  faile ' + err);
                }
            })

        } catch (e) {
            console.info('system_parameter_test_0430 promise  catch get failed ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0430 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0440
     * @tc.name      testGet0440
     * @tc.desc      Directly obtain the key value of a normal setting attribute
     */
    it('system_parameter_test_0440', 0, async function (done) {
        console.info('system_parameter_test_0440 start');
        let ret = false;
        let sysValue = 0;
        try {
            let parameter = systemparameter.get('hw_sc.build.os.version', '10.3.4.5.63');
            parameter.then(function (value) {
                sysValue = value;
                ret = true;
                console.info(' system_parameter_test_0440 promise get hw_sc.build.os.version success: ' + value);
            }).catch(function (err) {
                console.info(' system_parameter_test_0440 promise get hw_sc.build.os.version error: ' + err.code);
            });
            done();
        } catch (e) {
            console.info('system_parameter_test_0440 promise  setSync hw_sc.build.os.version: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0440 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0450
     * @tc.name      testGet0450
     * @tc.desc      Set the property value to an extra long string
     */
    it('system_parameter_test_0450', 0, async function (done) {
        console.info('system_parameter_test_0450 start');
        let ret = false;
        try {
            let parameter = systemparameter.get('a.b.b.c', PROPERTY_MAX_VALUE);
            parameter.then(function (value) {
                console.info(' system_parameter_test_0450 promise get a.b.b.c success: ' + value);
            }).catch(function (err) {
                ret = true;
                console.info(' system_parameter_test_0450 promise get a.b.b.c error: ' + err.code);
                done();
            });
        } catch (e) {
            console.info('system_parameter_test_0450 promise  setSync a.b.b.c error: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0450 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0500
     * @tc.name      testGet0500
     * @tc.desc      Get a property key value
     */
    it('system_parameter_test_0500', 0,  function (done) {
        console.info('system_parameter_test_0500 start');
        let ret = false;
        try {
            systemparameter.get('hw_sc.build.os.version', function (err, data) {
                if (err == undefined) {
                    console.log('system_parameter_test_0500 get test.parameter.key value success:' + data);
                    ret = ture;
                    done();
                } else {
                    console.log('system_parameter_test_0500  get test.parameter.key value err:' + err.code)
                }
            });
            done();
        } catch (e) {
            console.log('system_parameter_test_0500 get unexpected error: ' + e);
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0500 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0510
     * @tc.name      testGet0510
     * @tc.desc      Get a set successful attribute key value
     */
    it('system_parameter_test_0510', 0, async function (done) {
        let ret = false;
        try {
            systemparameter.set('aaaaaa', '2.2.2.2').then((data, err) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0510 set aaaaa sucess :' + data);
                } else {
                    console.info('system_parameter_test_0510 set aaaaa failed :' + err);
                }
            })
            systemparameter.get('aaaaaa', (err, data) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0510 get aaaaa sucess :' + data);
                    ret = true;
                    done();
                } else {
                    console.info('system_parameter_test_0510 get aaaaa failed :' + err.code);
                }
            })
        } catch (e) {
            console.info('system_parameter_test_0510 promise get input error: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0510 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0520
     * @tc.name      testGet0520
     * @tc.desc      Get a property key value directly
     */
    it('system_parameter_test_0520', 0, async function (done) {
        console.info('system_parameter_test_0520 start');
        let ret = false;
        try {
            systemparameter.get('a.a.a.a ', (err, data) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0520 get systemparameter sucess: ' + data);
                    ret = true;
                    done();
                } else {
                    console.info('system_parameter_test_0520 get systemparameter sucess: ' + err.code);
                }
            })
        } catch (e) {
            console.info('system_parameter_test_0520 promise get input error: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0520 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0530
     * @tc.name      testGet0530
     * @tc.desc      Gets the value of an empty string
     */
    it('system_parameter_test_0530', 0, async function (done) {
        console.info('system_parameter_test_0530 start');
        let ret = false;
        try {
            systemparameter.get(' ', (err, data) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0530 get systemparameter sucess: ' + data);
                    ret = true;
                    done();
                } else {
                    console.info('system_parameter_test_0530 get systemparameter sucess: ' + err.code);
                }
            })
        } catch (e) {
            console.info('system_parameter_test_0530 promise get input error: ' + e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0530 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0600
     * @tc.name      testGet0600
     * @tc.desc      Set the value for the given key.
     */
    it('system_parameter_test_0600', 0, function (done) {
        console.info('system_parameter_test_0600 start');
        let ret = false;
        try {
            systemparameter.get('hw_sc.build.os.version', '1.1.1.1', (err, data) => {
                if (err == undefined && data === '1.1.1.1') {
                    ret = true;
                    console.info('system_parameter_test_0600 get systemparameter hw_sc.build.os.version sucess: '
                    + data);
                    done();
                } else {
                    console.info('system_parameter_test_0600 get systemparameter hw_sc.build.os.version failed: '
                    + err.code);
                }
            })
        } catch (e) {
            console.info('system_parameter_test_0600 get systemparameter hw_sc.build.os.version abnormal: ', e);
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0600 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0610
     * @tc.name      testGet0610
     * @tc.desc      Gets an attribute key value whose value is not a string
     */
    it('system_parameter_test_0610', 0, async function (done) {
        console.info('system_parameter_test_0610 start');
        let ret = false;
        try {
            systemparameter.get('hw_sc.build.os.version', 111, (err, data) => {
                if (err == undefined && data === 111) {
                    console.info('system_parameter_test_0610 get systemparameter hw_sc.build.os.version sucess: '
                    + data);
                } else {
                    console.info('system_parameter_test_0610 get systemparameter hw_sc.build.os.version failed: '
                    + err.code);
                }
            })
        } catch (e) {
            ret = true;
            console.info('system_parameter_test_0610 get systemparameter hw_sc.build.os.version abnormal: ', e);
            done();
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0610 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0620
     * @tc.name      testGet0620
     * @tc.desc      Get an attribute key value whose value is empty
     */
    it('system_parameter_test_0620', 0, async function (done) {
        console.info('system_parameter_test_0620 start');
        let ret = false;
        try {
            systemparameter.get('hw_sc.build.os.version', '  ', (err, data) => {
                if (err == undefined) {
                    ret = true;
                    console.info('system_parameter_test_0620 get systemparameter hw_sc.build.os.version sucess: '
                    + data);
                    done();
                } else {
                    console.info('system_parameter_test_0620 get systemparameter hw_sc.build.os.version failed: '
                    + err.code);
                }
            })
        } catch (e) {
            console.info('system_parameter_test_0620 get systemparameter hw_sc.build.os.version abnormal: ', e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0620 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0640
     * @tc.name      testGet0640
     * @tc.desc      Set the property value to an extra long string
     * @tc.size      : MEDIUM
     * @tc.type      : Function
     * @tc.level     : Level 0
     */
    it('system_parameter_test_0640', 0, async function (done) {
        console.info('system_parameter_test_0640 start');
        let ret = false;
        try {
            systemparameter.get('b.b.b.b.b', PROPERTY_MAX_VALUE, (err, data) => {
                if (err == undefined) {
                    console.info('system_parameter_test_0640 get systemparameter b.b.b.b.b sucess: '
                    + data);
                } else {
                    ret = true;
                    console.info('system_parameter_test_0640 get systemparameter b.b.b.b.b failed: '
                    + err.code);
                    done();
                }
            })
        } catch (e) {
            console.info('system_parameter_test_0640 get systemparameter b.b.b.b.b abnormal: ', e);
        }
        setTimeout(function(){
            expect(ret).assertTrue();
        }, '1000');
        console.info('system_parameter_test_0640 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0700
     * @tc.name      testGetSync0700
     * @tc.desc      Gets an attribute key value whose attribute value is not a string
     */
    it('system_parameter_test_0700', 0, function (done) {
        console.info('system_parameter_test_0700 start');
        let ret = false;
        try {
            let parameterInfo = systemparameter.getSync('hw_sc.build.os.version', 496);
            console.info(JSON.stringify(parameterInfo));
        } catch (e) {
            ret = true;
            console.info('system_parameter_test_0700 promise get input error: ' + e);
            done();
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0700 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0710
     * @tc.name      testGetSync0710
     * @tc.desc      Get a property key value that sets the correct value
     */
    it('system_parameter_test_0710', 0, function (done) {
        console.info('system_parameter_test_0710 start');
        let ret = false;
        try {
            let parameterInfo = systemparameter.getSync('hw_sc.build.os.version', '0.0.0.0');
            ret = true;
            console.info('system_parameter_test_0710 promise get input sucess: ', parameterInfo);
            done();
        } catch (e) {
            console.info('system_parameter_test_0710 promise get input error: ' + e);
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0710 : end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0720
     * @tc.name      testGetSync0720
     * @tc.desc      Get the value of the attribute key directly
     */
    it('system_parameter_test_0720', 0, function (done) {
        console.info('system_parameter_test_0720 start');
        let ret = false;
        try {
            let parameterInfo = systemparameter.getSync('hw_sc.build.os.version');
            ret = true;
            console.info('system_parameter_test_0720 promise get input sucess: ', parameterInfo);
            done();
        } catch (e) {
            console.info('system_parameter_test_0720 promise get input error: ' + e);
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0720: end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0730
     * @tc.name      testGetSync0730
     * @tc.desc      Get the value of the attribute key directly
     */
    it('system_parameter_test_0730', 0, function (done) {
        console.info('system_parameter_test_0730 start');
        let ret = false;
        try {
            let parameterInfo = systemparameter.getSync('a.b.c.d.1.2.3.4', '1.2.3.4');
            console.info('system_parameter_test_0730 get parameter = ', parameterInfo);
            ret = true;
            console.info('system_parameter_test_0730 promise get input sucess: ', parameterInfo);
            done();
        } catch (e) {
            console.info('system_parameter_test_0730 promise get input error: ' + e);
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0730: end');
    })

    /**
     * @tc.number    SUB_STARTUP_JS_SYSTEM_PARAMETER_0740
     * @tc.name      testGetSync0740
     * @tc.desc      Gets the value of the attribute with the specified key.
     */
    it('system_parameter_test_0740', 0, function (done) {
        console.info('system_parameter_test_0740 start');
        let ret = false;
        try {
            systemparameter.setSync('hw_sc.build.os.version', '9.8.7.6');
            let parameterInfo = systemparameter.getSync('hw_sc.build.os.version', '0.0.0.0');
            ret = true;
            console.info('system_parameter_test_0740 promise get input sucess: ', parameterInfo);
            done();
        } catch (e) {
            console.info('system_parameter_test_0740 promise get input error: ' + e);
        }
        expect(ret).assertTrue();
        console.info('system_parameter_test_0740 : end');
    })
})