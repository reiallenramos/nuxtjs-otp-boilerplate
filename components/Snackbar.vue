<template lang='pug'>
  v-snackbar(v-model='show' :bottom='true') {{ message }}
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },
  created () {
    this.$store.watch(state => state.snackbar.snack, () => {
      const msg = this.$store.state.snackbar.snack
      if (msg !== '') {
        this.show = true
        this.message = this.$store.state.snackbar.snack
        this.$store.commit('snackbar/setSnack', '')
      }
    })
  }
}
</script>
