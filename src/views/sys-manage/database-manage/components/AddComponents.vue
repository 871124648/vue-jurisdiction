<template>
  <div id="addUser" class="UserComponents">
    <el-dialog title="新增字典" class="wd30" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <el-form-item label="项目名" prop="account">
          <el-input size="mini" v-model.trim="form.account" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目值" prop="Name">
          <el-input size="mini" v-model.trim="form.Name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="Encode">
          <el-input size="mini" v-model.trim="form.Name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="项目值">
          <el-input size="mini" v-model.trim="form.Name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="userType">
            <el-radio v-model="form.radio" label="1">启用</el-radio>
            <el-radio v-model="form.radio" label="2">禁用</el-radio>
        </el-form-item><br>
        <el-form-item label="备注" class="textarea_box">
          <el-input size="mini" type="textarea" v-model.trim="form.remark" placeholder="请输入备注"></el-input>
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
export default {
  props: ['dialog'],
  components: {
  },
  data () {
    return {
      dialogVisible: true,
      roleData: [
        {
           key: 1,
            label: '管理员',
            disabled: false
        },
        {
          key: 2,
          label: '普通角色',
          disabled: false
        }
      ],
      roleName: [],
      form: {
        account: '',
        Name: '',
        password: '',
        passwordAffirm: '',
        organization: '',
        phoneNumber: '',
        email: '',
        userType: '',
        remark: '',
        radio: '1'
      },
      rules: {
        account: [{required: true, message: '账户不能为空', trigger: 'blur'}],
        Name: [{required: true, message: '名字不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        passwordAffirm: [{required: true, message: '密码不能为空', trigger: 'blur'}]
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
          this.addForm()
        } else {
          return false
        }
      })
    },
    getCreateTime (datetime) {
      this.form.createTime = datetime
    },
    addForm () {
    }
  },
  mounted () {
    this.dialogVisible = this.dialog
  }
}
</script>

<style>
@import './style/style.css';
</style>
