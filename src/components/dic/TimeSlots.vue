<template>
  <div class="block" :id="showStyle? 'showStyle' : ''">
    <el-date-picker
      v-model.trim="timeSlot"
      @change="valChange"
      type="datetimerange"
      value-format="yyyy-MM-dd HH:mm:ss"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      align="right"
      size="mini">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeSlot: '',
      showStyle: false
    }
  },
  methods: {
    valChange (val) {
      this.$emit('getValChange', val)
    }
  },
  mounted () {
    if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
      this.showStyle = true
    }
  }
}
</script>

<style>
  #showStyle .el-date-editor .el-range-input,#showStyle .el-date-editor .el-range-separator {
    position: relative;
    bottom: 8px;
  }
  #showStyle .el-range-editor--mini.el-input__inner {
    position: relative;
    top: 5px;
  }
</style>
