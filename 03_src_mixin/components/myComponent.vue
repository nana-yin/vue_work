<template>
  <div>
    <h2>个人信息</h2>
    <div>姓名：{{name}}</div>
    <button @click="showName">点击我打印名字</button>
  </div>
</template>

<script>
// 局部混合
import {mixin} from "../mixin"
export default {
  mixins: [mixin],
  data() {
    return {
      name: '张三'
    }
  }
}
</script>

<style>

</style>