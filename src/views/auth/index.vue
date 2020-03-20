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
  name: 'Auth'
  // beforeRouteEnter (from, to, next) {
  //   if (localStorage.access_token) {

  //   }
  // }
}
</script>

<style>

</style>
