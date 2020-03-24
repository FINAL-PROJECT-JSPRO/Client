<template>
  <v-row
    align="center"
    justify="center">
    <v-col
      cols="12"
      sm="8"
      md="4">
      <router-view/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Auth',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.isAuthenticated) {
        next('/subjects')
      } else {
        next()
      }
    })
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler (code) {
        if (Object.keys(code).length > 0) {
          this.$store.commit('SET_LOADING', true)
          this.$store.dispatch('getGithubToken', code.code)
            .then(({ data }) => {
              localStorage.githubToken = data.githubToken
              this.$store.dispatch('getGithubProfile', data.access_token)
                .then(({ data }) => {
                  this.$store.dispatch('loginWithGithub', data.profile)
                    .then(({ data }) => {
                      localStorage.token = data.token
                      this.$store.dispatch('verify')
                        .then(({ data }) => {
                          this.$store.commit('SET_AUTHENTICATION', true)
                          this.$store.commit('SET_ERRORS', [])
                          this.$store.commit('SET_USER', data)
                          this.$router.push('/subjects')
                        })
                        .catch(err => {
                          this.$store.commit('SET_AUTHENTICATION', false)
                          this.$store.commit('SET_ERRORS', [err.response.data.msg])
                        })
                        .finally(() => this.$store.commit('SET_LOADING', false))
                    })
                    .catch(err => {
                      this.$store.commit('SET_AUTHENTICATION', false)
                      this.$store.commit('SET_ERRORS', [err.response.data.msg])
                      this.$store.commit('SET_LOADING', false)
                    })
                })
                .catch(err => {
                  this.$store.commit('SET_ERRORS', [err.response.data.msg])
                  this.$store.commit('SET_LOADING', false)
                })
            })
            .catch(err => {
              this.$store.commit('SET_ERRORS', [err.response.data])
              this.$store.commit('SET_LOADING', false)
            })
        }
      }
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.auth.isAuthenticated
    }
  }
}
</script>

<style>

</style>
