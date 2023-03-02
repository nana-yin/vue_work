<template>
    <div id="page"><router-view /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
  },
  setup () {
  }
})
</script>

<style lang="scss">
@import url("@/assets/css/reset.css");
@import "@/assets/fonts/font.css";
#app {
  width: 100%;
  height: 100%;
  background: #051a2d;
}
#page {
  position: relative;
  box-sizing: border-box;
  background: url("@/assets/images/bg.png") no-repeat center;
  background-size: cover;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #fff;
}
.ant-spin-nested-loading > div > .ant-spin {
  max-height: 100%!important;
}
</style>
