<template>
  <div>
    <h2>About组件内容</h2>
    <ul class="nav nav-tabs">
      <li>
        <router-link class="list-group-item" active-class="active" to="/about/news">News</router-link>
      </li>
      <li>
        <router-link class="list-group-item" active-class="active" to="/about/message">Message</router-link>
      </li>
    </ul>
    <!-- 单独的保持挂载状态，include中的值为组件名！！！ -->
    <keep-alive include="News">
      <router-view></router-view>
    </keep-alive>
    <!-- 多个组件保持挂载状态，include的值为数组！ -->
    <!-- <keep-alive :include="['News', 'Message']">
      <router-view></router-view>
    </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'About',
  beforeDestroy() {
    console.log('About中的页面内容即将呗销毁')
  }
}
</script>

<style>

</style>