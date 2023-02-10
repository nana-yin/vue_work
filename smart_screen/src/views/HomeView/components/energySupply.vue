<template>
  <div class="gnc">
    <div class="gnc-top">
      <div class="gnc-top__title">供能侧</div>
    </div>
    <InfoModule title="电网侧" :infoData="gridSideList" />

    <InfoModule title="光伏" :infoData="photovoltaicList">
      <template #photovoltaic-chart>
        <div id="photovoltaic"></div>
      </template>
    </InfoModule>
    <InfoModule title="储能" :infoData="energyStorageList">
      <template #energyStorage-chart>
        <div id="energyStorage"></div>
      </template>
    </InfoModule>
    <InfoModule title="其他能源" :infoData="otherList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, provide } from 'vue'
// 引入详情信息的组件
import InfoModule from '@/components/InfoModule/index.vue'
// 引入绘图的echarts
import * as echarts from 'echarts'
// 引入光伏和储能的图表绘制
import chartObj from './chart.config'
// 引入请求
import request from '@/api/smartEnery'
// 引入换算单位的函数
import { isEmpty, accuracyCalc, getLocationParams } from '@/utils/util'

export default defineComponent({
  name: 'EnergySupply',
  components: {
    InfoModule
  },
  setup () {
    interface listType {
      name: string;
      data: number | string;
      unit: string;
    }
    const data = reactive({
      gridSideList: [] as listType[], // 电网侧列表的数据
      photovoltaicList: [] as listType[], // 光伏列表的数据
      energyStorageList: [] as listType[], // 储能列表的数据
      otherList: [] as listType[] // 其他能源列表的数据
    })

    const paramObj = getLocationParams()
    // 下拉框的数据的改变
    const selectData = (val: { type: string; value: string }) => {
      const { type, value } = val
      switch (type) {
        case '电网侧':
          getGridSide(paramObj.storeId, value)
          break
        case '光伏':
          getPhotovoltaic(paramObj.storeId, value)
          break
        case '储能':
          getEnergyStorage(paramObj.storeId, value)
          break
        case '其他能源':
          getOther(paramObj.storeId, value)
          break
      }
    }
    provide('dropSelect', selectData)

    onMounted(() => {
      setTimeout(() => {
        // 请求电网侧数据
        getGridSide(paramObj.storeId)
        // 请求光伏数据
        getPhotovoltaic(paramObj.storeId)
        // 请求储能数据
        getEnergyStorage(paramObj.storeId)
        // 请求其他能源的数据
        getOther(paramObj.storeId)
      }, 2000)
    })

    // 请求电网侧数据
    const getGridSide = (storeId: string, value = 'm') => {
      data.gridSideList = [
        {
          name: '用电量',
          data: '-',
          unit: 'kWh'
        },
        {
          name: '用电电费',
          data: '-',
          unit: '元'
        },
        {
          name: '平均电价',
          data: '-',
          unit: '元'
        }
      ]
      request
        .getElectricPowerManage({
          storeId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const { average, powerFeeTotal, powerTotal } = res.model
            // 如果大于一万，则缩写成  X万
            data.gridSideList[0].data = !isEmpty(powerTotal)
              ? parseFloat(powerTotal) >= 10000
                ? accuracyCalc(powerTotal, 10000, 1)
                : parseFloat(powerTotal).toFixed(1)
              : '-'
            data.gridSideList[0].unit = !isEmpty(powerTotal)
              ? parseFloat(powerTotal) >= 10000
                ? '万kWh'
                : 'kWh'
              : 'kWh'
            data.gridSideList[1].data = !isEmpty(powerFeeTotal)
              ? parseFloat(powerFeeTotal).toFixed(1)
              : '-'
            data.gridSideList[2].data = !isEmpty(average)
              ? parseFloat(average).toFixed(2)
              : '-'
          }
        })
    }

    // 请求光伏数据
    const getPhotovoltaic = (storeId: string, value = 'm') => {
      data.photovoltaicList = [
        {
          name: '装机容量',
          data: '-',
          unit: 'kW'
        },
        {
          name: '发电量',
          data: '-',
          unit: 'kWh'
        },
        {
          name: '减碳量',
          data: '-',
          unit: '吨'
        },
        {
          name: '收益',
          data: '-',
          unit: '元'
        }
      ]

      request
        .getPhotovoltaicPowerManage({
          storeId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const {
              capacity,
              carbonReduction,
              income,
              powerTotal,
              electricArray,
              powerArray,
              xChart
            } = res.model
            data.photovoltaicList[0].data = !isEmpty(capacity)
              ? parseFloat(capacity).toFixed(1)
              : '-'
            data.photovoltaicList[1].data = !isEmpty(powerTotal)
              ? parseFloat(powerTotal).toFixed(1)
              : '-'
            // 如果大于一万，则缩写成  X万
            data.photovoltaicList[2].data = !isEmpty(carbonReduction)
              ? parseFloat(carbonReduction) >= 10000
                ? accuracyCalc(carbonReduction, 10000, 1)
                : parseFloat(carbonReduction).toFixed(1)
              : '-'
            data.photovoltaicList[2].unit = !isEmpty(carbonReduction)
              ? parseFloat(carbonReduction) >= 10000
                ? '万吨'
                : '吨'
              : '吨'
            data.photovoltaicList[3].data = !isEmpty(income)
              ? parseFloat(income).toFixed(1)
              : '-'
            photovoltaicChart(electricArray, powerArray, xChart, value)
          }
        })
    }

    // 请求储能数据
    const getEnergyStorage = (storeId: string, value = 'm') => {
      data.energyStorageList = [
        {
          name: '装机容量',
          data: '-',
          unit: 'kW'
        },
        {
          name: '充电量',
          data: '-',
          unit: 'kWh'
        },
        {
          name: '放电量',
          data: '-',
          unit: 'kWh'
        },
        {
          name: '收益',
          data: '-',
          unit: '元'
        }
      ]
      request
        .getStorageGetStorageInfo({
          storeId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const {
              capacity,
              dischargePowerTotal,
              chargePowerTotal,
              powerFeeTotal,
              chargeElectricArray,
              chargePowerArray,
              dischargeElectricArray,
              dischargePowerArray,
              xChart
            } = res.model
            data.energyStorageList[0].data = !isEmpty(capacity)
              ? parseFloat(capacity).toFixed(1)
              : '-'
            data.energyStorageList[1].data = !isEmpty(chargePowerTotal)
              ? parseFloat(chargePowerTotal).toFixed(1)
              : '-'
            data.energyStorageList[2].data = !isEmpty(dischargePowerTotal)
              ? parseFloat(dischargePowerTotal).toFixed(1)
              : '-'
            data.energyStorageList[3].data = !isEmpty(powerFeeTotal)
              ? parseFloat(powerFeeTotal).toFixed(1)
              : '-'
            energyStorageChart(
              chargeElectricArray,
              chargePowerArray,
              dischargeElectricArray,
              dischargePowerArray,
              xChart,
              value
            )
          }
        })
    }

    // 请求其他能源的数据
    const getOther = (storeId: string, value = 'm') => {
      data.otherList = [
        {
          name: '水能耗',
          data: '-',
          unit: '吨'
        },
        {
          name: '气能耗',
          data: '-',
          unit: '吨'
        },
        {
          name: '油能耗',
          data: '-',
          unit: '吨'
        },
        {
          name: '煤能耗',
          data: '-',
          unit: '吨'
        }
      ]

      request
        .getOtherEnergyPowerManage({
          storeId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const { coal, gas, oil, water } = res.model
            data.otherList[0].data = !isEmpty(water)
              ? parseFloat(water).toFixed(1)
              : '-'
            data.otherList[1].data = !isEmpty(gas)
              ? parseFloat(gas).toFixed(1)
              : '-'
            data.otherList[2].data = !isEmpty(oil)
              ? parseFloat(oil).toFixed(1)
              : '-'
            data.otherList[3].data = !isEmpty(coal)
              ? parseFloat(coal).toFixed(1)
              : '-'
          }
        })
    }

    /**
     * 光伏图表绘制
     * @param electricArray 发电量
     * @param powerArray 发电功率
     * @param xChart x轴数据
     * @param xUnit  x轴数据单位
     */
    const photovoltaicChart = (
      electricArray: Array<string | number>,
      powerArray: Array<string | number>,
      xChart: Array<string | number>,
      xUnit = 'm'
    ) => {
      const chartDom = document.getElementById('photovoltaic')
      if (chartDom) {
        const myChart = echarts.init(chartDom)
        const legendData = ['发电量', '发电功率']
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
        const seriseData = [
          {
            name: '发电量',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value: number | string) {
                return value + ' kWh'
              }
            },
            data: electricArray,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#5396FF' },
                { offset: 1, color: '#7AC1FF' }
              ]),
              borderRadius: [4, 4, 0, 0]
            }
          },
          {
            name: '发电功率',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value: number | string) {
                return value + ' kW'
              }
            },
            symbol: 'none',
            itemStyle: {
              color: '#08FFF9'
            },
            lineStyle: {
              width: 4
            },
            data: powerArray
          }
        ]
        const yData = [
          {
            type: 'value',
            name: 'kWh',
            nameGap: 22,
            nameTextStyle: {
              fontSize: 24,
              color: '#999',
              align: 'right'
            },
            axisLabel: {
              fontSize: 24,
              color: '#999'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                width: 2,
                color: ['rgba(255,255,255,0.15)']
              }
            }
          },
          {
            type: 'value',
            name: 'kW',
            nameGap: 22,
            nameTextStyle: {
              fontSize: 24,
              color: '#999',
              align: 'left'
            },
            axisLabel: {
              fontSize: 24,
              color: '#999'
            },
            splitLine: {
              show: false
            }
          }
        ]
        myChart.setOption(
          chartObj.getPhotovoltaicBarLine(legendData, xData, yData, seriseData)
        )
      }
    }

    /**
     * 储能图表绘制
     * @param chargeElectricArray 充电量
     * @param chargePowerArray 充电功率
     * @param dischargeElectricArray 放电量
     * @param dischargePowerArray 放电功率
     * @param xChart x轴数据
     * @param xUnit  x轴数据单位
     */
    const energyStorageChart = (
      chargeElectricArray: Array<string | number>,
      chargePowerArray: Array<string | number>,
      dischargeElectricArray: Array<string | number>,
      dischargePowerArray: Array<string | number>,
      xChart: Array<string | number>,
      xUnit = 'm'
    ) => {
      const chartDom = document.getElementById('energyStorage')
      if (chartDom) {
        const myChart = echarts.init(chartDom)
        const legendData = ['充电量', '放电量', '充电功率', '放电功率']
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
        const color = ['#2FC25B', '#FACC14', '#4AFF80', '#FA8514']
        const colorLinear = ['rgba(47,194,91,0.3)', 'rgba(250,204,20,0.3)']
        const valueData = [
          {
            name: '充电量',
            data: chargeElectricArray
          },
          {
            name: '放电量',
            data: dischargeElectricArray
          },
          {
            name: '充电功率',
            data: chargePowerArray
          },
          {
            name: '放电功率',
            data: dischargePowerArray
          }
        ]
        const seriseData = []
        for (let i = 0; i < valueData.length; i++) {
          const item = valueData[i]
          const obj: any = {
            name: item.name,
            type: item.name.includes('功率') ? 'line' : 'bar',
            tooltip: {
              valueFormatter: function (value: number | string) {
                const unit = item.name.includes('功率') ? 'kW' : 'kWh'
                return value + unit
              }
            },
            data: item.data,
            // value: item.data,
            itemStyle: {
              color: item.name.includes('功率')
                ? color[i]
                : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: color[i] },
                  { offset: 1, color: colorLinear[i] }
                ])
            }
          }
          if (item.name.includes('功率')) {
            obj.yAxisIndex = 1
            obj.symbol = 'none'
            obj.lineStyle = {
              width: 4
            }
          } else {
            obj.barGap = 0
            obj.itemStyle.borderRadius = [4, 4, 0, 0]
          }
          seriseData.push(obj)
        }
        const yData = [
          {
            type: 'value',
            name: 'kWh',
            nameGap: 22,
            nameTextStyle: {
              fontSize: 24,
              color: '#999',
              align: 'right'
            },
            axisLabel: {
              fontSize: 24,
              color: '#999'
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                width: 2,
                color: ['rgba(255,255,255,0.15)']
              }
            }
          },
          {
            type: 'value',
            name: 'kW',
            nameGap: 22,
            nameTextStyle: {
              fontSize: 24,
              color: '#999',
              align: 'left'
            },
            axisLabel: {
              fontSize: 24,
              color: '#999'
            },
            splitLine: {
              show: false
            }
          }
        ]
        myChart.setOption(
          chartObj.getEnergyStorageBarLine(legendData, xData, yData, seriseData)
        )
      }
    }

    return {
      ...toRefs(data)
    }
  }
})
</script>
<style lang="scss" scoped>
.gnc {
  padding: 24px 40px 20px;
  // overflow-y: auto;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  &-top {
    width: 680px;
    height: 91px;
    background: url(@/assets/images/title_bg.png) no-repeat;
    background-size: 100% 100%;
    &__title {
      padding: 11px 0 18px 24px;
      font-size: 44px;
      font-weight: 600;
      color: #fff;
      line-height: 62px;
    }
  }
  #photovoltaic {
    width: 100%;
    height: 350px;
  }
  #energyStorage {
    width: 100%;
    height: 350px;
  }
}
</style>
