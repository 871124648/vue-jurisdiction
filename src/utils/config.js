
let host
let agencyHost
// encrypt: true 加密开启
let encrypt = false

switch (process.env.NODE_ENV) {
// 本地测试
  case 'development':
    host = 'http://www.gjing.cn:8090' // 测试
    // agencyHost = 'http://47.111.1.69:8095/'
    // host = 'http://192.168.20.4:8095' // 范海云
    // host = 'http://172.25.11.193:8091' // 梦迪
    // host = 'http://47.111.7.195:8023'
    break
    // 外网测试
  case 'none':
    host = 'http://www.gjing.cn:8090'
    agencyHost = 'http://www.gjing.cn:8090'
    // 测试服
    break
    // 外网正式
  case 'production':
    host = 'http://www.gjing.cn:8090' // 后端指定服务器
    agencyHost = 'http://www.gjing.cn:8090'
    break
  default:
    break
}
// es5
// module.exports = {
//   host,
//   encrypt,
//   agencyHost
// }
// es6
export default {
  host,
  encrypt,
  agencyHost
}
