<template>
  <h3>
    <div>消息id是:{{$route.query.id}}</div>
    <div>消息标题是:{{$route.query.title}}</div>
  </h3>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
    }
  }
}
</script>

<style>

</style>