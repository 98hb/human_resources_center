<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入插槽内容且循环遍历节点 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 data 每个节点的数据对象 -->
          <!-- data, node 要 data -->
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
        <!-- /el-tree -->
      </el-card>
      <!-- /头部 -->
      <!-- /组织架构内容 -->
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
  components: { TreeTools },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }, // 头部的数据结构
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' }, { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name', // 表示从这个属性显示内容
        children: 'children' // 从这个属性去找子节点
      }
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
