<template lang="pug">
  v-container.fluid
    v-row(align="center" justify="center")
      v-col.col-12.col-sm-8.col-md-6
        v-row(align="center" justify="center")
          v-col
            v-form(v-model="valid" v-on:submit.prevent="")
              h1 {{ $t('otp.validate') }}
              v-text-field(
                v-model="otp"
                :label="$t('otp.inputLabel')"
                :rules="[required('otp'), minLength('otp', 6)]"
              )
              v-btn(block @click="loginUser(otp)" :disabled="!valid") {{ $t('otp.login') }}
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
      let onSuccess = () => { this.$store.commit("snackbar/setSnack", this.$t('otp.toast.success')) };
      let onError = () => { this.$store.commit("snackbar/setSnack", this.$t('otp.toast.error')) };
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