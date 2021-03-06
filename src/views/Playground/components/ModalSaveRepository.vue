<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Repository Information</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <form
            @submit.prevent="saveToRepository"
            lazy-validation>
            <Alert :errors="errors" />
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  label="File name"
                  persistent-hint
                  v-model="fileName"
                  required
                  :error-messages="fileNameErrors"
                  @blur="$v.fileName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col md="12">
                <v-text-field
                  v-model="repositoryName"
                  label="Repository name"
                  required
                  :error-messages="repositoryNameErrors"
                  @blur="$v.repositoryName.$touch()">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="12">
                <v-textarea
                  v-model="description"
                  outlined
                  label="Description"
                  required
                  :error-messages="descriptionErrors"
                  @blur="$v.description.$touch()">
                </v-textarea>
              </v-col>
              <v-col cols="12" md="12" class="text-center">
                <v-btn
                  v-if="!isLoading"
                  type="submit"
                  class="ma-2"
                  depressed
                  large
                  :disabled="$v.$invalid"
                  color="#28a745">
                  <span class="btn-text">Save</span>
                </v-btn>
                <v-btn v-if="!isLoading" @click="closeModal" class="ma-2">Close</v-btn>
                <LoadingProcess v-if="isLoading" />
              </v-col>
            </v-row>
          </form>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import LoadingProcess from '../../../components/LoadingProcess'
import Alert from '../../../components/Alert'
import * as astring from 'astring'
import * as acorn from 'acorn'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'ModalSaveRepository',
  components: {
    LoadingProcess,
    Alert
  },
  props: {
    dialog: Boolean,
    script: String
  },
  data () {
    return {
      fileName: '',
      repositoryName: '',
      description: '',
      url: 'https://github.com/login/oauth/authorize?client_id=' + process.env.VUE_APP_GITHUB_REPO_CLIENT_ID + '&scope=user%20repo',
      message: ''
    }
  },
  validations: {
    fileName: {
      required
    },
    repositoryName: {
      required
    },
    description: {
      required
    }
  },
  methods: {
    convertToString (code) {
      const customGenerator = Object.assign({}, astring.baseGenerator, {
        AwaitExpression: function (node, state) {
          state.write('await ')
          var argument = node.argument
          if (argument != null) {
            this[argument.type](argument, state)
          }
        }
      })
      const ast = acorn.parse(code, { ecmaVersion: 8 })
      const formattedCode = astring.generate(ast, {
        generator: customGenerator
      })
      return formattedCode
    },
    closeModal () {
      this.fileName = ''
      this.repositoryName = ''
      this.description = ''
      this.$store.commit('SET_ERROR_REPOSITORY', [])
      this.$v.$reset()
      this.$emit('closeModal', false)
    },
    saveToRepository () {
      this.$store.commit('SET_LOADING_REPOSITORY', true)
      const payload = {
        name: this.repositoryName,
        description: this.description,
        fileName: this.fileName,
        code: this.convertToString(this.script)
      }
      this.$store.dispatch('validateRepository', this.repositoryName)
        .then(({ data }) => {
          this.$store.commit('SET_ERROR_REPOSITORY', [])
          localStorage.setItem('repository', JSON.stringify(payload))
          window.location.href = this.url
        })
        .catch(err => {
          this.$store.commit('SET_ERROR_REPOSITORY', [err.response.data.msg])
          this.$store.commit('SET_LOADING_REPOSITORY', false)
        })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.profile.isLoading
    },
    errors () {
      return this.$store.state.profile.errors
    },
    fileNameErrors () {
      const errors = []
      if (!this.$v.fileName.$dirty) return errors
      !this.$v.fileName.required && errors.push('Filename is required.')
      return errors
    },
    repositoryNameErrors () {
      const errors = []
      if (!this.$v.repositoryName.$dirty) return errors
      !this.$v.repositoryName.required && errors.push('Name is required.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.required && errors.push('Description is required.')
      return errors
    }
  }
}
</script>

<style lang="scss" scoped>
  .btn-text {
    margin-right: 10px;
    color: #fff;
    display: inline-block;
  }
  .save-to-github {
    display: inline-block;
  }
</style>
