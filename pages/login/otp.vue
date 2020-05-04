<template lang="pug">
  v-container.fluid
    v-row(align="center" justify="center")
      v-col.col-12.col-sm-8.col-md-6
        v-row(align="center" justify="center")
          v-col
            v-form(v-model="valid" v-on:submit.prevent="")
              h1 Validate OTP
              v-text-field(
                v-model="otp"
                label="Enter OTP"
                :rules="[required('otp'), minLength('otp', 6)]"
              )
              v-btn(block @click="loginUser(otp)" :disabled="!valid") Login
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
      let onError = () => { this.$store.commit("snackbar/setSnack", "Incorrect OTP") };
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