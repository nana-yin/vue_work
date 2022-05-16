<template>
  <div class="single">
    <h3>{{title}}</h3>
    <slot name="center">如果没有内容，就显示这段文字，这是中间插槽</slot>
    <slot name="footer">如果没有内容，就显示这段文字，这是链接插槽</slot>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>
.single {
  width: 400px;
  height: 300px;
  margin-right: 40px;
  background: #f5f5f5;
}
.single h3 {
  text-align: center;
  background: orange;
}
</style>