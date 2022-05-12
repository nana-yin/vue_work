<template>
  <div class="app">
    <div class="row">
      <div class="col-xs-offset-2 col-xs-8">
        <div class="page-header"><h2>Vue Router Demo</h2></div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-2 col-xs-offset-2">
        <div class="list-group">
          <!-- 使用原生html的a标签进行页面的跳转 -->
          <!-- <a class="list-group-item active" href="./about.html">About</a>
          <a class="list-group-item" href="./home.html">Home</a> -->
          <router-link to="/home" active-class="active" class="list-group-item">Home</router-link>
          <router-link to="/about" active-class="active" class="list-group-item">About</router-link>
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
    <hr/>
  </div>
</template>

<script>
// import About from './components/about.vue'
// import Home from './components/home.vue'
export default {
  name: 'App',
  components: {
    // About,
    // Home,
  }
}
</script>

<style>
</style>