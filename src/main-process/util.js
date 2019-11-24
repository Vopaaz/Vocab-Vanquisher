const _ = require('lodash');

const Store = require('electron-store');
const store = new Store();

function createOrder(bookLength, shuffle) {
    let order = _.range(0, bookLength)
    if (shuffle) {
        order = _.shuffle(order)
    }
    return order
}

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
    createOrder,
    isFirstTime
}
