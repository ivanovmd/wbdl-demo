import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bulma'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCu-5kmQpCVawwulZDCItAbZoFnhTabkZ0'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
