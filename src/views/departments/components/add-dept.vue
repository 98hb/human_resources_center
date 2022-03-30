<!--  -->
<template>
  <!-- 放置弹层组件 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单数据 label-width 设置标题的宽度 -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-50个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- /表单数据 -->
    <!-- 确定和消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </el-col>
    </el-row>
    <!-- /确定和消息 -->
  </el-dialog>
<!-- /放置弹层组件 -->
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

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
      formData: { // 定义一个表单数据
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: { // 校验规则 {key: 数组}
        // 是
      }
    }
  },
  // 监听属性 类似于data概念
  computed: {},
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

  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style  scoped>

</style>
