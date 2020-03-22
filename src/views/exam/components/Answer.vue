<template>
  <v-col>
    <v-row class="answer">
      <v-content class="answer-container">
        <h3>Write your answer here</h3>
        <div></div>
        <v-row class="container">
          <v-col sm="12" md="11" class="editor-container">
            <div
              id="editor"
              @change="onCodeChange"
            ></div>
          </v-col>
        </v-row>
        <v-row class="btn-container">
          <v-btn @click="runMonaco">Run</v-btn>
        </v-row>
      </v-content>
    </v-row>
    <div>
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
        '\nfunction hello() {\n \treturn "I Love Javascript"; \n}'
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
  methods: {
    runMonaco (value) {
      // console.log(this.code)
      const code = this.code
      // console.log(code)
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
      this.result = func()
    },
    onCodeChange (e) {
      this.code = e.target.value
      // console.log(this.code, '==')
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
    background-color: seagreen
  }
  #editor {
    min-height: 400px;
    min-width: 100%;
  }
  .editor-container {
    align-content: center;
    justify-content: center;
    background-color: blue
  }
  .container {
    background-color: maroon;
    margin-left: 10px
  }
  .btn-container {
    margin-left: 10px
  }
</style>
