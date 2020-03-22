import actions from './actions'
import mutations from './mutations'

export default {
  state: {
    subjects: [],
    disable: false,
    isLoading: false,
    errors: []
  },
  mutations,
  actions
}
