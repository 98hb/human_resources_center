<!--  -->
<template>
  <div>
    <!-- 给 action 一个 # 就不会报错 -->
    <!-- file-list 是上传的文件列表，可以绑定到上传组件上，让上传组件来显示 -->
    <el-upload list-type="picture-card" :limit="1" action="#" :on-preview="preview" :file-list="fileList">
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
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
  props: {},
  data() {
    // 这里存放数据
    return {
      fileList: [{ url: 'https://img1.baidu.com/it/u=1406801134,3159244927&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313' }],
      showDialog: false,
      imgUrl: ''
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
    // 点击预览事件
    preview(file) {
    //   console.log(file.url)
      this.imgUrl = file.url
      this.showDialog = true
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>

</style>
