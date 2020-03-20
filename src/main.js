import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import GSignInButton from 'vue-google-signin-button'

Vue.config.productionTip = false
Vue.use(GSignInButton)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
