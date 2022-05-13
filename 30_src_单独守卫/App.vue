<template>
  <div class="app">
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header">
          <h2>Vue Router Demo</h2>
          <button @click="forward">前进</button>
          <button @click="back">后退</button>
          <button @click="test">测试go</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 浏览器的历史记录有两种写入方式：分别是push和replace。
            push是追加，replace是替换当前记录 -->
          <router-link replace to="/home" active-class="active" class="list-group-item">Home</router-link>
          <router-link replace to="/about" active-class="active" class="list-group-item">About</router-link>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="panel">
          <div class="panel-body">
            <!-- 用于表示组件放置的位置 -->
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods: {
    back() {
      this.$router.back()
    },
    forward() {
      this.$router.forward()
    },
    test() {
      // 可前进可后退
      this.$router.go()
    },
  }
}
</script>

<style>
</style>