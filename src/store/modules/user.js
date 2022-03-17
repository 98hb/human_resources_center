// 从缓存中读取token,将token写入缓存,删除token
import { getToken, setToken, removeToken } from '@/utils/auth'
// 状态
const state = {
  token: getToken // 设置token 为共享状态,初始化vuex的时候，就先从缓存中读取
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
const actions = {}
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {}
}
