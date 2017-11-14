<style lang="less">
    .main {background-color: #fff;margin: 40px 0 20px;padding-bottom: 20px;border-bottom: 1px solid #e5e5e5;}
    .main .lost-pw {float: right;color: #666;font-size: 12px;}
	/*列表*/
    .select {
        background: #f8f8f8;
        padding-bottom: 5px;
    }
    /*内容头*/
    .infobar {
        position: relative;
        height: 75px;
        padding: 15px 20px;
        line-height: 20px;
        background: #f8f8f8;
    }
    .infobar .avatar {
        float: left;
        width: 45px;
        height: 45px;
        margin-right: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
    }
    .infobar h3 {
        font-size: 14px;
        color: #111;
        font-weight: 700;
        padding-top: 3px;
    }
    .infobar p {
        font-size: 12px;
        color: #666;
    }
    .infobar .create-btn {
        position: absolute;
        bottom: 20px;
        right: 25px;
    }
    /**内容块**/
    .select .box {
        min-height: 460px;
        padding: 0 30px 20px;
        overflow-y: hidden;
        margin: 0 5px;
        background-color: #fff;
    }
    .select .box .dp-list {
        margin-top: 20px;
    }
    .dp-list {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -moz-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        .ivu-btn{padding: 0px;color: #2d8cf0;}
    }
    .dp-item {
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 260px;
        height: 120px;
        padding: 0 20px;
        margin-bottom: 20px;
        border-radius: 2px;
        border: 1px solid #e5e5e5;
        border-top: 3px solid #d5d7db;
        background: #fff;
        cursor: pointer;
        color: #999;
    }
    .select .box .dp-list .dp-title {
        margin-top: 18px;
        font-size: 14px;
        line-height: 20px;
        padding-bottom: 5px;
        color: #111;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
    }
    .select .box .dp-list .dp-title .dp-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
    }
    .select .box .dp-list .dp-item p {
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .select .box .operate-label {
        position: absolute;
        left: 20px;
        bottom: 12px;
        height: 12px;
    }
    .select .box .operate-label a {
        margin-right: 5px;
    }
    .select .box .operate-label button {
        margin-right: 5px;
    }
    .dp-item span.type {
        position: absolute;
        bottom: 10px;
        right: 10px;
        border-radius: 2px;
        height: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 12px;
        padding: 3px;
        border: 1px solid #bbb;
        font-size: 12px;
        color: #bbb;
    }
</style>
<template>
	<div class="box900">
        <minHeader :headerTitle="headerTitle" :topUrl="topUrl" :user="user"></minHeader>
        <div class="select">
            <div class="infobar">
                <img alt="头像" class="avatar" src="https://img.yzcdn.cn/upload_files/avatar.png">
                <h3>{{user.nickname}}</h3>
                <p>{{user.phone}} <router-link :to="{path:'/account'}" class="info-setting">设置</router-link>  </p>
                <div class="create-btn">
                    <router-link :to="{path:'/wechat/oauth'}" tag="Button" class="ivu-btn ivu-btn-info">新增公众号/小程序</router-link>
                </div>
            </div>
            <div class="box">
                <ul class="dp-list">
                    <li class="dp-item" v-for="item in lists" @on-select="">
                        <div class="dp-title"><span class="dp-text" title="乐游宝承德">{{ item.nickname}}</span></div>
                        <div v-if="item.verify_type === '0'">
                            <p>主体信息：{{item.nickname}}</p>
                            <p>账号状态：已认证</p>
                            <div>
                                <div class="operate-label"><a href="javascript:void(0);">修改</a><a href="javascript:void(0);">删除</a></div>
                            </div>
                        </div>
                        <div v-else>
                            <p>账号状态：未授权</p>
                            <div>
                                <div class="operate-label">
                                    <router-link :to="{ path: '/merchant/home', query: { appid: item.authorizer_appid }}">管理</router-link>
                                    <router-link :to="{ path: '/wechat/oauth', query: { appid: item.authorizer_appid }}">修改</router-link>
                                    <Button type="text" @click="del( item.authorizer_appid )">删除</Button>
                                </div>   
                            </div>
                        </div>
                        <span class="type">公众平台</span>
                    </li>
                    <li class="dp-item" @on-select="">
                        <div class="dp-title"><span class="dp-text" title="乐游宝承德">乐游宝承德</span></div>
                        <p>主体信息：<!-- /react-text --><!-- react-text: 40 -->已认证，请完善信息<!-- /react-text --></p>
                        <p><!-- react-text: 42 -->店铺状态<!-- /react-text --><!-- react-text: 43 -->：<!-- /react-text --><!-- react-text: 44 -->已过期<!-- /react-text --></p>
                        <div>
                            <div class="operate-label">
                                 <router-link :to="{ path: '/merchant/home', query: 'appid:1221'}">管理</router-link>
                                <a href="javascript:void(0);">修改</a><a href="javascript:void(0);">删除</a></div>
                            <span class="type">微商城</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <BackTop :height="20" :bottom="80"></BackTop>
        <minFooter></minFooter>
    </div>
</template>
<script>
import minHeader from '../../components/min-top.vue';
import minFooter from '../../components/min-footer.vue';
export default {
    data () {
        return {
            user: {},
            headerTitle: '账号列表',
            lists: {},
            topUrl: [{'title': '退出', 'tourl': '/logout'}]
        };
    },
    components: {
        minHeader,
        minFooter
    },
    mounted () {
        this.user = this.$store.state.User.userInfo;
        // 链接服务器加载账号
        // 服务端获取数据
        this.getData();
        // console.log(this.$route.path)
        // this.$loading('加载中')
        // console.log(this.$router.options.routes)
        // console.log(this.$store.state.MainMenu.mainMenu)
        // token Ox4bwEj5_PcLjF8pDs7PDLqqwOK6Gm766HNTWulifoc39k0RjlwE90gRxp4E7gLn_omf_7ZSRmdLcZeNmy29wA
    },
    methods: {
        getData (params) {
            if (!params) params = {page: 1};
            this.request('WechatList', params, true).then((res) => {
                if (res.status) {
                    // 列表数据
                    this.lists = res.data.list;
                }
            });
        },
        routeTo (e) {
            this.$router.push(e);
        },
        del (id) {
            this.$Modal.confirm({
                title: '温馨提示',
                width: 300,
                content: '<p>你确定要删除?删除后不可恢复!</p>',
                loading: true,
                onOk: () => {
                    this.request('WechatDel', {id}).then((res) => {
                        if (res.status) {
                            this.$Message.info(res.msg);
                            this.$Modal.remove();
                        } else {
                            this.$Message.error(res.msg);
                            this.$Modal.remove();
                        }
                    });
                }
            });
        }
    }
};
</script>