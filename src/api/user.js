import request from '@/utils/request'
/**
 * 登陆接口封装
 */
export function login(data) {
  // return方式 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户资料接口
 */
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/**
 * 根据用户 id 获取用户的详情
 */
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {

}
// import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
