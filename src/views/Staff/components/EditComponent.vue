<template>
  <div id="addRoomComponet">
    <el-dialog title="新增员工信息" class="wd1050" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <el-form-item label="所属部门" prop="deptId">
          <el-select size="mini" v-model.trim="form.deptId" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in certificateTypeOption"
              :key="item.id"
              :label="item.deptName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="staffGender">
          <el-select size="mini" v-model.trim="form.staffGender" clearable placeholder="-- 请选择 --">
            <el-option
              v-for="item in sexList"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工名称" prop="staffName">
          <el-input size="mini" v-model.trim="form.staffName" placeholder="住户名称"></el-input>
        </el-form-item>
        <el-form-item label="员工号码" prop="staffPhone">
          <el-input size="mini" v-model.trim="form.staffPhone" placeholder="员工号码"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input size="mini" v-model.trim="form.staffPosition" placeholder="职位"></el-input>
        </el-form-item>
        <el-form-item label="薪资">
          <el-input size="mini" v-model.trim="form.staffSalary" placeholder="薪资"></el-input>
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
import {staffEdit, branchList} from 'api/api'
export default {
  props: ['dialog', 'editData'],
  components: {
  },
  data () {
    return {
      dialogVisible: true,
      form: {
        deptId: '',
        staffGender: '',
        staffName: '',
        staffPhone: '',
        staffPosition: '',
        staffSalary: ''
      },
      sexList: [{name: '男'}, {name: '女'}],
      certificateTypeOption: [],
      rules: {
        deptId: [{required: true, message: '请选择所属部门', trigger: 'change'}],
        staffGender: [{required: true, message: '请选择所属部门', trigger: 'change'}],
        staffName: [{required: true, message: '请输入员工名称', trigger: 'blur'}],
        staffPhone: [{required: true, message: '请输入手机号码', trigger: 'blur'}]
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
    // 获取部门下拉列表
    branchList () {
      branchList().then(res => {
        this.certificateTypeOption = res
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addForm()
        } else {
          return false
        }
      })
    },
    addForm () {
      staffEdit(this.form).then(res => {
        this.$message.success('保存成功!')
        this.dialogVisible = false // 让弹窗消失掉
        this.$emit('getTableData')
      })
    }
  },
  created () {
    this.form = JSON.parse(JSON.stringify(this.editData))
    this.branchList()
  },
  mounted () {
    this.dialogVisible = this.dialog
  }
}
</script>

<style scoped>
#addRoomComponet .el-input--suffix .el-input__inner {
  padding-right: 16px;
}
#addRoomComponet .el-form-item__label{
  width: 100px !important;
}
#addRoomComponet .el-dialog {
  width: 30%;
}
#addRoomComponet .el-input--mini .el-input__inner {
  width: 200px;
}
#addRoomComponet .el-textarea .el-textarea__inner {
  width: 530px;
}
#addRoomComponet .el-input--prefix .el-input__inner {
  padding-left: 16px;
}
</style>
