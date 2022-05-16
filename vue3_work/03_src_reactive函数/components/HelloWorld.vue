<template>
  <h1>一个人的信息：</h1>
  <!-- <h2>姓名：{{name}}</h2>
  <h2>年龄：{{age}}</h2>
  <h2>岗位：{{obj.job}}</h2>
  <h2>薪水：{{obj.salary}}</h2> -->
  <h2>姓名：{{person.name}}</h2>
  <h2>年龄：{{person.age}}</h2>
  <h2>岗位：{{person.job.type}}</h2>
  <h2>薪水：{{person.job.salary}}</h2>
  <h2>爱好：{{person.hobby}}</h2>
  <h2>测试：{{person.test.a.b.c}}</h2>
  <button @click="edit">修改人的信息</button>
</template>

<script>
// import {ref, reactive} from 'vue'
import {reactive} from 'vue'
export default {
  name: 'HelloWorld',
  setup() {
    // let name = ref("张三")
    // let age = ref(18)

    // const obj = reactive({
    //   job: '前端工程师',
    //   salary: '30K'
    // })


    const person = reactive({
      name: '张三',
      age: 18,
      job: {
        type: '前端工程师',
        salary: '30K'
      },
      hobby: ['抽烟', '喝酒', '烫头'],
      test: {
        a: {
          b: {
            c: 666
          }
        }
      }
    })

    function edit() {
      // 基本数据类型响应式还是使用object.defineProperty()的get和set完成。
      // name.value --> RefImpl实例对象（reference  Implement）
      // name.value = '李四'
      // age.value = 38

      // 对象数据类型，内部求助了vue3中的一个新函数，reactive函数。
      // reactive函数封装了Es6中的proxy对象
      // obj.value --> proxy实例对象
      // obj.value.job = 'UI工程师';
      // obj.value.salary = '60K';

      // obj.job = 'UI工程师';
      // obj.salary = '60K';
      person.name = '李四';
      person.age = 38;
      person.job.type = 'UI工程师';
      person.job.salary = '60K';
      person.hobby[0] = '学习'
      person.test.a.b.c = 999;
    }

    // 返回值是一个对象
    return {
      person,
      // name,
      // age,
      // obj,
      edit
    }
  }
}
</script>

<style>

</style>