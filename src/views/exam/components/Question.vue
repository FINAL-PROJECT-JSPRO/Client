<template>
  <div class="container">
    <div class="question">
      <div v-html="question">
        <!-- {{ question }} -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Exam_Question',
  data () {
    return {
      question: '',
      examTitle: ''
    }
  },
  methods: {
    fetchExam () {
      const id = this.$route.params.id
      // console.log(id)
      this.$store.dispatch('getExam', id)
        .then(({ data }) => {
          console.log(data)
          this.question = data.question
          this.$store.commit('SET_SKELETON', data.skeleton)
          this.examTitle = document.getElementsByClassName('examTitle')
          const hr = document.createElement('hr')
          // console.log(this.examTitle)
          this.examTitle.append(hr)
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
    mounted () {
      this.examTitle = document.getElementsByClassName('examTitle')[0]
      // console.log(this.examTitle, '=======')
      document.getElementsByTagName('h1').style.color = 'red'
      // const hr = document.createElement('hr')
      // console.log(this.examTitle)
      // this.examTitle.append(hr)
    }
  },
  created () {
    this.fetchExam()
    // this.fetchExams()
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
    border-right: 1px solid grey;
    background-color:grey
  }
  .examTitle {
    margin-bottom: 20px;
  }
</style>
