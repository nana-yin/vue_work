<template>
  <div>
    <h2>和为：{{sum}}</h2>
    <button @click="sum++">点我加1</button>
    <hr>
    <h2>
      鼠标点击的坐标---》X：{{point.x}}，Y：{{point.y}}
    </h2>
  </div>
</template>

<script>
import {ref} from 'vue'
import usePoint from '../hooks/usePoint'
export default {
  name: 'HelloWorld',
  setup() {
    let sum = ref(0)
    // 使用hook函数，复用逻辑
    let point = usePoint()

    return {
      sum,
      point
    }
  }
}
</script>

<style>

</style>