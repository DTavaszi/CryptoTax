<template>
    <v-layout fill-height>
      <v-navigation-drawer permanent class="dashboard-sidenav">
        <v-divider></v-divider>
        <v-toolbar flat>
          <span class="title">
            Spreadsheets
          </span>
          <Reader @load="rawData = $event"></Reader>
        </v-toolbar>

        <v-toolbar class="button">
          <v-btn :outline="spreadsheets.length > 0" :color="spreadsheets.length > 0 ? 'success' : null" @click="computeGains()">
            <v-progress-circular v-if="isComputing" size="24" indeterminate color="purple"></v-progress-circular>
            <template v-else>
              Compute
              <v-icon>computer</v-icon>
            </template>
          </v-btn>
        </v-toolbar>

        <v-toolbar class="button">
          <v-btn @click="toggleDetails()">
            <template v-if="showDetails">
              Hide Details
            </template>
            <template v-else>
              Show Details
            </template>
          </v-btn>
        </v-toolbar>
        <v-toolbar class="button">
          <v-btn :color="!!!selectedSpreadsheet ? null : 'amber'" @click="selectSpreadsheet(null)"> view all </v-btn>
        </v-toolbar>

        <v-alert outline color="info" icon="info" :value="spreadsheets.length == 0">
          Upload some spreadsheets
        </v-alert>

        <div v-for="spreadsheet in spreadsheets" class="item">
          <div class="clickable" @click="selectSpreadsheet(spreadsheet)"></div>

          <v-tooltip class="save" v-if="spreadsheet.saved" bottom>
            <i slot="activator" class="fas fa-check-circle"></i>
            <span>Data stored successfully</span>
          </v-tooltip>
          <a>
            {{ spreadsheet.fileName }}
          </a>

          <div class="remove-spreadsheet">
            <v-tooltip right>
              <v-btn slot="activator"  small class="small-btn" color="error" @click="removeSpreadsheet(spreadsheet)"> &times; </v-btn>
              <span>Remove</span>
            </v-tooltip>
          </div>
        </div>
      </v-navigation-drawer>

      <v-content>
        <v-container>
            <v-alert v-if="!isLoggedIn" outline color="warning" icon="warning" :value="!storingData">
              Data will not be stored.

              <router-link to="/login" tag="span" class="router">
                Click here to login and save
              </router-link>
            </v-alert>
            <v-data-table :headers="headers" :items="tableSpreadsheets" hide-actions class="elevation-1">
              <template slot="items" slot-scope="props">
                <td :class='classData'>{{ props.item.date.format('YYYY-MM-DD') }}</td>
                <td :class='classData' class="text-xs-left">{{ props.item.coin }}</td>
                <td :class='classData' class="text-xs-left">{{ props.item.transactionType }}</td>
                <td :class='classData' class="text-xs-left">{{ props.item.quantity.toString() }}</td>
                <td :class='classData' class="text-xs-left">{{ props.item.price.toString() }}</td>
                <td :class='classData' class="text-xs-left">{{ props.item.fee.toString() }}</td>
                <td :class='classData' class="text-xs-left">{{ props.item.rate }}</td>
                <template v-if="showDetails">
                  <td class="text-xs-left">{{ props.item.acb ? props.item.acb.toFixed(2).toString() : null }}</td>
                  <td class="text-xs-left">{{ props.item.pod ? props.item.pod.toFixed(2).toString() : null }}</td>
                  <td class="text-xs-left">{{ props.item.totalCoinQuantity ? props.item.totalCoinQuantity.toFixed(2).toString() : null }}</td>
                  <td class="text-xs-left">{{ props.item.acbPerCoin ? props.item.acbPerCoin.toFixed(2).toString() : null }}</td>
                  <td class="text-xs-left">{{ props.item.order ? props.item.order : null }}</td>
                  <td class="text-xs-left">{{ props.item.capitalGainLoss ? props.item.capitalGainLoss.toString() : null }}</td>
                </template>
                <template v-else>
                  <td class="text-xs-left">{{ props.item.capitalGainLoss ? props.item.capitalGainLoss.toFixed(2).toString() + ' CAD' : null }}</td>
                </template>
                <td class="text-xs-left">
                  <v-tooltip left>
                    <v-btn slot="activator" small class="small-btn" @click="removeRow(props.item)" color="error"> &times; </v-btn>
                    <span>Remove</span>
                  </v-tooltip>
                </td>
              </template>
            </v-data-table>
        </v-container>
      </v-content>
  </v-layout>
</template>

<script>
import Reader from 'components/Reader'
import CSVReader from 'CSVReader'
import standardize from 'standardize'
import capitalGains from 'cryptocurrency/capitalGains'
import currencies from 'cryptocurrency/currencies'
import transactionTypes from 'cryptocurrency/transactionTypes'
import { BigNumber } from 'bignumber.js';
import moment from 'moment'

export default {
  data: function () {
    return {
      rawData: '',
      selectedSpreadsheet: null,
      isComputing: false,
      showDetails: false
    }
  },
  computed: {
    spreadsheets: function () {
      return this.$store.getters.spreadsheets.slice()
    },
    tableSpreadsheets: function () {
      if (this.selectedSpreadsheet == null) {
        return this.getMergedSpreadsheetsData()
      } else {
        return this.selectedSpreadsheet.data_attributes
      }
    },
    storingData: function () {
      return this.$store.getters.storingData
    },
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    headers: function () {
      var headers = [
        {
          text: 'Date',
          align: 'left',
          sortable: true,
          value: 'date'
        },
        { text: "Coin", value: 'coin'},
        { text: 'Type', value: 'transactionType' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Total', value: 'price' },
        { text: 'Fees', value: 'fee' },
        { text: 'Rate', value: 'rate' }
      ]

      var detailedHeaders = [
        { text: 'ACB', value: 'acb'},
        { text: 'POD', value: 'pod'},
        { text: 'Total Coin Quantity', value: 'totalCoinQuantity'},
        { text: 'ACB / Coin', value: 'acbPerCoin'},
        { text: 'Calculation Order', value: 'order'}
      ]

      var remainingHeaders = [
        { text: 'Capital Gain / Loss', value: 'capitalGainLoss'},
        { text: '', value: '' }
      ]

      if (this.showDetails) {
        headers = [...headers, ...detailedHeaders]
      }

      headers = [...headers, ...remainingHeaders]

      return headers
    },
    classData: function() {
      return { 'invert': this.showDetails }
    }
  },
  watch: {
    rawData: function (value) {
      var dirtyData = CSVReader.formatToJSON(value.data_attributes)
      dirtyData = standardize(dirtyData)

      this.$store.dispatch('addSpreadsheet', { fileName: value.fileName, data_attributes: dirtyData })
    }
  },
  methods: {
    removeSpreadsheet: function(spreadsheet) {
      if (this.spreadsheets.length == 0 || this.selectedSpreadsheet == spreadsheet) {
        this.selectedSpreadsheet = null
      }

      this.$store.dispatch('removeSpreadsheet', spreadsheet)
    },
    removeRow: function(row) {
      this.$store.dispatch('removeRow', row)
    },
    selectSpreadsheet: function(spreadsheet) {
      while (document.getElementsByClassName('clickable selected').length > 0) {
        document.getElementsByClassName('clickable selected')[0].classList.remove('selected')
      }

      event.target.classList.add('selected')
      this.selectedSpreadsheet = spreadsheet
    },
    getMergedSpreadsheetsData: function() {
      var output = []

      this.spreadsheets.forEach(element => output = output.concat(element.data_attributes))

      output = output.sort(function(a, b) {
        return a.date - b.date
      })

      return output
    },
    computeGains: function() {
      this.isComputing = true
      var app = this

      var spreadsheets = this.getMergedSpreadsheetsData(this.tableSpreadsheets)
      capitalGains.addRate(this.spreadsheets)
      .then(function(response) {
        capitalGains.computeGains(spreadsheets)
        app.isComputing = false
      })
      .catch(function(error) {
        capitalGains.computeGains(spreadsheets)
        app.isComputing = false
      })
    },
    toggleDetails: function() {
      this.showDetails = !this.showDetails
    }
  },
  components: {
    Reader
  }
}
</script>
