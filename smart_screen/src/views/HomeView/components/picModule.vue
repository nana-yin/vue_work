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
    <a-spin tip="Loading..." :spinning="spinning">
      <div class="active-content">
          <div v-if="activeTab === '厂区3D图'" class="pic" ref="threePic"></div>
          <!-- <img v-if="activeTab === '厂区3D图'" :src="imgUrl" alt="" class="pic" /> -->
          <div v-else class="pic-box">
            <img :src="imgUrl" alt="" class="pic-ny" />
            <div class="tool-box" @click="handleTool">
              <img src="@/assets/images/fullScreen.png" alt="" class="pic-dialog" />
              <img src="@/assets/images/enlarge.png" alt="" class="pic-enlarge" />
              <img src="@/assets/images/shrink.png" alt="" class="pic-shrink" />
            </div>
          </div>
      </div>
    </a-spin>
  </div>
  <Dialog
    :showDialog="showDialog"
    :imgUrl="imgUrl"
    @closeDialog="dialogVisible"
  />
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted,ref } from 'vue'
// 引入时间组件
import DateTime from '@/components/DateTime.vue'
// 引入提示框
import { message } from 'ant-design-vue'
// 引入图片放大的弹窗
import Dialog from '@/components/Dialog/index.vue'
// 引入请求
import request from '@/api/smartEnery'
import { getLocationParams } from '@/utils/util'
// 引入Three
import * as THREE from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"

export default defineComponent({
  name: 'PicModule',
  components: {
    DateTime,
    Dialog
  },
  setup () {
    const data = reactive({
      spinning: true, // 是否处于加载中
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

    // 3D模型
    const threePic = ref(null);
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
            if (data.activeTab === '厂区3D图') {
              let url = './model.obj'
              // 创建场景
              let scene = new THREE.Scene();
              // 加载loader
              let loader = new OBJLoader()
              loader.load(url, function (obj:any) {
                obj.scale.set(2,2,2);
                obj.translateX(5);
                obj.translateY(8);
                obj.translateZ(3);
                scene.add(obj);
                // 将图片放在画面
                let renderer = new THREE.WebGLRenderer({ antialias: true })
                let dom = threePic.value as unknown as HTMLElement
                if (dom) {
                  renderer.setSize(
                    dom.offsetWidth,
                    dom.offsetHeight
                  );
                  dom.appendChild(renderer.domElement);

                  // 创建相机
                  let k : number = dom.offsetWidth / dom.offsetHeight; // 窗口宽高比
                  let camera = new THREE.PerspectiveCamera(50, k , 0.1, 1000);
                  camera.position.set(8, 12, 44); // 设置相机位置
                  camera.lookAt(new THREE.Vector3(0, 0, 0)); // 设置相机方向
                  scene.add(camera);

                  // 创建聚光灯
                  let spotLight = new THREE.SpotLight(0xffffff,2) 
                  spotLight.position.set(0.1, 100, 0.1)
                  spotLight.angle = Math.PI/8
                  spotLight.castShadow = true
                  scene.add(spotLight)

                  renderer.setClearColor(0x071f36, 1); //设置背景颜色

                  renderer.render(scene, camera);
                }
              })
            } else {
              data.imgUrl = model
            }
          }
        }).finally(() => {
          data.spinning = false
        })
    }

    // tab切换
    const changeTab = (event: MouseEvent) => {
      data.spinning = true
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
      threePic,
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
      height: 1199px;
      // height: 875px;
      // margin: 105px 0 219px;
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
