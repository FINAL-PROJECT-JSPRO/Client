<template>
  <v-col cols="12" sm="4">
    <v-card
      :disabled="!subject.status"
      class="mx-auto subject-card"
      :class="{active: isActive}"
      style="{position : relative}"
    >
      <v-icon
        color="red"
        v-if="!subject.status"
        class="lock"
        size="30"
      >
        mdi-lock
      </v-icon>

      <v-img
        :class="{bnw: !subject.status}"
        v-if="!isActive"
        height="250"
        :src="subject.img"
      ></v-img>

      <v-card-title class="title-custom">
      <h1>{{ subject.title }}</h1>

      <Progress :progress="subject.progress"/>

      <v-icon
        v-if="subject.progress === 100"
        large
        color="#00CB54"
      >
        mdi-check-bold
      </v-icon>
    </v-card-title>

      <v-divider v-if="!isActive" class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn
          :color="!subject.status ? 'grey' : isActive ? 'orange' : '#00CB54'"
          text
          @click="clickStart"
        >
          {{ !subject.status ? 'Locked' : isActive ? 'Close' : 'Start' }}
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
      <div v-show="showChapter">
        <CardChapter
          v-for="(chapter, index) in subject.chapters"
          :key="index"
          :chapterTitle="chapter"
          :index="index"
        />
      </div>
    </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
import CardChapter from './CardChapter'
import Progress from './Progress'

export default {
  components: {
    CardChapter,
    Progress
  },
  props: {
    subject: Object
  },
  data () {
    return {
      isActive: false,
      showChapter: false
    }
  },
  methods: {
    clickStart () {
      if (this.isActive) {
        this.showChapter = false
        setTimeout(() => {
          this.isActive = false
          this.$store.commit('SET_DISABLE', false, { module: 'subjects' })
        }, 300)
      } else {
        this.isActive = true
        this.showChapter = true
        this.$store.commit('SET_DISABLE', true, { module: 'subjects' })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.subject-card {
  width: 350px;
}
.active {
  padding: 0 16px 16px 16px;
  width: 900px !important;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: width .5s;
}
.title-custom {
    display: flex;
    justify-content: space-between;
    height: 100px;
  }

.title-custom h1 {
  font-size: 20px;
}
.bnw {
  filter: grayscale(100%)
}
.lock {
  position: absolute !important;
  z-index: 1;
  top: 8px;
  left: 8px;
}
</style>
