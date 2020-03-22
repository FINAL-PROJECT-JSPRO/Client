import dummyServerAPI from '../../../API/dummyServerAPI'

export default {
  fetchListOfSubjects (context) {
    dummyServerAPI.get('/subjects')
      .then(({ data }) => {
        context.commit('SET_SUBJECTS', data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
