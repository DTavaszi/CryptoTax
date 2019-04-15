<template>
</template>

<script>
import loginAuth from 'loginAuth'
export default {
  computed: {
    loggedIn: function() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout: function() {
      loginAuth.logout(this)
    }
  },
  created: function () {
    if (this.loggedIn) {
      this.logout()
    }

    this.$router.push('/')
  }
}
</script>

<style scoped>
</style>
