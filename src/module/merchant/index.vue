<style src="../../../static/css/merchant/merchant.less" lang="less" scoped></style>
<template>
    <div class="wrapper">
        <div class="layout-header">
            <div class="layout-header-nav">
                <div class="layout-logo"><img src="https://www.alizhiyou.com/static/images/logo.png"></div>
                <div class="layout-header-nav-list">
                    <Menu mode="horizontal" @on-select="routeTo">
                        <Menu-item name="/index/">
                            <Icon type="ios-home"></Icon>
                            首页
                        </Menu-item>
                        <Menu-item name="einfo">
                            <Icon type="ios-bell"></Icon>
                            消息
                        </Menu-item>
                        <Menu-item name="einfo">
                            <Icon type="social-bitcoin"></Icon>
                            费用
                        </Menu-item>
                        <Menu-item name="einfo">
                            <Icon type="settings"></Icon>
                            工单
                        </Menu-item>
                        <Menu-item name="help">
                            <Icon type="help-circled"></Icon>
                            帮助
                        </Menu-item>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="person"></Icon>
                                {{ user.nickname }}
                            </template>
                            <Menu-item name="/account"><Icon type="clipboard"></Icon>基本资料</Menu-item>
                            <Menu-item name="/changepwd"><Icon type="locked"></Icon>修改密码</Menu-item>
                            <Menu-item name="/login"><Icon type="power"></Icon>退出登录</Menu-item>
                        </Submenu>
                    </Menu>
                </div>
            </div>         
        </div>
        <div class="layout">
            <div class="layout-container">
                <Row>
                    <i-col span="4" class="layout-container-left">
                        <Menu active-name="/merchant/home" width="auto" :open-names="['home','merchant','order','product','setting']" @on-select="routeTo">
                            <Submenu name="home">
                                <template slot="title">
                                    <Icon type="ios-home"></Icon>
                                    概况
                                </template>
                                <Menu-item name="/merchant/home">概况分析</Menu-item>
                                <Menu-item name="/report/user">用户分析</Menu-item>
                                <Menu-item name="/report/visit">访问分析</Menu-item>
                            </Submenu>
                            <Submenu name="merchant">
                                <template slot="title">
                                    <Icon type="ios-pricetags"></Icon>
                                    收款
                                </template>
                                <Menu-item name="/merchant/window">窗口收款</Menu-item>
                            </Submenu>
                            <Submenu name="order">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    订单
                                </template>
                                <Menu-item name="/order/lists">订单列表</Menu-item>
                                <Menu-item name="/merchant/verifyorder">订单核销</Menu-item>
                            </Submenu>
                            <Submenu name="card">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    卡券
                                </template>
                                <Menu-item name="/cardlist">卡券列表</Menu-item>
                            </Submenu>
                            <Submenu name="product">
                                <template slot="title">
                                    <Icon type="ios-pricetags"></Icon>
                                    产品
                                </template>
                                <Menu-item name="/product/lists">产品列表</Menu-item>
                            </Submenu>
                            <Submenu name="setting">
                                <template slot="title">
                                    <Icon type="ios-gear"></Icon>
                                    基本设置
                                </template>
                                <Menu-item name="/setting/lite">小程序信息</Menu-item>
                                <Menu-item name="/setting/config">系统设置</Menu-item>
                                <Menu-item name="/user/lists">员工管理</Menu-item>
                                <Menu-item name="/setting/payset">支付设置</Menu-item>
                            </Submenu>
                            
                        </Menu>
                    </i-col>
                    <i-col span="20" class="layout-container-main">
                            <transition mode="out-in">
                                <router-view name="mainView"></router-view>
                            </transition>
                    </i-col>
                </Row>
            </div>
            <!--帮助信息-->
            <Modal v-model="helpModel" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>访问商城</span>
                </p>
                <div style="text-align:center">
                    <p>手机扫码访问</p>
                </div>
                <div slot="footer">
                    <p><a href="">复制页面链接</a> <a href="">电脑上查看</a></p>
                </div>
            </Modal>   
        </div>
        <div class="footer">
                <div class="layout-copy">
                    2013-2017 &copy; <a href="http://www.leubao.com" target="_blank">leubao.com</a> lubRDF v1.0.1
                </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            user: {},
            helpModel: false
        };
    },
    mounted () {
        this.user = this.$store.state.User.userInfo;
    },
    methods: {
        routeTo (e) {
            if (e === 'einfo') {
                this.$Message.info('等待服务全面接入...');
            } else if (e === 'help') {
                console.log(e);
                // helpModel: true;
                this.$Modal.confirm({
                    title: '关于我们',
                    content: '<p>联系人 : 周靖</p><p>电  话 : 0314-2157042 </p><p>微  信 : zj880910</p><p>官  网 : http://www.leubao.com</p><p>公  司 : 承德乐游宝软件开发有限公司</p><p>地  址 : 承德市双滦区君泰财富广场电商大厦711室</p>',
                    okText: '关闭'
                });
            } else {
                this.$router.push(e);
            }
        }
    }
};
</script>
