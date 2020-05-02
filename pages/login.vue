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
    loginUser(logininfo) {
      let onSuccess = () => { this.$router.push('inspire') };
      let onError = () => { alert('oops') };
      this.$auth.loginWith('local', {
        data: logininfo
      }).then(onSuccess, onError);
    },
    generateOTP(loginInfo) {
      let onSuccess = () => { this.$router.push('inspire') };
      let onError = () => { alert('oops') };
      axios.post('/api/auth/sessions/generateOTP')
        .then(onSuccess, onError)
    }
  }
}
</script>