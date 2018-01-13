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
                case 0: return [4 /*yield*/, commons.queryBrowserTabs({
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
commons.addBrowserTabsOnActivatedHandler(recountAllActiveTabs);
// Create the event handler for onRemoved
commons.addBrowserTabsOnRemovedHandler(recountAllActiveTabs);
// Create the event handler for onUpdated
commons.addBrowserTabsOnUpdatedHandler(handleTabUpdation);
commons.onFirstLoad();
