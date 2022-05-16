<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">
        <!-- 跳转路由并且携带params参数,to的字符串写法,路径配置:path: 'detail/:id/:title' -->
        <!-- <router-link :to="`/about/message/detail/${item.id}/${item.title}`">{{item.title}}</router-link> -->
        <!-- 跳转路由并且携带params参数,to的对象写法,,路径配置:path: 'detail/:id/:title'。
            params只能和name搭配使用
        -->
        <router-link :to="{
          name: 'xiangqing',
          params: {
            id: item.id,
            title: item.title
          }
        }">
          {{item.title}}
        </router-link>
      </li>
    </ul>
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