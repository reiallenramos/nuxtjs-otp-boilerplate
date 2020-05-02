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
      this.$auth.loginWith('local', {
        data: logininfo
      })
    }
  }
}
</script>