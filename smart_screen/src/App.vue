<template>
  <div id="page"><router-view /></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getLocationParams } from '@/utils/util'
import request from '@/api/smartEnery'

export default defineComponent({
  name: 'App',
  setup () {
    // 初始化判断，当前的项目是否登录过
    const isLogin = () => {
      const sessionId = sessionStorage.getItem('sessionId')
      if (!sessionId) {
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
              sessionStorage.setItem('sessionId', model)
            }
          })
      }
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
.ant-spin-nested-loading > div > .ant-spin {
  max-height: 100%!important;
}
</style>
