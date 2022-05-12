<template>
    <ul>
      <li v-for="item in list" :key="item.id">
        <div>消息id是:{{item.id}}</div>
        <div>消息标题是:{{item.title}}</div>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      list: [{
        id: '001',
        title: '消息1111'
      },{
        id: '002',
        title: '消息2222'
      },{
        id: '003',
        title: '消息3333'
      }]
    }
  }
}
</script>

<style>

</style>