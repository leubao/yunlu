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
                <h3>退出成功</h3>
            </div>
        </Card>
        <minFooter></minFooter>
    </div>
</template>
<script>
import minHeader from '@/components/min-header.vue';
import minFooter from '@/components/min-footer.vue';
import {mapActions} from 'vuex';
export default {
    data () {
        return {
            user: {},
            singLogin: false,
            headerTitle: '成功提示',
            topUrl: {'title': '免费注册,立即使用', 'tourl': '/wechat/register'}
        };
    },
    components: {
        minHeader,
        minFooter
    },
    mounted () {
        this.user = this.$store.state.User.userInfo;
        setTimeout(() => {
            // 删除登陆的一切信息
            // this.delMainMenu(this);
            this.userOut(this);
            // 服务端退出
            this.request('LoginOut', {}).then((res) => {
                if (res.status) {
                    this.$Message.success(res.msg);

                    this.$router.push({path: '/login'});
                    // console.log(this.$router.options.routes)
                    // console.log(this.formValidate)
                } else {
                    this.$Message.error(res.msg);
                }
            });
        }, 1000);
    },
    methods: {
        ...mapActions(['userOut'])
    }
};
</script>