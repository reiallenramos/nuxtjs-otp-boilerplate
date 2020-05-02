<template lang="pug">
  v-container
    v-form
      v-text-field(v-model="otp" label="Enter OTP")
      v-btn(@click="loginUser(otp)") Validate
</template>

<script>
  export default {
    data() {
      return {
        otp: null
      }
    },
    computed: {
      email() {
        return this.$store.state.email;
      }
    },
    methods: {
      loginUser(otp) {
        let onSuccess = () => { alert('OTP validated!')};
        let onError = () => { alert('oops') };
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