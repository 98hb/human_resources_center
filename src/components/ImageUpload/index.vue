<!--  -->
<template>
  <div>
    <!-- 给 action 一个 # 就不会报错 -->
    <!-- file-list 是上传的文件列表，可以绑定到上传组件上，让上传组件来显示 -->
    <!-- upload 组件显示的是 file-list -->
    <el-upload
      list-type="picture-card"
      action="#"
      :limit="1"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :class="{ disabled : fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" style="width:100%" alt="">
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
      fileList: [{ url: 'https://t7.baidu.com/it/u=3676218341,3686214618&fm=193&f=GIF' }],
      showDialog: false,
      imgUrl: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
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
    // 点击预览事件
    preview(file) {
    //   console.log(file.url)
      this.imgUrl = file.url
      this.showDialog = true
    },
    // file 是要删除的文件
    // fileList 是删过之后的文件
    handleRemove(file, fileList) {
    //   console.log(file)
    //   console.log(fileList)
    //   console.log(this.fileList)
      this.fileList = this.fileList.filter(item => item.uid !== file.uid) // 将当前的删除文件排除在外
    //   this.fileList = fileList
    },
    // 不能用 push 这个钩子会执行多次
    changeFile(file, fileList) {
    //   console.log(file)
    //   console.log(fileList)
      this.fileList = fileList.map(item => item)
      // 这里为何暂时不成功讷？ 因为现在还没有上传，所以第二次进来的数据一定是个空的。
      // 如果完成上传动作了，第一次进入和第二次进入的 fileList 的长度应该都是1，应该都有数据
      // 上传成功 => 数据才能进来 => 腾讯云 cos
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
  .disabled .el-upload--picture-card {
  display: none;
}
</style>
