import actions from './actions'
import mutations from './mutations'

const state = {
  code: '',
  skeleton: '',
  error: '',
  loading: false,
  pageLoading: false
}

export default {
  state,
  actions,
  mutations
}
