<template>
  <div class="single">
    <h3>{{title}}</h3>
    <slot>如果没有内容，就显示这段文字，这是默认插槽</slot>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>
.single {
  background: lightblue;
  width: 200px;
  height: 300px;
  margin-right: 40px;
}
.single h3 {
  text-align: center;
  background: orange;
}
</style>