/**
 * Created by truncate on 2017/3/27.
 */

import * as types from '../mutation-types';
import Cookies from 'js-cookie';
const state = {
    userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {},
    token: window.localStorage.getItem('token') || ''
};

const mutations = {
    // 登陆 HttpOnly
    [types.USER_LOGIN] (state, { userInfo, token }) {
        window.localStorage.setItem('userInfo', JSON.stringify(userInfo));
        // window.localStorage.setItem('token', token);
        Cookies.set('userInfo', JSON.stringify(userInfo));
        Cookies.set('token', token);
        state.userInfo = userInfo;
        state.token = token;
    },
    // 退出
    [types.USER_OUT] (state) {
        window.localStorage.removeItem('userInfo');
        // window.localStorage.removeItem('token');
        Cookies.remove('userInfo');
        Cookies.remove('token');
        state.userInfo = {};
        state.token = '';
    }
};

export default {
    state,
    mutations
};
