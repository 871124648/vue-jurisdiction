import request from '../utils/request'

// 登录接口
export const login = (data) => {
  return request({
    method: 'post',
    url: '/login',
    data,
    isForm: true
  })
}

// 员工列表
export const staffList = (data) => {
  return request({
    method: 'get',
    url: '/user_page',
    data
  })
}

// 添加员工
export const staffAdd = (data) => {
  return request({
    method: 'post',
    url: '/user',
    data
  })
}

// 编辑员工
export const staffEdit = (data) => {
  return request({
    method: 'put',
    url: '/user',
    data
  })
}

// 删除员工
export const staffDelete = (data) => {
  return request({
    method: 'delete',
    url: '/user/' + data
  })
}

// 导入员工列表
export const nameLoad = (data) => {
  console.log(data, '即将上传员工')
  return request({
    method: 'post',
    url: '/staff',
    data,
    isUpload: true
  })
}

// 获取全部部门列表
export const branchList = (data) => {
  return request({
    method: 'get',
    url: '/dept_list',
    data
  })
}

// 部门查询列表
export const deptPage = (data) => {
  return request({
    method: 'get',
    url: '/dept_page',
    data
  })
}

// 添加部门
export const branchAdd = (data) => {
  return request({
    method: 'post',
    url: '/dept',
    data,
    isForm: true
  })
}

// 修改部门
export const branchEdit = (data) => {
  return request({
    method: 'put',
    url: '/dept',
    data,
    isForm: true
  })
}

// 删除部门
export const branchDelete = (data) => {
  return request({
    method: 'delete',
    url: '/dept/' + data
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

