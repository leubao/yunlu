<style src="../../../static/css/merchant/order.less" lang="less" scoped>
</style>
<template>
	<div class="page">
        <div  class="breadcrumb">
        <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div>
        	<Row>
    			<div class="main-info">
    				<Form ref="verifyOrder" :model="verifyorder" :rules="ruleInline" inline>
				        <FormItem prop="sn">
				            <Input v-model="verifyorder.sn" autofocus placeholder="订单编号">
				            </Input>
				        </FormItem>
				        <FormItem prop="phone">
				            <Input v-model="verifyorder.phone" placeholder="手机号">
				                <span slot="prepend">或</span>
				            </Input>
				        </FormItem>
				        <FormItem>
				            <Button type="primary" @click="handleSubmit('verifyOrder')" :loading="loading">
							<span v-if="!loading">查询</span>
                            <span v-else>正在查询请稍后...</span>
				            </Button>
				            <Button type="ghost" @click="handleReset('verifyOrder')" style="margin-left: 8px">重置</Button>
				        </FormItem>
				    </Form>
				    <!--页面内容-->
					<div class="oinfo">
						<Row>
						<div v-if="isOrder">
    					<Col :xs="12" :sm="12" :md="12" :lg="12">
							<div><span class="label">单号：</span>{{orderInfo.sn}}</div> 
							<div><span class="label">数量：</span>{{orderInfo.number}}</div>
							<div><span class="label">游玩日期：</span>{{orderInfo.plantime}}</div>
							<div><span class="label">取票人：</span>{{orderInfo.account}}</div>
							<div><span class="label">创建时间：</span>{{orderInfo.create_time}}</div>
							<div><span class="label">支付方式：</span>{{orderInfo.paytype}}</div> 
							<div><span class="label">订单类型：</span>{{orderInfo.type}}<span v-if="orderInfo.active">{{orderInfo.active}}</span></div> 
						</Col>
    					<Col :xs="12" :sm="12" :md="12" :lg="12">
    						<div><span class="label">状态：</span> {{orderInfo.status}}</div>	
							<div><span class="label">金额：</span> {{orderInfo.money}}</div>
							<div><span class="label">手机号：</span> {{orderInfo.phone}}</div>
							<div><span class="label">支付时间：</span>{{orderInfo.paytime}}</div> 
							<div><span class="label">核销人：</span>{{orderInfo.user}}</div> 
							<div><span class="label">下单人：</span>{{orderInfo.member}}</div> 
						</Col>
						<div><span class="label">备注：</span>{{orderInfo.remark}}</div> 
						</div>
						<div class="empty" v-else>
						    <h3>等待数据载入中...</h3>
						</div>
						</Row>
					</div>
    			</div>
    		</Row>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
    data () {
        const validatePhone = (rule, value, callback) => {
            if (value) {
                let reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
                if (!reg.test(value)) {
                    callback(new Error('请正确输入手机号码'));
                } else {
                    callback();
                }
            } else {
                // 判断单号是否为空
                if (!this.verifyorder.sn) {
                    callback(new Error('未找到查询条件'));
                }
                callback();
            }
        };
        const validateSn = (rule, value, callback) => {
            if (!value) {
                if (!this.verifyorder.phone) {
                    callback(new Error('未找到查询条件'));
                }
                callback();
            }
            callback();
        };
        return {
            verifyorder: {
                sn: '',
                phone: ''
            },
            ruleInline: {
                sn: [
                    {validator: validateSn, trigger: 'blur'}
                ],
                phone: [
                    {validator: validatePhone, trigger: 'blur'}
                ]
            },
            loading: false,
            orderInfo: [],
            isOrder: true,
            BreadcrumbData: [{title: '订单', url: '/merchant/olist'}, {title: '订单核销', url: ''}]
        };
    },
    components: {
        Breadcrumb
    },
    mounted () {
        this.isOrder = false;
        this.verifyorder.sn.focus();
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.request('VerifyOrder', this.verifyorder, true).then((res) => {
                        if (res.status) {
                            this.isOrder = true;
                            this.loading = false;
                            this.orderInfo = res.data;
                        } else {
                            this.loading = false;
                            this.$Message.error(res.msg);
                        }
                    });
                    // 禁用收款按钮变文本为正在收款
                    this.loading = true;
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        // 重置表单
        handleReset (name) {
            this.loading = false;
            this.$refs.sn.focus();
            this.$refs[name].resetFields();
        }
    }
};
</script>