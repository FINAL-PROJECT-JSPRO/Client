import actions from './actions'
import mutations from './mutations'

const state = {
  isAuthenticated: false,
  user: null,
  errors: [],
  isAppLoading: false,
  message: null,
  isLoading: false
}

export default {
  state,
  mutations,
  actions
}
