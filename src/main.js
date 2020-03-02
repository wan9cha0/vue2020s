import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/common.min.css'

Vue.config.productionTip = false


//公共方法
import Util from '@/util/common'
Vue.prototype.$util = Util

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
