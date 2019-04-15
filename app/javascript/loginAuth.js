import HTTPService from 'HTTPService'
import { set_auth_token, remove_auth_token } from 'axiosConfig'

const LOGIN_PATH = '/users/sign_in'
const LOGOUT_PATH = '/users/sign_out'
const GET_LOGGED_USER_PATH = '/users/sign_in'
const REGISTER_USER_PATH = '/users'

export default {
  login(context, loginDetails) {
    console.log("Attempting login...")
    context.$store.dispatch('setAttemptedLogin', true)
    var app = context
    const authUser = {}
    return new Promise((resolve, reject) => {
      HTTPService.post(LOGIN_PATH, loginDetails)
      .then(function(response) {
        authUser.data = response.data
        authUser.token = response.token

        set_auth_token(context, authUser)
        console.log('Logged in: ' + context.$store.getters.isLoggedIn)

        context.$store.dispatch('syncSpreadsheets')

        context.$router.push('/dashboard')
        resolve()
      })
      .catch(function(error) {
        console.log("Invalid credentials.")
        console.log(error.data)
        reject()
      })
    })
  },
  logout(context) {
    HTTPService.delete(LOGOUT_PATH)
      .then(function(response) {
        remove_auth_token(context)
        context.$store.dispatch('purgeSavedData')
        context.$router.push('/')
      })
      .catch(e => {
        console.log("Error logging out.")
        console.log(e)
      })
  },
  identifyLoggedUser(store) {
    store.dispatch('setAttemptedLogin', true)
    return new Promise((resolve, reject) => {
      HTTPService.get(GET_LOGGED_USER_PATH)
      .then(function(response) {
        store.dispatch('setLoggedIn', true)
        store.dispatch('setCurrentUser', response.data)
        store.dispatch('syncSpreadsheets')
        resolve()
      })
      .catch(function(error) {
        console.log("Not logged in.")
        store.dispatch('setLoggedIn', false)
        reject()
      })
    })
  },
  register(context, newUser) {
    return new Promise((resolve, reject) => {
      HTTPService.post(REGISTER_USER_PATH, { "user": newUser })
      .then(function(response) {
        context.$store.dispatch('setLoggedIn', true)
        context.$store.dispatch('setCurrentUser', response.data)
        context.$router.push('/dashboard')
        resolve()
      })
      .catch(function(error) {
        reject()
        console.log("Registration failed.")
      })
    })
  }
}
