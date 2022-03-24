## 业务模块页面的快速搭建

### 新建模块的页面和路由文件



~~~bash
├── dashboard           # 首页
├── login               # 登录
├── 404                 # 404
├── departments         # 组织架构
├── employees           # 员工
├── setting             # 公司设置
├── salarys             # 工资
├── social              # 社保
├── attendances         # 考勤
├── approvals           # 审批
├── permission          # 权限管理
~~~

###**快速新建文件夹**

~~~bash
$ mkdir departments employees setting salarys social attendances approvals permission
~~~

###**员工**

~~~bash
<template>
  <div class="dashboard-container">
    <div class="app-container">
      <h2>
        员工
      </h2>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

~~~

###路由模块目录结构

~~~bash
├── router               # 路由目录
 ├── index.js            # 路由主文件
 ├── modules             # 模块目录
  ├── departments.js     # 组织架构
  ├── employees.js       # 员工 
  ├── setting.js         # 公司设置
  ├── salarys.js         # 工资
  ├── social.js          # 社保
  ├── attendances.js     # 考勤
  ├── approvals.js       # 审批
  ├── permission.js      # 权限管理
~~~

###快速创建命令

~~~bash
$ touch departments.js employees.js setting.js salarys.js salarys.js social.js attendances.js approvals.js permission.js
~~~

