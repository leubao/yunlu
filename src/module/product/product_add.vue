<style src="../../../static/css/merchant/merchant.less" lang="less" scoped></style>
<template>
	<div class="page">
        <div  class="breadcrumb">
            <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div class="main-info">
             <Row>
                <Col offset="1" span="12">
                <div class="mt30">
                    <Form ref="addFrom" :model="addFrom" :rules="ruleForm" :label-width="120">
                        <Form-item label="产品名称" prop="title">
                            <Input type="text" v-model="addFrom.title" placeholder="登录后显示的名称">
                            </Input>
                        </Form-item>
                        <Form-item label="商品原价（元）" prop="price">
                            <Input type="text" v-model="addFrom.price" placeholder="请输入产品原始价格">
                            </Input>
                        </Form-item>
                        <Form-item label="价格（元）" prop="prices">
                            <Input type="text" v-model="addFrom.prices" placeholder="请输入产品价格">
                            </Input>
                        </Form-item>
                        <Form-item label="默认库存" prop="sku">
                            <Input type="text" v-model="addFrom.sku">
                            </Input>
                        </Form-item>
                        <Form-item label="排序" prop="sorting">
                            <InputNumber :min="1" v-model="addFrom.sorting"></InputNumber>
                        </Form-item>
                        <Form-item label="详情">
                            
                        </Form-item>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('addFrom')">提交</Button>
                            <Button type="ghost" @click="routerBack()" style="margin-left: 8px">返回</Button>
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
        return {
            BreadcrumbData: [{title: '基础设置', url: ''}, {title: '产品列表', url: ''}, {title: '产品添加', url: ''}],
            addFrom: {
                title: '',
                price: '',
                prices: '',
                sorting: 1,
                sku: 0
            },
            ruleForm: {
                title: [
                    { required: true, message: '产品名称不能为空', trigger: 'blur' }
                ],
                prices: [
                    { required: true, message: '产品销售价格不能为空', trigger: 'blur' }
                ],
                sku: [
                    { required: true, message: '产品库存不能为空', trigger: 'blur' }
                ],
                nickname: [
                    { required: true, message: '登录后显示的名称不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        Breadcrumb
    },
    mounted () {
        // console.log('这个页面加载了');
        // 服务端获取数据
        // this.getData();
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 鼠标自动定位到隐藏文本域里
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        // 重置表单
        handleReset (name) {
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
        },
        routerBack () {
            this.$router.go(-1);
        }
    }
};
</script>