<template>
  <div class="select-qy">
    <div class="select-btn" @click="selectDropVisible">
      <div class="text">{{valueInit}}</div>
      <div class="triangle"></div>
    </div>
    <div class="select-dropDown" v-show="dropIsVisible">
      <div v-for="(item,index) in (selectType === '设备能效统计' ? optionsType : optionsDate)" :key="index">
        <div @click="() => handleChange(item.value)" :class="item.value == valueParam ? 'choose-text' : 'common-text'">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'SelectQy',
  props: {
    selectType: {
      // 当前的下拉框的类型
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const data = reactive({
      optionsDate: [
        {
          value: 'd',
          label: '本日'
        },
        {
          value: 'm',
          label: '本月'
        },
        {
          value: 'y',
          label: '本年'
        }
      ], // 年月日的下拉框
      optionsType: [
        {
          value: '1',
          label: '机电设备'
        },
        {
          value: '2',
          label: '其他用能设备'
        }
      ], // 年月日的下拉框
      valueMap: {
        d: '本日',
        m: '本月',
        y: '本年',
        1: '机电设备',
        2: '其他用能设备'
      } as {
        [propName: string]: string;
      }, // 下拉框的映射
      valueParam: 'm', // 下拉框默认值传给后端的参数
      valueInit: '本月', // 下拉框默认值
      dropIsVisible: false // 下拉框显隐
    })
    // 监听类型
    watch(
      () => props.selectType,
      (val: string) => {
        data.valueParam = val === '设备能效统计' ? '1' : 'm'
        data.valueInit = val === '设备能效统计' ? '机电设备' : '本月'
      },
      {
        immediate: true,
        deep: true
      }
    )
    onMounted(() => {
      let preIndex: any
      // 点击之后只允许显示一个下拉框
      window.addEventListener('click', (event: Event) => {
        let currentIndex = null
        const allSelectDom = document.getElementsByClassName('select-qy')
        const dropDownDom = document.getElementsByClassName('select-dropDown')
        let targetLastDom = event.target as HTMLElement
        if ((targetLastDom.className === 'triangle') || ((targetLastDom.className === 'text'))) {
          targetLastDom = targetLastDom.parentNode as HTMLElement
        }
        for (let i = 0; i < allSelectDom.length; i++) {
          (dropDownDom[i] as HTMLElement).style.display = 'none'
          if (allSelectDom[i] == targetLastDom.parentNode) {
            (dropDownDom[i] as HTMLElement).style.display = 'block'
            currentIndex = i
          }
        }
        // 点击的是同一个，则判断当前的下拉框的状态
        // 点击的不是同一个，或者是第一次点击,则不用处理
        if (currentIndex && (preIndex === currentIndex)) {
          (dropDownDom[preIndex] as HTMLElement).style.display = 'none'
        }
        preIndex = currentIndex
      })
    })

    // 显示下拉框
    const selectDropVisible = () => {
      data.dropIsVisible = !data.dropIsVisible
    }

    // 切换类型
    const handleChange = (value: string) => {
      data.dropIsVisible = false
      data.valueParam = value
      data.valueInit = data.valueMap[value] as string
      emit('changeSelect', {
        type: props.selectType,
        value
      })
    }

    return {
      ...toRefs(data),
      handleChange,
      selectDropVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.select-qy {
  position: relative;
  .select-btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 8px 19px 8px 17px;
    background: rgba(49,150,250,0.1);
    border-radius: 8px;
    border: 2px solid #3196FA;
  }
  .text {
    margin-right: 19px;
    font-size: 28px;
    font-weight: 600;
    color: #3295FA;
  }
  .triangle {
    width: 22px;
    height: 13px;
    border-top: 13px solid #3196fa;
    border-bottom: 0 solid transparent;
    border-right: 13px solid transparent;
    border-left: 13px solid transparent;
    border-radius: 13px;
  }
  .select-dropDown {
    display: block;
    z-index: 20;
    position: absolute;
    top: 70px;
    left: 0;
    background: #134B7D;
    border-radius: 8px;
    border: 2px solid #3196FA;
  }
  .choose-text,.common-text {
    cursor: pointer;
    white-space: nowrap;
    min-width: 136px;
    padding: 8px 20px;
    font-size: 28px;
    font-weight: 600;
    color: #3295FA;
  }
  .choose-text {
    background: #3295FA;
    color: #FFFFFF;
  }
}
</style>
