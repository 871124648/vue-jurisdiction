const Index = resolve => require(['@/views/index'], resolve)
const Main = resolve => require(['@/views/main'], resolve)// 首页
const Login = resolve => require(['@/views/login'], resolve)// 登录页

// 系统管理
const Menu = resolve => require(['@/views/sys-manage/menu-manage/index'], resolve) // 系统管理-菜单管理
const User = resolve => require(['@/views/sys-manage/user-manage/index'], resolve) // 系统管理-用户管理
const Role = resolve => require(['@/views/sys-manage/role-manage/index'], resolve) // 系统管理-角色管理
const Log = resolve => require(['@/views/sys-manage/log-manage/index'], resolve) // 系统管理-系统日志

const RoomEdit = resolve => require(['@/views/room-manage/index'], resolve)// 员工管理
const Department = resolve => require(['@/views/Department/index'], resolve)// 部门管理

const routes = [
  {
    path: '/',
    component: Index,
    name: '首页',
    redirect: '/login',
    children: [
      { path: '/main', component: Main, name: '首页' },
      { path: '/menu', component: Menu, name: '菜单管理' },
      { path: '/user', component: User, name: '用户管理' },
      { path: '/role', component: Role, name: '角色管理' },
      { path: '/log', component: Log, name: '系统日志' },
      { path: '/staff', component: RoomEdit, name: '员工管理' },
      { path: '/department', component: Department, name: '部门管理' }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

export default routes
