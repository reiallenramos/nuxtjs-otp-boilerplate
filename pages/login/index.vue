<template lang='pug'>
  v-container.fluid
    v-row(align='center' justify='center')
      v-col.col-12.col-sm-8.col-md-6
        v-row(align='center' justify='center')
          v-col
            v-form(v-model='valid' v-on:submit.prevent='')
              h1 {{ $t('login.login') }}
              v-text-field(
                v-model='email'
                :label="$t('email')"
                :rules="[required('email'), emailFormat()]"
              )
              v-btn(block @click='generateOTP(email)' :disabled='!valid') {{ $t('login.inputLabel') }}
        br
        v-divider
        br
        p.text-center.font-italic
          | {{$t('login.notYetAMember')}}&nbsp;
          NuxtLink(text to='/register') {{$t('login.signUp')}}
          | &nbsp;{{$t('login.now')}}
</template>

<script>
import validations from '@/utils/validations'

export default {
  data () {
    return {
      valid: false,
      email: '',
      ...validations
    }
  },
  methods: {
    generateOTP (email) {
      this.$store.commit('setEmail', email)
      const onSuccess = (res) => {
        this.$store.commit('snackbar/setSnack', this.$t('login.toast.success'))
        this.$router.push(this.localePath({ name: 'login-otp' }))
      }
      const onError = () => { this.$store.commit('snackbar/setSnack', this.$t('login.toast.error')) }
      this.$axios.post('/api/auth/sessions/generateOTP', {
        email
      }).then(onSuccess, onError)
    }
  }
}
</script>
