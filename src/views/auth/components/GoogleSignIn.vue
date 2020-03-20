<template>
  <v-btn block>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError" class="btn btn-primary">
      Login with Google
    </g-signin-button>
  </v-btn>
</template>

<script>
import axios from '../../../config/axios'

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
      console.log('masuk')
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // const profile = googleUser.getBasicProfile()
      const token = googleUser.getAuthResponse().id_token
      // console.log(token)
      axios({
        method: 'POST',
        url: '/users/gSignIn',
        headers: {
          idtoken: token
        }
      })
        .then(({ data }) => {
          console.log(data, 'sign in success')
          localStorage.token = data.token
          localStorage.gToken = true
        })
        .catch(err => {
          console.log(err, 'fail sign in')
        })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
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
