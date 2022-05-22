<template>
  <div class="childBg">
    <div>我是孙组件，汽车的信息：{{car.name}}----{{car.price}}W</div>
  </div>
</template>

<script>
import {inject} from 'vue'
export default {
  name: 'Child',
  setup() {
    // 接收祖组件传递的数据
    let car = inject('car')

    return {
      car
    }
  }
}
</script>

<style scoped>
.childBg {
  padding: 10px 20px;
  background: lightblue;
}
</style>