<template>
  <div class="database_manage">
    <!-- 左侧树形 -->
    <div class="tree_box left_tree_box fl" :style="treeHeightAll">
      <div class="tree_tilte">
        字典分类
        <img src="@/assets/images/add.png" alt="" class="img_add">
      </div>
      <div class="tree_list">
        <el-tree
          :data="treeData"
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :filter-node-method="filterNode"
          @check="dataChang"
          ref="tree">
          <span class="custom-tree-node" slot-scope="{ node, data }" style="font-size:14px;">
            <img v-if="typeof data.num === 'number'" src="@/assets/images/folder.png" alt="" class="tree_img">
            <img v-else src="@/assets/images/file.png" alt="" class="tree_img">
            <span>{{node.label}}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <!-- 右侧查询列表 -->
    <div class="table_box fl">
      <div class="top">
        <el-form :model="filterForm" ref="filterForm" :inline="true">
          <el-form-item label="项目名">
            <el-input v-model.trim="filterForm.number" size="mini" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select size="mini" v-model.trim="filterForm.type" clearable placeholder="-- 请选择 --">
              <el-option
                v-for="item in statusOptions"
                :key="item.id"
                :label="item.status"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btnRight">
            <el-button v-if="$hasPer('查询')" type="primary" @click="handleQuery">查询</el-button>
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
          <el-table-column prop="ID" header-align="center" align="center" label="项目名"></el-table-column>
          <el-table-column prop="beanName" header-align="center" align="center" label="项目值"></el-table-column>
          <el-table-column prop="methodName" header-align="center" align="center" label="Encode"></el-table-column>
          <el-table-column prop="parameter" header-align="center" align="center" label="排序"></el-table-column>
          <el-table-column prop="cronExpression" header-align="center" align="center" label="备注"></el-table-column>
          <el-table-column prop="remark" header-align="center" align="center" label="状态"></el-table-column>
          <el-table-column header-align="center" align="center" label="操作" width="240">
            <template slot-scope="scope">
              <div class="operation">
                <span v-if="$hasPer('编辑')" @click="editForm(scope.row)">
                  <img src="../../assets/images/edit.png" alt="编辑">编辑
                </span>
                <span v-if="$hasPer('删除')" @click="delForm(scope.row)">
                  <img src="../../assets/images/delete.png" alt="删除">删除
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
          <template slot-scope="scope">
            <el-button v-if="$hasPer('删除')" type="primary" :disabled="currentRowIds.length===0" @click="delForm(scope.row)">删除</el-button>
          </template>
        </el-form-item>
        <el-form-item>
          <template slot-scope="scope">
            <el-button type="primary" :disabled="currentRowIds.length===0" @click="handleStart(scope.row)">批量启用</el-button>
          </template>
        </el-form-item>
        <el-form-item>
          <template slot-scope="scope">
            <el-button type="primary" :disabled="currentRowIds.length===0" @click="handleDisabled(scope.row)">批量禁用</el-button>
          </template>
        </el-form-item>
        <Pagination class="pageClass"
          :params="params"
          @hanlePage="handleCurrentChange"
          @hanleSize="handleSizeChange">
        </Pagination>
      </el-form>
    </div>

    <EditComponents v-if="editDialog" :dialog.sync="editDialog" @getTableData="getTableData()" :editData="editData"></EditComponents>
    <AddComponents v-if="addDialog" :dialog.sync="addDialog" @getTableData="getTableData()"></AddComponents>
  </div>
</template>
<script>
import mixin from '@/mixin'
import AddComponents from './components/AddComponents'
import EditComponents from './components/EditComponents'
import util from '@/utils/util'
export default {
  mixins: [mixin],
  components: {
    AddComponents,
    EditComponents
  },
  data () {
    return {
      addDialog: false,// 新增弹窗
      editDialog: false,// 编辑弹窗
      detailDialog: false,// 详情弹窗
      treeHeightAll: {},
      filterForm: {
        number: '',
        name: '',
        type: ''
      },
      tableData: [
        {id: '11', beanName: '李浮尘', methodName: '123574521@qq/com', parameter: '15898745216', cronExpression: '正常', remark: '2019-08-02 11:12:10', status: '异常'},
        {id: '22', beanName: '秦浩瀚', methodName: '478714125@qq/com', parameter: '17759544125', cronExpression: '正常', remark: '2019-08-02 11:12:10', status: '异常'},
        {id: '33', beanName: '王金洋', methodName: '574136987@qq/com', parameter: '13359874152', cronExpression: '正常', remark: '2019-08-02 11:12:10', status: '异常'}
      ],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeData: [{
          id: 1,
          label: '字典管理',
          children: [{
            id: 2,
            label: '字典1'
            }, {
              id: 3,
              label: '字典2'
          }]
        },
        {
          id: 4,
          label: '系统管理',
          children: [{
            id: 5,
            label: '字典3'
            }, {
              id: 6,
              label: '字典4'
          }]
        }],
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
    // 勾选
    handleSelectionChange (rows) {
      this.currentRowIds = rows.map(item => item.id)
      this.currentRow = rows
    },
    getTableData () {
      this.loading = true
      this.loading = false
    },
    handleQuery () {},
    tabHeihgt () {},
    // 批量启动
    handleStart (row) {
       this.$confirm('温馨提示：确认是否启用？',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '启用成功!'
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：已取消操作'
            : '温馨提示：停留在当前页面'
        })
      })
    },
    // 批量禁用
    handleDisabled (row) {
       this.$confirm('温馨提示：确认是否禁用？',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '禁用成功!'
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：已取消操作'
            : '温馨提示：停留在当前页面'
        })
      })
    },
    // 重置密码
    handleReset () {
      if (this.currentRowIds.length > 1) {
        alert(1)
      } else {
        console.log(123)
      }
    },
    addForm (row) {
      this.addDialog = true
    },
    editForm (row) {
      this.editDialog = true
      this.editData = row
    },
    delForm (row) {
      this.$confirm('删除字典数据会导致该字典数据失效','温馨提示：确认删除字典数据?',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'error'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除字典数据成功!'
        })
      }).catch(action => {
        this.$message({
          type: 'info',
          message: action === 'cancel'
            ? '温馨提示：放弃删除字典数据并离开页面'
            : '温馨提示：停留在当前页面'
        })
      })
    },
     // 过滤节点
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 选中时触发
    dataChang (obj, node) {
      console.log(node.checkedKeys)
    },
    // 实现递归数据重组,标记层级
    getDefaultId (data,treeDex) {
      data.map((item, dex) => {
        if (item.children) {
          if (typeof treeDex === 'number') {
            treeDex += 1
            item.num = treeDex
          } else {
            treeDex = 0
            item.num = 0
          }
          this.getDefaultId(item.children,treeDex)
        } else {
          console.log(data,'??')
        }
      })
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  created () {
    this.getDefaultId(this.treeData)
  },
  mounted () {
    this.$nextTick(() => {
      this.treeHeightAll = {
        height: util.getTableHeight(0.52 , null , null , null, null) + 'px'
      }
    })
    this.getheihgt()
  }
}
</script>
<style lang="less">
.database_manage{
  .tree_img{
    width: 16px;
    height: 13px;
    position: relative;
    top:1px;
    margin-right: 2px;
  }
  .tree_tilte{
    position: relative;
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    border-bottom: 1px solid #ECECEC;
  }
  .img_add{
    position: absolute;
    top:12px;
    right: 12px;
    width:20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>
