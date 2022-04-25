<template>
  <div>
    <!-- ref -->
    <h1>你好</h1>
    <button ref="btn" @click="handleBtn">点我</button>
    <div v-text="mes"></div>
    <hr>
    <MyComponent ref="zujian" name="张三" :age="18"/>
  </div>
</template>

<script>
import MyComponent from '@/components/myComponent.vue'
export default {
  components: {
    MyComponent,
  },
  data() {
    return {
      mes:'哈哈哈'
    }
  },
  methods: {
    handleBtn() {
      const dom = this.$refs.btn
      console.log('dom',dom)  // 真实dom元素
      const $vc = this.$refs.zujian
      console.log('$vc',$vc) // 组件的实例对象
    }
  }
}
</script>

<style>

</style>