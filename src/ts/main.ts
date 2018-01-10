import tabStructs = require('./tab-structs');
import baseStructs = require('./base-structs');
// let browser: any;
let text = <HTMLHeadingElement>document.getElementById("internal-text");

async function runSomething() {
    // text.innerHTML += "The extension has loaded<br>";
    // console.log("The extension has run");
    // console.log("Has run again");
    let tabs = await browser.tabs.query({
        status: 'complete'
    });
    console.log(tabs);
    for (var i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        let sentence = `${tab.url}: ${tab.active}`;
        console.log(sentence);
        let data = await browser.storage.local.get();
        // console.log(data);
        if (data["data"] == undefined) {
            console.log("Found undefined");
            data = {};
            data["data"] = sentence
        }
        data["data"] += sentence
        // console.log(data);
        await browser.storage.local.set(data)
    }

    let data = await browser.storage.local.get();
    console.log(data);
    text.innerHTML = <string>data["data"];
    await browser.storage.local.clear();
    console.log("Cleared data")
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
function handleTabUpdation(tabId: number, changeInfo: baseStructs.changeInfo, tab: browser.tabs.Tab) {
    let sentence = `Tab has been updated Status: ${tab.status}, URL: ${changeInfo.url}<br>`;
    text.innerHTML += sentence
    if (changeInfo.status === "complete") {
        // Get all the tabs here
        let sentence = `New tab -> ${tab.url}`;
        text.innerHTML += sentence;

    }
    // console.log("Tab updated");
    // console.log(tabInfo.tabId, tabInfo.changeInfo, tabInfo.tab);
}

// Create the event handler for onActivated
browser.tabs.onActivated.addListener(async function (obj: any) {
    let sentence = `${obj.tabId} is the new activation`;
    console.log(sentence);
    let temp = await browser.tabs.query({
        windowId: obj.windowId,
        index: obj.tabId,
    });
    console.log(temp);
    text.innerHTML += sentence;
});

// Create the event handler for onUpdated
browser.tabs.onUpdated.addListener(handleTabUpdation)



