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
import rpc from "@ohos.rpc"
import particleAbility from '@ohos.ability.particleability'
import commonEvent from '@ohos.commonevent'

let mMyStub;
let mMyProxy;

export default {
    data: {
        title: ""
    },
    onStart(want) {
        console.log('SerivceAbilityServer onStart');

        class MyStub extends rpc.RemoteObject {
            constructor(des) {
                if (typeof des === 'string') {
                    super(des, des.length);
                }
                return null;
            }

            onRemoteRequest(code, message, reply, option) {
                console.log("RPCTestServer onRemoteRequest called 1111");
                console.log("RPCTestServer onRemoteRequest code:" + code);
                if (code === 1) {
                    let getContextObject = rpc.IPCSkeleton.getContextObject();
                    let getCallingPid = rpc.IPCSkeleton.getCallingPid();
                    let getCallingUid = rpc.IPCSkeleton.getCallingUid();
                    let getCallingDeviceID = rpc.IPCSkeleton.getCallingDeviceID();
                    let getLocalDeviceID = rpc.IPCSkeleton.getLocalDeviceID();
                    let isLocalCalling = rpc.IPCSkeleton.isLocalCalling();
                    let remoteObject = new rpc.RemoteObject("aaa", 3);
                    let flushCommands = rpc.IPCSkeleton.flushCommands(remoteObject);
                    let resetCallingIdentity = rpc.IPCSkeleton.resetCallingIdentity();
                    let setCallingIdentity = rpc.IPCSkeleton.setCallingIdentity("aaa", 3);
                    let num = message.readInt();
                    let msg = message.readString();
                    console.log("num is " + num + "msg is " + msg);
                    reply.writeString("Success");
                    return true;
                }
            }
        }
        mMyStub = new MyStub("ServiceAbility-test");
    },
    onStop() {
        console.log('SerivceAbilityServer onStop');
    },
    onConnect(want) {
        console.log('stub SerivceAbilityServer OnConnect' + JSON.stringify(want));
        if (want.action == 'StartAbilityPromise') {
            console.log('stub SerivceAbilityServer OnConnect start 1');
            console.log('=======startAbilityPromise=======')
            particleAbility.startAbility(
                {
                    want:
                    {
                        action: "action.system.home",
                        entities: ["entity.system.home"],
                        type: "MIMETYPE",
                        deviceId: "",
                        bundleName: "com.example.particlestartability",
                        abilityName: "com.example.particlestartability.MainAbility",
                        uri: ""
                    },
                }
            );
        }
        if (want.action == 'StartAbilityCallback') {
            console.log('stub SerivceAbilityServer OnConnect start 2')
            console.log('=======startAbilityCallback=======')
            particleAbility.startAbility(
                {
                    want:
                    {
                        action: "action.system.home",
                        entities: ["entity.system.home"],
                        type: "MIMETYPE",
                        deviceId: "",
                        bundleName: "com.example.particlestartability",
                        abilityName: "com.example.particlestartability.MainAbility",
                        uri: ""
                    },
                }, (err, data) => {
                    console.debug('=====start Ability callback=====' + err.code + ', data ' + data);
                }
            );
        }
        if (want.action == "AcquireDataHelper") {
            console.log('stub SerivceAbilityServer OnConnect start 3')
            let dataAbilityUri = "dataability:///com.ix.VerifyActDataAbility";
            const valueBucket = {
                "name": "ACTS_AcquireDataHelper",
                "age": 221,
                "salary": 20.5,
                "blobType": "u8",
            }
            let DAHelper = particleAbility.acquireDataAbilityHelper(dataAbilityUri);
            console.log('stub SerivceAbilityServer OnConnect ' + DAHelper + JSON.stringify(DAHelper) + typeof DAHelper)
            if (JSON.stringify(DAHelper) != 'null') {
                var asyncCallback = DAHelper.insert(dataAbilityUri, valueBucket,
                    (err, data) => {
                        console.log("json err【" + JSON.stringify(err) + " 】json data【" + JSON.stringify(data) + " 】;");
                        commonEvent.publish("ACTS_AcquireDataHelper_0100" + data, err => {
                            console.log('Publish ACTS_AcquireDataHelper_0100 result: ' + err.code);
                        });
                    }
                );
            }
            console.log('stub SerivceAbilityServer OnConnect is null');
        }
        if (want.action == "AcquireDataHelper_no") {
            console.log('stub SerivceAbilityServer OnConnect start 4')
            let dataAbilityUri = "";
            var DAHelper = particleAbility.acquireDataAbilityHelper(dataAbilityUri);
            console.log('stub SerivceAbilityServer OnConnect ' + DAHelper + JSON.stringify(DAHelper) + typeof DAHelper);
            if (JSON.stringify(DAHelper) == 'null') {
                console.log('stub SerivceAbilityServer OnConnect DAHelper is null')
                commonEvent.publish("ACTS_AcquireDataHelper_02000", err => {
                    console.log('Publish ACTS_AcquireDataHelper_0200 result: ' + err.code)
                });
            }
            console.log('stub SerivceAbilityServer OnConnect end')
        }
        return mMyStub;
    },
    onReconnect(want) {
        console.log('SerivceAbilityServer onReconnect');
    },
    onDisconnect() {
        console.log('SerivceAbilityServer OnDisConnect');
    },
    onCommand(want, restart, startId) {
        console.log('SerivceAbilityServer onCommand');
    },
}
