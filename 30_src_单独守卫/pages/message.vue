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
          query: {
            id: item.id,
            title: item.title
          }
        }">
          {{item.title}}
        </router-link>
        <button @click="pushRoute(item)">push查看</button>
        <button @click="replaceRoute(item)">replace查看</button>
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
  },
  beforeDestroy() {
    console.log('News中的页面内容即将呗销毁')
  },
  methods: {
    pushRoute(val) {
      this.$router.push({
        path: '/about/message/detail',
        query: {
          id: val.id,
          title: val.title
        }
      })
    },
    replaceRoute(val) {
      this.$router.replace({
        path: '/about/message/detail',
        query: {
          id: val.id,
          title: val.title
        }
      })
    }
  }
}
</script>

<style>
</style>