<template>
  <v-app id="inspire">
    <!-- Navigation Bar, excluding the drawer (only icon included) -->
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <i class="fab fa-bitcoin logo"></i>
          CryptoTax
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in navbarItems" :to="item.link" :key="item.title">
          {{ item.title }}

          <v-badge v-if="item.badge" :color="item.badge.color">
            <span slot="badge"> {{ item.badge.text }} </span>
          </v-badge>

          <v-icon v-if="item.icon" :color="item.icon.color" style="margin-left: 5px;">{{ item.icon.text }}</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- This is where other components will be loaded -->
    <router-view></router-view>
    <!-- -->

    <!-- ADD DRAWER BELOW IF YOU WANT TO -->

    <!-- Footer -->
    <!--
    <v-footer app fixed height="auto" class="deep-purple darken-1">
      <v-layout row wrap justify-center>
        <v-btn color="white" flat v-for="row in rows" :to="row.link" :key="row.title">
          {{ row.title }}
        </v-btn>
        <v-flex xs12 py-3 text-xs-center white--text>
          &copy;2018 — <strong>CryptoTax</strong>
        </v-flex>
      </v-layout>
    </v-footer>
    -->
  </v-app>
</template>

<script>
export default {
  // Footer setup
  data: () => ({
    // Footer Vue Template https://vuetifyjs.com/en/components/footer
    // icons: ['fab fa-facebook', 'fab fa-twitter', 'fab fa-google-plus', 'fab fa-linkedin', 'fab fa-instagram'],
    rows: [
      { title: 'Home', link: "/home" },
      { title: 'About Us', link: "/about" },
      { title: 'Contact Us', link: "/contact" }
    ]
  }),
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    navbarItems: function () {
      var items = [
        { title: "Contact Us", link: "/contact" },
        { title: "About Us", link: "/about" },
        { title: "Dashboard", link: "/dashboard", badge: { color: this.spreadsheetsLength > 0 ? 'purple' : 'grey', text: this.spreadsheetsLength } }
      ]

      var login_items = [
        { title: "Login", link: "/login" },
        { title: "Register", link: "/register"}
      ]

      var logout_items = [
        { title: "Logout", link: "/logout", icon: { color: 'red', text: 'exit_to_app' } }
      ]

      if (!this.isLoggedIn) {
        items = items.concat(login_items)
      } else {
        items = items.concat(logout_items)
      }

      return items
    },
    spreadsheetsLength: function () {
      return this.$store.getters.spreadsheets.length
    }
  }
}
</script>

<style scoped>
</style>
