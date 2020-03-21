<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent='register' style="margin-right: 10px">
        <v-text-field
          label="Username"
          name="username"
          type="text"
          prepend-icon="mdi-face"
          v-model="username"
        />
        <v-text-field
          label="Email"
          name="email"
          type="email"
          prepend-icon="mdi-email"
          v-model="email"
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
            <v-btn type="submit" color="primary">Register</v-btn>
          </v-flex>
        </v-card-actions>
      </v-form>
      <v-content>
        <span>Already have an account, login <a href="/login"> here</a></span>
      </v-content>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
        .then(({ data }) => {
          // console.log(data)
          this.$router.push('/login')
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
