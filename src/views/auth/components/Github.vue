<template>
  <a :href="url" class="github-btn">
    <div class="github-btn-wrapper">
      <v-icon color="white">fab fa-github</v-icon>
      <span>Github Sign in</span>
    </div>
  </a>
</template>

<script>
export default {
  name: 'Github',
  data () {
    return {
      url: 'https://github.com/login/oauth/authorize?client_id=' + process.env.VUE_APP_GITHUB_CLIENT_ID + '&scope=user%20repo'
    }
  }
}
</script>

<style lang="scss" scoped>
  .github-btn {
    margin: 10px;
    padding: 7px 15px 10px;
    background-color: rgb(19, 19, 19);
    border-radius: 5px;
    text-decoration: none;
    color: white;
    font-size: 12px;
    height: 40px;
    width: 170px;
    text-align: center;
    &-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        padding: 0px 8px;
      }
    }
  }
</style>
