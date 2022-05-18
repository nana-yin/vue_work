// 引入的不再是vue构造函数了，而是createApp工厂函数
import { createApp,  } from 'vue'
import App from './App.vue'
// 创建应用实例对象--app，类似vue2中的vm，但是比vm更轻
const app = createApp(App)
// 挂载
app.mount('#app')

// 不兼容以下写法
// const vm = new VueElement({
//     render: h => h(App)
// })
// vm.$mount('#app')
