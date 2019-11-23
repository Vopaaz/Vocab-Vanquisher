import { ipcMain } from "electron";
import { getAllPlans, getActivePlan, createPlan, setActivePlanName, deletePlan, updateActivePlan } from "./plan";

function replyPlanInfo(event, activePlan) {
  if (activePlan === undefined){
    activePlan = getActivePlan()
  }
  event.reply("plan-info", {
    allPlans: getAllPlans(),
    activePlan: activePlan
  })
}

ipcMain.on("get-plan-info", replyPlanInfo)

ipcMain.on("create-new-plan", (event, arg) => {
  createPlan(arg.name, arg.book, arg.batch, arg.reviewAfterBatch, arg.shuffle).then(() => {
    replyPlanInfo(event)
  }).catch((error) => {
    event.reply("backend-error", error)
  })
})

ipcMain.on("switch-plan", (event, planName) => {
  try {
    setActivePlanName(planName)
    replyPlanInfo(event);
  } catch (error) {
    event.reply("backend-error", error)
  }
})

ipcMain.on("delete-plan", (event, arg) => {
  deletePlan(arg)
  if (getActivePlan() === undefined) {
    let allPlans = getAllPlans()
    if (allPlans.length === 0) {
      setActivePlanName(undefined)
    }
    else {
      setActivePlanName(allPlans[0].name)
    }
  }
  replyPlanInfo(event)
})

ipcMain.on("update-active-plan", (event, plan) => {
  if(getActivePlan().name !== plan.name){
    throw Error("Updated plan is not the active plan.")
  }
  updateActivePlan(plan)
  replyPlanInfo(event, plan)
})
