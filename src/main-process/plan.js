const Store = require('electron-store');
const store = new Store();
import { readVocabBook } from "./reader";
import { createOrder } from "./util";

function getAllPlans() {
  let plans = store.get("plans")
  if (plans === undefined) {
    plans = []
    store.set("plans", plans)
  }
  return plans
}

function setAllPlans(allPlans) {
  store.set("plans", allPlans)
}

function getActivePlanName() {
  return store.get("active-plan-name")
}

function getActivePlan() {
  return getPlanByName(getActivePlanName())
}

function getPlanByName(name) {
  let plans = getAllPlans()
  for (const plan of plans) {
    if (plan.name === name) {
      return plan
    }
  }
  return undefined
}

function setActivePlanName(name) {
  if (name === undefined) {
    store.delete("active-plan-name")
  } else {
    store.set("active-plan-name", name)
  }
}

function createPlan(name, book, batch, reviewAfterBatch, shuffle) {
  return new Promise((resolve, reject) => {
    let plans = getAllPlans()
    for (const plan of plans) {
      if (plan.name === name) {
        reject("Plan name is duplicated.")
        return
      }
    }
    readVocabBook(book).then((content) => {
      let order = createOrder(content.length, shuffle)
      let newPlan = Plan(name, book, batch, reviewAfterBatch, shuffle, content, order)
      plans.push(newPlan)
      store.set("plans", plans)
      setActivePlanName(name)
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

function updateActivePlan(plan) {
  let plans = getAllPlans()
  for (let i = 0; i < plans.length; i++) {
    if (plans[i].name === plan.name) {
      plans[i] = plan
    }
    break
  }
  setAllPlans(plans)
}

function deletePlan(plan) {
  let planName
  if (typeof plan === "string") {
    planName = plan
  } else {
    planName = plan.name
  }
  let allPlans = getAllPlans()
  let restPlans = allPlans.filter((p) => {
    return p.name !== planName
  })
  setAllPlans(restPlans)
}

function Plan(name, book, batch, reviewAfterBatch, shuffle, data, order) {
  return {
    name,
    book,
    batch,
    reviewAfterBatch,
    shuffle,
    data,
    order,
    on: "current",
    current: 0,
    reviewCurrent: 0
  }
}

export {
  getAllPlans,
  createPlan,
  setActivePlanName,
  getActivePlan,
  updateActivePlan,
  deletePlan
}


