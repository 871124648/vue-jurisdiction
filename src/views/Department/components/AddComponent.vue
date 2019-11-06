<template>
  <div id="addRoomComponet">
    <el-dialog title="新增部门信息" class="w80" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" :model="form" ref="form">
        <el-form-item label="部门名称" prop="deptName">
          <el-input size="mini" v-model.trim="form.deptName" placeholder="部门名称"></el-input>
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
import {branchAdd} from 'api/api'
export default {
  props: ['dialog'],
  components: {
  },
  data () {
    return {
      dialogVisible: true,
      form: {
        deptName: ''
      },
      rules: {
        deptName: [{required: true, message: '请输入部门名称', trigger: 'blur'}]
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
    addForm () {
      branchAdd({
        deptName: this.form.deptName
      }).then(res => {
        this.$message.success('新增房间信息成功!')
        this.dialogVisible = false // 让弹窗消失掉
        this.$emit('getTableData')
      })
    }
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
