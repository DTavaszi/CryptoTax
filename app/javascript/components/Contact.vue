<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3 mt-5>
      <v-card raised class="contact-us">
        <h1> Contact Us </h1>
        <v-form v-model="valid">
          <v-text-field label="Your Name" v-model="name" :rules="nameRules" required />
          <v-text-field label="E-mail" v-model="email" :rules="emailRules" required />
          <v-text-field label="Message" v-model="message" multi-line :rules="messageRules" :counter="200" required />

          <div v-if="submitted">
            <i class="far fa-check-circle"></i>
            Message sent! <br>
            Thank you for contacting us!
          </div>
          <div v-else>
            <v-btn color="info" @click="submit" :disabled="!valid"> submit </v-btn>
            <v-btn @click="clear"> clear </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>

export default {
  data: function() {
    return {
      nameRules: [
        v => !!v || 'Please enter your name'
      ],
      emailRules: [
        v => !!v || 'Please enter your email address',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Please enter a valid email address'
      ],
      messageRules: [
        v => !!v || 'Please enter a message',
        v => v.length < 200 || 'Must be shorter than 200 characters'
      ],
      valid: false,
      submitted: false,
      name: '',
      email: '',
      message: '',
    }
  },
  methods: {
    submit: function() {
      this.submitted = true
    },
    clear: function() {
      this.name = ''
      this.email = ''
      this.message = ''
    }
  }
}
</script>
