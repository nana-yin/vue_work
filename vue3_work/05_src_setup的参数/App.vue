<template>
  <HelloWorld sex="女" job="学生" @hello="showHello">
    <!-- <span>这是一个默认的插槽</span> -->
    <template v-slot:qwe>
      <span>具名插槽,在vue3中使用slot="qwe"不兼容。</span>
    </template>
    <template v-slot:asd>
      <span>具名插槽,在vue3中使用slot="asd"不兼容。使用v-slot就行。</span>
    </template>
  </HelloWorld>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    function showHello(val) {
      alert('你好，触发子组件中的事件'+ val)
    }
    return {
      showHello
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
