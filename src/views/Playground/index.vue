<template>
  <v-content>
    <LoadingPage v-if="isLoading" />
    <v-container>
      <v-row>
        <v-col sm="12" xs="12" md="6">
          <div class="wrapper">
            <div id="coding-editor"
            style="width:100%;min-height: 500px;"></div>
          </div>
          <div class="my-2">
            <v-btn @click="runCode" depressed large color="primary">Run</v-btn>
            <v-btn class="ma-2" @click="openModal" depressed large color="#24292e">
              <span class="btn-text">Add To Repository</span>
            </v-btn>
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
import * as walk from 'acorn-walk'
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
      const customGenerator = Object.assign({}, astring.baseGenerator, {
        AwaitExpression: function (node, state) {
          state.write('await ')
          var argument = node.argument
          if (argument != null) {
            this[argument.type](argument, state)
          }
        }
      })
      const code = this.editor.getValue()
      const ast = acorn.parse(code, { ecmaVersion: 8 })
      walk.ancestor(ast, {
        Literal (_, ancestors) {
          console.log("This literal's ancestors are:", ancestors.map(n => n))
        }
      })
      const formattedCode = astring.generate(ast, {
        generator: customGenerator
      })
      console.log(formattedCode)
      // eslint-disable-next-line no-new-func
      const func = new Function('', formattedCode)
      func()
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
  watch: {
    '$route.query': {
      immediate: true,
      handler (code) {
        if (Object.keys(code).length > 0) {
          this.$store.commit('SET_LOADING_REPOSITORY', true)
          this.$store.dispatch('getGithubRepositoryToken', code.code)
            .then(({ data }) => {
              const token = data.token
              this.$store.dispatch('getRepository')
                .then(({ data }) => {
                  const { repository } = data
                  const payload = {
                    token,
                    repoName: repository.name,
                    fileName: repository.fileName,
                    description: repository.description,
                    code: repository.code
                  }
                  this.$store.dispatch('saveToGithubRepository', payload)
                    .then(({ data }) => {
                      localStorage.removeItem('repository_id')
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