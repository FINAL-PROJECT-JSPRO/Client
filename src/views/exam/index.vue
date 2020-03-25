<template>
  <v-content class="exam">
    <Loading v-if="getLoadingRoute"/>
    <v-row class="exam-component" v-else>
      <v-col class="question" md="5">
        <Question/>
      </v-col>
      <Answer/>
    </v-row>
  </v-content>
</template>

<script>
import Question from './components/Question'
import Answer from './components/Answer'
import Loading from '../../components/LoadingProcess'

export default {
  name: 'Exam',
  data () {
    return {
    }
  },
  components: {
    Question,
    Answer,
    Loading
  },
  created () {
    this.$store.commit('SET_ERRORS', [])
    this.$store.commit('SET_MESSAGE', null)
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.token) {
      next()
    } else {
      next('/login')
    }
    const id = Number(to.params.id)
    next(function (vm) {
      vm.$store.dispatch('fetchUserSubjectsExam')
        .then(({ data }) => {
          // console.log(data, id)
          const subject = data.filter(el => el.SubjectId === id)
          if (subject.length === 0) {
            next('/subjects')
          }
          const chapter = subject[0].Subject.Chapters
          const history = chapter[chapter.length - 1].Histories
          if (subject[0].status === 'active') {
            if (history.length !== 0 && history[0].status) {
              next()
            } else {
              next('/subjects')
            }
          } else {
            next('/subjects')
          }
        })
        .catch((err) => {
          vm.$store.commit('SET_ERROR_ROUTE_EXAM', err.response)
        })
        .finally(() => vm.$store.commit('SET_LOADING_ROUTE_EXAM', false))
    })
  },
  computed: {
    getLoadingRoute () {
      return this.$store.state.exam.loadingRoute
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }
  .exam {
    padding-top: 100px
  }
  .question {
    min-height:100%;
    padding: 0px
  }
</style>
