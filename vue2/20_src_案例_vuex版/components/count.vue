<template>
  <div>
    <h1>当前求和为：{{$store.state.sum}}</h1>
    <h3>当前求和放大十倍后为：{{$store.getters.bigSum}}</h3>
    <h3>我在{{$store.state.school}}学习{{$store.state.subject}}</h3>
    <select v-model.number="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait">等一等再加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 1,
      // sum: 0
    }
  },
  methods: {
    increment() {
      this.$store.commit('JIA', this.n)
      // this.$store.dispatch('jia', this.n)
      // this.sum += this.n
    },
    decrement() {
      this.$store.commit('JIAN', this.n)
      // this.$store.dispatch('jian', this.n)
      // this.sum -= this.n
    },
    incrementOdd() {
      this.$store.dispatch('oddJia', this.n)
      // if (this.sum % 2) {
      //   this.sum += this.n
      // }
    },
    incrementWait() {
      this.$store.dispatch('waitJia', this.n)
      // setTimeout(() => {
      //   this.sum += this.n
      // }, 500)
    }
  }
}
</script>

<style>
button {
  display: inline-block;
  margin-left: 10px;
}
</style>