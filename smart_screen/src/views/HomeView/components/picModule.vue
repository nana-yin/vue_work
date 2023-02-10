<template>
  <div class="pic-module">
    <div class="pic-module__top">
      <div class="tab-box" @click="changeTab">
        <div
          v-for="(item, index) in tabList"
          :key="index"
          :class="item.className"
        >
          {{ item.name }}
        </div>
      </div>
      <DateTime />
    </div>
    <div class="active-content">
      <img v-if="activeTab === '厂区3D图'" :src="imgUrl" alt="" class="pic" />
      <div v-else class="pic-box">
        <img :src="imgUrl" alt="" class="pic-ny" />
        <div class="tool-box" @click="handleTool">
          <img src="@/assets/images/fullScreen.png" alt="" class="pic-dialog" />
          <img src="@/assets/images/enlarge.png" alt="" class="pic-enlarge" />
          <img src="@/assets/images/shrink.png" alt="" class="pic-shrink" />
        </div>
      </div>
    </div>
  </div>
  <Dialog
    :showDialog="showDialog"
    :imgUrl="imgUrl"
    @closeDialog="dialogVisible"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
// 引入时间组件
import DateTime from '@/components/DateTime.vue'
// 引入提示框
import { message } from 'ant-design-vue'
// 引入图片放大的弹窗
import Dialog from '@/components/Dialog/index.vue'
// 引入请求
import request from '@/api/smartEnery'
import { getLocationParams } from '@/utils/util'

export default defineComponent({
  name: 'PicModule',
  components: {
    DateTime,
    Dialog
  },
  setup () {
    const data = reactive({
      tabList: [
        {
          name: '厂区3D图',
          className: 'common-tab active-tab'
        },
        {
          name: '能源拓扑图',
          className: 'common-tab'
        }
      ], // tab的样式
      activeTab: '厂区3D图', // 当前活跃的tab
      scaleNumber: 1, // 能源拓扑图的放大缩小基数
      showDialog: false, // 当前的图片是否要放大
      imgUrl: '' // 当前图片的地址
    })

    onMounted(() => {
      setTimeout(() => {
        // 请求当前的图表
        init()
      }, 2000)
    })

    // 初始化图表
    const init = () => {
      const paramObj = getLocationParams()
      request
        .getStoreGetStoreDraw({
          storeId: paramObj.storeId,
          drawType: data.activeTab === '厂区3D图' ? 1 : 2
        })
        .then((res: any) => {
          const { success, model } = res
          if (success) {
            data.imgUrl = model
          }
        })
    }

    // tab切换
    const changeTab = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const value = target.innerText
      data.activeTab = value
      data.tabList.forEach((item) => {
        item.className = 'common-tab'
        if (item.name === value) {
          item.className = 'common-tab active-tab'
        }
      })
      init()
    }

    // 点击图表工具中的弹窗全屏、放大、缩小
    const handleTool = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const value = target.className
      const picDom: any = document.getElementsByClassName('pic-ny')[0]
      if (value === 'pic-dialog') {
        // 弹窗全屏
        dialogVisible(true)
      } else if (value === 'pic-enlarge') {
        // 放大
        data.scaleNumber += 0.2
        picDom.style.transform = `scale(${data.scaleNumber})`
      } else if (value === 'pic-shrink') {
        // 缩小
        data.scaleNumber -= 0.2
        if (data.scaleNumber > 0.2) {
          picDom.style.transform = `scale(${data.scaleNumber})`
        } else {
          message.error('不能缩小了！')
        }
      }
    }

    // 是否显示能源拓扑图的弹窗
    const dialogVisible = (val: boolean) => {
      data.showDialog = val
    }

    return {
      ...toRefs(data),
      changeTab,
      handleTool,
      dialogVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.pic-module {
  &__top {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    height: 121px;
  }
  .tab-box {
    display: flex;
    flex-wrap: nowrap;
    .common-tab {
      cursor: pointer;
      position: relative;
      width: 280px;
      height: 96px;
      text-align: center;
      font-size: 44px;
      font-weight: 600;
      color: #cbccce;
      line-height: 96px;
      &::after {
        content: "";
        position: absolute;
        right: -20px;
        width: 2px;
        height: 96px;
        background: linear-gradient(
          180deg,
          rgba(46, 139, 234, 0) 0%,
          #2e8bea 50%,
          rgba(46, 139, 234, 0) 100%
        );
      }
      &:last-of-type {
        left: 40px;
        &:after {
          background: none;
        }
      }
    }
    .active-tab {
      background: url("@/assets/images/tab_active_bg.png") no-repeat;
      background-size: 100% 100%;
      color: #fff;
    }
  }
  .active-content {
    .pic {
      object-fit: contain;
      width: 100%;
      height: 875px;
      margin: 105px 0 219px;
    }
    .pic-box {
      position: relative;
      overflow: hidden;
      .pic-ny {
        display: inline-block;
        width: 100%;
        height: 875px;
        margin: 105px 0 219px;
        transform: scale(1);
        object-fit: contain;
      }
      .tool-box {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        bottom: 44px;
        .pic-dialog,
        .pic-enlarge,
        .pic-shrink {
          cursor: pointer;
          display: inline-block;
          margin-bottom: 24px;
        }
      }
    }
  }
}
</style>
