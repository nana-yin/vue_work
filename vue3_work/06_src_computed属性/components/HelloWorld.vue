<template>
  <h1>一个人的信息：</h1>
  <h2>姓：<input type="text" v-model="person.firstName"></h2>
  <h2>名：<input type="text" v-model="person.lastName"></h2>
  <h2>全名：{{person.fullName}}</h2>
  <input type="text" v-model="person.fullName">
</template>

<script>
import {reactive,computed} from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    const person = reactive({
      firstName: '张',
      lastName: '三'
    })

    // 计算属性
    // 简写形式 --> 不能修改
    // person.fullName = computed(() => {
    //   return person.firstName + '-' + person.lastName
    // })
    person.fullName = computed({
      get() {
        return person.firstName + '-' + person.lastName
      },
      set(value) {
        const nameArr = value.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
    })

    return {
      person
    }
  }
}
</script>

<style>

</style>