<template>
  <div class="childBg">
    <h3>我是child组件{{sum}}</h3>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'Child',
  /*  
    当setup使用async的时候，要与组件Suspense和引入异步组件的defineAsyncComponent一起使用
  */
  async setup() {
    let sum = ref(0)
    // return sum
    let p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({sum})
      }, 3000)
    })
    return await p
  }
}
</script>

<style scoped>
.childBg {
  padding: 10px 20px;
  background: lightblue;
}
</style>