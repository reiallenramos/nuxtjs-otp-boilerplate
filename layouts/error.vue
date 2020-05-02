<template lang="pug">
  v-app(dark='')
    v-content
      v-container(fluid text-center)
        v-img(:src="require('~/assets/404.svg')" aspect-ratio="3" contain)
        br
        template(v-if='error.statusCode === 404')
          | {{ pageNotFound }}
        template(v-else='')
          | {{ otherError }}
        br
        span Click&nbsp;
        NuxtLink(text to="/") here
        | &nbsp;to go home.
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Uh oh! Page not found.',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
