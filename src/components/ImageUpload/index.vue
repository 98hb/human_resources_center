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
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress :percentage="percent" style="width:180px" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import COS from 'cos-js-sdk-v5' // 引入腾讯云 cos 包
const cos = new COS({
  SecretId: 'AKIDtZ0A3f04sPedLmwqTpuhEUS9ajbCXbOu', // 身份验证 ID
  SecretKey: 'GGzQcYDagW4LK2TeZCZfT0HHzQZS4PTH' // 身份密钥
})
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
      fileList: [],
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录当前正在上传的 uid
      percent: 0, // 记录当前的百分比
      showPercent: false
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
      // console.log(fileList.length)
      this.fileList = fileList.map(item => item)
      // 这里为何暂时不成功讷？ 因为现在还没有上传，所以第二次进来的数据一定是个空的。
      // 如果完成上传动作了，第一次进入和第二次进入的 fileList 的长度应该都是1，应该都有数据
      // 上传成功 => 数据才能进来 => 腾讯云 cos
    },
    beforeUpload(file) {
    //   console.log(file)
      // 先检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        // 如果不存在
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false // 上传 终止
      }
      // 检查文件大小 5M 1M = 1024KB 1KB = 1024B
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        // 超过了限制的文件大小
        this.$message.error('上传的图片大小不能大于5M')
        return false
      }
      // 已经确定当前上传的就是当前的这个 file 了
      // console.log(file)
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    // 进行上传操作
    upload(params) {
      // console.log(params.file)
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'a1img-1304461986', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型，直接默认标准模式即可
          onProgress: (params) => {
            // console.log(params)
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // data 返回数据之后，应该如何处理
          // console.log(err || data)
          // data 中有一个 statusCode === 200 的时候说明上传成功
          if (!err && data.statusCode === 200) {
            // 此时说明文件上传成功，要获取成功的返回地址
            // fileList 才能显示到上传组件上，此时我们要将 fileList 中的数据的url地址变成现在上传成功的地址
            // 目前虽然是一张图片，但是请注意，我们的 fileList 是一个数组
            // 需要知道当前上传成功的是哪一张图片
            this.fileList = this.fileList.map(item => {
              // 去找谁的 uid 等于刚刚记录下来的 id
              if (item.uid === this.currentFileUid) {
                // 将成功的地址赋值给原来的 url 属性
                return { url: 'http://' + data.Location, upload: true }
                // upload 为 true 表示这张图片已经上传完毕，这个属性要为我们后期应用的时候做标记
                // 保存 => 图片有大有小 => 上传速度有快有慢 =>要根据有没有 upload 这个标记来决定是否去保存
              }
              return item
            })
            // 关闭进度条
            // 重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
            // 将上传成功的地址，回写到了 fileList 中，fileList 变化 => upload 组件就会根据 fileList 的变化而去渲染视图
          }
        })
      }
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
  .disabled .el-upload--picture-card {
  display: none;
}
</style>
