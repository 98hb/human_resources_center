// 导出员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/employees', // 路由地址 /employees
  name: 'employees', // 给模块的一级路由加一个 name 属性，这个属性我们后面会做权限的时候用到
  component: Layout,
  children: [{
    // 二级路由的 path 什么都不用写的时候，此时它表示二级路由的默认路由
    path: '', // 这里不用写，什么都不用写表示 /employees 不但有布局 layout => 员工主页
    component: () => import('@/views/employees'),
    // 路由元信息，其实就是一个存储数据的地方，可以放任何内容
    meta: {
      title: '员工管理', // 这里为什么要用 title ，因为左侧导航读取了这里的 title 属性。
      icon: 'people'
    }
  },
  {
    path: 'detail/:id', // /employeess/detail/123 123是id，/employeess/detail 需要＋ ?有无 id 都可以进入
    component: () => import('@/views/employees/detail'),
    meta: '员工详情',
    hidden: true // 表示该内容不在左侧菜单显示

  },
  {
    path: 'print/:id',
    component: () => import('@/views/employees/print'),
    hidden: true,
    meta: {
      title: '员工打印'
    }
  }]
}
