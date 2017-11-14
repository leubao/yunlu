/**
 * Created by truncate on 2017/4/19.
 * 网络请求插件 引入了toast 加载提示
 */
import methodMap from './methodMap';
import AxiosInst from './axios';
class Http {

}

Http.install = function (Vue) {
    /**
     * @Author   zhoujing   <zhoujing@leubao.com>
     * @DateTime 2017-08-17
     * 全局请求接口
     * @param    {[type]}   method                方法
     * @param    {[type]}   opts                  参数
     * @param    {[type]}   toast                 是否提示
     * @return   {[type]}                         [description]
     */
    Vue.prototype.request = function (method, opts, toast) {
        // 如果有给 toast 参数则显示 loading 加载数据
        if (toast && typeof (toast) === 'boolean') {
            Vue.prototype.$loading('加载中...');
        } else if (toast && typeof (toast) === 'string') {
            Vue.prototype.$loading(toast);
        }
        let m = methodMap[method];
        if (m) {
            var optsType = typeof (opts);
            if (optsType === null || optsType !== 'object') {
                opts = {};
            }
            switch (m.method) {
                case 'get':
                    return Vue.prototype.apiGet(m.url, opts);
                case 'post':
                    return Vue.prototype.apiPost(m.url, opts);
                case 'put':
                    return Vue.prototype.apiPost(m.url, opts);
                case 'delete':
                    return Vue.prototype.apiDel(m.url, opts);
                default:
                    return '非法请求';
            }
            /**
            if (m.method === 'get') {
                console.log(m.url);
                return Vue.prototype.apiGet(m.url, opts);
            } else if (m.method === 'post') {
                return Vue.prototype.apiPost(m.url, opts);
            } else {
                return '非法请求';
            }**/
        } else {
            closeLoading();
            console.log('url 错误', '返回结果：err = ', '无法请求，无效的请求！', '\n');
        }
    };
    /**
     * POST 请求 无提示
     * @Author   zhoujing   <zhoujing@leubao.com>
     * @DateTime 2017-08-17
     * @param    {[type]}   url                   请求URL
     * @param    {[type]}   data                  请求数据
     * @return   {Promise} [description]
     */
    Vue.prototype.apiPost = function (url, data) {
        // console.log(url);
        // console.log(data);
        return new Promise((resolve, reject) => {
            AxiosInst.post(url, data).then((response) => {
                Vue.prototype.response(response.data);
                resolve(response.data);
            })
            .catch((response) => {
                this.$Message.error('服务请求出错');
                console.log('Customize Notice', response);
                closeLoading();
                reject(response);
            });
        });
    };
    /**
     * @Author   zhoujing   <zhoujing@leubao.com>
     * @DateTime 2017-08-17
     * GET 请求 无提示
     * @param    {string}   url                   请求URL
     * @param    {object}   data                  请求数据
     * @return   {promise}                         [description]
     */
    Vue.prototype.apiGet = function (url, data) {
        // return new Promise((resolve, reject) => {
        return new Promise((resolve, reject) => {
            AxiosInst.get(url, {
                params: data
            }).then((response) => {
                Vue.prototype.response(response.data);
                resolve(response.data);
            })
            .catch((response) => {
                this.$Message.error('服务请求出错');
                console.log('Customize Notice', response);
                closeLoading();
                reject(response);
            });
        });
    };
    Vue.prototype.apiDel = function (url, data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            AxiosInst.delete(url, {params: data}).then((response) => {
                Vue.prototype.response(response.data);
                resolve(response.data);
            }).catch((response) => {
                this.$Message.error('服务请求出错');
                console.log('Customize Notice', response);
                closeLoading();
                reject(response);
            });
        });
    };
    /**
     * 关闭方法
     */
    function closeLoading () {
        Vue.prototype.$loading.close();
    }
    /**
     * 返回码检查
     * @Author   zhoujing   <zhoujing@leubao.com>
     * @DateTime 2017-08-17
     * @param    {object}   data                  数据
     * @return   {boolenan}                         [description]
     */
    Vue.prototype.response = function (data) {
        if (data === null) {
            console.log('接口输出异常...');
            this.$Message.error('接口输出异常...');
            setTimeout(() => closeLoading(), 800);
            return false;
        }
        setTimeout(() => closeLoading(), 800);
    };
};

export default Http;
