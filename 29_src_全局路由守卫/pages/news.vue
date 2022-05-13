<template>
  <ul>
    <li>news001<input type="text"></li>
    <li>news002<input type="text"></li>
    <li>news003<input type="text"></li>
    <h2 :style="'opacity:'+opacity">我是要变化的！</h2>
  </ul>
</template>

<script>
export default {
  name: 'News',
  data() {
    return {
      opacity: 1
    }
  },
  // 组件被激活的时候使用
  activated() {
    this.timer = setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) {
        this.opacity = 1
      }
    }, 16)
  },
  // 组件失活的时候使用
  deactivated() {
    console.log('News中的页面内容即将被销毁')
    clearInterval(this.timer)
  }
  // mounted() {
  //   this.timer = setInterval(() => {
  //     this.opacity -= 0.01
  //     if (this.opacity <= 0) {
  //       this.opacity = 1
  //     }
  //   }, 16)
  // },
  // beforeDestroy() {
  //   console.log('News中的页面内容即将被销毁')
  //   clearInterval(this.timer)
  // }
}
</script>

<style>

</style>