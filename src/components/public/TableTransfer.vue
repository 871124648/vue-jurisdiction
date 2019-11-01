<template>
  <div>
    <el-col :span="11">
      <el-table :data="leftTableData" border ref="table" @selection-change="checkAll" style="width: 100%">
            <el-table-column type="selection" width="30"></el-table-column>
              <el-table-column prop="assetName" label="资产名称"></el-table-column>
              <el-table-column prop="assetCode" label="资产编码"></el-table-column>
              <el-table-column prop="assetCatName" label="资产类型" ></el-table-column>
        </el-table>
    </el-col>
    <el-col :span="2">
      <div class="opSetting">
        <div @click="handelSelect">
          <el-button icon="el-icon-d-arrow-right" :disabled="nowSelectData.length?false:true" :size="buttonSize" type="primary" >
              选中
          </el-button>
        </div>
        <div class="spacing" @click="handleRemoveSelect">
          <el-button icon="el-icon-d-arrow-left" :disabled="nowSelectRightData.length?false:true" :size="buttonSize" type="primary">
            取消
          </el-button>
        </div>
      </div>
    </el-col>

    <el-col :span="11">
         <el-table :data="selectArr" border ref="selection" @selection-change="checkRightAll" style="width: 100%">
            <el-table-column type="selection" width="30"></el-table-column>
              <el-table-column prop="assetName" label="资产名称"></el-table-column>
              <el-table-column prop="assetCode" label="资产编码"></el-table-column>
              <el-table-column prop="assetCatName" label="资产类型" ></el-table-column>
        </el-table>
    </el-col>

  </div>
</template>
<script>
export default {
  props: ['tableData','tableDefaultId'],
  data () {
    return {
      selectArr: [], // 右边列表
      buttonSize: 'large',
      // options: [],
      // value: '',
      leftTableData: [],// 左侧列表
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [] // 右边选中列表数据
    }
  },
  watch: {
    tableData () {
      this.$nextTick(res => {
        if (this.tableDefaultId) {
          this.tableDefaultId.forEach(ids => {
            this.$refs.table.toggleRowSelection(this.tableData.find((data,index) => {
                return data.assetCode === ids
              }), true) // 设置默认选中
          })
          // 获取默认选中，手动穿梭到右边表格
          this.handelSelect()
        }
      })
    }
  },
  methods: {
    checkAll (val) {
      this.nowSelectData = val.filter(item => item)
      console.log('左侧选中--', this.nowSelectData)
    },
    checkRightAll (val) {
      this.nowSelectRightData = val
    },
    // 选中
    handelSelect () {
      this.selectArr = this.handleConcatArr(this.selectArr, this.nowSelectData)
      this.handleRemoveTabList(this.nowSelectData, this.leftTableData)
      this.nowSelectData = []
   },
    // 取消
    handleRemoveSelect () {
      this.leftTableData = this.handleConcatArr(this.leftTableData, this.nowSelectRightData)
      this.handleRemoveTabList(this.nowSelectRightData, this.selectArr)
      this.nowSelectRightData = []
    },
    handleConcatArr (selectArr, nowSelectData) {
      let arr = []
      arr = arr.concat(selectArr, nowSelectData)
      console.log('合并数组---', arr)
      return arr
    },
    handleRemoveTabList (isNeedArr, originalArr) {
      if (isNeedArr.length && originalArr.length) {
         for (let i = 0; i < isNeedArr.length; i++) {
            for (let k = 0; k < originalArr.length; k++) {
              if (isNeedArr[i]['id'] === originalArr[k]['id']) {
                originalArr.splice(k, 1)
              }
            }
         }
      }
    }
  },
  mounted () {
    console.log('左侧数据---', this.tableData)
    // this.nowSelectData = this.tableDefaultId
    this.leftTableData = this.tableData
  }

}
</script>
<style>
  .opSetting{
    text-align: center;
    margin-top:30px;
  }
  .spacing{
    margin-top:10px;
  }
</style>

