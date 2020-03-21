<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
$body-font-family: 'Work Sans', sans-serif;
html {
  scroll-behavior: smooth;
}
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}
.color-white {
  color: #fff !important
}
.bold {
  font-weight: bold !important
}
.img-responsive {
  width: 100%;
  height: auto;
}
.letter-spacing-heading {
  letter-spacing: 2px;
}
</style>
