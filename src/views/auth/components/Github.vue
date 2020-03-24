<template>
  <a :href="url" class="github-btn" @click="githubLogin">
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
      url: 'https://github.com/login/oauth/authorize?scope=repo&client_id=' + process.env.VUE_APP_GITHUB_CLIENT_ID,
      code: ''
    }
  },
  methods: {
    githubLogin () {
      this.code = this.$route.query.code
      console.log(this.code, '===')
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
