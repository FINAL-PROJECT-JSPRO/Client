<template>
  <div>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
      class="google-btn">
      <span>
        <v-icon color="white">mdi-google-plus</v-icon>
        Google Sign in
      </span>
    </g-signin-button>
  </div>
</template>

<script>

export default {
  name: 'Google',
  data () {
    return {
      googleSignInParams: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
      }
    }
  },
  methods: {
    onSignInSuccess (googleUser) {
      const token = googleUser.getAuthResponse().id_token
      this.$store.commit('SET_LOADING', true)
      this.$store.dispatch('loginWithGoogle', token)
        .then(({ data }) => {
          localStorage.token = data.token
          this.$store.dispatch('verify')
            .then(({ data }) => {
              this.$store.commit('SET_AUTHENTICATION', true)
              this.$store.commit('SET_USER', data)
              this.$store.commit('SET_ERRORS', [])
              this.$router.push('/subjects')
            })
            .catch(err => {
              this.$store.commit('SET_AUTHENTICATION', false)
              this.$store.commit('SET_ERRORS', err.response.data)
            })
            .finally(() => this.$store.commit('SET_LOADING', false))
        })
        .catch(err => {
          this.$store.commit('SET_AUTHENTICATION', false)
          this.$store.commit('SET_ERRORS', err.response.data)
          this.$store.commit('SET_LOADING', false)
        })
    },
    onSignInError (error) {
      this.$store.commit('SET_ERRORS', error)
      this.$store.commit('SET_LOADING', false)
    }
  }
}
</script>

<style>
  .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 0px 8px;
    background-color: #fe4031;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    border-radius: 5px;
    height: 40px;
    width: 170px;
    margin: 10px 10px;
    color: white;
  }
  .google-btn {
    margin: 10px;
    padding: 8px 0px 10px 27px;
    background-color: #fe4031;
    border-radius: 5px;
    height: 40px;
    width: 170px;
    font-size: 12px;
    cursor: pointer;
    color: white;
  }
</style>
