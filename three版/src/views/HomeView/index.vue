<template>
  <!-- 企业大屏 -->
  <screenAdapter width="3842" height="2160">
    <HeaderIndex />
    <div class="content">
      <div class="content-left">
        <EnergySupply />
      </div>
      <div class="content-middle">
        <PicModule />
        <DigitalInt />
      </div>
      <div class="content-right">
        <CarbonManagement />
        <EnergySide />
      </div>
    </div>
  </screenAdapter>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
// 引入头部组件
import HeaderIndex from '@/components/Header/index.vue'
// 引入自适应大屏的组件
import screenAdapter from '@/components/screenAdapter.vue'
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
    screenAdapter,
    HeaderIndex,
    EnergySupply,
    PicModule,
    DigitalInt,
    CarbonManagement,
    EnergySide
  },
  setup () {
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

    return {
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
