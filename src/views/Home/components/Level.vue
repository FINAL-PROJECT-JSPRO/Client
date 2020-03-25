<template>
  <v-card class="card-level"
    :class="level.name === 'Beginner' ? 'card-beginner'
      : level.name === 'Intermediate' ? 'card-intermediate'
      : level.name === 'Advanced' ? 'card-advanced' : '' "
    >
    <v-icon class="icon-large icon-beginner" v-if="level.name === 'Beginner'">fas fa-code </v-icon>
    <v-icon class="icon-large icon-intermediate" v-if="level.name === 'Intermediate'">fas fa-file-code</v-icon>
    <v-icon class="icon-large icon-advanced" v-if="level.name === 'Advanced'">fas fa-laptop-code</v-icon>
    <v-card-title class="color-white level-title">{{ level.name }}</v-card-title>
    <v-card-subtitle class="text-center">
      <div class="description">
        <p v-if="level.name === 'Beginner'">
          You are introduced Javascript, Conditional Statement and Loopings
        </p>
        <p v-if="level.name === 'Intermediate'">
          In this level, you will learn Functions, Array, and Objects
        </p>
        <p v-if="level.name === 'Advanced'">
          In the final level, you are introduced Class, Asynchronous Programming, and Iterators
        </p>
      </div>
    </v-card-subtitle>
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

.level-title {
  font-size: 1.5rem;
}

.description {
  font-weight: bolder;
  margin-top: 10px;
  color: #000;
  line-height: 1.5;
  font-size: 1rem;
}

.card {
  &-level {
    padding: 1rem;
    flex-direction: column;
    display: flex;
    align-items: center;
    height: 100%;
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
