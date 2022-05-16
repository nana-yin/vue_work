/**
 * 这个文件是整个文件的入口文件
 */
// 引入Vue
import Vue from 'vue' // 用的是vue.runtime.xxx.js,是运行版的Vue:核心功能
// import Vue from 'vue/dist/vue'  // 完整版vue: 核心功能+模板解析器
// 引入App组件，它是所有组件的父组件
import App from './App.vue'
// 关闭Vue的生产提示
Vue.config.productionTip = false
// 创建实例对象vm
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el: '#app',
  // template: `<h2>你好</h2>`,
  // render(createElement) {
  //   return createElement('h2', '你好啊')
  // },
  render: h => h(App),
})