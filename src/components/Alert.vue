<template>
  <v-alert
      v-if="message || errors.length"
      dense
      outlined
      class="mb-10"
      :type="errors.length ? 'error' : 'success'"
    >
      {{ message }}
      <div v-if="errors.length">
        <div v-for="(error, index) in errors" :key="index">{{ error }}</div>
      </div>
    </v-alert>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    message: String,
    errors: Array
  }
}
</script>
