<template>
  <v-card class="card-level"
    :class="level.name === 'Beginner' ? 'card-beginner'
      : level.name === 'Intermediate' ? 'card-intermediate'
      : level.name === 'Advanced' ? 'card-advanced' : '' "
    >
    <v-icon class="icon-large icon-beginner" v-if="level.name === 'Beginner'">fas fa-code </v-icon>
    <v-icon class="icon-large icon-intermediate" v-if="level.name === 'Intermediate'">fas fa-file-code</v-icon>
    <v-icon class="icon-large icon-advanced" v-if="level.name === 'Advanced'">fas fa-laptop-code</v-icon>
    <v-card-text class="color-white level-text">{{ level.name }}</v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    level: Object
  }
}
</script>

<style lang="scss" scoped>
.icon {
  &-large {
    font-size: 4rem;
  }
  &-beginner {
    color: #d4edda;
  }

  &-intermediate {
    color: #fff3cd;
  }

  &-advanced {
    color: #f8d7da;
  }
}

.level-text {
  font-size: 1.5rem;
  letter-spacing: 2px;
}

.card {
  &-level {
    padding: 1rem;
    text-align: center;
  }

  &-beginner {
    background-color: #00CB54 !important;
    border-color: #00CB54 !important;
  }

  &-intermediate {
    background-color: #faae2f !important;
    border-color: #faae2f !important;
  }

  &-advanced {
   background-color: #dc3545 !important;
   border-color: #dc3545 !important;
  }
}
</style>
