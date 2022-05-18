<template>
  <div>
    <button @click="changeShow">点我进行组件显示/隐藏</button>
    <HelloWorld v-if="isShow"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  setup() {
    const isShow = ref(true)

    function changeShow() {
      isShow.value = !isShow.value
    }

    return {
      isShow,
      changeShow
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
