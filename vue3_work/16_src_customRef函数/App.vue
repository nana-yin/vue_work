<template>
  <div>
    <input type="text" v-model="keyWord">
    <h2>{{keyWord}}</h2>
  </div>
</template>

<script>
import {ref,customRef} from 'vue'
export default {
  name: 'App',
  setup() {
    // 官方实现响应式数据
    // const keyWord = ref('hello')

    function myRef(value, delay) {
      /* customRef的参数是一个函数，函数中有两个参数:
          track用来追踪数据的变化
          trigger用来告诉模板重新解析
        返回一个对象
       */
      return customRef((track, trigger) => {
        let timer
        return {
          get() {
            console.log(`在容器中读取了数据，我将${value}给它了`)
            track()
            return value
          },
          set(newVal) {
            console.log(`读取的变量变化了，新的值是${newVal}`)
            value = newVal
            clearTimeout(timer)
            timer = setTimeout(() => {
              trigger()
            },delay)
          }
        }
      })
    }
    // 自定义实现ref
    const keyWord = myRef('hello', 500)


    return {
      keyWord
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
