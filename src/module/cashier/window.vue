<style>
	.mian-right-steps{
        margin-left: 30px;
    }
</style>
<template>
	<div class="page">
        <div  class="breadcrumb">
        <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div>  

    		<Row>
    			    <div class="main-info">
                    <Alert show-icon>
                        重要提示
                        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
                        <template slot="desc">1、收款操作不可逆，请确认收款金额；2、等待提示收款成功后再进行下一单操作；3、收错款后请及时联系管理员</template>
                    </Alert>
    			    <!--收款表单 s-->
    			    <Row>
    				<Col :xs="16" :sm="16" :md="14" :lg="14">
    			    <Form ref="collection" :model="collection" :rules="ruleInline" :label-width="80">
    			        <Form-item label="收款金额" prop="money">
    			            <Input v-model="collection.money" ref="money" :autofocus="true" @on-enter="handleSubmit('collection')" size="large" placeholder="请输入收款金额">
    			                <Icon type="social-yen-outline" slot="prepend"></Icon>
    			            </Input>
    			        </Form-item>
    			        <Form-item label="收款类型" prop="ptype">
    			            <Radio-group v-model="collection.ptype">
    			                <Radio label="1">门票</Radio>
    			                <Radio label="2">二次消费</Radio>
    			            </Radio-group>
    			        </Form-item>
                        <Form-item label="备注" prop="remark">
                            <Input v-model="collection.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </Form-item>
                        <Form-item label="支付码">
                            <Input v-model="collection.barcode" size="large" placeholder="扫码枪输入..." @on-enter="enterSubmit('collection')">
                            </Input>
                        </Form-item>
    			        <Form-item>
    			            <Button type="primary" @click="handleSubmit('collection')" :loading="loading">
                                <span v-if="!loading">收款</span>
                                <span v-else>正在收款请稍后...</span>
                            </Button>
    			            <Button type="ghost" @click="handleReset('collection')" style="margin-left: 8px">重置</Button>
    			        </Form-item>
    			    </Form>
    			    </Col>
                    <Col :xs="8" :sm="8" :md="10" :lg="10">
                    <div class="mian-right-steps">
                        <Steps :current="current" direction="vertical">
                            <Step title="输入收款金额" content="确定收款金额"></Step>
                            <Step title="等待扫码" content="扫描客户付款码"></Step>
                            <Step title="扫码完成" content="扫码完成,等待客人确认支付"></Step>
                            <Step title="完成支付" content="完成收款操作"></Step>
                        </Steps>
                    </div>
                    </Col>
    			    </Row>
    			    <!--收款表单 e-->
    			    <!--收款进度日志 s-->
    			    <!--收款进度日志 e-->
    				</div>	
    		</Row>
        </div>
	</div>
</template>
<script>
/**
 * 业务流程
 * 输入金额->选择收款类型->确认收款->禁用收款按钮->禁用表单内所有元素->调取收款进度日志->收款成功->提示收款成功提醒->重置当前页面
 */
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
    data () {
        const validateMoney = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('收款金额不能为空'));
            }
            let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
            if (!reg.test(value) || value <= 0) {
                callback(new Error('请填写有效的收款金额'));
            } else {
                callback();
            }
        };
        return {
            collection: {
                money: '',
                ptype: '2',
                remark: '',
                barcode: ''
            },
            ruleInline: {
                money: [
                    { required: true, message: '请填写收款金额', trigger: 'blur' },
                    {validator: validateMoney, trigger: 'blur'}
                ],
                ptype: [
                    { required: true, message: '请选择有效收款方式', trigger: 'blur' }
                ]
            },
            loading: false,
            current: 0,
            BreadcrumbData: [{title: '收款', url: '/merchant/window'}, {title: '窗口收款', url: ''}]
        };
    },
    components: {
        Breadcrumb
    },
    mounted () {
        // 服务端获取数据
        // this.getData();
        this.$refs.money.focus();
    },
    methods: {
        handleSubmit (name) {
            if (this.current < 1) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // 禁用收款按钮变文本为正在收款
                        this.loading = true;
                        // 获取扫码状态 监听支付码是否有值
                        this.current += 1;
                        // 鼠标自动定位到隐藏文本域里
                        this.$refs.barcode.focus();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                });
            } else {
                this.$Message.error('表单正在提交请勿重复操作!' + this.current);
            }
        },
        // 重置表单
        handleReset (name) {
            this.loading = false;
            this.current = 0;
            this.collection.barcode = '';
            this.$refs.money.focus();
            // this.collection.money.focus();
            this.$refs[name].resetFields();
        },
        // 提交支付
        enterSubmit (name) {
            let barcode = this.collection.barcode;
            this.$Message.error(barcode);
            if (!barcode) {
                this.$Message.error('请使用扫码枪扫描客户付款码...');
            } else {
                if (this.current > 1) {
                    this.$Message.error('等待远端服务器响应...');
                } else {
                    this.current += 1;
                    // 发送验证码
                    this.request('PayBar', this.collection).then((res) => {
                        if (res.status === '200') {
                            this.start = true;
                            this.current += 1;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                };
            }
        }
    }
};
</script>