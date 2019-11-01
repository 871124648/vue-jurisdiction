<template>
  <div class="room-manage">
      <div class="top clearfix">
        <div class="queryInput fl" :class="isShow?'max_line_query':'min_line_query'">
          <el-form :model="filterForm" ref="filterForm" :inline="true">
            <el-form-item label="题目名称">
              <el-input v-model.trim="filterForm.roomId" size="mini" placeholder="请输入题目名称"></el-input>
            </el-form-item>
            <el-form-item label="选择下拉" prop="beCheckIn">
              <el-select v-model.trim="filterForm.beCheckIn" placeholder="请选择" clearable size="mini">
                <el-option
                  v-for="item in beCheckInOptions"
                  :key="item.id"
                  :label="item.beCheckIn"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="queryBtn fr">
            <button class="border_button" @click="tabHeihgt">{{showTxt}}</button>
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
          <el-table-column prop="id" header-align="center" align="center" label="编号"></el-table-column>
          <el-table-column prop="userName" header-align="center" align="center" label="住户名称"></el-table-column>
          <el-table-column prop="phone" header-align="center" align="center" label="手机号"></el-table-column>
          <el-table-column prop="certificateType" header-align="center" align="center" label="证件类型"></el-table-column>
          <el-table-column prop="certificateNo" header-align="center" align="center" label="证件号码"></el-table-column>
          <el-table-column prop="houseNumber" header-align="center" align="center" label="门牌号"></el-table-column>
          <el-table-column prop="postalAddress" header-align="center" align="center" label="通讯地址"></el-table-column>
          <el-table-column prop="floor" header-align="center" align="center" label="楼层"></el-table-column>
          <el-table-column prop="closeValveDelay" header-align="center" align="center" label="关阀延时"></el-table-column>
          <el-table-column prop="chargeSchemeName" header-align="center" align="center" label="收费方案" width="120"></el-table-column>
          <el-table-column prop="advance" header-align="center" align="center" label="余额"></el-table-column>
          <el-table-column prop="beArrears" header-align="center" align="center" label="是否欠费"></el-table-column>
          <el-table-column prop="beCheckIn" header-align="center" align="center" label="是否入住"></el-table-column>
          <el-table-column header-align="center" align="center" label="操作" width="240" fixed="right" >
          <template slot-scope="scope">
            <div class="operation">
              <span v-if="$hasPer('编辑')" @click="editForm(scope.row)">
                <img src="../../assets/images/edit.png" alt="编辑">编辑
              </span>
              <span v-if="$hasPer('删除')" @click="delForm(scope.row.id)">
                <img src="../../assets/images/delete.png" alt="删除">删除
              </span>
              <span @click="detailForm(scope.row)">
                <img src="../../assets/images/detail.png" alt="详情">详情
              </span>
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
        <el-form-item>
          <el-button v-if="$hasPer('删除')" type="primary" :disabled="currentRowIds.length===0" @click="delForm(currentRowIds)">删除</el-button>
        </el-form-item>
        <el-form-item v-if="$hasPer('导入')">
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
        </el-form-item>
        <Pagination class="pageClass"
          :params="params"
          @hanlePage="handleCurrentChange"
          @hanleSize="handleSizeChange">
        </Pagination>
      </el-form>
    <EditComponent v-if="editDialog" :dialog.sync="editDialog" @getTableData="getTableData()" :editData="editData"></EditComponent>
    <AddComponent v-if="addDialog" :dialog.sync="addDialog" @getTableData="getTableData()"></AddComponent>
    <DetailComponent v-if="detailDialog" :dialog.sync="detailDialog" @getTableData="getTableData()" :editData="editData"></DetailComponent>
    </div>
</template>
<script>
import mixin from '@/mixin'
import AddComponent from './components/AddComponent'
import EditComponent from './components/EditComponent'
import DetailComponent from './components/DetailComponent'
import util from '@/utils/util'
import TreePicker from '@/components/public/TreePicker'
import {pageRoomQuery, roomDelete, batchRoomImport} from 'api/api'
import FileUpload from 'vue-upload-component'
export default {
  mixins: [mixin],
  components: {
    AddComponent,
    EditComponent,
    DetailComponent,
    TreePicker,
    FileUpload
  },
  data () {
    return {
      tokenVal: sessionStorage.getItem('token'),
      filterForm: {
        userName: '',
        phone: '',
        roomId: '',
        houseNumber: '',
        chargeSchemeName: '',
        beCheckIn: ''
      },
      addDialog: false,// 新增弹窗
      editDialog: false,// 编辑弹窗
      detailDialog: false,
      treeHeightAll: {},
      tableData: [],
      beCheckInOptions: [
        {
          id: '是',
          beCheckIn: '是'
        },
        {
          id: '否',
          beCheckIn: '否'
        }
      ],
      treeData: [{
        id: 1,
        label: '部队能源管理系统',
        children: [{
          id: 4,
          label: '厦门',
          children: [{
            id: 9,
            label: '坂头',
            children: [{
              id: 11,
              label: '集中器'
            }]
          }, {
            id: 10,
            label: '灌口'
          }]
        }]
      }],
      currentRow: [],
      currentRowIds: []// 删除的ids
    }
  },
  methods: {
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
      let arr = []
      this.$confirm('删除房间信息会导致该房间信息失效','温馨提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'error'
      }).then(() => {
        if (typeof (rowId) === 'string') {
          arr.push(rowId)
        } else {
          arr = rowId
        }
        roomDelete(arr).then(res => {
          this.$message.success('删除该房间信息成功！')
          this.getTableData()
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：放弃删除房间信息并离开页面'
            : '温馨提示：停留在当前页面'
        })
      })
    },
    detailForm (row) {
      this.detailDialog = true
      this.editData = row
    },
    getTableData (page) {
      let min = this.filterForm.roomId
      if (min !== '' && min !== null) {
        if (!(/^[0-9]+$/.test(min)) || min < 0) {
          this.$message.error('编号必须为正整数')
          return
        }
      }
      this.loading = true
      pageRoomQuery({
        number: this.params.current,
        size: this.params.size,
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
