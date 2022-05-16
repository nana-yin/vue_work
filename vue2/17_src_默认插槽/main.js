import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
// 引入插件
import vueResource from 'vue-resource'
Vue.use(vueResource)

 new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
 })