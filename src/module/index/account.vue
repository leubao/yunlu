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
			            {{ user.phone }} &nbsp;&nbsp;&nbsp;&nbsp; <router-link :to="{path:'/changepwd'}" class="info-setting">修改密码</router-link>
			        </FormItem>
			        <FormItem label="昵称：" prop="nickname">
			            <Input v-model="formValidate.nickname" placeholder="请输入昵称" style="width: 300px"></Input>
			        </FormItem>
			        <FormItem label="QQ：" prop="qq">
			            <Input v-model="formValidate.qq" placeholder="QQ号" style="width: 300px"></Input>
			        </FormItem>
			        <FormItem label="性别：" prop="gender">
			            <RadioGroup v-model="formValidate.gender">
			                <Radio label="1">男</Radio>
			                <Radio label="2">女</Radio>
			                <Radio label="0">保密</Radio>
			            </RadioGroup>
			        </FormItem>
			        <FormItem label="头像：">
			        <div class="demo-upload-list" v-for="item in uploadList">
				        <template v-if="item.status === 'finished'">
				            <img :src="item.url">
				            <div class="demo-upload-list-cover">
				                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
				            </div>
				        </template>
				        <template v-else>
				            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
				        </template>
				    </div>
				    <Upload
				        ref="upload"
				        :show-upload-list="false"
				        :default-file-list="defaultList"
				        :on-success="handleSuccess"
				        :format="['jpg','jpeg','png']"
				        :max-size="2048"
				        :on-format-error="handleFormatError"
				        :on-exceeded-size="handleMaxSize"
				        :before-upload="handleBeforeUpload"
				        multiple
				        type="drag"
				        action="//jsonplaceholder.typicode.com/posts/"
				        style="display: inline-block;width:58px;">
				        <div style="width: 58px;height:58px;line-height: 58px;">
				            <Icon type="camera" size="20"></Icon>
				        </div>
				    </Upload>
					</FormItem>
				    <Modal title="查看头像" v-model="visible">
				        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
				    </Modal>
			        <FormItem label="个性签名：">
			            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 6,maxRows: 6}" placeholder="最对可输入200字"></Input>
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
        return {
            user: {},
            headerTitle: '个人账号设置',
            lists: {},
            topUrl: [{'title': '选择小程序', 'tourl': '/index'}, {'title': '退出', 'tourl': '/logout'}],
            formValidate: {
                nickname: '',
                qq: '',
                gender: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ]
            },
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],
            imgName: '',
            visible: false,
            uploadList: []
        };
    },
    components: {
        minHeader,
        minFooter
    },
    mounted () {
        this.user = this.$store.state.User.userInfo;
        // 链接服务器加载账号
        // 服务端获取数据
        this.getData();
        // console.log(this.$route.path)
        // this.$loading('加载中')
        // console.log(this.$router.options.routes)
        // console.log(this.$store.state.MainMenu.mainMenu)
        // token Ox4bwEj5_PcLjF8pDs7PDLqqwOK6Gm766HNTWulifoc39k0RjlwE90gRxp4E7gLn_omf_7ZSRmdLcZeNmy29wA
        this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
        getData (params) {
            if (!params) params = {page: 1};
            this.request('WechatList', params, true).then((res) => {
                if (res.status) {
                    // 列表数据
                    this.lists = res.data.list;
                }
            });
        },
        routeTo (e) {
            this.$router.push(e);
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            });
        },
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleSuccess (res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        }
    }
};
</script>