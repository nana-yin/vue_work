<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '西湖学校',
      address: '杭州市西湖区'
    }
  },
  mounted() {
    // 给傀儡绑定事件
    this.$bus.$on('getData', data => {
      console.log('我是scool组件，我收到了数据', data)
    })
  },
  beforeDestroy() {
    this.$bus.$off('getData')
  }
}
</script>

<style>
.school {
  padding: 20px;
  margin-bottom: 20px;
  background: lightblue;
}
</style>