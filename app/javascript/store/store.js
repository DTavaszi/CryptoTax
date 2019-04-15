import Vue from 'vue'
import Vuex from 'vuex'

import authentication from './modules/authentication'
import spreadsheet from './modules/spreadsheet'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    authentication,
    spreadsheet
  }
})
