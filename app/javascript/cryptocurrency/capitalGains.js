import Vue from 'vue'
import bpiService from 'bpiService'
import transactionType from 'cryptocurrency/transactionTypes'
import feeTypes from 'cryptocurrency/feeTypes'
import { BigNumber } from 'bignumber.js';
import moment from 'moment'

function getACB(price, fee, rate) {
  var convertedPrice = price.multipliedBy(rate)
  var convertedFee = fee.multipliedBy(rate)
  return convertedPrice.plus(convertedFee)
}

function getPOD(price, rate) {
  return price.multipliedBy(rate)
}

function getCurrencies(spreadsheets) {
  var currencies = new Set()

  spreadsheets.forEach((row) =>
    currencies.add(row.coin)
  )

  return Array.from(currencies)
}

function getDataSize(spreadsheets) {
  var dataSize = 0
  spreadsheets.forEach((spreadsheet) =>
    dataSize += spreadsheet.data_attributes.length
  )
  return dataSize
}

function getFee(row) {
  if (row.feeType == feeTypes.VALUE) {
    return row.fee
  } else {
    return row.fee.multipliedBy(row.price)
  }
}

var order = 0

function computeGainsForCurrency(currency, spreadsheets) {
  var acb = new BigNumber(0)
  var pod = new BigNumber(0)
  var capitalGainLoss = new BigNumber(0)
  var totalCoinQuantity = new BigNumber(0)
  var acbPerCoin = new BigNumber(0)

  spreadsheets.forEach(function(row) {
      if (row.coin == currency) {
        Vue.set(row, 'order', order++)

        var fee = getFee(row)

        if (row.transactionType == transactionType.BUY) {
          acb = acb.plus(getACB(row.price, fee, row.rate))
          totalCoinQuantity = totalCoinQuantity.plus(row.quantity)
          acbPerCoin = acb.dividedBy(totalCoinQuantity)
          Vue.set(row, 'acb', acb)
          Vue.set(row, 'totalCoinQuantity', totalCoinQuantity)
          Vue.set(row, 'acbPerCoin', acbPerCoin)
        } else if (row.transactionType == transactionType.SELL) {

          acb = acb.minus(acbPerCoin.multipliedBy(row.quantity))
          totalCoinQuantity = totalCoinQuantity.minus(row.quantity)
          pod = getPOD(row.price, row.rate)

          var cdnFee = fee.multipliedBy(row.rate)
          capitalGainLoss = pod.minus(cdnFee).minus(acbPerCoin.multipliedBy(row.quantity))

          Vue.set(row, 'acb', acb)
          Vue.set(row, 'pod', pod)
          Vue.set(row, 'totalCoinQuantity', totalCoinQuantity)
          Vue.set(row, 'capitalGainLoss', capitalGainLoss)
        } else {
          Vue.set(row, 'acb', 'unidentified type')
        }
      }
    })
}

export default {
  addRate: function(spreadsheets) {
    return new Promise(function(resolve, reject) {
      if (spreadsheets.length == 0) {
        resolve()
      }

      var resolved_rates = 0
      var dataSize = getDataSize(spreadsheets)
      var fetched_rates = {}

      spreadsheets.forEach((o, i, spreadsheets) =>
      spreadsheets[i].data_attributes.forEach(function(row, j, rows) {
        var date = row.date.format('YYYY-MM-DD')
        var coin = row.coin
        var key = date + '-' +  coin

        if (fetched_rates[key] == null) {
          console.log('Fetching rate for ' + key)
          bpiService.get_rate(date)
          .then(function(response) {
            var rate = response.bpi[date]
            Vue.set(row, 'rate', rate)

            resolved_rates++

            if (resolved_rates == dataSize) {
              //alert(resolved_rates + ' -1- ' + dataSize)
              resolve()
            }
          })
          .catch(function(error) {
            console.log(error)
            reject(error)
          })
        } else {
          var rate = fetched_rates[key]
          console.log('Using prefetched rate ' + fetched_rates[key])
          Vue.set(row, 'rate', rate)

          if (resolved_rates == dataSize) {
            //alert(resolved_rates + ' -2- ' + dataSize)
            resolve()
          }
        }
      }))
    })
  },
  computeGains: function(spreadsheets) {
    var currencies = getCurrencies(spreadsheets)

    order = 0
    for (let currency of currencies) {
      computeGainsForCurrency(currency, spreadsheets)
    }
  }
}
