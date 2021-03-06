<template>
  <v-content>
    <v-card class="elevation-12">
      <v-toolbar
        dark
        style="background-color: rgba(0, 0, 0, 0.7)"
        flat
      >
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-card-text>
        <Alert :message="message" :errors="errors" />
        <v-form @submit.prevent='login' style="margin: 10px">
          <v-text-field
            label="Email/username"
            name="login"
            type="text"
            class="text-field-control"
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
            :type="showPass ? 'text' : 'password'"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            class="text-field-control"
            prepend-icon="mdi-lock"
            v-model="password"
            required
            :error-messages="passwordErrors"
            @click:append="showPass = !showPass"
            @blur="$v.password.$touch()"
          />
          <div class="login-link">
            <span>Don't have an account ? Register
              <router-link to="/register" style="text-decoration: none">here</router-link>
            </span>
          </div>
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
        <div class="oauth-bottom" v-if="!isLoading">
          <hr />
          <div style="text-align: center; margin: 15px 0px">
            <span>Or sign in with</span>
          </div>
          <div class="oauth-btn-bttm">
            <GoogleSignIn />
            <Github />
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-content>
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
      password: '',
      showPass: false
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
  created () {
    this.$store.commit('SET_ERRORS', [])
    this.$store.commit('SET_MESSAGE', null)
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
              this.$router.push('/subjects')
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

<style scoped>
  .input-group {
    display: flex;
    border: 1px solid rgba(131, 131, 131, 0.7);
    margin: 5px 10px;
    padding: 10px 15px
  }
  .form-control {
    padding-left: 15px
  }
  .login-link {
    text-align: center;
    margin: 10px 0px 20px;
  }
  .text-field-control {
    padding: 10px 20px
  }
  .oauth-btn {
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
  }
  .oauth-btn-bttm {
    display: flex;
    justify-content: space-around;
    margin-bottom: 25px;
  }
</style>
