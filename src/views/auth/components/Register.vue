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
          label="Name"
          name="name"
          type="text"
          prepend-icon="mdi-face"
          v-model="name"
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
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      }
      console.log('register', payload)
      // dispatch ke store
    }
  }
}
</script>

<style>

</style>