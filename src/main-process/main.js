import { ipcMain } from "electron";
import { getAllPlans, getActivePlan, createPlan, setActivePlanName } from "./plan";

function replyPlanInfo(event) {
  event.reply("plan-info", {
    allPlans: getAllPlans(),
    activePlan: getActivePlan()
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


ipcMain.on("get-current-batch", (event) => {
  let plan = getActivePlan()
  if (plan === undefined) {
    event.reply("backend-error", "Please create a plan first!")
    return
  }
  let res = []
  if (plan.on === "current") {
    for (let i = 0; i < plan.batch && plan.current + i < plan.order.length; i++) {
      res.push(plan.data[plan.order[plan.current + i]])
    }
  }
  else {
    for (let i = 0; i < plan.batch && plan.reviewCurrent + i < plan.order.length; i++) {
      res.push(plan.data[plan.order[plan.reviewCurrent + i]])
    }
    event.reply("current-batch", res)
  }
})
