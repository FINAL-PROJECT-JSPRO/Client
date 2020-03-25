<template>
  <div class="repository">
    <div class="repository-wrapper">
      <a class="text-decoration-none repository-link" :href="repository.githubURL" target="_blank">
        <h3 class="repository-name">{{ repository.name }}</h3>
      </a>
      <p>{{ repository.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RepositoryItem',
  props: {
    repository: Object
  }
}
</script>

<style lang="scss" scoped>
 .repository-name {
   margin-bottom: 10px;
 }
 .repository-link {
   color: #0366d6;
   text-decoration: none;
   &:hover {
     text-decoration: underline;
   }
 }
</style>
