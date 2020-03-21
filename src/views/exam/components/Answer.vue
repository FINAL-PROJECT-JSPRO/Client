<template>
  <v-row>
     <template v-slot:label>
        <div>
          Answer
        </div>
      </template>
    <template>
      <div>
        <v-textarea
          id="editor"
          :code="code"
          :options="options"
          @mounted="onMounted"
          @change="onCodeChange"
          placeholder="Write your code here"
        />
      </div>
    </template>
    <v-btn @click="runMonaco">Run</v-btn>
  </v-row>
</template>

<script>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import * as acorn from 'acorn'
import * as astring from 'astring'

export default {
  name: 'Exam_Answer',
  data () {
    return {
      code: '',
      options: {
        selectOnLineNumbers: true
      }
    }
  },
  methods: {
    runMonaco (value) {
      // console.log(this.code)
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
    },
    onCodeChange (value) {
      this.code = value
      console.log(this.code, '==')
    },
    onMounted (value) {
      this.code = monaco.editor.create(document.getElementById('editor'), {
        value: [
          '\nfunction hello() {',
          '\tconsole.log("Hello world!");',
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
    }
  }
}
</script>

<style>
  #editor {
    width: 500px;
    height: 500px;
    background-color: white;
  }
</style>
