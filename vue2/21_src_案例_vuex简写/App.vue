<template>
  <div class="app">
    <Count/>
  </div>
</template>

<script>
import Count from './components/count.vue'
export default {
  name: 'App',
  components: {
    Count
  }
}
</script>

<style>
.app {
  padding: 20px;
}
</style>