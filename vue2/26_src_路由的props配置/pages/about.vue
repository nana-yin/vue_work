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
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'About',
  mounted() {
    console.log('About中的页面内容挂载')
    console.log('About',this)
    // 该组件的实例中$route是只属于该组件的，但是里面中的$srouter是全局的
  },
  beforeDestroy() {
    console.log('About中的页面内容即将呗销毁')
  }
}
</script>

<style>

</style>