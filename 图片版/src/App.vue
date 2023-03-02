<template>
  <screenAdapter width="3842" height="2160">
    <div id="page"><router-view /></div>
  </screenAdapter>
  <div class="returnBtn" v-if="btnIsShow">返回</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, nextTick } from 'vue'
import request from '@/api/smartEnery'
import { getLocationParams } from '@/utils/util'
// 引入自适应大屏的组件
import screenAdapter from '@/components/screenAdapter.vue'

export default defineComponent({
  name: 'App',
  components: {
    screenAdapter
  },
  setup () {
    const data = reactive({
      btnIsShow: false // 按钮是否需要显示
    })
    // 初始化判断，当前的项目是否登录过
    const isLogin = () => {
      const sessionId = sessionStorage.getItem('sessionId')
      if (!sessionId) {
        const paramObj = getLocationParams()
        request
          .getStoreCheckLoginCode({
            code: paramObj.sessionId,
            loginId: paramObj.loginId
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

    onMounted(() => {
      const paramObj = getLocationParams()
      data.btnIsShow = paramObj.isVideo
      if (data.btnIsShow) {
        // 监听返回按钮
        nextTick(() => {
          const returnBtnDom = document.getElementsByClassName('returnBtn')[0] as HTMLElement
          if (returnBtnDom) {
            returnBtnDom.onclick = function () {
              window.location.href = 'http://192.168.191.63:8801?index=' + paramObj.index
            }
          }
        })
      }
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang="scss">
@import url("@/assets/css/reset.css");
@import "@/assets/fonts/font.css";
#app {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("@/assets/images/bg.png") no-repeat center;
  background-size: cover;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #fff;
}
#page {
  position: relative;
  box-sizing: border-box;
  // background: url("@/assets/images/bg.png") no-repeat center;
  // background-size: cover;
  // font-family: PingFangSC-Regular, PingFang SC;
  // color: #fff;
}
.ant-spin-nested-loading > div > .ant-spin {
  max-height: 100%!important;
}
.returnBtn {
  cursor: pointer;
  z-index: 20;
  position: absolute;
  right: 20px;
  top: 20px;
  padding: 10px 20px;
  font-size: 36px;
  color: #fff;
  background: #f093a283;
}
</style>
