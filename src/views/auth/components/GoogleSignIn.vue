<template>
  <v-btn block>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Login with Google
    </g-signin-button>
  </v-btn>
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
              this.$router.push('/exams')
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
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>
