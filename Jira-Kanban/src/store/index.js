import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store( {
  state: {
    modalShow: false
  },
  getters: {
    modalShow( state ) {
      return state.modalShow
    }
  },
  mutations: {
    setModalShow( state, val ) {
      state.modalShow = val
    },
  },
  actions: {
    toggleModalShow( { state, commit } ) {
      commit('setModalShow', !state.modalShow)
    }
  },
})