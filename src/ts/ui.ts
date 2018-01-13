import commons = require("./commons");
import { tempusObject } from "./tab-structs";
import { tempusStruct } from "./base-structs";

let tableBody = <HTMLTableElement>document.getElementById("tbody");
let resetButton = <HTMLAnchorElement>document.getElementById("reset-button");
let sortByDomainButton = <HTMLTableHeaderCellElement>document.getElementById("sort-by-domain");
let sortByDurationButton = <HTMLTableHeaderCellElement>document.getElementById("sort-by-duration");
let sortByStatusButton = <HTMLTableHeaderCellElement>document.getElementById("sort-by-active");

const millisecond = 1;
const second = 1000 * millisecond;
const minute = 60 * second;
const hour = 60 * minute;

if (resetButton) {
    resetButton.addEventListener('click', async function (evt) {
        evt.preventDefault();
        await commons.__deleteStorage();
        await commons.closePreviouslyUnclosedTabs();
        await commons.updateOpenTabs();
        if (tableBody) {
            tableBody.innerHTML = "";
        }
        main();
    });
}

/**Toggles the sort order */
function toggleSortOrder(): string {
    let sortOrder = tableBody.getAttribute("data-sort-order");
    if (sortOrder == "asc") {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }
    tableBody.setAttribute("data-sort-order", sortOrder);
    return sortOrder
}

sortByDomainButton.addEventListener('click', async function (evt) {
    evt.preventDefault();
    tableBody.setAttribute("data-sort-by", "domain");
    let sortOrder = toggleSortOrder();
    attachArrow(this, sortOrder, "Domain");
    main();
});

sortByDurationButton.addEventListener('click', async function (evt) {
    evt.preventDefault();
    tableBody.setAttribute("data-sort-by", "duration");
    let sortOrder = toggleSortOrder();
    attachArrow(this, sortOrder, "Duration");
    main();
});

sortByStatusButton.addEventListener('click', async function (evt) {
    evt.preventDefault();
    tableBody.setAttribute("data-sort-by", "active");
    let sortOrder = toggleSortOrder();
    /**Copy from here */
    attachArrow(this, sortOrder, "Status");
    /**Until here */
    main();
});

function attachArrow(th: HTMLTableHeaderCellElement, sortOrder: string, type: string) {
    let i = (<HTMLElement>th.parentElement).getElementsByTagName("i")[0];
    if (sortOrder == "asc") {
        i.className = "fa fa-arrow-up";
    } else {
        i.className = "fa fa-arrow-down";
    }
    // Remove it from the current location
    let parentEl = <HTMLElement>i.parentElement;
    parentEl.removeChild(i);
    // Append it
    th.innerHTML = "";
    th.insertAdjacentHTML("afterbegin", i.outerHTML + type);
}

/**Main runner */
async function main() {
    let tempusObject = await commons.fetchTempusObject();
    let sortOrder = tableBody.getAttribute("data-sort-order");
    let sortBy = tableBody.getAttribute("data-sort-by");
    // Sort by Active
    tempusObject.tempusArray.sort(function (a, b): number {
        if (sortBy == "duration") {
            return sortByDuration(a, b, sortOrder);
        } else if (sortBy == "domain") {
            return sortByDomain(a, b, sortOrder);
        }
        return sortByActive(a, b, sortOrder);
    });
    renderTable(tempusObject);
}

/**Sorts the tempusArray by Domain */
function sortByDomain(a: tempusStruct, b: tempusStruct, order: string | null): number {
    if (!order) {
        order = 'asc';
    }
    if (a.domain > b.domain) {
        if (order == "asc") {
            return -1
        } else {
            return 1
        }
    }
    if (order == "asc") {
        return 1
    }
    return -1
}

/**Sorts the tempusArray by Duration */
function sortByDuration(a: tempusStruct, b: tempusStruct, order: string | null): number {
    if (!order) {
        order = 'asc';
    }
    if (a.lapsed > b.lapsed) {
        if (order == "asc") {
            return -1
        } else {
            return 1
        }
    }
    if (order == "asc") {
        return 1
    }
    return -1
}

/**Sorts the tempusArray by ACTIVE */
function sortByActive(a: tempusStruct, b: tempusStruct, order: string | null): number {
    if (!order) {
        order = 'asc';
    }
    if (a.active > b.active) {
        if (order == "asc") {
            return -1
        } else {
            return 1
        }
    }
    if (order == "asc") {
        return 1
    }
    return -1
}

/**Renders the table displaying the domain and duration */
function renderTable(tempusObject: tempusObject) {
    let tableBodyString = '';
    tempusObject.tempusArray.forEach(tempus => {
        tableBodyString += `
        <tr class='${returnRowClass(tempus.active)}'>
            <td>${tempus.domain}</td>
            <td>${returnTimeLapsed(tempus.lapsed)}</td>
            <td>${returnActiveStatus(tempus.active)}</td>
        </tr>
        `;
    });
    // <td>${Math.round(tempus.lapsed / 1000)}s</td>
    if (tableBody) {
        tableBody.innerHTML = tableBodyString;
    }
}

/**Returns the active class color depending on the status */
function returnRowClass(active: boolean): string {
    if (active) {
        return 'green';
    }
    return '';
}

/**Returns the time lapsed in the following format: 
 * If less than 1 min, format will be Xs
 * If greater than 1 min and less than 1 hour, format will be XX:YYm
 * Otherwise, will be XX:YY:ZZh */
function returnTimeLapsed(lapsed: number): string {
    if (lapsed < minute) {
        return Math.round(lapsed / second).toString() + "s";
    } else if (lapsed < hour) {
        return pad(Math.round(lapsed / minute)).toString() + ":" + pad(Math.round((lapsed % minute) / second)).toString() + "m";
    }

    let h = Math.round(lapsed / hour);
    let m = Math.round(lapsed % h);
    let s = Math.round((m % minute) / second);
    m = Math.round(m / minute);
    return pad(h).toString() + ":" + pad(m).toString() + ":" + pad(s).toString() + "h";
}

/**Returns the ACTIVE state */
function returnActiveStatus(active: boolean): string {
    if (active) {
        return "Active"
    }
    return "Inactive"
}

/**Returns a padded number */
function pad(n: number) {
    return n < 10 ? '0' + n : n
}

main();

setInterval(function () {
    main();
}, 2000);