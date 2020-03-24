import api from '../../../config/axios'

const actions = {
  executeSandbox: (context, code) => {
    return api({
      method: 'POST',
      url: 'execute/sandbox',
      data: {
        code
      }
    })
  },
  getExamAnswer: (context, payload) => {
    return api({
      method: 'POST',
      url: 'execute/exam/' + payload.id,
      data: {
        code: payload.code
      }
    })
  },
  getAllExam: context => {
    return api({
      method: 'GET',
      url: 'exams'
    })
  },
  getExam: (context, id) => {
    return api({
      method: 'GET',
      url: 'exams/' + id
    })
  },
  fetchUserSubjectsExam ({ commit, state }) {
    commit('SET_LOADING_ROUTE_EXAM', true)
    return api({
      method: 'GET',
      url: '/users/subjectHistory',
      headers: {
        access_token: localStorage.token
      }
    })
  }
}

export default actions
