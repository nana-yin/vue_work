<template>
  <div class="sonBg">
    <div>我是子组件</div>
    <Child/>
  </div>
</template>

<script>
import Child from './child.vue'
export default {
  name: 'Son',
  components: {
      Child
  }
}
</script>

<style scoped>
.sonBg {
  padding: 10px 20px;
  background: pink;
}
</style>