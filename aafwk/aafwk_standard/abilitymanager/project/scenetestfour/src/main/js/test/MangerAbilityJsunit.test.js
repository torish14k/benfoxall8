import featureAbility from '@ohos.ability.featureability'
import abilitymanager from '@ohos.app.abilitymanager'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

var WeightReasonCode =  {
    REASON_UNKNOWN : 0,
    WEIGHT_FOREGROUND : 100,
    WEIGHT_FOREGROUND_SERVICE : 125,
    WEIGHT_VISIBLE : 200,
    WEIGHT_PERCEPTIBLE : 230,
    WEIGHT_SERVICE : 300,
    WEIGHT_TOP_SLEEPING : 325,
    WEIGHT_CANT_SAVE_STATE : 350,
    WEIGHT_CACHED : 400,
    WEIGHT_GONE : 1000
}
describe('scene_test_4', function () {
    console.info('----scene_test_4----');

    it('startlauncher_scene4_01', 0, async function (done) {
        var promise = await featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ohos.launcher",
                    abilityName: "com.ohos.launcher.MainAbility",
                    action: "action1",
                    entities: ["entity1"],
                    type: "MIMETYPE",
                    uri: "key={true,true,false}",
                    options:
                    {},
                    parameters:
                    {},
                },
            },
        );
        done();
    })

    it('removeMission_04', 0, async function (done) {
        var maxnum = 20,flag = 1;
        var data = await abilitymanager.queryRecentAbilityMissionInfos(maxnum, flag);
        console.info('==================== queryRecentAbilityMissionInfos data  ' + JSON.stringify(data) );
        for (var i = 0; i < data.length; i++) {
            if(data[i].baseAbility.bundleName != 'com.example.scene004'&& data[i].topAbility.bundleName != 'com.example.scene004'){
                var info = abilitymanager.removeMission(data[i].id);
                console.info('============== removeMission data  [' + info + ']' );
            }
        }
        done();
    })

    it('startAbility_scene4_01', 0, async function (done) {
        var promise = await featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ix.verify.io",
                    abilityName: "com.example.VerifyIoThirdAbility",
                    action: "action1",
                    entities: ["entity1"],
                    type: "MIMETYPE",
                    uri: "key={true,true,false}",
                    options:
                    {},
                    parameters:
                    {},
                },
            },
        );
        done();
    })

    it('startAbility_scene4_02', 0, async function (done) {
        var promise = await featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ix.simulate.feature",
                    abilityName: "com.example.SimulateFeatureAbilityFir",
                    action: "action1",
                    entities: ["entity1"],
                    type: "MIMETYPE",
                    uri: "key={true,true,false}",
                    options:
                    {},
                    parameters:
                    {},
                },
            },
        );
        done();
    })

    it('startAbility_scene4_03', 0, async function (done) {
        var promise = await featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ix.verify.act",
                    abilityName: "com.example.VerifyActThirdAbility",
                    action: "action1",
                    entities: ["entity1"],
                    type: "MIMETYPE",
                    uri: "key={true,true,false}",
                    options:
                    {},
                    parameters:
                    {},
                },
            },
        );
        done();
    })

    it('startAbility_scene4_04', 0, async function (done) {
        var promise = await featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ix.simulate.entry",
                    abilityName: "com.example.SimulateEntryAbilityFir",
                    action: "action1",
                    entities: ["entity1"],
                    type: "MIMETYPE",
                    uri: "key={true,true,false}",
                    options:
                    {},
                    parameters:
                    {},
                },
            },
        );
        done();
    })

    it('Acts_Ams_test_4900', 0, async function (done) {
        var info = await abilitymanager.getAllRunningProcesses();
        console.info('getAllRunningProcesses data length [' + info.length + ']' );
        console.info('==================== getAllRunningProcesses JSON String:  ' + JSON.stringify(info) );
        expect(Array.isArray(info)).assertEqual(true);
        for (var i = 0; i < info.length; i++) {
            expect(typeof(info[i].pid)).assertEqual("number");
            expect(info[i].pid).assertLarger(0);

            expect(typeof(info[i].processName)).assertEqual("string");
            expect(info[i].processName.length).assertLarger(0);

            expect(Array.isArray(info[i].pkgList)).assertEqual(true);
            expect(info[i].pkgList.length).assertEqual(0);

            expect(typeof(info[i].uid)).assertEqual("number");
            expect(info[i].uid).assertLarger(0);

            expect(typeof(info[i].lastMemoryLevel)).assertEqual("number");
            expect(info[i].lastMemoryLevel).assertEqual(-1);

            expect(typeof(info[i].weight)).assertEqual("number");
            expect(info[i].weight).assertEqual(-1);

            expect(typeof(info[i].weightReasonCode)).assertEqual("number");
            expect(info[i].weightReasonCode).assertEqual(WeightReasonCode.REASON_UNKNOWN);
        }
        done();
    })

    it('Acts_Ams_test_5300', 0, async function (done) {
        var maxnum = 100,flag = 1;
        var data = await abilitymanager.queryRecentAbilityMissionInfos(maxnum, flag);
        console.info(' queryRecentAbilityMissionInfos data length [' + data.length + ']' );
        expect(Array.isArray(data)).assertEqual(true);
        for (var i = 0; i < data.length; i++) {
            console.info('queryRunningAbilityMissionInfos  id: ' + data[i].id + ' baseAbility.deviceId: ' + data[i].baseAbility.deviceId +
            ' baseAbility.bundleName: ' + data[i].baseAbility.bundleName + ' baseAbility.abilityName: ' + data[i].baseAbility.abilityName +
            ' topAbility.deviceId: ' + data[i].topAbility.deviceId + ' topAbility.bundleName: ' + data[i].topAbility.bundleName +
            ' topAbility.abilityName: ' + data[i].topAbility.abilityName + ' missionDescription.label: ' +  data[i].missionDescription.label
            + ' missionDescription.iconPath: ' + data[i].missionDescription.iconPath);

            expect(typeof (data[i].id)).assertEqual("number");
            expect(data[i].id).assertLarger(0);

            expect(typeof (data[i].baseAbility)).assertEqual("object");
            expect(typeof (data[i].baseAbility.deviceId)).assertEqual("string");
            expect(typeof (data[i].baseAbility.bundleName)).assertEqual("string");
            expect(data[i].baseAbility.bundleName.length).assertLarger(0);
            expect(typeof (data[i].baseAbility.abilityName)).assertEqual("string");
            expect(data[i].baseAbility.abilityName.length).assertLarger(0);

            expect(typeof (data[i].topAbility)).assertEqual("object");
            expect(typeof (data[i].topAbility.deviceId)).assertEqual("string");
            expect(typeof (data[i].topAbility.bundleName)).assertEqual("string");
            expect(data[i].topAbility.bundleName.length).assertLarger(0);
            expect(typeof (data[i].topAbility.abilityName)).assertEqual("string");
            expect(data[i].topAbility.abilityName.length).assertLarger(0);

            expect(typeof (data[i].missionDescription)).assertEqual("object");
            expect(typeof (data[i].missionDescription.label)).assertEqual("string");
            expect(typeof (data[i].missionDescription.iconPath)).assertEqual("string");
        }
        done();
    })

    it('Acts_Ams_test_5100', 0, async function (done) {
        var maxnum = 30;
        var data = await abilitymanager.queryRunningAbilityMissionInfos(maxnum);
        console.info('queryRunningAbilityMissionInfos data length [' + data.length + ']' );
        expect(Array.isArray(data)).assertEqual(true);
        for (var i = 0; i < data.length; i++) {
            console.info('queryRunningAbilityMissionInfos  id: ' + data[i].id + ' baseAbility.deviceId: ' + data[i].baseAbility.deviceId +
            ' baseAbility.bundleName: ' + data[i].baseAbility.bundleName + ' baseAbility.abilityName: ' + data[i].baseAbility.abilityName +
            ' topAbility.deviceId: ' + data[i].topAbility.deviceId + ' topAbility.bundleName: ' + data[i].topAbility.bundleName +
            ' topAbility.abilityName: ' + data[i].topAbility.abilityName + ' missionDescription.label: ' +  data[i].missionDescription.label
            + ' missionDescription.iconPath: ' + data[i].missionDescription.iconPath);

            expect(typeof (data[i].id)).assertEqual("number");
            expect(data[i].id).assertLarger(0);

            expect(typeof (data[i].baseAbility)).assertEqual("object");
            expect(typeof (data[i].baseAbility.deviceId)).assertEqual("string");
            expect(typeof (data[i].baseAbility.bundleName)).assertEqual("string");
            expect(data[i].baseAbility.bundleName.length).assertLarger(0);
            expect(typeof (data[i].baseAbility.abilityName)).assertEqual("string");
            expect(data[i].baseAbility.abilityName.length).assertLarger(0);

            expect(typeof (data[i].topAbility)).assertEqual("object");
            expect(typeof (data[i].topAbility.deviceId)).assertEqual("string");
            expect(typeof (data[i].topAbility.bundleName)).assertEqual("string");
            expect(data[i].topAbility.bundleName.length).assertLarger(0);
            expect(typeof (data[i].topAbility.abilityName)).assertEqual("string");
            expect(data[i].topAbility.abilityName.length).assertLarger(0);

            expect(typeof (data[i].missionDescription)).assertEqual("object");
            expect(typeof (data[i].missionDescription.label)).assertEqual("string");
            expect(typeof (data[i].missionDescription.iconPath)).assertEqual("string");
        }
        done();
    })

    it('Acts_Ams_test_5500', 0, async function (done) {
        var maxnum = 30;
        var result = await abilitymanager.queryRunningAbilityMissionInfos(maxnum);
        var info = await abilitymanager.removeMission(result[0].id);
        console.info('============== removeMission data  [' + info + ']' );
        expect(typeof(info)).assertEqual("number");
        expect(info).assertLarger(0);
        done();
    })

    it('Acts_Ams_test_5900', 0, async function (done) {
        var maxnum = 30;
        var result = await abilitymanager.queryRunningAbilityMissionInfos(maxnum);
        var info = await abilitymanager.moveMissionToTop(result[0].id);
        console.info('============== moveMissionToTop data  [' + info + ']' );
        expect(typeof(info)).assertEqual("number");
        expect(info).assertEqual(0);
        done();
    })

    it('Acts_Ams_test_5700', 0, async function (done) {
        var info = await abilitymanager.clearMissions();
        console.info('============== clearMissions data  [' + info + ']' );
        expect(typeof(info)).assertEqual("number");
        expect(info).assertLarger(0);
        done();
    })

    it('Acts_Ams_test_6300', 0, async function (done) {
        var info = await abilitymanager.killProcessesByBundleName('xxxxxxxxxxxx');
        console.info('============== killProcessesByBundleName data  [' + info + ']' );
        expect(typeof(info)).assertEqual("number");
        expect(info).assertEqual(0);
        done();
    })

    it('Acts_Ams_test_6100', 0, async function (done) {
        var maxnum = 30;
        var result = await abilitymanager.queryRunningAbilityMissionInfos(maxnum);
        var info = await abilitymanager.removeMissions([result[1].id,result[2].id]);
        console.info('============== removeMissions data  [' + info + ']' );
        expect(typeof(info)).assertEqual("number");
        expect(info).assertEqual(0);
        done();
    })

    it('startlauncher_scene4_02', 0, async function (done) {
        var promise = await featureAbility.startAbility(
            {
                want:
                {
                    deviceId: "",
                    bundleName: "com.ohos.launcher",
                    abilityName: "com.ohos.launcher.MainAbility",
                    action: "action1",
                    entities: ["entity1"],
                    type: "MIMETYPE",
                    uri: "key={true,true,false}",
                    options:
                    {},
                    parameters:
                    {},
                },
            },
        );
        done();
    })

    it('ClearMinssion_04', 0, async function (done) {
        var info = await abilitymanager.clearMissions();
        console.info('============== clearMissions data  [' + info + ']' );
        done();
    })
})