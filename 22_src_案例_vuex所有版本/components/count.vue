<template>
  <div>
    <h1>当前求和为：{{sum}}</h1>
    <h3>当前求和放大十倍后为：{{bigSum}}</h3>
    <h3>我在{{school}}学习{{subject}}</h3>
    <select v-model.number="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment(n)">+</button>
    <button @click="decrement(n)">-</button>
    <button @click="incrementOdd(n)">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>

    <h3 style="color: red;">Person中的人数：{{personList.length}}</h3>
  </div>
</template>

<script>
import {mapState, mapGetters,mapMutations, mapActions} from 'vuex'
export default {
  data() {
    return {
      n: 1
    }
  },
  computed: {
    ...mapState('countModule',['sum','school','subject']),
    ...mapState('personModule',['personList']),
    ...mapGetters('countModule',['bigSum'])
  },
  methods: {
    // 借助 mapMutations 生成对应的方法，方法中会调用commit去联系mutations（对象写法）
    ...mapMutations('countModule',{increment: 'JIA', decrement: 'JIAN'}),
    // 借助 mapActions 生成对应的方法，方法中会调用commit去联系actions（对象写法）
    ...mapActions('countModule',{incrementOdd: 'oddJia', incrementWait: 'waitJia'}),
  }
}
</script>

<style>
button {
  display: inline-block;
  margin-left: 10px;
}
</style>