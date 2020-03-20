<template>
  <v-container>
    <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="select"
            :items="items"
            label="Level"
          ></v-select>
        </v-col>
    </v-row>
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
import CardSubject from './components/CardSubject'

export default {
  name: 'Subject',
  data () {
    return {
      select: 'All',
      items: ['All', 1, 2, 3]
    }
  },
  components: {
    CardSubject
  },
  computed: {
    subjects () {
      if (this.select !== 'All') {
        return this.$store.state.subjects.subjects.filter(subject => subject.level === this.select)
      }
      return this.$store.state.subjects.subjects
    }
  },
  created () {
    this.$store.dispatch('fetchListOfSubjects')
  }
}
</script>

<style>

</style>
