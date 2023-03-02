<template>
  <div class="header">
    <div class="header-left">
      <img class="header-left__logo" :src="storeInfo.logoUrl" />
      <div class="header-left__title">{{ storeInfo.name }}</div>
      <!-- 下拉框 -->
      <div class="select-store" v-if="storeOptions.length">
        <div class="select-store__btn" @click="selectDropVisible">
          <div class="text">{{valueInit}}</div>
          <div class="triangle"></div>
        </div>
        <div class="select-store__dropDown" v-show="dropIsVisible">
          <div v-for="(item,index) in storeOptions" :key="index">
            <div @click="() => handleChange(item)" :class="item.value == valueParam ? 'choose-text' : 'common-text'">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <!-- 中间切换的标题 -->
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
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue'
import { message } from 'ant-design-vue'
// 引用应用中心的icon
import applicationIcon from '@/assets/images/application.png'
// 引用知识库的icon
import knowledgeIcon from '@/assets/images/knowledge.png'
// 获取地址栏的参数的函数
import { getLocationParams } from '@/utils/util'
// 引入请求
import request from '@/api/smartEnery'

export default defineComponent({
  name: 'HeaderIndex',
  setup (props, { emit }) {
    const paramObj = getLocationParams()
    const defineData = reactive({
      storeInfo: {
        // name: '企业综合能源管理大脑',
        name: '智慧能源',
        logoUrl:
          'https://upload.qre.com.cn/photo/240696/9171514439186018/f77a287c8d72a1c9@w422_h323.jpg'
      }, // 企业的基本信息
      leftNavTitle: [{
        name: '首页',
        className: 'active-title'
      }, {
        name: '供能侧',
        className: 'common-title'
      }, {
        name: '数智配电',
        className: 'common-title'
      },
      {
        name: '智慧用能',
        className: 'common-title'
      }], // 中间的标题列表
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
      storeOptions: [] as any, // 下拉框的数据
      dropIsVisible: false, // 显示下拉框
      valueInit: '', // 默认的下拉框数据
      valueParam: '', // 下拉框选中的id
      fullScreen: false, // 是否全屏展示
      leftNavPermission: [] as any // 标题是否有权限
    })

    // 数据初始化
    onMounted(() => {
      setTimeout(() => {
        // 获取企业
        getEnterprise()
        // 获取当前的模块
        getModel()
      }, 2000)
    })

    // 获取用户拥有的企业
    const getEnterprise = () => {
      request.getStoreGetUserStoreIds({
        loginId: paramObj.loginId
      }).then((res: any) => {
        const { success, model } = res
        if (success) {
          // 成功
          if (model && model.length) {
            defineData.storeOptions = []
            model.forEach((item:any) => {
              const obj = {
                value: item.storeId,
                label: item.storeName
              }
              defineData.storeOptions.push(obj)
            })
            defineData.valueInit = defineData.storeOptions[0].label
            defineData.valueParam = defineData.storeOptions[0].value
            emit('getStoreId', defineData.valueParam)
          }
          getLogo()
        }
      })
    }

    const getModel = () => {
      // 获取当前应用系统下的模块
      request.getStoreListModels().then((res: any) => {
        const { success, model } = res
        if (success) {
          // 成功
          if (model && model.length) {
            model.forEach((item:any) => {
              const obj = {
                sid: item.sid,
                title: item.title
              }
              defineData.leftNavPermission.push(obj)
            })
          }
        }
      })
    }

    // 获取当前机构的Logo
    const getLogo = () => {
      request
        .getStoreGetStoreLogo({
          storeId: defineData.valueParam
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
    }

    // 显示下拉框
    const selectDropVisible = () => {
      defineData.dropIsVisible = !defineData.dropIsVisible
    }

    // 切换类型
    const handleChange = (item: any) => {
      console.log('选择的类型', item)
      defineData.dropIsVisible = !defineData.dropIsVisible
      defineData.valueInit = item.label
      defineData.valueParam = item.value
      emit('getStoreId', defineData.valueParam)
    }

    // 点击nav进行跳转
    const handleClickNav = function (e: MouseEvent) {
      const target = e.target as HTMLElement
      const name = target.innerText || ''
      const arr = defineData.leftNavTitle
      let url = ''
      if (
        process.env.VUE_APP_BASE_API == '/api' ||
        process.env.VUE_APP_BASE_API == 'http://10.0.103.112:80' ||
        process.env.VUE_APP_BASE_API == 'http://115.236.62.114:65080'
      ) {
        // 本地或者测试服
        // url = 'http://10.0.103.112'
        url = 'http://localhost:9090'
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
          const hasPermission = defineData.leftNavPermission.some((item:any) => {
            return item.title === '智慧用能'
          })
          if (hasPermission) { // 有权限，进行跳转
            request.getStoreSendLoginCode({
              modelId: paramObj.sessionId,
              loginId: paramObj.loginId
            }).then((res: any) => {
              const { success, model } = res
              if (success) {
                // 成功
                if (model) {
                  // 路由上面有参数
                  url += `/index.html#/organboard?code=${model}&storeId=${defineData.valueParam}`
                }
                console.log('智慧用能-拿到的数据', model)
                // window.open(url, '_blank')
              }
            })
          } else {
            message.error('账号下无该系统权限，请联系管理员开通')
          }
          break
        case '数智配电':
          const szpdPermission = defineData.leftNavPermission.some((item:any) => {
            return item.title === '数智配电'
          })
          if (szpdPermission) { // 有权限，进行跳转
            request.getStoreSendLoginCode({
              modelId: paramObj.sessionId,
              loginId: paramObj.loginId
            }).then((res: any) => {
              const { success, model } = res
              if (success) {
                // 成功
                if (model) {
                  // 路由上面有参数
                  url += `/index.html#/organboard?code=${model}&storeId=${defineData.valueParam}`
                }
                console.log('数智配电-拿到的数据', model)
                // window.open(url, '_blank')
              }
            })
          } else {
            message.error('账号下无该系统权限，请联系管理员开通')
          }
          break
        case '应用中心':
          request.getStoreSendLoginCode({
            modelId: paramObj.sessionId,
            loginId: paramObj.loginId
          }).then((res: any) => {
            const { success, model } = res
            if (success) {
              // 成功
              if (model) {
                // 路由上面有参数
                url += `/index.html#/index0?code=${model}}`
              }
              console.log('应用中心-拿到的数据', model)
              // window.open(url, '_blank')
            }
          })
          break
        case '知识库':
          request.getStoreSendLoginCode({
            modelId: paramObj.sessionId,
            loginId: paramObj.loginId
          }).then((res: any) => {
            const { success, model } = res
            if (success) {
              // 成功
              if (model) {
                // 路由上面有参数
                url += `/index.html#/help/index?code=${model}}`
              }
              console.log('知识库-拿到的数据', model)
              // window.open(url, '_blank')
            }
          })
          break
      }
    }

    return {
      ...toRefs(defineData),
      handleClickNav,
      handleChange,
      selectDropVisible
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
      margin: 0 78px 0 19px;
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

.select-store {
  position: relative;
  width: 560px;
  height: 66px;
  margin-right: 328px;
  background: #FFFFFF;
  border-radius: 4px;
  &__btn {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    padding: 13px 16px 13px 17px;
  }
  .text {
    position: relative;
    left: 52px;
    font-size: 28px;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
    &::before {
      content: '';
      position: absolute;
      left: -52px;
      top: 2px;
      display: block;
      width: 36px;
      height: 36px;
      background: url("@/assets/images/store.png") no-repeat;
      background-size: 36px auto;
    }
  }
  .triangle {
    width: 22px;
    height: 13px;
    border-top: 13px solid #C2C2C2;
    border-bottom: 0 solid transparent;
    border-right: 13px solid transparent;
    border-left: 13px solid transparent;
    border-radius: 13px;
  }
  &__dropDown {
    box-sizing: border-box;
    display: block;
    z-index: 20;
    position: absolute;
    left: 0;
    top: 74px;
    width: 560px;
    padding: 12px 0;
    background: #fff;
    box-shadow: 0px 4px 6px 0px rgba(0,0,0,0.1);
    border-radius: 4px;
  }
  .choose-text,.common-text {
    cursor: pointer;
    white-space: nowrap;
    padding: 16px 24px;
    font-size: 28px;
    font-weight: 400;
    color: #333;
  }
  .choose-text {
    color: #fff;
    background: #5A8BFF;
  }
}
</style>
