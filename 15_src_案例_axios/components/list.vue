<template>
  <div class="row">
    <!-- 展示的内容 -->
    <div v-show="info.userList.length" class="card" v-for="item in info.userList" :key="item.id">
      <a :href="item.html_url" target="_blank">
        <img :src="item.avatar_url" style='width: 100px'/>
      </a>
      <p class="card-text">{{item.login}}</p>
    </div>
    <!-- 初次打开页面 -->
    <h1 v-show="info.isFirst">欢迎来到本页面~</h1>
    <!-- 加载中...  -->
    <h1 v-show="info.isLoading">加载中...</h1>
    <!-- 错误信息 -->
    <h1 v-show="info.errMsg">{{info.errMsg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      info: {
        userList: [],
        isFirst: true,
        isLoading: false,
        errMsg: ''
      }
    }
  },
  mounted() {
    this.$bus.$on('getUsers', obj => {
      this.info = {...this.info, ...obj}
    })
  }
}
</script>

<style>

</style>