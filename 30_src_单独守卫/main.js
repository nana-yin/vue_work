import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
// 引入vue-router3
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})