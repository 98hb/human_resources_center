<!--  -->
<template>
  <!-- 放置弹层组件 -->
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单数据 label-width 设置标题的宽度 -->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployessSimple">
          <!-- 需要循环生成选项，这里做一下简单的处理，显示的是用户名，存的也是用户名 -->
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- /表单数据 -->
    <!-- 确定和消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
    <!-- /确定和消息 -->
  </el-dialog>
<!-- /放置弹层组件 -->
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { getDepartments, addDepartments, getDepartDetail } from '@/api/departments'
import { getEmployessSimple } from '@/api/employees'
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
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 这里存放数据
    const checkNameRepeat = async(rule, value, callback) => { // 检查部门名称是否重复
      // value 是部门名称，要去和统计部门下的部门去比较，有没有相同的，
      // 有相同的不能过去(统计部门不能有重复的名字)
      // 不相同就可以过去
      const { depts } = await getDepartments() // 去找统计部门下，有没有和 value 相同的数据 // 找到所有同级部门的子部门
      //   debugger
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value) // 如果 isRepeat 为 true 表示找到一样的名字
      isRepeat ? callback(new Error(`同级别部门下已经存在这个${value}的部门了`)) : callback() // 有返回什么 没有返回什么
    }
    const checkCodeRepeat = async(rule, value, callback) => { // 检查编码重复
      const { depts } = await getDepartments() // 先要获取最新的阻止架构数据
      const isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value 不为空，因为我们的部门有可能没有 code
      isRepeat ? callback(new Error(`阻止架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: { // 定义一个表单数据
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: { // 校验规则 {key: 数组}
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          { trigger: 'blur',
            validator: checkNameRepeat
          }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur' },
          { trigger: 'blur',
            validator: checkCodeRepeat
          }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍长度为1-300个字符', trigger: 'blur' }]
      },
      peoples: []
    }
  },
  // 监听属性 类似于data概念
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  // 监控data中的数据变化
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
    async getEmployessSimple() {
      this.peoples = await getEmployessSimple()
    },
    // 获取详情方法
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id) // 因为我们是父组件调用子组件的方法，先设置了 node 数据，直接调用方法。props 传值是异步的
    },
    btnOK() {
      // 手动校验表单
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          // 表单校验通过
          // 这里我们将 ID 设成了我的 pid
          await addDepartments({ ...this.formData, pid: this.treeNode.id })
          // 告诉父组件
          this.$emit('addDepts') // 触发一个自定义事件
          // 此时应该去修改 showDialog 值
          // update: props 名称
          // this.$emit('changeDialog', false)
          this.$emit('update:showDialog', false)
          // 关闭 dialog 的时候会触发 el-dialog的 close 事件，所以这里不需要再单独重置数据了
        }
      })
    },
    btnCancel() {
      // 重置数据，因为 resetFields 只能重置表单上的数据，非表单上的比如 编辑中的 id 不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      // 关闭弹层
      this.$emit('update:showDialog', false)
      // 清除之前的校验，可以重置数据，只能重置定义在 data 中的数据
      this.$refs.deptForm.resetFields()
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>

</style>
