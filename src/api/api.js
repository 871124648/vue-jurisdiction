import request from '../utils/request'
// 登录
// export const login = (data) => {
//     return request({
//       method: 'POST',
//       url: '/auth/login',
//       data,
//       isForm: true
//     })
// }

// 登录接口
export const login = (data) => {
  return request({
    method: 'post',
    url: '/compose/public/login',
    data,
    isForm: true
  })
}

// 上传图片通用接口
export const upload = (data) => {
  return request({
    method: 'post',
    url: '/compose/public/upload',
    data,
    isUpload: true
  })
}

// 上传文件
export const fileLoad = (data) => {
  console.log(data, '即将上传')
  return request({
    method: 'post',
    url: '/compose/fileUpload',
    data,
    isUpload: true
  })
}

// 用户查询接口
export const userList = (data) => {
  return request({
    method: 'get',
    url: '/compose/list_user',
    data
  })
}

// 用户搜索接口
export const seachUserList = (data) => {
  return request({
    method: 'get',
    url: '/compose/search_user',
    data
  })
}

// 添加用户
export const userAdd = (data) => {
  return request({
    method: 'post',
    url: '/compose/user',
    data
  })
}

// 添加用户-角色列表
export const listRole = (data) => {
  return request({
    method: 'get',
    url: '/compose/list_role',
    data
  })
}

// 客户列表
export const userCustomer = () => {
  return request({
    method: 'get',
    url: '/compose/user_customer'
  })
}

// 修改用户
export const userEdit = (data) => {
  return request({
    method: 'put',
    url: '/compose/user',
    data
  })
}

// 删除用户
export const userDelete = (data) => {
  return request({
    method: 'delete',
    url: '/compose/user?ids=' + data,
    data
  })
}

// 修改密码
export const resetPassWord = (data) => {
  return request({
    method: 'post',
    url: '/compose/password',
    data,
    isForm: true
  })
}

// 日志列表
export const logController = (data) => {
  return request({
    method: 'get',
    url: '/compose/systemLogs',
    data
  })
}

// 日志搜素
export const searchSystemLogs = (data) => {
  return request({
    method: 'get',
    url: '/search_systemLogs',
    data
  })
}

// 角色列表
export const rolesList = (data) => {
  return request({
    method: 'get',
    url: '/compose/public/roles',
    data
  })
}

// 角色搜索
export const searchRole = (data) => {
  return request({
    method: 'get',
    url: '/compose/public/roles',
    data
  })
}

// 添加角色
export const rolesAdd = (data) => {
  return request({
    method: 'post',
    url: `/compose/role_name?roleCode=${data.roleCode}&roleName=${data.roleName}&ids=${data.ids}`,
    isForm: true
  })
}

// 修改角色
export const rolesEdit = (data) => {
  return request({
    method: 'put',
    url: `/compose/role_name?roleCode=${data.roleCode}&roleName=${data.roleName}&ids=${data.ids}&id=${data.id}`,
    isForm: true
  })
}

// 删除角色
export const rolesDelete = (data) => {
  return request({
    method: 'delete',
    url: '/compose/role/' + data,
    isForm: true
  })
}

// 菜单管理-菜单分页查询
export const menuList = (data) => {
  return request({
    method: 'get',
    url: '/compose/list_menu',
    data
  })
}

// 菜单管理-菜单分页搜索
export const seachMenuList = (data) => {
  return request({
    method: 'get',
    url: '/compose/menu_list',
    data
  })
}

// 菜单添加
export const menuAdd = (data) => {
  return request({
    method: 'post',
    url: '/compose/menu',
    data,
    isForm: true
  })
}

// 菜单修改
export const menuEdit = (data) => {
  return request({
    method: 'put',
    url: '/compose/menu',
    data
  })
}

// 菜单删除
export const menuDelete = (data) => {
  return request({
    method: 'delete',
    url: '/compose/menu/' + data,
    isForm: true
  })
}
// 角色管理-菜单列表
export const menuAllList = () => {
  return request({
    method: 'get',
    url: '/compose/all_menu'
  })
}

// 根据父及查询菜单
export const childMenu = (data) => {
  return request({
    method: 'get',
    url: '/compose/menus',
    data
  })
}

// 机构分页查询
export const listDistrict = (data) => {
  return request({
    method: 'get',
    url: '/compose/list_district',
    data
  })
}

// 机构搜索
export const searchDistrict = (data) => {
  return request({
    method: 'get',
    url: '/compose/list_district',
    data
  })
}
// 新增机构
export const district = (data) => {
  return request({
    method: 'post',
    url: '/compose/district',
    data
  })
}

// 修改机构
export const editDistrict = (data) => {
  return request({
    method: 'put',
    url: '/compose/district',
    data
  })
}

// 删除机构
export const deleteDistrict = (data) => {
  return request({
    method: 'delete',
    url: '/compose/district?ids=' + data,
    isForm: true
  })
}

// 客户分页查询
export const listCustomer = (data) => {
  return request({
    method: 'get',
    url: '/compose/list_customer',
    data
  })
}

// 客户搜索
export const searchCustomer = (data) => {
  return request({
    method: 'get',
    url: '/compose/search_customer',
    data
  })
}
// 客户增加接口
export const addCustomer = (data) => {
  return request({
    method: 'post',
    url: '/compose/customer',
    data
  })
}

// 客户修改接口
export const editCustomer = (data) => {
  return request({
    method: 'put',
    url: '/compose/customer',
    data
  })
}


// 客户删除接口
export const deleteCustomer = (data) => {
  return request({
    method: 'delete',
    url: '/compose/customer/' + data,
    isForm: true
  })
}

// 查询一级客户列表
export const listCustomerFirst = (data) => {
  return request({
    method: 'get',
    url: '/compose/first_customer_list',
    data
  })
}

// 房间管理- 添加房间
export const roomAdd = (data) => {
  return request({
    method: 'post',
    url: '/pay/room',
    data
  })
}

// 房间管理- 更新房间
export const roomEdit = (data) => {
  return request({
    method: 'put',
    url: '/pay/room',
    data
  })
}

// 房间管理-房间详情
export const roomDetail = (data) => {
  return request({
    method: 'get',
    url: '/pay/room',
    data
  })
}

// 房间管理-删除房间
export const roomDelete = (data) => {
  return request({
    method: 'delete',
    url: `/pay/room/${data}`,
    isForm: true
  })
}

// 房间管理-批量导入
export const batchRoomImport = (data) => {
  return request({
    method: 'post',
    url: '/pay/room/batch_import',
    data,
    isUpload: true
  })
}

// 房间管理-下载模板
export const downRoomTemp = (data) => {
  console.log(data,'ddxaz')
  return request({
    method: 'get',
    url: '/pay/room/download_template'
  })
}

// 房间管理-分页查询房间信息
export const pageRoomQuery = (data) => {
  return request({
    method: 'post',
    url: '/pay/room/page/public',
    data
  })
}

// 缴费管理-添加余额记录
export const balanceRecordAdd = (data) => {
  return request({
    method: 'post',
    url: '/pay/advance/log',
    data
  })
}

// 缴费管理-分页查询余额记录
export const pageRecordQuery = (data) => {
  return request({
    method: 'post',
    url: '/pay/advance/log/page/public',
    data
  })
}

// 缴费管理-打印余额记录
export const balanceRecordPrint = (data) => {
  return request({
    method: 'get',
    url: `/pay/advance/log/print${data}`
  })
}

// 缴费管理-撤销某条余额记录
export const balanceRecordRemove = (data) => {
  return request({
    method: 'put',
    url: `/pay/advance/log/revocation/${data}`,
    isForm: true
  })
}

// 缴费管理-分页查询房间余额
export const roomRecordQuery = (data) => {
  return request({
    method: 'post',
    url: '/pay/advance/page/public',
    data
  })
}

// 缴费管理-分页查询预存扣费
export const pageDeductionQuery = (data) => {
  return request({
    method: 'post',
    url: '/pay/stored_fee_deduction/page/public',
    data
  })
}

// 系统设置- 查询任务类列表
export const jobClassQuery = (data) => {
  return request({
    method: 'get',
    url: '/dispatch/job_class_list',
    data
  })
}

// 系统设置- 分页查询定时任务列表
export const pageJobQuery = (data) => {
  return request({
    method: 'get',
    url: '/dispatch/job_page',
    data
  })
}

// 系统设置- 添加定时任务
export const jobAdd = (data) => {
  return request({
    method: 'post',
    url: '/dispatch/job',
    data
  })
}

// 系统设置- 修改定时任务
export const jobEdit = (data) => {
  return request({
    method: 'put',
    url: '/dispatch/job',
    data,
    isForm: true
  })
}

// 系统设置- 删除定时任务
export const jobDelete = (data) => {
  console.log(data, '+++')
  return request({
    method: 'delete',
    url: '/dispatch/jobs?ids=' + data,
    isForm: true
  })
}

// 系统设置- 批量运行
export const jobRun = (data) => {
  return request({
    method: 'put',
    url: '/dispatch/jobs?ids=' + data + '&type=1',
    isForm: true
  })
}

// 系统设置- 批量暂停
export const jobStop = (data) => {
  return request({
    method: 'put',
    url: '/dispatch/jobs?ids=' + data + '&type=2',
    isForm: true
  })
}

// 系统设置- 手动执行一次定时任务
export const jobOnce = (data) => {
  return request({
    method: 'post',
    url: '/dispatch/job_once?id=' + data ,
    isForm: true
  })
}

// 系统设置- 添加收费方案
export const chargeSchemeAdd = (data) => {
  return request({
    method: 'post',
    url: '/pay/charge_scheme',
    data,
    isForm: true
  })
}

// 系统设置- 修改收费方案
export const chargeSchemeEdit = (data) => {
  return request({
    method: 'put',
    url: '/pay/charge_scheme',
    data,
    isForm: true
  })
}

// 系统设置- 删除收费方案
export const chargeSchemeDelete = (data) => {
  return request({
    method: 'delete',
    url: `/pay/charge_scheme/${data}`
  })
}

// 系统设置- 更新收费项
export const chargeSchemeUpdate = (data) => {
  return request({
    method: 'put',
    url: '/pay/charge_scheme/item',
    data,
    isForm: true
  })
}

// 系统设置- 查询收费项目列表
export const chargeSchemeQuery = (data) => {
  return request({
    method: 'get',
    url: `/pay/charge_scheme/item/list/public/${data}`
  })
}

// 系统设置- 查询收费方案列表
export const pagechargeSchemeQuery = (data) => {
  return request({
    method: 'post',
    url: '/pay/charge_scheme/list/public',
    data
  })
}

// 系统设置- 查看支付费率
export const payRateQuery = (data) => {
  return request({
    method: 'get',
    url: '/pay/pay_rate_setting',
    data
  })
}

// 系统设置- 更新支付费率
export const payRateUpdate = (data) => {
  return request({
    method: 'put',
    url: '/pay/pay_rate_setting',
    data
  })
}

// 告警管理- 告警分页查询
export const alarmQuery = (data) => {
  return request({
    method: 'get',
    url: '/compose/searchAlarm',
    data
  })
}
