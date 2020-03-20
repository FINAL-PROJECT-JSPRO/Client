import Vue from 'vue'
import Vuex from 'vuex'
import dummyServerAPI from '../API/dummyServerAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    subjects: []
  },
  mutations: {
    setListOfSubjects (state, payload) {
      state.subjects = payload
    }
  },
  actions: {
    fetchListOfSubjects (context) {
      dummyServerAPI.get('/subjects')
        .then(({ data }) => {
          context.commit('setListOfSubjects', data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
