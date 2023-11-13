<<<<<<< HEAD
export const env = "live"
=======
import DeviceInfo from "react-native-device-info"

export const env = "dev"
>>>>>>> 3895080f18a1bdb0fef2423f93bca610fdd7463f

const URLS = {
    live: "https://apiqbuygreen.diginestsolutions.in/public/api/",
    testing: "https://qbuygreenapi.diginestsolutions.in/public/api/",
    dev: "https://apiqbuypanda.diginestsolutions.in/public/api/"
}

const IMG_BASEPATH = {
    live: "https://apiqbuygreen.diginestsolutions.in/public/",
    testing: "https://qbuygreenapi.diginestsolutions.in/public/",
    dev: "https://apiqbuypanda.diginestsolutions.in/public/"
}

export const mode = "fashion" //"green" // "fashion" // "panda"

export const BUNDLE_ID = DeviceInfo.getBundleId()?.replace("com.qbuystoreapp.", "");


export const BASE_URL = URLS[env]

export const IMG_URL = IMG_BASEPATH[env]

export const location = [8.5728749, 76.8636977];