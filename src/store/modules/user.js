// action => mutations => state => getters
import { getToken, setToken, removeToken } from '@/utils/auth' // 从缓存中读取token,将token写入缓存,删除token
import { login, getUserInfo, getUserDetailById } from '@/api/user' // 引入登陆接口
// 状态
const state = {
  token: getToken(), // 设置token 为共享状态,初始化vuex的时候，就先从缓存中读取
  userInfo: {} // 这里定义一个空对象 为什么要定义空对象，改 state 必须经过 mutations
  // getters 中 引用 userinfo 的变量,如果设置为 null ，则会引起异常和报错
}
const mutations = { // 同步函数
  // 两个参数 第一个是状态，第二个是载荷 state,pryload
  setToken(state, token) {
    state.token = token // 将数据设置给vuex
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  },
  // 设置用户信息
  setUserInfo(state, result) { // result 就是当前的 state 中的 userInfo
    state.userInfo = result // 这样是响应式
    // state.userInfo = { ...result } // 这样也是响应式 属于浅拷贝
  },
  // 删除用户信息
  removeUserInfo(state) {
    state.userInfo = {}
  }
}
const actions = {
  async login(context, data) { // 此处为 actions ,data 为接口所要的参数
    const result = await login(data) // 此处为调用 login api 接口 result 为返回数据 // 拿到 token
    context.commit('setToken', result) // ontext.commit('setToken ')的意思是触发mutations下的setToken函数 // 设置 token
    // 1 调用接口 | 2 成功后给 mutations | 3 mutations同步给缓存 | 4 重新登陆从 缓存中读取值
  },
  async getUserInfo(context) { // 封装 getUserInfo action
    const result = await getUserInfo() // 调用 getUserInfo 接口 接收返回 的 data
    const baseInfo = await getUserDetailById(result.userId) // 获取用户的详情 用户的详情数据
    context.commit('setUserInfo', { ...result, ...baseInfo }) // 提交到 mutations
    return result // 这里为什么要 return 呢 这里是给我们后期做权限的时候 留下的伏笔
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
