/**
 * Created by truncate on 2017/3/31.
 */
const Api = window.Api || {};
/**
 * [domain description]
 * @type {[type]}
 */
Api.domain = process.env.NODE_ENV === 'production' ? ' ' : ' ';
Api.auth_call_back = process.env.NODE_ENV === 'production' ? 'https://pro.act.alizhiyou.com' : 'https://pro.act.alizhiyou.com';
export default Api;
