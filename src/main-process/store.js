const Store = require('electron-store');
const store = new Store();
const _ = require('lodash');


function getOrder(bookName, bookLength) {
  let order = store.get("index-" + bookName)
  if (order === undefined) {
    order = _.range(0, bookLength)
    order = _.shuffle(order)
    store.set("index-" + bookName, order)
  }
  return order
}

function getCurrent(bookName) {
  let current = store.get("current-" + bookName)
  if (current === undefined) {
    current = 0
    store.set("current-" + bookName, current)
  }
  return current
}

function setCurrent(bookName, current){
  store.set("current-"+bookName, current)
}

function getBatch() {
  let batch = store.get("batch")
  if (batch === undefined) {
    batch = 5
    store.set("batch", batch)
  }
  return batch
}

export {
  getOrder, getBatch, getCurrent, setCurrent
}