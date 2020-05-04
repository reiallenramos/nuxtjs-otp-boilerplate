<template lang="pug">
  v-container
    v-form(v-model="valid" v-on:submit.prevent="")
      h1 Login
      v-text-field(
        v-model="email"
        label="Email"
        :rules="[required('email'), emailFormat()]"
      )
      v-btn(@click="generateOTP(email)" :disabled="!valid") Generate OTP
</template>

<script>
import validations from "@/utils/validations";

export default {
  data() {
    return {
      valid: false,
      email: '',
      ...validations
    }
  },
  methods: {
    generateOTP(email) {
      this.$store.commit("setEmail", email);
      let onSuccess = (res) => {
        this.$store.commit("snackbar/setSnack", res.data);
        this.$router.push({name: 'login-otp'});
      };
      let onError = (res) => { this.$store.commit("snackbar/setSnack", res.data) };
      this.$axios.post('/api/auth/sessions/generateOTP', {
        email: email
      })
        .then(onSuccess, onError)
    }
  }
}
</script>