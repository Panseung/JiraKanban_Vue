import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store( {
  state: {
    modalShow: false
  },
  mutations: {
    setModalShow(state, value) {
      state.modalShow = value
    }
  },
  actions: {},
  getters: {}
})