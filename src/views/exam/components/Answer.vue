<template>
  <v-col sm="12" md="7">
    <v-row class="answer" :style="getBackground">
      <div class="answer-container">
        <v-row class="container">
          <v-col class="editor-container" sm="12" md="12">
            <Loading v-if="!getSkeleton"/>
            <div
              id="editor"
              @change="onCodeChange"
            ></div>
          </v-col>
        </v-row>
        <v-row class="btn-container">
          <v-btn color="primary" @click="runMonaco">Run</v-btn>
          <v-btn color="primary" @click="resetAnswer">Clear</v-btn>
          <v-btn color="warning" @click="submitAnswer">Submit</v-btn>
          <v-btn color="success" @click="nextSubject" :disabled="getCheckAnswerStatus">Next</v-btn>
        </v-row>
      </div>
    </v-row>
    <div class="result" :style="getBackground">
      <h2>Result</h2>
      <Loading v-if="getLoading"/>
      <div v-if="checkAnswer.success || checkAnswer.error">
        <h2 :style="checkAnswer.style">{{ checkAnswer.msg }}</h2>
      </div>
      <Result :result="result"/>
    </div>
  </v-col>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as acorn from 'acorn'
import * as astring from 'astring'
import Result from './Result'
import Loading from '../../../components/LoadingProcess'

export default {
  name: 'Exam_Answer',
  data () {
    return {
      editor: '',
      code: [
        ''
      ],
      options: {
        selectOnLineNumbers: true
      },
      result: {
        code: '',
        style: {}
      },
      checkAnswer: {
        msg: '',
        success: false,
        error: false,
        style: {
          color: null
        }
      },
      runCounter: 0
    }
  },
  components: {
    Result,
    Loading
  },
  mounted () {
    // this.code = this.getSkeleton
    // console.log(this.code)
    if (this.getSkeleton) {
      this.showMonacoEditor()
    }
  },
  created () {
    // console.log(this.$store.state.exam.skeleton)
    this.$store.commit('SET_ERROR_ANSWER', '')
    this.runCounter = 0
    this.code = this.getSkeleton
  },
  methods: {
    showMonacoEditor () {
      this.editor = monaco.editor.create(document.getElementById('editor'), {
        value: [this.code].join('\n'),
        language: 'javascript',
        theme: this.getEditorBackground,
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
    runMonaco (value) {
      this.checkAnswer = {
        msg: '',
        success: false,
        error: false,
        style: {
          color: null
        }
      }
      this.code = this.editor.getValue()
      const code = this.code
      const ast = acorn.parse(code, { ecmaVersion: 8 })
      var customGenerator = Object.assign({}, astring.baseGenerator, {
        AwaitExpression: function (node, state) {
          state.write('await ')
          var argument = node.argument
          if (argument != null) {
            this[argument.type](argument, state)
          }
        }
      })
      var formattedCode = astring.generate(ast, {
        generator: customGenerator
      })
      // eslint-disable-next-line no-new-func
      const func = new Function(formattedCode)
      func()
      this.$store.dispatch('executeSandbox', formattedCode)
        .then(({ data }) => {
          // console.log(data)
          if (data.success) {
            this.result = {
              code: data.success,
              style: {
                color: 'black',
                fontSize: '15px'
              }
            }
            this.runCounter = 0
          } else {
            this.runCounter += 1
            if (this.runCounter >= 3) {
              this.result = {
                code: 'Please read the manual for run a coding in exam',
                style: {
                  color: 'red',
                  fontSize: '20px'
                }
              }
            } else {
              this.result = {
                code: 'Please invoke your function to run',
                style: {
                  color: 'red',
                  fontSize: '20px'
                }
              }
            }
          }
        })
        .catch(err => {
          this.$store.commit('SET_ERROR_ANSWER', err.response)
        })
    },
    onCodeChange (e) {
      this.code = e.target.value
      // console.log(this.code, '==')
    },
    submitAnswer () {
      // console.log(this.code, '====')
      this.$store.commit('SET_LOADING_RESULT', true)
      this.result = {
        code: '',
        style: {}
      }
      this.code = this.editor.getValue()
      const payload = {
        code: this.code,
        id: this.$route.params.id
      }
      this.$store.dispatch('getExamAnswer', payload)
        .then(({ data }) => {
          if (data.msg) {
            this.checkAnswer = {
              msg: data.msg,
              success: true,
              error: false,
              style: {
                color: 'green'
              }
            }
          }

          // active new subject
          return this.$store.dispatch('updateSubjectHistory', {
            subjectId: +this.$route.params.id + 1,
            status: 'active'
          })
        })
        .then(() => {
          // unlocked current subject
          return this.$store.dispatch('updateSubjectHistory', {
            subjectId: +this.$route.params.id,
            status: 'unlocked'
          })
        })
        .then(() => {
          // unlock next chapter
          return this.$store.dispatch('insertChapterHistory', {
            ChapterId: +this.lastChapterId + 1,
            status: false
          })
        })

        .catch(err => {
          // console.log(err.response, '====')
          const data = err.response.data
          let msg = data.msg
          if (data.error) {
            if (data.error.message) {
              msg += ' | ' + data.error.message
            }
          }
          this.checkAnswer = {
            msg,
            success: false,
            error: true,
            style: {
              color: 'red'
            }
          }
        })
        .finally(() => {
          this.$store.commit('SET_LOADING_RESULT', false)
        })
    },
    resetAnswer () {
      this.code = this.$store.state.exam.skeleton
      document.getElementById('editor').innerHTML = ''
      this.showMonacoEditor()
    },
    nextSubject () {
      document.getElementById('editor').innerHTML = ''
      this.$router.push('/subjects')
    }
  },
  watch: {
    getSkeleton () {
      if (this.getSkeleton) {
        document.getElementById('editor').innerHTML = ''
        this.code = this.getSkeleton
        this.showMonacoEditor()
      }
    }
  },
  computed: {
    getCheckAnswerStatus () {
      if (this.checkAnswer.success) {
        return false
      } else {
        return true
      }
    },
    getEditorVal () {
      return this.editor.getValue()
    },
    getLoading () {
      return this.$store.state.exam.loading
    },
    getSkeleton () {
      return this.$store.state.exam.skeleton
    },
    lastChapterId () {
      return this.$store.state.exam.lastChapterId
    },
    getBackground () {
      if (this.$vuetify.theme.dark === false) {
        return 'backgroundColor: white'
      } else {
        return 'backgroundColor: dark'
      }
    },
    getEditorBackground () {
      if (this.$vuetify.theme.dark === false) {
        return 'vs-dark'
      } else {
        return 'vs-light'
      }
    }
  }
}
</script>

<style scoped>
  .answer {
    margin: 0px;
    padding: 0px;
  }
  .answer-container {
    min-height: 100%;
    min-width: 100%;
  }
  #editor {
    min-height: 360px;
    min-width: 100%;
  }
  .editor-container {
    align-content: center;
    justify-content: center;
  }
  .container {
    margin: 0px;
    padding: 15px;
  }
  .btn-container {
    display: flex;
    justify-content: space-around;
    margin: 0px 10px 15px;
    padding: 10px;
  }
  .result {
    border-top: 10px solid rgba(0, 0, 0, 0.7);
    padding: 10px 20px
  }
</style>
