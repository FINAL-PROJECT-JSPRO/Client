<template>
  <v-card
  class="mx-auto text-center"
  tile>
    <v-avatar
      class="profile"
      color="grey"
      size="200"
      tile
    >
      <v-img  :src="member.image"></v-img>
    </v-avatar>
    <v-card-text>
      <h2 class="member-name">{{ member.name }}</h2>
      <h3 class="member-role color-white">{{ member.role }}</h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Member',
  props: {
    member: Object
  }
}
</script>

<style lang="scss" scoped>
.v-card {
  box-shadow: none;
  background-color: #3b3e79;
}

.member-role {
  padding-top: 0.5rem;
}

.member-name {
  color: #FFC107;
  font-weight: bolder;
}
</style>
