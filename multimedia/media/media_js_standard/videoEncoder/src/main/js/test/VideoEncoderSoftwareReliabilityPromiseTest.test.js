/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import media from '@ohos.multimedia.media'
import mediademo from '@ohos.multimedia.mediademo'
import Fileio from '@ohos.fileio'
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index'

describe('videoEncoderReliability', function () {
    const BASIC_PATH = '/data/media/results/encode_func_promise_';
    let videoEncodeProcessor;
    let mediaTest = mediademo.createMediaTest();
    let surfaceID = '';
    let outputQueue = [];
    let outputCnt = 0;
    let frameTotal = 100;
    let frameCountOut = 0;
    let flushAtEOS = false;
    let sawOutputEOS = false;
    let needGetMediaDes = false;
    let workdoneAtEOS = false;
    const END = 0;
    const CONFIGURE = 1;
    const GETSURFACE = 2;
    const SETSTREAMPARAM = 3;
    const PREPARE = 4;
    const STARTSTREAM = 5;
    const STOPSTREAM = 6;
    const START = 7;
    const FLUSH = 8;
    const STOP = 9;
    const RESET = 10;
    const RELEASE = 11;
    const HOLDON = 12;
    const WAITFORALLOUTS = 13;
    const CONFIGURE_ERROR = 14;
    const PREPARE_ERROR = 15;
    const START_ERROR = 16;
    const FLUSH_ERROR = 17;
    const STOP_ERROR = 18;
    const RELEASE_ERROR = 19;
    const JUDGE_EOS = 20;
    const WAITTIME = 3000;
    let width = 720;
    let height = 480;
    let framerate = 60;
    let mediaDescription = {
        "width": width, 
        "height": height,
        "pixel_format": 3,
        "frame_rate" : framerate,
    }
    let mime = 'video/mp4v-es';


    beforeAll(function() {
        console.info('beforeAll case');
    })

    beforeEach(function() {
        console.info('beforeEach case');
        videoEncodeProcessor = null;
        surfaceID = '';
        outputQueue = [];
        outputCnt = 0;
        flushAtEOS = false;
        sawOutputEOS = false;
        needGetMediaDes = false;
        workdoneAtEOS = false;
        width = 720;
        height = 480;
        framerate = 60;
        frameTotal = 100;
    })

    afterEach(async function() {
        console.info('afterEach case');
        if (videoEncodeProcessor != null) {
            await videoEncodeProcessor.release().then(() => {
                console.info(`case release 1`);
                videoEncodeProcessor = null;
            }, failCallback).catch(failCatch);
        }
    })

    afterAll(function() {
        console.info('afterAll case');
    })

    let failCallback = function(err) {
        console.info('case callback err : ' + err);
        expect(err).assertUndefined();
    }

    let failCallbackTrue = function(err, mySteps, done) {
        console.info('case callback err : ' + err);
        expect(err != undefined).assertTrue();
        nextStep(mySteps, done);
    }

    let failCatch = function(err) {
        console.info('case catch err : ' + err);
        expect(err).assertUndefined();
    }

    function resetParam() {
        outputQueue = [];
        outputCnt = 0;
        frameTotal = 100;
        flushAtEOS = false;
        sawOutputEOS = false;
        needGetMediaDes = false;
        workdoneAtEOS = false;
    }

    function writeFile(path, buf, len){
        try{
            let writestream = Fileio.createStreamSync(path, "ab+");
            let num = writestream.writeSync(buf, {length:len});
            writestream.flushSync();
            writestream.closeSync();
        } catch(e) {
            console.info(e)
        }
    }

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    } 

    function wait(time) {
        for(let t = Date.now(); Date.now() - t <= time;);
    }
    
    async function nextStep(mySteps, done) {
        console.info("case myStep[0]: " + mySteps[0]);
        if (mySteps[0] == END) {
            done();
        }
        switch (mySteps[0]) {
            case CONFIGURE:
                mySteps.shift();
                console.info(`case to configure`);
                await toConfigure();
                nextStep(mySteps, done);
                break;
            case GETSURFACE:
                mySteps.shift();
                console.info(`case to getInputSurface`);
                await toGetInputSurface();
                nextStep(mySteps, done);
                break;
            case SETSTREAMPARAM:
                mySteps.shift();
                toSetStreamParam();
                nextStep(mySteps, done);
                break;  
            case PREPARE:
                mySteps.shift();
                console.info(`case to prepare`);
                await toPrepare();
                nextStep(mySteps, done);
                break;
            case STARTSTREAM:
                mySteps.shift();
                console.info(`case to start stream`);
                toStartStream();
                nextStep(mySteps, done);
                break;
            case STOPSTREAM:
                mySteps.shift();
                console.info(`case to stop stream`);
                mediaTest.closeStream(surfaceID);
                nextStep(mySteps, done);
                break;
            case START:
                mySteps.shift();
                console.info(`case to start`);
                if (sawOutputEOS) {
                    resetParam();
                    workdoneAtEOS = true;
                }
                await toStart();
                nextStep(mySteps, done);
                break;
            case FLUSH:
                mySteps.shift();
                console.info(`case to flush`);
                await toFlush();
                if (flushAtEOS) {
                    mediaTest.closeStream(surfaceID);
                    resetParam();
                    workdoneAtEOS = true;
                }
                nextStep(mySteps, done);
                break;
            case STOP:
                mySteps.shift();
                console.info(`case to stop`);
                await toStop();
                nextStep(mySteps, done);
                break;
            case RESET:
                mySteps.shift();
                console.info(`case to reset`);
                await toReset();
                nextStep(mySteps, done);
                break;
            case RELEASE:
                mySteps.shift();
                console.info(`case to release`);
                await toRelease();
                if (mySteps[0] != RELEASE_ERROR) {
                    videoEncodeProcessor = null;
                }
                nextStep(mySteps, done);
                break;
            case HOLDON:
                mySteps.shift();
                setTimeout(() => {
                    nextStep(mySteps, done);
                }, WAITTIME);
                break;
            case WAITFORALLOUTS:
                mySteps.shift();
                console.info(`case wait for all outputs`);
                break;
            case CONFIGURE_ERROR:
                mySteps.shift();
                console.info(`case to configure 2`);
                videoEncodeProcessor.configure(mediaDescription).then(() => {
                    console.info(`case configure error 1`);
                    expect().assertFail();
                }, (err) => {failCallbackTrue(err,  mySteps, done)}).catch(failCatch);
                break;
            case PREPARE_ERROR:
                mySteps.shift();
                console.info(`case to prepare 2`);
                videoEncodeProcessor.prepare().then(() => {
                    console.info(`case prepare error 1`);
                    expect().assertFail();
                }, (err) => {failCallbackTrue(err,  mySteps, done)}).catch(failCatch);
                break;
            case START_ERROR:
                mySteps.shift();
                console.info(`case to start 2`);
                videoEncodeProcessor.start().then(() => {
                    console.info(`case start error 1`);
                    expect().assertFail();
                }, (err) => {failCallbackTrue(err,  mySteps, done)}).catch(failCatch);
                break;
            case FLUSH_ERROR:
                mySteps.shift();
                console.info(`case to flush 2`);
                videoEncodeProcessor.flush().then(() => {
                    console.info(`case flush error 1`);
                    expect().assertFail();
                }, (err) => {failCallbackTrue(err,  mySteps, done)}).catch(failCatch);
                break;
            case STOP_ERROR:
                mySteps.shift();
                console.info(`case to stop 2`);
                videoEncodeProcessor.stop().then(() => {
                    console.info(`case stop error 1`);
                    expect().assertFail();
                }, (err) => {failCallbackTrue(err,  mySteps, done)}).catch(failCatch);
                break;
            case RELEASE_ERROR:
                mySteps.shift();
                console.info(`case to relase 2`);
                videoEncodeProcessor.release().then(() => {
                    console.info(`case release error 1`);
                    expect().assertFail();
                }, (err) => {failCallbackTrue(err,  mySteps, done)}).catch(failCatch);
                videoEncodeProcessor = null;
                break;
            case JUDGE_EOS:
                mySteps.shift();
                console.info(`case judge EOS state`);
                expect(sawOutputEOS).assertTrue();
                nextStep(mySteps, done);
                break;
            default:
                break;
        }
    }
    async function dequeueOutputs(path, done) {
        while (outputQueue.length > 0) {
            let outputObject = outputQueue.shift();
            outputCnt += 1;
            if (outputObject.flags == 1) {
                console.info("saw output EOS");
                sawOutputEOS = true;
                if (workdoneAtEOS) {
                    mediaTest.closeStream(surfaceID);
                    await toReset();
                    await toRelease();
                    videoEncodeProcessor = null;
                    console.info("case frameTotal: " + frameTotal);
                    console.info("case frameCountOut: " + frameCountOut);
                    done();
                } else {
                    console.info("sawOutputEOS = true;");
                }
            } else {
                writeFile(path, outputObject.data, outputObject.length);
                console.info("write to file success");
                videoEncodeProcessor.releaseOutput(outputObject).then(() => {
                    console.info('release output success');
                    frameCountOut++;
                    console.log('release output count:' + frameCountOut);
                })
            }
        } 
    }

    function setCallback(path, done) {
        console.info('case callback');
        videoEncodeProcessor.on('outputBufferAvailable', async(outBuffer) => {
            console.info('outputBufferAvailable');
            console.info('outBuffer.flags :' + outBuffer.flags);
            if (needGetMediaDes) {
                videoEncodeProcessor.getOutputMediaDescription().then((MediaDescription) => {
                    console.info("get OutputMediaDescription success");
                    console.info('get outputMediaDescription : ' + MediaDescription);
                    needGetMediaDes = false;
                }, failCallback).catch(failCatch);
            }
            outputQueue.push(outBuffer);
            await dequeueOutputs(path, done);
        });

        videoEncodeProcessor.on('error',(err) => {
            console.info('case error called,errName is' + err);
        });
        videoEncodeProcessor.on('outputFormatChanged',(format) => {
            console.info('Output format changed: ' + format);
        });
    }

    async function createVideoEncoder(savepath, mySteps, done) {
        await media.createVideoEncoderByMime(mime).then((processor) => {
            console.info(`case createVideoEncoder 1`);
            videoEncodeProcessor = processor;
            setCallback(savepath, done);
            console.info("case start api test");
            nextStep(mySteps, done);
        }, failCallback).catch(failCatch);
    }
    
    async function toCreateByMime(mime, done) {
        await media.createVideoEncoderByMime(mime).then((processor) => {
            if (typeof (processor) != 'undefined') {
                videoEncodeProcessor = processor;
                console.info('in case : createVideoEncoderByMime success');
            } else {
                console.info('in case : createVideoEncoderByMime fail');
                expect().assertFail();
                done();
            }
        })
    }

    function toSetStreamParam() {
        mediaTest.setResolution(width, height);
        mediaTest.setFrameRate(framerate);
        mediaTest.setFrameCount(frameTotal);
    }

    async function toGetInputSurface() {
        await videoEncodeProcessor.getInputSurface().then((inputSurface) => {
            expect(inputSurface != undefined).assertTrue();
            surfaceID = inputSurface;
        }, failCallback).catch(failCatch);
    }

    function toStartStream() {
        mediaTest.isStart = 1;
        mediaTest.startStream(surfaceID);
    }

    async function toConfigure() {
        await videoEncodeProcessor.configure(mediaDescription).then(() => {
            console.info("case configure success"); 
        }, failCallback).catch(failCatch);
    }

    async function toPrepare() {
        await videoEncodeProcessor.prepare().then(() => {
            console.info("case prepare success"); 
        }, failCallback).catch(failCatch);
    }

    async function toStart() {
        await videoEncodeProcessor.start().then(() => {
            console.info("case start success"); 
        }, failCallback).catch(failCatch);
    }

    async function toFlush() {
        await videoEncodeProcessor.flush().then(() => {
            console.info("case flush success"); 
        }, failCallback).catch(failCatch);
    }

    async function toStop() {
        await videoEncodeProcessor.stop().then(() => {
            console.info("case stop success"); 
        }, failCallback).catch(failCatch);
    }

    async function toReset() {
        await videoEncodeProcessor.reset().then(() => {
            console.info("case reset success"); 
        }, failCallback).catch(failCatch);
    }

    async function toRelease() {
        await videoEncodeProcessor.release().then(() => {
            console.info("case release success"); 
        }, failCallback).catch(failCatch);
    }

     /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0100
        * @tc.name      : 001.create -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
     it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0100.txt';
        let mySteps = new Array(CONFIGURE, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0200
        * @tc.name      : 002.prepare -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0200.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, CONFIGURE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0300
        * @tc.name      : 003.start -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, 
            CONFIGURE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0400
        * @tc.name      : 004.flush -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, FLUSH, 
            CONFIGURE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0500
        * @tc.name      : 005.stop -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP , 
            CONFIGURE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0600
        * @tc.name      : 006.EOS -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0600', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0600.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, CONFIGURE_ERROR, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0700
        * @tc.name      : 007.reset -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0700', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0700.txt';
        let mySteps = new Array(RESET, CONFIGURE, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0800
        * @tc.name      : 008.configure -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0800', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0800.txt';
        let mySteps = new Array(CONFIGURE, CONFIGURE_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0900
        * @tc.name      : 009.configure -> reset -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE_PROMISE_0900', 0, async function (done) {
        let savepath = BASIC_PATH + 'configure_0900.txt';
        let mySteps = new Array(CONFIGURE, RESET, CONFIGURE, END);
        createVideoEncoder(savepath, mySteps, done);
    })

   /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0100
        * @tc.name      : 001.create -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0100.txt';
        let mySteps = new Array(PREPARE_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0200
        * @tc.name      : 002.configure -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0200.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0300
        * @tc.name      : 003.prepare -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, PREPARE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0400
        * @tc.name      : 004.start -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, PREPARE_ERROR, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0500
        * @tc.name      : 005.flush -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, FLUSH, 
            PREPARE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0600
        * @tc.name      : 006.stop -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0600', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0600.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP, PREPARE_ERROR, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0700
        * @tc.name      : 007.EOS -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0700', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0700.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, PREPARE_ERROR, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0800
        * @tc.name      : 008.reset -> prepare
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_PREPARE_PROMISE_0800', 0, async function (done) {
        let savepath = BASIC_PATH + 'prepare_0800.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, RESET, 
            PREPARE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

  /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0100
        * @tc.name      : 001.create -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0100.txt';
        let mySteps = new Array(START_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0200
        * @tc.name      : 002.configure -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0200.txt';
        let mySteps = new Array(CONFIGURE, START_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0300
        * @tc.name      : 003.prepare -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, WAITFORALLOUTS);
        workdoneAtEOS = true;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0400
        * @tc.name      : 004.start -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, START_ERROR, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0500
        * @tc.name      : 005.flush -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, FLUSH, 
            START_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0600
        * @tc.name      : 006.stop -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0600', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0600.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP, 
            START, WAITFORALLOUTS);
        workdoneAtEOS = true;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0700
        * @tc.name      : 007.EOS -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0700', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0700.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, START_ERROR, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0800
        * @tc.name      : 008.reset -> start
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START_PROMISE_0800', 0, async function (done) {
        let savepath = BASIC_PATH + 'start_0800.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, RESET, 
            START_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0100
        * @tc.name      : 001.create -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0100.txt';
        let mySteps = new Array(FLUSH_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0200
        * @tc.name      : 002.configure -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0200.txt';
        let mySteps = new Array(CONFIGURE, FLUSH_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0300
        * @tc.name      : 003.prepare -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, FLUSH_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0400
        * @tc.name      : 004.start -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, FLUSH, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0500
        * @tc.name      : 005.flush -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, FLUSH, FLUSH, 
            WAITFORALLOUTS);
        workdoneAtEOS = true;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0600
        * @tc.name      : 006.stop -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0600', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0600.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP,
            FLUSH_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0700
        * @tc.name      : 007.EOS -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0700', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0700.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, FLUSH, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0800
        * @tc.name      : 008.reset -> flush
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_FLUSH_PROMISE_0800', 0, async function (done) {
        let savepath = BASIC_PATH + 'flush_0800.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, RESET, 
            FLUSH_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0100
        * @tc.name      : 001.create -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0100.txt';
        let mySteps = new Array(STOP_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0200
        * @tc.name      : 002.configure -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0200.txt';
        let mySteps = new Array(CONFIGURE, STOP_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0300
        * @tc.name      : 003.prepare -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STOP_ERROR, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0400
        * @tc.name      : 004.start -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0500
        * @tc.name      : 005.flush -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, FLUSH, STOP, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0600
        * @tc.name      : 006.stop -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0600', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0600.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP, STOP_ERROR, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0700
        * @tc.name      : 007.EOS -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0700', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0700.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, JUDGE_EOS, 
            STOP, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0800
        * @tc.name      : 008.reset -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_STOP_PROMISE_0800', 0, async function (done) {
        let savepath = BASIC_PATH + 'stop_0800.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, RESET, 
            STOP_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0100
        * @tc.name      : 001.create -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0100.txt';
        let mySteps = new Array(RESET, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0200
        * @tc.name      : 002.configure -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0200.txt';
        let mySteps = new Array(CONFIGURE, RESET, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0300
        * @tc.name      : 003.prepare -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, RESET, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0400
        * @tc.name      : 004.start -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, RESET, 
            STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0500
        * @tc.name      : 005.flush -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, FLUSH, 
            RESET, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0600
        * @tc.name      : 006.stop -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0600', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0600.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP, 
            RESET, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0700
        * @tc.name      : 007.EOS -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0700', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0700.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, RESET, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0800
        * @tc.name      : 008.reset -> reset
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RESET_PROMISE_0800', 0, async function (done) {
        let savepath = BASIC_PATH + 'reset_0800.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, RESET, 
            RESET, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

        /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0100
        * @tc.name      : 001.create -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0100.txt';
        let mySteps = new Array(RELEASE, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0200
        * @tc.name      : 002.configure -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0200.txt';
        let mySteps = new Array(CONFIGURE, RELEASE, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0300
        * @tc.name      : 003.prepare -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, RELEASE, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0400
        * @tc.name      : 004.start -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, 
            RELEASE, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0500
        * @tc.name      : 005.flush -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, FLUSH, 
            RELEASE, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0600
        * @tc.name      : 006.stop -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0600', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0600.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, STOP, 
            RELEASE, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0700
        * @tc.name      : 007.EOS -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0700', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0700.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, RELEASE, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0800
        * @tc.name      : 008.release -> release
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_RELEASE_PROMISE_0800', 0, async function (done) {
        let savepath = BASIC_PATH + 'release_0800.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, STARTSTREAM, START, RELEASE, 
            RELEASE_ERROR, STOPSTREAM, END);
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0100
        * @tc.name      : 001.EOS -> flush -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0100', 0, async function (done) {
        let savepath = BASIC_PATH + 'eos_0100.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, FLUSH, STOP, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0200
        * @tc.name      : 002.EOS -> flush -> EOS
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0200', 0, async function (done) {
        let savepath = BASIC_PATH + 'eos_0200.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, FLUSH, STARTSTREAM, WAITFORALLOUTS);
        frameTotal = 2;
        flushAtEOS = true;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0300
        * @tc.name      : 003.EOS -> reset -> configure
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0300', 0, async function (done) {
        let savepath = BASIC_PATH + 'eos_0300.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, RESET, CONFIGURE, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0400
        * @tc.name      : 004.EOS -> stop -> start -> EOS
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0400', 0, async function (done) {
        let savepath = BASIC_PATH + 'eos_0400.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, STOPSTREAM, STOP, START, SETSTREAMPARAM, STARTSTREAM, WAITFORALLOUTS);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0500
        * @tc.name      : 005.EOS -> stop -> start -> stop
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_EOS_PROMISE_0500', 0, async function (done) {
        let savepath = BASIC_PATH + 'eos_0500.txt';
        let mySteps = new Array(CONFIGURE, GETSURFACE, SETSTREAMPARAM, PREPARE, START, STARTSTREAM, HOLDON, 
            JUDGE_EOS, STOP, START, STOP, STOPSTREAM, END);
        frameTotal = 2;
        createVideoEncoder(savepath, mySteps, done);
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE-RESET_PROMISE_0100
        * @tc.name      : 001. configure -> reset for 50 times
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CONFIGURE-RESET_PROMISE_0100', 0, async function (done) {
        let name = 'avenc_mpeg4';
        await media.createVideoEncoderByName(name).then((processor) => {
            if (typeof (processor) != 'undefined') {
                videoEncodeProcessor = processor;
                console.info('in case : createVideoEncoderByName success');
            } else {
                console.info('in case : createVideoEncoderByName fail');
                expect().assertFail();
                done();
            }
        })
        for (let j = 1; j < 51; j++) {
            console.info('case configure-reset current loop: ' + j);
            await toConfigure();
            await toReset();
        }
        await toRelease();
        videoEncodeProcessor = null;
        done();
    })

    /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START-STOP_PROMISE_0100
        * @tc.name      : 001. start -> stop for 50 times
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_START-STOP_PROMISE_0100', 0, async function (done) {
        let name = 'avenc_mpeg4';
        await media.createVideoEncoderByName(name).then((processor) => {
            if (typeof (processor) != 'undefined') {
                videoEncodeProcessor = processor;
                console.info('in case : createVideoEncoderByName success');
            } else {
                console.info('in case : createVideoEncoderByName fail');
                expect().assertFail();
                done();
            }
        })
        await toConfigure();
        await toGetInputSurface();
        await toPrepare();
        for (let j = 1; j < 51; j++) {
            console.info('case start-stop current loop: ' + j);
            await toStart();
            await toStop();
        }
        await toRelease();
        videoEncodeProcessor = null;
        done();
    })
        /* *
        * @tc.number    : SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CREATE-RELEASE_PROMISE_0100
        * @tc.name      : 001. create -> release for 50 times
        * @tc.desc      : Reliability Test
        * @tc.size      : MediumTest
        * @tc.type      : Reliability
        * @tc.level     : Level2
    */
    it('SUB_MEDIA_VIDEO_SOFTWARE_ENCODER_API_CREATE-RELEASE_PROMISE_0100', 0, async function (done) {
        let name = 'avenc_mpeg4';
        for (let j = 1; j < 51; j++) {
            console.info('case create-release current loop: ' + j);
            await media.createVideoEncoderByName(name).then((processor) => {
                if (typeof (processor) != 'undefined') {
                    videoEncodeProcessor = processor;
                    console.info('in case : createVideoEncoderByName success');
                } else {
                    console.info('in case : createVideoEncoderByName fail');
                    expect().assertFail();
                    done();
                }
            })
            await toRelease();
            videoEncodeProcessor = null;
        }
        done();
    })
})
