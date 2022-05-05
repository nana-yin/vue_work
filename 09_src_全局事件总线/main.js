import Vue from 'vue'
import App from './App'

// const Demo = Vue.extend({})
// const d  = new Demo()
// Vue.prototype.x = d

Vue.config.productionTip = false
 new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate() { // 安装全局事件总线
    Vue.prototype.$bus = this
  }
 })