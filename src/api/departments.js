import request from '@/utils/request'
/**
 * 获取组织架构数据
 */
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
/**
 * 根据id删除部门  接口是根据restful的规则设计的   删除 delete  新增 post  修改put 获取 get
 */
export function delDepartments(id) {
  return request({
    url: `/company/department${id}`,
    method: 'delete' // 接口满足 restful 接口规范
    // 同样的地址_不同的方法_执行不同的业务
    // delete 删除业务，post 新增业务，put 修改业务，get 获取业务
  })
}
/**
 * 新增部门
 */
export function addDepartments(data) {
  return request({
    url: '/company/department', // 接口满足 restful 接口规范
    method: 'post', // 接口满足 restful 接口规范
    data
  })
}
