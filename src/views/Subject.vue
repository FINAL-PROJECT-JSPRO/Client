<template>
  <v-container>
    <v-row>
      <CardSubject
        v-for="subject in subjects"
        :key="subject.id"
        :title="subject.title"
        :img="subject.img"
      />
    </v-row>
  </v-container>
</template>

<script>
import CardSubject from '../components/CardSubject'

export default {
  name: 'Subject',
  components: {
    CardSubject
  },
  computed: {
    subjects () {
      return this.$store.state.subjects
    }
  },
  created () {
    this.$store.dispatch('fetchListOfSubjects')
  }
}
</script>

<style>

</style>
