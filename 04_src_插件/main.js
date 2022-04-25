import Vue from 'vue'
import App from './App'
// 引入插件
import plugins from './plugin'
// 使用插件
// 后面可以带参数
Vue.use(plugins,1,2)
Vue.config.productionTip = false
 new Vue({
  el: '#app',
  render: h => h(App)
 })