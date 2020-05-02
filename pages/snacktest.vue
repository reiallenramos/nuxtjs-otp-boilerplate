<template>
  <v-layout>
    <v-flex text-xs-center xs4 offset-xs4>
      <v-text-field label="What snack?" v-model="snackName" />
      <v-btn class="primary" @click="snackTime">Test snack</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {snackName: ''}
  },
  methods: {
    snackTime: function (snack) {
      this.setSnack(this.snackName)
      this.$router.push('/')
    },
    ...mapMutations({
      setSnack: 'snackbar/setSnack'
    })
  }
}
</script>