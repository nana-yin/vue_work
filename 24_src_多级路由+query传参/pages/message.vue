<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        <!-- 跳转路由并且携带query参数,to的字符串写法 -->
        <!-- <router-link :to="`/about/message/detail?id=${item.id}&title=${item.title}`">{{item.title}}</router-link> -->
        <!-- 跳转路由并且携带query参数,to的对象写法。记住左括号不要换行，不然会报错！ -->
        <router-link :to="{
          path: '/about/message/detail',
          query: {
            id: item.id,
            title: item.title
          }
        }">
          {{item.title}}
        </router-link>
      </li>
    </ul>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Message',
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
h2 {
  text-align: center;
}
</style>