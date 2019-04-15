import Vue from 'vue'
import { store } from 'store/store.js'
import HTTPService from 'HTTPService'
import Filter from 'columnFilters'

const ROOT_URL = '/spreadsheets'
const POST_SPREADSHEETS_PATH = ROOT_URL
const GET_SPREADSHEETS_PATH = ROOT_URL
const DELETE_SPREADSHEETS_PATH = ROOT_URL

const REMOVE_DATA_PATH = '/data'

const spreadsheet = {
  state: {
    spreadsheets: [],
    computing: 0
  },
  mutations: {
    SET_SPREADSHEETS: function(state, spreadsheets) {
      state.spreadsheets = spreadsheets
    },
    FETCH_SPREADSHEETS: function(state, spreadsheets) {
      spreadsheets.forEach(function(spreadsheet) {
        if (!!!state.spreadsheets.find(element => element.id == spreadsheet.id)) {
          state.spreadsheets.push(spreadsheet)
        }
      })
    },
    ADD_SPREADSHEET: function(state, spreadsheet) {
      state.spreadsheets.push(spreadsheet)
    },
    REMOVE_SPREADSHEET: function(state, spreadsheet) {
      state.spreadsheets.splice(state.spreadsheets.indexOf(spreadsheet), 1)
    },
    REMOVE_ROW: function(state, row) {
      state.spreadsheets.forEach((spreadsheet, i, spreadsheets) =>
        spreadsheets[i].data_attributes = spreadsheet.data_attributes.filter(el => el != row)
      )
    },
    UPDATE_SPREADSHEET: function(state, { oldSpreadsheet, newSpreadsheet }) {
      var index = state.spreadsheets.indexOf(state.spreadsheets.find(element => element === oldSpreadsheet))
      state.spreadsheets.splice(index, 1, newSpreadsheet)
    }
  },
  actions: {
    syncSpreadsheets({commit}) {
      HTTPService.get(GET_SPREADSHEETS_PATH)
      .then(function(response) {
        commit('FETCH_SPREADSHEETS', Filter.curateFetchData(response.data, true))

        // Filter data so that attributes and rows are not the same

        var newSpreadsheets = store.getters.spreadsheets.filter(el => el.id == null)
        newSpreadsheets.forEach(function(spreadsheet) {
          HTTPService.post(POST_SPREADSHEETS_PATH, { spreadsheet: spreadsheet })
          .then(function(nestedResponse) {
            commit('UPDATE_SPREADSHEET', { oldSpreadsheet: spreadsheet, newSpreadsheet: Filter.curateSingleData(nestedResponse.data, true) })
          })
          .catch(function(error) {
            console.log(error)
          })
        })
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    setSpreadsheets({commit}, spreadsheets) {
      commit('SET_SPREADSHEETS', spreadsheets)
    },
    addSpreadsheet({commit}, spreadsheet) {
      if (store.getters.isLoggedIn) {
        HTTPService.post(POST_SPREADSHEETS_PATH, { spreadsheet: spreadsheet })
        .then(function(response) {
          commit('ADD_SPREADSHEET', Filter.curateSingleData(response.data, true))
          Vue.set(spreadsheet, 'saved', true)
        })
        .catch(function(error) {
          console.log(error)
          Vue.set(spreadsheet, 'saved', false)
        })
      } else {
        commit('ADD_SPREADSHEET', spreadsheet)
      }
    },
    removeSpreadsheet({commit}, spreadsheet) {
      if (store.getters.isLoggedIn && spreadsheet.id) {
        HTTPService.delete(DELETE_SPREADSHEETS_PATH + '/' + spreadsheet.id)
        .then(function(response) {
          commit('REMOVE_SPREADSHEET', spreadsheet)
        })
      } else {
        commit('REMOVE_SPREADSHEET', spreadsheet)
      }
    },
    removeRow({commit}, row) {
      if (row.id) {
        HTTPService.delete(REMOVE_DATA_PATH + '/' + row.id)
        .then(function(response) {
          commit('REMOVE_ROW', row)
        })
      } else {
        commit('REMOVE_ROW', row)
      }
    },
    purgeSavedData({commit}) {
      store.getters.spreadsheets.forEach(function(spreadsheet) {
        if (spreadsheet.saved) {
          commit('REMOVE_SPREADSHEET', spreadsheet)
        }
      })
    }
  },
  getters: {
    spreadsheets: state => state.spreadsheets
  }
}

export default spreadsheet
