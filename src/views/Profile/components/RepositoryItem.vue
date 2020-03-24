<template>
  <div class="repository">
    <div class="repository-wrapper">
      <h3>{{ repository.name }} </h3>
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
