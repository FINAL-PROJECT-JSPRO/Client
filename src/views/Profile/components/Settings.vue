<template>
  <div class="profile-settings">
    <h2>Settings</h2>
    <div class="wrapper">
      <v-row>
        <v-col sm="6" xs="12" md="3">
          <div class="profile-img">
            <v-icon class="profile-icon">fas fa-user-ninja</v-icon>
          </div>
        </v-col>
        <v-col sm="6" xs="12" md="5">
          <div class="profile-info">
            <form @submit.prevent="editProfile">
              <v-text-field type="text"
                v-model="username"
                label="Username"
                :error-messages="usernameErrors"
                @blur="$v.username.$touch()"
                required></v-text-field>
              <v-text-field
                v-model="name"
                type="text"
                label="Name"
                :error-messages="nameErrors"
                @blur="$v.name.$touch()"
                required></v-text-field>
              <v-text-field
                v-model="email"
                type="email"
                label="Email"
                :error-messages="emailErrors"
                @blur="$v.email.$touch()"
                required></v-text-field>
                <v-checkbox
                  v-model="passwordEnabled"
                  color="#4CAF50"
                  label="Password"
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field
                  v-if="passwordEnabled"
                  type="password"
                  label="New Password"
                  :error-messages="passwordErrors"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <v-text-field
                  v-if="passwordEnabled"
                  type="password"
                  label="Confirm Password"
                ></v-text-field>
                <div class="my-2" v-if="!isLoading">
                  <v-btn @click="cancelEdit" color="##202428" class="mr-3" dark>Cancel</v-btn>
                  <v-btn
                    :disabled="$v.$invalid"
                    type="submit"
                    color="#FFC107"
                    class="btn-save"
                    >Save</v-btn>
                </div>
                <div class="my-2" v-if="isLoading">
                  <LoadingProcess />
                </div>
            </form>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import LoadingProcess from '../../../components/LoadingProcess'
export default {
  name: 'ProfileSettings',
  components: {
    LoadingProcess
  },
  data () {
    return {
      username: '',
      email: '',
      name: '',
      passwordEnabled: false
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(6)
    },
    name: {
      required
    },
    email: {
      required,
      email,
      minLength: minLength(10)
    },
    password: {
      minLength: minLength(6)
    }
  },
  methods: {
    cancelEdit () {
      this.$router.push('/profile/history')
    },
    editProfile () {
      this.$store.commit('SET_LOADING_PROFILE', true)
      const paylod = {
        name: this.name,
        username: this.username,
        email: this.email
      }
      this.$store.dispatch('editProfile', paylod)
        .then(({ data }) => {
          this.$store.dispatch('verify')
            .then(({ data }) => {
              this.$store.commit('SET_ERRORS', [])
              this.$store.commit('SET_USER', data)
              this.$router.push('/profile/history')
            })
            .catch(err => {
              this.$store.commit('SET_ERRORS', [err.response.data])
            })
            .finally(() => this.$store.commit('SET_LOADING_PROFILE', false))
        })
        .catch(err => {
          this.$store.commit('SET_ERRORS', [err.response.data])
          this.$store.commit('SET_LOADING_PROFILE', false)
        })
    }
  },
  mounted () {
    this.username = this.user.username
    this.name = this.user.name
    this.email = this.user.email
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    usernameErrors () {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required.')
      !this.$v.username.minLength && errors.push('Username minimal 6 characters')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
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
    isLoading () {
      return this.$store.state.auth.isLoadingProfile
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile {
    &-img {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &-icon {
      font-size: 8rem;
      color: #212121
    }
  }
  .btn-save {
    color: #202428;
  }
  .wrapper {
    background-color: #fff;
    margin-top: 20px;
    padding: 1rem;
    border-radius: 20px;
  }
</style>
