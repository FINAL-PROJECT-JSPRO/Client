<template>
  <v-content class="notFound">
    <v-container>
      <v-row>
        <v-col class="container" sm="12" md="10">
          <!-- <span>
            <v-icon x-large color="black">mdi-alpha-c-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-o-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-n-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-g-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-r-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-a-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-t-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-u-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-l-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-a-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-t-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-i-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-o-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-n-circle-outline</v-icon>
            <v-icon x-large color="black">mdi-alpha-s-circle-outline</v-icon>
          </span> -->
          <h1>CONGRATULATIONS</h1>
          <br />
          <!-- <v-divider /> -->
          <br />
          <h2>YOU'VE FINISH ALL SUBJECTS</h2>
          <h3>Your journey has just begun, keep learning and good luck :)</h3>
          <v-btn dark icon color="success" x-large @click="changeIcon">
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data () {
    return {
      icons: [
        'mdi-emoticon-cool',
        'mdi-face',
        'mdi-emoticon',
        'mdi-emoticon-excited',
        'mdi-emoticon-happy',
        'mdi-emoticon-neutral',
        'mdi-emoticon-sad',
        'mdi-emoticon-tongue'
      ],
      iconIndex: 0
    }
  },
  methods: {
    changeIcon () {
      this.iconIndex === this.icons.length - 1
        ? this.iconIndex = 0
        : this.iconIndex++
    }
  },
  computed: {
    icon () {
      return this.icons[this.iconIndex]
    }
  },
  created () {
    this.$store.commit('SET_ERROR_ROUTE_EXAM', '')
    this.$store.commit('SET_LOADING_ROUTE_EXAM', false)
  },
  beforeRouteEnter (to, from, next) {
    if (localStorage.token) {
      next()
    } else {
      next('/login')
    }
    next(function (vm) {
      vm.$store.dispatch('fetchUserSubjectsExam')
        .then(({ data }) => {
          // console.log(data)
          const lastSubject = data[data.length - 1].Subject
          const chapter = lastSubject.Chapters
          const lastChapter = chapter[chapter.length - 1]
          const history = lastChapter.Histories
          if (history.length !== 0 && history[0].status) {
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
  }
}
</script>

<style scoped>
  .notFound {
    background-color: rgba(0,0,0,0.7)
  }
  .container {
    padding: 10px;
    margin-top: 50px;
    background-color: white;
    color: black;
    min-height: 80%;
    text-align: center;
  }
</style>
