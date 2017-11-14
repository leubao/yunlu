<style lang="">
	.box900{width: 900px;height: auto;margin: 0 auto;}
    .main {background-color: #fff;margin: 40px 0 20px;padding-bottom: 20px;border-bottom: 1px solid #e5e5e5;}
    .main .lost-pw {float: right;color: #666;font-size: 12px;}
	/*列表*/
    .select {
        background: #f8f8f8;
        padding-bottom: 5px;
    }
    /*内容头*/
    .infobar {
        position: relative;
        height: 75px;
        padding: 15px 20px;
        line-height: 20px;
        background: #f8f8f8;
    }
    .infobar .avatar {
        float: left;
        width: 45px;
        height: 45px;
        margin-right: 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        border-radius: 50%;
    }
    .infobar h3 {
        font-size: 14px;
        color: #111;
        font-weight: 700;
        padding-top: 3px;
    }
    .infobar p {
        font-size: 12px;
        color: #666;
    }
    .infobar .create-btn {
        position: absolute;
        bottom: 20px;
        right: 25px;
    }
    /**内容块**/
    .select .box {
        min-height: 460px;
        padding: 0 30px 20px;
        overflow-y: hidden;
        margin: 0 5px;
        background-color: #fff;
    }
    .select .box .dp-list {
        margin-top: 20px;
    }
    .dp-list {
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -moz-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .dp-item {
        position: relative;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 260px;
        height: 120px;
        padding: 0 20px;
        margin-bottom: 20px;
        border-radius: 2px;
        border: 1px solid #e5e5e5;
        border-top: 3px solid #d5d7db;
        background: #fff;
        cursor: pointer;
        color: #999;
    }
    .select .box .dp-list .dp-title {
        margin-top: 18px;
        font-size: 14px;
        line-height: 20px;
        padding-bottom: 5px;
        color: #111;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-box;
        display: -ms-flexbox;
        display: flex;
    }
    .select .box .dp-list .dp-title .dp-text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
    }
    .select .box .dp-list .dp-item p {
        height: 22px;
        line-height: 22px;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .select .box .operate-label {
        position: absolute;
        left: 20px;
        bottom: 12px;
        height: 12px;
    }
    .select .box .operate-label a {
        margin-right: 5px;
    }
    .dp-item span.type {
        position: absolute;
        bottom: 10px;
        right: 10px;
        border-radius: 2px;
        height: 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        line-height: 12px;
        padding: 3px;
        border: 1px solid #bbb;
        font-size: 12px;
        color: #bbb;
    }
</style>
<template>
	<div class="box900">
        <minHeader :headerTitle="headerTitle" :topUrl="topUrl" :user="user"></minHeader>
        <div class="main">
            <Form ref="register" :model="register" :rules="ruleValidate" :label-width="80">
                <Form-item label="APPID" prop="appid">
                    <Input v-model="register.appid" placeholder="请输入APPID" style="width:280px;"></Input>
                </Form-item>
                <Form-item label="账号类型" prop="account_type">
                    <Radio-group v-model="register.account_type">
                        <Radio label="1">公众号</Radio>
                        <Radio label="2" disabled>小程序</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="介绍">
                    <Input v-model="register.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click="handleSubmit('register')">提交</Button>
                    <Button type="ghost" @click="handleReset('register')" style="margin-left: 8px">重置</Button>
                </Form-item>
            </Form>
        </div>
        <minFooter></minFooter>
    </div>
</template>
<script>
import minHeader from '../../components/min-header.vue';
import minFooter from '../../components/min-footer.vue';
export default {
    data () {
        return {
            register: {
                appid: '',
                account_type: '1',
                desc: ''
            },
            ruleValidate: {
                appid: [
                    { required: true, message: 'APPID不能为空', trigger: 'blur' }
                ]
            },
            user: {},
            headerTitle: '新增公众号/小程序',
            topUrl: [{'title': '账号列表', 'tourl': '/index'}, {'title': '退出', 'tourl': '/logout'}]
        };
    },
    components: {
        minHeader,
        minFooter
    },
    mounted () {
        this.user = this.$store.state.User.userInfo;
        // console.log(this.$route.path)
        // console.log(this.$store.state.User.userInfo);
        // this.$loading('加载中')
        // console.log(this.$router.options.routes)
        // console.log(this.$store.state.MainMenu.mainMenu)
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.request('AddWechat', this.register).then((res) => {
                        if (res.status) {
                            this.$Message.success(res.msg);

                            // 跳转到授权页面
                            // window.location.origin(res.data.url);
                            this.$router.push({ path: '/oauth' });
                            window.open(res.data.url);
                            // console.log(this.$router.options.routes)
                            // console.log(this.formValidate)
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        // 重置表单
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>