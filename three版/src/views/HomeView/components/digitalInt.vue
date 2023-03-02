<template>
  <div class="digital-int">
    <div class="digital-int__top">
      <div class="title">数智配电</div>
      <SelectQy selectType="数智配电" @changeSelect="changeSelect" />
    </div>
    <div class="digital-int__content">
      <div class="left">
        <div class="left-single" v-for="(item, index) in infoList" :key="index">
          <img :src="item.iconUrl" alt="" class="left-single__icon" />
          <div class="left-single__right">
            <div class="title">{{ item.name }}</div>
            <div class="value-box">
              <span class="value">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
        <div id="electricityConsumption"></div>
      </div>
      <div class="right">
        <div id="energyConsumption"></div>
        <div class="right-info">
          <div v-for="(item, index) in nyInfo" :key="index" class="box">
            <span class="right-info__value"
              >{{ item.value }}<span class="right-info__unit">kWh</span></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
// 引入下拉框组件
import SelectQy from '@/components/SelectQy/index.vue'
// 引入配电房数量的icon
import siteIcon from '@/assets/images/szpd_site.png'
// 引入变压器数量的icon
import byqIcon from '@/assets/images/szpd_byq.png'
// 引入运行容量的icon
import capacityIcon from '@/assets/images/szpd_capacity.png'
// 引用用电情况、能源消耗情况 图表
import chartObj from './chart.config'
// 引入绘图的echarts
import * as echarts from 'echarts'
// 引入请求
import request from '@/api/smartEnery'
import { getLocationParams, isEmpty } from '@/utils/util'

export default defineComponent({
  name: 'DigitalInt',
  components: {
    SelectQy
  },
  setup () {
    interface listType {
      name: string;
      value: number | string;
      unit?: string;
      iconUrl?: string;
    }

    interface yType {
      name: string;
      type?: string;
      symbol?: string;
      stack?: string;
      barGap?: number;
      [propName: string]: any;
    }
    const paramObj = getLocationParams()
    const data = reactive({
      infoList: [] as listType[], // 数智配电的详情数据
      nyInfo: [] as listType[] // 能源的数据
    })

    onMounted(() => {
      setTimeout(() => {
        init()
      }, 2000)
    })

    // 初始化数据
    const init = (value = 'm') => {
      // 请求详情数据
      getDetail(paramObj.storeId)
      // 请求用电情况
      request
        .getDigitalElectricChart({
          storeId: paramObj.storeId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const { byqChart, highChart, lowChart, xChart } = res.model
            electricityConsumptionChart(
              byqChart,
              highChart,
              lowChart,
              xChart,
              value
            )
          }
        })
      // 能源的数据
      energyConsumptionChart(value)
    }

    // 请求详情数据
    const getDetail = (storeId: string) => {
      data.infoList = [
        {
          iconUrl: siteIcon,
          name: '配电房数量',
          value: '-',
          unit: '个'
        },
        {
          iconUrl: byqIcon,
          name: '变压器数量',
          value: '-',
          unit: '个'
        },
        {
          iconUrl: capacityIcon,
          name: '运行容量',
          value: '-',
          unit: 'kVA'
        }
      ]

      request
        .getDigitalGetStoreInfo({
          storeId
        })
        .then((res: any) => {
          if (res.success) {
            const { byqCount, capacity, siteCount } = res.model
            data.infoList[0].value = siteCount
            data.infoList[1].value = byqCount
            data.infoList[2].value = parseFloat(capacity).toFixed(2)
          }
        })
    }

    /**
     * 用电情况绘图
     * @param byqChart 变压器损耗
     * @param highChart 高压侧计量
     * @param lowChart 低压侧计量
     * @param xChart x轴的数据
     * @param xUnit  x轴数据单位
     * */
    const electricityConsumptionChart = (
      byqChart: Array<string | number>,
      highChart: Array<string | number>,
      lowChart: Array<string | number>,
      xChart: Array<string | number>,
      xUnit = 'm'
    ) => {
      const chartDom = document.getElementById(
        'electricityConsumption'
      ) as HTMLElement
      if (chartDom) {
        const myChart = echarts.init(chartDom)
        const legendData = ['高压侧计量', '低压侧计量', '变压器损耗']
        const xData: Array<string> = []
        if (xChart && xChart.length) {
          xChart.forEach((item) => {
            const val =
              xUnit === 'd'
                ? item + '时'
                : xUnit === 'm'
                  ? item + '日'
                  : item + '月'
            xData.push(val)
          })
        }
        const color = ['#3196FA', '#2FC25B', '#FACC14']
        const colorLinear = ['rgba(49, 150, 250,0)', 'rgba(47,194,91,0.3)']
        const seriesData = []
        const valueData = [
          {
            name: '高压侧计量',
            data: highChart
          },
          {
            name: '低压侧计量',
            data: lowChart
          },
          {
            name: '变压器损耗',
            data: byqChart
          }
        ]

        for (let i = 0; i < valueData.length; i++) {
          const item = valueData[i]
          const obj: yType = {
            name: item.name,
            type: item.name === '高压侧计量' ? 'line' : 'bar',
            tooltip: {
              valueFormatter: function (value: number | string) {
                return value
              }
            },
            data: item.data || []
          }

          if (item.name === '高压侧计量') {
            obj.symbol = 'none'
            obj.itemStyle = {
              color: color[i]
            }
            obj.areaStyle = {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: color[i] },
                { offset: 1, color: colorLinear[i] }
              ])
            }
            obj.lineStyle = {
              width: 4
            }
          } else {
            obj.stack = 'one'
            obj.barGap = 0
            obj.itemStyle = {
              color:
                item.name === '变压器损耗'
                  ? color[i]
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: color[i] },
                    { offset: 1, color: colorLinear[i] }
                  ]),
              borderRadius: item.name === '变压器损耗' ? [4, 4, 0, 0] : 0
            }
          }
          seriesData.push(obj)
        }
        myChart.setOption(
          chartObj.getElectricityConsumptionChart(legendData, xData, seriesData)
        )
      }
    }

    // 能源消耗情况绘图
    const energyConsumptionChart = (value: string) => {
      request
        .getDigitalGetEnergyConsumptionInfo({
          storeId: paramObj.storeId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const {
              energyStoragePowerTotal,
              photovoltaicPowerTotal,
              powerGridPowerTotal
            } = res.model
            const total =
              parseFloat(energyStoragePowerTotal) +
              parseFloat(photovoltaicPowerTotal) +
              parseFloat(powerGridPowerTotal)
            const chartDom = document.getElementById('energyConsumption')
            if (chartDom) {
              const myChart = echarts.init(chartDom)
              const legendData = ['电网', '光伏', '储能']
              const centerLabel = {
                name: '总消耗',
                value: !isEmpty(total + '')
                  ? parseFloat(total + '').toFixed(2)
                  : '-',
                unit: 'kWh'
              }
              const color = ['#3196FA', '#2FC25B', '#B620E0']
              const colorLinear = [
                'rgba(49, 150, 250,0.5)',
                'rgba(47, 194, 91,0.5)',
                'rgba(182, 32, 224,0.5)'
              ]
              const seriesData = []
              data.nyInfo = [
                {
                  name: '电网',
                  value: !isEmpty(powerGridPowerTotal)
                    ? parseFloat(powerGridPowerTotal).toFixed(2)
                    : '-'
                },
                {
                  name: '光伏',
                  value: !isEmpty(photovoltaicPowerTotal)
                    ? parseFloat(photovoltaicPowerTotal).toFixed(2)
                    : '-'
                },
                {
                  name: '储能',
                  value: !isEmpty(energyStoragePowerTotal)
                    ? parseFloat(energyStoragePowerTotal).toFixed(2)
                    : '-'
                }
              ]
              const valueData = [
                {
                  name: '电网',
                  data: !isEmpty(powerGridPowerTotal)
                    ? parseFloat(powerGridPowerTotal).toFixed(2)
                    : '-'
                },
                {
                  name: '光伏',
                  data: !isEmpty(photovoltaicPowerTotal)
                    ? parseFloat(photovoltaicPowerTotal).toFixed(2)
                    : '-'
                },
                {
                  name: '储能',
                  data: !isEmpty(energyStoragePowerTotal)
                    ? parseFloat(energyStoragePowerTotal).toFixed(2)
                    : '-'
                }
              ]

              for (let i = 0; i < valueData.length; i++) {
                const item = valueData[i]
                const obj: yType = {
                  value: item.data,
                  name: item.name,
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: color[i] },
                      { offset: 1, color: colorLinear[i] }
                    ])
                  }
                }
                seriesData.push(obj)
              }
              myChart.setOption(
                chartObj.getEnergyConsumptionChart(
                  legendData,
                  centerLabel,
                  seriesData
                )
              )
            }
          }
        })
    }

    // 监听下拉框数据的选择
    const changeSelect = (type: { type: string; value: string }) => {
      init(type.value)
    }

    return {
      ...toRefs(data),
      changeSelect
    }
  }
})
</script>

<style lang="scss" scoped>
.digital-int {
  // padding: 24px 40px 48px;
  padding: 24px 40px 61px;
  overflow-y: auto;
  background: url("@/assets/images/szpd_bg.png") no-repeat;
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
    background: url(@/assets/images/long_title_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .title {
    font-size: 44px;
    font-weight: 600;
    color: #fff;
    line-height: 62px;
  }
  &__content {
    display: flex;
    flex-wrap: nowrap;
    padding-top: 43px;
  }
  .left {
    position: relative;
    padding: 0 124px 0 28px;
    &-single {
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin-bottom: 48px;
      &:last-of-type {
        margin-bottom: 0;
      }
      &__icon {
        display: inline-block;
        margin-right: 44px;
      }
      &__right {
        .title {
          height: 28px;
          margin-bottom: 23px;
          font-size: 28px;
          color: #fff;
          line-height: 28px;
        }
      }
      .value-box {
        .value,
        .unit {
          height: 40px;
          font-size: 40px;
          font-weight: 600;
          color: #3196fa;
          line-height: 40px;
        }
        .unit {
          font-size: 24px;
        }
      }
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: 2px;
      height: 380px;
      border-radius: 2px;
      background: rgba(238, 238, 238, 0.25);
    }
  }
  .middle {
    #electricityConsumption {
      width: 860px;
      height: 380px;
      border-right: 2px solid rgba(238, 238, 238, 0.25);
    }
  }
  .right {
    position: relative;
    #energyConsumption {
      width: 669px;
      height: 380px;
    }
    &-info {
      position: absolute;
      left: 473px;
      top: 96px;
      .box {
        margin-bottom: 65px;
        &:last-of-type {
          margin: 0;
        }
      }
      &__value,
      &__unit {
        height: 32px;
        font-size: 32px;
        font-weight: 600;
        color: #cccccc;
        line-height: 32px;
      }
      &__unit {
        font-size: 24px;
      }
    }
  }
}
</style>
