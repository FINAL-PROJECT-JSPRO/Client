import dummyServerAPI from '../../API/dummyServerAPI'

export default {
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
  }
}
