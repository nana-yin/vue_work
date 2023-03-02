/**
 * @file http请求封装
 * @Author yn
 * @Date 2023-01-04
 */
// 公共数据
import axios, { AxiosRequestHeaders } from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

export let timestamp: number = new Date().getTime() / 1000 // 当前的时间戳

// 创建一个新的axios请求
const https = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 请求的基础地址
  timeout: 30 * 1000, // 超时时间 单位是ms，这里设置了30s的超时时间
  withCredentials: true
})
let headers = {}

// 请求头、token等配置
https.interceptors.request.use(config => {
  timestamp = new Date().getTime() / 1000
  config.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Timestamp: timestamp
  } as unknown as AxiosRequestHeaders
  config.headers.Authorization = sessionStorage.getItem('sessionId')
  headers = config.headers
  return config
})

// 请求失败的信息提示封装
const createError = (respCode: string | number, msg: string) => {
  const err = new Error(msg) as any
  err.respCode = respCode
  message.error(msg || '访问超时，请稍候重新尝试！')
  return err
}

// 请求的回调封装配置
const handleRequest = (request: any) => {
  return new Promise(async (resolve, reject) => {
    request
      .then((resp: { data: any; status: string | number; }) => {
        const { data, status } = resp
        if (!data.success) {
          if ((data.msgCode === '2') && (data.msgInfo === '登录过期,请重新登录')) { // 对登录过期单独进行处理
            let url = ''
            if (
              process.env.VUE_APP_BASE_API == '/api' ||
              process.env.VUE_APP_BASE_API == 'http://10.0.103.112:80' ||
              process.env.VUE_APP_BASE_API == 'http://115.236.62.114:65080'
            ) {
              // 本地或者测试服
              // url = 'http://10.0.103.112/login.html#/user/login'
              url = 'http://localhost:9090/login.html#/user/login'
            } else {
              // 生产服
              url = 'https://ele.qre.com.cn/login.html#/user/login'
            }
            // window.location.href = url
            return false
          } else {
            reject(createError(status, data.msgInfo))
          }
        } else {
          resolve(data)
        }
      })
      .catch((err: { code: string | number; message: string }) => {
        const { code, message } = err
        createError(code, message)
      })
  })
}

// 封装的请求方式
export default {
  get (url: string, params: object) {
    return handleRequest(
      https({
        method: 'get',
        headers,
        url: `${url}${params ? `?${qs.stringify(params)}` : ''}`
      })
    )
  },
  post (url: string, params: object) {
    // 后端要求所有的post都要加一个参数，用于websocket
    const paramsRes = Object.assign(params, { userId: timestamp })
    return handleRequest(
      https({
        method: 'post',
        url,
        headers,
        data: paramsRes
      })
    )
  },
  put (url: string, params: object) {
    return handleRequest(
      https({
        method: 'put',
        url,
        headers,
        data: params
      })
    )
  },
  delete (url: string, params: object) {
    return handleRequest(
      https({
        method: 'delete',
        url,
        headers,
        data: params
      })
    )
  },
  upload (url: string, params: object) {
    return https({
      method: 'post',
      url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
