<!--  -->
<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" />
        <!-- 放置一个树形组件 -->
        <el-tree v-if="showTree" v-loading="loading" :data="treeData" :props="{ label: 'name' }" :default-expand-all="true" @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer 插槽 -->
    <template v-slot:footer>
      <!-- <el-row slot="footer" type="flex" justify="center"> -->
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
// import引入的组件需要注入到对象中才能使用
  name: '',
  components: {},
  // props可以用数组来接收数据 也可以用对象来接收
  // props: {   props属性: {  配置选项 }  }
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 这里存放数据
    return {
      // 定义表单数据
      EmployeeEnum,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, { min: 1, max: 4, message: '用户姓名为1-4位' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
        // pattern 正则表达式，如果满足，就通过校验，如果不满足，不通过。
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }], // 这里为什么要设置它为 change 呢
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }],
        correctionTime: ''
      },
      treeData: [], // 定义一个数组来接收树形结构
      showTree: false, // 默认不显示树形组件
      loading: false // 加上一进度条
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化.
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  // 方法集合
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments() // depts 是一个数组，它需要转化成树形结构，才可以被 el-tree 显示
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    selectNode(node) {
      // console.log(arguments)
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOK() {
      // 校验表单
      try {
        await this.$refs.addEmployee.validate()
        // 校验成功
        await addEmployee(this.formData) // 调用新增接口
        // 通知父组件，更新数据
        this.$parent.getEmployeeList && this.$parent.getEmployeeList() // 父组件的实例 // 直接调用父组件的更新方法：获取员工综合列表
        this.$parent.showDialog = false
        // 这里不用重置数据，因为关闭弹窗触发了 close 事件，close 事件绑定了 btnCancel 方法
        // console.log(this.$parent)
      } catch (error) {
        console.log(error)
      }
      this.$refs.addEmployee.validate()
    },
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields() // 移出之前的校验
      this.$emit('update:showDialog', false)
      // update: prop 名称，这么写的话，可以在父组件，直接用 sync 修饰符处理
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>

</style>
