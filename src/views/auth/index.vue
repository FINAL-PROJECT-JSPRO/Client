<template>
  <v-row
    align="center"
    justify="center">
    <v-col
      cols="12"
      sm="8"
      md="4">
      <router-view/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Auth',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isAuthenticated) {
        next('/subjects')
      } else {
        next()
      }
    })
  },
  watch: {
    $route (to, from) {
      console.log(to, '==', from, '=== dari index auth')
      to = to.path
      if (to === '/login?code') {
        // console.log('test')
        this.code = this.$route.query.code
      }
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    }
  }
}
</script>

<style>

</style>
