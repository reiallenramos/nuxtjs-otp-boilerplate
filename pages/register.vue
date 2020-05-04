<template lang="pug">
  v-container.fluid
    v-row(align="center" justify="center")
      v-col.col-12.col-sm-8.col-md-6
        v-row(align="center" justify="center")
          v-col
            v-form(v-model="valid" v-on:submit.prevent="")
              h1 Register
              v-text-field(
                v-model="email"
                label="Email"
                :rules="[required('email'), emailFormat()]"
              )
              v-btn(block @click="registerUser(email)" :disabled="!valid") Register
</template>

<script>
import validations from "@/utils/validations";

export default {
  data() {
    return {
      valid: false,
      email: null,
      ...validations
    }
  },
  methods: {
    registerUser() {
      let onSuccess = () => { this.$store.commit("snackbar/setSnack", "Success. Please Login.") };
      let onError = () => { this.$store.commit("snackbar/setSnack", "Invalid email.") };
      this.$axios.post('/api/register', {
        email: this.email
      }).then(onSuccess, onError)
    }
  }
}
</script>