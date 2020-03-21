import axios from '../../../config/axios'

const actions = {
  login (context, payload) {
    // console.log(payload)
    return axios.post('users/login', payload)
  },
  register (context, payload) {
    // console.log(payload)
    return axios.post('users/register', payload)
  }
}

export default actions
