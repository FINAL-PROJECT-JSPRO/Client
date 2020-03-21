<template>
  <v-footer
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
    >
      <v-card-title class="teal text-center">
        <strong class="subheading">&copy;JSPro 2020 </strong>
        <v-spacer></v-spacer>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.subheading {
  width: 100%
}
</style>
