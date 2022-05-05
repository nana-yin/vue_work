<template>
  <div class="box">
    <h2>{{msg}}</h2>
    <School/>
    <Student/>
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
      msg: '你好啊'
    }
  }
}
</script>

<style>
.box {
  padding: 10px;
  background: #f5f5f5;
}
</style>