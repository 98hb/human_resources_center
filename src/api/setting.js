import request from '@/utils/request'
/**
 * 获取角色的列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
