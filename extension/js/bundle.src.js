(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**Stores the list of URLs */
exports.tempusObjectID = "tempusArray";
exports.tempusRefresherID = "tempusRefresher";
exports.refreshDelayInMins = 1 / 60;
exports.refreshAlarm = "Alarm";
/**Returns the tempus object */
function fetchTempusObject() {
    return __awaiter(this, void 0, void 0, function () {
        var storageObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.storage.local.get()];
                case 1:
                    storageObject = _a.sent();
                    if (!!storageObject[exports.tempusObjectID]) return [3 /*break*/, 3];
                    storageObject[exports.tempusObjectID] = {
                        id: exports.tempusObjectID,
                        tempusArray: []
                    };
                    // Write the object to the storage
                    return [4 /*yield*/, browser.storage.local.set(storageObject)];
                case 2:
                    // Write the object to the storage
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, browser.storage.local.get()];
                case 4:
                    storageObject = _a.sent();
                    return [2 /*return*/, storageObject[exports.tempusObjectID]];
            }
        });
    });
}
exports.fetchTempusObject = fetchTempusObject;
/**Returns the tempus refresher object */
function fetchTempusRefresher() {
    return __awaiter(this, void 0, void 0, function () {
        var storageObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.storage.local.get()];
                case 1:
                    storageObject = _a.sent();
                    if (!!storageObject[exports.tempusRefresherID]) return [3 /*break*/, 3];
                    storageObject[exports.tempusRefresherID] = {
                        id: exports.tempusRefresherID,
                        refreshed_at: 0
                    };
                    // Write the object to the storage
                    return [4 /*yield*/, browser.storage.local.set(storageObject)];
                case 2:
                    // Write the object to the storage
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, browser.storage.local.get()];
                case 4:
                    storageObject = _a.sent();
                    return [2 /*return*/, storageObject[exports.tempusRefresherID]];
            }
        });
    });
}
exports.fetchTempusRefresher = fetchTempusRefresher;
/**Checks if there are any unclosed tabs and closes them */
function closePreviouslyUnclosedTabs() {
    return __awaiter(this, void 0, void 0, function () {
        var tempusObject, tempusRefresher, currentTimestamp, timeDelay;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTempusObject()];
                case 1:
                    tempusObject = _a.sent();
                    return [4 /*yield*/, fetchTempusRefresher()];
                case 2:
                    tempusRefresher = _a.sent();
                    currentTimestamp = new Date().getTime();
                    if (tempusRefresher.refreshed_at <= 0) {
                        // This is the first time this is running
                        return [2 /*return*/];
                    }
                    timeDelay = currentTimestamp - tempusRefresher.refreshed_at;
                    /* Iterate over all the available tempus objects and set their active to false,
                    /* and increase their duration by refreshDelayInMins * 6000
                    */
                    tempusObject.tempusArray.forEach(function (tempusStruct) {
                        if (tempusStruct.active) {
                            tempusStruct.active = false;
                            if (timeDelay > exports.refreshDelayInMins * 60 * 1000) {
                                // If time delay is greater, then the max increment can be the refresh delay
                                tempusStruct.lapsed += exports.refreshDelayInMins * 60 * 1000;
                            }
                            else {
                                // If time delay is lower, then set it to time delay
                                tempusStruct.lapsed += timeDelay;
                            }
                        }
                    });
                    return [4 /*yield*/, storeTempusObject(tempusObject)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, storeTempusRefresher(tempusRefresher)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.closePreviouslyUnclosedTabs = closePreviouslyUnclosedTabs;
/**Returns domain from a passed URL */
function returnDomainFromURL(url) {
    var domain = '';
    if (!url) {
        return domain;
    }
    if (url.startsWith("http")) {
        var temp = url.split("//");
        domain = temp[0] + "//" + temp[1].split("/")[0];
    }
    else {
        domain = url;
    }
    return domain;
}
exports.returnDomainFromURL = returnDomainFromURL;
/**Stores the tempus object in the storage */
function storeTempusObject(obj) {
    return __awaiter(this, void 0, void 0, function () {
        var localObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localObj = {};
                    localObj[exports.tempusObjectID] = obj;
                    return [4 /*yield*/, browser.storage.local.set(localObj)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.storeTempusObject = storeTempusObject;
/**Stores the tempus refresher in the storage */
function storeTempusRefresher(obj) {
    return __awaiter(this, void 0, void 0, function () {
        var localObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localObj = {};
                    localObj[exports.tempusRefresherID] = obj;
                    return [4 /*yield*/, browser.storage.local.set(localObj)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.storeTempusRefresher = storeTempusRefresher;
/**Updates all the open tabs */
function updateOpenTabs() {
    return __awaiter(this, void 0, void 0, function () {
        var tabs, tempusObject, tempusRefresher, tempusArrayDomains, j, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.tabs.query({})];
                case 1:
                    tabs = _a.sent();
                    return [4 /*yield*/, fetchTempusObject()];
                case 2:
                    tempusObject = _a.sent();
                    return [4 /*yield*/, fetchTempusRefresher()];
                case 3:
                    tempusRefresher = _a.sent();
                    tempusArrayDomains = [];
                    for (j = 0; j < tempusObject.tempusArray.length; j++) {
                        obj = tempusObject.tempusArray[j];
                        tempusArrayDomains.push(obj.domain);
                    }
                    // If any of the tabsDomains do not have an entry in tempusArrayDomains, then add it to the list
                    tabs.forEach(function (tab) {
                        if (tab.url) {
                            var domain = returnDomainFromURL(tab.url);
                            var index = tempusArrayDomains.indexOf(domain);
                            if (index == -1) {
                                tempusObject.tempusArray.push({
                                    active: tab.active,
                                    domain: domain,
                                    activatedAt: new Date().getTime(),
                                    lapsed: 0
                                });
                            }
                            else {
                                // Set the tab to active
                                if (tab.active) {
                                    var el = tempusObject.tempusArray[index];
                                    el.active = tab.active;
                                    tempusObject.tempusArray.splice(index, 1, el);
                                }
                            }
                        }
                    });
                    return [4 /*yield*/, storeTempusObject(tempusObject)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateOpenTabs = updateOpenTabs;
// Alarms
/**Creates the alarm */
function createAlarm() {
    browser.alarms.create(exports.refreshAlarm, { delayInMinutes: exports.refreshDelayInMins });
    browser.alarms.onAlarm.addListener(refreshTimestamp);
}
/**Resets the alarms */
function resetAlarm() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.alarms.clear(exports.refreshAlarm)];
                case 1:
                    _a.sent();
                    createAlarm();
                    return [2 /*return*/];
            }
        });
    });
}
/**Event handler that handles the alarm fire */
function refreshTimestamp(alarm) {
    return __awaiter(this, void 0, void 0, function () {
        var tempusRefresher, tempusObject;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTempusRefresher()];
                case 1:
                    tempusRefresher = _a.sent();
                    tempusRefresher.refreshed_at = new Date().getTime();
                    return [4 /*yield*/, storeTempusRefresher(tempusRefresher)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fetchTempusObject()];
                case 3:
                    tempusObject = _a.sent();
                    tempusObject.tempusArray.forEach(function (tempusStruct) {
                        if (tempusStruct.active) {
                            tempusStruct.lapsed += tempusRefresher.refreshed_at - tempusStruct.activatedAt;
                            tempusStruct.activatedAt = tempusRefresher.refreshed_at;
                        }
                    });
                    return [4 /*yield*/, storeTempusObject(tempusObject)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, resetAlarm()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**Handle the first run */
function onFirstLoad() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // await __deleteStorage();
                return [4 /*yield*/, closePreviouslyUnclosedTabs()];
                case 1:
                    // await __deleteStorage();
                    _a.sent();
                    return [4 /*yield*/, updateOpenTabs()];
                case 2:
                    _a.sent();
                    // createAlarm();
                    return [4 /*yield*/, resetAlarm()];
                case 3:
                    // createAlarm();
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.onFirstLoad = onFirstLoad;
/**Deletes the storage */
function __deleteStorage() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.storage.local.clear()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.__deleteStorage = __deleteStorage;

},{}],2:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var commons = require("./commons");
/**Appends to the list if the object is not already present in the list */
function appendToTempusObjectArray(object) {
    return __awaiter(this, void 0, void 0, function () {
        var tempusObject, found, i, temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commons.fetchTempusObject()];
                case 1:
                    tempusObject = _a.sent();
                    found = false;
                    for (i = 0; i < tempusObject.tempusArray.length; i++) {
                        temp = tempusObject.tempusArray[i];
                        if (temp.domain === object.domain) {
                            found = true;
                            // Interchange the values
                            if (temp.active) {
                                // Don't change anything, since this is already being considered
                            }
                            else if (object.active) {
                                temp.active = object.active;
                                temp.activatedAt = object.activatedAt;
                                if (object.lapsed > 0) {
                                    temp.lapsed = object.lapsed | 0;
                                }
                                tempusObject.tempusArray[i] = temp;
                            }
                            break;
                        }
                    }
                    if (!found) {
                        tempusObject.tempusArray.push(object);
                    }
                    return [4 /*yield*/, commons.storeTempusObject(tempusObject)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**Sets the active */
function toggleTabsActiveState(tempusTabs, active) {
    return __awaiter(this, void 0, void 0, function () {
        var object, allTabsDomains, activeDomains, i, availableTab;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commons.fetchTempusObject()];
                case 1:
                    object = _a.sent();
                    allTabsDomains = object.tempusArray.map(function (temp) {
                        return temp.domain;
                    });
                    activeDomains = tempusTabs.map(function (temp) {
                        return temp.domain;
                    });
                    for (i = 0; i < allTabsDomains.length; i++) {
                        availableTab = allTabsDomains[i];
                        if (activeDomains.indexOf(availableTab) > -1) {
                            if (active) {
                                object.tempusArray[i].active = true;
                                object.tempusArray[i].activatedAt = new Date().getTime();
                            }
                            else {
                                object.tempusArray[i].active = false;
                                object.tempusArray[i].activatedAt = 0;
                            }
                        }
                        else {
                            object.tempusArray[i].active = false;
                        }
                    }
                    return [4 /*yield*/, commons.storeTempusObject(object)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**Handles a tab updation event of the browser */
function handleTabUpdation(tabId, changeInfo, tab) {
    return __awaiter(this, void 0, void 0, function () {
        var newTab;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commons.closePreviouslyUnclosedTabs()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, commons.updateOpenTabs()];
                case 2:
                    _a.sent();
                    if (changeInfo.status === "complete") {
                        newTab = {
                            domain: commons.returnDomainFromURL(tab.url),
                            active: tab.active,
                            lapsed: 0
                        };
                        if (newTab.active) {
                            newTab.activatedAt = new Date().getTime();
                        }
                        appendToTempusObjectArray(newTab);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**Function that fetches all the available tabs and processes them */
function recountAllActiveTabs() {
    return __awaiter(this, void 0, void 0, function () {
        var temp, allTabs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.tabs.query({
                        active: true
                    })];
                case 1:
                    temp = _a.sent();
                    allTabs = temp.map(function (tab) {
                        var localTab = {
                            domain: commons.returnDomainFromURL(tab.url),
                            active: tab.active,
                            lapsed: 0,
                            activatedAt: 0
                        };
                        if (localTab.active) {
                            localTab.activatedAt = new Date().getTime();
                        }
                        return localTab;
                    });
                    toggleTabsActiveState(allTabs, true);
                    return [2 /*return*/];
            }
        });
    });
}
// Create the event handler for onActivated
browser.tabs.onActivated.addListener(recountAllActiveTabs);
// Create the event handler for onRemoved
browser.tabs.onRemoved.addListener(recountAllActiveTabs);
// Create the event handler for onUpdated
browser.tabs.onUpdated.addListener(handleTabUpdation);
commons.onFirstLoad();

},{"./commons":1}]},{},[2])

//# sourceMappingURL=bundle.src.js.map