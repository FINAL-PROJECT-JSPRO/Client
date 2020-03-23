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
  loginWithGithub ({ commit }, payload) {
    return api({
      method: 'POST',
      url: 'github/login',
      data: {
        payload
      }
    })
  },
  getGithubToken ({ commit }, code) {
    return api({
      method: 'POST',
      url: 'github/token',
      data: {
        client_id: process.env.VUE_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.VUE_APP_GITHUB_SECRET,
        code
      }
    })
  },
  getGithubProfile ({ commit }, token) {
    return api({
      method: 'POST',
      url: 'github/profile',
      headers: {
        access_token: token
      }
    })
  },
  logout ({ commit }) {
    commit('SET_AUTHENTICATION', false)
  }
}

export default actions
