const mutations = {
  SET_CHAPTER_CONTENT (state, payload) {
    state.chapterContent = payload
  },
  SET_LOADING_CHAPTER (state, payload) {
    state.isLoading = payload
  },
  SET_ERROR_CHAPTER (state, payload) {
    state.errors = payload
  },
  // alert
  SHOW_ALERT (state, payload) {
    state.message = payload.message
    state.showAlert = true
    setTimeout(() => {
      state.showAlert = false
    }, payload.interval)
  }
}
export default mutations
