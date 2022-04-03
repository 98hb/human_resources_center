// 负责所有全局自定义组件的注册
// 一次编写，永远运行
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
export default {
  install(Vue) {
    // 组件的注册
    Vue.component('PageTools', PageTools) // 'PageTools'组件名称， PageTools 组件对象
    Vue.component('UploadExcel', UploadExcel) // 'UploadExcel'组件名称， UploadExcel 组件对象
  }
}
// Vue.use()
