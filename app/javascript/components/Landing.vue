<template>
   <v-app light>
      <section style="background-color:white">
        <v-container grid-list-xl text-cs-center>
          <v-layout fill-height>
            <v-flex xs6 mt-5>
              <h1 class="display-3">Convienence and Peace of Mind</h1>
              <p class="headline">
                Don't want to stress during tax season? We provide you a fast and easy way of calculating your total Capital Gains or Losses
              </p>
              <router-link to="/dashboard">
                <v-btn class="blue lighten-2" dark large>Get Started</v-btn>
              </router-link>
            </v-flex>
            <v-flex xs6 mt-5 ml-3>
              <img src="../../assets/images/SpreadsheetInterface.png" alt="Spreadsheet UI" height="auto" width="100%">
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-cs-center">
              <h2 class ="display-1">How it works</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">cloud_upload</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Upload</div>
                    </v-card-title>
                    <v-card-text>
                      It's really simple. All you need to do is provide us with a file for one of our supported exchanges. Our system will then figure out how to sort your data and prepare it so it is ready to compute the results of your crypto trades. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Compute</div>
                    </v-card-title>
                    <v-card-text>
                      After your file has been uploaded, all you need to do is click compute. This will automatically calculate your capital gains or losses. Our system figures our these gains or losses by using the Adjusted Cost Base method as required in Canada.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">search</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">The Details</div>
                    </v-card-title>
                    <v-card-text>
                      After your gains or losses have been computed, we allow you to view the results in a simplified table or an advanced table. The simplified version will simply provide you with the end result for your capital gain or loss. The advanced table will show you how we got to those results.
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section style="background-color: white">
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-cs-center">
              <h2 class ="display-1">Supported Exchanges</h2>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text>
                      <img src="../../assets/images/bittrex-logo.png" alt="Bittrex" height="auto" width="100%">
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text>
                      <div mb-5>
                        <img src="../../assets/images/binance-logo.png" alt="Binance" height="auto" width="100%">
                      </div>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
  </v-app>
</template>
