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
var tableBody = document.getElementById("tbody");
var resetButton = document.getElementById("reset-button");
var sortByDomainButton = document.getElementById("sort-by-domain");
var sortByDurationButton = document.getElementById("sort-by-duration");
var sortByStatusButton = document.getElementById("sort-by-active");
var millisecond = 1;
var second = 1000 * millisecond;
var minute = 60 * second;
var hour = 60 * minute;
if (resetButton) {
    resetButton.addEventListener('click', function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        evt.preventDefault();
                        return [4 /*yield*/, commons.__deleteStorage()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, commons.closePreviouslyUnclosedTabs()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, commons.updateOpenTabs()];
                    case 3:
                        _a.sent();
                        if (tableBody) {
                            tableBody.innerHTML = "";
                        }
                        main();
                        return [2 /*return*/];
                }
            });
        });
    });
}
/**Toggles the sort order */
function toggleSortOrder() {
    var sortOrder = tableBody.getAttribute("data-sort-order");
    if (sortOrder == "asc") {
        sortOrder = "desc";
    }
    else {
        sortOrder = "asc";
    }
    tableBody.setAttribute("data-sort-order", sortOrder);
}
sortByDomainButton.addEventListener('click', function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            evt.preventDefault();
            tableBody.setAttribute("data-sort-by", "domain");
            toggleSortOrder();
            main();
            return [2 /*return*/];
        });
    });
});
sortByDurationButton.addEventListener('click', function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            evt.preventDefault();
            tableBody.setAttribute("data-sort-by", "duration");
            toggleSortOrder();
            main();
            return [2 /*return*/];
        });
    });
});
sortByStatusButton.addEventListener('click', function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            evt.preventDefault();
            tableBody.setAttribute("data-sort-by", "active");
            toggleSortOrder();
            main();
            return [2 /*return*/];
        });
    });
});
/**Main runner */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var tempusObject, sortOrder, sortBy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, commons.fetchTempusObject()];
                case 1:
                    tempusObject = _a.sent();
                    sortOrder = tableBody.getAttribute("data-sort-order");
                    sortBy = tableBody.getAttribute("data-sort-by");
                    // Sort by Active
                    tempusObject.tempusArray.sort(function (a, b) {
                        if (sortBy == "duration") {
                            return sortByDuration(a, b, sortOrder);
                        }
                        else if (sortBy == "domain") {
                            return sortByDomain(a, b, sortOrder);
                        }
                        return sortByActive(a, b, sortOrder);
                    });
                    renderTable(tempusObject);
                    return [2 /*return*/];
            }
        });
    });
}
/**Sorts the tempusArray by Domain */
function sortByDomain(a, b, order) {
    if (!order) {
        order = 'asc';
    }
    if (a.domain > b.domain) {
        if (order == "asc") {
            return -1;
        }
        else {
            return 1;
        }
    }
    if (order == "asc") {
        return 1;
    }
    return -1;
}
/**Sorts the tempusArray by Duration */
function sortByDuration(a, b, order) {
    if (!order) {
        order = 'asc';
    }
    if (a.lapsed > b.lapsed) {
        if (order == "asc") {
            return -1;
        }
        else {
            return 1;
        }
    }
    if (order == "asc") {
        return 1;
    }
    return -1;
}
/**Sorts the tempusArray by ACTIVE */
function sortByActive(a, b, order) {
    if (!order) {
        order = 'asc';
    }
    if (a.active > b.active) {
        if (order == "asc") {
            return -1;
        }
        else {
            return 1;
        }
    }
    if (order == "asc") {
        return 1;
    }
    return -1;
}
/**Renders the table displaying the domain and duration */
function renderTable(tempusObject) {
    var tableBodyString = '';
    tempusObject.tempusArray.forEach(function (tempus) {
        tableBodyString += "\n        <tr class='" + returnRowClass(tempus.active) + "'>\n            <td>" + tempus.domain + "</td>\n            <td>" + returnTimeLapsed(tempus.lapsed) + "</td>\n            <td>" + returnActiveStatus(tempus.active) + "</td>\n        </tr>\n        ";
    });
    // <td>${Math.round(tempus.lapsed / 1000)}s</td>
    if (tableBody) {
        tableBody.innerHTML = tableBodyString;
    }
}
/**Returns the active class color depending on the status */
function returnRowClass(active) {
    if (active) {
        return 'green';
    }
    return '';
}
/**Returns the time lapsed in the following format:
 * If less than 1 min, format will be Xs
 * If greater than 1 min and less than 1 hour, format will be XX:YYm
 * Otherwise, will be XX:YY:ZZh */
function returnTimeLapsed(lapsed) {
    if (lapsed < minute) {
        return Math.round(lapsed / second).toString() + "s";
    }
    else if (lapsed < hour) {
        return pad(Math.round(lapsed / minute)).toString() + ":" + pad(Math.round((lapsed % minute) / second)).toString() + "m";
    }
    var h = Math.round(lapsed / hour);
    var m = Math.round(lapsed % h);
    var s = Math.round((m % minute) / second);
    m = Math.round(m / minute);
    return pad(h).toString() + ":" + pad(m).toString() + ":" + pad(s).toString() + "h";
}
/**Returns the ACTIVE state */
function returnActiveStatus(active) {
    if (active) {
        return "Active";
    }
    return "Inactive";
}
/**Returns a padded number */
function pad(n) {
    return n < 10 ? '0' + n : n;
}
main();
setInterval(function () {
    main();
}, 2000);

},{"./commons":1}]},{},[2])

//# sourceMappingURL=ui.src.js.map
