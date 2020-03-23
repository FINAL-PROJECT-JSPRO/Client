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
      url: 'https://github.com/login/oauth/authorize?client_id=' + process.env.VUE_APP_GITHUB_CLIENT_ID,
      code: ''
    }
  },
  methods: {
    githubLogin () {
      this.code = this.$route.query.code
      console.log(this.code, '===')
    }
  },
  watch: {
    // $route (to, from) {
    //   console.log(to, from)
    //   to = to.path
    //   if (to === '/login') {
    //     this.code = this.$route.query.code
    //   } else {
    //     console.log(to, from)
    //   }
    // }
    // code () {
    //   this.code = this.$route.query
    //   console.log(this.code)
    //   // dispatch
    //   this.$store.dispatch('loginWithGithub', this.code)
    //     .then(token => {
    //       console.log(token)
    //       this.$store.dispatch('getGithubUser', token.access_token)
    //         .then(user => {
    //           console.log(user)
    //         })
    //         .catch(err => {
    //           console.log(err, '-=-')
    //         })
    //     })
    //     .catch(err => {
    //       console.log(err, '====')
    //     })
    // }
  }
}
</script>

<style lang="scss" scoped>
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
