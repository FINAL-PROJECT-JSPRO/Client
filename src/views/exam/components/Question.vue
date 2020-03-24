<template>
  <div class="container">
    <div class="question">
      <div v-html="question">
        <!-- {{ question }} -->
      </div>
      <div class="rule">
        <div>Don't know how to code in exam ? </div>
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              @click="changeDialogStatus(true)"
              color="primary"
              v-on="on"
            >
              Click Here
            </v-btn>
          </template>
          <ExamRule v-if="dialog" @changeDialogStatus="changeDialogStatus"/>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import ExamRule from './ExamRule'

export default {
  name: 'Exam_Question',
  data () {
    return {
      question: '',
      examTitle: '',
      dialog: false
    }
  },
  components: {
    ExamRule
  },
  methods: {
    fetchExam () {
      const id = this.$route.params.id
      // console.log(id)
      this.$store.dispatch('getExam', id)
        .then(({ data }) => {
          // console.log(data)
          this.question = data.question
          this.$store.commit('SET_SKELETON', data.skeleton)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    fetchExams () {
      this.$store.dispatch('getAllExam')
        .then(({ data }) => {
          console.log(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    changeDialogStatus (status) {
      this.dialog = status
    }
  },
  created () {
    this.fetchExam()
    // this.fetchExams()
  },
  mounted () {
    this.examTitle = document.getElementsByClassName('examTitle')
    // console.log(this.examTitle, '=======')
    // this.examTitle.appendChild('hr')
    // document.getElementsByTagName('h1').style.color = 'red'
  }
}
</script>

<style scoped>
  .question {
    background-color: white;
    margin: 0px 20px;
    min-height: 100vh;
    padding: 30px
  }
  .question-title {
    background: white;
  }
  .question-body {
    background: white
  }
  .container {
    margin: 0px;
    position: abosulte;
    min-height: 100vh;
    background-color:rgba(0, 0, 0, 0.7)
  }
  .examTitle {
    margin-bottom: 20px;
  }
  .rule {
    margin-top: 100px;
    padding: 15px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-content: center;
  }
  .rule div {
    padding-top: 5px;
    padding-right: 15px;
  }
</style>
