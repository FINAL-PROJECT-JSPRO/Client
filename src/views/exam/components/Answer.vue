<template>
  <v-row>
    <MonacoEditorVue
      height="500"
      width="500"
      theme="vs-dark"
      language="javascript"
      :code="code"
      :options="options"
      @mounted="onMounted"
      @change="onCodeChange"
    ></MonacoEditorVue>
    <v-btn @click="runMonaco">Run</v-btn>
  </v-row>
</template>

<script>
import MonacoEditorVue from 'monaco-editor-vue'
import * as acorn from 'acorn'
import * as astring from 'astring'

export default {
  name: 'Exam_Answer',
  components: {
    MonacoEditorVue
  },
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
      // var ast = {
      //   type: 'AwaitExpression',
      //   argument: {
      //     type: 'CallExpression',
      //     callee: {
      //       type: 'Identifier',
      //       name: 'callable'
      //     },
      //     arguments: []
      //   }
      // }
      // const formattedCode = astring.generate(ast)
      var formattedCode = astring.generate(ast, {
        generator: customGenerator
      })
      // eslint-disable-next-line no-new-func
      const func = new Function(formattedCode)
      func()
    },
    onCodeChange (value) {
      // console.log(value, 'vue-monaco')
      this.code = value
      // console.log(this.codeVue, '==')
    },
    onMounted (value) {
      // console.log(value, 'monaco-vue')
      this.value = value
    }
  }
}
</script>

<style>

</style>
