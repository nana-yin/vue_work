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
    console.log('About中的页面内容即将被销毁')
  },
  // 组件路由守卫，根据路由规则，进入组件之前触发
  beforeRouteEnter(to,from,next) {
    console.log('进入About组件', to,from)
    if(to.meta.isAuth) { // 用于鉴权
      alert('暂无权限查看！')
    } else {
      next()
    }
  },
  // 组件路由守卫，根据路由规则，离开组件之前触发
  beforeRouteLeave(to,from, next) {
    console.log('离开About组件', to,from)
    next()
  }
}
</script>

<style>

</style>