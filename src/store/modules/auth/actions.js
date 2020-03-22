import api from '../../../config/axios'

const actions = {
  login (context, payload) {
    return api.post('users/login', payload)
  },
  register (context, payload) {
    return api.post('users/register', payload)
  },
  verify ({ commit }) {
    return api({
      method: 'POST',
      url: 'users/verify',
      headers: {
        access_token: localStorage.token
      }
    })
  },
  loginWithGoogle ({ commit }, token) {
    return api({
      method: 'POST',
      url: 'users/gSignIn',
      headers: {
        idtoken: token
      }
    })
  },
  logout ({ commit }) {
    commit('SET_AUTHENTICATION', false)
  }
}

export default actions
