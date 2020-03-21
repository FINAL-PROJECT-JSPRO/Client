<template>
  <a :href="url">
    <v-btn color="primary" size="sm" block>
      <div class="button-login">
        <p>
          <span>Login with github</span>
        </p>
      </div>
    </v-btn>
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

<style>

</style>
