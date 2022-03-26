<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <el-row type="flex" justify="space-between">
          <!-- 左侧内容 -->
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <!-- 右侧内容 -->
          <el-col :span="4">
            <el-row type="flex" justify="end" align="middle" style="height: 40px">
              <el-col>负责人</el-col>
              <!-- 下拉菜单 -->
              <el-col>
                <el-dropdown>
                  <span>操作
                    <i class="el-icon-arrow-down" />
                  </span>
                  <!-- 下拉选项 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
      <!-- /头部 -->
      <!-- /组织架构内容 -->
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
