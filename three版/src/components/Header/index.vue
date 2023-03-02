<template>
  <div class="header">
    <div class="header-left">
      <img class="header-left__logo" :src="storeInfo.logoUrl" />
      <div class="header-left__title">{{ storeInfo.name }}</div>
      <div class="header-left__nav" @click="handleClickNav">
        <div
          v-for="(item, index) in leftNavTitle"
          :key="index"
          :class="item.className"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="header-right" @click="handleClickNav">
      <div
        class="header-right__single"
        v-for="(item, index) in rightNavTitle"
        :key="index"
      >
        <img class="icon" :src="item.icon" />
        <div class="title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
// 引用应用中心的icon
import applicationIcon from '@/assets/images/application.png'
// 引用知识库的icon
import knowledgeIcon from '@/assets/images/knowledge.png'
import { getLocationParams } from '@/utils/util'
// 引入请求
import request from '@/api/smartEnery'

export default defineComponent({
  name: 'HeaderIndex',
  setup () {
    const paramObj = getLocationParams()
    const defineData = reactive({
      storeInfo: {
        // name: '企业综合能源管理大脑',
        name: '智慧能源',
        logoUrl:
          'https://upload.qre.com.cn/photo/240696/9171514439186018/f77a287c8d72a1c9@w422_h323.jpg'
      }, // 企业的基本信息
      leftNavTitle: [
        {
          name: '首页',
          className: 'active-title'
        },
        {
          name: '供能侧',
          className: 'common-title'
        },
        {
          name: '数智配电',
          className: 'common-title'
        },
        {
          name: '智慧用能',
          className: 'common-title'
        }
      ], // 左边的标题列表
      rightNavTitle: [
        {
          name: '应用中心',
          icon: applicationIcon
        },
        {
          name: '知识库',
          icon: knowledgeIcon
        }
      ], // 右边的标题列表
      fullScreen: false // 是否全屏展示
    })

    onMounted(() => {
      setTimeout(() => {
        request
          .getStoreGetStoreLogo({
            storeId: paramObj.storeId
          })
          .then((res: any) => {
            const { success, model } = res
            if (success) {
              // 成功
              defineData.storeInfo.logoUrl = model.storeLogo
                ? 'https://upload.qre.com.cn/' + model.storeLogo
                : 'https://upload.qre.com.cn/photo/240696/9171514439186018/f77a287c8d72a1c9@w422_h323.jpg'
            }
          })
      }, 2000)
    })

    // 点击nav进行跳转
    const handleClickNav = function (e: MouseEvent) {
      const target = e.target as HTMLElement
      const name = target.innerText || ''
      const arr = defineData.leftNavTitle
      let url = ''
      if (
        process.env.VUE_APP_BASE_API == '/api' ||
        process.env.VUE_APP_BASE_API == 'http://10.0.103.112:80'
      ) {
        // 本地或者测试服
        url = 'http://10.0.103.112'
        // url = 'http://localhost:9090'
      } else {
        // 生产服
        url = 'https://ele.qre.com.cn'
      }
      switch (name) {
        case '首页':
          arr.forEach((item) => {
            item.className = 'common-title'
            if (item.name === name) {
              item.className = 'active-title'
            }
          })
          break
        case '供能侧':
          message.info('敬请期待')
          break
        case '智慧用能':
          message.info('敬请期待')
          break
        case '数智配电':
          request.getStoreSendLoginCode().then((res: any) => {
            const { success, model } = res
            if (success) {
              // 成功
              if (model) {
                // 路由上面有参数
                url += `/index.html#/organboard?code=${model}&storeId=${paramObj.storeId}`
              }
              window.open(url, '_blank')
            }
          })
          break
        case '应用中心':
          request.getStoreSendLoginCode().then((res: any) => {
            const { success, model } = res
            if (success) {
              // 成功
              if (model) {
                // 路由上面有参数
                url += `/index.html#/index0?code=${model}}`
              }
              window.open(url, '_blank')
            }
          })
          break
        case '知识库':
          request.getStoreSendLoginCode().then((res: any) => {
            const { success, model } = res
            if (success) {
              // 成功
              if (model) {
                // 路由上面有参数
                url += `/index.html#/help/index?code=${model}}`
              }
              window.open(url, '_blank')
            }
          })
          break
      }
    }

    return {
      ...toRefs(defineData),
      handleClickNav
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  height: 98px;
  background: #092f73;
  &-left {
    width: 75%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    padding-left: 26px;
    &__logo {
      width: 107px;
      height: 66px;
    }
    &__title {
      width: 362px;
      height: 48px;
      margin: 0 84px 0 19px;
      white-space: nowrap;
      font-size: 34px;
      font-weight: 600;
      color: #ffffff;
      line-height: 48px;
    }
    &__nav {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .common-title,
      .active-title {
        cursor: pointer;
        width: 220px;
        height: 98px;
        background: #092f73;
        text-align: center;
        font-size: 28px;
        font-weight: 600;
        color: #fff;
        line-height: 98px;
      }
      .active-title {
        background: #012160;
      }
    }
  }
  &-right {
    width: 25%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    padding-right: 54px;
    &__single {
      cursor: pointer;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      margin-right: 89px;
      white-space: nowrap;
      &:last-of-type {
        margin-right: 0;
      }
      .icon {
        display: inline-block;
        width: 36px;
        height: 36px;
        margin-right: 16px;
      }
      .title {
        display: inline-block;
        width: 142px;
        font-size: 28px;
        font-weight: 600;
        color: #ffffff;
        line-height: 40px;
      }
    }
  }
}
</style>
