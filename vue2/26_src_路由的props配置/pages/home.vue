<template>
  <div>
    <h2>Home组件内容</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  mounted() {
    console.log('Home中的页面内容挂载')
    console.log('Home',this)
    // 该组件的实例中$route是只属于该组件的，但是里面中的$srouter是全局的
  },
  beforeDestroy() {
    console.log('Home中的页面内容即将呗销毁')
  }
}
</script>

<style>

</style>