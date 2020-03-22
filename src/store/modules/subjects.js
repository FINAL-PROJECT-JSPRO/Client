import dummyServerAPI from '../../API/dummyServerAPI'

export default {
  state: {
    subjects: [],
    disable: false
  },
  mutations: {
    setListOfSubjects (state, payload) {
      state.subjects = payload
    },
    setDisable (state, payload) {
      state.disable = payload
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
  }
}
