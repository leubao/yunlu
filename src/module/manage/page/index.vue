<style scoped>
    .layout{
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-width: 100vw;
        background: #f5f7f9;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 420px;
        margin: 0 auto;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    #layout-main{
        height: 85vh;
    }
</style>
<template>
    <div class="layout">
        <header id="header" class="header">
            <Menu mode="horizontal" theme="dark" active-name="1" @on-select="routeTo">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <Menu-item name="/layout">
                    <Icon type="ios-bell"></Icon>
                    消息
                </Menu-item>
                <Menu-item name="2">
                    <Icon type="social-bitcoin"></Icon>
                    费用
                </Menu-item>
                <Menu-item name="3">
                    <Icon type="settings"></Icon>
                    工单
                </Menu-item>
                <Menu-item name="4">
                    <Icon type="help-circled"></Icon>
                    帮助
                </Menu-item>
            </div>
             <div class="layout-ceiling-main">
                <a href="#">安全中心</a> |
                <a href="#">服务大厅</a>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="person"></Icon>
                        周靖
                    </template>
                    <Menu-item name="3-1"><Icon type="clipboard"></Icon>基本资料</Menu-item>
                    <Menu-item name="3-2"><Icon type="help-buoy"></Icon>安全设置</Menu-item>
                    <Menu-item name="3-3"><Icon type="ios-body"></Icon>会员中心</Menu-item>
                    <Menu-item name="/home"><Icon type="locked"></Icon>修改密码</Menu-item>
                    <Menu-item name="/login"><Icon type="power"></Icon>退出登录</Menu-item>
                </Submenu>
            </div>
        </Menu>
        </header><!-- /header -->

        <div id="layout-main" class="layout-main">
            <div class="main-nav">
                <Menu active-name="/home" theme="dark" width="90px" @on-select="routeTo">
                    <Menu-item name="/home">
                        <Icon type="ios-monitor"></Icon>
                        <span class="layout-text">首页</span>
                    </Menu-item>
                    <Menu-item name="/layout">
                        <Icon type="ios-pricetags"></Icon>
                        <span class="layout-text">商品</span>
                    </Menu-item>
                    <Menu-item name="/layout/content">
                        <Icon type="android-list"></Icon>
                        <span class="layout-text">订单</span>
                    </Menu-item>
                    <Menu-item name="/from">
                        <Icon type="ios-people"></Icon>
                        <span class="layout-text">客户</span>
                    </Menu-item>
                    <Menu-item name="1">
                        <Icon type="stats-bars"></Icon>
                        <span class="layout-text">数据</span>
                    </Menu-item>
                    <Menu-item name="/setting">
                        <Icon type="ios-gear"></Icon>
                        <span class="layout-text">设置</span>
                    </Menu-item>
                </Menu>
            </div>
            <transition mode="out-in">
                <router-view name="mainView"></router-view>
            </transition>
        </div>
        <footer class="layout-copy">
            2013-2017 &copy; <a href="http://www.leubao.com" target="_blank">leubao.com</a> lubRDF v1.0.1
        </footer>
    </div>
</template>
<script>
    export default {
        data () {

            return {
                
            }
        },
        methods: {
            routeTo(e) {
                //console.log(e);
                //screenWidth:document.body.clientWidth,
                //screenHeight:document.body.clientHeight,
                this.$router.push(e);
            }
        }
    }
</script>