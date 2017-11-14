<template>
	<div class="page">
        <div  class="breadcrumb">
        <Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <div>
        	<Row>
    			<div class="main-info">
    				<Collapse v-model="payset">
				        <Panel name="wxpay">
				            微信支付
				            <p slot="content">
				            <Alert show-icon>
						        重要提示
						        <Icon type="ios-lightbulb-outline" slot="icon"></Icon>
						        <template slot="desc">设置自有微信支付，买家使用微信支付付款购买商品时，货款将直接进入你微信支付对应的财付通账户。</template>
						    </Alert>
							<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
						        <FormItem label="商户号" prop="mchid">
						            <Input v-model="formValidate.mchid" placeholder="请输入商户号" style="width: 300px"></Input>
						        </FormItem>
						        <FormItem label="密钥" prop="mchkey">
						            <Input v-model="formValidate.mchkey" placeholder="请输入支付密钥" style="width: 300px"></Input>
						        </FormItem>
						        
						        <FormItem label="微信支付状态">
						            <RadioGroup v-model="formValidate.gender">
						                <Radio label="male">全网支付已发布</Radio>
						                <Radio label="female">测试支付中</Radio>
						            </RadioGroup>
						        </FormItem>
						        <FormItem label="apiclient_cert">
							        <Upload action="//jsonplaceholder.typicode.com/posts/" :format="['pem']">
								        <Button type="ghost" icon="ios-cloud-upload-outline">上传apiclient_cert.pem文件</Button>
								    </Upload>
							    </FormItem>
							    <FormItem label="apiclient_key">
							        <Upload action="//jsonplaceholder.typicode.com/posts/">
								        <Button type="ghost" icon="ios-cloud-upload-outline">上传apiclient_key.pem文件</Button>
								    </Upload>
							    </FormItem>
						        <FormItem label="微信网页授权">
						            <CheckboxGroup v-model="formValidate.interest">
						                <Checkbox label="吃饭">授权回调页面域名已设置为 “ticket.alizhiyou.com”</Checkbox>
						            </CheckboxGroup>
						        </FormItem>
						        <FormItem label="微信支付配置">
						            <CheckboxGroup v-model="formValidate.interest">
						                <Checkbox label="吃饭">https配置完成 查看说明</Checkbox>
						            </CheckboxGroup>
						        </FormItem>
						        <FormItem>
						            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
						        </FormItem>
						    </Form>
				           </p>
				        </Panel>
				        <Panel name="2">
				            货到付款
				            <p slot="content"></p>
				        </Panel>
				        <Panel name="3">
				            支付宝支付
				            <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
				        </Panel>
				    </Collapse>
    			</div>
    		</Row>
        </div>
    </div>
</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
export default {
    data () {
        return {
            BreadcrumbData: [{title: '设置', url: ''}, {title: '支付设置', url: ''}],
            formValidate: {
                mchid: '',
                machkey: '',
                pay: ''
            },
            ruleValidate: {
                mchid: [
                    { required: true, message: '商户号不能为空', trigger: 'blur' }
                ],
                mchkey: [
                    { required: true, message: '商户密钥不能为空', trigger: 'blur' }
                ]
            },
            payset: 'wxpay'
        };
    },
    components: {
        Breadcrumb
    },
    mounted () {
        console.log('这个页面加载了');
        // 服务端获取数据
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.request('PaySet', this.formValidate).then((res) => {
                        if (res.status) {
                            this.$Message.success(res.msg);
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        uploadFile () {
            // 获取input元素
            // let files = this.$refs.fileInput.files[0];
        }
    }
};
</script>