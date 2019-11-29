const Store = require('electron-store');
const store = new Store();


function isFirstTime() {
    let res = store.get("is-first-time")
    if (res === undefined) {
        store.set("is-first-time", "N")
        return true
    }
    else {
        return false
    }
}

export {
    isFirstTime
}
