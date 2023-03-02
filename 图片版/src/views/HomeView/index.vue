<template>
  <!-- 头部 -->
  <HeaderIndex @getStoreId="getStoreId"/>
  <div class="content">
    <div class="content-left">
      <!-- 供能侧 -->
      <EnergySupply :storeId="storeId"/>
    </div>
    <div class="content-middle">
      <!-- 图片切换 -->
      <PicModule :storeId="storeId"/>
      <!-- 数智配电 -->
      <DigitalInt :storeId="storeId"/>
    </div>
    <div class="content-right">
      <!-- 碳管理 -->
      <CarbonManagement :storeId="storeId" />
      <!-- 用能侧 -->
      <EnergySide :storeId="storeId"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
// 引入头部组件
import HeaderIndex from '@/components/Header/index.vue'
// 引入供能侧的组件
import EnergySupply from './components/energySupply.vue'
// 引入图的组件
import PicModule from './components/picModule.vue'
// 引入数智配电的组件
import DigitalInt from './components/digitalInt.vue'
// 引入碳管理的组件
import CarbonManagement from './components/carbonManagement.vue'
// 引入用能侧的组件
import EnergySide from './components/energySide.vue'

export default defineComponent({
  name: 'HomeViewIndex',
  components: {
    HeaderIndex,
    EnergySupply,
    PicModule,
    DigitalInt,
    CarbonManagement,
    EnergySide
  },
  setup () {
    const data = reactive({
      storeId: '' // 拿到的storeId
    })
    const isFullScreen = ref(false) // // 是否全屏展示

    // 是否全屏展示
    const onFullScreen = function (value?: boolean) {
      isFullScreen.value = value || false
      if (value) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    }

    // 拿到机构ID
    const getStoreId = (val:string) => {
      data.storeId = val + ''
    }

    return {
      ...toRefs(data),
      getStoreId,
      onFullScreen
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 64px 55px 68px;
  height: calc(100% - 98px);
  &-left {
    box-sizing: border-box;
    overflow-y: auto;
    flex: 2;
    background: url("@/assets/images/gnc_bg.png") no-repeat;
    background-size: 100% 100%;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &-middle {
    flex: 1;
    min-width: 2076px;
    height: 100%;
    overflow-y: auto;
    margin: 0 70px 0 68px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &-right {
    box-sizing: border-box;
    min-width: 760px;
    flex: 2;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
