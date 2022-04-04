<!--  -->
<template>
  <upload-excel :on-success="success" />
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { importEmployee } from '@/api/employees'
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
    async success({ header, results }) {
      // debugger
      // header，results 中的数据是中文
      // 新增的员工的属性是一致的
      // username: '', 姓名
      // mobile: '', 手机号
      // formOfEmployment: '',
      // workNumber: '', 工号
      // departmentName: '',
      // timeOfEntry: '', 入职日期
      // correctionTime: '' 转正日期
      // debugger
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      // var arr = []
      // results.forEach(item => {
      //   Object.keys(item).forEach(key => {
      //     var userInfo = {}
      //     // 现在 key 是中文
      //     userInfo[userRelations[key]] = item[key] // 将原来中文对应的值赋值给原来英文对应的值
      //   })
      //   arr.push(userInfo)
      //   // console.log(Object.keys(item))
      // })
      var newArr = results.map(item => {
        var userInfo = {}
        Object.keys(item).forEach(key => {
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            // 后端接口限制了不能是字符串，要求转换时间类型
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/')) // 只有这样才能存入数据库
          } else {
            userInfo[userRelations[key]] = item[key] // 将原来中文对应的值赋值给原来英文对应的值
          }
        })
        return userInfo
      })
      // console.log(newArr)
      await importEmployee(newArr) // 接收一个数组
      this.$message.success('导入 excel 成功')
      this.$router.back() // 回到上一个页面
    },
    formatDate(numb, format) { // 转化 excel 的日期格式
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>

</style>
