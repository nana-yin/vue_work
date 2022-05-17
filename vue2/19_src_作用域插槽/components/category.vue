<template>
  <div class="single">
    <h3>{{title}}</h3>
    <slot :games="games" hello="你好">
      这是默认文字，作用域插槽。
      数据在本组件中，不在父组件里面。
      想要实现--》相同的数据展示不同的效果。
    </slot>
    <!-- <slot :games="games" hello="你好" name="haha">
      这是默认文字，作用域插槽。
      在父组件中使用子组件的数据。
      作用域插槽也可以有名字，当写了名字的时候，要在父组件中使用slot="haha"。
    </slot> -->
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      games: [{
        id: '001',
        title: '超级玛丽'
      },{
        id: '002',
        title: '剑网三'
      },{
        id: '003',
        title: '我的世界'
      }]
    }
  }
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