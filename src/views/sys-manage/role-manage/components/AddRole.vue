<template>
  <div id="AddRole">
    <el-dialog title="新增角色" class="wd30" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <el-form-item label="角色编号" prop="roleCode">
          <!-- <el-input size="mini" v-model.trim="form.roleCode" placeholder="请输入角色编号"></el-input> -->
          <el-select size="mini" v-model.trim="form.roleCode" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input size="mini" v-model.trim="form.roleName" placeholder="请输入角色名字"></el-input>
        </el-form-item>
        <el-form-item label="操作权限" prop="userType">
           <div class="tree_box">
             <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              default-expand-all
              :props="defaultProps"
              @check="treeChange">
            </el-tree>
           </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button @click="dialogVisible = false" class="cancel-btn">取 消</button>
        <button type="warning" class="success-btn" @click="submitForm('form')">确 定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { menuAllList, rolesAdd } from '@/api/api'
export default {
  props: ['dialog'],
  components: {
  },
  data () {
    return {
      dialogVisible: true,
      form: {
        roleCode: '',
        roleName: '',
        ids: []
      },
      defaultProps: {
          children: 'children1',
          label: 'menuName'
      },
      lowId: [],
      treeData: [],
      options: [{name: 'ADMIN'}, {name: 'VISITOR'}],
      rules: {
        roleCode: [{required: true, message: '角色编码不能为空', trigger: 'blur'},{ min: 0, max: 20, message: '长度不得超过20', trigger: 'change' }],
        roleName: [{required: true, message: '角色名称不能为空', trigger: 'blur'},{ min: 0, max: 30, message: '长度不得超过20', trigger: 'blur' }]
      }
    }
  },
  watch: {
    dialogVisible () {
      this.$emit('update:dialog', this.dialogVisible)
    }
  },
  methods: {
    // 菜单列表
    menuAllList () {
      menuAllList().then(res => {
        console.log(res)
        this.treeData = res
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          rolesAdd(this.form).then(res => {
            this.$message({
              type: 'success',
              message: res
            })
          })
          setTimeout(() => {
            this.$emit('getTableData')
          },1000)
        } else {
          return false
        }
      })
    },
    getCreateTime (datetime) {
      this.form.createTime = datetime
    },
    addForm () {
    },
    treeChange (data, obj) {
      console.log(data, obj.checkedKeys)
      this.form.ids = obj.checkedKeys
    },
    // 递归
    getDefaultId (data) {
      data.map(item => {
        if (item.children && item.children.length !== 0) { // 有下级，即是父级
          this.getDefaultId(item.children)
        } else { // 无下级
          this.lowId.push(item.name)
          if (item.button) {
            item.children = item.button
          }
        }
      })
      // this.defaultCheckedKeys = this.lowId.filter(info => this.defaultId.indexOf(info) > -1)
    }
  },
  created () {
    this.menuAllList()
  },
  mounted () {
    this.dialogVisible = this.dialog
    // this.getDefaultId(this.treeData)
  }
}
</script>

<style lang="less">
#AddRole{
  .el-input__inner{
    width: 220px;
  }
  .tree_box{
    width: 220px;
    height: 480px;
    border: 1px solid #CFD5D9;
    padding:10px;
    border-radius: 8px;
    overflow-y: auto;
  }
  .el-form-item__label{
    width: 80px;
  }
}
</style>
