<template>
  <div class="log_manage">
    <div class="top">
      <el-form :model="filterForm" ref="filterForm" :inline="true">
          <el-form-item label="操作用户">
          <el-input v-model.trim="filterForm.name" size="mini" placeholder="请输入操作用户"></el-input>
        </el-form-item>
        <!-- <el-form-item label="日志类型" prop="status">
          <el-select size="mini" v-model.trim="filterForm.type" clearable placeholder="-- 请选择 --" @change="getTableData">
            <el-option
              v-for="item in statusOptions"
              :key="item.id"
              :label="item.status"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="btnRight">
          <el-button v-if="$hasPer('查询')" type="primary" @click="getTableData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBackgroundDiv">
      <el-table
        v-loading="loading"
        :data="tableData"
        :height="tableHeight"
        :header-cell-style="headerCalss"
        border
        ref="table"
        size="mini"
        style="width: 100%">
        <el-table-column type="index" fixed="left" header-align="center" align="center" width="50" label="序号"></el-table-column>
        <el-table-column prop="operationUser" header-align="center" align="center" label="操作用户"></el-table-column>
        <!-- <el-table-column prop="operationIp" header-align="center" align="center" label="操作ip"></el-table-column> -->
        <el-table-column prop="requestType" header-align="center" align="center" label="请求方式"></el-table-column>
        <el-table-column prop="targetMethod" header-align="center" align="center" label="目标方法"></el-table-column>
        <!-- <el-table-column header-align="center" align="center" label="日志类型">
          <template slot-scope="scope">
            <span v-if="scope.row.logType === 0" style="color:#20D18B;">正常</span>
            <span v-if="scope.row.logType === 1" style="color:red;">异常</span>
          </template>
        </el-table-column> -->
      </el-table>
    </div>

    <el-form :inline="true" class="footer-btn clearfix">
      <Pagination class="pageClass"
        :params="params"
        @hanlePage="handleCurrentChange"
        @hanleSize="handleSizeChange">
      </Pagination>
    </el-form>
  </div>
</template>
<script>
import mixin from '@/mixin'
import { searchSystemLogs } from '@/api/api'
export default {
  mixins: [mixin],
  data () {
    return {
      addDialog: false,// 新增弹窗
      editDialog: false,// 编辑弹窗
      detailDialog: false,// 详情弹窗
      filterForm: {
        number: '',
        name: ''
      },
      tableData: [],
      // statusOptions: [
      //   {
      //     id: 0,
      //     status: '正常'
      //   },
      //   {
      //     id: 1,
      //     status: '异常'
      //   }
      // ],
      currentRow: [],
      currentRowIds: []// 删除的ids
    }
  },
  methods: {
    // 列表
    // getTableData () {
    //   logController({
    //     page: this.params.current,
    //     size: this.params.size
    //   }).then(res => {
    //     this.tableData = res.data
    //     this.getPagination(res)
    //   })
    // },
    // 日志搜索
    getTableData (page) {
      this.loading = true
      searchSystemLogs({
        operationUser: this.filterForm.name,
        logType: this.filterForm.type,
        page: this.params.current,
        size: this.params.size
      }).then(res => {
        this.tableData = res.data
        this.getPagination(res)
        this.loading = false
      })
    },
    tabHeihgt () {},
    addForm (row) {
      this.addDialog = true
    },
    detailForm (row) {
      this.detailDialog = true
      this.editData = row
    }
  },
  created () {
    this.getTableData()
  },
  mounted () {
    this.getheihgt()
  }
}
</script>
<style>

</style>
