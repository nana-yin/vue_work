<template>
  <div class="carbon-management">
    <div class="carbon-management__top">
      <div class="title">碳管理</div>
      <SelectQy selectType="碳管理" @changeSelect="changeSelect" />
    </div>
    <div class="carbon-management__info">
      <div class="single" v-for="(item, index) in infoList" :key="index">
        <div class="single-name">{{ item.name }}</div>
        <div class="single-value">
          <span class="value">{{ item.value }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
        <div class="single-trend">
          <div class="single-trend__month">
            <span
              :class="
                item.monthOnTrend > 0
                  ? 'up-pic'
                  : item.monthOnTrend < 0
                  ? 'down-pic'
                  : 'no-pic'
              "
              ><span class="text">环</span></span
            >
            <span
              :class="
                item.monthOnTrend > 0
                  ? 'up-color'
                  : item.monthOnTrend < 0
                  ? 'down-color'
                  : 'common-text'
              "
              >{{ item.monthOn }}%</span
            >
          </div>
          <div class="single-trend__year">
            <span
              :class="
                item.yearOnTrend > 0
                  ? 'up-pic'
                  : item.yearOnTrend < 0
                  ? 'down-pic'
                  : 'no-pic'
              "
              ><span class="text">同</span></span
            >
            <span
              :class="
                item.yearOnTrend > 0
                  ? 'up-color'
                  : item.yearOnTrend < 0
                  ? 'down-color'
                  : 'common-text'
              "
              >{{ item.yearOn }}%</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="carbon-title">排碳指标使用情况</div>
    <div class="progress-text">
      <div class="progress-text__left">
        已排{{ carbonIndex.count }}<span class="small-text"
          >/指标{{ carbonIndex.alreadyDischarged }}万吨</span
        >
      </div>
      <div class="progress-text__right">
        当前排碳 {{ carbonIndex.nowPercent }}%
      </div>
    </div>
    <a-progress
      :percent="parseFloat(carbonIndex.nowPercent)"
      :show-info="false"
      stroke-linecap="square"
      :strokeWidth="24"
      trailColor="rgba(233, 233, 233,0.15)"
      :stroke-color="{
        '0%': '#7AC1FF',
        '100%': '#5396FF',
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
// 引入下拉框组件
import SelectQy from '@/components/SelectQy/index.vue'
// 引入请求
import request from '@/api/smartEnery'
// 引入判断是否为空的函数
import { isEmpty, accuracyCalc } from '@/utils/util'

export default defineComponent({
  name: 'CarbonManagement',
  components: {
    SelectQy
  },
  props: {
    storeId: { // 拿到当前的storeId
      type: String,
      default: ''
    }
  },
  setup (props) {
    const data = reactive({
      infoList: [
        {
          name: '碳排放量',
          value: '-',
          unit: '吨',
          monthOn: '-',
          monthOnTrend: 0,
          yearOn: '-',
          yearOnTrend: 0
        },
        {
          name: '碳减排量',
          value: '-',
          unit: '吨',
          monthOn: '-',
          monthOnTrend: 0,
          yearOn: '-',
          yearOnTrend: 0
        }
      ], // 基础信息列表
      carbonIndex: {
        count: '-',
        alreadyDischarged: '-',
        nowPercent: '-'
      }, // 排碳指标使用数据
      qyStoreId: '' // 企业的storeId
    })

    // onMounted(() => {
    //   setTimeout(() => {
    //     init()
    //   }, 2000)
    // })

    // 数据初始化
    const init = (value = 'm') => {
      // 碳排放量数据查询
      request
        .getCarbonEmissionManage({
          storeId: data.qyStoreId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const {
              carbonTotal,
              emissionRate,
              monthOnMonth,
              nowCarbon,
              target,
              yearOnYear
            } = res.model
            data.infoList[0].value = !isEmpty(carbonTotal)
              ? Math.abs(parseFloat(carbonTotal)) >= 10000
                ? accuracyCalc(carbonTotal, 0.0001, 2)
                : parseFloat(carbonTotal).toFixed(2)
              : '-'
            data.infoList[0].unit = !isEmpty(carbonTotal)
              ? Math.abs(parseFloat(carbonTotal)) >= 10000
                ? '万吨'
                : '吨'
              : '吨'
            data.infoList[0].monthOn =
              monthOnMonth !== '-' ? parseFloat(monthOnMonth).toFixed(1) : '-'
            data.infoList[0].monthOnTrend =
              monthOnMonth !== '-'
                ? parseFloat(monthOnMonth) > 0
                  ? 1
                  : -1
                : 0
            data.infoList[0].yearOn =
              yearOnYear !== '-' ? parseFloat(yearOnYear).toFixed(1) : '-'
            data.infoList[0].yearOnTrend =
              yearOnYear !== '-' ? (parseFloat(yearOnYear) > 0 ? 1 : -1) : 0

            const now = !isEmpty(nowCarbon)
              ? Math.abs(parseFloat(nowCarbon)) >= 10000
                ? accuracyCalc(nowCarbon, 0.0001, 1)
                : parseFloat(nowCarbon).toFixed(1)
              : '-'
            const nowUnit = !isEmpty(nowCarbon)
              ? Math.abs(parseFloat(nowCarbon)) >= 10000
                ? '万吨'
                : '吨'
              : '吨'
            data.carbonIndex.count = now + nowUnit
            data.carbonIndex.alreadyDischarged = !isEmpty(target)
              ? parseFloat(target).toFixed(1)
              : '-'
            data.carbonIndex.nowPercent = !isEmpty(emissionRate)
              ? parseFloat(emissionRate).toFixed(1)
              : '-'
          }
        })
      // 碳减排量数据查询
      request
        .getCarbonReductionManage({
          storeId: data.qyStoreId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const { carbonTotal, monthOnMonth, yearOnYear } = res.model
            data.infoList[1].value = !isEmpty(carbonTotal)
              ? Math.abs(parseFloat(carbonTotal)) >= 10000
                ? accuracyCalc(carbonTotal, 0.0001, 2)
                : parseFloat(carbonTotal).toFixed(2)
              : '-'
            data.infoList[1].unit = !isEmpty(carbonTotal)
              ? Math.abs(parseFloat(carbonTotal)) >= 10000
                ? '万吨'
                : '吨'
              : '吨'

            data.infoList[1].monthOn =
              monthOnMonth !== '-' ? parseFloat(monthOnMonth).toFixed(1) : '-'
            data.infoList[1].monthOnTrend =
              monthOnMonth !== '-'
                ? parseFloat(monthOnMonth) > 0
                  ? 1
                  : -1
                : 0
            data.infoList[1].yearOn =
              yearOnYear !== '-' ? parseFloat(yearOnYear).toFixed(1) : '-'
            data.infoList[1].yearOnTrend =
              yearOnYear !== '-' ? (parseFloat(yearOnYear) > 0 ? 1 : -1) : 0
          }
        })
    }

    // 监听下拉框数据的选择
    const changeSelect = (type: { type: string; value: string }) => {
      init(type.value)
    }

    // 监听当前的storeId
    watch(
      () => props.storeId,
      (val: string) => {
        if (val) {
          data.qyStoreId = val
          init()
        }
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      ...toRefs(data),
      changeSelect
    }
  }
})
</script>

<style lang="scss" scoped>
.carbon-management {
  padding: 24px 40px 88px;
  overflow-y: auto;
  background: url("@/assets/images/tgl_bg.png") no-repeat;
  background-size: 100% 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    width: 100%;
    height: 91px;
    background: url(@/assets/images/title_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .title {
    font-size: 44px;
    font-weight: 600;
    color: #fff;
    line-height: 62px;
  }
  &__info {
    padding: 68px 0 88px 24px;
    display: flex;
    .single {
      &:first-of-type {
        position: relative;
        margin-right: 68px;
        &::after {
          content: "";
          position: absolute;
          right: -68px;
          top: 2px;
          width: 2px;
          height: 132px;
          background: rgba(238, 238, 238, 0.25);
        }
      }
      &:last-of-type {
        margin-left: 64px;
      }
      &-name {
        height: 28px;
        margin-bottom: 26px;
        font-size: 28px;
        color: #fff;
        line-height: 28px;
      }
      &-value {
        margin-bottom: 16px;
        .value,
        .unit {
          height: 40px;
          font-size: 40px;
          font-weight: 600;
          color: #3196fa;
          line-height: 40px;
        }
        .unit {
          font-size: 28px;
        }
      }
      &-trend {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        .up-pic,
        .down-pic {
          display: inline-block;
          width: 54px;
          height: 24px;
          margin-right: 4px;
        }
        &__year {
          .up-pic {
            background: url("@/assets/images/green_up.png") no-repeat;
          }
          .down-pic {
            background: url("@/assets/images/green_down.png") no-repeat;
          }
        }
        &__month {
          margin-right: 19px;
          .up-pic {
            background: url("@/assets/images/red_up.png") no-repeat;
          }
          .down-pic {
            background: url("@/assets/images/red_down.png") no-repeat;
          }
        }
        .no-pic {
          display: inline-block;
          width: 54px;
          margin-right: 4px;
        }
        .text {
          display: inline-block;
          height: 22px;
          margin-left: 4px;
          font-size: 22px;
          color: #ffffff;
          line-height: 22px;
        }
        .up-color,
        .down-color,
        .common-text {
          display: inline-block;
          height: 24px;
          font-size: 24px;
          line-height: 24px;
        }
        .up-color {
          color: #ef4864;
        }
        .down-color {
          color: #00e790;
        }
        .common-text {
          color: #fff;
        }
      }
    }
  }
  .carbon-title {
    height: 32px;
    margin-bottom: 28px;
    font-size: 32px;
    font-weight: 500;
    color: #ffffff;
    line-height: 32px;
  }
  .progress-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
    &__left {
      height: 32px;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
      line-height: 32px;
    }
    .small-text {
      font-size: 24px;
    }
    &__right {
      height: 24px;
      font-size: 24px;
      color: #cccccc;
      line-height: 24px;
    }
  }
}
</style>
