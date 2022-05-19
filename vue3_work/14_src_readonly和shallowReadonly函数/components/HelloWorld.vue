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
    <br>
    <h2>ref定义的数据只读测试：{{sum}}</h2>
    <button @click="sum++">点我给sum加1</button>
    <h2>ref定义的数据只读测试：{{x2}}</h2>
    <button @click="x2.a.b++">点我给x2.a.b加1</button>
  </div>
</template>

<script>
import {ref,reactive, toRef,toRefs, readonly, shallowReadonly} from 'vue'
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

    // readonly接受一个响应式的数据，将这个数据的所有属性变成不可修改的状态，为深层次的。
    // const x1 = readonly(person)
    // shallowReadonly接受一个响应式的数据，将这个数据的第一层属性变成不可修改的状态（浅层次），其余的深层次的属性可以自由修改。
    // const x1 = shallowReadonly(person)


    let sum = ref(0)
    let x2 = ref({
      a: {
        b: 20
      }
    })

    sum = readonly(sum)
    x2 = shallowReadonly(x2)
    console.log('x2',x2)

    return {
      // ...toRefs(x1),
      ...toRefs(person),
      sum,
      x2
    }
  }
}
</script>

<style>

</style>