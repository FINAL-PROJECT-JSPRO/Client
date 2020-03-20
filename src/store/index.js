import Vue from 'vue'
import Vuex from 'vuex'

import subjects from './modules/subjects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    subjects
  }
})
