/**Tab's muted info */
export interface mutedInfo {
    extensionId?: string
    muted: boolean
    reason?: "capture" | "extension" | "user"
}

/**Tab's change info */
export interface changeInfo {
    audible?: boolean
    discarded?: boolean
    favIconUrl?: string
    mutedInfo?: mutedInfo
    pinned?: boolean
    status?: string
    title?: string
    url?: string
}

/**Complete Tab info */
export interface tab {
    active: boolean
    audible?: boolean
    autoDiscardable?: boolean
    cookieStoreId?: string
    discarded?: boolean
    favIconUrl?: string
    height?: number
    highlighted: boolean
    id?: number
    incognito: boolean
    index: number
    isArticle: boolean
    isInReaderMode: boolean
    lastAccessed: number
    mutedInfo?: mutedInfo
    openerTabId?: number
    pinned: boolean
    selected: boolean
    sessionId: string
    status?: string
    title?: string
    url?: string
    width?: number
    windowId: number
}

/**Stores the information of each datum object */
export interface tempusStruct {
    /**Stores the domain name */
    domain: string
    /**Stores if this site is currently active */
    active: boolean
    /**Stores the previously activated at timestamp */
    activatedAt: number
    /**Stores the duration of this website */
    lapsed: number
}