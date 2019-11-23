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

function getActivePlanName() {
  return store.get("active-plan-name")
}

function getActivePlan() {
  let plans = getAllPlans()
  let name = getActivePlanName()
  for (const plan of plans) {
    if (plan.name === name) {
      return plan
    }
  }
  return undefined
}

function setActivePlanName(name) {
  let plans = getAllPlans()
  for (const plan of plans) {
    if (plan.name === name) {
      store.set("active-plan-name", name)
      return
    }
  }
  throw new Error(`No plan named ${name}.`)
}

function createPlan(name, book, batch, reviewAfterBatch, shuffle) {
  return new Promise((resolve, reject) => {
    let plans = getAllPlans()
    for (const plan of plans) {
      if (plan.name === name) {
        reject("Plan name is duplicated.")
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

function updatePlanCurrent(name, current) {
  let plans = getAllPlans()
  for (const plan of plans) {
    if (plan.name === name) {
      plan.current = current
      return
    }
  }
  throw new Error(`No plan named ${name}.`)
}

function updatePlanReviewCurrent(name, reviewCurrent) {
  let plans = getAllPlans()
  for (const plan of plans) {
    if (plan.name === name) {
      plan.reviewCurrent = reviewCurrent
      return
    }
  }
  throw new Error(`No plan named ${name}.`)

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
  updatePlanCurrent,
  updatePlanReviewCurrent
}


