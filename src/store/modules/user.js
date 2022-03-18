import { getToken, setToken, removeToken } from '@/utils/auth' // 从缓存中读取token,将token写入缓存,删除token
import { login } from '@/api/user' // 引入登陆接口
// 状态
const state = {
  token: getToken() // 设置token 为共享状态,初始化vuex的时候，就先从缓存中读取
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
  }
}
const actions = {
  async login(context, data) { // 此处为 actions ,data 为接口所要的参数
    const result = await login(data) // 此处为调用 login api 接口 result 为返回数据 // 拿到 token
    context.commit('setToken', result) // ontext.commit('setToken ')的意思是触发mutations下的setToken函数 // 设置 token
    // 1 调用接口 | 2 成功后给 mutations | 3 mutations同步给缓存 | 4 重新登陆从 缓存中读取值
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
