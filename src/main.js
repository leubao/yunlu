// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Store from './module/vuex/store/index';
import App from './App';
import Util from './libs/util'; // 工具
import Cookies from 'js-cookie';
import 'iview/dist/styles/iview.css';
import './assets/css/common.css';

import Toast from './libs/toast/'; // 定制吐司
import Http from './libs/http'; // 请求工具
// 过滤器
import './libs/filter';
import Api from './libs/api';
import Plugin from './libs/plugin/formatDate';// 插件
// 引入编辑器
import VueQuillEditor from 'vue-quill-editor';

import '../static/ueditor/ueditor.config.js';
import '../static/ueditor/ueditor.all.min.js';
import '../static/ueditor/lang/zh-cn/zh-cn.js';
import '../static/ueditor/ueditor.parse.min.js';

Vue.use(VueRouter);

Vue.use(iView);

Vue.use(Toast);
Vue.use(Http);
Vue.use(Plugin);
Vue.use(VueQuillEditor);
Vue.config.productionTip = false;
window.Api = Api;
// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

router.beforeEach(({meta, path}, from, next) => {
    iView.LoadingBar.start();
    Util.title(meta.title);
    // window.localStorage.removeItem('userInfo');
    // window.localStorage.removeItem('token');
   // console.log(Cookies.get('PHPSESSID'));
    // 获取用户是否登陆
    // let token = window.localStorage.getItem('token');
    let token = Cookies.get('token');
    // let signLogin = meta.signLogin ? meta.signLogin : true;
    // console.log(meta.signLogin);
    // console.log(token);
    // console.log(signLogin);
    if (!token && ['/login', '/register', '/retrieve'].indexOf(path) === -1) {
       // console.log('22');
        next({path: '/login'});
    } else if (path === '/login' && token) {
        next({path: '/'});
    }
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router: router,
    store: Store,
    render: h => h(App)
});
