const mutations = {
  SET_CODE (state, payload) {
    state.code = payload
  },
  SET_SKELETON (state, payload) {
    state.skeleton = payload
  },
  SET_LOADING_EXAM (state, payload) {
    state.pageLoading = payload
  },
  SET_LOADING_RESULT (state, payload) {
    state.loading = payload
  },
  SET_LAST_CHAPTER_ID (state, payload) {
    state.lastChapterId = payload
  }
}

export default mutations
