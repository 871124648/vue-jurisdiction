<template>
  <div class="room-manage">
      <div class="top clearfix">
        <div class="queryInput fl" :class="isShow?'max_line_query':'min_line_query'">
          <el-form :inline="true">
            <el-form-item label="部门名称" prop="beCheckIn">
              <el-select v-model.trim="deptName" placeholder="请选择" clearable size="mini" @change="handleQuery">
                <el-option
                  v-for="item in beCheckInOptions"
                  :key="item.deptName"
                  :label="item.deptName"
                  :value="item.deptName">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="fr">
            <el-button v-if="$hasPer('查询')" type="primary" @click="handleQuery">查询</el-button>
        </div>
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
          style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" fixed="left" header-align="center" align="center" width="50"></el-table-column>
          <el-table-column type="index" header-align="center" align="center" width="50" label="序号"></el-table-column>
          <el-table-column prop="deptName" header-align="center" align="center" label="部门名称"></el-table-column>
          <el-table-column prop="createTime" header-align="center" align="center" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" header-align="center" align="center" label="更新时间"></el-table-column>
          <el-table-column header-align="center" align="center" label="操作" width="240" fixed="right" >
          <template slot-scope="scope">
            <div class="operation">
              <span v-if="$hasPer('编辑')" @click="editForm(scope.row)">
                <img src="../../assets/images/edit.png" alt="编辑">编辑
              </span>
              <span v-if="$hasPer('删除')" @click="delForm(scope.row.id)">
                <img src="../../assets/images/delete.png" alt="删除">删除
              </span>
              <!-- <span @click="detailForm(scope.row)">
                <img src="../../assets/images/detail.png" alt="详情">详情
              </span> -->
            </div>
          </template>
        </el-table-column>
        </el-table>
      </div>
      <el-form :inline="true" class="footer-btn">
        <el-form-item>
          <template slot-scope="scope">
            <el-button v-if="$hasPer('新增')" type="primary" @click="addForm(scope.row)">新增</el-button>
          </template>
        </el-form-item>
        <!-- <el-form-item>
          <el-button v-if="$hasPer('删除')" type="primary" :disabled="currentRowIds.length===0" @click="delForm(currentRowIds)">删除</el-button>
        </el-form-item> -->
        <!-- <el-form-item v-if="$hasPer('导入')">
          <file-upload
            ref="upload"
            :multiple="false"
            :headers="{'Authorization': tokenVal}"
            :post-action="$config.host+'/compose/fileUpload'"
            @input-filter="inputFilter"
            @input-file="inputFile"
          >
            <el-button size="mini" type="primary" @click="$refs.upload.active = true" class="uploadImg pointer" style="font-size: 14px">数据导入</el-button>
          </file-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="$hasPer('导出')" @click="downloadMode()">数据导出</el-button>
        </el-form-item> -->
        <Pagination class="pageClass"
          :params="params"
          @hanlePage="handleCurrentChange"
          @hanleSize="handleSizeChange">
        </Pagination>
      </el-form>
    <EditComponent v-if="editDialog" :dialog.sync="editDialog" @getTableData="getTableData()" :editData="editData"></EditComponent>
    <AddComponent v-if="addDialog" :dialog.sync="addDialog" @getTableData="getTableData()"></AddComponent>
    </div>
</template>
<script>
import mixin from '@/mixin'
import AddComponent from './components/AddComponent'
import EditComponent from './components/EditComponent'
import util from '@/utils/util'
import {branchList, deptPage, branchDelete, batchRoomImport} from 'api/api'
import FileUpload from 'vue-upload-component'
export default {
  mixins: [mixin],
  components: {
    AddComponent,
    EditComponent,
    FileUpload
  },
  data () {
    return {
      tokenVal: sessionStorage.getItem('token'),
      deptName: '', // 部门名称
      addDialog: false,// 新增弹窗
      editDialog: false,// 编辑弹窗
      detailDialog: false,
      treeHeightAll: {},
      tableData: [],
      beCheckInOptions: [],
      currentRow: [],
      currentRowIds: []// 删除的ids
    }
  },
  methods: {
    // 获取前部部门下拉
    branchList () {
      branchList().then(res => {
        this.beCheckInOptions = res
      })
    },
    // 勾选
    handleSelectionChange (rows) {
      this.currentRowIds = rows.map(item => item.id)
      this.currentRow = rows
    },
    addForm (row) {
      this.addDialog = true
    },
    editForm (row) {
      this.editDialog = true
      this.editData = row
      console.log(row,'sdss')
    },
    delForm (rowId) {
      // let arr = []
      this.$confirm('删除部门信息会导致该部门信息失效','温馨提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'error'
      }).then(() => {
        // if (typeof (rowId) === 'string') {
        //   arr.push(rowId)
        // } else {
        //   arr = rowId
        // }
        branchDelete(rowId).then(res => {
          this.$message.success('删除成功！')
          this.getTableData()
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：放弃删除部门信息并离开页面'
            : '温馨提示：停留在当前页面'
        })
      })
    },
    detailForm (row) {
      this.detailDialog = true
      this.editData = row
    },
    getTableData (page) {
      this.loading = true
      deptPage({
        page: this.params.current,
        row: this.params.size,
        deptName: this.deptName
      }).then(res => {
        this.tableData = res.data
        this.getPagination(res,page)
        this.loading = false
      })
    },
    // 自定义上传(导入)
    uploadFile (file) {
      console.log(file.file, '导入')
      let form = new FormData()
      // 后端接受参数 ，可以接受多个参数
      form.append('file', file.file)
      batchRoomImport(form).then(res => {
        this.$message.success('导入成功!')
        this.getTableData()
      })
    },
    inputFilter (newFile, oldFile, prevent) {
      // if (/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
      if (!/\.xl.{1,2}$/i.test(newFile.name)) {
        this.$message.error('请上传正确的文件类型')
        return prevent()
      }
    },
    inputFile (newFile, oldFile) {
      this.$refs.upload.active = true
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        if (!newFile.success) {
          this.$message.error(newFile.response.message)
        } else {
          this.$message.success('导入成功!')
          this.getTableData()
        }
      }
    },
    downloadMode () {
      window.location.href = `${this.$config.host}/pay/room/download_template/public`
    }
  },
  created () {
    this.branchList()
  },
  mounted () {
    this.getheihgt()
    this.$nextTick(() => {
      this.treeHeightAll = {
        height: util.getTableHeight(0.52 , null , null , null, null) + 'px'
      }
    })
    this.getTableData()
  }
}
</script>
<style scoped>
.room-manage .el-form-item__label{
  width: 68px;
}
</style>
