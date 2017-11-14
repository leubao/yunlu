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
                <Form-item prop="nickname">
                    <Input type="text" v-model="register.nickname"  size="large" placeholder="登录后显示的名称">
                    </Input>
                </Form-item>
                <Form-item prop="phone">
                    <Input type="text" v-model="register.phone"  size="large" placeholder="今后使用手机号登录">
                    </Input>
                </Form-item>
                <Row>
                    <Col span="12">
                        <Form-item prop="code">
                            <Input type="text" v-model="register.code" size="large" placeholder="填写6位短信验证码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="1">
                    <sendCode
                        v-model="codeStart"
                        @click.native="sendCode('register')"
                        second="60"
                        runStr="{%s}秒后重新获取"
                        resetStr="重新获取"
                    ></sendCode>
                    </Col>
                </Row>
                <Form-item prop="password">
                    <Input type="password" v-model="register.password" size="large" placeholder="8~20个字，包含字母和数字">
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
import minHeader from '@/components/min-header.vue';
import minFooter from '@/components/min-footer.vue';
import sendCode from '@/components/sendCode.vue';
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
        };
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
            topUrl: [{'title': '已有账号,立即登录', 'tourl': '/login'}],
            codeStart: false

        };
    },
    components: {
        minHeader,
        minFooter,
        sendCode
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.request('Register', this.register).then((res) => {
                        if (res.status) {
                            this.$router.push({ path: '/login/' });
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        sendCode (name) {
            // 获取phone的值，禁用短信触发按钮
            let phone = this.register.phone;
            if (!phone) {
                this.$Message.error('手机号不能为空');
            }
            let reg = /^1(3|4|5|7|8)[0-9]\d{8}$/;
            if (!reg.test(phone)) {
                return new Error('请正确输入手机号码');
            } else {
                // 发送验证码
                this.request('ToSms', {'phone': phone, 'type': 'ver_code_reg'}).then((res) => {
                    if (res.status) {
                        this.codeStart = true;
                    } else {
                        this.$Message.error(res.msg);
                    }
                });
            };
        }
    }
};
</script>