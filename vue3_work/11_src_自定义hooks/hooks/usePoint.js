import {reactive, onMounted, onBeforeUnmount} from 'vue'
export default function () {
  let point = reactive({
    x: 0,
    y: 0
  })

  function handleClick(e) {
    point.x = e.pageX
    point.y = e.pageY
  }
  onMounted(() => {
    window.addEventListener('click', handleClick)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', handleClick)
  })
  return point
}