<template>
  <div class="bg">
    <div>我是祖组件，汽车的信息：{{name}}----{{price}}W</div>
    <Son/>
  </div>
</template>

<script>
import { reactive, toRefs,provide } from 'vue'
import Son from './components/son.vue'
export default {
  name: 'App',
  components: {
    Son
  },
  setup() {
    const car = reactive({
      name: '奔驰',
      price: 40
    })

    // 给自己的后代组件传递数据
    provide('car', car)

    return {
      ...toRefs(car)
    }
  }
}
</script>

<style scoped>
.bg {
  padding: 10px 20px;
  background: gray;
}
</style>