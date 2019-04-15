import Vue from 'vue'
import App from 'app.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';
import router from '../router'
import { store } from '../store/store.js'

Vue.use(Vuetify)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
  })
})
