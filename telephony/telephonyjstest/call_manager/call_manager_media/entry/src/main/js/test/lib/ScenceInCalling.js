/**
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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

import {
    CALL_MANAGER_NUMBER_NULL_NOTICE,
    NULL_PHONE_NUMBER,
    CALL_STATUS_HOLDIN,
    CALL_STATUS_DISCONNECTED,
    CALL_STATUS_DISCONNECTING,
    TIMEOUT_LENTH,
    DEFAULT_SLOT_ID,
    CALL_STATUS_ACTIVE,
    REACH_TIMES,
    AFTER_HANUP_TIMES
} from './Const.js';
import {toString} from './ApiToPromise.js';
import call from '@ohos.telephony.calltest';
import observer from '@ohos.telephony.observer';

let hunupTimeOut = null;

export function clearHandupTime (caseName) {
    console.log(`${caseName} clearHandupTime success`);
    clearTimeout(hunupTimeOut);
}

let stateStorage = [];
export let callId = null;
export function callDetailsChangeOn () {
    call.on('callDetailsChange', (err, callStateInfo) => {
        console.log(`Telephony_CallManager callDetailsChange error ${toString(err)}` +
      `,callStateInfo ${toString(callStateInfo)}`);
        if (callStateInfo) {
            stateStorage.push({...callStateInfo});
            callId = callStateInfo.callId;
        }
    });
}
export function callDetailsChangeOff () {
    call.off('callDetailsChange');
}

let reachStateTimeout = null;
export function reachState (caseName, checkState, tag, isHunup, timeOutLenth) {
    clearInterval(reachStateTimeout);
    stateStorage = [];
    let oldTime = new Date();
    let timeoutflag = false;
    timeOutLenth = timeOutLenth ? timeOutLenth * TIMEOUT_LENTH : 2 * REACH_TIMES * TIMEOUT_LENTH;
    return new Promise((resolve, reject) => {
        reachStateTimeout = setInterval(() => {
            let now = new Date();
            console.log(`${caseName} ${tag} reachState now:${toString(now)},stateStorage:${toString({stateStorage})}`);
            let find = stateStorage.find(ele => {
                return ele.callState === checkState;
            });
            if (find) {
                clearInterval(reachStateTimeout);
                const message = `${caseName} ${tag} reachState,get the right state checkState:${checkState}`;
                console.log(message);
                resolve(find);
                return;
            }
            find = stateStorage.find(ele => {
                return ele.callState === CALL_STATUS_DISCONNECTED;
            });
            if (find) {
                clearInterval(reachStateTimeout);
                reachStateTimeout = setTimeout(() => {
                    const message = `${caseName} ${tag} reachState,get the state CALL_STATUS_DISCONNECTED from` +
        ` ${timeoutflag ? 'local' : 'opposite'}`;
                    console.log(message);
                    reject(new Error(message));
                }, AFTER_HANUP_TIMES * TIMEOUT_LENTH);
                return;
            }

            if (new Date() - oldTime > timeOutLenth) {
                if (isHunup) {
                    const message = `${caseName} ${tag} timeout,hunup is runed`;
                    console.log(message);
                    clearInterval(reachStateTimeout);
                    reject(new Error(message));
                    return;
                }
                if (timeoutflag === false) {
                    timeoutflag = true;
                    if (!callId) {
                        clearInterval(reachStateTimeout);
                        const message = `${caseName} ${tag} timeout reachState,callId is not exit`;
                        reject(new Error(message));
                        return;
                    }
                    const message = `${caseName} ${tag} timeout reachState,start hunupCall`;
                    console.log(message);
                    hangupCall(caseName, callId).then(data => {
                        const message = `${caseName} ${tag} timeout hangupCall success,data:${toString(data)}`;
                        console.log(message);
                        clearInterval(reachStateTimeout);
                        reject(new Error(message));
                    }).catch(error => {
                        clearInterval(reachStateTimeout);
                        const message = `${caseName} ${tag} timeout hangupCall error,error:${toString(error)}`;
                        console.log(message);
                        reject(new Error(message));
                    });
                }
            }
        }, 1 * TIMEOUT_LENTH);
    });
}

export function clearReachState () {
    clearInterval(reachStateTimeout);
}

// dial call in a nomal scence,when specific state arrive,we get the information of this state
export function scenceInCalling (options) {
    console.log(`scenceInCalling options ${toString(options)}`);
    callId = null;
    return new Promise((resolve, reject) => {
        let {caseName, phoneNumber, checkState} = options;
        try {
            let obj = {accountId: 0, videoState: 0, dialScene: 0, dialType:0};
            reachState(caseName, checkState, 'scenceInCalling', false)
                .then(data => {
                    const message = `${caseName} reach the right state success,data:${toString(data)}`;
                    console.log(message);
                    resolve(data);
                })
                .catch(error => {
                    const message = `${caseName} reach the right state error,error:${toString(error)}`;
                    console.log(message);
                    reject(new Error(message));
                });
            call.dial(phoneNumber, obj, (error, data) => {
                if (error) {
                    const message = `${caseName} scenceInCalling dial error,error:${toString(error)}`;
                    console.log(message);
                    clearReachState();
                    reject(new Error(message));
                    return;
                }
                if (data !== true) {
                    const message = `${caseName} scenceInCalling dial data error,data:${toString(data)}`;
                    console.log(message);
                    clearReachState();
                    reject(new Error(message));
                    return;
                }
                console.log(`${caseName} dial true,run continue`);
            });
        } catch (error) {
            const message = `${caseName} dial try catch error,error:${toString(error)}`;
            console.log(message);
            reject(new Error(message));
        }
    });
}

/* normal function
   dial a call with number '',we shoudld get the error */
export function scenceInCallingNull (options) {
    console.log(`scenceInCallingNull options ${toString(options)}`);
    return new Promise((resolve, reject) => {
        let {caseName} = options;
        try {
            call.dial(NULL_PHONE_NUMBER, (err, data) => {
                if (err && err.message === CALL_MANAGER_NUMBER_NULL_NOTICE) {
                    console.log(`${caseName} dial call null number,data:${toString(err)}`);
                    resolve(data);
                    return;
                }
                const message = `${caseName} should be CALL_MANAGER_NUMBER_NULL_NOTICE,` +
         `dial error:${toString(err)},data:${toString(data)}`;
                console.log(message);
                reject(new Error(message));
            });
        } catch (error) {
            const message = `${caseName} error:${toString(error)}`;
            console.log(message);
            reject(new Error(message));
        }
    });
}

// holding call scence,use it should base on scenceInCalling,get the infomation at CALL_STATUS_HOLDIN state
export function scenceInHolding (options) {
    console.log(`scenceInHolding options ${toString(options)}`);
    return new Promise(async (resolve, reject) => {
        let {caseName, callId} = options;
        if (callId) {
            reachState(caseName, CALL_STATUS_HOLDIN, 'scenceInHolding', false)
                .then(data => {
                    const message = `${caseName} scenceInHolding get the right state success,data:${toString(data)}`;
                    console.log(message);
                    resolve(data);
                })
                .catch(error => {
                    const message = `${caseName} scenceInHolding get the right state error,error:${toString(error)}`;
                    console.log(message);
                    reject(new Error(message));
                });
            call.holdCall(callId, (error, data) => {
                if (error) {
                    const message = `${caseName} scenceInHolding holdCall error,error:${toString(error)}`;
                    console.log(message);
                    clearReachState();
                    reject(new Error(message));
                }

            });
        } else {
            const message = `${caseName} scenceInHolding error,need callId`;
            console.log(message);
            reject(new Error(message));
        }
    });
}

export function scenceInUnHolding (options) {
    console.log(`scenceInUnHolding options ${toString(options)}`);
    return new Promise(async (resolve, reject) => {
        let {caseName, callId} = options;
        if (callId) {
            reachState(caseName, CALL_STATUS_ACTIVE, 'scenceInUnHolding', false)
                .then(data => {
                    const message = `${caseName} scenceInUnHolding get the right state success,data:${toString(data)}`;
                    console.log(message);
                    resolve(data);
                })
                .catch(error => {
                    const message = `${caseName} scenceInUnHolding get the right state error,error:${toString(error)}`;
                    console.log(message);
                    reject(new Error(message));
                });
            call.unHoldCall(callId, (error, data) => {
                if (error) {
                    const message = `${caseName} scenceInUnHolding  error,error:${toString(error)}`;
                    console.log(message);
                    clearReachState();
                    reject(new Error(message));
                }

            });
        } else {
            const message = `${caseName} scenceInUnHolding error,need callId`;
            console.log(message);
            reject(new Error(message));
        }
    });
}

// hunup call scence,use it should base on scenceInCalling,specific state arrive,get the infomation at this state
export function scenceInHangup (options) {
    console.log(`scenceInHangup options ${toString(options)}`);
    return new Promise(async (resolve, reject) => {
        let {caseName, callId, checkState} = options;
        if (callId) {
            reachState(caseName, checkState, 'scenceInHangup', true).then(data => {
                const message = `${caseName} scenceInHangup get the right state success ,data:${toString(data)}`;
                console.log(message);
                resolve(data);
            }).catch(error => {
                const message = `${caseName} scenceInHangup get the right state error,error:${toString(error)}`;
                console.log(message);
                reject(new Error(message));
            });
            call.hangup(callId)
                .then((data) => {
                    const message = `${caseName} scenceInHangup data,data:${toString(data)}`;
                    console.log(message);
                })
                .catch(error => {
                    const message = `${caseName} func hangup,error:${toString(error)}`;
                    console.log(message);
                    clearReachState();
                    reject(new Error(message));
                });

        } else {
            const message = `${caseName} scenceInHangup error,need callId`;
            console.log(message);
            reject(new Error(message));
        }
    });
}

// hunup the call ,used in test case
export function hangupCall2 (caseName, done, callId, delaytime) {
    let timeout = null;
    if (callId) {
        const message = `${caseName} hunup,hangupCall2 callId ${callId}`;
        console.log(message);
        reachState(caseName, CALL_STATUS_DISCONNECTED, 'hangupCall2', true)
            .then(data => {
                const message = `${caseName} hangupCall2 get right state success,data:${toString(data)}`;
                console.log(message);
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    done();
                }, AFTER_HANUP_TIMES * TIMEOUT_LENTH);
            })
            .catch(error => {
                const message = `${caseName} hangupCall2 get right state error,error:${toString(error)}`;
                console.log(message);
            });
        call.hangup(callId)
            .then((data) => {
                console.log(`${caseName} func hangup success,${toString(data)}`);
            })
            .catch(error => {
                const message = `${caseName} func hangup,error:${toString(error)}`;
                console.log(message);
                clearReachState();
                done();
            });

    } else {
        const message = `${caseName} hangupCall2 error,need callId`;
        console.log(message);
        done();
    }
}

// hunup the call ,used in packaging function
export function hangupCall (caseName, callId) {
    return new Promise((resolve, reject) => {
        let timeout = null;
        if (callId) {
            let message = `${caseName} hunup,hangupCall callId:${callId}`;
            console.log(message);
            reachState(caseName, CALL_STATUS_DISCONNECTED, 'hangupCall', true)
                .then(data => {
                    const message = `${caseName} hangupCall get right state success,data:${toString(data)}`;
                    console.log(message);
                    clearTimeout(timeout);
                    timeout = setTimeout(function () {
                        resolve(data);
                    }, AFTER_HANUP_TIMES * TIMEOUT_LENTH);
                })
                .catch(error => {
                    const message = `${caseName} hangupCall get right state error,error:${toString(error)}`;
                    console.log(message);
                    reject(new Error(message));
                });
            call.hangup(callId)
                .then((data) => {
                    console.log(`${caseName} func hangup success,${toString(data)}`);
                })
                .catch(error => {
                    const message = `${caseName} func hangup,error:${toString(error)}`;
                    console.log(message);
                    clearReachState();
                    reject(new Error(message));
                });
        } else {
            const message = `${caseName} func hangup error,need callId`;
            console.log(message);
            reject(new Error(message));
        }

    });
}

/* dial call in a nomal scence used in third-party applications,when specific state arrive,
   we get the information of this state */
export function scenceInCallingForRegister (options) {
    console.log(`scenceInCallingForRegister options ${toString(options)}`);
    return new Promise((resolve, reject) => {
        let {caseName} = options;
        let callId = null;
        let callChangeData = null;
        let func = null;
        let count = 0;
        if (options.isOnce) {
            func = observer.once;
        } else {
            func = observer.on;
        }
        if (typeof func !== 'function') {
            let message = `${caseName} observer.once or observer.on is not exit,options:${toString(options)}`;
            console.log(message);
            reject(new Error(message));
            return;
        }
        func('callStateChange', {slotId: DEFAULT_SLOT_ID}, (data) => {
            console.log(`${caseName} callStateChange,data:${toString(data)}`);
            callChangeData = data;
            count++;
        });

        scenceInCalling({...options})
            .then(data => {
                callId = data.callId;
                let tempCallChangeData = {count, ...callChangeData};
                console.log(`${caseName}  scenceInCalling data,data:${toString(data)},` +
        `tempCallChangeData:${toString(tempCallChangeData)}`);
                observer.off('callStateChange');
                hangupCall(caseName, callId)
                    .then(data => {
                        console.log(`${caseName} scenceInCalling hangupCall data,data:${toString(data)}`);
                        resolve(tempCallChangeData);
                    })
                    .catch(error => {
                        const message = `${caseName} scenceInCalling hangupCall error,error:${toString(error)}`;
                        console.log(message);
                        reject(new Error(message));
                    });
            })
            .catch(error => {
                const message = `${caseName}  scenceInCalling error,error:${toString(error)}`;
                console.log(message);
                reject(new Error(message));
            });
    });
}

// holding call scence used in third-party applications,we get the information of state at CALL_STATUS_HOLDIN state
export function scenceInCallingHoldingForRegister (options) {
    console.log(`scenceInCallingHoldingForRegister options ${toString(options)}`);
    return new Promise((resolve, reject) => {
        let {caseName} = options;
        let callId = null;
        let callChangeData = null;
        let func = null;
        let count = 0;
        if (options.isOnce) {
            func = observer.once;
        } else {
            func = observer.on;
        }
        if (typeof func !== 'function') {
            reject(new Error(`${caseName} observer.once or observer.on is not exit,options:${toString(options)}`));
            return;
        }
        func('callStateChange', {slotId: DEFAULT_SLOT_ID}, (data) => {
            console.log(`${caseName}  callStateChange,data:${toString(data)}`);
            count++;
            callChangeData = data;
        });
        scenceInCalling(options)
            .then(data => {
                scenceInHolding({callId:data.callId, ...options})
                    .then(data => {
                        callId = data.callId;
                        let tempCallChangeData = {count, ...callChangeData};
                        console.log(`${caseName} scenceInHolding data,data:${toString(data)}` +
              `,tempCallChangeData:${toString(tempCallChangeData)}`);
                        observer.off('callStateChange');
                        hangupCall(caseName, callId)
                            .then(data => {
                                console.log(`${caseName} hangupCall data,data:${toString(data)}`);
                                resolve(tempCallChangeData);
                            })
                            .catch(error => {
                                const message = `${caseName} hangupCall error,error:${toString(error)}`;
                                console.log(message);
                                reject(new Error(message));
                            });
                    })
                    .catch(error => {
                        const message = `${caseName}  scenceInHolding ,error:${toString(error)}`;
                        console.log(message);
                        reject(new Error(message));
                    });
            })
            .catch(error => {
                const message = `${caseName}  scenceInCalling error,error:${toString(error)}`;
                console.log(message);
                reject(new Error(message));
            });
    });
}

// holding call scence used in third-party applications,we get the information of state when unHoldCall the call
export function scenceInCallingNnHoldingForRegister (options) {
    console.log(`scenceInCallingNnHoldingForRegister options ${toString(options)}`);
    return new Promise((resolve, reject) => {
        let {caseName} = options;
        let callId = null;
        let callChangeData = null;
        let func = null;
        let count = 0;
        if (options.isOnce) {
            func = observer.once;
        } else {
            func = observer.on;
        }
        if (typeof func !== 'function') {
            reject(new Error(`${caseName} observer.once or observer.on is not exit,options:${toString(options)}`));
            return;
        }
        func('callStateChange', {slotId:DEFAULT_SLOT_ID}, (data) => {
            console.log(`${caseName}  callStateChange,data:${toString(data)}`);
            count++;
            callChangeData = data;
        });
        scenceInCalling(options)
            .then(data => {
                scenceInHolding({callId:data.callId, ...options})
                    .then(data => {
                        callId = data.callId;
                        scenceInUnHolding({callId:data.callId, ...options})
                            .then(data => {
                                let tempCallChangeData = {count, ...callChangeData};
                                console.log(`${caseName}  unHoldCall data,data:${toString(data)},
                tempCallChangeData:${toString(tempCallChangeData)}`);
                                observer.off('callStateChange');
                                hangupCall(caseName, callId)
                                    .then(data => {
                                        console.log(`${caseName} hangupCall data,data:${toString(data)}`);
                                        resolve(tempCallChangeData);
                                    })
                                    .catch(error => {
                                        const message = `${caseName}  hangupCall error,error:${toString(error)}`;
                                        console.log(message);
                                        reject(new Error(message));
                                    });
                            })
                            .catch(error => {
                                const message = `${caseName}  unHoldCall error,error:${toString(error)}`;
                                console.log(message);
                                reject(new Error(message));
                            });
                    })
                    .catch(error => {
                        const message = `${caseName}  scenceInHolding error,error:${toString(error)}`;
                        console.log(message);
                        reject(new Error(message));
                    });
            })
            .catch(error => {
                const message = `${caseName} scenceInCalling error,error:${toString(error)}`;
                console.log(message);
                reject(new Error(message));
            });
    });
}

// hunup call scence used in third-party applications,we get the information of state when hunup the call
export function scenceInCallingHangupForRegister (options) {
    console.log(`scenceInCallingHangupForRegister options ${toString(options)}`);
    return new Promise((resolve, reject) => {
        let {caseName} = options;
        let callId = null;
        let callChangeData = null;
        let func = null;
        let count = 0;
        if (options.isOnce) {
            func = observer.once;
        } else {
            func = observer.on;
        }
        if (typeof func !== 'function') {
            reject(new Error(`${caseName} observer.once or observer.on is not exit,options:${toString(options)}`));
            return;
        }
        func('callStateChange', {slotId: DEFAULT_SLOT_ID}, (data) => {
            console.log(`${caseName}  callStateChange,data:${toString(data)}`);
            count++;
            callChangeData = data;
        });
        scenceInCalling(options)
            .then(data => {
                options.checkState = CALL_STATUS_DISCONNECTED;
                scenceInHangup({callId:data.callId, ...options})
                    .then(data => {
                        callId = data.callId;
                        let tempCallChangeData = {count, ...callChangeData};
                        console.log(`${caseName} scenceInHangup data,data:${toString(data)},` +
            `tempCallChangeData:${toString(tempCallChangeData)}`);
                        observer.off('callStateChange');
                        resolve(tempCallChangeData);
                    })
                    .catch(error => {
                        const message = `${caseName}  scenceInHangup error,error:${toString(error)}`;
                        console.log(message);
                        reject(new Error(message));
                    });
            })
            .catch(error => {
                const message = `${caseName}  scenceInCalling error,error:${toString(error)}`;
                console.log(message);
                reject(new Error(message));
            });
    });
}

export function isHanupEd (state) {
    return state === CALL_STATUS_DISCONNECTED;
}
