const _ = require('lodash');

function createOrder(bookLength, shuffle) {
    let order = _.range(0, bookLength)
    if (shuffle) {
        order = _.shuffle(order)
    }
    return order
}

export {
    createOrder
}
