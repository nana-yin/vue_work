<template>
  <div>
    <h2>我是一个组件</h2>
    <div>这是我的信息</div>
    <hr>
    <h2>个人信息</h2>
    <div>姓名：{{name}}</div>
    <div>年龄：{{age}}</div>
  </div>
</template>

<script>
export default {
  // props: ['name', 'age']
  // props: {
  //   name: String,
  //   age: Number
  // }
  props: {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 19
    }
  }
}
</script>

<style>

</style>