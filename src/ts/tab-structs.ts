import baseStructs = require('./base-structs');

/**Tab's active info */
export interface tabActiveInfo {
    tabId: number
    windowId: number
}

/**Represents the object that will be stored in the Storage */
export interface tempusObject {
    id: string
    tempusArray: baseStructs.tempusStruct[]
}

/**Represents the object that will store the refresher timestamp */
export interface tempusRefresher {
    id: string
    refreshed_at: number
}