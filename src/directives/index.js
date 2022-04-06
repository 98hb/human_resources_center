// 负责管理所有的自定义指令

export const imagerror = {
  // 指令对象 会在当前的 dom 元素插入到节点之后执行
  inserted(dom, options) { // 初始化执行
    // optios 是指令中的变量的解释 其中有一个属性叫做 value
    // dom 表示当前指令作用的 dom 对象
    // dom 认为此时就是图片
    dom.src = dom.src || options.value // 初始化的时候，如果有值则赋值，如果没值，则需要进行默认值赋值
    // 当图片有地址 但是地址没有加载成功的时候 会报错 会触发图片的一个事件 => onerror
    dom.onerror = function() {
      // 当图片出现异常的时候 会指令配置的默认图片设置为该图片的内容
      // dom 可以注册 error 事件
      dom.src = options.value // 这里不能写死
    }
  },
  // 该函数同 inserted 一样是一个钩子函数
  componentUpdated(dom, options) { // 组件一旦更新执行
    // 该钩子函数会在当前指令作用的组件，更新数据完毕后执行
    // inserted 只会执行一次
    // 组件初始化后，一旦更新就不会再次进入 inserted 函数，会进入 componentUpdated
    dom.src = dom.src || options.value
  }
}
// <img v-imagerror="img" />
// data () { return { img: 'a.png' } }
// export default 1
