<template>
  <div class="chapter-title" v-html="title"></div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="css" scoped>
.chapter-title {
  margin: 0 !important;
  padding: 0 !important;
}
.chapter-title >>> .chapterTitle {
  color: red;
  font-size: 12px;
  }
</style>
