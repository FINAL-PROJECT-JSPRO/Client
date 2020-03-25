<template>
  <div class="profile-repositories">
    <LoadingProcess v-if="isLoading" />
     <router-link to="/playground">
      <span class="new-code">New Code</span>
    </router-link>
    <div v-if="!isLoading">
      <RepositoryItem
        v-for="repository in repositories"
        :repository="repository"
        :key="repository.id" />
        <div v-if="!repositories.length">
          <p>You have no repositories </p>
        </div>
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
  .new-code {
    display: inline-block;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    background-color: rgb(255, 193, 7);
    margin-bottom: 20px;
    color: #212121
  }
</style>
