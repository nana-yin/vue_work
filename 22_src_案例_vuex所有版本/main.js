import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
// 引入插件
import vueResource from 'vue-resource'
Vue.use(vueResource)
// 引入store
import store from './store'

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})