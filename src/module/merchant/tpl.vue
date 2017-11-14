<style src="../../../static/css/merchant/merchant.less" lang="less" scoped></style>
<template>
	<div class="page">
        <div  class="breadcrumb">
        <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div>
            
        </div>
    </div>
</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
    data () {
        return {
            BreadcrumbData: [{title: '收款', url: '/merchant/window'}, {title: '窗口收款', url: ''}]
        };
    },
    components: {
        Breadcrumb
    },
    mounted () {
        // 服务端获取数据
        this.getData();
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 禁用收款按钮变文本为正在收款
                    this.loading = true;
                    // 鼠标自动定位到隐藏文本域里
                    this.$refs.barcode.focus();
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        // 重置表单
        handleReset (name) {
            this.loading = false;
            this.current = 0;
            this.$refs.money.focus();
            this.$refs[name].resetFields();
        },
        getData (params) {
            if (!params) params = {page: 1};
            this.request('WechatList', params, true).then((res) => {
                if (res.status) {
                    // 列表数据
                    this.lists = res.data.list;
                }
            });
        }
    }
};
</script>