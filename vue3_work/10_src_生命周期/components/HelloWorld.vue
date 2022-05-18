<template>
  <div>
    <h2>和为：{{sum}}</h2>
    <button @click="sum++">点我加1</button>
  </div>
</template>

<script>
import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount,onUnmounted,ref} from 'vue'
export default {
  name: 'HelloWorld',
  // 通过配置项的形式使用生命周期钩子
  // beforeCreate() {
  //   console.log('---beforeCreate---')
  // },
  // created() {
  //   console.log('---created---')
  // },
  // beforeMount() {
  //   console.log('---beforeMount---')
  // },
  // mounted() {
  //   console.log('---mounted---')
  // },
  // beforeUpdate() {
  //   console.log('---beforeUpdate---')
  // },
  // updated() {
  //   console.log('---updated---')
  // },
  // /*
  //   在vue3中不可用
  //   beforeDestroy() {
  //     console.log('---beforeDestroy---')
  //   },
  //   destroyed() {
  //     console.log('---destroyed---')
  //   },
  // */
  // beforeUnmount() {
  //   console.log('---beforeUnmount---')
  // },
  // unmounted() {
  //   console.log('---unmounted---')
  // },
  setup() {
    let sum = ref(0)
    console.log('---setup----')
    // 通过组合API形式使用生命周期钩子
    // onBeforeMount(() => {
    //   console.log('---onBeforeMount---')
    // })
    // onMounted(() => {
    //   console.log('---onMounted---')
    // })
    // onBeforeUpdate(() => {
    //   console.log('---onBeforeUpdate---')
    // })
    // onUpdated(() => {
    //   console.log('---onUpdated---')
    // })
    // onBeforeUnmount(() => {
    //   console.log('---onBeforeUnmount---')
    // })
    // onUnmounted(() => {
    //   console.log('---onUnmounted---')
    // })

    return {
      sum
    }
  }
}
</script>

<style>

</style>