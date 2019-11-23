import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  },
  actions: {
  },
  modules: {
  }
})
