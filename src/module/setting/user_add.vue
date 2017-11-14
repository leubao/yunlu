<style src="../../../static/css/merchant/merchant.less" lang="less" scoped></style>
<template>
	<div class="page">
        <div  class="breadcrumb">
            <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div class="main-info">
             <Row>
                <Col offset="3" span="12">
                <div class="mt30">
                    <Form ref="register" :model="register" :rules="ruleInline" :label-width="120">
                        <Form-item label="姓名" prop="nickname">
                            <Input type="text" v-model="register.nickname" placeholder="登录后显示的名称">
                            </Input>
                        </Form-item>
                        <Form-item label="手机号" prop="phone">
                            <Input type="text" v-model="register.phone" placeholder="今后使用手机号登录">
                            </Input>
                        </Form-item>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">返回</Button>
                        </FormItem>
                    </Form>
                </div>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
    data () {
        const validatePhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号不能为空'));
            }
            let reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
            if (!reg.test(value)) {
                callback(new Error('请正确输入手机号码'));
            } else {
                this.request('Check', {'phone': value, 'check': 'phone'}).then((res) => {
                    if (res.status) {
                        callback();
                    } else {
                        callback(new Error(res.msg));
                    }
                });
            }
        };
        return {
            BreadcrumbData: [{title: '基础设置', url: ''}, {title: '员工列表', url: ''}, {title: '员工添加', url: ''}],
            register: {
                nickname: '',
                phone: '',
                password: '',
                code: ''
            },
            ruleInline: {
                nickname: [
                    { required: true, message: '登录后显示的名称不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请填写手机号', trigger: 'blur' },
                    {validator: validatePhone, trigger: 'blur'}
                ]
            }
        };
    },
    components: {
        Breadcrumb
    },
    mounted () {
        console.log('这个页面加载了');
        // 服务端获取数据
        // this.getData();
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
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
            this.request('UserList', params, true).then((res) => {
                if (res.status) {
                    // 列表数据
                    this.lists = res.data.list;
                }
            });
        }
    }
};
</script>