<template>
  <v-row>
    <MonacoEditorVue
      height="500"
      theme="vs-dark"
      language="javascript"
      :code="codeVue"
      :options="options"
      @mounted="onMountedVue"
      @change="onChange"
    ></MonacoEditorVue>
    <v-btn @click="runMonacoVue">Run</v-btn>
    <MonacoEditor
      height="300"
      width="1200"
      language="javascript"
      :code="code"
      :editorOptions="options"
      @mounted="onMounted"
      @codeChange="onCodeChange"
      >
    </MonacoEditor>
    <div id='container'>

    </div>
  </v-row>
</template>

<script>
import MonacoEditorVue from 'monaco-editor-vue'
import MonacoEditor from 'vue-monaco-editor'
import monaco from 'monaco-editor'

export default {
  name: 'Exam_Answer',
  components: {
    MonacoEditorVue,
    MonacoEditor
  },
  data () {
    return {
      code: '<MonacoEditor language="typescript" :code="code" :editorOptions="options" @mounted="onMounted" @codeChange="onCodeChange"></MonacoEditor>',
      codeVue: '',
      options: {
        selectOnLineNumbers: true
      }
    }
  },
  methods: {
    run (code) {
      return code
    },
    runMonacoVue (value) {
      // console.log(this.codeVue)
      monaco.editor.create(document.getElementById('container'), {
        value: 'function hello() {\n\talert("Hello world!");\n}',
        language: 'javascript'
      })
      this.run(this.codeVue)
    },
    onChange (value) {
      // console.log(value, 'vue-monaco')
      this.codeVue = value
      console.log(this.codeVue, '==')
    },
    onMountedVue (value) {
      console.log(value, 'vue-monaco')
    },
    onMounted (value) {
      console.log(value, 'monaco-vue')
      this.value = value
    },
    onCodeChange (value) {
      console.log(value, 'monaco-vue')
    }
  }
}
</script>

<style>

</style>
