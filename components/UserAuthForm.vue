<template>
  <v-form v-model="valid" v-on:submit.prevent="">
    <v-text-field v-model="userInfo.email" 
                  label="Email"
                  @keyup.enter="submitForm(userInfo)"
                  :rules="[required('email'), emailFormat()]"/>
    <v-btn @click="submitForm(userInfo)" :disabled="!valid">{{ buttonText }}</v-btn>
  </v-form>
</template>

<script>
  import validations from "@/utils/validations";

  export default {
    data() {
      return {
        valid: false,
        showPassword: false,
        userInfo: {
          email: '',
        },
        ...validations
      }
    },
    props: ["submitForm", "buttonText"]
  }
</script>

<style lang="scss" scoped>

</style>