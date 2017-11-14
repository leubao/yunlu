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
                        <router-link tag="Button" class="ivu-btn-primary" :to="{path:'/product/add'}">添加产品</router-link>
                        <Button type="ghost" @click="handleSubmit('formInline')">上架</Button>
                        <Button type="ghost" @click="handleSubmit('formInline')">下架</Button>
                    </div>
                </Col>
                <Col span="14">
                    <Form ref="formInline" :model="formInline" inline>
                        <FormItem>
                            <Select v-model="formInline.type" style="width:100px">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
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

            <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="100" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
    data () {
        return {
            BreadcrumbData: [{title: '设置', url: ''}, {title: '员工列表', url: ''}],
            tableData3: [
                {
                    name: '王小明',
                    image: 'http://pifa.api.qingful.com/uploads/2017-10-25/386dc6e5-2796-4dbc-a34f-00863dc81b5d.jpg',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    date: '2016-10-03'
                },
                {
                    name: '张小刚',
                    age: 24,
                    address: '北京市海淀区西二旗',
                    date: '2016-10-01'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    date: '2016-10-02'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    date: '2016-10-04'
                },
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    date: '2016-10-03'
                },
                {
                    name: '张小刚',
                    age: 24,
                    address: '北京市海淀区西二旗',
                    date: '2016-10-01'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    date: '2016-10-02'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    date: '2016-10-04'
                },
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    date: '2016-10-03'
                },
                {
                    name: '张小刚',
                    age: 24,
                    address: '北京市海淀区西二旗',
                    date: '2016-10-01'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    date: '2016-10-02'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    date: '2016-10-04'
                },
                {
                    name: '王小明',
                    age: 18,
                    address: '北京市朝阳区芍药居',
                    date: '2016-10-03'
                },
                {
                    name: '张小刚',
                    age: 24,
                    address: '北京市海淀区西二旗',
                    date: '2016-10-01'
                },
                {
                    name: '李小红',
                    age: 30,
                    address: '上海市浦东新区世纪大道',
                    date: '2016-10-02'
                },
                {
                    name: '周小伟',
                    age: 26,
                    address: '深圳市南山区深南大道',
                    date: '2016-10-04'
                }
            ],
            showBorder: true,
            showStripe: false,
            showHeader: true,
            showIndex: false,
            showCheckbox: true,
            fixedHeader: false,
            tableSize: 'default',
            formInline: {
                title: '',
                type: ''
            },
            cityList: [
                {
                    value: 'beijing',
                    label: '北京市'
                },
                {
                    value: 'shanghai',
                    label: '上海市'
                },
                {
                    value: 'shenzhen',
                    label: '深圳市'
                },
                {
                    value: 'hangzhou',
                    label: '杭州市'
                },
                {
                    value: 'nanjing',
                    label: '南京市'
                },
                {
                    value: 'chongqing',
                    label: '重庆市'
                }
            ],
            dethumb: '../../../static/images/noimg.gif'
        };
    },
    computed: {
        tableColumns3 () {
            let columns = [];
            if (this.showCheckbox) {
                columns.push({
                    type: 'selection',
                    width: 60,
                    align: 'center'
                });
            }
            if (this.showIndex) {
                columns.push({
                    type: 'index',
                    width: 60,
                    align: 'center'
                });
            }
            columns.push({
                title: '图片',
                align: 'center',
                render: (h, params) => {
                    const row = params.row;
                    const thumb = row.image ? row.image : this.dethumb;
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: thumb
                            },
                            style: {
                                width: '65px',
                                height: '40px',
                                marginTop: '5px'
                            }
                        })
                    ]);
                }
            });
            columns.push({
                title: '日期',
                key: 'date',
                sortable: true
            });
            columns.push({
                title: '姓名',
                key: 'name'
            });
            columns.push({
                title: '年龄',
                key: 'age',
                sortable: true,
                filters: [
                    {
                        label: '大于25岁',
                        value: 1
                    },
                    {
                        label: '小于25岁',
                        value: 2
                    }
                ],
                filterMultiple: false,
                filterMethod (value, row) {
                    if (value === 1) {
                        return row.age > 25;
                    } else if (value === 2) {
                        return row.age < 25;
                    }
                }
            });
            columns.push({
                title: '地址',
                key: 'address',
                filters: [
                    {
                        label: '北京',
                        value: '北京'
                    },
                    {
                        label: '上海',
                        value: '上海'
                    },
                    {
                        label: '深圳',
                        value: '深圳'
                    }
                ],
                filterMethod (value, row) {
                    return row.address.indexOf(value) > -1;
                }
            });
            columns.push({
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
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
                        }, '查看'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index);
                                }
                            }
                        }, '删除')
                    ]);
                }
            });
            return columns;
        }
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
        },
        changePage () {
        },
        show (index) {
            this.$Modal.info({
                title: '用户信息',
                content: `姓名：${this.tableData3[index].name}<br>年龄：${this.tableData3[index].age}<br>地址：${this.tableData3[index].address}`
            });
        },
        remove (index) {
            this.tableData3.splice(index, 1);
        }
    }
};
</script>