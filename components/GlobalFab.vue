<template lang="pug">
  v-speed-dial(v-model='fab' bottom right fixed)
    template(v-slot:activator)
      v-btn(v-model='fab' color='blue darken-2' dark fab)
        v-icon(v-if='fab') mdi-close
        v-icon(v-else) mdi-account-circle
    v-btn(fab dark small color='green')
      v-icon mdi-pencil
    v-btn(fab dark small color='indigo')
      v-icon mdi-plus
    v-btn(fab dark small color='red')
      v-icon mdi-delete
</template>

<script>
  export default {
    data: () => ({
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
    }),

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { class: 'purple', icon: 'account_circle' }
          case 'two': return { class: 'red', icon: 'edit' }
          case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      },
    },

    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },
  }
</script>