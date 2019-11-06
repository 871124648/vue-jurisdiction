<template>
  <div class="main">
    <div class="main-top">
      <div class="flex-center">
          <div class="yesterday" style="width:340px;">
            <ul>
              <li class="clearfix">
                <div class="fl month_box">部门数量</div>
              </li>
              <li class="quantity_box">
                {{deptCount}}
              </li>
            </ul>
          </div>
          <div class="this-month" style="width:340px;">
              <ul>
                <li class="clearfix">
                  <div class="fl month_box">员工人数</div>
                </li>
                <li class="quantity_box">
                  {{staffCount}}
                </li>
              </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $session from 'utils/session'
export default {
  data () {
    return {
      staffCount: sessionStorage.getItem('staffCount') || 0,
      deptCount: sessionStorage.getItem('deptCount') || 0
    }
  },
  methods: {
    handleCommandDay (name) {
      this.dayNum = name
    },
    handleCommandMonth (name) {
      this.monthNum = name
    },
    seleDays () {

    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
.main{
  .el-table--border td:after, .el-table--border th:after, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed:after{
    background: transparent;
  }
}
</style>
<style lang="less" scoped>
  @import '~@/assets/css/man.less';
</style>

