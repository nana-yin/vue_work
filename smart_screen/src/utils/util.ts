// 公共函数和变量

/**
 * 将十六进制的颜色转为rgba
 * @param hex 颜色的十六进制
 * @param opacity 颜色的不透明度
 */
export const bgColor = (hex: string, opacity = 0.1) => {
  if (hex) {
    return (
      'rgba(' +
      parseInt('0x' + hex.slice(1, 3)) +
      ',' +
      parseInt('0x' + hex.slice(3, 5)) +
      ',' +
      parseInt('0x' + hex.slice(5, 7)) +
      ',' +
      opacity +
      ')'
    )
  } else {
    return 'rgba(0,0,0,0.1)'
  }
}

/**
 * 判断数据是否为空
 * @param value  需要校验的数据
 * @return {boolean} 是否为空, 默认false
 *  null, '', undefined, [], {} 返回为true
 *  0 返回false
 */
export function isEmpty (value: any) {
  // 0
  if (value !== null && Number(value) !== NaN) {
    return false
  }
  // null
  if (!value && typeof value === 'object') {
    return true
  }
  // undefined
  if (typeof value === 'undefined') {
    return true
  }
  // ''
  if (typeof value === 'string' && value === '') {
    return true
  }
  // []
  if (Array.isArray(value)) {
    return !value.length
  }
  // {}
  if (Object.prototype.toString.call(value) === '[object Object]') {
    return !Object.keys(value).length
  }
  return false
}

/**
 * 数据进行单位的换算，默认乘以100
 * @param value  需要计算的数据
 * @parama conversion 换算的量词
 * @param accuracy  需要精确到几位
 * @return {string}
 */
export function accuracyCalc (value: any, conversion: number, accuracy: number) {
  let resVal = ''
  if (!isEmpty(value)) {
    resVal = (parseFloat(value) * conversion).toFixed(accuracy)
  }
  return resVal
}

/**
 * 获取当前地址上面的参数
 * @return {string}
 */
export const getLocationParams = () => {
  let str = ''
  if (window.location.search) {
    str = window.location.search.split('?')[1]
  } else if (window.location.hash) {
    str = window.location.hash.split('?') && window.location.hash.split('?')[1]
  } else {
    str = window.location.href.split('?') && window.location.href.split('?')[1]
  }
  const paramObj = {} as {
    sessionId: string;
    storeId: string;
    [propName: string]: string;
  }
  if (str) {
    const strArr = str.split('&')
    if (strArr.length) {
      strArr.forEach((item) => {
        const itemArr = item.split('=')
        paramObj[itemArr[0]] = itemArr[1]
      })
    }
  }
  return paramObj
}
