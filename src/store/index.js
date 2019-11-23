import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer } from "electron";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePlan: undefined,
    allPlans: undefined,
    hasModal: false
  },
  mutations: {
    setActivePlan(state, plan) {
      state.activePlan = plan
    },
    setAllPlans(state, plans) {
      state.allPlans = plans
    },
    openModal(state) {
      state.hasModal = true
    },
    closeModal(state) {
      state.hasModal = false
    },
    nextBatch(state) {
      let plan = state.activePlan
      if (plan.on === "current") {
        plan.current += plan.batch
        if ((plan.current - plan.reviewCurrent) / plan.batch >= plan.reviewAfterBatch) {
          plan.on = "review"
        }
      } else {
        plan.reviewCurrent += plan.batch
        if (plan.reviewCurrent >= plan.current) {
          plan.on = "current"
        }
      }
      ipcRenderer.send("update-active-plan", plan)
    }
  },
  actions: {
  },
  modules: {
  }
})
