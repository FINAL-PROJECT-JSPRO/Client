import actions from './actions'
import mutations from './mutations'

const state = {
  errors: [],
  message: '',
  isLoading: false,
  repositories: []
}

export default {
  state,
  actions,
  mutations
}
