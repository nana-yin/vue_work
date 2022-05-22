<template>
  <h2>我是App组件</h2>
</template>

<script>
import { ref, isRef,isProxy, isReactive, reactive, readonly } from 'vue'
export default {
  setup() {
    const car = reactive({
      name: '奔驰',
      price: 40
    })

    const sum = ref(0)
    const car2 = readonly(car)

    //
    console.log('isRef', isRef(sum))
    console.log('isReactive', isReactive(car2))
    console.log('isProxy--car', isProxy(car))
    // 判断一个数据是否是由reactive或者readOnly创建的代理
    console.log('isProxy---car2', isProxy(car2))
    console.log('isProxy---sum', isProxy(sum))
  }
}
</script>

<style>

</style>