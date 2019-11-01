import host from '@/utils/config'
const fileDownLoad = (data, title,_this) => {
  /**
   * data: 异步返回blob文档流
   * title: 下载文档名称及后缀
   */
    const blob = new Blob([data])
    const fileName = title
    const isEdge = navigator.userAgent.indexOf('Edge') > -1
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        // ie
        navigator.msSaveBlob(blob, fileName)
    } else {
        // no ie
        if (isEdge) {
            navigator.msSaveBlob(blob, fileName)
        } else {
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
        }
    }
}

const getTableHeight = (a, b, c, d, e) => {
    let all
    if (document.querySelector('.right')) {
        all = document.querySelector('.right').clientHeight
    } else {
        all = document.querySelector('.rightFull').clientHeight
    }
    let a1 = parseInt(document.getElementsByTagName('html')[0].style.fontSize.split('px')[0] * a)
    let b1 = (b === null ? 0 : document.querySelector(b).clientHeight)
    let c1 = (c === null ? 0 : document.querySelector(c).clientHeight)
    let d1 = (d === null ? 0 : document.querySelector(d).clientHeight)
    let e1 = (e === null ? 0 : document.querySelector(e).clientHeight)
    // console.log('触发了', b1)
    return all - a1 - b1 - c1 - d1 - e1
}

// 上传图片
const uploadImg = (file, name) => {
    // 创建表单对象
    let form = new FormData()
    // 后端接受参数 ，可以接受多个参数
    form.append('file', file)
    // 创建核心对象
    let xmlhttp = new XMLHttpRequest()
    // 编写回调函数
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        if (name === 'logo') {
            sessionStorage.setItem('logo', xmlhttp.responseText)
        }
      }
    }
    xmlhttp.open('post', host.host + '/compose/public/upload')
    // open设置请求方式和请求路径
    xmlhttp.setRequestHeader('Authorization', sessionStorage.getItem('token'))
    xmlhttp.setRequestHeader('customerId', sessionStorage.getItem('customerId'))
    xmlhttp.setRequestHeader('districtId', sessionStorage.getItem('districtId'))
    // send 发送
    xmlhttp.send(form)
}

// 上传文件
const uploadFile = (file, name) => {
    // let that = this
    // 创建表单对象
    let form = new FormData()
    // 后端接受参数 ，可以接受多个参数
    form.append('file', file)
    // 创建核心对象
    let xmlhttp = new XMLHttpRequest()
    // 编写回调函数
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        if (name === '签名证书') {
            sessionStorage.setItem('signinUrl', xmlhttp.responseText)
        } else if (name === '密码证书') {
            sessionStorage.setItem('signinPassWrod', xmlhttp.responseText)
        }
      }
    }
    xmlhttp.open('post', host.host + '/compose/fileUpload')
    // open设置请求方式和请求路径
    xmlhttp.setRequestHeader('Authorization', sessionStorage.getItem('token'))
    xmlhttp.setRequestHeader('customerId', sessionStorage.getItem('customerId'))
    xmlhttp.setRequestHeader('districtId', sessionStorage.getItem('districtId'))
    // send 发送
    xmlhttp.send(form)
}

// 将阿拉伯数字转换成汉字大写
const numberParseChina = money => {
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  let cnInteger = '整'
  // 整型完以后的单位
  let cnIntLast = '圆'
  // 最大处理的数字
  let maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (money === '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    let IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

// 比较两个数组取出其中不同的值
const getArrDifference = (firstArr, secondArr) => {
  return firstArr.concat(secondArr).filter(function (v, i, arr) {
    return arr.indexOf(v) === arr.lastIndexOf(v)
  })
}

export default {
  fileDownLoad: fileDownLoad,
  getTableHeight: getTableHeight,
  uploadFile: uploadFile,
  uploadImg: uploadImg,
  numberParseChina: numberParseChina,
  getArrDifference: getArrDifference
}
