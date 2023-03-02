<template>
  <!-- 自定义大屏屏幕适配方案 -->
  <div class="rv-screen-adapter" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ScreenAdapter',
  props: {
    // 参数注入
    width: {
      type: String,
      default: '1920'
    },
    height: {
      type: String,
      default: '1080'
    }
  },
  data () {
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        transform: 'scale(1) translate(-50%, -50%)'
      }
    }
  },
  mounted () {
    this.setScale()
    window.onresize = this.Debounce(this.setScale, 1000)
  },
  methods: {
    Debounce: (fn, t) => {
      const delay = t || 500
      let timer = null
      return function () {
        const args = arguments
        if (timer) {
          clearTimeout(timer)
        }
        const context = this
        timer = setTimeout(() => {
          timer = null
          fn.apply(context, args)
        }, delay)
      }
    },
    // 获取放大缩小比例
    getScale () {
      // console.log('window',window.innerWidth,this.width)
      const w = window.innerWidth / this.width
      const h = window.innerHeight / this.height
      // console.log(`屏幕比：宽：${w},高：${h}`)
      return w < h ? w : h
    },
    // 设置比例
    setScale () {
      this.style.transform =
        'scale(' + this.getScale() + ') translate(-50%, -50%)'
      // console.log('this.getScale()', this.getScale())
      // console.log(`当前屏幕尺寸，宽：${window.innerWidth},高：${window.innerHeight}`)
      // console.log(`宽：${window.innerWidth},高：${window.innerHeight}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.rv-screen-adapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  overflow: hidden;
}
</style>
