<template>
  <div>
    <h1>人员：</h1>
    <input type="text" placeholder="请输入名字" v-model="name">
    <button @click="addPerson">添加</button>
    <button @click="addWang">添加一个姓王的人</button>
    <button @click="addServerPerson">添加一个人，名字随机</button>
    <ul style="margin-top: 20px;">
      <li v-for="p in personList" :key="p.id">{{p.name}}</li>
    </ul>
    <h3 style="color: red;">Count中的总和：{{sum}}</h3>
    <h3>列表中第一个人的名字是：{{firstName}}</h3>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Person',
  data() {
    return {
      name: ''
    }
  },
  computed: {
    personList() {
      return this.$store.state.personModule.personList
    },
    sum() {
      return this.$store.state.countModule.sum
    },
    firstName() {
      return this.$store.getters['personModule/firstName']
      
    }
  },
  methods: {
    addPerson() {
      this.$store.commit('personModule/ADD_PERSON', this.name)
      this.name = ''
    },
    addWang() {
      this.$store.dispatch('personModule/addPersonWang',this.name)
      this.name = ''
    },
    addServerPerson() {
      axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then(res => {
        console.log('res', res)
        this.$store.dispatch('personModule/addServerPerson', res.data)
      })
    }
  },
  mounted() {
    console.log('this.$store',this.$store)
  }
}
</script>

<style>

</style>