import api from '../../../config/axios'

const actions = {
  login (context, payload) {
    // console.log(payload)
    return api.post('users/login', payload)
  },
  register (context, payload) {
    // console.log(payload)
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
  }
}

export default actions
