<template>
  <v-col cols="12" sm="4">
    <v-card
      class="mx-auto subject-card"
      :class="{active: isActive, locked: status !== 'active' && !isActive}"
      style="{position : relative}"
    >
      <v-icon
        color="red"
        v-if="status !== 'active'"
        class="lock"
        size="30"
        :class="{activeLock: isActive}"
      >
        mdi-lock
      </v-icon>

      <SubjectAnimation
        :subject="subject"
        v-if="!isActive"
      />

      <v-card-title class="title-custom">
        <div>
          <h1>{{ subject.name }}</h1>
        </div>

      <Progress v-if="status === 'active'" :progress="+progress"/>

      <v-icon
        v-if="+progress === 100"
        large
        color="#00CB54"
      >
        mdi-check-bold
      </v-icon>
    </v-card-title>

      <v-divider v-if="!isActive" class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn
          :color="status !== 'active' ? 'grey' : isActive ? 'orange' : '#00CB54'"
          text
          @click="clickStart"
        >
          {{ isActive ? 'Close' : status !== 'active' ? 'View' : 'Start' }}
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
      <div v-show="showChapter">
        <CardChapter
          v-for="(chapter, index) in subject.Chapters"
          :key="chapter.id"
          :chapter="chapter"
          :index="index"
          :statusSubject="status"
        />
      </div>
    </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
import CardChapter from './CardChapter'
import Progress from './Progress'
import SubjectAnimation from './SubjectAnimation'

export default {
  components: {
    CardChapter,
    Progress,
    SubjectAnimation
  },
  props: {
    subject: Object,
    status: String
  },
  data () {
    return {
      isActive: false,
      showChapter: false
    }
  },
  computed: {
    progress () {
      const num = this.subject.Chapters.filter(chapter => {
        if (chapter.Histories) {
          return chapter.Histories.filter(history => history.status).length
        }
        return false
      }).length / this.subject.Chapters.length * 100
      return (Math.round(num * 100) / 100).toFixed(0)
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
.locked {
  opacity: .8;
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
  font-weight: 400;
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
.activeLock {
  top: -10px;
  animation: lock 2s cubic-bezier(0.74, 0.06, 0.4, 0.92) forwards;
  /* animation-delay: 2s; */
}

@keyframes lock {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.15);
    transform: rotate(-20deg);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
