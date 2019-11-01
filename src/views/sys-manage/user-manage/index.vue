<template>
  <div class="user_manage">
    <div class="top">
      <el-form :model="filterForm" ref="filterForm" :inline="true">
        <el-form-item label="账号">
          <el-input v-model.trim="filterForm.number" size="mini" placeholder="请输入账号"></el-input>
        </el-form-item>
          <el-form-item label="姓名">
          <el-input v-model.trim="filterForm.name" size="mini" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button v-if="$hasPer('查询')" type="primary" @click="initData">查询</el-button>
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
        style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" fixed="left" header-align="center" align="center" width="50"></el-table-column>
        <el-table-column type="index" fixed="left" header-align="center" align="center" width="50" label="序号"></el-table-column>
        <el-table-column prop="account" header-align="center" align="center" label="账号"></el-table-column>
        <el-table-column prop="userName" header-align="center" align="center" label="姓名"></el-table-column>
        <el-table-column prop="userPhone" header-align="center" align="center" label="手机号"></el-table-column>
        <el-table-column prop="userEmail" header-align="center" align="center" label="邮箱"></el-table-column>
        <el-table-column prop="customerId" header-align="center" align="center" label="客户"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <div class="operation">
              <span v-if="$hasPer('编辑')" @click="editForm(scope.row)">
                <img src="../../../assets/images/edit.png" alt="编辑">编辑
              </span>
              <span v-if="$hasPer('删除')" @click="delForm(scope.row.id)">
                <img src="../../../assets/images/delete.png" alt="删除">删除
              </span>
              <span @click="detailForm(scope.row)">
                <img src="../../../assets/images/detail.png" alt="详情">详情
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-form :inline="true" class="footer-btn clearfix">
      <el-form-item>
        <template slot-scope="scope">
          <el-button v-if="$hasPer('新增')" type="primary" @click="addForm(scope.row)">新增</el-button>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button v-if="$hasPer('删除')" type="primary" :disabled="currentRowIds.length===0" @click="delForm(currentRowIds)">删除</el-button>
        </template>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button v-if="$hasPer('修改密码')" type="primary" :disabled="currentRowIds.length===1?false:true" @click="handleReset">修改密码</el-button>
        </template>
      </el-form-item>
      <Pagination class="pageClass"
        :params="params"
        @hanlePage="handleCurrentChange"
        @hanleSize="handleSizeChange">
      </Pagination>
    </el-form>
    <EditUser v-if="editDialog" :dialog.sync="editDialog" @getTableData="getTableData()" :editData="editData"></EditUser>
    <AddUser v-if="addDialog" :dialog.sync="addDialog" @getTableData="getTableData()"></AddUser>
    <UserDetail v-if="detailDialog" :dialog.sync="detailDialog" @getTableData="getTableData()" :editData="editData"></UserDetail>
    <!-- 修改密码弹窗 -->
    <el-dialog
      title="修改密码"
      :visible.sync="editPassword"
      width="30%">
      <el-form :inline="true">
        <el-form-item label="新密码">
          <el-input size="mini" v-model.trim="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click='resetPassword'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mixin from '@/mixin'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import UserDetail from './components/UserDetail'
import { seachUserList, userDelete, resetPassWord } from '@/api/api'

export default {
  mixins: [mixin],
  components: {
    AddUser,
    EditUser,
    UserDetail
  },
  data () {
    return {
      addDialog: false,// 新增弹窗
      editDialog: false,// 编辑弹窗
      detailDialog: false,// 详情弹窗
      editPassword: false,
      password: '',
      passwordID: '',
      filterForm: {
        number: '',
        name: ''
      },
      tableData: [],
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
    // 用户搜索
    initData (page) {
      // let pageNum = 1
      // if (page) {
      //   pageNum = this.params.current
      // }
      // console.log(page, '有吗')
      this.loading = true
      seachUserList({
        page: this.params.current,
        size: this.params.size,
        account: this.filterForm.number,
        userName: this.filterForm.name
      }).then(res => {
        this.tableData = res.data
        this.getPagination(res, page)
        this.loading = false
      })
    },
    getTableData () {
      this.addDialog = false
      this.editDialog = false
      this.detailDialog = false
      this.initData(1)
    },
    // 重置密码窗口
    handleReset () {
      this.editPassword = true
      this.passwordID = this.currentRowIds[0]
    },
    // 重置密码
    resetPassword () {
      resetPassWord({
        id: this.passwordID,
        newPassword: this.password
      }).then(res => {
          this.$message({
            type: 'success',
            message: res
          })
          this.editPassword = false
          this.initData()
          this.$alert(this.password,'初始化密码为', {
          confirmButtonText: '确定'
        })
      })
    },
    addForm (row) {
      this.addDialog = true
    },
    editForm (row) {
      this.editDialog = true
      this.editData = row
    },
    detailForm (row) {
      this.detailDialog = true
      this.editData = row
    },
    delForm (ids) {
      let arr = []
      this.$confirm('删除用户会导致该用户失效','温馨提示：确认删除用户?',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'error'
      }).then(() => {
        if (typeof (ids) === 'string') {
          arr.push(ids)
        } else {
          arr = ids
        }
        userDelete(arr).then(res => {
          this.$message({
            type: 'success',
            message: res
          })
          this.initData()
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：放弃删除用户并离开页面'
            : '温馨提示：停留在当前页面'
        })
      })
    }
  },
  created () {
    this.initData()
  },
  mounted () {
    this.getheihgt()
  }
}
</script>
<style>

</style>
