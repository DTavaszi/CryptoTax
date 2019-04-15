import Vue from 'vue'
import { BigNumber } from 'bignumber.js';
import moment from 'moment'
import transactionType from 'cryptocurrency/transactionTypes'
// ETH | BTC | USDT for bittrex
// ETH | BTC | USDT | BNB for binance

// coin name at most 4 characters

// ADA | DRGN | BTC | BLZ
//
export default {
  coinName: function (value) {
    if (value.substr(0,4) == "BTC-")
      return value.substr(4)
    if (value.substr(3) == "BTC")
      return value.substr(0,3)
    if (value.substr(4) == "BTC")
      return value.substr(0,4)
  },
  transactionType: function (value) {
      if (value.substr(0,6) == "LIMIT_")
        return value.substr(6)
      else
        return value
  },
  dateFormat: function (value) {
    var date = moment(value)
    return date
  },
  makeBig: function(value) {
    return new BigNumber(value)
  },
  curateFetchData: function(spreadsheets, savedStatus) {
    var app = this
    spreadsheets.forEach(function(spreadsheet) {
      app.curateSingleData(spreadsheet, savedStatus)
    })

    return spreadsheets
  },
  curateSingleData: function(spreadsheet, savedStatus) {
    var app = this
    spreadsheet.saved = savedStatus
    spreadsheet.data_attributes.forEach(function(row) {
      row.date = app.dateFormat(row.date)
      row.fee = app.makeBig(row.fee)
      row.price = app.makeBig(row.price)
      row.quantity = app.makeBig(row.quantity)
    })

    return spreadsheet
  }
}
