/* eslint-disable no-constant-condition */
import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './router'
import index from './App.vue'
import ZkTable from 'vue-table-with-tree-grid'
import promise from 'es6-promise'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import {hasPermission} from './utils/btnPermissions'

import util from './utils/util'
import validate from './utils/validate'
import request from './utils/request'
import config from './utils/config'
import session from './utils/session'
import ase from './utils/ase'
import moment from 'moment'
import './utils/rem'
promise.polyfill()
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(ZkTable)

Vue.prototype.$moment = moment
Vue.prototype.$util = util
Vue.prototype.$validate = validate
Vue.prototype.$request = request
Vue.prototype.$session = session
Vue.prototype.$config = config
Vue.prototype.$hasPer = hasPermission
Vue.prototype.$ase = ase
// Vue.prototype.$loading = true
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // Vue.prototype.$loading = true
  if (to.path !== '/login') {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

let vm = new Vue({
  el: '#app',
  router,
  render: v => v(index)
})
// 响应拦截（配置请求回来的信息）
axios.defaults.timeout = 30000
axios.interceptors.response.use(function (response) {
  // Vue.prototype.$loading = false
  return response.data
}, function (error) {
  // 处理响应失败
  if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    vm.$message.error('网络超时，请联系管理员!')
    return Promise.reject(error) // reject这个错误信息
  } else {
    // console.log(error.response, 'zhuangtai')
  // 处理响应数据
  // 401 : token错误、过期
  // 402: 无权限
  // 500 ： 服务错误
  switch (error.response.status) {
    case 500:
      vm.$message.error('服务端错误，请联系管理员！')
    break
    case 401:
      vm.$router.push('/login')
      sessionStorage.clear()
    break
    default:
      break
  }
    vm.$message.error(error.response.data.message)
  }
  return Promise.reject(error)
})
Vue.use(vm)
