<template>
  <div>
    <v-divider></v-divider>
    <v-card-text class="chapter-card">
      <a href="" class="chapter">
        {{ index + 1}}. <span style="margin-left: 25px">{{ chapterTitle }}</span>
      </a>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: {
    chapterTitle: String,
    index: Number
  }
}
</script>

<style lang="css" scoped>
.chapter-card {
  padding: 0;
}
.chapter {
  display: block;
  padding: 16px;
  text-decoration: none;
  color: black !important;
}
.chapter:hover {
  background: #00CB54 ;
  color: white !important;
}
</style>
