import Vue from 'vue'
import Vuex from 'vuex'

import subjects from './modules/subjects'
import { level, auth } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    subjects,
    level,
    auth
  }
})
