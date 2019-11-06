<template>
  <div class="room-manage">
      <div class="top clearfix">
        <div class="queryInput fl" :class="isShow?'max_line_query':'min_line_query'">
          <el-form :model="filterForm" ref="filterForm" :inline="true">
            <el-form-item label="姓名">
              <el-input v-model.trim="filterForm.staffName" size="mini" placeholder="请输入题目名称"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model.trim="filterForm.staffPhone" size="mini" placeholder="请输入题目名称"></el-input>
            </el-form-item>
            <el-form-item label="部门名称" prop="beCheckIn">
              <el-select v-model.trim="filterForm.deptId" placeholder="请选择" clearable size="mini" @change="handleQuery">
                <el-option
                  v-for="item in beCheckInOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
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
          style="width: 100%">
          <el-table-column type="index" header-align="center" align="center" width="50" label="序号"></el-table-column>
          <el-table-column prop="deptName" header-align="center" align="center" label="所属部门"></el-table-column>
          <el-table-column prop="staffGender" header-align="center" align="center" label="性别"></el-table-column>
          <el-table-column prop="staffName" header-align="center" align="center" label="员工名称"></el-table-column>
          <el-table-column prop="staffPhone" header-align="center" align="center" label="员工号码"></el-table-column>
          <el-table-column prop="staffPosition" header-align="center" align="center" label="职位"></el-table-column>
          <el-table-column prop="staffSalary" header-align="center" align="center" label="薪资"></el-table-column>
          <el-table-column header-align="center" align="center" label="操作" width="240" fixed="right" >
          <template slot-scope="scope">
            <div class="operation">
              <span @click="editForm(scope.row)">
                <img src="../../assets/images/edit.png" alt="编辑">编辑
              </span>
              <span @click="delForm(scope.row.id)">
                <img src="../../assets/images/delete.png" alt="删除">删除
              </span>
            </div>
          </template>
        </el-table-column>
        </el-table>
      </div>
      <el-form :inline="true" class="footer-btn">
        <el-form-item>
          <template slot-scope="scope">
            <el-button type="primary" @click="addForm(scope.row)">新增</el-button>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dialogVisible = true">数据导入</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="downloadMode">数据导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modeChange">模板下载</el-button>
        </el-form-item>
        <Pagination class="pageClass"
          :params="params"
          @hanlePage="handleCurrentChange"
          @hanleSize="handleSizeChange">
        </Pagination>
      </el-form>
    <EditComponent v-if="editDialog" :dialog.sync="editDialog" @getTableData="getTableData()" :editData="editData"></EditComponent>
    <AddComponent v-if="addDialog" :dialog.sync="addDialog" @getTableData="getTableData()"></AddComponent>
    <!-- 数据导入弹窗 -->
    <el-dialog title="选择部门" class="wd35" :visible.sync="dialogVisible">
      <el-form :inline="true">
        <el-form-item label="所属部门" prop="deptId">
          <el-select size="mini" v-model.trim="loadform.deptId" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in certificateTypeOption"
              :key="item.id"
              :label="item.deptName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
                  <!-- :data="{'deptId': loadform.deptId}" -->
        <file-upload
          ref="upload"
          :multiple="false"
          :headers="{'Authorization': tokenVal}"
          :data="{'deptId': loadform.deptId}"
          :post-action="$config.host+'/staff'"
          @input-filter="inputFilter"
          @input-file="inputFile"
        >
          <el-button size="mini" type="primary" @click="$refs.upload.active = true" class="uploadImg pointer" style="font-size: 14px">数据导入</el-button>
          </file-upload>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import mixin from '@/mixin'
import AddComponent from './components/AddComponent'
import EditComponent from './components/EditComponent'
import util from '@/utils/util'
import {staffList, branchList, staffDelete, nameLoad} from 'api/api'
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
      filterForm: {
        staffName: '',
        staffPhone: '',
        deptId: ''
      },
      loadform: {
        deptId: ''
      },
      dialogVisible: false,
      certificateTypeOption: [],
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
        this.certificateTypeOption = res
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
      this.$confirm('删除员工信息会导致该员工信息失效','温馨提示',{
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
        staffDelete(rowId).then(res => {
          this.$message.success('删除成功！')
          this.getTableData()
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：放弃删除员工信息并离开页面'
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
      staffList({
        page: this.params.current,
        row: this.params.size,
        ...this.filterForm
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
      nameLoad(form).then(res => {
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
          this.dialogVisible = false
          this.getTableData()
        }
      }
    },
    downloadMode () {
      window.location.href = `${this.$config.host}/public/staff_list?deptId=${this.filterForm.deptId}&staffName=${this.filterForm.staffName}&staffPhone=${this.filterForm.staffPhone}`
    },
    // 模板下载
    modeChange () {
      window.location.href = `${this.$config.host}/public/staff_template`
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
<style>
.room-manage .el-form-item__label{
  width: 68px;
}
</style>
