<template>
  <v-card class="elevation-12">
    <v-toolbar
      dark
      style="background-color: rgba(0, 0, 0, 0.7)"
      flat
    >
      <v-toolbar-title>Register</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <Alert :message="message" :errors="errors" />
      <v-form @submit.prevent='register' style="margin: 5px">
        <v-text-field
          label="Username"
          name="username"
          type="text"
          class="text-field-control"
          @click:prepend="changeIcon"
          :prepend-icon="icon"
          required
          v-model="username"
          :error-messages="usernameErrors"
          @blur="$v.username.$touch()"
        />
        <v-text-field
          label="Email"
          name="email"
          type="email"
          prepend-icon="mdi-email"
          class="text-field-control"
          required
          v-model="email"
          :error-messages="emailErrors"
          @blur="$v.email.$touch()"
        />
        <v-text-field
          id="password"
          label="Password"
          name="password"
          :type="showPass ? 'text' : 'password'"
          prepend-icon="mdi-lock"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          class="text-field-control"
          required
          v-model="password"
          :error-messages="passwordErrors"
          @click:append="showPass = !showPass"
          @blur="$v.password.$touch()"
        />
        <div class="register-link">
          <span>Already have an account, login
            <router-link to="/login" style="text-decoration: none">here</router-link>
          </span>
        </div>
        <v-card-actions>
          <v-flex justify-center class="text-center" style="margin-bottom: 15px">
            <v-btn
              v-if="!isLoading"
              :disabled="$v.$invalid"
              type="submit"
              color="primary">Register</v-btn>
            <LoadingProcess v-if="isLoading" />
          </v-flex>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import LoadingProcess from '../../../components/LoadingProcess'
import Alert from '../../../components/Alert'
import { email, required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  components: {
    LoadingProcess,
    Alert
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      showPass: false,
      icons: [
        'mdi-face',
        'mdi-emoticon',
        'mdi-emoticon-cool',
        'mdi-emoticon-dead',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue'
      ],
      iconIndex: 0
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email,
      minLength: minLength(10)
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  created () {
    this.$store.commit('SET_ERRORS', [])
    this.$store.commit('SET_MESSAGE', null)
  },
  methods: {
    register () {
      this.$store.commit('SET_LOADING', true)
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('register', payload)
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
        })
        .finally(() => this.$store.commit('SET_LOADING', false))
    },
    changeIcon () {
      this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.auth.isLoading
    },
    errors () {
      return this.$store.state.auth.errors
    },
    message () {
      return this.$store.state.auth.message
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required.')
      !this.$v.username.minLength && errors.push('Username minimal 6 characters')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      !this.$v.password.minLength && errors.push('Password minimal 6 characters')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required.')
      !this.$v.email.email && errors.push('Invalid email format')
      !this.$v.email.minLength && errors.push('Email minimal 10 characters')
      return errors
    },
    icon () {
      return this.icons[this.iconIndex]
    }
  }
}
</script>

<style scoped>
  .text-field-control {
    padding: 0px 20px;
    padding-top: 10px
  }
  .register-link {
    text-align: center;
    margin: 10px 0px 20px;
  }
</style>
