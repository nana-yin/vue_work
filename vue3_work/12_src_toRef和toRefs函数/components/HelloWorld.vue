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
import {ref,reactive, toRef,toRefs} from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    const person = reactive({
      name: '张三',
      age: 18,
      job: {
        j1: {
          salary: '20'
        }
      }
    })

    // 等价于 const x1 = '张三'，丢弃了响应式
    // const x1 = ref(person.name)

    // 这样拿到的x2才是响应式的,第一个参数是响应式的对象，第二个参数是对象中的某个属性
    // const x2 = toRef(person, 'name')
    // console.log('###', x2)

    // 拿到某个对象的所有属性
    // const x = toRefs(person)
    // console.log('@@@', x)

    return {
      // 等同于name: '张三'
      // name: ref(person.name),
      // 使用toRef来提取单独的数据
      // name: toRef(person, 'name'),
      // salary: toRef(person.job.j1, 'salary'),
      // 使用toRefs来提取某个对象的所有数据
      ...toRefs(person)
    }
  }
}
</script>

<style>

</style>