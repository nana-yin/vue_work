<template>
  <h2>和为：{{sum}}</h2>
  <button @click="sum++">点我加1</button>
  <h2>{{msg}}</h2>
  <button @click="msg+='!'">点我加！</button>
  <hr>
  <h2>一个人的信息：</h2>
  <div>姓名：{{person.name}}</div>
  <div>年龄：{{person.age}}</div>
  <div>薪水：{{person.job.j1.salary}}K</div>
  <br>
  <button @click="person.name += '~'">点我给姓名加~</button>
  <br><br>
  <button @click="person.age++">点我年龄加1</button>
  <br><br>
  <button @click="person.job.j1.salary++">点我加薪</button>
</template>

<script>
import {ref,reactive,watch, watchEffect} from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    let sum = ref(0)
    let msg = ref('你好')
    const person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: '20'
        }
      }
    })

    /*
      watch监听ref所定义的一个基本类型的数据，就不用使用sum.value。
      因为，这里sum是RefImpl对象，sum.value是基本数据
    */
    // watch(sum,(newVal,oldVal) => {
    //   console.log('监听sum的数据', newVal,oldVal)
    // }, {
    //   immediate: true
    // })

    /*
      watch监听ref所定义的一个对象类型的数据，想要深度监听：
        方法一需要使用sum.value；
        方法二需要配置deep: true。
      因为，这里person是RefImpl对象，person.value是proxy对象（ref里面自动调用了reactive函数）。
      只有reactive里面才是默认开启深度监听的，ref中并没有。
    */
    // watch(person, (newVal, oldVal) => {
    //   console.log('监听person',newVal, oldVal)
    // },{
    //   deep: true
    // })

    // 可以监听 这个函数内部 使用过的属性，用于多个属性进行监听
    watchEffect(() => {
      const x1 = sum.value // 不要忘记写.value
      const x2 = person.job.j1.salary
      console.log('watchEffect监听执行了',x1,x2)
    })


    return {
      sum,
      msg,
      person
    }
  }
}
</script>

<style>

</style>