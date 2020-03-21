<template>
  <v-progress-circular
    v-if="progress && progress !== 100"
    size="65"
    :value="progress"
    width="10"
    color="#00CB54"
  >
    {{ progress + '%' }}
  </v-progress-circular>
</template>

<script>
export default {
  props: {
    progress: Number
  }
}
</script>

<style>

</style>
