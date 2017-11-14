<style>
    .min-header{
        margin: 50px 0 40px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 30px;
    }
    .min-header .header-side {
        display: flex;
        float: right;
        margin-top: 12px;
    }
    .header-side .account {
        font-size: 14px;
        flex-direction: row;
        margin-right: 10px;
    }
    .header-side .links {
        font-size: 14px;
        color: #3388FF;
    }
    .min-header .header-title {
        position: relative;
        top: 10px;
        font-size: 16px;
        color: #333;
        padding-left: 10px;
        margin: 0 100px 0 95px;
        border-left: 2px solid #ebebeb;
    }
    .min-header .header-logo {
        float: left;
        top: 10px;
        width: 77px;
        height: 24px;
        background: url(/static/v1/images/logo.png) no-repeat;
        position: relative;
        margin-top: -1px;
        background-size: cover;
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 1.5), not all, not all, not all .min-header .header-logo {
        background: url(/static/v1/images/logo.png) no-repeat;
        background-size: cover;
    }
</style>
<template>
<div class="min-header">
    <div class="header-side">
        <div class="account"> {{ user.nickname }} </div>
        <div class="links">
           <router-link v-for="(item, index) in topUrl" :to="{path:item.tourl}" class="js-route-transfer">
           <span v-if=" index > '0'">-</span>
            {{item.title}}
           </router-link>
        </div>
    </div>
    <a href="/" class="js-route">
        <div class="header-logo"></div>
    </a>
    <div class="header-title">{{headerTitle}}</div>
</div>
</template>
<script>
export default {
    data () {
        return {
        };
    },
    props: ['headerTitle', 'topUrl', 'user'],
    methods: {
    }
};
</script>