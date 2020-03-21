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
    </v-card-text>
    <GoogleSignIn />
    <Github />
  </v-card>
</template>

<script>
import GoogleSignIn from './GoogleSignIn'
import Github from './Github'

export default {
  name: 'Login',
  data () {
    return {
      userInput: '',
      password: ''
    }
  },
  components: {
    GoogleSignIn,
    Github
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
          localStorage.token = data.token
          // this.$router.push('/subjects')
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>
