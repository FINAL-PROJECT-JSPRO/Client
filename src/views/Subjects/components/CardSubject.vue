<template>
  <v-col>
    <v-card
      class="mx-auto"
      max-width="350"
    >
      <v-img
        height="250"
        :src="img"
      ></v-img>

      <v-card-title>{{ title }}</v-card-title>

      <v-card-text>
        <div>Chapter2nya</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
        >
          Start
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    title: String,
    img: String
  }
}
</script>

<style>

</style>
