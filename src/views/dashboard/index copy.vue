<template>
  <div class="search-content-box">
    <el-form
      ref="ruleForm"
      :label-width="formdata.labelWidth"
      :inline="formdata.inline"
      class="demo-form-inline"
      :model="formdata"
    >
      <el-form-item
        v-for="(item,index) in formdata.formprops"
        :key="'form'+index"
        :label="item.label"
        :rules="item.required || []"
        :prop="'formprops.' + index + '.value'"
      >
        <!-- input -->
        <el-input
          v-if="item.formtype==='input'"
          v-model="item.value"
          :type="item.type=='textarea'?'textarea':'input'"
          :clearable="item.clearable"
          :style="item.style || ''"
          :class="item.className || ''"
          :size="item.size ||'small' "
          :maxlength="item.maxlength||''"
          :prefix-icon="item.prefix || ''"
          :placeholder="item.placeholder"
          :disabled="item.disabled"
          @keyup.native.enter="search"
          @change="val => {inputChange(val,item.change)}"
        />
        <!-- inputNumber -->
        <el-input-number
          v-else-if="item.formtype==='inputNumber'"
          v-model="item.value"
          :clearable="item.clearable"
          :controls="false"
          :style="item.style || ''"
          :min="1"
          :max="10"
        />
        <!-- select或者远程搜索 -->
        <el-select
          filterable
          v-else-if="item.formtype==='select'"
          v-model="item.value"
          :clearable="item.clearable"
          :remote="item.remote"
          :size="item.size ||'small' "
          :reserve-keyword="item.reserveKeyword"
          :remote-method="item.remoteMethod"
          :multiple="item.multiple"
          :collapse-tags="item.collapseTags"
          :style="item.style || ''"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
           @change="val => {selectChange(val,item.change)}"
          @visible-change="val => {selectVisibleChange(val,item.visibleChange,item.value)}"
        >
          <el-option
            v-for="(selitem,idx) in item.data()"
            :key="idx+'select-s'"
            :label="selitem.label"
            :value="selitem.value"
          />
        </el-select>
        <!-- date -->
        <el-date-picker
          v-else-if="item.formtype==='date'"
          v-model="item.value"
          :clearable="item.clearable"
          :type="item.datetype"
          range-separator="至"
          :size="item.size ||'small' "
          :class="item.datetype == 'daterange'?'cl-change':'cl-nomal'"
          :value-format="item.format"
          :format="item.formatInput ? item.formatInput: ''"
          :placeholder="item.placeholder"
          :start-placeholder="Array.isArray(item.placeholderarr)?item.placeholderarr[0]:''"
          :end-placeholder="Array.isArray(item.placeholderarr)?item.placeholderarr[1]:''"
          :picker-options="item.pickerOptions"
        />
        <!-- cascader级联 -->
        <el-cascader
          v-else-if="item.formtype==='cascader'"
          v-model="item.value"
          :clearable="item.clearable"
          :placeholder="item.placeholder"
          :filterable="item.filterable"
          :options="item.data()"
          :props = item.props||optionProps
          :size="item.size ||'small' "
          :style="item.style || ''"
          @change="val => {handleChange(val,item.change)}"
        >
          <!-- <template slot-scope="{ node, data }">
            <el-tooltip
              :disabled="data.departmentName.length < 11"
              class="item"
              effect="dark"
              :content="data.departmentName"
              placement="top-start"
            >
              <span>{{ hideWords(data.departmentName) }}</span>
            </el-tooltip>
          </template> -->
        </el-cascader>
        <!-- text -->
        <span v-else-if="item.formtype==='text'" :style="item.style || ''" v-html="item.value" />
        <!-- 其他 -->
        <template v-else-if="item.formtype==='render'">
          <expand-dom :column="item" :render="item.render" />
        </template>
        <slot :name="index" />
      </el-form-item>
      <el-form-item v-if="!formdata.bottonflag">
        <el-button
          type="primary"
          class="search-btn"
          size="small"
          icon="el-icon-search"
          @click="search"
        >{{ formdata.btntext }}</el-button>
        <!-- <slot name="last" /> -->
      </el-form-item>
      <el-form-item>
        <slot name="last" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { hideWordsItem } from '@/utils'
export default {
  components: {
    expandDom: {
      functional: true,
      props: {
        render: Function,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {};
        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.render(h, params);
      }
    }
  },
  props: ["formdata"],
  data() {
    return {
     optionProps:{
        value: 'value',
        label: 'label',
        children: 'children',
      },
      arr: {}
    };
  },
  computed: {},
  created() {},
  methods: {
    hideWords(val) {
      return hideWordsItem(val, 15);
    },
    search() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.formdata.formprops.map(item => {
            if (!item.key) {
              return;
            }
            if (Array.isArray(item.key)) {
              if (item.value === null) {
                item.value = [];
              }
              item.key.map((arr, index) => {
                this.arr[item.key[index]] = item.value[index];
              });
            } else {
              if (item.formtype === "cascader" && !item.level) {
                item = JSON.parse(JSON.stringify(item));
                // console.log('单个')
                // this.arr[item.key] = item.value.splice(item.value.length - 1)
                this.arr[item.key] = item.value.length
                  ? [
                      item.value.length,
                      item.value.splice(item.value.length - 1).join()
                    ]
                  : item.value; // 后期可能要传出层级按钮
              } else if (item.formtype === "cascader" && item.level) {
                // console.log('多个')
                item = JSON.parse(JSON.stringify(item));
                this.arr[item.key] = item.value;
              } else {
                // if(item.value == '') {
                //   item.value = null
                // }
                this.arr[item.key] = item.value;
                // console.log('ceshi',  this.arr[item.key])
                // console.log('item.value', item.value)
              }
            }
          });
          this.$emit("searchFn", this.arr);
        } else {
          this.arr = {};
          return false;
        }
      });
      return this.arr;
    },
    filterMethod(val, filter) {
      if (filter) {
        console.log(val, filter, "filter变化");
        return this.$emit("filterMethod", val);
      }
    },
    selectChange(val, change) {
      if (change) {
        console.log(val, change, 'change变化')
        return this.$emit('selectChange', val)
      }
    },
    selectVisibleChange(val, change, item) {
      if (change && !val) {
        return this.$emit("selectVisibleChange", item);
      }
    },
    inputChange(val, change) {
      if (change) {
        return this.$emit("inputChange", val);
      }
    },
    handleChange(val, change) {
      if (change) {
        console.log(val,'val')
        return this.$emit("cascaderChange", val);
      }
    },
  }
};
</script>
<style lang='scss' scoped>
@import "@/styles/base";
.search-content-box {
  // /deep/.el-input__inner {
  //   height: 32px;
  // }
  /deep/ .el-form-item__content{

    .el-date-editor .el-range-separator{
      padding:0px;
    }
  }
  // border-top: solid 1px #efefef;
  // padding-top:24px;
  padding:24px 24px 0 24px;
  background: #fff;
  /deep/ .el-form-item{
    margin-bottom:24px;
  }
  // /deep/ .el-range-editor--small.el-input__inner {
  //   width: 350px;
  // /deep/ .el-range-editor--small.el-input__inner{
  //     width: 330px;
  // }
  .cl-change{
      width: 310px;
  }
}
/deep/.el-form-item__content {
  line-height: 32px;
}

</style>
