<template>
  <v-content>
    <LoadingPage v-if="isLoading" />
    <v-container v-if="!isLoading">
      <div
        class="disable-bg"
        v-if="disable"
      >
      </div>
      <v-row align="center">
          <v-col class="d-flex" cols="12" sm="4">
            <v-select
              v-model="select"
              color="#00CB54"
              item-color="green"
              :items="[{
                name: 'All',
                value: 'All'
              }].concat(levels)"
              item-text="name"
              item-value="id"
              label="Level"
            ></v-select>
          </v-col>
      </v-row>
      <v-row>
        <CardSubject
          v-for="subject in subjects"
          :key="subject.SubjectId"
          :subject="isAuthenticated ? subject.Subject : subject"
          :status="isAuthenticated ? subject.status : 'nologin'"
        />
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import CardSubject from './components/CardSubject'
import LoadingPage from '../../components/LoadingPage'

export default {
  name: 'Subject',
  components: {
    CardSubject,
    LoadingPage
  },
  data () {
    return {
      select: 'All'
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     if (vm.isAuthenticated) {
  //       next()
  //     } else {
  //       next('/login')
  //     }
  //   })
  // },
  computed: {
    // userSubjects () {
    //   if (this.select !== 'All') {
    //     return this.$store.state.subjects.userSubjects.filter(({ Subject }) => Subject.LevelId === this.select)
    //   }
    //   return this.$store.state.subjects.userSubjects
    // },
    subjects () {
      if (this.isAuthenticated) {
        if (this.select !== 'All') {
          return this.$store.state.subjects.userSubjects.filter(({ Subject }) => Subject.LevelId === this.select)
        }
        return this.$store.state.subjects.userSubjects
      } else {
        if (this.select !== 'All') {
          return this.$store.state.subjects.subjects.filter(subject => subject.LevelId === this.select)
        }
        return this.$store.state.subjects.subjects
      }
    },
    disable () {
      return this.$store.state.subjects.disable
    },
    isLoading () {
      return this.$store.state.subjects.isLoading
    },
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    },
    levels () {
      return this.$store.state.level.levels
    }
  },
  created () {
    if (this.isAuthenticated) {
      console.log('logi')
      this.$store.dispatch('fetchUserSubjects')
    } else {
      this.$store.dispatch('fetchListOfSubjects')
      console.log('engga')
    }
    this.$store.dispatch('getAllLevel')
  }
}
</script>

<style lang="css" scoped>
  .disable-bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .4);
    z-index: 2;
    top: 0;
    left: 0;
  }
</style>
