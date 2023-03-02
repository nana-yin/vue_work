<template>
  <div class="energy-side">
    <div class="energy-side__top">
      <div class="title" @click="openPage">用能侧</div>
    </div>
    <div class="equipment-ranking">
      <InfoModule title="设备用能排行榜">
        <template #ranking-chart>
          <div id="rankingChart"></div>
        </template>
      </InfoModule>
    </div>
    <div class="equipment-statistics">
      <InfoModule title="设备能效统计">
        <template #statistics-chart>
          <div id="statisticsChart"></div>
        </template>
      </InfoModule>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, provide, watch } from 'vue'
// 引入详情信息的组件
import InfoModule from '@/components/InfoModule/index.vue'
// 引入绘图的echarts
import * as echarts from 'echarts'
// 引入请求
import request from '@/api/smartEnery'
// 引入光伏和储能的图表绘制
import chartObj from './chart.config'
// 引入判断为空的函数
import { isEmpty, getLocationParams } from '@/utils/util'

export default defineComponent({
  name: 'EnergySide',
  components: {
    InfoModule
  },
  props: {
    storeId: { // 拿到当前的storeId
      type: String,
      default: ''
    }
  },
  setup (props) {
    const data = reactive({
      qyStoreId: '' // 企业的storeId
    })

    // onMounted(() => {
    //   setTimeout(() => {
    //     statisticsChartInit()
    //     rankingChartInit()
    //   }, 2000)
    // })

    // 下拉框的数据的改变
    const selectData = (val: { type: string; value: string }) => {
      const { type, value } = val
      switch (type) {
        case '设备能效统计':
          statisticsChartInit(value)
          break
        case '设备用能排行榜':
          rankingChartInit(value)
          break
      }
    }
    provide('dropSelect', selectData)

    // 设备能效统计图表绘制
    const statisticsChartInit = (value = '1') => {
      request
        .getEnergyGetDeviceNxInfo({
          storeId: data.qyStoreId,
          deviceType: parseInt(value) // 1-机电设备 2-非机电设备
        })
        .then((res: any) => {
          if (res.success) {
            const {
              eliminationCount,
              notNxCount,
              nxCount,
              oneNxCount,
              twoNxCount,
              threeNxCount,
              fourNxCount,
              fiveNxCount
            } = res.model
            const chartDom = document.getElementById('statisticsChart')
            if (chartDom) {
              const myChart = echarts.init(chartDom)
              const xData =
                value === '1'
                  ? ['强制淘汰', '非能效', '能效']
                  : ['一级', '二级', '三级', '四级', '五级']
              const color =
                value === '1'
                  ? ['#EF4864', '#3295FA', '#2FC25B']
                  : ['#EF4864', '#F7984A', '#FACC14', '#2FC25B', '#00B5A7']
              const colorLinear =
                value === '1'
                  ? [
                      'rgba(239, 72, 100,0.3)',
                      'rgba(50, 149, 250,0.3)',
                      'rgba(47, 194, 91,0.3)'
                    ]
                  : [
                      'rgba(239, 72, 100,0.3)',
                      'rgba(247, 152, 74,0.3)',
                      'rgba(250, 204, 20,0.3)',
                      'rgba(47, 194, 91,0.3)',
                      'rgba(0, 181, 167,0.3)'
                    ]
              const valueData =
                value === '1'
                  ? [eliminationCount, notNxCount, nxCount]
                  : [
                      oneNxCount,
                      twoNxCount,
                      threeNxCount,
                      fourNxCount,
                      fiveNxCount
                    ]
              const seriesData = []
              for (let i = 0; i < valueData.length; i++) {
                const item = valueData[i]
                const obj = {
                  value: item,
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: color[i] },
                      { offset: 1, color: colorLinear[i] }
                    ])
                  }
                }
                seriesData.push(obj)
              }
              myChart.setOption(chartObj.getStatisticsChart(xData, seriesData))
            }
          }
        })
    }

    // 设备用能排行榜图表绘制
    const rankingChartInit = (value = 'm') => {
      request
        .getEnergyGetDeviceNxList({
          storeId: data.qyStoreId,
          type: value
        })
        .then((res: any) => {
          if (res.success) {
            const yData: string[] = []
            const yDataRight: string[] = []
            const legendData = ['低谷', '高峰', '尖峰', '平段']
            const color = ['#2FC25B', '#EF4864', '#FACC14', '#3295FA']
            const colorLinear = [
              'rgba(47, 194, 91,0.5)',
              'rgba(239, 72, 100,0.5)',
              'rgba(250, 204, 20,0.5)',
              'rgba(50, 149, 250,0.5)'
            ]
            const valueData = [
              {
                name: '低谷',
                data: []
              },
              {
                name: '高峰',
                data: []
              },
              {
                name: '尖峰',
                data: []
              },
              {
                name: '平段',
                data: [] as any
              }
            ]
            if (res.model && res.model.length) {
              res.model.forEach((item: any) => {
                const {
                  gPower,
                  fPower,
                  jPower,
                  pPower,
                  assetName,
                  powerTotal
                } = item
                valueData[0].data.unshift(gPower)
                valueData[1].data.unshift(fPower)
                valueData[2].data.unshift(jPower)
                valueData[3].data.unshift(pPower)
                yData.unshift(assetName)
                yDataRight.unshift(powerTotal)
              })
            }

            const chartDom = document.getElementById('rankingChart')
            const seriesData = []
            if (chartDom) {
              const myChart = echarts.init(chartDom)
              for (let i = 0; i < valueData.length; i++) {
                const item = valueData[i]
                const obj = {
                  name: item.name,
                  type: 'bar',
                  barWidth: 16,
                  stack: 'total',
                  label: {
                    show: false
                  },
                  tooltip: {
                    valueFormatter: function (value: number | string) {
                      const equalVal = !isEmpty(value)
                        ? parseFloat(value as string).toFixed(0)
                        : '-'
                      return equalVal + 'kWh'
                    }
                  },
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      { offset: 0, color: color[i] },
                      { offset: 1, color: colorLinear[i] }
                    ]),
                    borderRadius:
                      i === 0
                        ? [100, 0, 0, 100]
                        : i === valueData.length - 1
                          ? [0, 100, 100, 0]
                          : [0, 0, 0, 0]
                  },
                  data: item.data
                }
                seriesData.push(obj)
              }
              myChart.setOption(
                chartObj.getRankingChart(
                  legendData,
                  yData,
                  yDataRight,
                  seriesData
                )
              )
            }
          }
        })
    }

    const openPage = () => {
      const paramObj = getLocationParams()
      let url = ''
      if (
        process.env.VUE_APP_BASE_API === '/api' ||
        process.env.VUE_APP_BASE_API === 'http://10.0.103.112:80' ||
        process.env.VUE_APP_BASE_API === 'http://115.236.62.114:65080'
      ) {
        // 本地或者测试服
        // url = 'http://10.0.103.112'
        url = 'http://192.168.191.63:9090'
      } else {
        // 生产服
        url = 'https://ele.qre.com.cn'
      }
      request.getStoreSendLoginCode({
        modelId: '296226533166732',
        loginId: paramObj.loginId,
        needIndexPage: true
      }).then((res: any) => {
        const { success, model } = res
        if (success) {
          // 成功
          if (model) {
            const { code, indexPage } = model
            // 路由上面有参数
            url += `/login.html#/user/login?code=${code}&loginId=${paramObj.loginId}&indexPage=${indexPage}`
          }
          // console.log('数智配电-拿到的数据', model)
          window.open(url, '_blank')
        }
      })
    }

    // 监听当前的storeId
    watch(
      () => props.storeId,
      (val: string) => {
        if (val) {
          data.qyStoreId = val
          statisticsChartInit()
          rankingChartInit()
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    return {
      openPage
    }
  }
})
</script>
<style lang="scss" scoped>
.energy-side {
  margin-top: 64px;
  padding: 24px 40px 15px;
  overflow-y: auto;
  background: url("@/assets/images/ync_bg.png") no-repeat;
  background-size: 100% 100%;
  &::-webkit-scrollbar {
    display: none;
  }
  &__top {
    width: 680px;
    height: 91px;
    background: url(@/assets/images/title_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .title {
    cursor: pointer;
    padding: 11px 0 18px 24px;
    font-size: 44px;
    font-weight: 600;
    color: #fff;
    line-height: 62px;
  }
  .equipment-ranking {
    box-sizing: border-box;
    // height: 656px;
    height: 626px;
    padding-top: 12px;
    border-bottom: 2px solid rgba(238, 238, 238, 0.25);
  }
  .equipment-statistics {
    box-sizing: border-box;
    padding-top: 12px;
    height: 467px;
  }
  #statisticsChart {
    width: 100%;
    margin-top: -15px;
    // height: 351px;
    height: 301px;
  }
  #rankingChart {
    width: 100%;
    // height: 441px;
    height: 381px;
  }
}
</style>
