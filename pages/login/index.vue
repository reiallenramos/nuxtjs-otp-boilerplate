<template lang="pug">
  v-container.fluid
    v-row(align="center" justify="center")
      v-col.col-12.col-sm-8.col-md-6
        v-row(align="center" justify="center")
          v-col
            v-form(v-model="valid" v-on:submit.prevent="")
              h1 Login
              v-text-field(
                v-model="email"
                label="Email"
                :rules="[required('email'), emailFormat()]"
              )
              v-btn(block @click="generateOTP(email)" :disabled="!valid") Generate OTP
        br
        v-divider
        br
        p.text-center.font-italic
          | Not yet a member?&nbsp;
          NuxtLink(text to="/register") Sign up
          | &nbsp;now!
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