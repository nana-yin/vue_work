<template>
  <div id="app">
    <div class="container">
      <Category title="游戏">
        <img slot="center" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420110515%2F200524110515-2-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654419701&t=9027cc86d84e1e5b80a74b935862cdc9" />
        <a slot="footer" href="https://www.baidu.com/">更多游戏</a>
      </Category>
      <Category title="电影">
        <ul slot="center">
          <li v-for="item in movie" :key="item.id">{{item.title}}</li>
        </ul>
        <div slot="footer" class="ahref">
          <a href="https://www.baidu.com/">喜剧电影</a>
          <a href="https://www.baidu.com/">悬疑电影</a>
        </div>
      </Category>
      <Category title="汽车">
        <video slot="center" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
        <!-- <div slot="footer" class="ahref">
          <a href="https://www.baidu.com/">经典</a>
          <a href="https://www.baidu.com/">热门</a>
          <a href="https://www.baidu.com/">推荐</a>
        </div>
        <h4 slot="footer" style="text-align: center;">欢迎前来看车</h4> -->
        <template v-slot:footer>
          <div class="ahref">
            <a href="https://www.baidu.com/">经典</a>
            <a href="https://www.baidu.com/">热门</a>
            <a href="https://www.baidu.com/">推荐</a>
          </div>
          <h4 style="text-align: center;">欢迎前来看车</h4>
        </template>
      </Category>
    </div>
</div>
</template>

<script>
import Category from './components/category.vue'
export default {
  name: 'App',
  components: {
    Category
  },
  data() {
    return {
      game: [{
        id: '001',
        title: '超级玛丽'
      },{
        id: '002',
        title: '剑网三'
      },{
        id: '003',
        title: '我的世界'
      }],
      movie: [{
        id: '004',
        title: '超级英雄'
      },{
        id: '005',
        title: '蜘蛛侠'
      },{
        id: '006',
        title: '钢铁侠'
      }],
      car: [{
        id: '007',
        title: '奥迪A3'
      },{
        id: '008',
        title: '比亚迪'
      },{
        id: '009',
        title: '大众'
      }]
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  font-size: 16px;
}
.container img {
  display: inline-block;
  width: 100%;
}
.container video {
  width: 100%;
}
.ahref {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
a {
  color: blue;
  text-decoration: underline;
  text-align: center;
}
</style>