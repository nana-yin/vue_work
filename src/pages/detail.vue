<template>
  <h3>
    <!-- <div>消息id是:{{$route.params.id}}</div>
    <div>消息标题是:{{$route.params.title}}</div> -->
    <div>消息id是:{{id}}</div>
    <div>消息标题是:{{title}}</div>
  </h3>
</template>

<script>
export default {
  name: 'Detail',
  props: ['id', 'title'],
  data() {
    return {
    }
  }
}
</script>

<style>

</style>