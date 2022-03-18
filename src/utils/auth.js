// auth 简单密码认证
import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设置一个独一无二的key

export function getToken() {
  // 从缓存中读取token
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // 将token写入缓存
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // 删除token
  return Cookies.remove(TokenKey)
}
