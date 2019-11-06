const Index = resolve => require(['@/views/index'], resolve)
const Main = resolve => require(['@/views/main'], resolve)// 首页
const Login = resolve => require(['@/views/login'], resolve)// 登录页

const Staff = resolve => require(['@/views/Staff/index'], resolve)// 员工管理
const Department = resolve => require(['@/views/Department/index'], resolve)// 部门管理

const routes = [
  {
    path: '/',
    component: Index,
    name: '首页',
    redirect: '/login',
    children: [
      { path: '/main', component: Main, name: '首页' },
      { path: '/staff', component: Staff, name: '员工管理' },
      { path: '/department', component: Department, name: '部门管理' }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

export default routes
