<template>
  <div class="container">
    <div class="question" :style="getBackground">
      <div v-html="question">
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
      examBody: '',
      dialog: false
    }
  },
  components: {
    ExamRule
  },
  methods: {
    fetchExam () {
      const id = this.$route.params.id
      this.$store.dispatch('getExam', id)
        .then(({ data }) => {
          // console.log(data)
          this.question = data.question
          this.$store.commit('SET_SKELETON', data.skeleton)
          this.$store.commit('SET_LAST_CHAPTER_ID', data.Subject.Chapters[data.Subject.Chapters.length - 1].id)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR_EXAM', err.response)
        })
    },
    fetchExams () {
      this.$store.dispatch('getAllExam')
        .then(({ data }) => {
          this.$store.commit('SET_EXAMS', data)
        })
        .catch(err => {
          this.$store.commit('SET_ERROR_EXAM', err.response)
        })
    },
    changeDialogStatus (status) {
      this.dialog = status
    }
  },
  created () {
    this.fetchExam()
    // console.log(this.$vuetify.theme.dark)
    // this.fetchExams()
  },
  computed: {
    getBackground () {
      if (this.$vuetify.theme.dark === false) {
        return 'backgroundColor: white'
      } else {
        return 'backgroundColor: dark'
      }
    }
  },
  watch: {
    examBody () {
      if (this.examBody.length > 0) {
        this.examBody.forEach(el => {
          el.style.color = 'black'
        })
      }
    }
  },
  mounted () {
    this.examBody = this.$el.getElementsByClassName('examBody')
    this.examTitle = this.$el.getElementsByClassName('examTitle')
  }
}
</script>

<style scoped>
  .question {
    margin: 0px 20px;
    min-height: 90.8vh;
    padding: 30px
  }
  .question-body {
    background: rgba(255, 255, 255, 0.7);
  }
  .container {
    margin: 0px;
    position: abosulte;
    background-color:rgba(0, 0, 0, 0.7)
  }
  .examTitle {
    margin-bottom: 20px;
  }
  .examBody {
    color: black
  }
  .rule {
    margin-top: 70px;
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
