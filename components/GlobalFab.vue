<template lang="pug">
  v-speed-dial(v-model='fab' bottom right fixed)
    // activators
    template(v-if="$auth.loggedIn" v-slot:activator)
      v-btn(v-model='fab' color='green darken-2' dark fab)
        v-icon(v-if='fab') mdi-close
        v-icon(v-else) mdi-account-circle
    template(v-else v-slot:activator)
      v-btn(color='green darken-2' dark fab to='/login')
        v-icon mdi-account-circle

    // actions
    template(v-if="$auth.loggedIn")
      v-btn(fab dark small color='red' @click="logout")
        v-icon mdi-exit-to-app
</template>

<script>
  export default {
    data: () => ({
      fab: false,
      direction: 'top',
      transition: 'slide-y-reverse-transition',
    }),
    methods: {
      logout() {
        let onSuccess = () => { this.$store.commit("snackbar/setSnack", this.$t('logout.toast.success')); };
        let onError = () => { this.$store.commit("snackbar/setSnack", this.$t('logout.toast.error')) };
        this.$auth.logout().then(onSuccess, onError);
      }
    }
  }
</script>