export default {
  SET_SUBJECTS (state, payload) {
    state.subjects = payload
  },
  SET_DISABLE (state, payload) {
    state.disable = payload
  },
  SET_LOADING_SUBJECTS (state, payload) {
    state.isLoading = payload
  },
  SET_ERROR_SUBJECTS (state, payload) {
    state.errors = payload
  },
  SET_USER_SUBJECTS (state, payload) {
    state.userSubjects = payload
  }
}
