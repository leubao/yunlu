import axios from 'axios';
import Vue from 'vue';
import Qs from 'qs';
import Api from './api';
import Cookies from 'js-cookie';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
const router = new VueRouter();

const config = {
    baseURL: Api.domain,
    timeout: 2000,
    // `withCredentails`选项表明了是否是跨域请求
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'XMLHttpRequest'
    },
    transformRequest: [function (data) {
        // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
        data = Qs.stringify(data);
        return data;
    }],
    // 返回数据类型
    responseType: 'json'
};

const AxiosInst = axios.create(config);
// 请求拦截器
AxiosInst.interceptors.request.use((configs) => {
    if (window.localStorage.getItem('token') || Cookies.get('token')) {
        // 判断是否存在token 不存在
       // configs.headers.Authorization = `${window.localStorage.getItem('token')}`;
        configs.headers.Authorization = Cookies.get('token');
    } else {
        // 不存在的带上APPID和appkey
        // configs.headers = PostData;
    }
    return configs;
}, (err) => {
    return Promise.reject(err);
});

// 响应拦截器
AxiosInst.interceptors.response.use((response) => {
   // console.log(response.data.code);
    // 对响应数据做些事
    if (response.data.code === '1004') {
        // 强制退出，回到登录界面 TODO 显示提示信息后再跳转
        Cookies.remove('userInfo');
        Cookies.remove('token');
        console.log(response.data.code);
        router.push({
            path: 'login'
        });
        // 跳转到登录界面 删除当前所有的token之类的信息 todo
        // this.$router.push({ path: '/login' });
        // window.location.reload();
    }
    return response;
}, (error) => {
    // 请求错误时做些事
    return Promise.reject(error);
});

export default AxiosInst;
