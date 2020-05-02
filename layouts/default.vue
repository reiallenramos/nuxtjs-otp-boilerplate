<template lang='pug'>
  v-app(dark)
    snackbar
    v-navigation-drawer(v-model='drawer' clipped fixed app)
      v-list
        v-list-item(v-for='(item, i) in items' :key='i' :to='item.to' router exact)
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text='item.title')
    v-app-bar(clipped-left fixed app)
      v-app-bar-nav-icon(@click.stop='drawer = !drawer')
      v-toolbar-title(v-text='title')
      v-spacer
      v-menu(offset-y)
        template(v-slot:activator='{ on }')
          v-btn(v-if='$vuetify.breakpoint.mdAndUp && $auth.loggedIn'
            dark
            text
            v-on='on')
            | {{ $auth.user.email }}
          v-btn(v-else fab dark text v-on='on')
            v-icon(large) mdi-account-circle
        v-list(dense)
          v-list-item-group
            v-list-item(v-for='item, i) in userActions' :key='i' :to='item.to')
              v-list-item-icon
                v-icon {{ item.icon }}
              v-list-item-content
                v-list-item-title(v-text='item.title')
            v-list-item(v-if='$auth.loggedIn' @click='logout')
              v-list-item-icon
                v-icon mdi-exit-to-app
              v-list-item-content
                v-list-item-title(v-text="$t('logout.logout')")
    v-content
      v-container
        nuxt
    v-footer(:fixed='fixed' app)
      span &copy; {{ new Date().getFullYear() }}
</template>

<script>
import Snackbar from '~/components/Snackbar'

export default {
  components: {
    Snackbar
  },
  data () {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: this.$t('greeting'),
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: this.$t('inspire'),
          to: '/inspire'
        }
      ],
      newUserActions: [
        {
          icon: 'mdi-login',
          title: this.$t('login.login'),
          to: '/login'
        },
        {
          icon: 'mdi-account-plus',
          title: this.$t('register.register'),
          to: '/register'
        }
      ],
      existingUserActions: [
      ],
      title: this.$t('appTitle')
    }
  },
  computed: {
    userActions () {
      return this.$auth.loggedIn ? this.existingUserActions : this.newUserActions
    }
  },
  methods: {
    logout () {
      const onSuccess = () => { this.$store.commit('snackbar/setSnack', this.$t('logout.toast.success')) }
      const onError = () => { this.$store.commit('snackbar/setSnack', this.$t('logout.toast.error')) }
      this.$auth.logout().then(onSuccess, onError)
    }
  }
}
</script>
