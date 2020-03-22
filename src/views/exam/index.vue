<template>
  <div class="exam">
    <!-- <v-row>
      <v-switch
        v-model="$vuetify.theme.dark"
        primary
        label="Dark"
      />
    </v-row> -->
    <v-row>
      <v-col class="question">
        <Question/>
      </v-col>
      <Answer />
    </v-row>
  </div>
</template>

<script>
import Question from './components/Question'
import Answer from './components/Answer'

export default {
  name: 'Exam',
  data () {
    return {

    }
  },
  components: {
    Question,
    Answer
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isAuthenticated) {
        next()
      } else {
        next('/login')
      }
    })
  }
}
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px
  }
  .exam {
    margin-top: 60px;
    position: relative
  }
  .question {
    min-height:100%;
    padding: 0px
  }
</style>
