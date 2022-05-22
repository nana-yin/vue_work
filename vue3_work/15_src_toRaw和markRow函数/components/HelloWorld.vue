<template>
  <div>
    <h2>一个人的信息：</h2>
    <div>姓名：{{name}}</div>
    <div>年龄：{{age}}</div>
    <div>薪水：{{job.j1.salary}}K</div>
    <div v-show="person.car">座驾信息：{{person.car}}</div>
    <br>
    <button @click="name += '~'">点我给姓名加~</button>
    <br><br>
    <button @click="age++">点我年龄加1</button>
    <br><br>
    <button @click="job.j1.salary++">点我加薪</button>
    <br><br>
    <button @click="handlePersonToRaw">点我将person变成原始对象</button>
    <br><br>
    <button @click="addCar">点我添加一辆车</button>
    <br><br>
    <button v-show="person.car && person.car.name" @click="person.car.name += '!'">点击更改车的名字</button>
    <br><br>
    <button v-show="person.car && person.car.price" @click="changePrice">点我更改车的价格</button>
    <br><br>
    <h2>ref定义的数据只读测试：{{sum}}</h2>
    <button @click="sum++">点我给sum加1</button>
    <h2>ref定义的数据只读测试：{{x2}}</h2>
    <button @click="x2.a.b++">点我给x2.a.b加1</button>
  </div>
</template>

<script>
import {ref,reactive, toRef,toRefs, readonly, shallowReadonly, toRaw, markRaw} from 'vue'
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
    // x2 = readonly(x2)
    console.log('x2',x2)


    /*    
      toRaw和markRow的学习:
      1. toRaw将reactive定义的响应式对象还原为原始对象（就是不经过proxy进行处理的对象），ref定义的不管用
      2. markRaw将原始对象变为 不可 变为响应式的对象，用于复杂的第三方库（axios）等。
      使用这两个函数后，只是vue不去追踪变化而已，但是更改这个变化后的原始对象的其它属性的时候，数据将会跟着其他数据的改变而改变！？！
    */
    function handlePersonToRaw() {
      let p = toRaw(person)
      p.age++
    }


    function addCar() {
      // let car = {
      //   name: '奔驰',
      //   price: 40  
      // }
      // person.car = car
      let car = markRaw({
        name: '奔驰',
        price: 40  
      })
      person.car = car
      console.log('person',person)
    }

    function changePrice() {
      person.car.price++
      console.log('person.car.price', person.car.price)
    }


    return {
      // ...toRefs(x1),
      person,
      ...toRefs(person),
      sum,
      x2,
      handlePersonToRaw,
      addCar,
      changePrice
    }
  }
}
</script>

<style>

</style>