<template>
  <v-row>
    <v-col>
      <label :style="result.style">
        {{ result.code }}
      </label>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Exam_Result',
  data () {
    return {
      value: ''
    }
  },
  props: [
    'result'
  ],
  created () {
    this.value = this.result.code
  }
}
</script>

<style scoped>
  .result {
    background-color: white
  }
</style>
