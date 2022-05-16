import Vue from 'vue'
import App from './App'
import {mixin2} from './mixin'
// 全局混合
Vue.mixin(mixin2)

Vue.config.productionTip = false
 new Vue({
  el: '#app',
  render: h => h(App)
 })