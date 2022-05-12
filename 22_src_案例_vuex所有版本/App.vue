<template>
  <div class="app">
    <Count/>
    <hr/>
    <Person/>
  </div>
</template>

<script>
import Count from './components/count.vue'
import Person from './components/person.vue'
export default {
  name: 'App',
  components: {
    Count,
    Person
  }
}
</script>

<style>
.app {
  padding: 20px;
}
</style>