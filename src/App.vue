<template>
  <div class="box">
    <h2>你好啊，学生年龄是{{studentAge}}</h2>
    <School @getAddress="getAddress"/>
    <Student ref="stu"/>
  </div>
</template>

<script>
import School from '@/components/school.vue'
import Student from '@/components/student.vue'
export default {
  components: {
    School,
    Student
  },
  data() {
    return {
      studentAge: 10
    }
  },
  methods: {
    getAddress(val) {
      console.log('显示学校地址', val)
    },
    getStudentAge(val, ...arg) {
      this.studentAge = val
      console.log('显示学生的年龄', val, arg)
    }
  },
  mounted() {
    this.$refs.stu.$on('showStudentAge', this.getStudentAge)
    // this.$refs.stu.$on('showStudentAge', function() {
    //   // 这里面的this是student的组件实例对象，要想变为App的组件实例对象，需要使用箭头函数
    // })
    // this.$refs.stu.$once('showStudentAge', this.getStudentAge)
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

</style>