/**
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

import particleAbility from '@ohos.ability.particleAbility';
import rpc from '@ohos.rpc';

class StubTest3 extends rpc.RemoteObject {
    constructor(des) {
        super(des)
    }

    onRemoteRequest(code, data, reply, option) {
        console.info('ServiceAbility3 onRemoteRequest');
        if (code === 1) {
            let op1 = data.readInt();
            let op2 = data.readInt();
            reply.writeInt(op1 + op2);
            console.info('ServiceAbility3 op1:' + op1 + ' op2:' + op2);
        }
        return true;
    }
}

async function sleep(time: any) {
    var now = new Date();
    var exitTime = now.getTime() + time;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
        break;
    }
    console.info(`sleep ${time} over...`);
}

export default {
    onStart() {
        console.info('ServiceAbility3 onStart');
    },
    onStop() {
        console.info('ServiceAbility3 onStop');
    },
    onCommand(want, startId) {
        console.info('ServiceAbility3 onCommand');
        let request = {
            "bundleName": "com.ohos.acecollaboration",
            "abilityName": "com.ohos.acecollaboration.ServiceAbility",
        }
        let options = {
            onConnect: async function (element: any, proxy: any) {
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onConnect element.deviceId : '
                + JSON.stringify(element.deviceId))
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onConnect element.bundleName : '
                + JSON.stringify(element.bundleName))
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onConnect element.abilityName : '
                + JSON.stringify(element.abilityName))
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onConnect element.uri : '
                + JSON.stringify(element.uri))
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onConnect element.shortName : '
                + JSON.stringify(element.shortName))
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onConnect proxy : '
                + JSON.stringify(proxy));
            },
            onDisconnect: function (element1: any) {
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onDisconnect element.deviceId :'
                + JSON.stringify(element1.deviceId));
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onDisconnect element.bundleName :'
                + JSON.stringify(element1.bundleName));
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onDisconnect element.abilityName :'
                + JSON.stringify(element1.abilityName));
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onDisconnect element.uri : '
                + JSON.stringify(element1.uri));
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onDisconnect element.shortName : '
                + JSON.stringify(element1.shortName));
            },
            onFailed: function (code: any) {
                console.log('particleAbility_connectAbility_test_0200 ConnectAbility onFailed errCode: ' + code)
            },
        }

        let connection_succeeded: any;
        async function connectAbility_service() {
            console.info('particleAbility_connectAbility_test_0200  start ');
            var connection = particleAbility.connectAbility(request, options);
            connection_succeeded = connection;
            console.info('particleAbility_connectAbility_test_0200 service  request is:' + JSON.stringify(request));
            console.info('particleAbility_connectAbility_test_0200 options is:' + JSON.stringify(options));
            console.info('particleAbility_connectAbility_test_0200 data is: ' + JSON.stringify(connection));
            console.info('particleAbility_connectAbility_test_0200  connection=: ' + connection);
        }

        async function disconnectAbility_callback() {
            console.info('particleAbility_connectAbility_test_0200  disconnectability start ');
            particleAbility.disconnectAbility(connection_succeeded).then((data: any) => {
                console.info('particleAbility_connectAbility_test_0200 disconnectability succeeded: ' +
                JSON.stringify(data));
            }).catch((error: any) => {
                console.error('particleAbility_connectAbility_test_0200 disconnectability failed. Cause: ' +
                JSON.stringify(error));
            })
        }
        connectAbility_service();
        sleep(5000);
        disconnectAbility_callback();
        sleep(5000);
    },
    onConnect(want) {
        console.info('ServiceAbility3 onConnect');
        return new StubTest3("test");
    },
};