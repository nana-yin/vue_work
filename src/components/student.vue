<template>
  <div class="student">
    <h2>学生名称：{{name}}</h2>
    <h2>学生年龄：{{age}}</h2>
    <button @click="sendApp">将学生年龄给App</button>&nbsp;&nbsp;
    <button @click="unbind">---解除事件绑定</button>&nbsp;&nbsp;
    <button @click="addAge">点我学生年龄加1</button>&nbsp;&nbsp;
    <button @click="destoryStudent">销毁当前student组件的实例</button>
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
    sendApp() {
      this.$emit('showStudentAge', this.age, 12,13,14)
    },
    unbind() {
      this.$off('sendApp') // 解绑单个自定义事件
      // this.$off(['sendApp', 'demo']) // 解绑多个自定义事件
      // 解除所有的自定义事件
      // this.$off()
    },
    addAge() {
      this.age++
    },
    destoryStudent() {
      this.$destroy() // 销毁后，student实例的自定义事件都不能用了
    }
  }
}
</script>

<style>

</style>