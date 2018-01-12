import commons = require("./commons");

let tableBody = document.getElementById("tbody");
let clearButton = document.getElementById("reset-button");
let millisecond = 1;
let second = 1000 * millisecond;
let minute = 60 * second;
let hour = 60 * minute;

if (clearButton) {
    clearButton.addEventListener('click', async function (evt) {
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

/**Main runner */
async function main() {
    let tempusObject = await commons.fetchTempusObject();
    let tableBodyString = '';
    // Sort by Active

    tempusObject.tempusArray.sort(function (a, b): number {
        if (a.active > b.active) {
            return -1
        }
        return 1
    })

    tempusObject.tempusArray.forEach(tempus => {
        tableBodyString += `
        <tr class='${returnRowClass(tempus.active)}'>
            <td>${tempus.domain}</td>
            <td>${returnTimeLapsed(tempus.lapsed)}</td>
        </tr>
        `;
    });
    // <td>${Math.round(tempus.lapsed / 1000)}s</td>
    if (tableBody) {
        tableBody.innerHTML = tableBodyString;
    }
}

main();

setInterval(function () {
    main()
}, 2000);

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

function pad(n: number) { return n < 10 ? '0' + n : n }