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
      <Alert :message="message" :errors="errors" />
      <v-form @submit.prevent='login' style="margin-right: 10px">
        <v-text-field
          label="Email/username"
          name="login"
          type="text"
          prepend-icon="mdi-email"
          v-model="userInput"
          required
          :error-messages="userInputErrors"
          @blur="$v.userInput.$touch()"
        />
        <v-text-field
          id="password"
          label="Password"
          name="password"
          type="password"
          prepend-icon="mdi-lock"
          v-model="password"
          required
          :error-messages="passwordErrors"
          @blur="$v.password.$touch()"
        />

        <v-card-actions>
          <v-flex justify-center class="text-center" style="margin-bottom: 15px">
            <v-btn
              v-if="!isLoading"
              type="submit"
              :disabled="$v.$invalid"
              color="primary">Login</v-btn>
              <LoadingProcess v-if="isLoading" />
          </v-flex>
        </v-card-actions>
      </v-form>
    <v-content>
      <span>Don't have account, register
        <router-link to="/register">Here</router-link>
      </span>
    </v-content>
    </v-card-text>
    <GoogleSignIn />
    <Github />
  </v-card>
</template>

<script>
import GoogleSignIn from './GoogleSignIn'
import Github from './Github'
import Alert from '../../../components/Alert'
import LoadingProcess from '../../../components/LoadingProcess'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  components: {
    GoogleSignIn,
    Github,
    Alert,
    LoadingProcess
  },
  data () {
    return {
      userInput: '',
      password: ''
    }
  },
  validations: {
    userInput: {
      required
    },
    password: {
      required
    }
  },
  methods: {
    login () {
      this.$store.commit('SET_LOADING', true)
      const payload = {
        userInput: this.userInput,
        password: this.password
      }
      this.$store.dispatch('login', payload)
        .then(({ data }) => {
          localStorage.token = data.token
          this.$store.dispatch('verify')
            .then(({ data }) => {
              this.$store.commit('SET_USER', data)
              this.$store.commit('SET_ERRORS', [])
              this.$store.commit('SET_AUTHENTICATION', true)
              this.$router.push('/exams')
            })
            .catch(err => {
              this.$store.commit('SET_AUTHENTICATION', false)
              this.$store.commit('SET_ERRORS', [err.response.data])
            })
            .finally(() => {
              this.$store.commit('SET_LOADING', false)
            })
        })
        .catch(err => {
          this.$store.commit('SET_ERRORS', [err.response.data.msg])
          this.$store.commit('SET_AUTHENTICATION', false)
          this.$store.commit('SET_MESSAGE', null)
          this.$store.commit('SET_LOADING', false)
        })
    }
  },
  computed: {
    userInputErrors () {
      const errors = []
      if (!this.$v.userInput.$dirty) return errors
      !this.$v.userInput.required && errors.push('Please input your username / email')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    errors () {
      return this.$store.state.auth.errors
    },
    message () {
      return this.$store.state.auth.message
    },
    isLoading () {
      return this.$store.state.auth.isLoading
    }
  }
}
</script>

<style>

</style>
