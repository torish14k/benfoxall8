/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
#include "ActsPlayerAPITest.h"
#include "player.h"
using namespace std;
using namespace OHOS;
using namespace OHOS::Media;
using namespace testing::ext;
using namespace PlayerNameSpace;

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0100
    * @tc.name      : 01.Prepare操作在new之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0100, Reliability | SmallTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    EXPECT_NE(RET_OK, player->Prepare());
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0200
    * @tc.name      : 02.Prepare操作在PrepareAsync之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0200, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->PrepareAsync());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0300
    * @tc.name      : 03.Prepare操作在SetSource之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0300, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    int32_t time;
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    player->SetVideoSurface(videoSurface);
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_EQ(RET_OK, player->Pause());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Stop());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Reset());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0400
    * @tc.name      : 04.Prepare操作在Play之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0400, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0500
    * @tc.name      : 05.Prepare操作在Pause之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0500, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    int32_t time;
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_EQ(RET_OK, player->Pause());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0600
    * @tc.name      : 06.Prepare操作在Seek之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0600, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    int32_t time;
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0700
    * @tc.name      : 07.Prepare操作在Stop之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0700, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    int32_t time;
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_EQ(RET_OK, player->Pause());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Stop());
    EXPECT_FALSE(player->IsPlaying());
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_EQ(RET_OK, player->Pause());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Stop());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0800
    * @tc.name      : 08.Prepare操作在Reset之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0800, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    int32_t time;
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_EQ(RET_OK, player->Pause());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Stop());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Reset());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_0900
    * @tc.name      : 09.Prepare操作在SetVideoSurface之后
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_0900, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    int32_t time;
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_EQ(RET_OK, player->Pause());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->Stop());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_EQ(RET_OK, player->Reset());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_1000
    * @tc.name      : 10.Prepare操作调用3次
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_1000, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}

/**
    * @tc.number    : SUB_MEDIA_PLAYER_API_Prepare_1100
    * @tc.name      : 11.Prepare操作在每个可进行的操作后都调用一次
    * @tc.desc      : test Prepare
*/
HWTEST_F(ActsPlayerAPITest, SUB_MEDIA_PLAYER_API_Prepare_1100, Reliability | MediumTest | Level2)
{
    PlayerSignal testObj;
    std::shared_ptr<TestPlayer> player = std::make_shared<TestPlayer>(&testObj);
    ASSERT_NE(nullptr, player);
    ASSERT_EQ(true, player->CreatePlayer());
    std::string uri = GetUri();
    int32_t time;
    ASSERT_EQ(RET_OK, player->SetSource(uri));
    sptr<Surface> videoSurface = player->GetVideoSurface(g_sub_config);
    EXPECT_EQ(RET_OK, player->SetVideoSurface(videoSurface));
    std::shared_ptr<TestPlayerCallback> testCallback = std::make_shared<TestPlayerCallback>(&testObj);
    EXPECT_EQ(RET_OK, player->SetPlayerCallback(testCallback));
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Play());
    EXPECT_TRUE(player->IsPlaying());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Seek(SEEK_TIME_2_SEC, SEEK_PREVIOUS_SYNC));
    EXPECT_EQ(RET_OK, player->GetCurrentTime(time));
    EXPECT_NEAR(SEEK_TIME_2_SEC, time, DELTA_TIME);
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Pause());
    EXPECT_FALSE(player->IsPlaying());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Stop());
    EXPECT_FALSE(player->IsPlaying());
    ASSERT_EQ(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, player->Reset());
    EXPECT_NE(RET_OK, player->Prepare());
    EXPECT_EQ(RET_OK, testCallback->errorNum);
}
