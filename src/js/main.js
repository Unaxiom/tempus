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
// let browser: any;
var text = document.getElementById("internal-text");
function runSomething() {
    return __awaiter(this, void 0, void 0, function () {
        var tabs, i, tab, sentence, data_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.tabs.query({
                        status: 'complete'
                    })];
                case 1:
                    tabs = _a.sent();
                    console.log(tabs);
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < tabs.length)) return [3 /*break*/, 6];
                    tab = tabs[i];
                    sentence = tab.url + ": " + tab.active;
                    console.log(sentence);
                    return [4 /*yield*/, browser.storage.local.get()];
                case 3:
                    data_1 = _a.sent();
                    // console.log(data);
                    if (data_1["data"] == undefined) {
                        console.log("Found undefined");
                        data_1 = {};
                        data_1["data"] = sentence;
                    }
                    data_1["data"] += sentence;
                    // console.log(data);
                    return [4 /*yield*/, browser.storage.local.set(data_1)];
                case 4:
                    // console.log(data);
                    _a.sent();
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6: return [4 /*yield*/, browser.storage.local.get()];
                case 7:
                    data = _a.sent();
                    console.log(data);
                    text.innerHTML = data["data"];
                    return [4 /*yield*/, browser.storage.local.clear()];
                case 8:
                    _a.sent();
                    console.log("Cleared data");
                    return [2 /*return*/];
            }
        });
    });
}
// runSomething();
/**Handles a tab activation event of the browser */
// function handleTabActivation(object{ tabId: number, windowId: number }) {
//     text.innerHTML += "Tab has been activated<br>";
//     // console.log("Tab activated");
//     // console.log("Tab ID is " + tabInfo.tabId);
//     // console.log("Window ID is " + tabInfo.windowId);
// }
/**Handles a tab updation event of the browser */
function handleTabUpdation(tabId, changeInfo, tab) {
    var sentence = "Tab has been updated Status: " + tab.status + ", URL: " + changeInfo.url + "<br>";
    text.innerHTML += sentence;
    if (changeInfo.status === "complete") {
        // Get all the tabs here
        var sentence_1 = "New tab -> " + tab.url;
        text.innerHTML += sentence_1;
    }
    // console.log("Tab updated");
    // console.log(tabInfo.tabId, tabInfo.changeInfo, tabInfo.tab);
}
// Create the event handler for onActivated
browser.tabs.onActivated.addListener(function (obj) {
    return __awaiter(this, void 0, void 0, function () {
        var sentence, temp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sentence = obj.tabId + " is the new activation";
                    console.log(sentence);
                    return [4 /*yield*/, browser.tabs.query({
                            windowId: obj.windowId,
                            index: obj.tabId,
                        })];
                case 1:
                    temp = _a.sent();
                    console.log(temp);
                    text.innerHTML += sentence;
                    return [2 /*return*/];
            }
        });
    });
});
// Create the event handler for onUpdated
browser.tabs.onUpdated.addListener(handleTabUpdation);
