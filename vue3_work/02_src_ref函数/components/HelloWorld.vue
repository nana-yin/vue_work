<template>
  <h1>一个人的信息：</h1>
  <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>岗位：{{obj.job}}</h2>
  <h2>薪水：{{obj.salary}}</h2>
  <button @click="edit">修改人的信息</button>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    let name = ref("张三")
    let age = ref(18)

    const obj = ref({
      job: '前端工程师',
      salary: '30K'
    })

    function edit() {
      console.log('obj.value',obj.value)
      // 基本数据类型响应式还是使用object.defineProperty()的get和set完成。
      // name.value --> RefImpl实例对象（reference  Implement）
      // name.value = '李四'
      // age.value = 38

      // 对象数据类型，内部求助了vue3中的一个新函数，reactive函数。
      // reactive函数封装了Es6中的proxy对象
      // obj.value --> proxy实例对象
      obj.value.job = 'UI工程师';
      obj.value.salary = '60K';
    }
    
    // 返回值是一个对象
    return {
      name,
      age,
      obj,
      edit
    }
  }
}
</script>

<style>

</style>