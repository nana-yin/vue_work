<template>
  <div class="info-module">
    <div class="info-module__top">
      <div class="title">{{ title }}</div>
      <SelectQy :selectType="title" @changeSelect="changeSelect" />
    </div>
    <div class="info-module__info" v-if="infoList.length">
      <div class="single" v-for="(item, index) in infoList" :key="index">
        <div class="single-title">{{ item["name"] || "-" }}</div>
        <div class="single-data">
          <span class="data">{{ item["data"] }}</span>
          <span class="unit">{{ item["unit"] }}</span>
        </div>
      </div>
      <div class="purchase" v-if="title === '电网侧'">
        <div class="purchase-title">购电服务</div>
        <img
          src="@/assets/images/purchase_icon.png"
          alt=""
          class="purchase-img"
        />
      </div>
    </div>
    <slot name="photovoltaic-chart"></slot>
    <slot name="energyStorage-chart"></slot>
    <slot name="statistics-chart"></slot>
    <slot name="ranking-chart"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, inject } from 'vue'
// 引入下拉框组件
import SelectQy from '@/components/SelectQy/index.vue'
export default defineComponent({
  name: 'InfoModule',
  props: {
    infoData: { // 拿到的详情数据
      type: Array,
      default: () => {
        return []
      }
    },
    title: { // 拿到的标题
      type: String,
      default: ''
    }
  },
  components: {
    SelectQy
  },
  setup (props) {
    interface Info {
      name?: string;
      data?: string | number;
      unit?: string;
    }
    const data = reactive({
      infoList: [] as Info[] // 列表的数据
    })

    // 监听拿到的详情数据
    watch(
      () => props.infoData as Info[],
      (newValue) => {
        data.infoList = newValue
      },
      {
        immediate: true,
        deep: true
      }
    )

    // 监听下拉框数据的选择，将其传给父组件
    const selectData = inject('dropSelect', Function, true)
    const changeSelect = (type: { type: string; value: string }) => {
      selectData(type)
    }

    return {
      ...toRefs(data),
      changeSelect
    }
  }
})
</script>
<style lang="scss" scoped>
.info-module {
  border-bottom: 2px solid rgba(238, 238, 238, 0.25);
  &__top {
    margin: 48px 0 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    .title {
      font-size: 36px;
      font-weight: 600;
      color: #fff;
      line-height: 50px;
    }
  }
  &__info {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 44px;
  }
  .single {
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    &-title {
      width: 120px;
      height: 24px;
      margin-bottom: 21px;
      font-size: 28px;
      font-weight: 400;
      color: #fff;
      line-height: 24px;
    }
    &-data {
      .data,
      .unit {
        height: 32px;
        font-size: 32px;
        font-weight: 600;
        color: #3196fa;
        line-height: 32px;
      }
      .unit {
        font-size: 24px;
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 2px;
      right: -24px;
      width: 2px;
      height: 76px;
      background: rgba(238, 238, 238, 0.25);
    }
    &:last-of-type::after {
      background: rgba(238, 238, 238, 0);
    }
  }
  .purchase {
    text-align: center;
    &-title {
      width: 120px;
      height: 24px;
      font-size: 28px;
      font-weight: 400;
      color: #fff;
      line-height: 24px;
    }
    &-img {
      margin-top: 19px;
    }
  }
  &:last-of-type {
    border-bottom: none;
  }
}
</style>
