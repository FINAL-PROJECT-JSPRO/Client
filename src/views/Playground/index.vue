<template>
  <v-content v-if="isAuthenticated">
    <LoadingPage v-if="isLoading" />
    <v-container>
      <v-row>
        <v-col sm="12" xs="12" md="6">
          <div class="wrapper">
            <div id="coding-editor"
            style="width:100%;min-height: 500px;"></div>
          </div>
          <div class="my-2">
            <div>
              <v-btn :disabled="isRunning" @click="runCode" depressed large color="primary">Run</v-btn>
              <v-btn :disabled="isRunning" class="ma-2" @click="openModal" depressed large color="#24292e">
                <v-icon style="margin-right: 10px;" class="color-white">fab fa-github</v-icon>
                <span class="btn-text">Save</span>
              </v-btn>
            </div>
            <router-link class="text-decoration-none" to="/profile/repositories">
              <v-btn class="ma-2" depressed large color="rgb(255, 193, 7)">
                Repositories
              </v-btn>
            </router-link>
          </div>
        </v-col>
        <v-col sm="12" xs="12" md="6">
          <v-textarea
          outlined
          rows="10"
          name="input-7-4"
          label="Result"
          :value="result"
        ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
     <ModalSaveRepository
     @closeModal="closeModal"
     :script="script"
     :dialog="isModalOpened" />
  </v-content>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as astring from 'astring'
import * as acorn from 'acorn'
import ModalSaveRepository from './components/ModalSaveRepository'
import LoadingPage from '../../components/LoadingPage'
export default {
  name: 'Playground',
  components: {
    ModalSaveRepository,
    LoadingPage
  },
  data () {
    return {
      isModalOpened: false,
      editor: '',
      result: '',
      errors: [],
      isRunning: false,
      script: ''
    }
  },
  methods: {
    openModal () {
      this.isModalOpened = true
      this.script = this.editor.getValue()
    },
    closeModal () {
      this.isModalOpened = false
    },
    runCode () {
      this.result = ''
      this.isRunning = true
      const customGenerator = Object.assign({}, astring.baseGenerator, {
        AwaitExpression: function (node, state) {
          state.write('await ')
          var argument = node.argument
          if (argument != null) {
            this[argument.type](argument, state)
          }
        }
      })
      const ast = acorn.parse(this.editor.getValue(), { ecmaVersion: 8 })
      const formattedCode = astring.generate(ast, {
        generator: customGenerator
      })
      this.$store.dispatch('executeSandbox', formattedCode)
        .then(({ data }) => {
          this.result = data.success
        })
        .catch(err => {
          this.errors = [err.response.data.msg]
        })
        .finally(() => {
          this.isRunning = false
        })
    }
  },
  mounted () {
    this.editor = monaco.editor.create(document.getElementById('coding-editor'), {
      value: [
        '\nfunction hello() {',
        '\treturn "I Love Javascript";',
        '}'
      ].join('\n'),
      language: 'javascript',
      theme: 'vs-dark',
      scrollbar: {
        useShadows: false,
        verticalHasArrows: true,
        horizontalHasArrows: true,
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 17,
        horizontalScrollbarSize: 17,
        arrowSize: 30
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isAuthenticated) {
        next()
      } else {
        next('/login')
      }
    })
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler (code) {
        if (Object.keys(code).length > 0) {
          this.$store.commit('SET_LOADING_REPOSITORY', true)
          this.$store.dispatch('getGithubRepositoryToken', code.code)
            .then(({ data }) => {
              const token = data.token
              const payload = JSON.parse(localStorage.repository)
              payload.token = token
              this.$store.dispatch('saveToGithubRepository', payload)
                .then(({ data }) => {
                  const { githubURL } = data
                  payload.githubURL = githubURL
                  this.$store.dispatch('createRepository', payload)
                    .then(repository => {
                      this.$store.commit('SET_ERROR_REPOSITORY', [])
                      localStorage.removeItem('repository')
                      this.$router.push('/profile/repositories')
                    })
                    .catch(err => {
                      this.$store.commit('SET_ERROR_REPOSITORY', [err.response.data])
                    })
                    .finally(() => this.$store.commit('SET_LOADING_REPOSITORY', false))
                })
                .catch(err => {
                  this.$store.commit('SET_ERROR_REPOSITORY', [err.response.data])
                  this.$store.commit('SET_LOADING_REPOSITORY', false)
                })
            })
            .catch(err => {
              this.$store.commit('SET_ERROR_REPOSITORY', [err.response.data])
              this.$store.commit('SET_LOADING_REPOSITORY', false)
            })
        }
      }
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.profile.isLoading
    },
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
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
  .my-2 {
    display: flex;
    justify-content: space-between;
  }
</style>
