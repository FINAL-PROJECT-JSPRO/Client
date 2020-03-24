const mutations = {
  SET_ERROR_REPOSITORY (state, payload) {
    state.errors = payload
  },
  SET_LOADING_REPOSITORY (state, payload) {
    state.isLoading = payload
  },
  SET_REPOSITORIES (state, payload) {
    state.repositories = payload
  }
}
export default mutations
