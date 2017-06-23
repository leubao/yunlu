<style></style>
<template>
	<div class="content">
        <div class="act-nav">
            <actNav :actNavData="actNavData" ref="actNav"></actNav>
        </div>
        <!--操作导航/-->
        <div class="funarea">
        <transition mode="out-in">
	        <router-view name="subView"></router-view>
	    </transition>
        </div>
    </div>
</template>
<script>
	import actNav from './act-nav.vue'
	export default {
        data () {
            return {
                actNavData:[
                    {
                        title: '商品列表',
                        url: '/home'
                    },
                    {
                        title: '商品添加',
                        url: '/layout/goods'
                    }
                ]
            }
        },
        methods: {

        },
        components:{
            actNav
        }
    }
</script>