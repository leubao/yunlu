<style>
    
</style>
<template>
<div class="page">
<Row>
<div class="layout-content">
    <div class="sub-nav">
        <subNav :subNavData="subNavData"  :subtitle="subtitle" ref="subNav"></subNav>
    </div>
    <!--加载功能操作区-->
    <Contents></Contents>  
</div>
</Row>
</div>
</template>
<script>
    import subNav from './sub-nav.vue'
    import Contents from './contents.vue'
    export default {
        data () {
            return {
                subNavData: [
                    {
                        title: '商品列表',
                        url: '/layout/content',
                    },
                    {
                        title: '商品添加',
                        url: '/layout/goods',
                    }
                ],
                subtitle:"商品管理"
            }
        },
        methods: {

        },
        components:{
            subNav,
            Contents
        }
    }
</script>