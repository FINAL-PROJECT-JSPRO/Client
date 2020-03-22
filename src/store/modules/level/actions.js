import api from '../../../config/axios'

const actions = {
  getAllLevel: ({ commit }) => {
    api({
      method: 'GET',
      url: 'levels'
    })
      .then(response => {
        commit('SET_LEVELS', response.data)
      })
      .catch(err => {
        commit('SET_LEVELS', [])
        commit('SET_ERROR', err.response)
      })
  }
}

export default actions
