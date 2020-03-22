<template>
  <v-app>
    <LoadingApp v-if="isAppLoading" />
    <Fragment v-if="!isAppLoading">
      <Navbar />
      <router-view/>
    </Fragment>
  </v-app>
</template>

<script>
import LoadingApp from './components/LoadingApp'
import Navbar from './components/Navbar'
import { Fragment } from 'vue-fragment'
export default {
  name: 'App',
  components: {
    LoadingApp,
    Fragment,
    Navbar
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('SET_APP_LOADING', true)
      this.$store.dispatch('verify')
        .then(response => {
          this.$store.commit('SET_AUTHENTICATION', true)
          this.$store.commit('SET_USER', response.data)
        })
        .catch(err => {
          this.$store.commit('SET_AUTHENTICATION', false)
          this.$store.commit('SET_ERROR', err.response)
          this.$store.commit('SET_USER', null)
        })
        .finally(() => this.$store.commit('SET_APP_LOADING', false))
    } else {
      this.$store.commit('SET_AUTHENTICATION', false)
      this.$store.commit('SET_USER', null)
    }
  },
  computed: {
    isAppLoading () {
      return this.$store.state.auth.isAppLoading
    }
  }
}
</script>

<style lang="scss">
$body-font-family: 'Work Sans', sans-serif;
html {
  scroll-behavior: smooth;
}
* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}
.color-white {
  color: #fff !important
}
.bold {
  font-weight: bold !important
}
.img-responsive {
  width: 100%;
  height: auto;
}
.letter-spacing-heading {
  letter-spacing: 2px;
}
.text-decoration-none {
  text-decoration: none;
}
</style>
