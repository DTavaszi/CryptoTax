<template>
  <v-app>
    <template v-if = "loggedIn">
       <v-btn dark color="grey darken-3"@click="logout()"> Logout </v-btn>
    </template>
    <template v-if="!loggedIn">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="grey darken-3">
                  <v-toolbar-title>Registration</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <form v-on:submit.prevent="register()">
                  <v-card-text>
                      <v-text-field
                        v-model="newUser.email"
                        label="Email"
                        :rules="emailRules"
                        :error-messages="emailValidation"
                        type="email"
                        prepend-icon="email"
                        required>
                      </v-text-field>
                      <v-text-field
                        v-model="newUser.password"
                        label="Password"
                        :rules="passwordRules"
                        type="password"
                        prepend-icon="lock"
                        required>
                      </v-text-field>
                      <v-text-field
                        v-model="newUser.password_confirmation"
                        label="Password"
                        :rules="confirmationRules"
                        type="password"
                        prepend-icon="lock"
                        required>
                      </v-text-field>
                      <v-btn dark color="purple darken-3" type="submit">Register</v-btn>
                      Already registered?
                      <router-link to="/login">Login</router-link>
                  </v-card-text>
                </form>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </template>
  </v-app>
</template>

<script>

import loginAuth from 'loginAuth'

export default {
  data: function() {
    return {
      newUser: {
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
      },
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length > 5) || 'Must be 6 characters or longer, please add ' + (6 - v.length) + ' characters'
      ],
      confirmationRules: [
        v => !!v || 'Please confirm password',
        v => (v && v == this.newUser.password) || 'Passwords do not match'
      ],
      emailValidation: []
    }
  },
  computed: {
    loggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    register: function() {
      var app = this
      loginAuth.register(this, this.newUser)
      .then(function(response) {
        app.emailValidation = []
      })
      .catch(function(error) {
        app.emailValidation = ['An account already exists with this e-mail']
      })
    },
    logout: function() {
      loginAuth.logout(this)
    }
  }
}
</script>

<style scoped>
</style>
