<template>
  <div>
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- <transition name="hello"> -->
    <transition appear>
      <h1 v-if="isShow">你好</h1>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  }
}
</script>

<style scoped>
h1 {
  background: orange;
}
.v-enter-active {
  animation: myAnimate 0.5s linear;
}
.v-leave-active {
  animation: myAnimate 0.5s linear reverse;
}
@keyframes myAnimate {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0px);
  }
}
</style>