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
  }
}

export default actions
