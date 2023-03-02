<template>
  <div class="dialog-qy" v-if="dialogVisible">
    <div class="dialog-qy__top">
      <div class="title">能源拓扑图</div>
      <div class="close" @click="closeDialog"></div>
    </div>
    <img :src="picUrl" alt="" class="dialog-qy__pic" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'SmartDialog',
  props: {
    showDialog: {
      // 是否显示当前弹窗
      type: Boolean,
      default: false
    },
    imgUrl: {
      // 图片地址
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const data = reactive({
      dialogVisible: false, // 是否显示弹窗
      picUrl: '' // 图片地址
    })

    // 监听当前的弹窗是否显示
    watch(
      () => props.showDialog,
      (val: boolean) => {
        data.dialogVisible = val
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 监听当前的图片地址
    watch(
      () => props.imgUrl,
      (val: string) => {
        data.picUrl = val
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 关闭弹窗
    const closeDialog = () => {
      emit('closeDialog', false)
    }
    return {
      ...toRefs(data),
      closeDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-qy {
  width: calc(100% - 110px);
  height: calc(100% - 230px);
  z-index: 200;
  position: fixed;
  top: 162px;
  left: 55px;
  background: url("@/assets/images/dialog_bg.png") no-repeat;
  background-size: 100% 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &__top {
    position: relative;
    .title {
      padding: 35px 0 165px 64px;
      font-size: 44px;
      font-weight: 600;
      color: #ffffff;
      line-height: 62px;
    }
    .close {
      position: absolute;
      top: 40px;
      right: 44px;
      cursor: pointer;
      width: 48px;
      height: 48px;
      background: url("@/assets/images/close.png") no-repeat;
      background-size: 48px auto;
    }
  }
  &__pic {
    box-sizing: border-box;
    width: calc(100% - 183px);
    height: 100%;
    min-height: 500px;
    padding-left: 85px;
    margin-bottom: 186px;
    object-fit: contain;
  }
}
</style>
