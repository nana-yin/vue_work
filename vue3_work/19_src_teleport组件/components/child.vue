<template>
  <div class="childBg">
    <div>我是孙组件，汽车的信息：{{car.name}}----{{car.price}}W</div>
    <button @click="handleShow">点击我展示弹窗</button>
    <!-- teleport表示将组件的html结构移动到指定位置，to可以写选择器或者标签属性 -->
    <teleport to='body' >
      <div class="mask" v-if="showModle">
        <div class="modle">
          <h4>内容</h4>
          <h4>内容</h4>
          <h4>内容</h4>
          <h4>内容</h4>
          <button @click="handleShow">点击我关闭弹窗</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import {inject, reactive,toRefs} from 'vue'
export default {
  name: 'Child',
  setup() {
    // 接收祖组件传递的数据
    let car = inject('car')

    // 展示弹窗
    let modle = reactive({
      showModle: false
    })

    function handleShow() {
      modle.showModle = !modle.showModle
    }
    return {
      car,
      ...toRefs(modle),
      handleShow
    }
  }
}
</script>

<style scoped>
.childBg {
  padding: 10px 20px;
  background: lightblue;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.4);
}
.modle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: lightseagreen;
  color: #fff;
  text-align: center;
}
</style>