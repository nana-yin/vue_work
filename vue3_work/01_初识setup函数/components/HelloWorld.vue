<template>
  <h1>一个人的信息：</h1>
  <h2>姓名：{{name}}</h2>
  <h2>年龄{{age}}</h2>
  <h2>性别：{{sex}}</h2>
  <button @click="sayHello">自我介绍</button>
  <br><br>
  <button @click="sayWelcome">vue2欢迎</button>
  <br><br>
  <button @click="test2_3">在vue2中读取vue3的setup中的属性</button>
  <br><br>
  <button @click="test3_2">在vue3的setup配置中读取vue2的属性</button>
  <br><br>
</template>

<script>
// import {h} from 'vue'
export default {
  name: 'HelloWorld',
  data() {
    return {
      sex: '男'
    }
  },
  methods: {
    sayWelcome() {
      alert('欢迎来学习setup')
    },
    test2_3() {
      console.log('在vue2中读取vue3中配置的属性')
      console.log('name', this.name)
      console.log('age', this.age)
      console.log('sayHello', this.sayHello)
    }
  },
  setup() {
    let name = "张三"
    let age = 18
    function sayHello() {
      alert( `你好，我是${name}，我的年龄是${age}`)
    }
    function test3_2() {
      console.log('在vue3的配置中读取vue2的属性')
      console.log('sex', this.sex)
      console.log('sayWelcome', this.sayWelcome)
    }
    // 返回值是一个对象
    return {
      name,
      age,
      sayHello,
      test3_2
    }
    // 返回值是一个渲染函数
    // return () => {
    //   return h('h2', '测试返回的是一个渲染函数')
    // }
  }
}
</script>

<style>

</style>