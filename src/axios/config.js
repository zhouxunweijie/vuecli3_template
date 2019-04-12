import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import { Toast } from 'vant'

// 打印控制台，跳过eslint
//import consolelog from '@/axios/consolelog' // eslint-disable-line

Vue.use(vueAxios, axios)

/**
 * [http request 拦截器]
 * @return
 */
axios.interceptors.request.use(
  config => {
    // 判断localStorage中是否存在api_token
    if (localStorage.getItem('access_token')) {
      //  存在将access_token写入 request header
      config.headers = {
        'access-token': `${localStorage.getItem('access_token')}`
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * [返回状态判断(添加响应拦截器)]
 * @return
 */
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.resolve(error.response)
  }
)

function errorState (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
  } else {
    return {
      status: -404,
      msg: '网络异常'
    }
  }
}

function successState (res) {
  // 统一判断后端返回的错误码
  if (res.data.code === 200) {
    return true
  } else {
    Toast(res.data.msg || '网络错误')
  }
}

/**
 * [confuse 添加公共参数]
 * @param  {Obj} data 参数
 *               data.auth_key [验证]
 *               data.token [token --> 参数 + token]
 *               data.timestamp [时间戳]
 * @return {Obj}
 */
function confuse (data) {
  // let paraStr = ''

  // for (let value of Object.keys(data).sort()) {
  //   if (data[value] !== undefined && data[value] !== null) {
  //     paraStr += data[value].toString()
  //   }
  // }
  // data.auth_key = process.env.VUE_APP_AUTH_KEY
  // data.token = md5(paraStr + process.env.VUE_APP_TOKEN)
  // data.timestamp = new Date().getTime()

  return data
}

/**
 * [配置axios]
 * @param  {Obj} opts 配置
 *               opts.method 请求方式 [*必填]
 *               opts.baseURL axios默认url
 *               opts.url 请求url [*必填]
 *               opts.headers 请求headers
 * @param  {Obj} data 请求数据
 * @return {Obj} res
 */
const httpServer = (opts, data) => {
  // 设置默认headers
  let headers = {}

  switch (opts.method) {
    case 'post':
      headers = { 'X-Requested-With': 'XMLHttpRequest' }
      break
    case 'get':
      break
    case 'put':
      headers = { 'X-Requested-With': 'XMLHttpRequest' }
      break
    case 'delete':
      break
  }

  // http默认配置
  let httpDefaultOpts = {
    method: opts.method, // 必填
    baseURL: opts.baseURL || process.env.VUE_APP_API,
    url: opts.url, // 必填
    timeout: 10 * 1000,
    params: confuse(data),
    data: confuse(data),
    headers: Object.assign(headers, opts.headers)
  }

  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  let promise = new Promise((resolve, reject) => {
    axios(httpDefaultOpts)
      .then(res => {
        successState(res)
        resolve(res.data)
      })
      .catch(response => {
        errorState(response)
        reject(response)
      })
  })

  return promise
}

export default httpServer
