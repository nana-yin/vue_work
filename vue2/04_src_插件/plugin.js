export default {
  install(Vue,x,y) {  // vm和vc就都能用了
    // 全局过滤器
    // 定义全局指令
    // 定义混入
    // 给Vue原型上添加方法
    Vue.prototype.hello = () => alert('你好！')
    console.log('@@install',Vue,x,y)
  }
}