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
    return sortOrder;
}
sortByDomainButton.addEventListener('click', function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        var sortOrder;
        return __generator(this, function (_a) {
            evt.preventDefault();
            tableBody.setAttribute("data-sort-by", "domain");
            sortOrder = toggleSortOrder();
            attachArrow(this, sortOrder, "Domain");
            main();
            return [2 /*return*/];
        });
    });
});
sortByDurationButton.addEventListener('click', function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        var sortOrder;
        return __generator(this, function (_a) {
            evt.preventDefault();
            tableBody.setAttribute("data-sort-by", "duration");
            sortOrder = toggleSortOrder();
            attachArrow(this, sortOrder, "Duration");
            main();
            return [2 /*return*/];
        });
    });
});
sortByStatusButton.addEventListener('click', function (evt) {
    return __awaiter(this, void 0, void 0, function () {
        var sortOrder;
        return __generator(this, function (_a) {
            evt.preventDefault();
            tableBody.setAttribute("data-sort-by", "active");
            sortOrder = toggleSortOrder();
            /**Copy from here */
            attachArrow(this, sortOrder, "Status");
            /**Until here */
            main();
            return [2 /*return*/];
        });
    });
});
function attachArrow(th, sortOrder, type) {
    var i = th.parentElement.getElementsByTagName("i")[0];
    if (sortOrder == "asc") {
        i.className = "fa fa-arrow-up";
    }
    else {
        i.className = "fa fa-arrow-down";
    }
    // Remove it from the current location
    var parentEl = i.parentElement;
    parentEl.removeChild(i);
    // Append it
    th.innerHTML = "";
    th.insertAdjacentHTML("afterbegin", i.outerHTML + type);
}
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
