<template>
  <div>
    <hr>
    <h2>测试一下</h2>
    <div>这是第二个组件---》JOJO</div>
    <div style="margin-top: 20px;">名字：{{name}}</div>
    <button @click="showName">点击我打印名字</button>
  </div>
</template>

<script>
import {mixin} from "../mixin"
export default {
  mixins: [mixin],
  data() {
    return {
      name: '李四'
    }
  }
}
</script>

<style>

</style>