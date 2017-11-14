<style src="../../../static/css/merchant/merchant.less" lang="less" scoped></style>
<template>
    <div class="page">
        <div  class="breadcrumb">
            <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div class="main-info">
            <Row>
            <div class="search">
                <Col span="6">
                    <div>
                        <router-link tag="Button" class="ivu-btn-ghost" :to="{path:'/merchant/verifyorder'}"><Icon type="paper-airplane"></Icon> 订单核销</router-link>
                    </div>
                </Col>
                <Col span="18">
                    <Form ref="search" :model="search" :rules="ruleSearch" inline>
                        <FormItem prop="sn">
                            <Input v-model="search.sn" icon="ios-search" placeholder="请输入..." style="width: 140px"></Input>
                        </FormItem>
                        <FormItem prop="status">
                            <Select v-model="search.status" style="width:80px">
                                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem  prop="datetime">
                        <DatePicker type="daterange" v-model="search.datetime" format="yyyy/MM/dd" :options="datetime" placement="bottom-end" placeholder="选择日期范围" style="width: 200px"></DatePicker>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="searchSubmit('search')">查询</Button>
                            <Button type="ghost" @click="searchReset('search')">重置</Button>
                        </FormItem>
                    </Form>
                </Col>
            </div>
            </Row>

            <Table width="100%" :height="fixedHeader ? 250 : ''"  border :columns="tableHead" :data="orderList"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :current="1" :page-size="search.limit" show-total @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <div class="main-info">
            
        </div>
    </div>

</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
    data () {
        const validateSn = (rule, value, callback) => {
            if (value === '') {
                callback();
            } else {
                let reg = /^[0-9]*$/;
                if (!reg.test(value)) {
                    callback(new Error('请填写有效单号或手机号'));
                } else {
                    callback();
                }
            }
        };

        return {
            BreadcrumbData: [{title: '订单', url: ''}, {title: '订单列表', url: ''}],
            search: {
                datetime: [],
                sn: '',
                status: '',
                page: '1',
                limit: 20
            },
            ruleSearch: {
                sn: [
                    {validator: validateSn, trigger: 'blur'}
                ]
            },
            datetime: {
                shortcuts: [
                    {
                        text: '今天',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime());
                            return [start, end];
                        }
                    },
                    {
                        text: '一周',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '一个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '三个月',
                        value () {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            },
            statusList: [
                {
                    value: '3',
                    label: '预订成功'
                },
                {
                    value: '0',
                    label: '已作废'
                },
                {
                    value: '1',
                    label: '待确认'
                },
                {
                    value: '2',
                    label: '待支付'
                },
                {
                    value: '9',
                    label: '完结'
                }
            ],
            tableHead: [
                {
                    title: '订单号',
                    key: 'sn',
                    width: 150,
                    fixed: 'left',
                    align: 'center'
                },
                {
                    title: '预订产品',
                    key: 'product',
                    width: 180,
                    align: 'center'
                },
                {
                    title: '销售计划',
                    key: 'product',
                    width: 180,
                    align: 'center'
                },
                {
                    title: '数量',
                    key: 'number',
                    width: 65,
                    align: 'center'
                },
                {
                    title: '金额',
                    key: 'money',
                    width: 80,
                    align: 'right'
                },
                {
                    title: '取票人',
                    key: 'contact',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '支付方式',
                    key: 'pay',
                    width: 90,
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'status',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    fixed: 'right',
                    align: 'center',
                    width: 70,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index);
                                    }
                                }
                            }, '查看')
                        ]);
                    }
                }
            ],
            orderList: [],
            total: 0,
            fixedHeader: false
        };
    },
    components: {
        Breadcrumb
    },
    methods: {
        searchSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.search.page = 1;
                    this.getData(this.search);
                } else {
                    this.$Message.error('搜索条件验证失败!');
                }
            });
        },
        // 重置表单
        searchReset (name) {
            this.$refs[name].resetFields();
            this.getData(this.search);
        },
        // 切换分页
        changePage (pages) {
            this.search.page = pages;
            this.getData(this.search);
        },
        getData (map) {
            this.request('OrderList', map, true).then((res) => {
                if (res.status) {
                    // 列表数据
                    this.orderList = res.data.list;
                    this.total = res.data.count;
                }
            });
        }
    },
    mounted () {
        // 服务端获取数据
        this.getData(this.search);
    }
};
</script>