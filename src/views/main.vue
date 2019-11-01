<template>
  <div class="main">
    <div class="main-top">
      <el-row :gutter="20">
        <el-col :span="6">
            <div class="yesterday">
              <ul>
                <li class="clearfix">
                  <div class="fl pointer">
                    <el-dropdown trigger="click" @command="handleCommandDay">
                      <span class="el-dropdown-link">
                        {{dayNum}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="昨日用电量">昨日用电量</el-dropdown-item>
                        <el-dropdown-item command="昨日用水量">昨日用水量</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="fr month_box">10月</div>
                </li>
                <li class="quantity_box">
                  120.9kwh
                </li>
                <li class="quantity_bottom">
                  <span>前日</span>
                  <span class="quantity_num">98.1</span>
                  <span>+18.00%</span>
                </li>
              </ul>
            </div>
        </el-col>
        <el-col :span="6">
          <div class="this-month">
              <ul>
                <li class="clearfix">
                  <div class="fl pointer">
                    <el-dropdown trigger="click" @command="handleCommandMonth">
                      <span class="el-dropdown-link">
                        {{monthNum}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="本月用电量">本月用电量</el-dropdown-item>
                        <el-dropdown-item command="本月用水量">本月用水量</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="fr month_box">10月</div>
                </li>
                <li class="quantity_box">
                  120.9kwh
                </li>
                <li class="quantity_bottom">
                  <span>上月同期</span>
                  <span class="quantity_num" style="margin:0 25px 0 25px;">3980</span>
                  <span class="text_red">-18.00%</span>
                </li>
              </ul>
          </div>
        </el-col>
        <el-col :span="5">
          <ul class="frozen">
            <li>
              <div class="meter">
                <img src="../assets/images/main/meter-reading.png" alt="日冻抄表率">
                <span>
                  <p>85.28%</p>
                  <p>日冻抄表率</p>
                </span>
              </div>
            </li>
            <li>
              <div class="meter">
                <img src="../assets/images/main/uncopied-number.png" alt="日冻结未抄回数">
                <span>
                  <p>117</p>
                  <p>日冻结未抄回数</p>
                </span>
              </div>
            </li>
            <li>
              <div class="route">
                <img src="../assets/images/main/route.png" alt="日冻结日常">
                <span>
                  <p>1</p>
                  <p>日冻结日常</p>
                </span>
              </div>
            </li>
          </ul>
        </el-col>
        <el-col :span="7">
          <div class="analysis-chart">
            <!--创建一个echarts的容器-->
            <div class="margin10">
              <img class="img_margin" src="@/assets/images/man_user.png" alt="用户分析">
              <span>用户分析图</span>
            </div>
            <div id="myChart" :style="{width: '4rem', height: '236px'}"></div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main-centre">
      <el-row :gutter="20">
        <el-col :span="5">
          <ul>
            <li>
              <div class="money">
                <img src="../assets/images/main/money.png" alt="本月已收金额">
                <span>
                  <p>13285.50</p>
                  <p>本月已收金额</p>
                </span>
              </div>
            </li>
            <li>
              <div class="money">
                <img src="../assets/images/main/money.png" alt="账户总欠费">
                <span>
                  <p>-12384.27</p>
                  <p>账户总欠费</p>
                </span>
              </div>
            </li>
            <li>
              <div class="house">
                <img src="../assets/images/main/house.png" alt="欠费户数">
                <span>
                  <p>305</p>
                  <p>欠费户数</p>
                </span>
              </div>
            </li>
          </ul>
        </el-col>
        <!-- 告警信息 -->
        <el-col :span="19">
          <div class="tableBackground">
            <div class="table_title">
              <img src="@/assets/images/man_alarm.png" alt="告警信息">
              <span>告警信息</span>
            </div>
            <el-table
              :data="tableData"
              :height="211"
              border
              ref="table"
              size="mini"
              style="width: 100%">
              <el-table-column prop="name" header-align="left" align="left" label="时间"></el-table-column>
              <el-table-column prop="name" header-align="left" align="left" label="类型"></el-table-column>
              <el-table-column prop="name" header-align="left" align="left" label="事件"></el-table-column>
              <el-table-column prop="name" header-align="left" align="left" label="详情"></el-table-column>
          </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="main-bottom clearfix">
      <div class="clearfix">
        <div class="fl">
          <img class="img_margin" src="@/assets/images/man_echart.png" alt="用量统计">
          <span class="echar_title">用量统计</span>
        </div>
        <div class="fl rdio_box">
          <el-radio-group v-model="tabEchart" @change="seleDays" size="small">
            <el-radio-button label="电用量" />
            <el-radio-button label="水电量" />
          </el-radio-group>
        </div>
      </div>
      <!--创建一个echarts的容器-->
      <div id="bothChart" class="fl" :style="{width: '50%', height: '3.36rem'}"></div>
      <div id="monthChart" class="fr" :style="{width: '7rem', height: '3.36rem'}"></div>
    </div>
  </div>
</template>

<script>
// import $session from 'utils/session'
export default {
  data () {
    return {
      dayNum: '昨日用电量',
      monthNum: '本月用电量',
      tabEchart: '电用量',
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }]
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

    },
    drawLine () {
      let echarts = require('echarts/echarts.all.js')
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            y: 'center',
            data: ['水表','电表','气表','。。。','其他']
        },
        series: [
            {
              name: '数据分析',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data: [
                  {value: 335, name: '水表'},
                  {value: 310, name: '电表'},
                  {value: 234, name: '气表'},
                  {value: 135, name: '。。。'},
                  {value: 1548, name: '其他'}
              ],
              itemStyle: {
                color: function (params) {
                  // 自定义颜色
                  let colorList = [
                    '#F7B500','#449892','#32C5FF','#0091FF','#5EAC1B'
                  ]
                  return colorList[params.dataIndex]
                }
              }
          }
        ]
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    lineChart () {
      let echarts = require('echarts/echarts.all.js')
      // 基于准备好的dom，初始化echarts实例
      let lineChart = echarts.init(document.getElementById('bothChart'))
      // 绘制图表
      lineChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#449892'
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'this.tabEchart',
            type: 'line',
            stack: '总量',
            color: '#449892',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      })
      window.addEventListener('resize', () => {
        lineChart.resize()
      })
    },
    lineChartMonth () {
      let echarts = require('echarts/echarts.all.js')
      // 基于准备好的dom，初始化echarts实例
      let lineChart2 = echarts.init(document.getElementById('monthChart'))
      // 绘制图表
      lineChart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#449892'
            }
          }
        },
        // dataZoom: [
        //   {
        //   show: true,
        //   realtime: true
        //   }
        // ],
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: this.tabEchart,
            type: 'line',
            stack: '总量',
            color: '#449892',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230,120, 132, 101, 134, 90, 230]
          }
        ]
      })
      window.addEventListener('resize', () => {
        lineChart2.resize()
      })
    }
  },
  mounted () {
    this.drawLine()
    this.lineChart()
    this.lineChartMonth()
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

