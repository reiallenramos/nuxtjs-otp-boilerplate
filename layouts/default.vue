<template lang="pug">
  v-app(dark)
    snackbar
    v-navigation-drawer(v-model="drawer" clipped fixed app)
      v-list
        v-list-item(v-for="(item, i) in items" :key="i" :to="item.to" router exact)
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text="item.title")
      template(v-slot:append v-if="$auth.loggedIn")
        .pa-2
          v-btn(block @click="logout")
            | Logout
            v-icon mdi-logout-variant
    v-app-bar(clipped-left fixed app)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title(v-text="title")
      v-spacer
      div(v-if="$auth.loggedIn")
        | {{ $auth.user.email }}
    v-content
      v-container
        nuxt
    global-fab
    v-footer(:fixed='fixed' app)
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
import Snackbar from '~/components/Snackbar'
import GlobalFab from '~/components/GlobalFab'

export default {
  components: {
    Snackbar,
    GlobalFab,
  },
  data () {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'NuxtJS OTP Boilerplate'
    }
  },
  methods: {
    logout() {
      let onSuccess = () => { this.$store.commit("snackbar/setSnack", "Successfully logged out."); };
      let onError = (res) => { this.$store.commit("snackbar/setSnack", res) };
      this.$auth.logout().then(onSuccess, onError);
    }
  }
}
</script>
