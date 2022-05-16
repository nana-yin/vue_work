<template>
  <div class="student">
    <h2>学生名称：{{name}}</h2>
    <h2>学生年龄：{{age}}</h2>
    <button @click="sendData">点击我将学生姓名给school组件</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '张三',
      age: 18
    }
  },
  methods: {
    sendData() {
      // 触发事件
      this.$bus.$emit('getData', this.name)
    }
  }
}
</script>

<style>
.student {
  padding: 20px;
  background: pink;
}
</style>