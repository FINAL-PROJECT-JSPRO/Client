<template>
  <v-row justify="center">
    <v-expansion-panels inset>
      <v-expansion-panel
        v-for="item in subjects"
        :key="item.id"
        :disabled="item.status === 'locked'"
      >
        <v-expansion-panel-header>
          <div class="subject-heading">
            <span>{{ item.Subject.name }}</span>
            <v-icon class="icon-lock" v-if="item.status === 'locked'">fas fa-lock</v-icon>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="chapter-content" v-for="chapter in item.Subject.Chapters" :key="chapter.id">
            <div v-if="chapter.Histories.length">
              <router-link class="chapter-link" :to="`/subjects/chapter/${chapter.id}`">
                 <div class="chapter-btn-link" v-html="chapter.title"></div>
              </router-link>
            </div>
            <div v-else class="chapter" v-html="chapter.title"></div>

            <div v-if="chapter.Histories.length">
              <v-icon class="chapter-completed" v-if="chapter.Histories[0].status">fas fa-check-circle</v-icon>
              <v-icon class="chapter-not-completed" v-if="!chapter.Histories[0].status">fas fa-exclamation-circle</v-icon>
            </div>
            <div v-if="!chapter.Histories.length">
              <v-icon class="chapter-not-completed">fas fa-exclamation-circle</v-icon>
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  name: 'History',
  created () {
    this.$store.dispatch('fetchUserSubjects')
  },
  computed: {
    subjects () {
      return this.$store.state.subjects.userSubjects
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon-lock {
    color: #F44336;
  }
  .chapter {
    &-content {
      display: flex;
      justify-content: space-between;
    }
    &-completed {
      color: #28a745
    }
    &-not-completed {
      color: #dc3545;
    }
    &-link {
      text-decoration: none;
      cursor: pointer;
    }
  }
  .subject-heading {
    font-weight: 600;
    font-size: 18px;
    color: #505763;
    display: flex;
    justify-content: space-between;
  }
  .chapter {
    display: block;
    width: 100%;
    font-size: 0.5rem;
  }
  .chapterTitle {
    font-weight: normal !important;
  }
</style>

<style scoped>
  .chapter >>> .chapterTitle {
    font-weight: normal;
    color: #505763;
    font-size: 14px;
    margin-top: -2px;
    padding: 10px 0;
  }

  .chapter-btn-link >>> .chapterTitle {
    font-weight: 400;
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
    margin-top: -2px;
    padding: 10px 0;
    background-color: #fff;
  }
</style>
