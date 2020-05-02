<template lang="pug">
  v-container
    h1 Login
    UserAuthForm(buttonText="Generate OTP" :submitForm="generateOTP")
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
import axios from 'axios'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    generateOTP(loginInfo) {
      alert(loginInfo.email)
      this.$store.commit("setEmail", loginInfo.email);
      let onSuccess = () => { this.$router.push({name: 'login-otp'}) };
      let onError = () => { alert('oops') };
      axios.post('/api/auth/sessions/generateOTP')
        .then(onSuccess, onError)
    }
  }
}
</script>