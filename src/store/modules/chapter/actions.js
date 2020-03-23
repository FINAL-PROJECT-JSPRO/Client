import api from '../../../config/axios'

export default {
  fetchChapterData ({ commit }, id) {
    commit('SET_LOADING_CHAPTER', true)
    return api({
      method: 'GET',
      url: `chapters/${id}`,
      headers: {
        access_token: localStorage.token
      }
    })
  },
  updateChapterHistory ({ commit }, payload) {
    commit('SET_LOADING_CHAPTER', true)
    return api({
      method: 'PUT',
      url: 'users/history',
      headers: {
        access_token: localStorage.token
      },
      data: {
        ChapterId: payload.ChapterId,
        status: payload.status
      }
    })
  },
  insertChapterHistory ({ commit }, payload) {
    commit('SET_LOADING_CHAPTER', true)
    return api({
      method: 'POST',
      url: 'users/history',
      headers: {
        access_token: localStorage.token
      },
      data: {
        ChapterId: payload.ChapterId,
        status: payload.status
      }
    })
  },
  updateSubjectHistory ({ commit }, payload) {
    commit('SET_LOADING_CHAPTER', true)
    return api({
      method: 'PATCH',
      url: `users/subjectHistory/${payload.subjectId}`,
      headers: {
        access_token: localStorage.token
      },
      data: {
        status: payload.status
      }
    })
  }
}
