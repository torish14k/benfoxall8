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
import notification from '@ohos.notification'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'
var comsumData
describe('ActsAnsNotificationTest', function () {
    function publishMULTILINEContentCallback001(error){
        console.log('ActsNotificationTest ACTS_PublishMULTILINEContent_0100 asyncCallback'+JSON.stringify(error.code))
    }
    function publishMULTILINEContentCallback002(error){
        console.log('ActsNotificationTest ACTS_PublishMULTILINEContent_0200 asyncCallback'+JSON.stringify(error.code))
    }
    function publishMULTILINEContentCallback003(error){
        console.log('ActsNotificationTest ACTS_PublishMULTILINEContent_0300 asyncCallback'+JSON.stringify(error.code))
    }
    function publishLONGContentCallback001(error){
        console.log('ActsNotificationTest ACTS_PublishLONGContent_0100 asyncCallback'+JSON.stringify(error.code))
    }
    function publishLONGContentCallback002(error){
        console.log('ActsNotificationTest ACTS_PublishLONGContent_0200 asyncCallback'+JSON.stringify(error.code))
    }
    function publishLONGContentCallback003(error){
        console.log('ActsNotificationTest ACTS_PublishLONGContent_0300 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotTypeContentCallback001(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeContent_0100 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotTypeContentCallback002(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeContent_0200 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotTypeContentCallback003(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeContent_0300 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotTypeContentCallback004(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeContent_0400 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotOtherCallback001(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeOther_0100 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotOtherCallback002(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeOther_0200 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotOtherCallback003(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeOther_0300 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotOtherCallback004(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeOther_0400 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotServiceCallback001(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0100 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotServiceCallback002(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0200 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotServiceCallback003(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0300 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotServiceCallback004(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0400 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotSocialCallback001(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0400 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotSocialCallback002(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0400 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotSocialCallback003(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0400 asyncCallback'+JSON.stringify(error.code))
    }
    function publishSlotSocialCallback004(error){
        console.log('ActsNotificationTest ACTS_Publish_SlotTypeService_0400 asyncCallback'+JSON.stringify(error.code))
    }
    //consume
    function consumeCallback(err,data) {
        console.debug("==========================>consumeDoNotCallback1 data : =======================>" + err + JSON.stringify(data));
        comsumData = data
    }
    //subscribeOn
    function subscribeOnCallback(err) {
        console.debug("==========================>subscribeDoNotOnCallback=======================>");
    }
    //subscribe
    function subscribeCallback(err) {
        console.debug("==========================>subscribeDoNotCallback=======================>");
    }
    /*
     * @tc.number: ActsDoNotSubscriber_test_0100
     * @tc.name: subscribe()
     * @tc.desc: verify the function of subscribe
     */
    it('ActsSubscriber_test_0100', 0, async function (done) {
        console.debug("===============ActsDoNotSubscriber_test_0100======begin====================>");

        var subInfo ={
            onConsume:consumeCallback,
            onConnecte:subscribeOnCallback,
        }
        try {
            await notification.subscribe(subInfo, subscribeCallback);
        }
        catch(err) {
            console.error('ActsSubscriber_test_0100  订阅 subscribeDoNotCallback err:'+err);
        }
        console.debug("===============ActsSubscriber_test_0100=======end3===================>");
        done();
    })

    /*
     * @tc.number: ACTS_PublishMULTILINEContent_0100
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_MULTILINE)
     */
    it('ACTS_PublishMULTILINEContent_0100', 0,async function (done) {
       try {
           await notification.publish({
               Id: 1,
               content: {
                   contentType: notification.ContentType.NOTIFICATION_CONTENT_MULTILINE,
                   multiLine: {
                       title: "test_title",
                       text: "test_text",
                       additionalText: "test_additionalText",
                       briefText: "briefText",
                       longTitle: "longTitle",
                       lines: ["123", "234", "345", "456"]
                   },
               }
           }, publishMULTILINEContentCallback001);
       }catch(error){
        console.log('ActsNotificationTest ACTS_PublishMULTILINEContent_0100 asyncCallback'+JSON.stringify(error.code))}
        console.log("============ACTS_PublishMULTILINEContent_0100 finished============")
       expect(comsumData.id).assertEqual(1)
        done();
    })

    /*
     * @tc.number: ACTS_PublishMULTILINEContent_0200
     * @tc.name: publish()
     * @tc.desc: verify the function of publish()
     */
    it('ACTS_PublishMULTILINEContent_0200', 0,async function (done) {
       try {
           var notificationInfo = {
               Id: 2,
               content: {
               //                contentType: notification.ContentType.NOTIFICATION_CONTENT_MULTILINE,
                   multiLine: {
                       title: "test_title",
                       text: "test_text",
                       additionalText: "test_additionalText",
                       briefText: "briefText",
                       longTitle: "longTitle",
                       lines: ["123", "234", "345", "456"]
                   },
               }
           }
     }catch(err){
          console.log('ActsNotificationTest ACTS_PublishMULTILINEContent11111111'+err)
        }
      try{
           console.log('ActsNotificationTest ACTS_PublishMULTILINEContent222222222222')
           await notification.publish(notificationInfo,publishMULTILINEContentCallback002);
       }catch(error){
           console.log('ActsNotificationTest ACTS_PublishMULTILINEContent_0200 asyncCallback'+error)
       }
        console.log("============ACTS_PublishMULTILINEContent_0200 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishMULTILINEContent_0300
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_PICTURE)
     */
    it('ACTS_PublishMULTILINEContent_0300', 0,async function (done) {
       try {
           await notification.publish({
               Id: 3,
               content: {
                   contentType: notification.ContentType.NOTIFICATION_CONTENT_PICTURE,
                   multiLine: {
                       title: "test_title",
                       text: "test_text",
                       additionalText: "test_additionalText",
                       briefText: "briefText",
                       longTitle: "longTitle",
                       lines: ["123", "234", "345", "456"]
                   },
               }
           }, publishMULTILINEContentCallback003);
       }catch(error){
           console.log('ActsNotificationTest ACTS_PublishMULTILINEContent_0300 asyncCallback'+JSON.stringify(error.code))
       }
        console.log("============ACTS_PublishMULTILINEContent_0300 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishMULTILINEContent_0400
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_MULTILINE) promise
     */
    it('ACTS_PublishMULTILINEContent_0400', 0,async function (done) {
        await notification.publish({
            Id: 4,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_MULTILINE,
                multiLine: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    briefText:"briefText",
                    longTitle:"longTitle",
                    lines:["123","234","345","456"]
                },
            }
        }).then(console.log("============ACTS_PublishMULTILINEContent_0400 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishMULTILINEContent_0500
     * @tc.name: publish()
     * @tc.desc: verify the function of publish() promise
     */
    it('ACTS_PublishMULTILINEContent_0500', 0,async function (done) {
        await notification.publish({
            Id: 5,
            content: {
            //                contentType: notification.ContentType.NOTIFICATION_CONTENT_MULTILINE,
                multiLine: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    briefText:"briefText",
                    longTitle:"longTitle",
                    lines:["123","234","345","456"]
                },
            }
        }).then(console.log("============ACTS_PublishMULTILINEContent_0500 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishMULTILINEContent_0600
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_PICTURE) promise
     */
    it('ACTS_PublishMULTILINEContent_0600', 0,async function (done) {
        await notification.publish({
            Id: 6,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_PICTURE,
                multiLine: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    briefText:"briefText",
                    longTitle:"longTitle",
                    lines:["123","234","345","456"]
                },
            }
        }).then(console.log("============ACTS_PublishMULTILINEContent_0300 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishLONGContent_0100
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_LONG_TEXT)
     */
    it('ACTS_PublishLONGContent_0100', 0,async function (done) {
        await notification.publish({
            Id: 7,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
                longText: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    longText:"longText",
                    briefText:"briefText",
                    expandedTitle:"expandedTitle"
                }}
        },publishLONGContentCallback001);
        console.log("============ACTS_PublishLONGContent_0100 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishLONGContent_0200
     * @tc.name: publish()
     * @tc.desc: verify the function of publish()
     */
    it('ACTS_PublishLONGContent_0200', 0,async function (done) {
        await notification.publish({
            Id: 8,
            content: {
//                contentType: notification.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
                longText: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    longText:"longText",
                    briefText:"briefText",
                    expandedTitle:"expandedTitle"
                }}
        },publishLONGContentCallback002);
        console.log("============ACTS_PublishLONGContent_0200 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishLONGContent_0300
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_MEDIA)
     */
    it('ACTS_PublishLONGContent_0300', 0,async function (done) {
        await notification.publish({
            Id: 9,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_MEDIA,
                longText: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    longText:"longText",
                    briefText:"briefText",
                    expandedTitle:"expandedTitle"
                }}
        },publishLONGContentCallback003);
        console.log("============ACTS_PublishLONGContent_0300 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishLONGContent_0400
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_LONG_TEXT) promise
     */
    it('ACTS_PublishLONGContent_0400', 0,async function (done) {
        await notification.publish({
            Id: 10,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
                longText: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    longText:"longText",
                    briefText:"briefText",
                    expandedTitle:"expandedTitle"
                }}
        }).then(console.log("============ACTS_PublishLONGContent_0400 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishLONGContent_0500
     * @tc.name: publish()
     * @tc.desc: verify the function of publish() promise
     */
    it('ACTS_PublishLONGContent_0500', 0,async function (done) {
        await notification.publish({
            Id: 11,
            content: {
            //                contentType: notification.ContentType.NOTIFICATION_CONTENT_LONG_TEXT,
                longText: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    longText:"longText",
                    briefText:"briefText",
                    expandedTitle:"expandedTitle"
                }}
        }).then(console.log("============ACTS_PublishLONGContent_0500 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishLONGContent_0600
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_MEDIA) promise
     */
    it('ACTS_PublishLONGContent_0600', 0,async function (done) {
        await notification.publish({
            Id: 12,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_MEDIA,
                longText: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText",
                    longText:"longText",
                    briefText:"briefText",
                    expandedTitle:"expandedTitle"
                }}
        }).then(console.log("============ACTS_PublishLONGContent_0600 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0100
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:CONTENT_INFORMATION)
     */
    it('ACTS_Publish_SlotTypeContent_0100', 0,async function (done) {
            await notification.publish({
                Id: 13,
                content: {
                    contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                    normal: {
                        title: "test_title",
                        text: "test_text",
                        additionalText: "test_additionalText"
                    }
                 },
                  slotType:notification.SlotType.CONTENT_INFORMATION
            },publishSlotTypeContentCallback001);
            console.log("============ACTS_Publish_SlotTypeContent_0100 finished============")
            done();
        })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0200
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:CONTENT_INFORMATION)
     */
    it('ACTS_Publish_SlotTypeContent_0200', 0,async function (done) {
        await notification.publish({
            Id: 14,
            content: {
//                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                }
            },
            slotType:notification.SlotType.CONTENT_INFORMATION
        },publishSlotTypeContentCallback002);
        console.log("============ACTS_Publish_SlotTypeContent_0200 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0300
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT)
     */
    it('ACTS_Publish_SlotTypeContent_0300', 0,async function (done) {
        await notification.publish({
            Id: 15,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                }
            },
//            slotType:notification.SlotType.CONTENT_INFORMATION
        },publishSlotTypeContentCallback003);
        console.log("============ACTS_Publish_SlotTypeContent_0300 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0400
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SERVICE_INFORMATION)
     */
    it('ACTS_Publish_SlotTypeContent_0400', 0,async function (done) {
        await notification.publish({
            Id: 16,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                }
            },
            slotType:notification.SlotType.SERVICE_INFORMATION
        },publishSlotTypeContentCallback004);
        console.log("============ACTS_Publish_SlotTypeContent_0400 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0500
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:CONTENT_INFORMATION)  promise
     */
    it('ACTS_Publish_SlotTypeContent_0500', 0,async function (done) {
         notification.publish({
            Id: 17,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                }
            },
            slotType:notification.SlotType.CONTENT_INFORMATION
        }).then( console.log("============ACTS_Publish_SlotTypeContent_0500 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0600
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:CONTENT_INFORMATION)  promise
     */
    it('ACTS_Publish_SlotTypeContent_0600', 0,async function (done) {
         notification.publish({
            Id: 18,
            content: {
            //                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                }
            },
            slotType:notification.SlotType.CONTENT_INFORMATION
        }).then(console.log("============ACTS_Publish_SlotTypeContent_0600 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0700
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT)  promise
     */
    it('ACTS_Publish_SlotTypeContent_0700', 0,async function (done) {
         notification.publish({
            Id: 19,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                }
            },
        //            slotType:notification.SlotType.CONTENT_INFORMATION
        }).then(console.log("============ACTS_Publish_SlotTypeContent_0700 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_Publish_SlotTypeContent_0800
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SERVICE_INFORMATION) promise
     */
    it('ACTS_Publish_SlotTypeContent_0800', 0,async function (done) {
         notification.publish({
            Id: 20,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                }
            },
            slotType:notification.SlotType.SERVICE_INFORMATION
        }).then(console.log("============ACTS_Publish_SlotTypeContent_0800 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0100
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:OTHER_TYPES)
     */
    it('ACTS_PublishSlotTypeOther_0100', 0,async function (done) {
            await notification.publish({
                id:21,
                content: {
                    contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                    normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                    },
                    slotType:notification.SlotType.OTHER_TYPES
                }
            },publishSlotOtherCallback001);
            console.log("============ACTS_PublishSlotTypeOther_0100 finished============")
            done();
        })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0200
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:OTHER_TYPES)
     */
    it('ACTS_PublishSlotTypeOther_0200', 0,async function (done) {
        await notification.publish({
            id:22,
            content: {
//                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.OTHER_TYPES
            }
        },publishSlotOtherCallback002);
        console.log("============ACTS_PublishSlotTypeOther_0200 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0300
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT)
     */
    it('ACTS_PublishSlotTypeOther_0300', 0,async function (done) {
        await notification.publish({
            id:23,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
//                slotType:notification.SlotType.OTHER_TYPES
            }
        },publishSlotOtherCallback003);
        console.log("============ACTS_PublishSlotTypeOther_0300 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0400
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SOCIAL_COMMUNICATION)
     */
    it('ACTS_PublishSlotTypeOther_0400', 0,async function (done) {
        await notification.publish({
            id:24,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.SOCIAL_COMMUNICATION
            }
        },publishSlotOtherCallback004);
        console.log("============ACTS_PublishSlotTypeOther_0400 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0500
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:OTHER_TYPES)  promise
     */
    it('ACTS_PublishSlotTypeOther_0500', 0,async function (done) {
         notification.publish({
             id:25,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.OTHER_TYPES
            }
        }).then(console.log("============ACTS_PublishSlotTypeOther_0500 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0600
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:OTHER_TYPES)  promise
     */
    it('ACTS_PublishSlotTypeOther_0600', 0,async function (done) {
         notification.publish({
             id:26,
            content: {
            //                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.OTHER_TYPES
            }
        }).then(console.log("============ACTS_PublishSlotTypeOther_0600 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0700
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT)  promise
     */
    it('ACTS_PublishSlotTypeOther_0700', 0,async function (done) {
         notification.publish({
            id:27,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            //                slotType:notification.SlotType.OTHER_TYPES
            }
        }).then(console.log("============ACTS_PublishSlotTypeOther_0700 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeOther_0500
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SOCIAL_COMMUNICATION)  promise
     */
    it('ACTS_PublishSlotTypeOther_0800', 0,async function (done) {
         notification.publish({
             id:28,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.SOCIAL_COMMUNICATION
            }
        }).then(console.log("============ACTS_PublishSlotTypeOther_0800 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0100
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SERVICE_INFORMATION)
     */
    it('ACTS_PublishSlotTypeService_0100', 0,async function (done) {
        await notification.publish({
            id:29,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                title: "test_title",
                text: "test_text",
                additionalText: "test_additionalText"
                },
            },
                slotType:notification.SlotType.SERVICE_INFORMATION
        },publishSlotServiceCallback001);
        console.log("============ACTS_PublishSlotTypeService_0100 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0200
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:SERVICE_INFORMATION)
     */
    it('ACTS_PublishSlotTypeService_0200', 0,async function (done) {
        await notification.publish({
            Id: 30,
            content: {
//                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            slotType:notification.SlotType.SERVICE_INFORMATION
        },publishSlotServiceCallback002);
        console.log("============ACTS_PublishSlotTypeService_0200 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0300
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT)
     */
    it('ACTS_PublishSlotTypeService_0300', 0,async function (done) {
        await notification.publish({
            Id: 31,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
//            slotType:notification.SlotType.SERVICE_INFORMATION
        },publishSlotServiceCallback003);
        console.log("============ACTS_PublishSlotTypeService_0300 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0400
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:UNKNOWN_TYPE)
     */
    it('ACTS_PublishSlotTypeService_0400', 0,async function (done) {
        await notification.publish({
            Id: 32,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            slotType:notification.SlotType.UNKNOWN_TYPE
        },publishSlotServiceCallback004);
        console.log("============ACTS_PublishSlotTypeService_0400 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0500
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SERVICE_INFORMATION) promise
     */
    it('ACTS_PublishSlotTypeService_0500', 0,async function (done) {
         notification.publish({
            Id: 33,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            slotType:notification.SlotType.SERVICE_INFORMATION
        }).then(console.log("============ACTS_PublishSlotTypeService_0500 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0600
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:SERVICE_INFORMATION) promise
     */
    it('ACTS_PublishSlotTypeService_0600', 0,async function (done) {
         notification.publish({
            Id: 34,
            content: {
            //                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            slotType:notification.SlotType.SERVICE_INFORMATION
        }).then(console.log("============ACTS_PublishSlotTypeService_0600 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0700
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT) promise
     */
    it('ACTS_PublishSlotTypeService_0700', 0,async function (done) {
         notification.publish({
            Id: 35,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
        //            slotType:notification.SlotType.SERVICE_INFORMATION
        }).then(console.log("============ACTS_PublishSlotTypeService_0700 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeService_0800
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:UNKNOWN_TYPE) promise
     */
    it('ACTS_PublishSlotTypeService_0800', 0,async function (done) {
         notification.publish({
            Id: 36,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            },
            slotType:notification.SlotType.UNKNOWN_TYPE
        }).then(console.log("============ACTS_PublishSlotTypeService_0800 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0100
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SOCIAL_COMMUNICATION)
     */
    it('ACTS_PublishSlotTypeSocial_0100', 0,async function (done) {
        await notification.publish({
                Id: 37,
                content: {
                    contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                    normal: {
                        title: "test_title",
                        text: "test_text",
                        additionalText: "test_additionalText"
                    },
                    slotType:notification.SlotType.SOCIAL_COMMUNICATION
                }
       },publishSlotSocialCallback001);
       console.log("============ACTS_PublishSlotTypeSocial_0600 finished============")
       done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0200
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:SOCIAL_COMMUNICATION)
     */
    it('ACTS_PublishSlotTypeSocial_0200', 0,async function (done) {
        await notification.publish({
            Id: 38,
            content: {
//                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.SOCIAL_COMMUNICATION
            }
        },publishSlotSocialCallback002);
        console.log("============ACTS_PublishSlotTypeSocial_0600 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0300
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT)
     */
    it('ACTS_PublishSlotTypeSocial_0300', 0,async function (done) {
        await notification.publish({
            Id: 39,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
//                slotType:notification.SlotType.SOCIAL_COMMUNICATION
            }
        },publishSlotSocialCallback003);
        console.log("============ACTS_PublishSlotTypeSocial_0300 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0400
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:CONTENT_INFORMATION)
     */
    it('ACTS_PublishSlotTypeSocial_0400', 0,async function (done) {
        await notification.publish({
            Id: 40,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.CONTENT_INFORMATION
            }
        },publishSlotSocialCallback004);
        console.log("============ACTS_PublishSlotTypeSocial_0400 finished============")
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0500
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:SOCIAL_COMMUNICATION) promise
     */
    it('ACTS_PublishSlotTypeSocial_0500', 0,async function (done) {
         notification.publish({
            Id: 41,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.SOCIAL_COMMUNICATION
            }
        }).then(console.log("============ACTS_PublishSlotTypeSocial_0500 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0600
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(slotType:SOCIAL_COMMUNICATION) promise
     */
    it('ACTS_PublishSlotTypeSocial_0600', 0,async function (done) {
         notification.publish({
            Id: 42,
            content: {
            //                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.SOCIAL_COMMUNICATION
            }
        }).then(console.log("============ACTS_PublishSlotTypeSocial_0600 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0700
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT) promise
     */
    it('ACTS_PublishSlotTypeSocial_0700', 0,async function (done) {
         notification.publish({
            Id: 43,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
            //                slotType:notification.SlotType.SOCIAL_COMMUNICATION
            }
        }).then(console.log("============ACTS_PublishSlotTypeSocial_0700 finished============"))
        done();
    })

    /*
     * @tc.number: ACTS_PublishSlotTypeSocial_0800
     * @tc.name: publish()
     * @tc.desc: verify the function of publish(contentType:NOTIFICATION_CONTENT_BASIC_TEXT,slotType:CONTENT_INFORMATION) promise
     */
    it('ACTS_PublishSlotTypeSocial_0800', 0,async function (done) {
         notification.publish({
            Id: 44,
            content: {
                contentType: notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
                normal: {
                    title: "test_title",
                    text: "test_text",
                    additionalText: "test_additionalText"
                },
                slotType:notification.SlotType.CONTENT_INFORMATION
            }
        }).then(console.log("============ACTS_PublishSlotTypeSocial_0800 finished============"))
        done();
    })

})