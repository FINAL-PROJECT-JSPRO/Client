<template>
  <a :href="url" class="github-btn">
    <div style="padding-top:5px">
      <v-icon color="white">mdi-github-circle</v-icon>
      <span>Github Sign in</span>
    </div>
  </a>
</template>

<script>
export default {
  name: 'Github',
  data () {
    return {
      url: 'https://github.com/login/oauth/authorize?client_id=' + process.env.VUE_APP_GITHUB_CLIENT_ID
    }
  }
}
</script>

<style scoped>
  .github-btn {
    margin: 10px 10px;
    padding: 6px 15px;
    background-color: rgb(19, 19, 19);
    border-radius: 5px;
    text-decoration: none;
    color: white;
    font-size: 12px;
    height: 40px;
    width: 170px;
    text-align: center;
  }
</style>
