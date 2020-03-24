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
  }
}
</script>

<style lang="scss" scoped>
  .profile-repositories {
    min-height: 300px;
  }
</style>
