import { isEmpty } from '@/utils/util'
/**
 * 光伏的图表
 * @param legendData 图例数据
 * @param xData x轴的数据
 * @param yData y轴的数据
 * @param seriesData 绘图数据
 */
const getPhotovoltaicBarLine = (
  legendData: string[],
  xData: string[],
  yData: any[],
  seriesData: any[]
) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 24
      },
      confine: true
    },
    grid: {
      top: 52,
      // left: 56,
      left: 0,
      // right: 40,
      right: 10,
      bottom: 48,
      containLabel: true
    },
    legend: {
      data: legendData,
      icon: 'circle',
      itemGap: 47,
      itemWidth: 16,
      itemHeight: 16,
      borderRadius: 16,
      textStyle: {
        width: 96,
        padding: [0, 0, 0, 12],
        fontSize: 24,
        color: '#ccc'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        },
        axisLabel: {
          fontSize: 24,
          color: '#999',
          margin: 17,
          showMinLabel: true,
          showMaxLabel: true
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: yData,
    series: seriesData
  }
  return option
}

/**
 * 储能的图表
 * @param legendData 图例数据
 * @param xData x轴的数据
 * @param yData y轴的数据
 * @param seriesData 绘图数据
 */
const getEnergyStorageBarLine = (
  legendData: string[],
  xData: string[],
  yData: any[],
  seriesData: any[]
) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 24
      },
      confine: true
    },
    grid: {
      top: 52,
      bottom: 48,
      // left: 56,
      left: '2%',
      // right: 40,
      right: 10,
      containLabel: true
    },
    legend: {
      data: legendData,
      icon: 'circle',
      left: 61,
      itemGap: 32,
      itemWidth: 16,
      itemHeight: 16,
      borderRadius: 16,
      textStyle: {
        width: 24,
        padding: [0, 0, 0, 12],
        fontSize: 24,
        color: '#ccc'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        },
        axisLabel: {
          fontSize: 24,
          color: '#999',
          margin: 17,
          showMinLabel: true,
          showMaxLabel: true
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: yData,
    series: seriesData
  }
  return option
}

/**
 * 用电情况的图表
 * @param legendData 图例数据
 * @param xData x轴的数据
 * @param seriesData 绘图数据
 */
const getElectricityConsumptionChart = (
  legendData: string[],
  xData: string[],
  seriesData: any[]
) => {
  const option = {
    title: {
      left: 'center',
      text: '用电情况',
      textStyle: {
        color: '#fff',
        fontSize: 32,
        lineHeight: 40
      }
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        fontSize: 24
      },
      formatter: (params: any) => {
        let html = `<div style="margin-bottom:10px;text-align:center;font-size: 24px;color: #333;">${params[0].axisValue}`
        for (let i = 0; i < params.length; i++) {
          const { data, seriesName, color } = params[i]
          html += `<div style="display:flex;flex-wrap: nowrap;align-items: center;">
                      <div style='width: 10px;height: 10px;margin-right: 6px;border-radius: 5px;background:${
                        color.colorStops ? color.colorStops[0].color : color
                      };'></div>
                      <div style="font-size: 24px;color: #333;">${seriesName}：${
            !isEmpty(data) ? data.toFixed(2) : '-'
          }</div>
                    </div>`
        }
        html += '</div>'
        return html
      },
      confine: true
    },
    grid: {
      top: 120,
      left: 61,
      bottom: 0,
      right: 65,
      containLabel: true
    },
    legend: {
      data: legendData,
      icon: 'circle',
      top: 68,
      itemGap: 32,
      itemWidth: 16,
      itemHeight: 16,
      borderRadius: 16,
      textStyle: {
        width: 96,
        padding: [0, 0, 0, 12],
        fontSize: 24,
        color: '#ccc'
      }
    },
    xAxis: [
      {
        type: 'category',
        data: xData,
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(255,255,255,0.5)'
          }
        },
        axisLabel: {
          fontSize: 24,
          color: '#999',
          margin: 17,
          showMinLabel: true,
          showMaxLabel: true
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          fontSize: 24,
          color: '#999'
        },
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            width: 2,
            color: ['rgba(255,255,255,0.15)']
          }
        }
      }
    ],
    series: seriesData
  }
  return option
}

/**
 * 能源消耗情况的图表
 * @param legendData 图例数据
 * @param centerLabel 中间的数据
 * @param seriesData 绘图数据
 */
const getEnergyConsumptionChart = (
  legendData: string[],
  centerLabel: {
    value: number | string;
    unit: string;
    name: string;
  },
  seriesData: any[]
) => {
  const option = {
    title: {
      left: 'center',
      text: '能源消耗情况',
      textStyle: {
        color: '#fff',
        fontSize: 32,
        lineHeight: 40
      }
    },
    tooltip: {
      trigger: 'item',
      textStyle: {
        fontSize: 24
      },
      confine: true
    },
    legend: {
      data: legendData,
      icon: 'circle',
      itemGap: 77,
      itemWidth: 16,
      itemHeight: 16,
      borderRadius: 16,
      textStyle: {
        width: 96,
        padding: [0, 0, 0, 12],
        fontSize: 24,
        color: '#ccc'
      },
      orient: 'vertical',
      top: 96,
      left: 374
    },
    series: [
      {
        name: '能源消耗情况',
        type: 'pie',
        radius: ['63%', '80%'],
        center: ['30%', '58%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'center',
          formatter: () => {
            const { value, unit, name } = centerLabel
            return [`{a|${name}}`, `{b|${value}}{c|${unit}}`].join('\n')
          },
          rich: {
            a: {
              height: 28,
              padding: [0, 0, 27, 0],
              color: '#fff',
              fontSize: 28
            },
            b: {
              height: 40,
              color: '#3196FA',
              fontSize: 36,
              fontWeight: 600
            },
            c: {
              height: 40,
              color: '#3196FA',
              fontSize: 24
            }
          }
        },
        labelLine: {
          show: false
        },
        tooltip: {
          valueFormatter: function (value: number | string) {
            return value + 'kWh'
          },
          textStyle: {
            fontSize: 24
          },
          confine: true
        },
        data: seriesData,
        confine: true
      }
    ]
  }
  return option
}

/**
 * 设备能效统计的图表
 * @param xData x轴的数据
 * @param seriesData 绘图数据
 */
const getStatisticsChart = (xData: string[], seriesData: any[]) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      },
      textStyle: {
        fontSize: 24
      },
      confine: true
    },
    grid: {
      top: 12,
      left: 0,
      bottom: 0,
      right: 0,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLine: {
        lineStyle: {
          color: '#8b9eb5'
        }
      },
      axisLabel: {
        fontSize: 28,
        color: '#999',
        margin: 17
      },
      axisTick: {
        show: false
      }
    },
    legend: { show: false },
    yAxis: [
      {
        type: 'value',
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
      }
    ],
    series: [
      {
        type: 'bar',
        data: seriesData,
        barWidth: 40,
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  }
  return option
}

/**
 * 设备用能排行榜的图表
 * @param legendData 图例数据
 * @param yData y轴的数据
 * @param yDataRight 右侧y轴的数据
 * @param seriesData 绘图数据
 */
const getRankingChart = (
  legendData: string[],
  yData: string[],
  yDataRight: string[],
  seriesData: any[]
) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      },
      textStyle: {
        fontSize: 24
      },
      confine: true
    },
    dataZoom: [
      {
        id: 'dataZoomY',
        yAxisIndex: [0, 1],
        show: false, // 是否显示滑动条，不影响使用
        type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
        start: 100, // 默认显示0%
        // startValue: 2000000, // 从末尾开始--进行倒序
        // endValue: 4, // 一次性展示5个
        width: 6,
        borderColor: 'transparent',
        fillerColor: 'rgba(205,205,205,1)',
        zoomLock: true,
        showDataShadow: false, // 是否显示数据阴影 默认auto
        backgroundColor: '#fff',
        showDetail: false, // 即拖拽时候是否显示详细数值信息 默认true
        realtime: true, // 是否实时更新
        filterMode: 'filter',
        handleIcon: 'circle',
        handleStyle: {
          color: 'rgba(205,205,205,1)',
          borderColor: 'rgba(205,205,205,1)'
        },
        handleSize: '80%',
        moveHandleSize: 0,
        maxValueSpan: 4,
        minValueSpan: 4,
        brushSelect: false // 刷选功能，设为false可以防止拖动条长度改变 ************（这是一个坑）
      },
      {
        type: 'inside',
        yAxisIndex: [0, 1],
        start: 0, // 默认显示0%
        zoomOnMouseWheel: false, // 滚轮是否触发缩放
        moveOnMouseMove: true, // 鼠标滚轮触发滚动
        moveOnMouseWheel: true
      }
    ],
    legend: {
      data: legendData,
      icon: 'circle',
      itemGap: 32,
      itemWidth: 16,
      itemHeight: 16,
      borderRadius: 16,
      textStyle: {
        width: 96,
        padding: [0, 0, 0, 12],
        fontSize: 24,
        color: '#ccc'
      }
    },
    grid: {
      top: 74,
      left: 10,
      bottom: 63,
      right: 0,
      containLabel: true
    },
    xAxis: {
      type: 'value',
      showMinLabel: true,
      showMaxLabel: true,
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
    yAxis: [
      {
        type: 'category',
        offset: 110,
        axisLabel: {
          fontSize: 24,
          color: '#999',
          margin: 13,
          align: 'left',
          formatter: (val: string) => {
            return (val && val.length) > 4 ? val.slice(0, 4) + '...' : val
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: yData
      },
      {
        type: 'category',
        yAxisIndex: 1,
        axisLabel: {
          fontSize: 24,
          color: '#999',
          margin: 13,
          formatter: (val: number | string) => {
            return val + 'kWh'
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: yDataRight
      }
    ],
    series: seriesData
  }
  return option
}
export default {
  getPhotovoltaicBarLine,
  getEnergyStorageBarLine,
  getElectricityConsumptionChart,
  getEnergyConsumptionChart,
  getStatisticsChart,
  getRankingChart
}
