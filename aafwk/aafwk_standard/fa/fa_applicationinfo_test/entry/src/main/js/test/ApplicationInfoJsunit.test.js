// @ts-nocheck
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

import {describe, expect, it} from 'deccjsunit/index'
import commonEvent from '@ohos.commonevent'
import featureAbility from '@ohos.ability.featureability'


var getCallingBundleUri = {
    events: ["uri"]
}

var getCallingBundleType = {
    events: ["type"]
}

describe("ApplicationInfoTest", function () {
    var TAG = "";

    /*
     * @tc.number  SUB_AA_OpenHarmony_Want_0200
     * @tc.name    Switching the mission in the launcherlist to the foreground is not supported
     * @tc.desc    Function test
     * @tc.level   0
     */
    it('SUB_AA_OpenHarmony_Want_0200', 0, async function (done) {
        console.log("------------start SUB_AA_OpenHarmony_Want_0200-------------");
        TAG = "SUB_AA_OpenHarmony_Want_0200";
        var Subscriber = "";

        function SubscribeCallBackUri(err, data) {
            console.log(TAG + " Subscribe CallBack data:" + JSON.stringify(data));
            if(data.event != ""){
                for (var key in data.parameters){
                    console.log(TAG + "data.parameters[key] is :" + data.parameters[key])
                }
                expect(data.parameters[key] == "key={true,true,false}").assertTrue();
            }
            done();
        }

        commonEvent.createSubscriber(getCallingBundleUri).then(async (data) => {
            console.debug(TAG + "====>Create Subscriber====>");
            Subscriber = data;
            await commonEvent.subscribe(Subscriber, SubscribeCallBackUri);
        });

        featureAbility.startAbility({
            want: {
                abilityName: "com.example.applicationinfo.MainAbility2",
                bundleName: "com.example.applicationinfo",
                uri: "key={true,true,false}"
            }
        }, (err, data) => {
            console.log(TAG + ":startAbility success , err:" + JSON.stringify(err) + ",data:" + JSON.stringify(data));
        });
        console.log("------------end SUB_AA_OpenHarmony_Want_0200-------------");
    });

    /*
     * @tc.number  SUB_AA_OpenHarmony_Want_0300
     * @tc.name    Switching the mission in the launcherlist to the foreground is not supported
     * @tc.desc    Function test
     * @tc.level   0
     */
    it('SUB_AA_OpenHarmony_Want_0300', 0, async function (done) {
        console.log("------------start SUB_AA_OpenHarmony_Want_0300-------------");
        TAG = "SUB_AA_OpenHarmony_Want_0300";
        var Subscriber = "";

        function SubscribeCallBackType(err, data) {
            console.log(TAG + " Subscribe CallBack data:" + JSON.stringify(data));
            if(data.event != ""){
                for (var key in data.parameters){
                    console.log(TAG + "data.parameters[key] is :" + data.parameters[key])
                }
                expect(data.parameters[key] == "MIMETYPE").assertTrue();
            }
            done();
        }

        commonEvent.createSubscriber(getCallingBundleType).then(async (data) => {
            console.debug(TAG + "====>Create Subscriber====>");
            Subscriber = data;
            await commonEvent.subscribe(Subscriber, SubscribeCallBackType);
        });

        featureAbility.startAbility({
            want: {
                abilityName: "com.example.applicationinfo.MainAbility2",
                bundleName: "com.example.applicationinfo",
                type: "MIMETYPE",
            }
        }, (err, data) => {
            console.log(TAG + ":startAbility success , err:" + JSON.stringify(err) + ",data:" + JSON.stringify(data));
        });
        console.log("------------end SUB_AA_OpenHarmony_Want_0300-------------");
    })

})