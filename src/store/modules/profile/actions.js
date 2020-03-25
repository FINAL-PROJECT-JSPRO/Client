import api from '../../../config/axios'

const actions = {
  getGithubRepositoryToken: ({ commit }, code) => {
    return api({
      method: 'POST',
      url: 'github/repository/token',
      data: {
        client_id: process.env.VUE_APP_GITHUB_REPO_CLIENT_ID,
        client_secret: process.env.VUE_APP_GITHUB_REPO_CLIENT_SECRET,
        code
      }
    })
  },
  createRepository: ({ commit }, payload) => {
    const { name, code, description, fileName, githubURL } = payload
    return api({
      method: 'POST',
      url: 'repositories',
      headers: {
        access_token: localStorage.token
      },
      data: {
        name,
        code,
        description,
        fileName,
        githubURL
      }
    })
  },
  getRepositories: ({ commit }, payload) => {
    commit('SET_LOADING_REPOSITORY', true)
    api({
      method: 'GET',
      url: 'repositories',
      headers: {
        access_token: localStorage.token
      }
    })
      .then(({ data }) => {
        commit('SET_REPOSITORIES', data.repositories)
        commit('SET_ERROR_REPOSITORY', [])
      })
      .catch(err => {
        commit('SET_ERROR_REPOSITORY', [err.response.data])
      })
      .finally(() => commit('SET_LOADING_REPOSITORY', false))
  },
  saveToGithubRepository: ({ commit }, payload) => {
    return api({
      method: 'POST',
      url: 'github/addtorepo',
      headers: {
        access_token: payload.token
      },
      data: {
        repoName: payload.name,
        fileName: payload.fileName,
        description: payload.description,
        code: payload.code
      }
    })
  },
  validateRepository: ({ commit }, name) => {
    return api({
      method: 'POST',
      url: 'repositories/validate',
      headers: {
        access_token: localStorage.token
      },
      data: {
        name
      }
    })
  }
}

export default actions
