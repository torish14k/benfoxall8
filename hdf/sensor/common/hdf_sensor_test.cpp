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

#include <cmath>
#include <cstdio>
#include <unistd.h>
#include <gtest/gtest.h>
#include <securec.h>
#include "hdf_base.h"
#include "hdf_log.h"
#include "osal_time.h"
#include "sensor_if.h"
#include "sensor_type.h"

using namespace testing::ext;

namespace {
    struct SensorValueRange {
        float highThreshold;
        float lowThreshold;
    };

    struct SensorDevelopmentList {
        int32_t sensorTypeId;
        char sensorName[SENSOR_NAME_MAX_LEN];
        int32_t dataForm;    // 0: fixed, 1: range
        int32_t dataDimension;
        struct SensorValueRange *valueRange;
    };

    static struct SensorValueRange g_testRange[] = {{1e5, 0}};
    static struct SensorValueRange g_accelRange[] = {{78, -78}, {78, -78}, {78, -78}};
    static struct SensorValueRange g_alsRange[] = {{10000, 0}};
    static struct SensorValueRange g_proximityRange[] = {{5, 0}};
    static struct SensorValueRange g_hallRange[] = {{1, 0}};
    static struct SensorValueRange g_barometerRange[] = {{1100, -1100}, {1100, -1100}};
    static struct SensorValueRange g_magneticRange[] = {{35, -35}, {35, -35}, {35, -35}};
    static struct SensorValueRange g_gyroscopeRange[] = {{2000, -2000}, {2000, -2000}, {2000, -2000}};
    static struct SensorValueRange g_gravityRange[] = {{78, -78}, {78, -78}, {78, -78}};

    static struct SensorDevelopmentList g_sensorList[] = {
        {SENSOR_TYPE_NONE, "sensor_test", 1, 1, g_testRange},
        {SENSOR_TYPE_ACCELEROMETER, "accelerometer", 1, 3, g_accelRange},
        {SENSOR_TYPE_PROXIMITY, "proximity", 0, 1, g_proximityRange},
        {SENSOR_TYPE_HALL, "hallrometer", 0, 1, g_hallRange},
        {SENSOR_TYPE_BAROMETER, "barometer", 1, 2, g_barometerRange},
        {SENSOR_TYPE_AMBIENT_LIGHT, "als", 1, 1, g_alsRange},
        {SENSOR_TYPE_MAGNETIC_FIELD, "magnetometer", 1, 3, g_magneticRange},
        {SENSOR_TYPE_GYROSCOPE, "gyroscope", 1, 3, g_gyroscopeRange},
        {SENSOR_TYPE_GRAVITY, "gravity", 1, 3, g_gravityRange}
    };

    static int g_listNum = sizeof(g_sensorList) / sizeof(g_sensorList[0]);
    static uint32_t g_sensorDataFlag = 1;
    const int32_t SENSOR_ID = 0;
    const int32_t SENSOR_INTERVAL = 200000000;
    const int32_t SENSOR_POLL_TIME = 1;
    const int32_t SENSOR_WAIT_TIME = 400;
    const struct SensorInterface *g_sensorDev = nullptr;
    static int32_t g_count = 0;
    static struct SensorInformation *g_sensorInfo = nullptr;

    void SensorDataVerification(const float &data, const struct SensorDevelopmentList &sensorNode)
    {
        for (int32_t j = 0; j < sensorNode.dataDimension; ++j) {
            printf("sensor id :[%d], data[%d]: %f\n\r", sensorNode.sensorTypeId, j + 1, *(&data + j));
            if (sensorNode.dataForm == 0) {
                if (*(&data + j) == sensorNode.valueRange[j].highThreshold ||
                    *(&data + j) == sensorNode.valueRange[j].lowThreshold) {
                    g_sensorDataFlag &= 1;
                } else {
                    g_sensorDataFlag = 0;
                    printf("%s: %s Not expected\n\r", __func__, sensorNode.sensorName);
                }
            }

            if (sensorNode.dataForm == 1) {
                if (*(&data + j) > sensorNode.valueRange[j].lowThreshold &&
                    *(&data + j) < sensorNode.valueRange[j].highThreshold) {
                    g_sensorDataFlag &= 1;
                } else {
                    g_sensorDataFlag = 0;
                    printf("%s: %s Not expected\n\r", __func__, sensorNode.sensorName);
                }
            }
        }
    }

    int SensorTestDataCallback(const struct SensorEvents *event)
    {
        if (event == nullptr || event->data == nullptr) {
            return -1;
        }

        for (int32_t i = 0; i < g_listNum; ++i) {
            if (event->sensorId == g_sensorList[i].sensorTypeId) {
                if (event->sensorId == SENSOR_TYPE_HALL || event->sensorId == SENSOR_TYPE_PROXIMITY) {
                    float data = (float)*event->data;
                    SensorDataVerification(data, g_sensorList[i]);
                } else {
                    float *data = (float*)event->data;
                    SensorDataVerification(*data, g_sensorList[i]);
                }
            }
        }
        return 0;
    }
}

class HdfSensorTest : public testing::Test {
public:
    static void SetUpTestCase();
    static void TearDownTestCase();
    void SetUp();
    void TearDown();
};

void HdfSensorTest::SetUpTestCase()
{
    g_sensorDev = NewSensorInterfaceInstance();
    if (g_sensorDev == nullptr) {
        HDF_LOGE("test sensorHdi get Module instance failed\n\r");
    }
    int32_t ret = g_sensorDev->GetAllSensors(&g_sensorInfo, &g_count);
    if (ret == -1) {
        HDF_LOGE("get sensor informations failed\n\r");
    }
}

void HdfSensorTest::TearDownTestCase()
{
    if (g_sensorDev != nullptr) {
        FreeSensorInterfaceInstance();
        g_sensorDev = nullptr;
    }
}

void HdfSensorTest::SetUp()
{
}

void HdfSensorTest::TearDown()
{
}

/**
  * @tc.name: GetSensorInstance001
  * @tc.desc: Create a sensor instance and check whether the instance is empty.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, GetSensorInstance001, Function | MediumTest | Level1)
{
    ASSERT_NE(nullptr, g_sensorDev);
    const struct SensorInterface *sensorDev = NewSensorInterfaceInstance();
    EXPECT_EQ(sensorDev, g_sensorDev);
}

/**
  * @tc.name: RemoveSensorInstance001
  * @tc.desc: The sensor instance is successfully removed.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, RemoveSensorInstance001, Function | MediumTest | Level1)
{
    int32_t ret = FreeSensorInterfaceInstance();
    ASSERT_EQ(0, ret);
    ret = FreeSensorInterfaceInstance();
    EXPECT_EQ(0, ret);
    g_sensorDev = NewSensorInterfaceInstance();
    if (g_sensorDev == nullptr) {
        HDF_LOGE("test sensorHdi get Module instance failed\n\r");
        ASSERT_EQ(0, ret);
        return;
    }
    ret = g_sensorDev->GetAllSensors(&g_sensorInfo, &g_count);
    EXPECT_EQ(0, ret);
}

/**
  * @tc.name: RegisterDataCb001
  * @tc.desc: Returns 0 if the callback is successfully registered; returns a negative value otherwise.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, RegisterSensorDataCb001, Function | MediumTest | Level1)
{
    int32_t ret = g_sensorDev->Register(SensorTestDataCallback);
    EXPECT_EQ(0, ret);
    ret = g_sensorDev->Unregister();
    EXPECT_EQ(0, ret);
}

/**
  * @tc.name: RegisterDataCb002
  * @tc.desc: Returns 0 if the callback is successfully registered; returns a negative value otherwise.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, RegisterSensorDataCb002, Function | MediumTest | Level1)
{
    int32_t ret = g_sensorDev->Register(nullptr);
    EXPECT_EQ(SENSOR_NULL_PTR, ret);
    ret = g_sensorDev->Unregister();
    EXPECT_EQ(0, ret);
}

/**
  * @tc.name: GetSensorList001
  * @tc.desc: Obtains information about all sensors in the system. Validity check of input parameters.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, GetSensorList001, Function | MediumTest | Level1)
{
    struct SensorInformation *info = nullptr;
    int j;

    if (g_sensorInfo == nullptr) {
        EXPECT_NE(nullptr, g_sensorInfo);
        return;
    }

    printf("get sensor list num[%d]\n\r", g_count);
    info = g_sensorInfo;

    for (int i = 0; i < g_count; ++i) {
        printf("get sensoriId[%d], info name[%s], power[%f]\n\r", info->sensorId, info->sensorName, info->power);
        for (j = 0; j < g_listNum; ++j) {
            if (info->sensorId == g_sensorList[j].sensorTypeId) {
                EXPECT_STREQ(g_sensorList[j].sensorName, info->sensorName);
                break;
            }
        }

        if (j == g_listNum) {
            EXPECT_NE(g_listNum, j);
        }
        info++;
    }
}

/**
  * @tc.name: GetSensorList002
  * @tc.desc: Obtains information about all sensors in the system. The operations include obtaining sensor information,
  * subscribing to or unsubscribing from sensor data, enabling or disabling a sensor,
  * setting the sensor data reporting mode, and setting sensor options such as the accuracy and measurement range.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, GetSensorList002, Function | MediumTest | Level1)
{
    int32_t ret = g_sensorDev->GetAllSensors(nullptr, &g_count);
    EXPECT_EQ(SENSOR_NULL_PTR, ret);
    ret = g_sensorDev->GetAllSensors(&g_sensorInfo, nullptr);
    EXPECT_EQ(SENSOR_NULL_PTR, ret);
    ret = g_sensorDev->GetAllSensors(nullptr, nullptr);
    EXPECT_EQ(SENSOR_NULL_PTR, ret);
}

/**
  * @tc.name: EnableSensor001
  * @tc.desc: Enables the sensor unavailable in the sensor list based on the specified sensor ID.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, EnableSensor001, Function | MediumTest | Level1)
{
    int32_t ret = g_sensorDev->Register(SensorTestDataCallback);
    EXPECT_EQ(0, ret);

    struct SensorInformation *info = nullptr;

    if (g_sensorInfo == nullptr) {
        EXPECT_NE(nullptr, g_sensorInfo);
        return;
    }

    info = g_sensorInfo;
    for (int i = 0; i < g_count; i++) {
        ret = g_sensorDev->SetBatch(info->sensorId, SENSOR_INTERVAL, SENSOR_POLL_TIME);
        EXPECT_EQ(0, ret);
        ret = g_sensorDev->Enable(info->sensorId);
        EXPECT_EQ(0, ret);
        OsalSleep(SENSOR_POLL_TIME);
        EXPECT_EQ(1, g_sensorDataFlag);
        ret = g_sensorDev->Disable(info->sensorId);
        EXPECT_EQ(0, ret);
        info++;
    }

    ret = g_sensorDev->Unregister();
    EXPECT_EQ(0, ret);
}

/**
  * @tc.name: EnableSensor002
  * @tc.desc: Enables the sensor available in the sensor list based on the specified sensor ID.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, EnableSensor002, Function | MediumTest | Level1)
{
    if (g_sensorInfo == nullptr) {
        EXPECT_NE(nullptr, g_sensorInfo);
        return;
    }

    int32_t ret = g_sensorDev->Enable(-1);
    EXPECT_EQ(-2, ret);
    ret = g_sensorDev->Disable(-1);
    EXPECT_EQ(-2, ret);
}

/**
  * @tc.name: SetSensorBatch001
  * @tc.desc: Sets the sampling time and data report interval for sensors in batches.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, SetSensorBatch001, Function | MediumTest | Level1)
{
    struct SensorInformation *info = nullptr;

    int32_t ret = g_sensorDev->Register(SensorTestDataCallback);
    EXPECT_EQ(0, ret);

    if (g_sensorInfo == nullptr) {
        EXPECT_NE(nullptr, g_sensorInfo);
        return;
    }

    info = g_sensorInfo;
    for (int i = 0; i < g_count; i++) {
        ret = g_sensorDev->SetBatch(info->sensorId, SENSOR_INTERVAL, SENSOR_POLL_TIME);
        EXPECT_EQ(0, ret);
        ret = g_sensorDev->Enable(info->sensorId);
        EXPECT_EQ(0, ret);
        OsalMSleep(SENSOR_WAIT_TIME);
        EXPECT_EQ(1, g_sensorDataFlag);
        ret = g_sensorDev->Disable(info->sensorId);
        EXPECT_EQ(0, ret);
        info++;
    }

    ret = g_sensorDev->Unregister();
    EXPECT_EQ(0, ret);
}

/** @tc.name: SetSensorBatch002
    @tc.desc: Sets the sampling time and data report interval for sensors in batches.
    @tc.type: FUNC
    */
HWTEST_F(HdfSensorTest, SetSensorBatch002, Function | MediumTest | Level1)
{
    int32_t ret = g_sensorDev->SetBatch(-1, 0, 0);
    EXPECT_EQ(-2, ret);
}

/**
  * @tc.name: SetSensorMode001
  * @tc.desc: Sets the data reporting mode for the specified sensor.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, SetSensorMode001, Function | MediumTest | Level1)
{
    struct SensorInformation *info = nullptr;

    int32_t ret = g_sensorDev->Register(SensorTestDataCallback);
    EXPECT_EQ(0, ret);

    if (g_sensorInfo == nullptr) {
        EXPECT_NE(nullptr, g_sensorInfo);
        return;
    }

    info = g_sensorInfo;
    for (int i = 0; i < g_count; i++) {
        ret = g_sensorDev->SetBatch(info->sensorId, SENSOR_INTERVAL, SENSOR_POLL_TIME);
        EXPECT_EQ(0, ret);
        if (info->sensorId == SENSOR_TYPE_HALL) {
            ret = g_sensorDev->SetMode(info->sensorId, SENSOR_MODE_ON_CHANGE);
            EXPECT_EQ(0, ret);
        } else {
            ret = g_sensorDev->SetMode(info->sensorId, SENSOR_MODE_REALTIME);
            EXPECT_EQ(0, ret);
        }

        ret = g_sensorDev->Enable(info->sensorId);
        EXPECT_EQ(0, ret);
        OsalMSleep(SENSOR_WAIT_TIME);
        EXPECT_EQ(1, g_sensorDataFlag);
        ret = g_sensorDev->Disable(info->sensorId);
        EXPECT_EQ(0, ret);
        info++;
    }

    ret = g_sensorDev->Unregister();
    EXPECT_EQ(0, ret);
}

/**
  * @tc.name: SetSensorMode002
  * @tc.desc: Sets the data reporting mode for the specified sensor.The current real-time polling mode is valid.
  * Other values are invalid.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, SetSensorMode002, Function | MediumTest | Level1)
{
    struct SensorInformation *info = nullptr;

    int32_t ret = g_sensorDev->Register(SensorTestDataCallback);
    EXPECT_EQ(0, ret);

    if (g_sensorInfo == nullptr) {
        EXPECT_NE(nullptr, g_sensorInfo);
        return;
    }

    info = g_sensorInfo;
    for (int i = 0; i < g_count; i++) {
        ret = g_sensorDev->SetBatch(info->sensorId, SENSOR_INTERVAL, SENSOR_POLL_TIME);
        EXPECT_EQ(0, ret);
        ret = g_sensorDev->SetMode(info->sensorId, SENSOR_MODE_DEFAULT);
        EXPECT_EQ(-1, ret);
        ret = g_sensorDev->Enable(info->sensorId);
        EXPECT_EQ(0, ret);
        OsalMSleep(SENSOR_WAIT_TIME);
        EXPECT_EQ(1, g_sensorDataFlag);
        ret = g_sensorDev->Disable(info->sensorId);
        EXPECT_EQ(0, ret);
        info++;
    }

    ret = g_sensorDev->Unregister();
    EXPECT_EQ(0, ret);
}

/**
  * @tc.name: SetSensorOption001
  * @tc.desc: Sets options for the specified sensor, including its measurement range and accuracy.
  * @tc.type: FUNC
  */
HWTEST_F(HdfSensorTest, SetSensorOption001, Function | MediumTest | Level1)
{
    struct SensorInformation *g_sensorInfo = nullptr;

    int32_t ret = g_sensorDev->Register(SensorTestDataCallback);
    EXPECT_EQ(0, ret);
    ret = g_sensorDev->GetAllSensors(&g_sensorInfo, &g_count);
    EXPECT_EQ(0, ret);
    ret = g_sensorDev->SetBatch(SENSOR_ID, SENSOR_INTERVAL, SENSOR_POLL_TIME);
    EXPECT_EQ(0, ret);
    ret = g_sensorDev->SetOption(SENSOR_ID, 0);
    EXPECT_EQ(0, ret);
    ret = g_sensorDev->Enable(SENSOR_ID);
    EXPECT_EQ(0, ret);
    OsalMSleep(SENSOR_WAIT_TIME);
    EXPECT_EQ(1, g_sensorDataFlag);
    ret = g_sensorDev->Disable(SENSOR_ID);
    EXPECT_EQ(0, ret);
    ret = g_sensorDev->Unregister();
    EXPECT_EQ(0, ret);
}
