<template>
  <div class="profile-settings">
    <h2>Settings</h2>
    <div class="wrapper">
      <v-row>
        <v-col sm="6" xs="12" md="4">
          <div class="profile-img">
            <v-icon v-if="!user.imageUrl && !file" class="profile-icon">fas fa-user-ninja</v-icon>
            <img
              v-if="user.imageUrl || file"
              :src="user.imageUrl ? user.imageUrl : ''"
              class="preview-profile-img"
              id="preview-profile-img"/>
            <div class="input-profile-img">
              <v-progress-linear v-if="isLoadingImage"
                color="#272727"
                indeterminate
                rounded
                height="6"
              ></v-progress-linear>
              <v-file-input
                color="deep-purple accent-4"
                counter
                accept="image/*"
                :clearable="false"
                label="File input"
                @change="previewImage($event)"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                :show-size="1000">
              </v-file-input>
              <div  class="full-width mt-5 text-center">
                <v-btn
                  v-if="file"
                  :disabled="isLoadingImage"
                  @click="saveProfileImage"
                  class="ma-2"
                  tile
                  outlined
                  color="#272727">
                  <v-icon left>mdi-cloud-upload</v-icon> Upload
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
        <v-col sm="6" xs="12" md="5">
          <div class="profile-info">
            <Alert :errors="errors" />
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
                  @change="includePassword"
                  color="#4CAF50"
                  label="Password"
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field
                  v-if="passwordEnabled"
                  type="password"
                  label="New Password"
                   v-model="password"
                  :error-messages="passwordErrors"
                  @blur="$v.password.$touch()"
                ></v-text-field>
                <v-text-field
                  v-if="passwordEnabled"
                  v-model="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  :error-messages="confirmPasswordErrors"
                  @blur="$v.confirmPassword.$touch()"
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
import { email, required, minLength, requiredIf, sameAs } from 'vuelidate/lib/validators'
import LoadingProcess from '../../../components/LoadingProcess'
import Alert from '../../../components/Alert'
export default {
  name: 'ProfileSettings',
  components: {
    LoadingProcess,
    Alert
  },
  data () {
    return {
      username: '',
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      passwordEnabled: false,
      file: ''
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
      required: requiredIf((value) => {
        return value.passwordEnabled
      }),
      minLength: minLength(6)
    },
    confirmPassword: {
      required: requiredIf((value) => {
        return value.password
      }),
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    saveProfileImage () {
      this.$store.commit('SET_LOADING_PROFILE_IMAGE', true)
      const formData = new FormData()
      formData.append('image', this.file)
      this.$store.dispatch('editProfileImage', formData)
        .then(({ data }) => {
          this.$store.dispatch('verify')
            .then(({ data }) => {
              this.$store.commit('SET_ERROR_PROFILE_IMAGE', [])
              this.$store.commit('SET_USER', data)
              this.$router.push('/profile/history')
            })
            .catch(err => {
              this.$store.commit('SET_ERROR_PROFILE_IMAGE', [err.response.data])
            })
            .finally(() => {
              this.$store.commit('SET_LOADING_PROFILE_IMAGE', false)
            })
        })
        .catch(err => {
          this.$store.commit('SET_ERROR_PROFILE_IMAGE', [err.response.data])
          this.$store.commit('SET_LOADING_PROFILE_IMAGE', false)
        })
    },
    cancelEdit () {
      this.$router.push('/profile/history')
    },
    previewImage (event) {
      this.file = event
      const reader = new FileReader()
      reader.onload = function () {
        var output = document.getElementById('preview-profile-img')
        output.src = reader.result
      }
      reader.readAsDataURL(event)
    },
    editProfile () {
      this.$store.commit('SET_LOADING_PROFILE', true)
      const paylod = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword
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
              this.$store.commit('SET_ERRORS', [err.response.data.msg])
            })
            .finally(() => this.$store.commit('SET_LOADING_PROFILE', false))
        })
        .catch(err => {
          this.$store.commit('SET_ERRORS', [err.response.data.msg])
          this.$store.commit('SET_LOADING_PROFILE', false)
        })
    },
    includePassword () {
      this.passwordEnabled = !this.passwordEnabled
      this.password = ''
      this.confirmPassword = ''
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
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.sameAsPassword && errors.push('Confirmed password does not match')
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
    },
    errors () {
      return this.$store.state.auth.errors
    },
    isLoadingImage () {
      return this.$store.state.auth.isLoadingProfileImage
    }
  }
}
</script>

<style lang="scss" scoped>
  .preview-profile-img {
    width: 180px;
    height: 180px;
  }
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
  .input-profile-img {
    margin: 20px 0;
    padding: 0 20px;
  }
</style>
