import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
const TimeOut = 3600 // 定义超时时间
const service = axios.create({ // 当执行 npm run dev => .evn.development => /api => 跨域代理
  baseURL: process.env.VUE_APP_BASE_API, // / npm run dev => /api npm run build=> /prod-api
  timeout: 5000 // 设置超时时间
}) // 通过create创建了一个新的axios实例
service.interceptors.request.use(config => {
  // config 是请求的配置信息
  // token的统一注入问题
  if (store.getters.token) {
    // 只有在有 token 的情况下，才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为 true 表示过期了
      // token 没用了 因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转登录页
      router.push('/login')
      return Promise.reject(new Error('token 超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须要返回的
}, error => {
  return Promise.reject(error)
}) // 请求拦截器 请求拦截器主要处理 token的统一注入问题
// service.interceptors.response.use(function(response) {}, function (error) {}) // 响应拦截器 响应拦截器主要处理 返回的数据异常 和数据解构问题
service.interceptors.response.use(response => { // 响应拦截器 响应拦截器主要处理 返回的数据异常 和数据解构问题
// axios 默认加了一层 data // response 响应
  const { success, message, data } = response.data // 要根据 success 的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进 then ? 不能 ！应该进 catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  // error 信息里面 response 的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于 10002 的时候，表示后端告诉我 token 超时了
    store.dispatch('user/logout') // 登出 action
    router.push('/login')
    // return Promise.reject(error)
  } else {
    Message.error(error.message) // 提示错误信息
    // return Promise.reject(error) // 返回执行错误，让当前的执行链跳出成功 直接进入 catch
  }
  return Promise.reject(error)
  //   login().then().catch()
}) // 响应拦截器 响应拦截器主要处理 返回的数据异常 和数据结构问题
// 是否超时
// 超时逻辑 (当前时间 - 缓存中的时间) 是否大于时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}
export default service
// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service
