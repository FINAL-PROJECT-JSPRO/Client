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
        next('/exams')
      } else {
        next()
      }
    })
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
