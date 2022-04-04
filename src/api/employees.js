import request from '@/utils/request'
/**
 * 获取员工的简单列表
 */
export function getEmployessSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 获取员工综合列表
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user/',
    params
  })
}
/**
 * 删除员工的请求接口
 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/**
 * 新增员工的接口
 */
export function addEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/',
    data
  })
}
/**
 * 封装一个导入员工的接口
 */
export function importEmployee(data) {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    data
  })
}
