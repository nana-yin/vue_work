<template>
  <h1>一个人的信息：</h1>
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <button @click="sendData">点击我给App组件传信息</button>
</template>

<script>
import {reactive} from 'vue'
export default {
  name: 'HelloWorld',
  props: ['sex', 'job'],
  /**
   * @params props: （proxy实例对象）,当父组件传给子组件，子组件不接收的时候，props就是一个空对象。
   * 当子组件接收的时候，props的值就为代理之后的数据对象
   * @param context：{ 
   *          attrs--> 剩余参数对象(收集props中不声明的参数)。相当于vue2中的$attrs
   *          emit--> 触发自定义事件。相当于vue2中的$emit
   *          slots--> 相当于vue2中的$slot
   *        }
  */
  setup(props, context) {
    // console.log('props, context',context.slots)
    const person = reactive({
      name: '张三',
      age: 18
    })

    function sendData() {
      context.emit('hello',666)
    }

    return {
      person,
      sendData
    }
  }
}
</script>

<style>

</style>