import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activePlan: undefined,
    allPlans: undefined
  },
  mutations: {
    setActivePlan(state, plan) {
      state.activePlan = plan
    },
    setAllPlans(state, plans) {
      state.allPlans = plans
    },
  },
  actions: {
  },
  modules: {
  }
})
