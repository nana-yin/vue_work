<template>
  <!-- 当前的日期 -->
  <div class="date-time">
    <div class="text">{{ year }}-{{ month }}-{{ date }}</div>
    <div class="text">星期{{ dayKey[day] }}</div>
    <div class="active-text">{{ time }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'DateTime',
  setup () {
    const data = reactive({
      year: 0,
      month: '',
      date: 0,
      time: '',
      day: 0,
      dayKey: { 0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' }
    })
    let timeInterval: NodeJS.Timer | null = null

    onMounted(() => {
      const curTime = new Date()
      data.year = curTime.getFullYear()
      data.month =
        (curTime.getMonth() + 1 >= 10) + ''
          ? curTime.getMonth() + 1 + ''
          : '0' + (curTime.getMonth() + 1)
      data.date = curTime.getDate()
      data.day = curTime.getDay()
      timeInterval = setInterval(() => {
        const t = new Date()
        const h = t.getHours() >= 10 ? t.getHours() : '0' + t.getHours()
        const m = t.getMinutes() >= 10 ? t.getMinutes() : '0' + t.getMinutes()
        const s = t.getSeconds() >= 10 ? t.getSeconds() : '0' + t.getSeconds()
        data.time = h + ':' + m + ':' + s
      }, 1000)
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>
<style lang="scss" scoped>
.date-time {
  font-size: 0;
  .text {
    display: inline-block;
    height: 45px;
    margin-right: 24px;
    font-size: 32px;
    font-weight: 400;
    color: #fff;
    line-height: 45px;
  }
  .active-text {
    position: relative;
    z-index: 10;
    height: 100px;
    font-size: 80px;
    font-weight: 400;
    color: #3196fa;
    line-height: 100px;
  }
}
</style>
