<template>
  <div>
    <h2>一个人的信息：</h2>
    <div>姓名：{{name}}</div>
    <div>年龄：{{age}}</div>
    <div>薪水：{{job.j1.salary}}K</div>
    <br>
    <button @click="name += '~'">点我给姓名加~</button>
    <br><br>
    <button @click="age++">点我年龄加1</button>
    <br><br>
    <button @click="job.j1.salary++">点我加薪</button>
  </div>
</template>

<script>
import {ref,reactive, toRef,toRefs, shallowReactive, shallowRef} from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    // 浅层的响应式，只对一层数据进行响应式
    // const person = shallowReactive({
    const person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: '20'
        }
      }
    })

    // 这两条语句没有什么区别
    // const sum1 = ref(0)
    // const sum2 = shallowRef(0)

    // ref会求助reactive将obj1.a转为proxy对象，所以整体都是响应式
    // const obj1 = ref({
    //   a: {
    //     b: '哈哈'
    //   }
    // })
    // console.log('obj1',obj1)

    // shallowRef只会将obj2.a变为响应式。里面obj2.a.b不是响应式的
    // obj2.a = { b: '哈哈' }
    const obj2 = shallowRef({
      a: {
        b: '哈哈'
      }
    })
    console.log('obj2',obj2)


    return {
      ...toRefs(person)
    }
  }
}
</script>

<style>

</style>