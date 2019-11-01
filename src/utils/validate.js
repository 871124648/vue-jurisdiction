const Rate = (rule, value, callback) => {
  if (!value) {
    callback(new Error('单笔交易费率不能为空'))
  } else {
    if (value < 10) {
      if ((/^-?\d+(\.\d{1,3})?$/).test(value) && value > 0) {
        callback()
      } else {
        callback(new Error('单笔交易费率必须大于0且小数点后面的位数小于等于3位'))
      }
    } else {
      callback(new Error('单笔交易费率必须小于10且必须为数字'))
    }
  }
}

const UnitPrice = (rule, value, callback) => {
  if (!value) {
    callback(new Error('单价不能为空'))
  } else {
    if (value < 10000) {
      if ((/^-?\d+(\.\d{1,2})?$/).test(value) && value > 0) {
        callback()
      } else {
        callback(new Error('单价必须大于0且小数点后面的位数小于等于2位'))
      }
    } else {
      callback(new Error('单价必须小于10000且必须为数字'))
    }
  }
}

const StoredMoney = (rule, value, callback) => {
  if (!value) {
    callback(new Error('预存(退款)金额不能为空'))
  } else {
    if (value < 10000) {
      if ((/^-?\d+(\.\d{1,2})?$/).test(value)) {
        callback()
      } else {
        callback(new Error('预存(退款)金额小数点后面的位数小于等于2位'))
      }
    } else {
      callback(new Error('预存(退款)金额小于10000且必须为数字'))
    }
  }
}

const Charge = (rule, value, callback) => {
  if (!value) {
    callback(new Error('手续费不能为空'))
  } else {
    if (value < 10000) {
      if ((/^-?\d+(\.\d{1,2})?$/).test(value) && value > 0) {
        callback()
      } else {
        callback(new Error('手续费必须大于0且小数点后面的位数小于等于2位'))
      }
    } else {
      callback(new Error('手续费小于10000且必须为数字'))
    }
  }
}

const TextLength = (rule, value, callback) => {
  if (!value) {
    callback(new Error('该项为必填项'))
  } else {
    if (value.length >= 30) {
      callback(new Error('文本长度过长'))
    } else {
      callback()
    }
  }
}

const AccountPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else {
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('必须为6-12位的数字和字母的组合'))
    }
  }
}

const UserPhone = (rule, value, callback) => {
  let reg = /^1[3456789]\d{9}$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入有效手机号'))
  }
}

const UserEmail = (rule, value, callback) => {
  let reg = /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (reg.test(value)) {
    callback()
  } else {
    callback(new Error('请输入有效邮箱'))
  }
}

// 数字格式不超过11的
const TelNumber = (rule, value, callback) => {
  if (value) {
    if (value.toString().length > 11) {
      callback(new Error('不能超过11数字'))
    } else {
      let reg = /^[0-9]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入数字'))
      }
    }
  } else {
    callback()
  }
}
// 普通字符串18
const CommonString = (rule, value, callback) => {
  if (value.length > 18) {
    callback(new Error('不能超过18个字符'))
  } else {
    callback()
  }
}
// 必填字符串18
const RequiredString = (rule, value, callback) => {
  if (value) {
    if (value.length > 18) {
      callback(new Error('不能超过18个字符'))
    } else {
      callback()
    }
  } else {
    callback(new Error('该项为必填项'))
  }
}

// 普通数字类型32
const CommonNumber = (rule, value, callback) => {
  if (value) {
    if (value.toString().length >= 32) {
      callback(new Error('不能超过32位数字'))
    } else {
      let reg = /^[0-9]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入数字'))
      }
    }
  } else {
    callback()
  }
}
// 必填数字类型32
const RequiredNumber = (rule, value, callback) => {
  if (value) {
    if (value.toString().length >= 32) {
      callback(new Error('不能超过32位数字'))
    } else {
      let reg = /^[0-9]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入数字'))
      }
    }
  } else {
    callback(new Error('该项为必填项'))
  }
}
// 必填数字类型18
const RequiredNumber2 = (rule, value, callback) => {
  if (value) {
    if (value.toString().length > 18) {
      callback(new Error('不能超过18位数字'))
    } else {
      let reg = /^[0-9]+$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入数字'))
      }
    }
  } else {
    callback(new Error('该项为必填项'))
  }
}

// 数字且为正整数
const PositiveInteger = (rule, value, callback) => {
  if (value) {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value <= 0) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
  }
}
// 数字且为四位数一下正整数
const PositiveInteger4 = (rule, value, callback) => {
  if (value) {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value <= 0) {
        callback(new Error('请输入正整数'))
      } else if (value >= 10000) {
        callback(new Error('不能超过四位数'))
      } else {
        callback()
      }
    }
  }
}

// 数字且为二位数一下正整数
const PositiveInteger2 = (rule, value, callback) => {
  if (value) {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (value <= 0) {
        callback(new Error('请输入正整数'))
      } else if (value >= 100) {
        callback(new Error('楼层不能超过三位数'))
      } else {
        callback()
      }
    }
  }
}
// 住户名称校验
const UserName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('住户名称不能为空'))
  } else {
    if (value.length > 50) {
      callback(new Error('住户名称不能超过50个字符'))
    } else {
      callback()
    }
  }
}

// 门牌号校验
const HouseNumber = (rule, value, callback) => {
  if (!value) {
    callback(new Error('门牌号不能为空'))
  } else {
    if (value.length > 50) {
      callback(new Error('门牌号不能超过50个字符'))
    } else {
      callback()
    }
  }
}

// 证件号码校验
const CertificateNo = (rule, value, callback) => {
  if (!value) {
    callback(new Error('证件号码不能为空'))
  } else {
    if (value.length > 50) {
      callback(new Error('证件号码不能超过50个字符'))
    } else {
      callback()
    }
  }
}

// 楼层校验
const Floor = (rule, value, callback) => {
  if (!value) {
    callback(new Error('楼层不能为空'))
  } else {
    if (value.length > 50) {
      callback(new Error('楼层不能超过50个字符'))
    } else {
      callback()
    }
  }
}

// 通讯地址校验
const PostalAddress = (rule, value, callback) => {
  if (!value) {
    callback(new Error('通讯地址不能为空'))
  } else {
    if (value.length > 50) {
      callback(new Error('通讯地址不能超过50个字符'))
    } else {
      callback()
    }
  }
}

export default {
  Rate: Rate,
  UnitPrice: UnitPrice,
  TextLength: TextLength,
  AccountPassword: AccountPassword,
  UserPhone: UserPhone,
  UserEmail: UserEmail,
  StoredMoney: StoredMoney,
  Charge: Charge,
  UserName: UserName,
  HouseNumber: HouseNumber,
  CertificateNo: CertificateNo,
  Floor: Floor,
  PostalAddress: PostalAddress,
  CommonString: CommonString,
  CommonNumber: CommonNumber,
  RequiredString: RequiredString,
  TelNumber: TelNumber,
  RequiredNumber: RequiredNumber,
  RequiredNumber2: RequiredNumber2,
  PositiveInteger: PositiveInteger,
  PositiveInteger2: PositiveInteger2,
  PositiveInteger4: PositiveInteger4
}
