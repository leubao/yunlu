<style lang="less">
.content {
    word-break: break-all;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    padding: 0 20px 20px;
    font-size: 14px;
    min-height: 400px;
	form:first-child {
	    margin-top: 30px;
	    position: relative;
	    padding-left: 150px;
	    padding-right: 150px;
	}
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
<template>
	<div class="box900">
        <minHeader :headerTitle="headerTitle" :topUrl="topUrl" :user="user"></minHeader>
        <div class="content">
        	<div class="form">
			    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
			        <FormItem label="账号：">
			            {{ user.phone }} 
			        </FormItem>
			        <FormItem label="当前密码：" prop="pwd">
			            <Input v-model="formValidate.pwd" type="password" placeholder="当前密码" style="width: 300px"></Input>
			        </FormItem>
                    <FormItem label="新密码：" prop="npwd">
                        <Input v-model="formValidate.npwd" type="password" placeholder="新密码" style="width: 300px"></Input>
                    </FormItem>
                    <FormItem label="重复密码：" prop="npwds">
                        <Input v-model="formValidate.npwds" type="password" placeholder="重复密码" style="width: 300px"></Input>
                    </FormItem>
			        <FormItem>
			            <Button type="primary" @click="handleSubmit('formValidate')">确认修改</Button>
						&nbsp;&nbsp;&nbsp;&nbsp;
			            <router-link :to="{path:'/index'}" class="info-setting">返回小程序</router-link>
			        </FormItem>
			    </Form>
			</div>
        </div>
        <BackTop :height="20" :bottom="80"></BackTop>
        <minFooter></minFooter>
    </div>
</template>
<script>
import minHeader from '../../components/min-top.vue';
import minFooter from '../../components/min-footer.vue';
export default {
    data () {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.formValidate.pwds !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formValidate.validateField('npwds');
                }
                callback();
            }
        };
        const validatePwdCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formValidate.npwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            user: {},
            headerTitle: '修改密码',
            topUrl: [{'title': '选择小程序', 'tourl': '/index'}, {'title': '退出', 'tourl': '/logout'}],
            formValidate: {
                pwd: '',
                npwd: '',
                npwds: ''
            },
            ruleValidate: {
                pwd: [
                    { required: true, message: '当前密码不能为空', trigger: 'blur' }
                ],
                npwd: [
                    { validator: validatePass, trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ],
                npwds: [
                     { validator: validatePwdCheck, trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        minHeader,
        minFooter
    },
    mounted () {
        this.user = this.$store.state.User.userInfo;
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$router.push({ path: '/account' });
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        }
    }
};
</script>