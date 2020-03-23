<template>
  <v-row>
    <v-col class="result">
      <label>
        {{ result }}
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
    console.log(this.result, 'result  asdasdsa')
    this.value = this.result
  }
}
</script>

<style>

</style>
