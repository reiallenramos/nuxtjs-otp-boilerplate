<template lang="pug">
  v-container
    h1 Login
    UserAuthForm(buttonText="Login" :submitForm="loginUser")
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
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
    }
  }
}
</script>