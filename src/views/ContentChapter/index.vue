<template>
  <v-content>
    <LoadingPage v-if="isLoading" />
    <v-container v-if="!isLoading">
      <div class="content" v-html="chapterContent.body"></div>
      <v-btn
        depressed
        large
        color="primary"
        @click="clickNext"
        style="margin-right: 15px"
      >
        {{ statusChapter.isLast ? 'Finish' : 'Next'}}
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
      const subject = this.userSubjects.filter(subject => {
        return subject.SubjectId === this.chapterContent.SubjectId
      })[0].Subject
      const chapter = subject.Chapters.filter(chapter => {
        return chapter.id === +this.$route.params.id
      })[0]
      return chapter
    },
    status () {
      if (this.statusChapter.Histories[0]) {
        if (this.statusChapter.Histories[0].status) {
          return true
        }
      }
      return false
    }
  },
  methods: {
    clickBack () {
      if (!this.status) {
        this.completeChapter('back')
      } else {
        this.$router.push({ path: '/subjects' })
      }
    },
    clickNext () {
      if (!this.status) {
        this.completeChapter('next')
      } else {
        if (this.statusChapter.isLast) {
          this.$router.push({ path: `/subjects/exams/${+this.statusChapter.SubjectId}` })
        } else {
          this.$router.push({ path: `/subjects/chapter/${+this.statusChapter.id + 1}` })
        }
      }
    },
    completeChapter (payload) {
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
          if (payload === 'back') {
            this.$router.push({ path: '/subjects' })
          } else if (payload === 'next') {
            if (this.statusChapter.isLast) {
              this.$router.push({ path: `/subjects/exams/${+this.statusChapter.SubjectId}` })
            } else {
              this.$router.push({ path: `/subjects/chapter/${+this.statusChapter.id + 1}` })
            }
          }
        })
        .catch(err => {
          this.$store.commit('SET_ERROR_CHAPTER', err.response.data, { module: 'chapter' })
        })
        .finally(() => {
          this.$store.commit('SET_LOADING_CHAPTER', false, { module: 'chapter' })
        })
    }
  },
  created () {
    if (this.$store.state.subjects.userSubjects) {
      this.$store.dispatch('fetchUserSubjects')
    }
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
    next(vm => {
      if (vm.isAuthenticated) {
        next()
      } else {
        next('/login')
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('fetchChapterData', to.params.id)
      .then(({ data }) => {
        console.log('beforerouteupdate')
        this.$store.commit('SET_CHAPTER_CONTENT', data, { module: 'chapter' })
        this.$store.commit('SET_ERROR_CHAPTER', [], { module: 'chapter' })
      })
      .catch((err) => {
        this.$store.commit('SET_CHAPTER_CONTENT', [], { module: 'chapter' })
        this.$store.commit('SET_ERROR_CHAPTER', err.response.data, { module: 'chapter' })
      })
      .finally(() => {
        this.$store.commit('SET_LOADING_CHAPTER', false, { module: 'chapter' })
        next()
      })
  }
}
</script>

<style>

</style>
