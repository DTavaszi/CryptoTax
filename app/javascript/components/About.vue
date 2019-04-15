<template>
  <v-content>
    <v-container fluid fill-height class="no-padding">
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3 mt-5>
          <v-card>
            <v-card-text>
              <v-container>
                <div class="landing_text text-xs-left">
                  <h1>About Us</h1>
                  <br/>
                  <font size="3"><p>
                    <strong>CryptoTax</strong> starts with a simple goal: help users to estimate their taxable 
                    earnings from their cryptocurrency investments. </p><p>In recent years, the news media released that the Canada 
                    Revenue Agency characterized cryptocurrency as a <strong>commodity</strong>; however, there was 
                    no tool or service in Canada to help tax payers to evaluate their earnings and transforming 
                    them into Canadian dollars. Since the calculation processes involve certain level of complexity, it could be a 
                    really overwhelming task to tax payers.
                  </p>
                  <p><router-link to="/home">CryptoTax is here to help!</router-link></p>
                  </font>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
