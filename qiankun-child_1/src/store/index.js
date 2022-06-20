import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    parentProps: {}
  },
  getters: {
  },
  mutations: {
    SET_PARENT_PROPS (state, data = {}) {
      state.parentProps = data
    }
  },
  actions: {
  },
  modules: {
  }
})
