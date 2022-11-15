import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store( {
  state: {
    modalShow: false
  },
  mutations: {
    setModalShow(state) {
      state.modalShow = !state.modalShow
    }
  },
  actions: {},
  getters: {}
})