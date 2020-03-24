import Vue from 'vue'
import Vuex from 'vuex'

import { level, auth, subjects, exam, profile, chapter } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    subjects,
    level,
    auth,
    exam,
    profile,
    chapter
  }
})
