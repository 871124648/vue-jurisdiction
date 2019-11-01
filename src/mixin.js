import Pagination from 'components/public/Pagination'
import utils from '@/utils/util'
const mixin = {
  components: {
    Pagination
  },
  data () {
    return {
      loading: true,
      isShow: false, // 查询条件是否张开
      showTxt: '展开',
      tableHeight: null,// 表格高度
      treeHeight: {}, // 左侧树形同步表格高度
      treeHeightAll: {}, // 左侧树形同步右侧高度
      currentRows: [],
      currentIds: [],
      dialogTitle: '',
      params: {
        total: null,
        size: 20,
        current: 1
      },
      headerCalss: {
        background: '#FFF',
        color: '#111111'
      }
    }
  },
  watch: {

  },
  computed: {

  },
  methods: {
    // 展开收缩
    tabHeihgt () {
      let that = this
      this.isShow = !this.isShow
      if (this.isShow) {
        this.showTxt = '收起'
      } else {
        this.showTxt = '展开'
      }
      this.$nextTick(() => {
        that.tableHeight = utils.getTableHeight(0.52 ,'.top' , '.footer-btn', null, null)
        if (this.$refs.elTable) {
          console.log('有了')
          this.$refs.elTable.getheihgt()
        }
      })
    },
    handleQuery () {
      this.getTableData()
    },
    getRowsData (rows) { // 获取选中行数
      console.log('当前行数据---',this.currentRows)
      this.currentRows = rows
      this.currentIds = this.currentRows.map(row => row && row.id)
    },
    getPagination (res,page) { // 获取分页参数
      console.log('有没有', page)
      this.params.total = res.totalRows
      this.params.size = res.pageRows
      this.params.current = res.currentPage
      // if (page === 1) {
      //   this.params.current = res.currentPage
      // } else {
      //   this.params.current = 1
      // }
    },
    handleCurrentChange (currentPage) { // 分页触发
      console.log(currentPage, '分页触发')
      this.params.current = currentPage
      this.getTableData(1)
    },
    handleSizeChange (currentSize) {
      this.params.size = currentSize
      this.getTableData(1)
    },
    handleOperator (type,row) {
      if (type === 'add') { // 新增
        this.dialogTitle = '新增'
        this.addUpdateVisible = true
      } else if (type === 'update') { // 修改
        this.dialogTitle = '修改'
        this.addUpdateVisible = true
      } else if (type === 'delete') { // 删除
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelData(row)
        })
      }
    },
    // 对比两数组,return筛选不相同的
    getArrDifference (data, data2) {
      return data.concat(data2).filter(function (v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v)
      })
    },
    /**
      * 动态获取表格高度
      * a 页面的公用header部分+padding+margin值（数字）
      * b c d e 除了表格与公用header其他容器的class名称（例如".top"）
      * all 为table最终高度
          */
    // getTableHeight (a, b, c, d, e) {
    //   alert('执行')
    //   let all = document.querySelector('.right').clientHeight
    //   let a1 = parseInt(document.getElementsByTagName('html')[0].style.fontSize.split('px')[0] * a)
    //   let b1 = (b === null ? 0 : document.querySelector(b).clientHeight)
    //   let c1 = (c === null ? 0 : document.querySelector(c).clientHeight)
    //   let d1 = (d === null ? 0 : document.querySelector(d).clientHeight)
    //   let e1 = (e === null ? 0 : document.querySelector(e).clientHeight)
    //   this.tableHeight = all - a1 - b1 - c1 - d1 - e1
    //   return all - a1 - b1 - c1 - d1 - e1
    // }
    getheihgt () {
      this.tableHeight = utils.getTableHeight(0.52 ,'.top' , '.footer-btn', null, null)
      let resizeTimer = null
      let that = this
      window.addEventListener('resize', () => {
        if (resizeTimer) clearTimeout(resizeTimer)
        resizeTimer = setTimeout(function () {
            // 表格高度
            that.tableHeight = utils.getTableHeight(0.52 ,'.top' , '.footer-btn', null, null)
            // 左侧树形高度
            that.$nextTick(() => {
              that.treeHeight = {
                height: utils.getTableHeight(0.52 ,'.top' , '.footer-btn', null, null) + 'px'
              }
              that.treeHeightAll = {
                height: utils.getTableHeight(0.52 , null , null , null, null) + 'px'
              }
            })
        }, 200)
      })
    }
  }

}
export default mixin
