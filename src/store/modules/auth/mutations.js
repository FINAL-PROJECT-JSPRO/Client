const mutations = {
  SET_AUTHENTICATION (state, payload) {
    state.isAuthenticated = payload
  },
  SET_USER (state, payload) {
    state.user = payload
  },
  SET_ERRORS (state, payload) {
    state.errors = payload
  },
  SET_APP_LOADING (state, payload) {
    state.isAppLoading = payload
  },
  SET_MESSAGE (state, payload) {
    state.message = payload
  },
  SET_LOADING (state, payload) {
    state.isLoading = payload
  },
  SET_LOADING_PROFILE (state, payload) {
    state.isLoadingProfile = payload
  },
  SET_LOADING_PROFILE_IMAGE (state, payload) {
    state.isLoadingProfileImage = payload
  },
  SET_ERROR_PROFILE_IMAGE (state, payload) {
    state.errorProfileImage = payload
  }
}
export default mutations
