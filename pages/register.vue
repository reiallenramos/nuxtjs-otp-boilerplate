<template lang="pug">
  v-container
    h1 Register
    UserAuthForm(buttonText="Register" :submitForm="registerUser" hasName="true")
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'
export default {
  components: {
    UserAuthForm
  },
  methods: {
    registerUser() {
      alert('You pressed a button')
    }
  }
}
</script>