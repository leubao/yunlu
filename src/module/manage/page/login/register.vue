<style lang="">
    .box800{width: 800px;height: auto;margin: 0 auto;}
    
    
    .main {
        background-color: #fff;
        margin: 40px 0 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e5e5;
    }
    .main .lost-pw {
    float: right;
    color: #666;font-size: 12px;}
    .loginform, .regform, .retform, .changeform {
        width: 350px;
        margin: auto;
    }
</style>
<template>
    <div class="box800">
        <minHeader :headerTitle="headerTitle" :topUrl="topUrl"></minHeader>
        <div class="main">
            <Form ref="register" :model="register" :rules="ruleInline"  class="loginform">
                <Form-item prop="phone">
                    <Input type="text" v-model="register.phone"  size="large" placeholder="手机号">
                    </Input>
                </Form-item>
                <Row>
                    <Col span="12">
                        <Form-item prop="code">
                            <Input type="text" v-model="register.code" size="large" placeholder="请输入验证码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="1">
                    <sendCode
                        v-model="start"
                        @click.native="sendCode"
                        second="5"
                        runStr="{%s}秒后重新获取"
                        resetStr="重新获取"
                    ></sendCode>
                    </Col>
                </Row>
                <Form-item prop="nickname">
                    <Input type="text" v-model="register.nickname" size="large" placeholder="请输入名称">
                    </Input>
                </Form-item>
                <Form-item prop="password">
                    <Input type="password" v-model="register.password" size="large" placeholder="请输入密码">
                    </Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('register')" size="large" long>立即注册</Button>
                </Form-item>
            </Form>
        </div>
        <minFooter></minFooter>
    </div>
</template>
<script>
import minHeader from './min-header.vue'
import minFooter from './min-footer.vue'
import sendCode from '../../components/tool/sendCode.vue'
    export default {
        data () {
            const validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空'));
                }
                let reg = /^[\u4E00-\u9FA5A-Za-z0-9]+$/;
                if (!reg.test(value)) {
                    callback(new Error('验证码中能中文数字'));
                } else {
                    callback();
                }
            }
            const validatePhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                }

                let reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
                if (!reg.test(value)) {
                    callback(new Error('请正确输入手机号码'));
                } else {
                    callback();
                }
            }
            return {
                register: {
                    phone: '',
                    password: '',
                    code: '',
                    nickname : ''
                },
                ruleInline: {
                    phone: [
                        { required: true, message: '请填写手机号', trigger: 'blur' },
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    nickname: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ],
                    code: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'},
                        {validator: validateCode, trigger: 'blur'}
                    ]
                },
                headerTitle: '账户注册',
                topUrl:{'title':'已有账号,立即登录','tourl':'/login'},
                start : false

            }
        },
        components:{
            minHeader,
            minFooter,
            sendCode
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            refreshVerify() {
                this.verifyUrl = ''
                setTimeout(() => {
                    this.verifyUrl = '/api/login/code?v=' + Math.random() * 1000
                }, 500)
            },
            sendCode() {
                //获取phone的值，禁用短信触发按钮
                //validator: validateCode;
                //前面发送ajax请求成功之后调用this.start = true开始短信倒计时
                this.start = true;
            },
        }
    }
</script>