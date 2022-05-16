<template>
  <div id="app">
    <div class="container">
      <Category title="游戏">
        <template scope="getData">
          <ul>
            <li v-for="item in getData.games" :key="item.id">{{item.title}}</li>
          </ul>
        </template>
      </Category>
      <Category title="游戏">
        <template scope="getData">
          <ol>
            <li v-for="item in getData.games" :key="item.id">{{item.title}}</li>
          </ol>
        </template>
      </Category>
      <Category title="游戏">
        <template slot-scope="getData">
          <h2 v-for="item in getData.games" :key="item.id">{{item.title}}</h2>
          <div style="text-align: center;color: red;">{{getData.hello}}</div>
        </template>
      </Category>
      <!-- <Category title="游戏">
        <template slot-scope="getData" slot="haha">
          <h2 v-for="item in getData.games" :key="item.id">{{item.title}}</h2>
          <div style="text-align: center;color: red;">{{getData.hello}}</div>
        </template>
      </Category> -->
    </div>
</div>
</template>

<script>
import Category from './components/category.vue'
export default {
  name: 'App',
  components: {
    Category
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