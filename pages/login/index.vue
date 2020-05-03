<template lang="pug">
  v-container
    h1 Login
    UserAuthForm(buttonText="Generate OTP" :submitForm="generateOTP")
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    generateOTP(loginInfo) {
      this.$store.commit("setEmail", loginInfo.email);
      let onSuccess = (res) => {
        this.$store.commit("snackbar/setSnack", res.data);
        this.$router.push({name: 'login-otp'});
      };
      let onError = (res) => { this.$store.commit("snackbar/setSnack", res.data) };
      this.$axios.post('/api/auth/sessions/generateOTP', {
        email: loginInfo.email
      })
        .then(onSuccess, onError)
    }
  }
}
</script>