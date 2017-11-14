<style src="../../../static/css/merchant/merchant.less" lang="less" scoped></style>
<template>
	<div class="page">
        <div  class="breadcrumb">
            <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div class="main-info">
            <Row>
            <div class="search">
                <Col span="10">
                    <div>
                        <router-link tag="Button" class="ivu-btn-primary" :to="{path:'/user/add'}">添加员工</router-link>
                    </div>
                </Col>
                <Col span="14">
                    <Form ref="formInline" :model="formInline" inline>
                        <FormItem>
                            <Input v-model="formInline.title" icon="ios-search" placeholder="请输入..." style="width: 200px"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
                            <Button type="ghost" @click="handleSubmit('formInline')">重置</Button>
                        </FormItem>
                    </Form>
                </Col>
            </div>
            </Row>
            <MorePanel></MorePanel>
           <Table width="100%" height="200" border :columns="columns2" :data="data4"></Table> 
        </div>
    </div>
</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
import MorePanel from '../../components/more-panel.vue';
export default {
    data () {
        return {
            BreadcrumbData: [{title: '设置', url: ''}, {title: '员工列表', url: ''}],
            formInline: {
                title: ''
            },
            columns2: [
                {
                    title: '姓名',
                    key: 'name',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: '年龄',
                    key: 'age',
                    width: 100
                },
                {
                    title: '省份',
                    key: 'province',
                    width: 100
                },
                {
                    title: '市区',
                    key: 'city',
                    width: 100
                },
                {
                    title: '地址',
                    key: 'address',
                    width: 200
                },
                {
                    title: '邮编',
                    key: 'zip',
                    width: 100
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, '查看'),
                            h('Button', {
                                props: {
                                    type: 'text',
                                    size: 'small'
                                }
                            }, '编辑')
                        ]);
                    }
                }
            ],
            data4: [
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    province: '北京市',
                    city: '朝阳区',
                    zip: 100000
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    province: '北京市',
                    city: '海淀区',
                    zip: 100000
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    province: '上海市',
                    city: '浦东新区',
                    zip: 100000
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    province: '广东',
                    city: '南山区',
                    zip: 100000
                },
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    province: '北京市',
                    city: '朝阳区',
                    zip: 100000
                },
                {
                    name: '张小刚',
                    age: 25,
                    address: '北京市海淀区西二旗',
                    province: '北京市',
                    city: '海淀区',
                    zip: 100000
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    province: '上海市',
                    city: '浦东新区',
                    zip: 100000
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    province: '广东',
                    city: '南山区',
                    zip: 100000
                }
            ]
        };
    },
    components: {
        Breadcrumb,
        MorePanel
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