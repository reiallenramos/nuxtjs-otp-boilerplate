<template lang="pug">
  v-container
    v-form
      v-text-field(v-model="email" label="email")
      v-btn(@click="registerUser(email)") Register
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
import axios from 'axios'

export default {
  data() {
    return {
      email: null,
    }
  },
  components: {
    UserAuthForm
  },
  methods: {
    registerUser() {
      let onSuccess = () => { this.$store.commit("snackbar/setSnack", "Success. Please Login.") };
      let onError = () => { this.$store.commit("snackbar/setSnack", "Invalid email.") };
      axios.post('/api/register', {
        email: this.email
      }).then(onSuccess, onError)
    }
  }
}
</script>