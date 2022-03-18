import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
import getters from './getters'
// 使用modules 引入 app.js settings.js user.js
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 挂载使用 Vuex
Vue.use(Vuex)
// 定义一个store 对象
const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
