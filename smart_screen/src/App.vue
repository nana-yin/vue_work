<template>
  <div id="page"><router-view /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getLocationParams } from '@/utils/util'
import request from '@/api/smartEnery'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup () {
    const store = useStore()

    // 初始化判断，当前的项目是否登录过
    const isLogin = () => {
      const paramObj = getLocationParams()
      request
        .getStoreCheckLoginCode({
          code: paramObj.sessionId,
          storeId: paramObj.storeId
        })
        .then((res: any) => {
          const { success, model } = res
          if (success) {
            // 成功
            // 存储登录的凭证
            store.commit('setSessionId', model)
          }
        })
    }
    isLogin()
  }
})
</script>

<style lang="scss">
@import url("@/assets/css/reset.css");
@import "@/assets/fonts/font.css";
#page {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background: url("@/assets/images/bg.png") no-repeat center;
  background-size: cover;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #fff;
}
</style>
