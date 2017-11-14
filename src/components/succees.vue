<style lang="">
	.box900{width: 900px;height: auto;margin: 0 auto;}
    .main {background-color: #fff;margin: 40px 0 20px;padding-bottom: 20px;border-bottom: 1px solid #e5e5e5;}
    .main .lost-pw {float: right;color: #666;font-size: 12px;}
</style>
<template>
	<div class="box900">
        <minHeader :headerTitle="headerTitle" :topUrl="topUrl"></minHeader>
        <Card>
            <div style="text-align:center">
                <Icon type="checkmark-circled" size="130" color="#19be6b"></Icon>
                <h3>授权成功</h3>
            </div>
        </Card>
        <minFooter></minFooter>
    </div>
</template>
<script>
import minHeader from './min-header.vue';
import minFooter from './min-footer.vue';
export default {
    data () {
        return {
            headerTitle: '成功提示',
            topUrl: {'title': '免费注册,立即使用', 'tourl': '/wechat/register'}
        };
    },
    components: {
        minHeader,
        minFooter
    },
    methods: {

    }
};
</script>