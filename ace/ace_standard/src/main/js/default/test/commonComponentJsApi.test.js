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

import router from '@system.router';
import {describe, beforeAll, beforeEach, afterEach, afterAll, it, expect} from 'deccjsunit/index';


describe('aceJsTest', function () {

    async function sleep(time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time)
        }).then(() => {
            console.info(`sleep ${time} over...`)
        })
    }
    async function backToIndex() {
        let backToIndexPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                router.back({
                    uri: 'pages/index/index'
                });
                resolve();
            }, 500);
        });
        let clearPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                router.clear();
                resolve();
            }, 500);
        });
        await backToIndexPromise.then(() => {
            return clearPromise;
        });
    }

    /**
    * run after testcase
    */
    afterEach(async function () {
        console.info('[aceJsTest] after each called')
        await backToIndex();
        await sleep(1000)
    });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testButtonComponent
         * @tc.desc      ACE
         */
        it('testButtonComponent', 0, async function (done) {
            console.info('testButtonComponent START');
            let result;
            let options = {
                uri: 'pages/button/index'
            }
            try {
                result = router.push(options)
                console.info("push button page success " + JSON.stringify(result));
            } catch (err) {
                console.error("push button page error " + JSON.stringify(result));
            }
            await sleep(1000)
            let pages = router.getState();
            console.info("[router.button] getState" + JSON.stringify(pages));
            expect("pages/button/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0200
         * @tc.name      testChartComponent
         * @tc.desc      ACE
         */
        it('testChartComponent', 0, async function (done) {
            console.info('testButtonComponent START');
            let result;
            let options = {
                uri: 'pages/chart/index'
            }
            try {
                result = router.push(options)
                console.info("push button page success " + JSON.stringify(result));
            } catch (err) {
                console.error("push button page error " + JSON.stringify(result));
            }
            await sleep(1000)
            let pages = router.getState();
            console.info("[router.chart] getState" + JSON.stringify(pages));
            expect("pages/chart/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0300
         * @tc.name      testInputComponent
         * @tc.desc      ACE
         */
        it('testInputComponent', 0, async function (done) {
            console.info('testButtonComponent START');
            let result;
            let options = {
                uri: 'pages/input/index'
            }
            try {
                result = router.push(options)
                console.info("push button page success " + JSON.stringify(result));
            } catch (err) {
                console.error("push button page error " + JSON.stringify(result));
            }
            await sleep(1000)
            let pages = router.getState();
            console.info("[router.input] getState" + JSON.stringify(pages));
            expect("pages/input/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0400
         * @tc.name      testSliderComponent
         * @tc.desc      ACE
         */
        it('testSliderComponent', 0, async function (done) {
            console.info('testSliderComponent START');
            let result;
            let options = {
                uri: 'pages/slider/index'
            }
            try {
                result = router.push(options)
                console.info("push button page success " + JSON.stringify(result));
            } catch (err) {
                console.error("push button page error " + JSON.stringify(result));
            }
            await sleep(1000)
            let pages = router.getState();
            console.info("[router.slider] getState" + JSON.stringify(pages));
            expect("pages/slider/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0400
         * @tc.name      testTextComponent
         * @tc.desc      ACE
         */
        it('testTextComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/text/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/text/").assertEqual(pages.path);
            done();
        });

//        /**
//         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0400
//         * @tc.name      testLabelComponent
//         * @tc.desc      ACE
//         */
//        it('testLabelComponent', 0, async function (done) {
//            console.info('testLabelComponent START');
//            let result;
//            let options = {
//                uri: 'pages/label/index'
//            }
//            try {
//                result = router.push(options)
//            } catch (err) {
//                result = err
//            }
//            await sleep(1000)
//            let pages = router.getState();
//            expect("pages/label/").assertEqual(pages.path);
//            done();
//        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testDividerComponent
         * @tc.desc      ACE
         */
        it('testDividerComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/divider/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/divider/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testGetImageComponent
         * @tc.desc      ACE
         */
        it('testGetImageComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/image/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/image/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testGetMenuComponent
         * @tc.desc      ACE
         */
        it('testGetMenuComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/menu/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/menu/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testRatingComponent
         * @tc.desc      ACE
         */
        it('testRatingComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/rating/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/rating/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testSearchComponent
         * @tc.desc      ACE
         */
        it('testSearchComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/search/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/search/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testToolbarComponent
         * @tc.desc      ACE
         */
        it('testToolbarComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/toolbar/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/toolbar/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testTextareaComponent
         * @tc.desc      ACE
         */
        it('testTextareaComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/textarea/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/textarea/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testSpanComponent
         * @tc.desc      ACE
         */
        it('testSpanComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/span/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/span/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testSwitchComponent
         * @tc.desc      ACE
         */
        it('testSwitchComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/switch/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/switch/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testToggleComponent
         * @tc.desc      ACE
         */
        it('testToggleComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/toggle/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/toggle/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testOptionComponent
         * @tc.desc      ACE
         */
        it('testOptionComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/option/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/option/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testPickerComponent
         * @tc.desc      ACE
         */
        it('testPickerComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/picker/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/picker/").assertEqual(pages.path);
            done();
        });

//        /**
//         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
//         * @tc.name      testPickerViewComponent
//         * @tc.desc      ACE
//         */
//        it('testPickerViewComponent', 0, async function (done) {
//            let result;
//            let options = {
//                uri: 'pages/pickerView/index'
//            }
//            try {
//                result = router.push(options)
//            } catch (err) {
//                result = err
//            }
//            await sleep(1000)
//            let pages = router.getState();
//            expect("pages/pickerView/").assertEqual(pages.path);
//            done();
//        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testPieceComponent
         * @tc.desc      ACE
         */
        it('testPieceComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/piece/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/piece/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testProgressComponent
         * @tc.desc      ACE
         */
        it('testProgressComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/progress/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/progress/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testQrcodeComponent
         * @tc.desc      ACE
         */
        it('testQrcodeComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/qrcode/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/qrcode/").assertEqual(pages.path);
            done();
        });

        /**
         * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
         * @tc.name      testSelectComponent
         * @tc.desc      ACE
         */
        it('testSelectComponent', 0, async function (done) {
            let result;
            let options = {
                uri: 'pages/select/index'
            }
            try {
                result = router.push(options)
            } catch (err) {
                result = err
            }
            await sleep(1000)
            let pages = router.getState();
            expect("pages/select/").assertEqual(pages.path);
            done();
        });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testBadgeComponent
     * @tc.desc      ACE
     */
    it('testBadgeComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/badge/index'
        }
        try {
            result = router.push(options)
            console.info("push badge page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push badge page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.badge] getState" + JSON.stringify(pages));
        expect("pages/badge/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testDialogComponent
     * @tc.desc      ACE
     */
    it('testDialogComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/dialog/index'
        }
        try {
            result = router.push(options)
            console.info("push dialog page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push dialog page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.dialog] getState" + JSON.stringify(pages));
        expect("pages/dialog/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testDivComponent
     * @tc.desc      ACE
     */
    it('testDivComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/div/index'
        }
        try {
            result = router.push(options)
            console.info("push div page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push div page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.div] getState" + JSON.stringify(pages));
        expect("pages/div/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testFormComponent
     * @tc.desc      ACE
     */
    it('testFormComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/form/index'
        }
        try {
            result = router.push(options)
            console.info("push form page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push form page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.form] getState" + JSON.stringify(pages));
        expect("pages/form/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testListComponent
     * @tc.desc      ACE
     */
    it('testListComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/list/index'
        }
        try {
            result = router.push(options)
            console.info("push list page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push list page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.list] getState" + JSON.stringify(pages));
        expect("pages/list/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testListItemComponent
     * @tc.desc      ACE
     */
    it('testListItemComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/listItem/index'
        }
        try {
            result = router.push(options)
            console.info("push listItem page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push listItem page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.listItem] getState" + JSON.stringify(pages));
        expect("pages/listItem/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testListItemGroupComponent
     * @tc.desc      ACE
     */
    it('testListItemGroupComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/listItemGroup/index'
        }
        try {
            result = router.push(options)
            console.info("push listItemGroup page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push listItemGroup page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.listItemGroup] getState" + JSON.stringify(pages));
        expect("pages/listItemGroup/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testPanelComponent
     * @tc.desc      ACE
     */
    it('testPanelComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/panel/index'
        }
        try {
            result = router.push(options)
            console.info("push panel page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push panel page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.panel] getState" + JSON.stringify(pages));
        expect("pages/panel/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testPopupComponent
     * @tc.desc      ACE
     */
    it('testPopupComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/popup/index'
        }
        try {
            result = router.push(options)
            console.info("push popup page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push popup page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.popup] getState" + JSON.stringify(pages));
        expect("pages/popup/").assertEqual(pages.path);
        done();
    });

    /**
     * @tc.number    SUB_ACE_BASIC_COMPONENT_JS_API_0100
     * @tc.name      testStackComponent
     * @tc.desc      ACE
     */
    it('testStackComponent', 0, async function (done) {
        let result;
        let options = {
            uri: 'pages/stack/index'
        }
        try {
            result = router.push(options)
            console.info("push stack page success " + JSON.stringify(result));
        } catch (err) {
            console.error("push stack page error " + JSON.stringify(result));
        }
        await sleep(5000)
        let pages = router.getState();
        console.info("[router.stack] getState" + JSON.stringify(pages));
        expect("pages/stack/").assertEqual(pages.path);
        done();
    });
});
