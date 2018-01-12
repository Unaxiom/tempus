import tabStructs = require('./tab-structs');
import baseStructs = require('./base-structs');
import commons = require("./commons");

/**Appends to the list if the object is not already present in the list */
async function appendToTempusObjectArray(object: baseStructs.tempusStruct) {
    let tempusObject = await commons.fetchTempusObject();
    let found = false;
    for (let i = 0; i < tempusObject.tempusArray.length; i++) {
        let temp = tempusObject.tempusArray[i];
        if (temp.domain === object.domain) {
            found = true;
            // Interchange the values
            if (temp.active) {
                // Don't change anything, since this is already being considered
            } else if (object.active) {
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
    await commons.storeTempusObject(tempusObject);
}

/**Sets the active */
async function toggleTabsActiveState(tempusTabs: baseStructs.tempusStruct[], active: boolean) {
    // Sets these tabs to active and sets every other tab to inactive
    let object = await commons.fetchTempusObject();
    let allTabsDomains = object.tempusArray.map(temp => {
        return temp.domain;
    })
    let activeDomains = tempusTabs.map(temp => {
        return temp.domain;
    })

    for (let i = 0; i < allTabsDomains.length; i++) {
        let availableTab = allTabsDomains[i];
        if (activeDomains.indexOf(availableTab) > -1) {
            if (active) {
                object.tempusArray[i].active = true;
                object.tempusArray[i].activatedAt = new Date().getTime();
            } else {
                object.tempusArray[i].active = false;
                object.tempusArray[i].activatedAt = 0;
            }
        } else {
            object.tempusArray[i].active = false;
        }
    }
    await commons.storeTempusObject(object);
}

/**Handles a tab updation event of the browser */
async function handleTabUpdation(tabId: number, changeInfo: baseStructs.changeInfo, tab: browser.tabs.Tab) {
    await commons.closePreviouslyUnclosedTabs();
    await commons.updateOpenTabs();
    if (changeInfo.status === "complete") {
        // Get all the tabs here
        let newTab = <baseStructs.tempusStruct>{
            domain: commons.returnDomainFromURL(tab.url),
            active: tab.active,
            lapsed: 0
        }
        if (newTab.active) {
            newTab.activatedAt = new Date().getTime();
        }
        appendToTempusObjectArray(newTab);
    }
}

/**Function that fetches all the available tabs and processes them */
async function recountAllActiveTabs() {
    let temp = await browser.tabs.query({
        active: true
    });
    let allTabs = temp.map(tab => {
        let localTab = <baseStructs.tempusStruct>{
            domain: commons.returnDomainFromURL(tab.url),
            active: tab.active,
            lapsed: 0,
            activatedAt: 0
        }
        if (localTab.active) {
            localTab.activatedAt = new Date().getTime();
        }
        return localTab
    });
    toggleTabsActiveState(allTabs, true);
}

// Create the event handler for onActivated
browser.tabs.onActivated.addListener(recountAllActiveTabs);

// Create the event handler for onRemoved
browser.tabs.onRemoved.addListener(recountAllActiveTabs);

// Create the event handler for onUpdated
browser.tabs.onUpdated.addListener(handleTabUpdation)

commons.onFirstLoad();