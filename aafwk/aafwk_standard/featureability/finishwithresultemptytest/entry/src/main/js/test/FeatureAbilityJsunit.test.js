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
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe('FinishWithResultEmptyTest', function () {
    // @tc.number: ACTS_FinishWithResult_0300
    // @tc.name: FinishWithResult : Called when startAbilityForResultis called to start an ability and the result is returned.
    // @tc.desc: Check the return value of the interface (by Promise)
    it('ACTS_FinishWithResult_0300', 0, async function (done) {
        var promise = await featureAbility.finishWithResult(
            {
                resultCode: 1,
                want:
                {
                    action: "",
                    entities: [""],
                    type: "",
                    deviceId: "",
                    bundleName: "",
                    abilityName: "",
                    uri:"",
                },
            }
        );
        expect(typeof(promise)).assertEqual("object");
        done();
    })

    // @tc.number: ACTS_TerminateAbility_0100
    // @tc.name: TerminateAbility : Destroys ability
    // @tc.desc: Check the return value of the interface (by Promise)
    it('ACTS_TerminateAbility_0100', 0, async function (done) {
        var promise = featureAbility.terminateAbility();
        expect(typeof(promise)).assertEqual("object");
        done();
    })
})