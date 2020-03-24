<template>
  <div class="profile-repositories">
    <LoadingProcess v-if="isLoading" />
    <div v-if="!isLoading">
      <RepositoryItem
        v-for="repository in repositories"
        :repository="repository"
        :key="repository.id" />
    </div>
  </div>
</template>

<script>
import RepositoryItem from './RepositoryItem'
import LoadingProcess from '../../../components/LoadingProcess'
export default {
  name: 'Repository',
  components: {
    RepositoryItem,
    LoadingProcess
  },
  data () {
    return {
      url: 'https://github.com/login/oauth/authorize?client_id=' + process.env.VUE_APP_GITHUB_REPO_CLIENT_ID + '&scope=user%20repo'
    }
  },
  created () {
    this.$store.dispatch('getRepositories')
  },
  computed: {
    repositories () {
      return this.$store.state.profile.repositories
    },
    isLoading () {
      return this.$store.state.profile.isLoading
    }
  },
  watch: {
    '$route.query': {
      immediate: true,
      handler (code) {
        if (Object.keys(code).length > 0) {
          this.$store.dispatch('getGithubRepositoryToken', code.code)
            .then(({ data }) => {
              const token = data.token
              this.$store.dispatch('getRepository')
                .then(({ data }) => {
                  const { repository } = data
                  const payload = {
                    token,
                    repoName: repository.name,
                    fileName: repository.fileName,
                    description: repository.description,
                    code: repository.code
                  }
                  this.$store.dispatch('saveToGithubRepository', payload)
                    .then(({ data }) => {
                      localStorage.removeItem('repository_id')
                      this.$router.push('/profile/repositories')
                    })
                    .catch(err => {
                      this.$store.commit('SET_ERROR_REPOSITORY', [err.response.data])
                    })
                    .finally(() => this.$store.commit('SET_LOADING_REPOSITORY', false))
                })
                .catch(err => {
                  this.$store.commit('SET_ERROR_REPOSITORY', [err.response.data])
                  this.$store.commit('SET_LOADING_REPOSITORY', false)
                })
            })
            .catch(err => {
              this.$store.commit('SET_ERROR_REPOSITORY', [err.response.data])
              this.$store.commit('SET_LOADING_REPOSITORY', false)
            })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .profile-repositories {
    min-height: 300px;
  }
</style>
