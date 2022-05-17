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
import {ref,reactive,watch} from 'vue'
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

    // ① watch监听ref所定义的一个响应式数据
    // watch(sum,(newVal,oldVal) => {
    //   console.log('监听和的数据', newVal,oldVal)
    // }, {
    //   immediate: true
    // })

    // ② watch监听ref所定义的多个响应式数据
    // watch([sum,msg],(newVal,oldVal) => {
    //   // newVal和oldVal都是数组
    //   console.log('监听sum、msg的数据', newVal,oldVal)
    // }, {
    //   immediate: true
    // })

    /*
      ③ watch监听reactive所定义的一个响应式的对象的全部属性
        1.得到的数据只有newVal,没有oldVal
        2.默认开启深度监听，即deep的设置无效
    */
    // watch(person,(newVal,oldVal) => {
    //   console.log('监听person的数据', newVal,oldVal)
    // }, {
    //   deep: false // deep配置无效
    // })

    // ④ watch监听reactive所定义的一个响应式的对象的某个属性
    // watch(() => person.name,(newVal,oldVal) => {
    //   console.log('监听person.name的数据', newVal,oldVal)
    // })

    // ⑤ watch监听reactive所定义的一个响应式的对象的多个属性
    // watch([() => person.name,() => person.age],(newVal,oldVal) => {
    //   console.log('监听person.name、person.age的数据', newVal,oldVal)
    // })

    // 特殊情况：
    watch(() => person.job, (newVal, oldVal) => {
      // 如果不开启深度监听，那么oldVal将会获取不到
      console.log('监听person.job.j1.salary',newVal, oldVal)
    },{
      deep: true
    }) // 由于监听的是reactive定义的对象中的某个属性，此属性还为一个对象，所以deep配置有效


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