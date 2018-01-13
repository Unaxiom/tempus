import tabStructs = require('./tab-structs');
import baseStructs = require('./base-structs');

/**Stores the list of URLs */
export const tempusObjectID = "tempusArray";
export const tempusRefresherID = "tempusRefresher";
export const refreshDelayInMins = (1 / 60);
const refreshDelayInMilliSeconds = refreshDelayInMins * 60 * 1000;
export const refreshAlarm = "Alarm";

const firefoxBrowser = 'firefox';
const chromeBrowser = 'chrome';

let browserName: string;
if (navigator.userAgent.indexOf("Chrome") > -1) {
    browserName = chromeBrowser;
} else {
    browserName = firefoxBrowser;
}

// let browser = chrome;

/**Retrieves the storage value */
async function getStorage(): Promise<Object> {
    if (browserName == firefoxBrowser) {
        return await browser.storage.local.get();
    } else if (browserName == chromeBrowser) {
        return new Promise(function (resolve, reject) {
            try {
                chrome.storage.local.get(function (items) {
                    resolve(items);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
    return {};
}

/**Sets the storage */
async function setStorage(storageObject: any): Promise<void> {
    if (browserName == firefoxBrowser) {
        await browser.storage.local.set(storageObject);
    } else if (browserName == chromeBrowser) {
        return new Promise<void>(function (resolve, reject) {
            try {
                chrome.storage.local.set(storageObject, function () {
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

/**Clears the storage */
async function clearStorage(): Promise<void> {
    if (browserName == firefoxBrowser) {
        await browser.storage.local.clear();
    } else if (browserName == chromeBrowser) {
        return new Promise<void>(function (resolve, reject) {
            try {
                chrome.storage.local.clear(function () {
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

/**Adds an alarm to the appropriate browser */
function createBrowserAlarm(alarmName: string, obj: Object, listener: Function) {
    if (browserName == firefoxBrowser) {
        browser.alarms.create(alarmName, obj);
        browser.alarms.onAlarm.addListener(<any>listener);
    } else if (browserName == chromeBrowser) {
        chrome.alarms.create(alarmName, obj);
        chrome.alarms.onAlarm.addListener(<any>listener);
    }
}

/**Clears the browser alarm */
async function clearBrowserAlarm(alarmName: string) {
    if (browserName == firefoxBrowser) {
        await browser.alarms.clear(alarmName);
    } else if (browserName == chromeBrowser) {
        return new Promise<void>(function (resolve, reject) {
            try {
                chrome.alarms.clear(alarmName, function (wasCleared: boolean) {
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        })
    }
}

/**Returns all the browser tabs on the basis of the query object */
export async function queryBrowserTabs(obj: Object): Promise<Object[]> {
    if (browserName == firefoxBrowser) {
        return await browser.tabs.query(obj);
    } else if (browserName == chromeBrowser) {
        return new Promise<Object[]>(function (resolve, reject) {
            try {
                chrome.tabs.query(<any>obj, function (result) {
                    resolve(result);
                })
            } catch (e) {
                reject(e);
            }
        });
    }
    return [];
}

/**Attaches the event handler that is fired when a tab is activated */
export function addBrowserTabsOnActivatedHandler(callback: Function) {
    if (browserName == firefoxBrowser) {
        browser.tabs.onActivated.addListener(<any>callback);
    } else if (browserName == chromeBrowser) {
        chrome.tabs.onActivated.addListener(<any>callback);
    }
}

/**Attaches the event handler that is fired when a tab is removed */
export function addBrowserTabsOnRemovedHandler(callback: Function) {
    if (browserName == firefoxBrowser) {
        browser.tabs.onRemoved.addListener(<any>callback);
    } else if (browserName == chromeBrowser) {
        chrome.tabs.onRemoved.addListener(<any>callback);
    }
}

/**Attaches the event handler that is fired when a tab is updated */
export function addBrowserTabsOnUpdatedHandler(callback: Function) {
    if (browserName == firefoxBrowser) {
        browser.tabs.onUpdated.addListener(<any>callback);
    } else if (browserName == chromeBrowser) {
        chrome.tabs.onUpdated.addListener(<any>callback);
    }
}


/**Returns the tempus object */
export async function fetchTempusObject(): Promise<tabStructs.tempusObject> {
    // Fetch the current data object
    let storageObject: any = await getStorage();
    if (!storageObject[tempusObjectID]) {
        storageObject[tempusObjectID] = {
            id: tempusObjectID,
            tempusArray: []
        };
        // Write the object to the storage
        await setStorage(storageObject);
    }
    storageObject = await getStorage();
    return <tabStructs.tempusObject>(<any>storageObject[tempusObjectID]);
}

/**Returns the tempus refresher object */
export async function fetchTempusRefresher(): Promise<tabStructs.tempusRefresher> {
    // Fetch the current data object
    let storageObject: any = await getStorage();
    if (!storageObject[tempusRefresherID]) {
        storageObject[tempusRefresherID] = {
            id: tempusRefresherID,
            refreshed_at: 0
        };
        // Write the object to the storage
        await setStorage(storageObject);
    }
    storageObject = await getStorage();
    return <tabStructs.tempusRefresher>(<any>storageObject[tempusRefresherID]);
}

/**Checks if there are any unclosed tabs and closes them */
export async function closePreviouslyUnclosedTabs() {
    let tempusObject = await fetchTempusObject();
    let tempusRefresher = await fetchTempusRefresher();
    let currentTimestamp = new Date().getTime();

    if (tempusRefresher.refreshed_at <= 0) {
        // This is the first time this is running
        return
    }
    let timeDelay = currentTimestamp - tempusRefresher.refreshed_at;
    /* Iterate over all the available tempus objects and set their active to false, 
    /* and increase their duration by refreshDelayInMins * 6000
    */
    tempusObject.tempusArray.forEach(tempusStruct => {
        if (tempusStruct.active) {
            tempusStruct.active = false
            if (timeDelay > refreshDelayInMilliSeconds) {
                // If time delay is greater, then the max increment can be the refresh delay
                tempusStruct.lapsed += refreshDelayInMilliSeconds
            } else {
                // If time delay is lower, then set it to time delay
                tempusStruct.lapsed += timeDelay
            }
        }
    });
    await storeTempusObject(tempusObject);
    await storeTempusRefresher(tempusRefresher);
}

/**Returns domain from a passed URL */
export function returnDomainFromURL(url: string | undefined): string {
    let domain: string = '';
    if (!url) {
        return domain
    }
    if (url.startsWith("http")) {
        let temp = url.split("//");
        domain = temp[0] + "//" + temp[1].split("/")[0];
    } else {
        domain = url;
    }
    return domain
}


/**Stores the tempus object in the storage */
export async function storeTempusObject(obj: tabStructs.tempusObject) {
    let localObj = <any>{}
    localObj[tempusObjectID] = obj;
    await setStorage(localObj);
}

/**Stores the tempus refresher in the storage */
export async function storeTempusRefresher(obj: tabStructs.tempusRefresher) {
    let localObj = <any>{}
    localObj[tempusRefresherID] = obj;
    await setStorage(localObj);
}

/**Updates all the open tabs */
export async function updateOpenTabs() {
    // Fetch all the open tabs
    let tabs = await queryBrowserTabs({});
    let tempusObject = await fetchTempusObject();
    let tempusRefresher = await fetchTempusRefresher();

    // Iterate over tempusObject and check if these values are present in the live tabs object
    let tempusArrayDomains: string[] = [];
    for (let j = 0; j < tempusObject.tempusArray.length; j++) {
        let obj = tempusObject.tempusArray[j];
        tempusArrayDomains.push(obj.domain);
    }
    // If any of the tabsDomains do not have an entry in tempusArrayDomains, then add it to the list
    tabs.forEach(function (tab: any) {
        if (tab.url) {
            let domain = returnDomainFromURL(tab.url)
            let index = tempusArrayDomains.indexOf(domain);
            if (index == -1) {
                tempusObject.tempusArray.push({
                    active: tab.active,
                    domain: domain,
                    activatedAt: new Date().getTime(),
                    lapsed: 0
                });
            } else {
                // Set the tab to active
                if (tab.active) {
                    let el = tempusObject.tempusArray[index];
                    el.active = tab.active;
                    tempusObject.tempusArray.splice(index, 1, el);
                }
            }
        }
    });
    await storeTempusObject(tempusObject);
}

// Alarms



/**Creates the alarm */
function createAlarm() {
    createBrowserAlarm(refreshAlarm, { delayInMinutes: refreshDelayInMins }, refreshTimestamp);
}

/**Resets the alarms */
async function resetAlarm() {
    await clearBrowserAlarm(refreshAlarm);
    createAlarm();
}

/**Event handler that handles the alarm fire */
async function refreshTimestamp() {
    // Update the refreshed object
    let tempusRefresher = await fetchTempusRefresher();
    tempusRefresher.refreshed_at = new Date().getTime();

    await storeTempusRefresher(tempusRefresher);

    // Fetch all the objects
    // If any of them are active, increase their duration, as well as set the accessed at timestamp
    let tempusObject = await fetchTempusObject();
    tempusObject.tempusArray.forEach(tempusStruct => {
        if (tempusStruct.active) {
            tempusStruct.lapsed += tempusRefresher.refreshed_at - tempusStruct.activatedAt;
            tempusStruct.activatedAt = tempusRefresher.refreshed_at;
        }
    });

    await storeTempusObject(tempusObject);
    await resetAlarm();
}

/**Handle the first run */
export async function onFirstLoad() {
    await closePreviouslyUnclosedTabs();
    await updateOpenTabs();
    await resetAlarm();
}

/**Deletes the storage */
export async function __deleteStorage() {
    await clearStorage();
}