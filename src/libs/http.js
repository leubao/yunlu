/**
 * Created by truncate on 2017/4/19.
 * 网络请求插件 引入了toast 加载提示
 */

import methodMap from './methodMap'
import AxiosInst from './axios'
import {filterRouters} from '../router'
import Router from '../router.js'

class Http {

}

Http.install = function (Vue) {

    /**
     * 全局请求接口
     * @param method 方法
     * @param opts 参数
     * @param toast 是否提示
     * @returns {string}
     */
    Vue.prototype.request = function (method, opts, toast) {
        //如果有给 toast 参数则显示 loading 加载数据
        if(toast) {
            Vue.prototype.$loading("加载中")
        }
        let m = methodMap[method]
        if (m) {
            var opts_type = typeof(opts);
            if (opts_type == null || opts_type != 'object') {
                opts = {}
            }
            if(m.method == 'get') {
                return Vue.prototype.apiGet(m.url, opts)
            } else if(m.method == 'post') {
                return Vue.prototype.apiPost(m.url, opts)
            } else {
                return "非法请求";
            }

        } else {
            closeLoading()
            console.log("url 错误", "返回结果：err = ", "无法请求，无效的请求！", "\n")
        }
    }

    /**
     * POST 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiPost = function(url, data) {
        return new Promise((resolve, reject) => {
            AxiosInst.post(url, data).then((response) => {
                Vue.prototype.response(response.data)
                resolve(response.data)
            }).catch((response) => {
                console.log('Customize Notice', response)
                closeLoading()
                reject(response)
            })
        })
    }

    /**
     * GET 请求 无提示
     * @param url 请求URL
     * @param data 请求数据
     * @returns {Promise}
     */
    Vue.prototype.apiGet = function(url, data) {
        return new Promise((resolve, reject) => {
            AxiosInst.get(url, {
                params: data
            }).then((response) => {
                Vue.prototype.response(response.data)
                resolve(response.data)
            }).catch((response) => {
                console.log('Customize Notice', response)
                closeLoading()
                reject(response)
            })
        })
    }

    /**
     * 关闭方法
     */
    function closeLoading() {
        Vue.prototype.$loading.close()
    }

    /**
     * 返回码检查
     * @param data
     * @returns {boolean}
     */
    Vue.prototype.response = function (data) {
        if(data == null) {
            console.log("接口输出异常...")
            this.$Message.error("接口输出异常...")
            setTimeout(() => closeLoading(), 800)
            return false
        }
        //登陆失效 做退出处理
        if(data['code'] == 1000) {
            this.$Message.error(data['msg'])
            let uid = Store.state.User.user_info.uid
            let menu = Store.state.MainMenu.mainMenu
            let new_router = filterRouters(Router.options.routes, menu)
            Router.options.routes = new_router
            delMainMenu(Store)
            userOut(Store)
            Router.push({path: '/login'})
            //暂时不后台处理退出
            // this.request("LoginOut", {uid: uid}).then((res) => {
            //     if (res.status) {
            //
            //     }
            // })
            setTimeout(() => closeLoading(), 800)
            return false
        }
        //没有权限
        if(data['code'] == 1001) {
            this.$Message.error(data['msg'])
            setTimeout(() => closeLoading(), 800)
            return false
        }
        //延迟关闭
        setTimeout(() => closeLoading(), 800)
    }
}

export default Http
