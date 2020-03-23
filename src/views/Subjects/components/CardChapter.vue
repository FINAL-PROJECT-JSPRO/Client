<template>
  <div>
    <v-divider></v-divider>
    <v-card-text class="chapter-card">

      <button
        class="chapter"
        :disabled="statusSubject !== 'active'"
        :class="{locked: statusSubject !== 'active'}"
      >
        {{ index + 1}}.<div v-html="chapter.title" class="chapter-title"></div>
        <v-icon
          v-if="chapterStatus"
          class="check"
          size="25"
        >
          mdi-clipboard-check
        </v-icon>
      </button>
    </v-card-text>
  </div>
</template>

<script>
export default {
  props: {
    chapter: Object,
    index: Number,
    statusSubject: String
  },
  computed: {
    chapterStatus () {
      if (this.chapter.Histories) {
        const history = this.chapter.Histories[0]
        if (history) {
          if (history.status) {
            return true
          }
        }
      }
      return false
    }
  }
}
</script>

<style lang="css" scoped>
.chapter-card {
  padding: 0;
}
.chapter {
  position: relative;
  display: flex;
  padding: 16px;
  width: 100%;
  color: black !important;
}
.chapter:hover {
  background: #00CB54 ;
  color: white !important;
}

.chapter-title {
  margin-left: 25px
}

.chapter-title >>> .chapterTitle {
  font-weight: 300;
  font-size: 16px;
}

.check {
  position: absolute !important;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
}

.locked:hover {
  background: none ;
  color: inherit !important;
}
</style>
