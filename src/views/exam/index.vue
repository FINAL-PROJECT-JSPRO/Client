<template>
  <div>
    <v-row>
      <v-switch
        v-model="$vuetify.theme.dark"
        primary
        label="Dark"
      />
    </v-row>
    <v-row>
      <v-col class="question">
        <v-content>
          Subject 2 - Chapter 2
        </v-content>
        <v-row>
          <Question />
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col class="answer">
            <Answer />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="result">
            <Result />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Question from './components/Question'
import Answer from './components/Answer'
import Result from './components/Result'

export default {
  name: 'Exam',
  data () {
    return {

    }
  },
  components: {
    Question,
    Answer,
    Result
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0
  }
  .question {
    background-color: blue;
  }
  .answer {
    background-color: red;
    min-height: 500px;
  }
  .result {
    background-color: green;
    min-height: 500px;
  }
</style>
