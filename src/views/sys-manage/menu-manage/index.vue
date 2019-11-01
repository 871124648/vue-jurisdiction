<template>
  <div class="user_manage">
    <div class="top">
      <el-form :model="filterForm" ref="filterForm" :inline="true">
        <el-form-item label="菜单名称">
          <el-input v-model.trim="filterForm.menuName" size="mini" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-select v-model="filterForm.menuType" placeholder="请选择" size="mini" clearable>
            <el-option
              v-for="item in options"
              :key="item.val"
              :label="item.name"
              :value="item.val">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" @click="menuList" v-if="$hasPer('查询')">查询</el-button>
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
        <el-table-column prop="menuName" header-align="center" align="center" label="菜单名称"></el-table-column>
        <el-table-column prop="menuNmae" header-align="center" align="center" label="菜单logo">
          <template slot-scope="scope">
            <img v-if="scope.row.menuLogo" :src="scope.row.menuLogo" alt="" class="menu_logo">
          </template>
        </el-table-column>
        <el-table-column prop="beanName" header-align="center" align="center" label="菜单类型">
          <template slot-scope="scope">
            <span v-if="scope.row.menuType === 0">菜单</span>
            <span v-if="scope.row.menuType === 1">按钮</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="上级菜单" min-width="130">
          <template slot-scope="scope">
            <!-- <span>{{parentMenuList}}</span> -->
             <!-- v-show="lis.id === scope.row.menuParentId" -->
              <span v-for="(lis,dex) in parentMenuList" :key="dex" v-show="lis.id == scope.row.menuParentId">{{lis.menuName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" header-align="center" align="center" label="菜单URL" min-width="170"></el-table-column>
        <el-table-column prop="createTime" header-align="center" align="center" label="创建时间" min-width="140"></el-table-column>
        <el-table-column prop="updateTime" header-align="center" align="center" label="修改时间" min-width="140"></el-table-column>
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
          <el-button type="primary" @click="addForm(scope.row)" v-if="$hasPer('新增')">新增</el-button>
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
    <EditMenu v-if="editDialog" :dialog.sync="editDialog" @getTableData="getTableData()" :editData="editData"></EditMenu>
    <AddMenu v-if="addDialog" :dialog.sync="addDialog" @getTableData="getTableData()"></AddMenu>
  </div>
</template>
<script>
import mixin from '@/mixin'
import AddMenu from './components/AddMenu'
import EditMenu from './components/EditMenu'
import { menuDelete, seachMenuList, childMenu } from '@/api/api'
export default {
  inject: ['reload'],
  mixins: [mixin],
  components: {
    AddMenu,
    EditMenu
  },
  data () {
    return {
      addDialog: false,// 新增弹窗
      editDialog: false,// 编辑弹窗
      detailDialog: false,// 详情弹窗
      filterForm: {
        menuName: '',
        menuType: ''
      },
      options: [
       {name: '菜单', val: 0}, {name: '按钮', val: 1}
      ],
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
      parentMenuList: null,
      currentRow: [],
      currentRowIds: []// 删除的ids
    }
  },
  methods: {
    // 搜索
    menuList (page) {
      this.loading = true
      this.childMenu()
      console.log('是否有page', page)
      seachMenuList({
        menuName: this.filterForm.menuName,
        menuType: this.filterForm.menuType,
        page: this.params.current,
        size: this.params.size
        }).then(res => {
         this.tableData = res.data
         this.getPagination(res, page)
         this.loading = false
      })
    },
    // 获取上级菜单
    childMenu () {
      childMenu().then(res => {
        this.parentMenuList = res
      })
    },
    // 勾选
    handleSelectionChange (rows) {
      this.currentRowIds = rows.map(item => item.id)
      this.currentRow = rows
    },
    getTableData (form) {
      this.addDialog = false
      this.editDialog = false
      this.detailDialog = false
      // 分页触发才传1
      if (form === 1) {
        this.menuList(1)
      } else {
         this.menuList()
      }
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
      this.$confirm('删除菜单会导致该菜单失效','温馨提示：确认删除菜单?',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'error'
      }).then(() => {
        menuDelete(ids).then(res => {
          this.$message({
            type: 'success',
            message: '删除菜单成功!'
          })
          // 重新刷新菜单列表
          let menuData = [{
            name: '首页',
            url: '/main'
          }]
          menuData = menuData.concat(res)
          this.$session.set('userAuthorities', menuData)
          // this.reload()
          this.menuList(1)
        }).catch(err => {
          this.$message.error(err.response.data.message)
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：放弃删除菜单并离开页面'
            : '温馨提示：停留在当前页面'
        })
      })
    }
  },
  created () {
    console.log('加载', this.loading)
    this.menuList()
  },
  mounted () {
    this.getheihgt()
  }
}
</script>
<style>
/* .el-form-item__label{
  color: red \9\0;
} */
</style>
