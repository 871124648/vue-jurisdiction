<template>
  <div id="EditRole">
    <el-dialog title="编辑角色" class="wd30" :visible.sync="dialogVisible">
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
              :check-strictly="isCheckParent"
              node-key="id"
              default-expand-all
              :props="defaultProps"
              :default-checked-keys="checkArr"
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
import { menuAllList, rolesEdit } from '@/api/api'
export default {
  props: ['dialog', 'editData'],
  components: {
  },
  data () {
    return {
      isCheckParent: true,
      dialogVisible: true,
      checkArr: [],
      form: {
        id: null,
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
        roleCode: [{required: true, message: '角色编码不能为空', trigger: 'blur'},{ min: 0, max: 20, message: '长度不得超过20', trigger: 'blur' }],
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
        this.treeData = res
        // 编辑时显示的父子节点不能做关联,赋值之后解除关联,选中子节点id需要父节点的id
        this.isCheckParent = false
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          rolesEdit(this.form).then(res => {
            console.log(res, '+++')
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
    this.form.id = this.editData.id
    this.form.roleCode = this.editData.roleCode
    this.form.roleName = this.editData.roleName
    this.form.ids = this.editData.selectMenus
    this.checkArr = this.editData.selectMenus
    // 返回的id会造成精度问题，不能直接eval转数组,先截取后转
    // let checkArr = this.editData.selectMenus.substring(1, this.editData.selectMenus.length - 1)
    // 一定要看清楚有没有空格！！！
    // this.checkArr = checkArr.split(', ')
    // console.log(this.checkArr, '条数')
    this.menuAllList()
  },
  mounted () {
    this.dialogVisible = this.dialog
    // this.getDefaultId(this.treeData)
  }
}
</script>

<style lang="less">
#EditRole{
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
