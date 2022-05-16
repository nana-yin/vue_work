<template>
  <h2>我是About的内容</h2>
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