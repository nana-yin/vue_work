<template>
  <div class="select-qy">
    <a-select
      ref="select"
      v-model:value="valueInit"
      :style="`width:${selectType === '设备能效统计' ? '191px' : '136px'}`"
      :options="selectType === '设备能效统计' ? optionsType : optionsDate"
      @change="handleChange"
    >
      <template #suffixIcon><CaretDownOutlined /></template>
    </a-select>
  </div>
</template>

<script lang="ts">
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { defineComponent, reactive, toRefs, watch } from 'vue'
export default defineComponent({
  name: 'SelectQy',
  components: {
    CaretDownOutlined
  },
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
      valueInit: 'm' // 下拉框默认值
    })

    // 监听类型
    watch(
      () => props.selectType,
      (val: string) => {
        data.valueInit = val === '设备能效统计' ? '机电设备' : 'm'
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 切换类型
    const handleChange = (value: string) => {
      emit('changeSelect', {
        type: props.selectType,
        value
      })
    }

    return {
      ...toRefs(data),
      handleChange
    }
  }
})
</script>

<style lang="scss">
.select-qy {
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    box-sizing: border-box;
    height: 56px;
    padding: 8px 19px 8px 20px;
    background: rgba(49, 150, 250, 0.1);
    border-radius: 8px;
    border: 2px solid #3196fa;
  }
  .ant-select-single:not(.ant-select-customize-input)
    .ant-select-selector
    .ant-select-selection-search-input {
    height: 56px;
  }
  .ant-select {
    font-size: 28px;
    font-weight: 600;
    line-height: 56px;
    color: #3295fa;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item,
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 32px;
  }
  .ant-select-arrow {
    right: 19px;
    font-size: 22px;
    color: #3196fa;
  }
}
.ant-select-item {
  height: 56px !important;
  padding-left: 20px !important;
  font-size: 28px !important;
  line-height: 42px !important;
  color: #3295fa;
}
</style>
