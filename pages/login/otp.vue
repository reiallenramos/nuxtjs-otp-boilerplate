<template lang="pug">
  v-container
    v-form(v-model="valid" v-on:submit.prevent="")
      h1 Validate OTP
      v-text-field(
        v-model="otp"
        label="Enter OTP"
        :rules="[required('otp'), minLength('otp', 6)]"
      )
      v-btn(@click="loginUser(otp)" :disabled="!valid") Login
</template>

<script>
import validations from "@/utils/validations";

export default {
  data() {
    return {
      valid: false,
      otp: '',
      ...validations
    }
  },
  computed: {
    email() {
      return this.$store.state.email;
    }
  },
  methods: {
    loginUser(otp) {
      let onSuccess = () => { this.$store.commit("snackbar/setSnack", "OTP validated!") };
      let onError = (res) => { this.$store.commit("snackbar/setSnack", res) };
      this.$auth.loginWith('local', {
        data: {
          otp: otp,
          email: this.email
        }
      }).then(onSuccess, onError);
    },
  }
}
</script>