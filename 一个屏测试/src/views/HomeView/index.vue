<template>
  <div class="box">
      <div class="boxChild one">
        <video class="videoStyle" src="@/views/video/4.mp4" autoplay muted loop></video>
      </div>
      <div class="boxChild two">
        <video class="videoStyle" src="@/views/video/3.mp4" autoplay muted loop></video>
      </div>
      <div class="boxChild three">
        <video class="videoStyle" src="@/views/video/2.mp4" autoplay muted loop></video>
      </div>
      <div class="boxChild four">
        <video class="videoStyle" src="@/views/video/1.mp4" autoplay muted loop></video>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getLocationParams } from '@/utils/util'
import pic1 from "../video/pic1.png"
import pic2 from "../video/pic2.png"
import pic3 from "../video/pic3.png"
import pic4 from "../video/pic4.png"
export default defineComponent({
  name: 'HomeViewIndex',
  components: {
  },
  setup () {
    onMounted(() => {
      const paramObj = getLocationParams()
      let index =  parseInt(paramObj.index)
      let picMap = {
        0: pic1,
        1: pic2,
        2: pic3,
        3: pic4
      } as any
      // 修复切换背景图时出现的“白色闪屏”现象
      let img = new Image();
      img.src = picMap[index]
      // 确定图片加载完成后再进行背景图片切换
      img.onload = function () {
        document.body.style.backgroundImage = "url(" + img.src + ")";
      }
      let childDom = document.getElementsByClassName("boxChild")
      if (paramObj.index) { // 有需要缩放的页面
        let echoDom = childDom[index] as HTMLElement
        echoDom.style.zIndex = '10';
        echoDom.style.width = '100%';
        echoDom.style.height = '100%';
        echoDom.style.transition = 'all 3s';
        setTimeout(() => {
          echoDom.style.zIndex = '1';
          echoDom.style.width = '50%';
          echoDom.style.height = '50%';
          echoDom.style.transition = 'all 3s';
        },0)
      }
      for (let i = 0; i < childDom.length; i++) {
          let item = childDom[i] as HTMLElement
          item.onclick = function() {
              item.style.zIndex = '10';
              item.style.width = '100%';
              item.style.height = '100%';
              item.style.transition = 'all 3s';
              // if (
              //     process.env.VUE_APP_BASE_API == '/api' ||
              //     process.env.VUE_APP_BASE_API == 'http://10.0.103.112:80' ||
              //     process.env.VUE_APP_BASE_API == 'http://115.236.62.114:65080'
              //   ) {
              //     // 本地或者测试服
              //     // url = 'http://10.0.103.112'
              //     url = 'http://192.168.191.63:9090'
              //   } else {
              //     // 生产服
              //     url = 'https://ele.qre.com.cn'
              //   }
              if (item.className.includes('one')) { // 变压器大屏
                window.location.href="http://192.168.191.63:8081/visualRebuilt/?isVideo=true&index="+i+"#/" 
              }
              if (item.className.includes('two')) { // 企业大屏
                window.location.href="http://192.168.191.63:8090/?isVideo=true&index="+i+"#/" 
              }
              if (item.className.includes('three')) { // 能源大屏
                window.location.href="http://192.168.191.63:8800/?sessionId=1234&loginId=9171514439186018&isVideo=true&index="+i+"#/"      
              }
              if (item.className.includes('four')) { // 工业云
                let url = 'http://192.168.191.63:9090' + `/login.html#/user/login?code=1234&loginId=9171514439186018&indexPage=1234&isVideo=true&index=${i}`
                window.location.href= url
              }
          }
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.box {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: #f3f3f3;
}
.boxChild {
  cursor: pointer;
  width: 50%;
  height: 50%;
  text-align: center;
  font-size: 36px;
}
.one {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0;
}
.two {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 0;
}
.three {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
}
.four {
    z-index: 1;
    position: absolute;
    right: 0;
    bottom: 0;
}
.videoStyle {
  width: 100%;
  height: 100%;
  object-fit:cover;
}
</style>
