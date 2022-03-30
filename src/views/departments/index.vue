<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容 -->
      <!-- 头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!-- el-tree -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入插槽内容且循环遍历节点 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 data 每个节点的数据对象 -->
          <!-- data, node 要 data -->
          <tree-tools slot-scope="{ data }" :tree-node="data" @addDepts="addDepts" @editDepts="editDepts" @delDepts="getDepartments" />
        </el-tree>
        <!-- /el-tree -->
      </el-card>
      <!-- /头部 -->
      <!-- /组织架构内容 -->
    </div>
    <!-- 放置新增弹层组件 -->
    <!-- <add-dept :show-dialog="showDialog" :tree-node="node" @changeDialog="test" @addDepts="getDepartments" /> -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @changeDialog="test" @addDepts="getDepartments" />
    <!-- /放置新增弹层组件 -->
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import AddDept from './components/add-dept.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
export default {
  components: { TreeTools, AddDept },
  data() {
    return {
      company: { }, // 头部的数据结构
      departs: [],
      defaultProps: {
        label: 'name', // 表示从这个属性显示内容
        children: 'children' // 从这个属性去找子节点
      },
      showDialog: false, // 默认不显示弹层
      node: null // 记录当前点击的节点
    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      // export function tranListToTreeData(list, rootValue) {}
      this.departs = tranListToTreeData(result.depts, '') // 需要将其转化成树形结构
      console.log(result)
    },
    // 监听 tree-tools 中触发的点击添加子部门的事件
    // node 是我们点击的部门
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
    },
    test(value) {
      this.showDialog = value
    },
    editDepts(node) {
      this.showDialog = true // 弹出层
      this.node = node
      // 应该在这里调用获取部门详情的方法
      // console.log(this.$refs.addDept)
      this.$refs.addDept.getDepartDetail(node.id)
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
