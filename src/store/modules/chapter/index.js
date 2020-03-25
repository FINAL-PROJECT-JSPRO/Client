import actions from './actions'
import mutations from './mutations'

const state = {
  access: false,
  chapterContent: [],
  isLoading: false,
  errors: [],
  // alert
  message: '',
  showAlert: false
}

export default {
  state,
  mutations,
  actions
}
