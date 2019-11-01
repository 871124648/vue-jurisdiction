<template>
  <div id="UserDetail" class="userManage">
    <el-dialog title="用户详情" class="wd1050" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <el-form-item label="账户" prop="account">
          <el-input size="mini" v-model.trim="form.account" placeholder="请输入账户" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input size="mini" v-model.trim="form.userName" placeholder="请输入姓名" disabled></el-input>
        </el-form-item>
        <!-- <el-form-item label="密码" prop="accountPassword">
          <el-input size="mini" v-model.trim="form.accountPassword" placeholder="6-12位数字加字符组合"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="passwordAffirm">
          <el-input size="mini" v-model.trim="form.passwordAffirm" placeholder="与【密码】输入值一致"></el-input>
        </el-form-item> -->
        <el-form-item label="客户" prop="customerId">
          <el-select v-model="form.customerId" placeholder="请选择" size="mini" disabled>
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.customerName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input size="mini" v-model.trim="form.userPhone" placeholder="请输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input size="mini" v-model.trim="form.userEmail" placeholder="请输入" disabled></el-input>
        </el-form-item>
      </el-form>
      <div class="transfer_box">
        <el-transfer v-model="roleName" :data="roleData" :titles="['所有角色','已选角色']" @left-check-change="checkBtn" @change="checkChange"></el-transfer>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { userCustomer, listRole, userEdit } from '@/api/api'

export default {
  props: ['dialog', 'editData'],
  components: {Treeselect},
  data () {
    let passwordAffirm = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次确认密码'))
      } else {
        if (value !== this.form.accountPassword) {
          return callback(new Error('请与输入的【密码】一致'))
        } else {
          callback()
        }
      }
    }
    return {
      dialogVisible: true,
      roleData: [],
      roleName: [],
      options: [], // 客户列表
      passwordAffirm: '',
      form: {
        account: '',
        userName: '',
        customerId: null,
        userPhone: '',
        userEmail: '',
        roleId: null
      },
      rules: {
        account: [{required: true, message: '账户不能为空', trigger: 'blur'}],
        userName: [{required: true, message: '名字不能为空', trigger: 'blur'}],
        accountPassword: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        customerId: [{required: true, message: '客户不能为空', trigger: 'change'}],
        passwordAffirm: [{validator: passwordAffirm, trigger: 'blur'}]
      }
    }
  },
  computed: {
  },
  watch: {
    dialogVisible () {
      this.$emit('update:dialog', this.dialogVisible)
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.roleName.length === 0) {
            this.$message.error('请选择角色！')
            return
          }
          this.form.roleId = this.roleName[0]
          userEdit(this.form).then(res => {
            this.$message({
              type: 'success',
              message: res
            })
            this.$emit('getTableData')
          })
        } else {
          return false
        }
      })
    },
    getCreateTime (datetime) {
      this.form.createTime = datetime
    },
    // 选中穿梭框的左侧
    checkBtn (e, key) {
      console.log(e, key)
      let len = this.roleData.length
      // 判断单选
      if (e.length === 0) {
        for (let i = 0; i < len; i++) {
          this.roleData[i].disabled = false
        }
      } else {
        for (let i = 0; i < len; i++) {
          if (this.roleData[i].key === key[0]) {
            this.roleData[i].disabled = false
          } else {
            this.roleData[i].disabled = true
          }
        }
      }
    },
    checkChange (val, direction, key) {
      console.log(val, direction, key)
      if (direction === 'left') {
        let len = this.roleData.length
        for (let i = 0; i < len; i++) {
          this.roleData[i].disabled = false
        }
      }
    },
    // 客户列表
    customerList () {
      userCustomer().then(res => {
        this.options = res
      })
    },
    // 角色列表
    roleList () {
      listRole().then(res => {
        this.roleData = []
        res.map(item => {
          this.roleData.push({
            key: item.id,
            label: item.roleName,
            disabled: true
          })
        })
        // 如果是修改要传值给穿梭框
        this.roleName.push(this.editData.roleId.toString())
      })
    }
  },
  created () {
    this.form = this.editData
    this.customerList()
    this.roleList()
  },
  mounted () {
    this.dialogVisible = this.dialog
  }
}
</script>

<style>
@import './style/style.css';
#UserDetail .el-transfer{
  pointer-events: none;
}
#UserDetail .el-dialog__body{
  pointer-events: none;
}
</style>
