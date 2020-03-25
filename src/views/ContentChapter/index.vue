<template>
  <v-content>
    <LoadingPage v-if="isLoading" />
    <v-container v-if="!isLoading && userSubjects[0]">
      <div class="content" v-html="chapterContent.body"></div>
      <v-btn
        depressed
        large
        color="primary"
        @click="clickNext"
        style="margin-right: 15px"
      >
        Next
      </v-btn>
      <v-btn depressed large color="primary" @click="clickBack">Back</v-btn>
    </v-container>
  </v-content>
</template>

<script>
import LoadingPage from '../../components/LoadingPage'

export default {
  name: 'ContentChapter',
  components: {
    LoadingPage
  },
  computed: {
    chapterContent () {
      return this.$store.state.chapter.chapterContent
    },
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },
    isLoading () {
      return this.$store.state.chapter.isLoading
    },
    userSubjects () {
      return this.$store.state.subjects.userSubjects
    },
    statusChapter () {
      if (this.userSubjects[0]) {
        const subject = this.userSubjects.filter(subject => {
          return subject.SubjectId === this.chapterContent.SubjectId
        })[0].Subject
        const chapter = subject.Chapters.filter(chapter => {
          return chapter.id === +this.$route.params.id
        })[0]
        return chapter
      }
      return {}
    },
    status () {
      if (this.statusChapter.Histories) {
        if (this.statusChapter.Histories[0]) {
          if (this.statusChapter.Histories[0].status) {
            return true
          }
        }
      }
      return false
    }
  },
  methods: {
    clickBack () {
      this.$router.push({ path: '/subjects' })
    },
    clickNext () {
      if (this.statusChapter.isLast) {
        this.$router.push({ path: `/subjects/exams/${+this.statusChapter.SubjectId}` })
      } else {
        this.$router.push({ path: `/subjects/chapter/${+this.statusChapter.id + 1}` })
      }
    }
  },
  async created () {
    await this.$store.dispatch('fetchUserSubjects')
    this.$store.dispatch('fetchChapterData', this.$route.params.id)
      .then(({ data }) => {
        this.$store.commit('SET_CHAPTER_CONTENT', data, { module: 'chapter' })
        this.$store.commit('SET_ERROR_CHAPTER', [], { module: 'chapter' })
      })
      .catch((err) => {
        this.$store.commit('SET_CHAPTER_CONTENT', [], { module: 'chapter' })
        this.$store.commit('SET_ERROR_CHAPTER', err.response.data, { module: 'chapter' })
      })
      .finally(() => {
        this.$store.commit('SET_LOADING_CHAPTER', false, { module: 'chapter' })
      })
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.token) {
      next()
    } else {
      next('/login')
    }
    next(vm => {
      vm.$store.dispatch('fetchChapterData', to.params.id)
        .then(({ data }) => {
          const subjectId = data.SubjectId
          vm.$store.dispatch('fetchUserSubjectsExam')
            .then(({ data }) => {
              const subject = data.filter(el => el.SubjectId === subjectId)
              if (subject.length === 0) {
                next('/subjects')
              }
              const chapters = subject[0].Subject.Chapters
              const history = chapters.filter(chapter => chapter.id === +to.params.id)[0].Histories
              if (history.length) {
                next()
              } else {
                next('/subjects')
              }
            })
            .catch((err) => {
              vm.$store.commit('SET_ERROR_ROUTE_EXAM', err.response)
            })
            .finally(() => vm.$store.commit('SET_LOADING_ROUTE_EXAM', false))
        })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('fetchChapterData', to.params.id)
      .then(({ data }) => {
        this.$store.commit('SET_CHAPTER_CONTENT', data, { module: 'chapter' })
        this.$store.commit('SET_ERROR_CHAPTER', [], { module: 'chapter' })
      })
      .catch((err) => {
        this.$store.commit('SET_CHAPTER_CONTENT', [], { module: 'chapter' })
        this.$store.commit('SET_ERROR_CHAPTER', err.response.data, { module: 'chapter' })
      })
      .finally(() => {
        this.$store.commit('SET_LOADING_CHAPTER', false, { module: 'chapter' })
        if (!this.status) {
          this.$store.dispatch('updateChapterHistory', {
            ChapterId: this.$route.params.id,
            status: true
          })
            .then(() => {
              if (!this.statusChapter.isLast) {
                return this.$store.dispatch('insertChapterHistory', {
                  ChapterId: +this.$route.params.id + 1,
                  status: false
                })
              }
            })
            .then(() => {
              next()
            })
            .catch(err => {
              this.$store.commit('SET_ERROR_CHAPTER', err.response.data, { module: 'chapter' })
            })
            .finally(() => {
              this.$store.commit('SET_LOADING_CHAPTER', false, { module: 'chapter' })
            })
        } else {
          next()
        }
      })
  },
  beforeRouteLeave (to, from, next) {
    if (!this.status) {
      this.$store.dispatch('updateChapterHistory', {
        ChapterId: this.$route.params.id,
        status: true
      })
        .then(() => {
          if (!this.statusChapter.isLast) {
            return this.$store.dispatch('insertChapterHistory', {
              ChapterId: +this.$route.params.id + 1,
              status: false
            })
          }
        })
        .then(() => {
          next()
        })
        .catch(err => {
          this.$store.commit('SET_ERROR_CHAPTER', err.response.data, { module: 'chapter' })
        })
        .finally(() => {
          this.$store.commit('SET_LOADING_CHAPTER', false, { module: 'chapter' })
        })
    } else {
      next()
    }
  }
}
</script>

<style>

</style>
