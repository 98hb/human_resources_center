// 权限拦截在路由跳转 导航守卫

import router from '@/router'
import store from '@/store' // 引入 store 实例 和 组件中的 this.$store 是一回事
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出 因为只需要让代码执行即可
// next 是前置守卫必须执行的 钩子 next 必须执行， 如果不执行 页面失效
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/login', '/404'] // 定义白名单
router.beforeEach((to, from, next) => {
  nprogress.start() // 开启进度条的意思
  if (store.getters.token) {
    // 如果有 token
    if (to.path === '/login') {
      // 如果要访问的是 登录页
      next('/') // 跳转到主页
    } else {
      next()
    }
  } else {
    // 没有 token
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 手动强制关闭一次 为了解决 手动切换地址时 进度条的不关闭问题
}) // 前置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
}) // 后置守卫
