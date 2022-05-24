<template>
  <div class="bg">
    <div>我是App组件</div>
    <!-- <Child/> -->
    <Suspense>
      <!-- 这里用来写原本要展示的内容 -->
      <template v-slot:default>
        <Child/>
      </template>
      <!-- 这里写原本的内容未加载出来的内容 -->
      <template v-slot:fallback>
        <h3>稍等，内容加载中......</h3>
      </template>
    </Suspense>
  </div>
</template>

<script>
// import Child from './components/child.vue'  // 静态引入
import {defineAsyncComponent} from 'vue'  // 异步引入组件
const Child = defineAsyncComponent(() => import('./components/child.vue'))

export default {
  name: 'App',
  components: {
    Child
  },
}
</script>

<style scoped>
.bg {
  padding: 10px 20px;
  background: #f5f5f5;
}
</style>