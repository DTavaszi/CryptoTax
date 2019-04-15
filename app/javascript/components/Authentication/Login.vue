<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card>
        <v-toolbar dark color="grey darken-3">
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
          <form v-on:submit.prevent="loginUser()">
            <v-card-text>
              <v-text-field label="Email" v-model="loginDetails.email" :rules="emailRules"
              :error-messages="userValidation" type="email" prepend-icon="email" />

              <v-text-field label="Password" v-model="loginDetails.password" :rules="passwordRules"
              :error-messages="passwordValidation" type="password" prepend-icon="lock" />

              <v-btn dark color="purple darken-3" type="submit">Login</v-btn>
                Not yet registered?
                <router-link to="/register">Register now</router-link>
              </v-card-text>
          </form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import loginAuth from 'loginAuth'
export default {
  data: function() {
    return {
      loginDetails: {
        email: '',
        password: ''
      },
      loginError: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      userValidation: [],
      passwordValidation: []
    }
  },
  computed: {
    loggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    loginUser: function() {
      var app = this
      loginAuth.login(this, this.loginDetails)
      .then(function(response) {
        app.userValidation = []
        app.passwordValidation = []
      })
      .catch(function(error) {
        app.userValidation = ['Invalid login']
        app.passwordValidation = ['']
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
