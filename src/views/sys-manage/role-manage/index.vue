<template>
  <div class="user_manage">
    <div class="top">
      <el-form :model="filterForm" ref="filterForm" :inline="true">
        <el-form-item label="角色名称">
          <el-input v-model.trim="filterForm.name" size="mini" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button v-if="$hasPer('查询')" type="primary" @click="initList">查询</el-button>
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
        <!-- <el-table-column type="selection" fixed="left" header-align="center" align="center" width="50"></el-table-column> -->
        <el-table-column type="index" fixed="left" header-align="center" align="center" width="50" label="序号"></el-table-column>
        <el-table-column prop="roleCode" header-align="center" align="center" label="角色编码"></el-table-column>
        <el-table-column prop="roleName" header-align="center" align="center" label="角色名称"></el-table-column>
        <el-table-column prop="createTime" header-align="center" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" header-align="center" align="center" label="修改时间"></el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <div class="operation">
              <span v-if="$hasPer('编辑')" @click="editForm(scope.row)">
                <img src="../../../assets/images/edit.png" alt="编辑">编辑
              </span>
              <span v-if="$hasPer('删除')" @click="delForm(scope.row.id)">
                <img src="../../../assets/images/delete.png" alt="删除">删除
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
      <!-- <el-form-item>
        <template>
          <el-button v-if="$hasPer('删除')" type="primary" :disabled="currentRowIds.length===0" @click="delForm(currentRowIds)">删除</el-button>
        </template>
      </el-form-item> -->
      <Pagination class="pageClass"
        :params="params"
        @hanlePage="handleCurrentChange"
        @hanleSize="handleSizeChange">
      </Pagination>
    </el-form>
    <EditRole v-if="editDialog" :dialog.sync="editDialog" @getTableData="getTableData()" :editData="editData"></EditRole>
    <AddRole v-if="addDialog" :dialog.sync="addDialog" @getTableData="getTableData()"></AddRole>
  </div>
</template>
<script>
import mixin from '@/mixin'
import AddRole from './components/AddRole'
import EditRole from './components/EditRole'
import { searchRole, rolesDelete } from '@/api/api'

export default {
  mixins: [mixin],
  components: {
    AddRole,
    EditRole
  },
  data () {
    return {
      addDialog: false,// 新增弹窗
      editDialog: false,// 编辑弹窗
      detailDialog: false,// 详情弹窗
      filterForm: {
        number: '',
        name: '',
        type: ''
      },
      tableData: [],
      statusOptions: [
        {
          id: '选项1',
          status: '启用'
        },
        {
          id: '选项2',
          status: '禁用'
        }
      ],
      currentRow: [],
      currentRowIds: []// 删除的ids
    }
  },
  methods: {
    // initList () {
    //   rolesList({page: this.params.current, size: this.params.size}).then(res => {
    //     this.tableData = res.data
    //   })
    // },
    // 勾选
    handleSelectionChange (rows) {
      this.currentRowIds = rows.map(item => item.id)
      this.currentRow = rows
    },
    getTableData (form) {
      this.addDialog = false
      this.editDialog = false
      this.detailDialog = false
      if (form === 1) {
        this.initList(1)
      } else {
        this.initList()
      }
    },
    initList (page) {
      this.loading = true
      searchRole({page: this.params.current, size: this.params.size, roleName: this.filterForm.name}).then(res => {
        this.tableData = res.data
        this.getPagination(res, page)
        this.loading = false
      })
    },
    tabHeihgt () {},
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
      // let arr = []
      this.$confirm('删除角色会导致该角色失效','温馨提示：确认删除角色?',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'error'
      }).then(() => {
        // if (typeof (ids) === 'string') {
        //   arr.push(ids)
        // } else {
        //   arr = ids
        // }
        rolesDelete(ids).then(res => {
          this.$message({
            type: 'success',
            message: '删除角色成功!'
          })
          this.initList()
        }).catch(err => {
          this.$message.error(err.response.data.message)
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：放弃删除角色并离开页面'
            : '温馨提示：停留在当前页面'
        })
      })
    }
  },
  created () {
    this.initList()
  },
  mounted () {
    this.getheihgt()
  }
}
</script>
<style>

</style>
