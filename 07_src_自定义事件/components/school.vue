<template>
  <div class="school">
    <h2>学校名称：{{name}}</h2>
    <button @click="showName">点击显示名称</button>
    <hr/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '张三学校'
    }
  },
  methods: {
    showName() {
      this.$emit('getAddress', '杭州市西湖区')
    }
  }
}
</script>

<style>

</style>