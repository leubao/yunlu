import Home from './page/home.vue'
import LayoutContent from './components/common/layout-content.vue'
import Content from './page/content.vue'
import Froms from './page/from.vue'
import Goods from './page/goods.vue'
import Login from './page/login/login.vue'
import Register from './page/login/register.vue'
import Retrieve from './page/login/retrieve.vue'
const routers = [
  {
     path: '/',
     redirect:'/home'
  },
  {
      path: '/login', //登录
      name: 'login',
      meta: {
          title: '账户登陆',
          routeAuth: false
      },
      component: Login,
      display: 0
  },
  {
      path: '/register', //登录
      name: 'register',
      meta: {
          title: '用户注册',
          routeAuth: false
      },
      component: Register,
      display: 0
  },
  {
      path: '/retrieve', //登录
      name: 'retrieve',
      meta: {
          title: '找回密码',
          routeAuth: false
      },
      component: Retrieve,
      display: 0
  },
  {
    path: '/',
    meta: {
        title: '云鹿中央控制台'
    },
    component: (resolve) => require(['./components/Hello.vue'], resolve),
    children:[
        {path:'home',components:{mainView:Home},children:[]},
        {path:'content',components:{mainView:Content}},
        {path:'layout',components:{mainView:LayoutContent},
            children:[
                {path:'content',components:{subView:Content}},
                {path:'goods',components:{subView:Goods}}
            ]
        },
        {path:'from',components:{mainView:Froms}}
    ]
  }
];
export default routers;
