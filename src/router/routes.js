import Msite from '../pages/Msite/Msite'
import Search from '../pages/Search/Search'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import Goods from '../pages/Shop/Goods/Goods'
import Info from '../pages/Shop/Info/Info'
import Rating from '../pages/Shop/Rating/Rating'

//先生成路由器，然后设置个集成的路由管理文件 交给路由器管理
export default [
  /* {
    path: '路由路径',
    component: '路由组件',
  } */
  {
    path: '/msite',
    component: Msite,
    meta: {
      isShowFooterGuide: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooterGuide: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooterGuide: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooterGuide: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        //二级路由也可以这样写，注意前面不要加/
        path: 'info',
        component: Info
      },
      {
        path: 'rating',
        component: Rating
      },
      {
        path: '/shop',
        redirect: '/shop/goods'
      }
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]