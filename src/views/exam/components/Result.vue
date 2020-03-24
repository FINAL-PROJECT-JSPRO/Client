<template>
  <v-row>
    <v-col class="result">
      <label :style="result.style">
        {{ result.code }}
      </label>
      <!-- <v-textarea
        outlined
        class="padding-coding"
        name="input-7-4"
        :label="value"
        v-model="result"
      >
      </v-textarea> -->
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
  methods: {
  },
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
