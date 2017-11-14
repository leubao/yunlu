<style lang="">
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
import minHeader from '../../components/min-top.vue';
import minFooter from '../../components/min-footer.vue';
export default {
    data () {
        return {
            user: {},
            headerTitle: '授权成功',
            lists: {},
            topUrl: [{'title': '退出', 'tourl': '/logout'}]
        };
    },
    components: {
        minHeader,
        minFooter
    },
    mounted () {
        window.close();
    },
    methods: {}
};
</script>