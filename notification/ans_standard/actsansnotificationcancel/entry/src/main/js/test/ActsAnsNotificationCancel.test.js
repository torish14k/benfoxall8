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

import notify from '@ohos.notification'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe('ActsAnsNotificationCancel', function () {
    console.info("===========ActsAnsNotificationCancel start====================>");
    var timesOfOnConsume
    function onConsume_cancelAll(err, data) {
        console.info("================>onConsume_cancelAll_0100=======================>");
        console.info("================>onConsume_cancelAll_0100 data: =======================>" + JSON.stringify(data));
        timesOfOnConsume = timesOfOnConsume + 1
        if (timesOfOnConsume == 2){
            notify.cancelAll(cancelAllCallBack);
            console.info("================>onConsume_cancelAll_0100 cancelAll=======================>");
        }
        console.info("================>onConsume_cancelAll_0100 end=======================>");
    }
    var timesOfOnCancel
    function onCancel_cancelAll(err, data) {
        console.info("==========================>onCancel_cancelAll_0100=======================>");
        console.info("================>onCancel_cancelAll_0100 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll_0100 err : =======================>" + JSON.stringify(err));
        timesOfOnCancel = timesOfOnCancel + 1
        if (timesOfOnCancel == 1){
            expect(data.request.id).assertequal(1);
        } else if (timesOfOnCancel == 2){
            expect(data.request.id).assertequal(2);
        }
        console.info("================>onCancel_cancelAll_0100 end=======================>");
    }
    function cancelAllCallBack(err, data){
        console.info("==========================>cancelAllCallBack start=======================>");
        console.info("==================cancelAllCallBack data==================>" + JSON.stringify(data));
        console.info("==================cancelAllCallBack err==================>" + JSON.stringify(err));
        console.info("==========================>cancelAllCallBack end=======================>");
    }

    /*
     * @tc.number: ANS_Cancel_0100
     * @tc.name: cancelAll(callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that the application successfully cancels all its published notifications by calling the cancelAll(callback: AsyncCallback<void>) interface
     */
    it('ANS_Cancel_0100', 0, async function (done) {
        console.info("==================ANS_Cancel_0100 start==================>");
        timesOfOnConsume = 0
        timesOfOnCancel = 0
        var subscriber ={
            onConsumed:onConsume_cancelAll,
            onCanceled:onCancel_cancelAll,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0100_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 1,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0100_1",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        var notificationRequest1 = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 2,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0100_2",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish1_0100_promise==================>");
        });
        await notify.publish(notificationRequest1).then(() => {
            console.info("==================publish2_0100_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================unsubscribe_0100_promise==================>");
        });
        done();
    })
    function onConsume_cancelAll_promise(err, data) {
        console.info("================>onConsume_cancelAll_promise_0200=======================>");
        console.info("================>onConsume_cancelAll_promise_0200 data: =======================>" + JSON.stringify(data));
        timesOfOnConsume = timesOfOnConsume + 1
        if (timesOfOnConsume == 2){
            notify.cancelAll().then((err, data) => {
                console.info("==========cancelAll_promise_0200 start==========>");
                console.info("==========cancelAll_promise_0200 err : =========>" + JSON.stringify(err));
                console.info("==========cancelAll_promise_0200 data : =========>" + JSON.stringify(data));
                console.info("==========cancelAll_promise_0200 end==========>");
            });
        }
        console.info("================>onConsume_cancelAll_promise_0200 end=======================>");
    }
    function onCancel_cancelAll_promise(err, data) {
        timesOfOnCancel = timesOfOnCancel + 1
        console.info("==========================>onCancel_cancelAll_promise_0200=======================>");
        console.info("================>onCancel_cancelAll_promise_0200 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll_promise_0200 err : =======================>" + JSON.stringify(err));
        if (timesOfOnCancel == 1){
            expect(data.request.id).assertequal(1);
        } else if (timesOfOnCancel == 2){
            expect(data.request.id).assertequal(2);
        }
        console.info("================>onCancel_cancelAll_promise_0200 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0200
     * @tc.name: cancelAll(): Promise<void>;
     * @tc.desc: Verify that the application successfully cancels all its published notifications by calling the  cancelAll(): Promise<void> interface
     */
    it('ANS_Cancel_0200', 0, async function (done) {
        console.info("===============ANS_Cancel_0200 start==========================>");
        timesOfOnConsume = 0
        timesOfOnCancel = 0
        var subscriber ={
            onConsumed:onConsume_cancelAll_promise,
            onCanceled:onCancel_cancelAll_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0200_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 1,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0200",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        var notificationRequest1 = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 2,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0200",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish1_0200_promise==================>");
        });
        await notify.publish(notificationRequest1).then(() => {
            console.info("==================publish2_0200_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0200_promise==================>");
        });
        done();
    })

    function onConsume_cancelAll_noNotify(err, data) {
        console.info("================>onConsume_cancelAll_noNotify_0300=======================>");
        console.info("================>onConsume_cancelAll_noNotify_0300 data: =======================>" + JSON.stringify(data));
        expect(1).assertequal(0);
        console.info("================>onConsume_cancelAll_noNotify_0300 end=======================>");
    }
    function onCancel_cancelAll_noNotify(err, data) {
        console.info("==========================>onCancel_cancelAll_0300=======================>");
        expect(1).assertequal(0);
        console.info("================>onCancel_cancelAll_0300 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll_0300 err : =======================>" + JSON.stringify(err));
        console.info("================>onCancel_cancelAll_0300 end=======================>");
    }
    function cancelAllCallBack_noNotify(err, data){
        console.info("==========================>cancelAllCallBack_noNotify_0300 start=======================>");
        console.info("================>cancelAllCallBack_noNotify_0300 data : =======================>" + JSON.stringify(data));
        console.info("================>cancelAllCallBack_noNotify_0300 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelAllCallBack_noNotify_0300 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0300
     * @tc.name: cancelAll(callback: AsyncCallback<void>): void
     * @tc.desc: Verify that when there is no notification in the notification list, call the cancelAll(callback: AsyncCallback<void>): void interface,
                 and the application cancels all its published notifications.
                 At this time, no notification information is cancelled, and there is no OnCancel notification（Callback mode)
     */
    it('ANS_Cancel_0300', 0, async function (done) {
        console.info("===============ANS_Cancel_0300 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancelAll_noNotify,
            onCanceled:onCancel_cancelAll_noNotify,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0300_promise==================>");
        });
        await　notify.cancelAll(cancelAllCallBack_noNotify);
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0300_promise==================>");
        });
        done();
    })

    function onConsume_cancelAll_noNotify_promise(err, data) {
        console.info("================>onConsume_cancelAll_noNotify_promise_0400=======================>");
        console.info("================>onConsume_cancelAll_noNotify_promise_0400 data: =======================>" + JSON.stringify(data));
        expect(1).assertequal(0);
        console.info("================>onConsume_cancelAll_noNotify_promise_0400 end=======================>");
    }
    function onCancel_cancelAll_noNotify_promise(err, data) {
        console.info("==========================>onCancel_cancelAll_noNotify_promise_0400=======================>");
        console.info("================>onCancel_cancelAll_noNotify_promise_0400 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll_noNotify_promise_0400 err : =======================>" + JSON.stringify(err));
        expect(1).assertequal(0);
        console.info("===============`=>onCancel_cancelAll_noNotify_promise_0400 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0400
     * @tc.name: cancelAll(): Promise<void>;
     * @tc.desc: Verify that when there is no notification in the notification list, call the cancelAll(callback: AsyncCallback<void>): void interface,
                 and the application cancels all its published notifications.
                 At this time, no notification information is cancelled, and there is no OnCancel notification（ Callback mode)
     */
    it('ANS_Cancel_0400', 0, async function (done) {
        console.info("===============ANS_Cancel_0400 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancelAll_noNotify_promise,
            onCanceled:onCancel_cancelAll_noNotify_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0400_promise==================>");
        });
        await notify.cancelAll().then((err, data) => {
            console.info("==========cancelAll_noNotify_promise_0400 start==========>");
            console.info("==========cancelAll_noNotify_promise_0400 err : =========>" + JSON.stringify(err));
            console.info("==========cancelAll_noNotify_promise_0400 data : =========>" + JSON.stringify(data));
            console.info("==========cancelAll_noNotify_promise_0400 start==========>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0400_promise==================>");
        });
        done();
    })

    function onConsume_cancelAll2Times(err, data) {
        console.info("================>onConsume_cancelAll2Times_0500=======================>");
        console.info("================>onConsume_cancelAll2Times_0500 data: =======================>" + JSON.stringify(data));
        notify.cancelAll(cancelAllCallBack2Times1);
        console.info("================>onConsume_cancelAll2Times_0500 cancelAll=======================>");
        console.info("================>onConsume_cancelAll2Times_0500 end=======================>");
    }

    function onCancel_cancelAll2Times(err, data) {
        console.info("==========================>onCancel_cancelAll2Times_0500=======================>");
        console.info("================>onCancel_cancelAll2Times_0500 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll2Times_0500 err : =======================>" + JSON.stringify(err));
        timesOfOnCancel = timesOfOnCancel + 1
        if (timesOfOnCancel == 1){
            expect(data.request.id).assertequal(5);
        } else if (timesOfOnCancel){
            expect(data.request.id).assertequal(0);
        }
        console.info("================>onCancel_cancelAll2Times_0500 end=======================>");
    }
    function cancelAllCallBack2Times1(err){
        console.info("==========================>cancelAllCallBack2Times1_0500 start=======================>");
        console.info("================>cancelAllCallBack2Times1_0500 err : =======================>" + JSON.stringify(err));
        notify.cancelAll(cancelAllCallBack2Times2);
        console.info("==========================>cancelAllCallBack2Times1_0500 cancelAll=======================>");
        console.info("==========================>cancelAllCallBack2Times1_0500 end=======================>");
    }
    function cancelAllCallBack2Times2(err){
        console.info("==========================>cancelAllCallBack2Times2_0500 start=======================>");
        console.info("================>cancelAllCallBack2Times2_0500 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelAllCallBack2Times2_0500 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0500
     * @tc.name: cancelAll(callback: AsyncCallback<void>): void
     * @tc.desc: Verify that all notifications are cancelled successfully by calling the cancelAll(callback: AsyncCallback<void>): void interface, and then cancel the notification again
     */
    it('ANS_Cancel_0500', 0, async function (done) {
        console.info("===============ANS_Cancel_0500 start==========================>");
        timesOfOnCancel = 0
        var subscriber ={
            onConsumed:onConsume_cancelAll2Times,
            onCanceled:onCancel_cancelAll2Times,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0500_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 5,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0500",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_0500_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0500_promise==================>");
        });
        done();
    })

    function onConsume_cancelAll2Times_promise(err, data) {
        console.info("================>onConsume_cancelAll2Times_promise_0600=======================>");
        console.info("================>onConsume_cancelAll2Times_promise_0600 data: =======================>" + JSON.stringify(data));
        notify.cancelAll().then((err, data) => {
            console.info("==========cancelAll_promise_2times1_0600 start==========>");
            console.info("==========cancelAll_promise_2times1_0600 err : =========>" + JSON.stringify(err));
            console.info("==========cancelAll_promise_2times1_0600 data : =========>" + JSON.stringify(data));
            notify.cancelAll().then((err, data) => {
                console.info("==========cancelAll_promise_2times2_0600 start==========>");
                console.info("==========cancelAll_promise_2times2_0600 err : =========>" + JSON.stringify(err));
                console.info("==========cancelAll_promise_2times2_0600 data : =========>" + JSON.stringify(data));
                console.info("==========cancelAll_promise_2times2_0600 end==========>");
            });
            console.info("==========cancelAll_promise_2times1_0600 end==========>");
        });
        console.info("================>onConsume_cancelAll2Times_promise_0600 cancelAll=======================>");
        console.info("================>onConsume_cancelAll2Times_promise_0600 end=======================>");
    }
    function onCancel_cancelAll2Times_promise(err, data) {
        timesOfOnCancel = timesOfOnCancel + 1
        console.info("==========================>onCancel_cancelAll2Times_promise_0600=======================>");
        console.info("================>onCancel_cancelAll2Times_promise_0600 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll2Times_promise_0600 err : =======================>" + JSON.stringify(err));
        if (timesOfOnCancel == 1){
            expect(data.request.id).assertequal(6);
        } else if (timesOfOnCancel == 2){
            expect(data.request.id).assertequal(0);
        }
        console.info("================>onCancel_cancelAll2Times_promise_0600 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0600
     * @tc.name: cancelAll(): Promise<void>;
     * @tc.desc: Verify that all notifications are cancelled successfully by calling the cancelAll(): Promise<void> interface, and then cancel the notification again
     */
    it('ANS_Cancel_0600', 0, async function (done) {
        console.info("===============ANS_Cancel_0600 start==========================>");
        timesOfOnCancel = 0
        var subscriber ={
            onConsumed:onConsume_cancelAll2Times_promise,
            onCanceled:onCancel_cancelAll2Times_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0600_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 6,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0600",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_0600_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0600_promise==================>");
        });
        done();
    })

    function onConsume_cancelAll_isUnremovable(err, data) {
        console.info("================>onConsume_cancelAll_isUnremovable_0700 start=======================>");
        console.info("================>onConsume_cancelAll_isUnremovable_0700 data: =======================>" + JSON.stringify(data));
        notify.cancelAll(cancelAllCallBack_isUnremovable);
        console.info("================>onConsume_cancelAll_isUnremovable_0700 cancelAll=======================>");
        console.info("================>onConsume_cancelAll_isUnremovable_0700 end=======================>");
    }
    function onCancel_cancelAll_isUnremovable(err, data) {
        console.info("==========================>onCancel_cancelAll_isUnremovable_0700 start=======================>");
        console.info("================>onCancel_cancelAll_isUnremovable_0700 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll_isUnremovable_0700 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(7);
        console.info("================>onCancel_cancelAll_isUnremovable_0700 end=======================>");
    }
    function cancelAllCallBack_isUnremovable(err, data){
        console.info("==========================>cancelAllCallBack_isUnremovable_0700 start=======================>");
        console.info("================>cancelAllCallBack_isUnremovable_0700 data : =======================>" + JSON.stringify(err));
        console.info("================>cancelAllCallBack_isUnremovable_0700 err : =======================>" + JSON.stringify(data));
        console.info("==========================>cancelAllCallBack_isUnremovable_0700 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0700
     * @tc.name: cancelAll(callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that by calling the cancelAll(callback: AsyncCallback<void>): void; interface, the application successfully cancels all the notifications that isUnremovable is true that it has published
     */
    it('ANS_Cancel_0700', 0, async function (done) {
        console.info("===============ANS_Cancel_0700 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancelAll_isUnremovable,
            onCanceled:onCancel_cancelAll_isUnremovable,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0700_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 7,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : true,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0700",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_0700_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0700_promise==================>");
        });
        done();
    })

    function onConsume_cancelAll_isUnremovabl_promise(err, data) {
        console.info("================>onConsume_cancelAll_isUnremovable_0800 start=======================>");
        console.info("================>onConsume_cancelAll_isUnremovable_0800 data: =======================>" + JSON.stringify(data));
        notify.cancelAll().then((err, data) => {
            console.info("==========cancelAll_promise__isUnremovable_0800 start==========>");
            console.info("==========cancelAll_promise__isUnremovable_0800 err : =========>" + JSON.stringify(err));
            console.info("==========cancelAll_promise__isUnremovable_0800 data : =========>" + JSON.stringify(data));
            console.info("==========cancelAll_promise__isUnremovable_0800 end==========>");
        });
        console.info("================>onConsume_cancelAll_isUnremovable_0800 end=======================>");
    }
    function onCancel_cancelAll_isUnremovable_promise(err, data) {
        console.info("==========================>onCancel_cancelAll_isUnremovable_promise_0800 start=======================>");
        console.info("================>onCancel_cancelAll_isUnremovable_promise_0800 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancelAll_isUnremovable_promise_0800 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(8);
        console.info("================>onCancel_cancelAll_isUnremovable_promise_0800 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0800
     * @tc.name: cancelAll(): Promise<void>;
     * @tc.desc: Verify that by calling the cancelAll(): Promise<void> interface, the application successfully cancels all the notifications that isUnremovable is true that it has published
     */
    it('ANS_Cancel_0800', 0, async function (done) {
        console.info("===============ANS_Cancel_0800 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancelAll_isUnremovabl_promise,
            onCanceled:onCancel_cancelAll_isUnremovable_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0800_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 8,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : true,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "0800",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_0800_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0800_promise==================>");
        });
        done();
    })

    function onConsume_cancel(err, data) {
        console.info("================>onConsume_cancel_0900 start=======================>");
        console.info("================>onConsume_cancel_0900 data: =======================>" + JSON.stringify(data));
        notify.cancel(data.request.id,cancelCallBack_cancel);
        console.info("================>onConsume_cancel_0900 cancel=======================>");
        console.info("================>onConsume_cancel_0900 end=======================>");
    }
    function onCancel_cancel(err, data) {
        console.info("==========================>onCancel_cancel_0900 start=======================>");
        console.info("================>onCancel_cancel_0900 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_0900 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(9);
        console.info("================>onCancel_cancel_0900 end=======================>");
    }
    function cancelCallBack_cancel(err){
        console.info("==========================>cancelAllCallBack_cancel_0900 start=======================>");
        console.info("================>cancelAllCallBack_cancel_0900 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelAllCallBack_cancel_0900 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_0900
     * @tc.name: cancel(id: number, callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that the specific ID notification is cancelled successfully by calling the cancel(id: number, callback: AsyncCallback<void>): void; interface
     */
    it('ANS_Cancel_0900', 0, async function (done) {
        console.info("===============ANS_Cancel_0900 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel,
            onCanceled:onCancel_cancel,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_0900_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 9,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_0900_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_0900_promise==================>");
        });
        done();
    })

    function onConsume_cancel_cancel_wrongId(err, data) {
        console.info("================>onConsume_cancel_cancel_wrongId_1000 start=======================>");
        console.info("================>onConsume_cancel_cancel_wrongId_1000 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_cancel_wrongId_1000 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_cancel_wrongId_1000 id: =======================>" + data.request.id);
        notify.cancel(9999,cancelCallBack_cancel_wrongId);
        console.info("================>onConsume_cancel_cancel_wrongId_1000 cancel_id=======================>");
        console.info("================>onConsume_cancel_cancel_wrongId_1000 end=======================>");
    }
    function onCancel_cancel_wrongId(err, data) {
        console.info("==========================>onCancel_cancel_wrongId_1000 start=======================>");
        console.info("================>onCancel_cancel_wrongId_1000 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_wrongId_1000 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(0);
        console.info("================>onCancel_cancel_wrongId_1000 end=======================>");
    }
    function cancelCallBack_cancel_wrongId(err){
        console.info("==========================>cancelCallBack_cancel_wrongId_1000 start=======================>");
        console.info("================>cancelCallBack_cancel_wrongId_1000 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_wrongId_1000 end=======================>");
    }

    /*
     * @tc.number: ANS_Cancel_1000
     * @tc.name: cancel(id: number, callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that when the cancel(id: number, callback: AsyncCallback<void>): void interface is called, when the id is wrong, no notification information is cancelled at this time
     */
    it('ANS_Cancel_1000', 0, async function (done) {
        console.info("===============ANS_Cancel_1000 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_cancel_wrongId,
            onCanceled:onCancel_cancel_wrongId,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1300_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 10,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1000",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1000_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1000_promise==================>");
        });
        done();
    })

    function onConsume_cancel_isUnremovable(err, data) {
        console.info("================>onConsume_cancel_isUnremovable_1100 start=======================>");
        console.info("================>onConsume_cancel_isUnremovable_1100 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_isUnremovable_1100 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_isUnremovable_1100 id: =======================>" + data.request.id);
        notify.cancel(data.request.id,cancelCallBack_cancel_isUnremovable);
        console.info("================>onConsume_cancel_isUnremovable_1100 cancel=======================>");
        console.info("================>onConsume_cancel_isUnremovable_1100 end=======================>");
    }
    function onCancel_cancel_isUnremovable(err, data) {
        console.info("==========================>onCancel_cancel_isUnremovable_1100 start=======================>");
        console.info("================>onCancel_cancel_isUnremovable_1100 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_isUnremovable_1100 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(11);
        console.info("================>onCancel_cancel_isUnremovable_1100 end=======================>");
    }
    function cancelCallBack_cancel_isUnremovable(err){
        console.info("==========================>cancelCallBack_cancel_isUnremovable_1100 start=======================>");
        console.info("================>cancelCallBack_cancel_isUnremovable_1100 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_isUnremovable_1100 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_1100
     * @tc.name: cancel(id: number, callback: AsyncCallback<void>): void;
     * @tc.desc: Verify the success of canceling the notification with the notification attribute isUnremovable being true by calling the cancel(id: number, callback: AsyncCallback<void>): void interface
     */
    it('ANS_Cancel_1100', 0, async function (done) {
        console.info("===============ANS_Cancel_1100 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_isUnremovable,
            onCanceled:onCancel_cancel_isUnremovable,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1100_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 11,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : true,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1100_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1100_promise==================>");
        });
        done();
    })

    var id_1200
    function onConsume_cancel_2Times(err, data) {
        console.info("================>onConsume_cancel_2Times_1200 start=======================>");
        console.info("================>onConsume_cancel_2Times_1200 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_2Times_1200 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_2Times_1200 id: =======================>" + data.request.id);
        id_1200 = data.request.id
        notify.cancel(id_1200, cancelCallBack_cancel_2Times1);
        console.info("================>onConsume_cancel_2Times_1200 cancel_2Times1=======================>");
        console.info("================>onConsume_cancel_2Times_1200 end=======================>");
    }
    function onCancel_cancel_2Times(err, data) {
        timesOfOnCancel = timesOfOnCancel + 1
        console.info("==========================>onCancel_cancel_2Times_1200 start=======================>");
        console.info("================>onCancel_cancel_2Times_1200 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_2Times_1200 err : =======================>" + JSON.stringify(err));
        if (timesOfOnCancel == 1){
            expect(data.request.id).assertequal(12);
        }else if(timesOfOnCancel == 2) {
            expect(data.request.id).assertequal(0);
        }
        console.info("================>onCancel_cancel_2Times_1200 end=======================>");
    }
    function cancelCallBack_cancel_2Times1(err){
        console.info("==========================>cancelCallBack_cancel_2Times1_1200 start=======================>");
        console.info("================>cancelCallBack_cancel_2Times1_1200 err : =======================>" + JSON.stringify(err));
        notify.cancelCallBack_cancel(id_1200,cancelCallBack_cancel_2Times2);
        console.info("================>cancelCallBack_cancel_2Times1_1200 cancel=======================>");
        console.info("==========================>cancelCallBack_cancel_2Times1_1200 end=======================>");
    }

    function cancelCallBack_cancel_2Times2(err){
        console.info("==========================>cancelCallBack_cancel_2Times2_1200 start=======================>");
        console.info("================>cancelCallBack_cancel_2Times2_1200 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_2Times2_1200 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_1200
     * @tc.name: cancel(id: number, callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that the cancel(id: number, callback: AsyncCallback<void>): void interface is called twice in a row to cancel the notification
     */
    it('ANS_Cancel_1200', 0, async function (done) {
        console.info("===============ANS_Cancel_1200 start==========================>");
        timesOfOnCancel = 0
        var subscriber ={
            onConsumed:onConsume_cancel_2Times,
            onCanceled:onCancel_cancel_2Times,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1200_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 12,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1200_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1200_promise==================>");
        });
        done();
    })

    function onConsume_cancel_label(err, data) {
        console.info("================>onConsume_cancel_label_1300 start=======================>");
        console.info("================>onConsume_cancel_label_1300 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_1300 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_label_1300 id: =======================>" + data.request.id);
        notify.cancel(data.request.id, data.request.label, cancelCallBack_cancel_label);
        console.info("================>onConsume_cancel_label_1300 cancel_label=======================>");
        console.info("================>onConsume_cancel_label_1300 end=======================>");
    }
    function onCancel_cancel_label(err, data) {
        console.info("==========================>onCancel_cancel_label_1300 start=======================>");
        console.info("================>onCancel_cancel_label_1300 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_label_1300 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(13);
        expect(data.request.label).assertequal("1300");
        console.info("================>onCancel_cancel_label_1300 end=======================>");
    }
    function cancelCallBack_cancel_label(err){
        console.info("==========================>cancelCallBack_cancel_label_1300 start=======================>");
        console.info("================>cancelCallBack_cancel_label_1300 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_label_1300 end=======================>");
    }

    /*
     * @tc.number: ANS_Cancel_1300
     * @tc.name: cancel(id: number, label: string, callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that the cancel notification is successful by calling the cancel(id: number, label: string, callback: AsyncCallback<void>): void; interface
     */
    var subscriber
    it('ANS_Cancel_1300', 0, async function (done) {
        console.info("===============ANS_Cancel_1300 start==========================>");
        subscriber ={
            onConsumed:onConsume_cancel_label,
            onCanceled:onCancel_cancel_label,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("================>subscribe_1300_promise =======================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 13,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1300",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("================>publish_1300_promise =======================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("================>unsubscribe_1300_promise =======================>");
        });
        done();
    })

    function onConsume_cancel_label_promise(err, data) {
        console.info("================>onConsume_cancel_label_promise start=======================>");
        console.info("================>onConsume_cancel_label_promise data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_promise label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_label_promise id: =======================>" + data.request.id);
        notify.cancel(data.request.id, data.request.label).then((err, data) => {
            console.info("==========cancel_labe_lpromise_1400 start==========>");
            console.info("==========cancel_labe_lpromise_1400 err : =========>" + JSON.stringify(err));
            console.info("==========cancel_labe_lpromise_1400 data : =========>" + JSON.stringify(data));
            expect(data.request.id).assertequal(14);
            expect(data.request.label).assertequal("1400");
            console.info("==========cancel_labe_lpromise_1400 end==========>");
        });
        console.info("================>onConsume_cancel_label_promise end=======================>");
    }
    function onCancel_cancel_label_promise(err, data) {
        console.info("==========================>onCancel_cancel_label_promise_1400 start=======================>");
        console.info("================>onCancel_cancel_label_promise_1400 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_label_promise_1400 err : =======================>" + JSON.stringify(err));
        console.info("================>onCancel_cancel_label_promise_1400 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_1400
     * @tc.name: cancel(id: number, label?: string): Promise<void>
     * @tc.desc: Verify that the cancel notification is successful by calling the  cancel(id: number, label?: string): Promise<void> interface
     */
    it('ANS_Cancel_1400', 0, async function (done) {
        console.info("===============ANS_Cancel_1400 start==========================>");
        subscriber ={
            onConsumed:onConsume_cancel_label_promise,
            onCanceled:onCancel_cancel_label_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("================>subscribe_1400_promise =======================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 14,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1400",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1400_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1400_promise==================>");
        });
        done();
    })

    function onConsume_cancel_label_isUnremoveable(err, data) {
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 start=======================>");
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 id: =======================>" + data.request.id);
        notify.cancel(data.request.id, data.request.label, cancelCallBack_cancel_label_isUnremoveable);
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 cancel_label=======================>");
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 end=======================>");
    }
    function onCancel_cancel_label_isUnremoveable(err, data) {
        console.info("==========================>onConsume_cancel_label_isUnremoveable_1500 start=======================>");
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 data : =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(15);
        expect(data.request.label).assertequal("1500");
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 end=======================>");
    }
    function cancelCallBack_cancel_label_isUnremoveable(err){
        console.info("==========================>onConsume_cancel_label_isUnremoveable_1500 start=======================>");
        console.info("================>onConsume_cancel_label_isUnremoveable_1500 err : =======================>" + JSON.stringify(err));
        console.info("==========================>onConsume_cancel_label_isUnremoveable_1500 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_1500
     * @tc.name: cancel(id: number, label: string, callback: AsyncCallback<void>): void
     * @tc.desc: Verify that the notification whose notification property isUnremovable is true is canceled successfully by calling the cancel(id: number, label: string, callback: AsyncCallback<void>): void interface
     */
    it('ANS_Cancel_1500', 0, async function (done) {
        console.info("===============ANS_Cancel_1500 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_label_isUnremoveable,
            onCanceled:onCancel_cancel_label_isUnremoveable,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1500_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 15,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : true,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1500",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1500_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1500_promise==================>");
        });
        done();
    })

    function onConsume_cancel_label_isUnremoveable_promise(err, data) {
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 start=======================>");
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 id: =======================>" + data.request.id);
        notify.cancel(data.request.id, data.request.label).then((err, data) => {
            console.info("==========cancel_label_isUnremoveable_promise_1600 start==========>");
            console.info("==========cancel_label_isUnremoveable_promise_1600 err : =========>" + JSON.stringify(err));
            console.info("==========cancel_label_isUnremoveable_promise_1600 data : =========>" + JSON.stringify(data));
            expect(data.request.id).assertequal(16);
            expect(data.request.label).assertequal("1600");
            console.info("==========cancel_label_isUnremoveable_promise_1600 end==========>");
        });
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 end=======================>");
    }
    function onCancel_cancel_label_isUnremoveable_promise(err, data) {
        console.info("==========================>onConsume_cancel_label_isUnremoveable_1600 start=======================>");
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 data : =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 err : =======================>" + JSON.stringify(err));
        console.info("================>onConsume_cancel_label_isUnremoveable_1600 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_1600
     * @tc.name: cancel(id: number, label?: string): Promise<void>
     * @tc.desc: Verify that the notification whose notification property isUnremovable is true is canceled successfully by calling the cancel(id: number, label?: string): Promise<void> interface
     */
    it('ANS_Cancel_1600', 0, async function (done) {
        console.info("===============ANS_Cancel_1600 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_label_isUnremoveable_promise,
            onCanceled:onCancel_cancel_label_isUnremoveable_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1600_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 16,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : true,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1600",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1600_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1600_promise==================>");
        });
        done();
    })
    function onConsume_cancel_wrongLabel(err, data) {
        console.info("================>onConsume_cancel_wrongLabel_1700 start=======================>");
        console.info("================>onConsume_cancel_wrongLabel_1700 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_wrongLabel_1700 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_wrongLabel_1700 id: =======================>" + data.request.id);
        notify.cancel(data.request.id, "9999", cancelCallBack_cancel_wrongLabel);
        console.info("================>onConsume_cancel_wrongLabel_1700 cancel_label=======================>");
        console.info("================>onConsume_cancel_wrongLabel_1700 end=======================>");
    }
    function onCancel_cancel_wrongLabel(err, data) {
        console.info("==========================>onCancel_cancel_wrongLabel_1700 start=======================>");
        console.info("================>onCancel_cancel_wrongLabel_1700 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_wrongLabel_1700 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(0);
        expect(data.request.label).assertequal("0");
        console.info("================>onCancel_cancel_wrongLabel_1700 end=======================>");
    }
    function cancelCallBack_cancel_wrongLabel(err){
        console.info("==========================>cancelCallBack_cancel_wrongLabel_1700 start=======================>");
        console.info("================>cancelCallBack_cancel_wrongLabel_1700 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_wrongLabel_1700 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_1700
     * @tc.name: cancel(id: number, label: string, callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that the cancel(id: number, label: string, callback: AsyncCallback<void>): void interface is called, the label is wrong and the ID is correct.
     */
    it('ANS_Cancel_1700', 0, async function (done) {
        console.info("===============ANS_Cancel_1700 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_wrongLabel,
            onCanceled:onCancel_cancel_wrongLabel,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1700_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 17,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1700",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1700_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1700_promise==================>");
        });
        done();
    })

    function onConsume_cancel_wrongLabel_promise(err, data) {
        console.info("================>onConsume_cancel_wrongLabel_1800 start=======================>");
        console.info("================>onConsume_cancel_wrongLabel_1800 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_wrongLabel_1800 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_wrongLabel_1800 id: =======================>" + data.request.id);
        notify.cancel(data.request.id, "9999").then((err, data) => {
            console.info("==========cancel_wrongLabel_1800 start==========>");
            console.info("==========cancel_wrongLabel_1800 err : =========>" + JSON.stringify(err));
            console.info("==========cancel_wrongLabel_1800 data : =========>" + JSON.stringify(data));
            console.info("==========cancel_wrongLabel_1800 end==========>");
        });
        console.info("================>onConsume_cancel_wrongLabel_1800 end=======================>");
    }
    function onCancel_cancel_wrongLabel_promise(err, data) {
        console.info("==========================>onCancel_cancel_wrongLabel_1800 start=======================>");
        console.info("================>onCancel_cancel_wrongLabel_1800 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_wrongLabel_1800 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(0);
        expect(data.request.label).assertequal("0");
        console.info("================>onCancel_cancel_wrongLabel_1800 end=======================>");
    }

    /*
     * @tc.number: ANS_Cancel_1800
     * @tc.name: cancel(id: number, label?: string): Promise<void>
     * @tc.desc: Verify that the cancel(id: number, label?: string): Promise<void> interface is called, the label is wrong and the ID is correct.
     */
    it('ANS_Cancel_1800', 0, async function (done) {
        console.info("===============ANS_Cancel_1800 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_wrongLabel_promise,
            onCanceled:onCancel_cancel_wrongLabel_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1800_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 18,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1800",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1800_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1800_promise==================>");
        });
        done();
    })

    function onConsume_cancel_label_nullCharacter(err, data) {
        console.info("================>onConsume_cancel_label_nullCharacter_1900 start=======================>");
        console.info("================>onConsume_cancel_label_nullCharacter_1900 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_nullCharacter_1900 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_label_nullCharacter_1900 id: =======================>" + data.request.id);
        notify.cancel(data.request.id, "", cancelCallBack_cancel_nullCharacter);
        console.info("================>onConsume_cancel_nullCharacte_1900 cancel_label=======================>");
        console.info("================>onConsume_cancel_nullCharacte_1900 end=======================>");
    }
    function onCancel_cancel_label_nullCharacter(err, data) {
        console.info("==========================>onCancel_cancel_label_nullCharacter_1900 start=======================>");
        console.info("================>onCancel_cancel_nullCharacter_1900 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_nullCharacter_1900 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(0);
        expect(data.request.label).assertequal("0");
        console.info("================>onCancel_cancel_nullCharacter_1900 end=======================>");
    }
    function cancelCallBack_cancel_nullCharacter(err){
        console.info("==========================>cancelCallBack_cancel_nullCharacter_1900 start=======================>");
        console.info("================>cancelCallBack_cancel_nullCharacter_1900 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_nullCharacter_1900 end=======================>");
    }

    /*
     * @tc.number: ANS_Cancel_1900
     * @tc.name: cancel(id: number, label: string, callback: AsyncCallback<void>): void;
     * @tc.desc: Verify that the cancel(id: number, label: string, callback: AsyncCallback<void>): void interface is called, and the label uses empty characters
     */
    it('ANS_Cancel_1900', 0, async function (done) {
        console.info("===============ANS_Cancel_1900 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_label_nullCharacter,
            onCanceled:onCancel_cancel_label_nullCharacter,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_1900_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 19,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "1900",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_1900_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_1900_promise==================>");
        });
        done();
    })

    function onConsume_cancel_nullCharacter(err, data) {
        console.info("================>onConsume_cancel_nullCharacte_2000 start=======================>");
        console.info("================>onConsume_cancel_nullCharacte_2000 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_nullCharacte_2000 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_nullCharacte_2000 id: =======================>" + data.request.id);
        notify.cancel(data.request.id, "").then((err, data) => {
            console.info("==========cancel_nullCharacte_2000 start==========>");
            console.info("==========cancel_nullCharacte_2000 err : =========>" + JSON.stringify(err));
            console.info("==========cancel_nullCharacte_2000 data : =========>" + JSON.stringify(data));
            console.info("==========cancel_nullCharacte_2000 end==========>");
        });
        console.info("================>onConsume_cancel_nullCharacte_2000 end=======================>");
    }
    function onCancel_cancel_nullCharacter(err, data) {
        console.info("==========================>onCancel_cancel_nullCharacter_2000 start=======================>");
        console.info("================>onCancel_cancel_nullCharacter_2000 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_nullCharacter_2000 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(0);
        expect(data.request.label).assertequal("0");
        console.info("================>onCancel_cancel_nullCharacter_2000 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_2000
     * @tc.name: cancel(id: number, label?: string): Promise<void>;
     * @tc.desc: Verify that the cancel(id: number, label?: string): Promise<void> interface is called, and the label uses empty characters
     */
    it('ANS_Cancel_2000', 0, async function (done) {
        console.info("===============ANS_Cancel_2000 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_nullCharacter,
            onCanceled:onCancel_cancel_nullCharacter,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_2000_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 20,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "2000",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_2000_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_2000_promise==================>");
        });
        done();
    })

    var id_2100
    var label_2100
    function onConsume_cancel_label_2Times(err, data) {
        console.info("================>onConsume_cancel_label_2Times_2100 start=======================>");
        console.info("================>onConsume_cancel_label_2Times_2100 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_2Times_2100 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_label_2Times_2100 id: =======================>" + data.request.id);
        id_2100 = data.request.id
        label_2100 = data.request.label
        notify.cancel(id_2100, label_2100, cancelCallBack_cancel_label_2Times1);
        console.info("================>onConsume_cancel_label_2Times_2100 cancel_label=======================>");
        console.info("================>onConsume_cancel_label_2Times_2100 end=======================>");
    }
    function onCancel_cancel_label_2Times(err, data) {
        timesOfOnCancel = timesOfOnCancel + 1
        console.info("==========================>onCancel_cancel_label_2Times_2100 start=======================>");
        console.info("================>onCancel_cancel_label_2Times_2100 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_label_2Times_2100 err : =======================>" + JSON.stringify(err));
        if (timesOfOnCancel == 1){
            expect(data.request.id).assertequal(21);
            expect(data.request.label).assertequal("2100");
        }else if(timesOfOnCancel == 2){
            expect().assertFail();
        }
        console.info("================>onCancel_cancel_label_2Times_2100 end=======================>");
    }
    function cancelCallBack_cancel_label_2Times1(err){
        console.info("==========================>cancelCallBack_cancel_label_2Times1_2100 start=======================>");
        console.info("================>cancelCallBack_cancel_label_2Times1_2100 err : =======================>" + JSON.stringify(err));
        notify.cancel(id_2100, label_2100, cancelCallBack_cancel_label_2Times2);
        console.info("================>cancelCallBack_cancel_label_2Times1_2100 cancel_label_2Times1=======================>");
        console.info("==========================>cancelCallBack_cancel_label_2Times1_2100 end=======================>");
    }
    function cancelCallBack_cancel_label_2Times2(err){
        console.info("==========================>cancelCallBack_cancel_label_2Times2_2100 start=======================>");
        console.info("================>cancelCallBack_cancel_label_2Times2_2100 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_label_2Times2_2100 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_2100
     * @tc.name: cancel(id: number, label: string, callback: AsyncCallback<void>): void
     * @tc.desc: Verify that the cancel(id: number, label: string, callback: AsyncCallback<void>): void interface is called twice in a row
     */
    it('ANS_Cancel_2100', 0, async function (done) {
        console.info("===============ANS_Cancel_2100 start==========================>");
        timesOfOnCancel = 0
        var subscriber ={
            onConsumed:onConsume_cancel_label_2Times,
            onCanceled:onCancel_cancel_label_2Times,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_2100_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 21,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "2100",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_2100_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_2100_promise==================>");
        });
        done();
    })

    var id_2200
    var label_2200
    function onConsume_cancel_label_promise_2Times(err, data) {
        console.info("================>onConsume_cancel_label_2Times_poromise_2200 start=======================>");
        console.info("================>onConsume_cancel_label_2Times_poromise_2200 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_label_2Times_poromise_2200 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_label_2Times_poromise_2200 id: =======================>" + data.request.id);
        id_2200 = data.request.id
        label_2200 = data.request.label
        notify.cancel(id_2200, label_2200).then(() => {
            console.info("==========cancel_label_2Times1_promise_2200 start==========>");
            notify.cancel(id_2200, label_2200).then(() => {
                console.info("==========cancel_label_2Times2_promise_2200 start==========>");
                console.info("==========cancel_label_2Times2_promise_2200 end==========>");
            });
            console.info("==========cancel_label_2Times1_promise_2200 end==========>");
        });
        console.info("================>onConsume_cancel_label_2Times_poromise_2200 end=======================>");
    }
    function onCancel_cancel_label_promise_2Times(err, data) {
        console.info("==========================>onCancel_cancel_label_2Times_2200 start=======================>");
        timesOfOnCancel = timesOfOnCancel + 1
        console.info("================>onCancel_cancel_label_2Times_2200 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_label_2Times_2200 err : =======================>" + JSON.stringify(err));
        if (timesOfOnCancel == 1){
            expect(data.request.id).assertequal(22);
            expect(data.request.label).assertequal("2200");
        }else if (timesOfOnCancel == 2){
            expect().assertFail();
        }
        console.info("================>onCancel_cancel_label_2Times_2200 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_2200
     * @tc.name: cancel(id: number, label?: string): Promise<void>
     * @tc.desc: Verify that the cancel(id: number, label?: string): Promise<void> interface is called twice in a row
     */
    it('ANS_Cancel_2200', 0, async function (done) {
        console.info("===============ANS_Cancel_2200 start==========================>");
        timesOfOnCancel = 0
        var subscriber ={
            onConsumed:onConsume_cancel_label_promise_2Times,
            onCanceled:onCancel_cancel_label_promise_2Times,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_2200_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 22,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "2200",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_2200_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_2200_promise==================>");
        });
        done();
    })

    function onConsume_cancel_rightLabel_wrongId(err, data) {
        console.info("================>onConsume_cancel_rightLabel_wrongId_2300 start=======================>");
        console.info("================>onConsume_cancel_rightLabel_wrongId_2300 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_rightLabel_wrongId_2300 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_rightLabel_wrongId_2300 id: =======================>" + data.request.id);
        notify.cancel(11111, data.request.label, cancelCallBack_cancel_rightLabel_wrongId);
        console.info("================>onConsume_cancel_rightLabel_wrongId_2300 cancel_rightLabel_wrongId=======================>");
        console.info("================>onConsume_cancel_rightLabel_wrongId_2300 end=======================>");
    }
    function onCancel_cancel_rightLabel_wrongId(err, data) {
        console.info("==========================>onCancel_cancel_rightLabel_wrongId_2300 start=======================>");
        console.info("================>onCancel_cancel_rightLabel_wrongId_2300 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_rightLabel_wrongId_2300 err : =======================>" + JSON.stringify(err));
        expect().assertFail();
        console.info("================>onCancel_cancel_rightLabel_wrongId_2300 end=======================>");
    }
    function cancelCallBack_cancel_rightLabel_wrongId(err){
        console.info("==========================>cancelCallBack_cancel_rightLabel_wrongId_2300 start=======================>");
        console.info("================>cancelCallBack_cancel_rightLabel_wrongId_2300 err : =======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_rightLabel_wrongId_2300 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_2300
     * @tc.name: cancel(id: number, label: string, callback: AsyncCallback<void>): void
     * @tc.desc: Verify that the cancel(id: number, label: string, callback: AsyncCallback<void>): void interface is called, the label is correct and the ID is correct wrong.
     */
    it('ANS_Cancel_2300', 0, async function (done) {
        console.info("===============ANS_Cancel_2300 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_rightLabel_wrongId,
            onCanceled:onCancel_cancel_rightLabel_wrongId,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_2300_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 23,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "2300",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_2300_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_2300_promise==================>");
        });
        done();
    })

    function onConsume_cancel_rightLabel_wrongId_promise(err, data) {
        console.info("================>onConsume_cancel_rightLabel_wrongId_promise_2400 start=======================>");
        console.info("================>onConsume_cancel_rightLabel_wrongId_promise_2400 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_rightLabel_wrongId_promise_2400 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_rightLabel_wrongId_promise_2400 id: =======================>" + data.request.id);
        notify.cancel(11111, data.request.label).then((err, data) => {
            console.info("==========cancel_rightLabel_wrongId_promise_2400 start==========>");
            console.info("==========cancel_rightLabel_wrongId_promise_2400 end==========>");
        });
        console.info("================>onConsume_cancel_rightLabel_wrongId_promise_2400 cancel_rightLabel_wrongId=======================>");
        console.info("================>onConsume_cancel_rightLabel_wrongId_promise_2400 end=======================>");
    }
    function onCancel_cancel_rightLabel_wrongId_promise(err, data) {
        console.info("================>onCancel_cancel_rightLabel_wrongId_2400 start : =======================>");
        console.info("================>onCancel_cancel_rightLabel_wrongId_2400 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_rightLabel_wrongId_2400 err : =======================>" + JSON.stringify(err));
        expect(data.request.id).assertequal(0);
        expect(data.request.label).assertequal("0");
        console.info("================>onCancel_cancel_rightLabel_wrongId_2400 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_2400
     * @tc.name: cancel(id: number, label?: string): Promise<void>
     * @tc.desc: Verify that the cancel(id: number, label: string, callback: AsyncCallback<void>): void interface is called, the label is correct and the ID is correct wrong.
     */
    it('ANS_Cancel_2400', 0, async function (done) {
        console.info("===============ANS_Cancel_2400 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_rightLabel_wrongId_promise,
            onCanceled:onCancel_cancel_rightLabel_wrongId_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_2400_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 24,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "2400",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_2400_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_2400_promise==================>");
        });
        done();
    })

    function onConsume_cancel_wrongLabel_wrongId(err, data) {
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2500 start=======================>");
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2500 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2500 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2500 id: =======================>" + data.request.id);
        notify.cancel(6666, "6666", cancelCallBack_cancel_wrongLabel_wrongId);
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2500 cancel_wrongLabel_wrongId=======================>");
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2500 end=======================>");
    }
    function onCancel_cancel_wrongLabel_wrongId(err, data) {
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2500 start=======================>");
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2500 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2500 err : =======================>" + JSON.stringify(err));
        expect().assertFail();
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2500 end=======================>");
    }
    function cancelCallBack_cancel_wrongLabel_wrongId(err){
        console.info("==========================>cancelCallBack_cancel_wrongLabel_wrongId_2500 start=======================>");
        console.info("==========================>cancelCallBack_cancel_wrongLabel_wrongId_2500 err :=======================>" + JSON.stringify(err));
        console.info("==========================>cancelCallBack_cancel_wrongLabel_wrongId_2500 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_2500
     * @tc.name: cancel(id: number, label: string, callback: AsyncCallback<void>): void
     * @tc.desc: Verify that the cancel(id: number, label: string, callback: AsyncCallback<void>): void interface is called, the label is correct and the ID is correct wrong.
     */
    it('ANS_Cancel_2500', 0, async function (done) {
        console.info("===============ANS_Cancel_2500 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_wrongLabel_wrongId,
            onCanceled:onCancel_cancel_wrongLabel_wrongId,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_2500_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 25,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "2500",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_2500_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_2500_promise==================>");
        });
        done();
    })

    function onConsume_cancel_wrongLabel_wrongId_promise(err, data) {
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2600 start=======================>");
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2600 data: =======================>" + JSON.stringify(data));
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2600 label: =======================>" + data.request.label);
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2600 id: =======================>" + data.request.id);
        notify.cancel(6666, "6666").then((err, data) => {
            console.info("==========cancel_wrongLabel_wrongId_2600 start==========>");
            console.info("==========cancel_wrongLabel_wrongId_2600 end==========>");
        });
        console.info("================>onConsume_cancel_wrongLabel_wrongId_2600 end=======================>");
    }
    function onCancel_cancel_wrongLabel_wrongId_promise(err, data) {
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2600 start=======================>");
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2600 data : =======================>" + JSON.stringify(data));
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2600 err : =======================>" + JSON.stringify(err));
        expect().assertFail();
        console.info("================>onCancel_cancel_wrongLabel_wrongId_2600 end=======================>");
    }
    /*
     * @tc.number: ANS_Cancel_2600
     * @tc.name: cancel(id: number, label?: string): Promise<void>
     * @tc.desc: Verify that the cancel(id: number, label?: string): Promise<void> interface is called, the label is wrong and the ID is wrong.
     */
    it('ANS_Cancel_2600', 0, async function (done) {
        console.info("===============ANS_Cancel_2600 start==========================>");
        var subscriber ={
            onConsumed:onConsume_cancel_wrongLabel_wrongId_promise,
            onCanceled:onCancel_cancel_wrongLabel_wrongId_promise,
        }
        await notify.subscribe(subscriber).then(() => {
            console.info("==================subscribe_2600_promise==================>");
        });
        var notificationRequest = {
            content:{
                contentType: notify.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            id: 26,
            slotType : notify.SlotType.OTHER_TYPES,
            isOngoing : true,
            isUnremovable : false,
            deliveryTime : 1624950453,
            tapDismissed : true,
            autoDeletedTime: 1625036817,
            color: 2,
            colorEnabled: true,
            isAlertOnce: true,
            isStopwatch: true,
            isCountDown: true,
            progressValue: 12,
            progressMaxValue: 100,
            isIndeterminate: true,
            statusBarText: "statusBarText",
            isFloatingIcon : true,
            label: "2600",
            badgeIconStyle: 1,
            showDeliveryTime: true,
        }
        await notify.publish(notificationRequest).then(() => {
            console.info("==================publish_2600_promise==================>");
        });
        await notify.unsubscribe(subscriber).then(() => {
            console.info("==================>unsubscribe_2600_promise==================>");
        });
        done();
    })
}) 