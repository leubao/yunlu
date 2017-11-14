import Login from './module/public/login/login.vue';
import Logout from './module/public/login/logout.vue';
import Register from './module/public/login/register.vue';
import Retrieve from './module/public/login/retrieve.vue';

import Home from './module/merchant/home.vue';
// 收款
import Window from './module/cashier/window.vue';
// 设置
import Config from './module/setting/config.vue';
import Payset from './module/cashier/setting.vue';
import Lite from './module/setting/lite.vue';
// 订单列表
import OrderList from './module/order/lists.vue';
import VerifyOrder from './module/merchant/verify_order.vue';
// 用户列表
import UserList from './module/setting/userlist.vue';
import UserAdd from './module/setting/user_add.vue';
// 产品列表
import ProductList from './module/product/product.vue';
import ProductAdd from './module/product/product_add.vue';
// 图表
import AnalysisUser from './module/report/user.vue';
import AnalysisVisit from './module/report/visit.vue';
const routers = [
    {
        path: '/',
        meta: {title: '云鹿景区收银管理平台'},
        component: (resolve) => require(['./module/index/index.vue'], resolve)
    },
    {
        path: '/login', // 登录
        name: 'login',
        meta: {
            title: '账户登陆',
            signLogin: false
        },
        component: Login,
        display: 0
    },
    {
        path: '/logout', // 登录
        name: 'logout',
        meta: {
            title: '退出登录',
            signLogin: false
        },
        component: Logout,
        display: 0
    },
    {
        path: '/register', // 登录
        name: 'register',
        meta: {
            title: '用户注册',
            signLogin: false
        },
        component: Register,
        display: 0
    },
    {
        path: '/retrieve', // 登录
        name: 'retrieve',
        meta: {
            title: '找回密码',
            signLogin: false
        },
        component: Retrieve,
        display: 0
    },
    {
        path: '/index',
        meta: {
            title: '账号列表'
        },
        component: (resolve) => require(['./module/index/index.vue'], resolve)
    },
    {
        path: '/account',
        meta: {title: '个人账号设置'},
        component: (resolve) => require(['./module/index/account.vue'], resolve)
    },
    {
        path: '/changepwd',
        meta: {title: '修改密码'},
        component: (resolve) => require(['./module/index/changepwd.vue'], resolve)
    },
    {
        path: '/wechat/register',
        meta: {
            title: '新增授权账号'
        },
        component: (resolve) => require(['./module/wechat/register.vue'], resolve)
    },
    {
        path: '/succees',
        meta: {
            title: '成功提示'
        },
        component: (resolve) => require(['./components/succees.vue'], resolve)
    },
    {
        path: '/wechat/oauth',
        meta: {
            title: '公众号授权'
        },
        component: (resolve) => require(['./module/wechat/oauth.vue'], resolve)
    },
    {
        path: '/wechat/personal',
        meta: {
            title: '账号设置'
        },
        component: (resolve) => require(['./module/wechat/oauth.vue'], resolve)
    },
    {
        path: '/wechat/oauth/callback',
        meta: {
            title: '授权回调'
        },
        component: (resolve) => require(['./module/public/callback.vue'], resolve)
    },
    {
        path: '/merchant/home',
        meta: {
            title: '云鹿景区收银管理平台'
        },
        component: (resolve) => require(['./module/merchant/index.vue'], resolve),
        children: [
            {path: '', components: {mainView: Home}, children: []},
            {path: '/merchant/verifyorder', components: {mainView: VerifyOrder}, children: []},
            {path: '/merchant/window', components: {mainView: Window}, children: []},
            {path: '/setting/config', components: {mainView: Config}},
            {path: '/setting/payset', components: {mainView: Payset}, children: []},
            {path: '/setting/lite', components: {mainView: Lite}},
            {path: '/user/lists', components: {mainView: UserList}, children: []},
            {path: '/user/add', components: {mainView: UserAdd}},
            {path: '/product/lists', components: {mainView: ProductList}},
            {path: '/product/add', components: {mainView: ProductAdd}},
            {path: '/order/lists', components: {mainView: OrderList}, children: []},
            {path: '/report/user', components: {mainView: AnalysisUser}},
            {path: '/report/visit', components: {mainView: AnalysisVisit}}
        ]
    }
];
export default routers;
