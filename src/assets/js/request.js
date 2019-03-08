import axios from 'axios'
import router from '@/router/router'
import { Message } from 'element-ui'

export default (options = {}) => {
  let serverHost = 'http://koa.blog.peichenhu.cn'
  // let serverHost = 'http://192.168.0.104:9000'
  let token = window.localStorage.getItem('token')
  let httpCode = {
    0: '请求成功',
    9999: '授权失效，请重新登录',
    1001: '用户名或密码错误',
    1011: '参数错误',

    400: '错误请求',
    401: '未授权，请重新登录',
    403: '服务器拒绝访问',
    404: '请求错误,未找到该资源',
    405: '请求方法未允许',
    408: '请求超时',
    500: '服务器端出错',
    501: '网络未实现',
    502: '网络错误',
    503: '服务不可用',
    504: '网络超时',
    505: 'http版本不支持该请求'
  }
  // 已登录
  if (options.url.includes(`/Login`) && token) {
    router.push({ path: '/user' })
    return false
  }
  // 未登录
  return new Promise((resolve, reject) => {
    // 实例默认值
    let instance = axios.create()
    instance.defaults.baseURL = serverHost
    instance.defaults.timeout = 60000
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    if (options.type === 'form') {
      axios.defaults.headers.common['Content-Type'] =
        'application/x-www-form-urlencoded'
    }

    // 取消请求
    let source = axios.CancelToken.source()
    options.cancelToken = source.token

    // 请求拦截器
    instance.interceptors.request.use(
      config => {
        config.headers['token'] = token
        return config
      },
      error => Promise.reject(error)
    )
    // 响应拦截器
    instance.interceptors.response.use(
      response => {
        if (!!response.data && response.data.code === 9999) {
          window.localStorage.clear()
          router.replace({ name: 'login' })
        }
        if (!!response.data && response.data.code === 0) return response.data
        else return Promise.reject(response.data)
      },
      error => Promise.reject(error)
    )
    // 服务端响应处理
    instance(options)
      .then(data => resolve(data))
      .catch(error => {
        let msg = '网络错误（未知）'
        if (error.response) msg = httpCode[error.response.status]
        if (error.msg) msg = error.msg
        Message.error(msg)
        reject(error)
      })
  })
}
