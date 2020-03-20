<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Login</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent='login' style="margin-right: 10px">
        <v-text-field
          label="Email/username"
          name="login"
          type="text"
          prepend-icon="mdi-email"
          v-model="userInput"
        />
        <v-text-field
          id="password"
          label="Password"
          name="password"
          type="password"
          prepend-icon="mdi-lock"
          v-model="password"
        />

        <v-card-actions>
          <v-flex justify-center style="margin-bottom: 15px">
            <v-btn type="submit" color="primary">Login</v-btn>
          </v-flex>
        </v-card-actions>
      </v-form>
      <!-- <v-btn @click="loginGithub">GITHUB</v-btn> -->
      <v-btn @click="loginGoogle">Google</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userInput: '',
      password: ''
    }
  },
  methods: {
    login () {
      const payload = {
        userInput: this.userInput,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          console.log(data)
          // set local storage
          // commit state
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    loginGoogle () {
      console.log('test')
    }
    // loginGithub () {
    //   console.log('test')
    //   // console.log(process.env.VUE_APP_CLIENT_ID)
    //   const url = 'https://github.com/login/oauth/authorize?client_id=' + process.env.VUE_APP_CLIENT_ID
    //   this.$auth.login({ email, password })
    //     .then(data => {
    //       console.log(data)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    // }
  }
}
</script>

<style>

</style>
