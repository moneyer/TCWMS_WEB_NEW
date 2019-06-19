// 登录界面 示例代码
// const Home = () => import('@/views/Home')
// 登录页面
const Login = () => import('@/views/login/login')
const Menu = () => import('@/views/menu/menu')
const DeliPick = () => import('@/views/pick/deli-pick')
const UnitePick = () => import('@/views/pick/unite-pick')
const Replenishment = () => import('@/views/supply/replenishment')

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: '登录-同驰WMS系统' }
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    meta: { title: '菜单-同驰WMS系统' }
  },
  {
    path: '/deli-pick',
    name: 'deli-pick',
    component: DeliPick
  },
  {
    path: '/zero-pick',
    name: 'zero-pick',
    component: UnitePick
  },
  {
    path: '/supply/replenishment',
    name: 'replenishment',
    component: Replenishment
  }
]

export default routes
