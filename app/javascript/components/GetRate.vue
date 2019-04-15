<template>
  <v-layout align-center justify-center>
    <div>
      <h1> Get Rate </h1>
      <v-layout align-center justify-center>
        <v-text-field v-model="date" label="Date (yyyy-mm-dd)"></v-text-field>
        <v-btn @click="getRate(date)"> Get Rate </v-btn>
        <v-text-field v-model="rate" label="Rate"></v-text-field>
      </v-layout>
      <v-text-field v-model="disclaimer" label="Disclaimer"></v-text-field>
      <span> Powered by <a href="https://www.coindesk.com/price/"> CoinDesk </a> </span>
      <div>
        <h1> Math test </h1>
        <v-text-field v-model="input1" label="input1"></v-text-field>
        <v-text-field v-model="input2" label="input2"></v-text-field>
        <v-btn @click="multiply()"> Multiply </v-btn>
        <h2> Standard </h2>
        <v-text-field v-model="output1" label="output1"></v-text-field>
        <h2> BigNum </h2>
        <v-text-field v-model="output2" label="output2"></v-text-field>
      </div>
    </div>
  </v-layout>
</template>

<script>
import bpiService from 'bpiService'
import {BigNumber} from 'bignumber.js';

export default {
  data: function () {
		return {
			date: '2018-01-12',
			rate: 0,
			disclaimer: '',
      input1: .1,
      input2: .2,
      output1: 0,
      output2: 0
		}
	},
	methods: {
    multiply: function() {
      this.output1 = this.input1 * this.input2

      var x = new BigNumber(this.input1)
      this.output2 = x.multipliedBy(this.input2)
    },
		getRate: function (date) {
			var app = this
			bpiService.get_rate(date)
			.then(function(response) {
				app.rate = response.bpi[date]
				app.disclaimer = response.disclaimer
				console.log("response: ")
				console.log(response)
			})
			.catch(function(error) {
				console.log(error)
			})

		}
	}
}
</script>
