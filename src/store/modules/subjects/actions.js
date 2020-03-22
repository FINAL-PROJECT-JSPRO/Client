import api from '../../../config/axios'

export default {
  fetchListOfSubjects ({ commit, state }) {
    commit('SET_LOADING_SUBJECTS', true)
    api({
      method: 'GET',
      url: 'subjects',
      headers: {
        access_token: localStorage.token
      }
    })
      .then(({ data }) => {
        commit('SET_SUBJECTS', data)
        commit('SET_ERROR_SUBJECTS', [])
      })
      .catch((err) => {
        commit('SET_SUBJECTS', [])
        commit('SET_ERROR_SUBJECTS', err.response.data)
      })
      .finally(() => commit('SET_LOADING_SUBJECTS', false))
  }
}
