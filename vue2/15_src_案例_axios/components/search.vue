<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model.trim="keyWords"/>&nbsp;<button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Search',
  data() {
    return {
      keyWords: ''
    }
  },
  methods: {
    searchUsers() {
      this.$bus.$emit('getUsers', {
        userList: [],
        isFirst: false,
        isLoading: true,
        errMsg: ''
      })
      if (!this.keyWords.trim()) return alert('输入框数据不能为空！')
      axios.get(`http://api.github.com/search/users?q=${this.keyWords}`).then(res => {
        // console.log('请求成功', res)
        this.$bus.$emit('getUsers', {
          userList: res.data.items,
          isLoading: false,
          errMsg: ''
        })
      }, err => {
        this.$bus.$emit('getUsers', {
          userList: [],
          isLoading: false,
          errMsg: err
        })
      })
      // }).catch(res => {
      //   this.$bus.$emit('getUsers', {
      //     userList: [],
      //     isLoading: false,
      //     errMsg: res
      //   })
      // })
    }
  }
}
</script>

<style>

</style>