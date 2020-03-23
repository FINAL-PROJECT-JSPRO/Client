<template>
  <v-card>
    <v-card-title
      dark
      style="background-color: rgba(0, 0, 0, 0.7); color: white"
      primary-title
    >
      How To Run in Exam Mode
    </v-card-title>
    <div>
      <v-card-title>
        Run
      </v-card-title>
      <v-card-text>
        You must invoke your function to run your function.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-title>
        Submit
      </v-card-title>
      <v-card-text>
        You must <b>not</b> invoke your function to submit your answer
      </v-card-text>
    </div>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        text
        @click="changeDialogStatus"
      >
        Okay, i understand
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Exam_Rule',
  data () {
    return {
    }
  },
  methods: {
    changeDialogStatus () {
      this.$emit('changeDialogStatus', false)
    }
  }
}
</script>

<style>

</style>
