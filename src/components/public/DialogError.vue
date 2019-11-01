<template>
  <div id="error-dialog">
    <el-dialog title="导入错误" class="wd30" :visible.sync="dialogVisible">
      <el-form>
        <el-row>
          <el-col :span="24">
            <el-form-item
              v-for="(item,index) in importErrData"
              :key="index">
              {{item}}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['dialog','importErrData'],
  components: {
  },
  data () {
    return {
      dialogVisible: true
    }
  },
  watch: {
    dialogVisible () {
      this.$emit('update:dialog', this.dialogVisible)
    }
  },
  mounted () {
    this.dialogVisible = this.dialog
  }
}
</script>
<style>
  #error-dialog .el-dialog{
    margin-top: 100px !important;
  }
</style>
