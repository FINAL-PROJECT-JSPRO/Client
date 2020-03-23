<template>
  <v-col sm="12" md="7">
    <v-row class="answer">
      <div class="answer-container">
        <v-row class="container">
          <v-col class="editor-container" sm="12" md="12">
            <div
              id="editor"
              @change="onCodeChange"
            ></div>
          </v-col>
        </v-row>
        <v-row class="btn-container">
          <v-btn color="primary" @click="runMonaco">Run</v-btn>
          <v-btn color="primary" @click="resetAnswer">Clear</v-btn>
          <v-btn color="primary" @click="submitAnswer">Submit</v-btn>
        </v-row>
      </div>
    </v-row>
    <div class="result">
      <h2>Result</h2>
      <Result :result="result"/>
    </div>
  </v-col>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as acorn from 'acorn'
import * as astring from 'astring'
import Result from './Result'

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
      result: ''
    }
  },
  components: {
    Result
  },
  mounted () {
    this.showMonacoEditor()
  },
  created () {
    // console.log(this.$store.state.exam.skeleton)
    this.code = this.$store.state.exam.skeleton
  },
  methods: {
    showMonacoEditor () {
      this.editor = monaco.editor.create(document.getElementById('editor'), {
        value: [this.code].join('\n'),
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
    runMonaco (value) {
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
      // const func = new Function(formattedCode)
      // func()
      // this.result = func()
      // console.log(func)
      // console.log(formattedCode)
      this.$store.dispatch('executeSandbox', formattedCode)
        .then(({ data }) => {
          console.log(data)
          if (data.success) {
            this.result = data.success
          } else {
            this.result = data.error
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    onCodeChange (e) {
      this.code = e.target.value
      console.log(this.code, '==')
    },
    submitAnswer () {
      // console.log(this.code)
      const payload = {
        code: this.code,
        id: this.$route.params.id
      }
      this.$store.dispatch('getExamAnswer', payload)
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    resetAnswer () {
      this.code = this.$store.state.exam.skeleton
      document.getElementById('editor').innerHTML = ''
      this.showMonacoEditor()
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
    background-color: white;
    min-height: 100%;
    min-width: 100%;
  }
  #editor {
    min-height: 400px;
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
    margin: 10px;
    padding: 10px;
  }
  .result {
    border-top: 1px solid gray;
    padding: 10px 20px
  }
</style>
