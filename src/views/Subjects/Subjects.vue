<template>
  <v-container>
    <div
      class="disable-bg"
      v-if="disable"
    >
    </div>
    <v-row align="center">
        <v-col class="d-flex" cols="12" sm="4">
          <v-select
            v-model="select"
            color="#00CB54"
            item-color="green"
            :items="items"
            label="Level"
          ></v-select>
        </v-col>
    </v-row>
    <v-row>
      <CardSubject
        v-for="subject in subjects"
        :key="subject.id"
        :subject="subject"
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
    },
    disable () {
      return this.$store.state.subjects.disable
    }
  },
  created () {
    this.$store.dispatch('fetchListOfSubjects')
  }
}
</script>

<style lang="css" scoped>
  .disable-bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .4);
    z-index: 2;
    top: 0;
    left: 0;
  }
</style>
