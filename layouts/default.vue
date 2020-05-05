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
          title: this.$t('greeting'),
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: this.$t('inspire'),
          to: '/inspire'
        }
      ],
      title: this.$t('appTitle')
    }
  }
}
</script>
