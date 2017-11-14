/**
 * Created by truncate on 2017/4/17.
 * vuex 方法
 */
import * as types from '../mutation-types';
/**
 * 用户登陆
 * @param commit
 * @param user_info
 * @param token
 */
export const userLogin = ({ commit }, {userInfo, token}) => {
    if (userInfo && token) {
        commit(types.USER_LOGIN, {
            userInfo: userInfo,
            token: token
        });
    }
};

/**
 * 用户退出
 * @param commit
 */
export const userOut = ({ commit }) => {
    commit(types.USER_OUT, {
        userInfo: {},
        token: ''
    });
};

/**
 * 保存菜单
 * @param commit
 * @param menu
 */
export const mainMenu = ({ commit }, menu) => {
    if (menu) {
        commit(types.MAIN_MENU, menu);
    }
};

/**
 * 删除左侧菜单
 * @param commit
 * @param menu
 */
export const delMainMenu = ({ commit }) => {
    commit(types.DEL_MAIN_MENU, {});
};

export const auth = ({ commit }, auth) => {
    commit(types.AUTH, auth);
};
