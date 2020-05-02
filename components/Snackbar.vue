<template lang="pug">
  v-snackbar(v-model="show" :top="true") {{ message }}
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
    }
  },
  created: function () {
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