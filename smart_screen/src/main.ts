import { createApp } from 'vue'
import App from './App.vue'
// 引入store
import store from './store'
// 引入路由
import router from './router'
// 局部引入ui组件
import { Button, Select, SelectOption, Progress } from 'ant-design-vue'
// 引入ui样式
import 'ant-design-vue/dist/antd.css'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
/** 引入柱状图\折线图\饼图等图表，图表后缀都为 Chart  */
import { BarChart, LineChart, PieChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LineChart,
  PieChart
])

// 创建应用实例对象
const app = createApp(App)
app
  .use(Button)
  .use(Select)
  .use(SelectOption)
  .use(Progress)
  .use(router)
  .use(store)
  .mount('#app')
