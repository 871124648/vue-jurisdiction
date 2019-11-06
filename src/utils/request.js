import axios from 'axios'
import qs from 'qs'
import config from './config'
axios.defaults.headers['Cache-Control'] = 'no-cache'
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
export default function request (options) {
  let { method = 'get', url, data, isForm, isUpload, singleUrl } = options
  let host = ''
  let path = ''
  if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
    host = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
    path = url.slice(host.length)
  } else {
    host = config.host
    path = url
    if (singleUrl) { // 本地单独测试对接
      host = '172.25.11.193:8091'
    }
  }
  url = host + path
  let parData = isForm ? qs.stringify(data) : data
  if (isForm) {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded' // 表单传值
  } else if (isUpload) {
    axios.defaults.headers['Content-Type'] = 'multipart/form-data' // 上传图片文件类型
  } else {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  let authorization
  if (sessionStorage.getItem('token')) {
    authorization = sessionStorage.getItem('token')
    axios.defaults.headers.Authorization = authorization
  }
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: parData
      })
    case 'delete':
      return axios.delete(url, {
        data: parData
      })
    case 'post':
      return axios.post(url, parData)
    case 'put':
      return axios.put(url, parData)
    case 'patch':
      return axios.patch(url, parData)
    case 'down': // 文件下载
      return axios.get(url, {
        params: parData,
        responseType: 'blob'
      })
      case 'postdown': // 文件下载
      return axios.post(url, parData, {
        responseType: 'blob'
      })
    default:
      return axios(options)
  }
}
