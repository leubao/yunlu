<style src="../../../static/css/merchant/merchant.less" lang="less" scoped></style>
<style>
 .quill-editor {
  height: 745px;

  .ql-container {
    height: 680px;
  }
}

.limit {
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: right;

  span {
    color: #ee2a7b;
  }
}

.ql-snow .ql-editor img {
  max-width: 480px;
}

.ql-editor .ql-video {
  max-width: 480px;
}   
</style>
<template>
	<div class="page">
        <div  class="breadcrumb">
        	<Breadcrumb :BreadcrumbData="BreadcrumbData" ref="Breadcrumb"></Breadcrumb>
        </div>
        <Row>
        	<Col offset="3" span="12">
        	<div class="mt30">
	        	<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
			        <FormItem label="景区名称" prop="name">
			            <Input v-model="formValidate.name" placeholder="请输入名称(必填)"></Input>
			        </FormItem>
			        <FormItem label="LOGO">
			            
			        </FormItem>

			        <FormItem label="景区地址" prop="address">
			            <Input v-model="formValidate.address" placeholder="景区地址"></Input>
			        </FormItem>
			        <FormItem label="客服电话" prop="phone">
			            <Input v-model="formValidate.phone" placeholder="客服电话"></Input>
			        </FormItem>
			        <FormItem label="描述" prop="desc">
			            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
			        </FormItem>
			        <FormItem label="支付方式" prop="paytype">
			            <CheckboxGroup v-model="formValidate.paytype">
			                <Checkbox label="5">微信支付</Checkbox>
			                <Checkbox label="1">窗口支付</Checkbox>
			            </CheckboxGroup>
			        </FormItem>
			        <FormItem label="详细描述">
                        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
                        <!-- quill-editor插件标签 分别绑定各个事件-->
                        <quill-editor v-model="content" ref="myTextEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                          @change="onEditorChange($event)"></quill-editor>
                        <div class="limit">当前已输入 <span>{{nowLength}}</span> 个字符，您还可以输入 <span>{{SurplusLength}}</span> 个字符。</div>
                        <!-- 文件上传input 将它隐藏-->
                        <el-upload class="upload-demo" :action="qnLocation" :before-upload='beforeUpload' :data="uploadData" :on-success='upScuccess'
                          ref="upload" style="display:none">
                          <el-button size="small" type="primary" id="imgInput" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="插入中,请稍候">点击上传</el-button>
                        </el-upload>
                        <Ueditor :defaultMsg=defaultMsg :config=config ref="ue"></Ueditor>
                        
                    </FormItem>
			        <FormItem>
			            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
			            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
			        </FormItem>
			    </Form>
                <button @click="getUEContent()">获取内容</button>
			</div>
			</Col>
	        
	    </Row>
    </div>
</template>
<script>
import Breadcrumb from '../../components/breadcrumb.vue';
import { quillEditor } from 'vue-quill-editor';
import Ueditor from '../../components/ueditor.vue';
export default {
    data () {
        return {
            BreadcrumbData: [{title: '基础设置', url: ''}, {title: '系统设置', url: ''}],
            content: '<p>Hello BBK</p>',
            editorOption: {
                modules: {
                    toolbar: [
                        [{ 'size': ['small', false, 'large'] }],
                        ['bold', 'italic'],
                        [{'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link', 'image']
                    ],
                    history: {
                        delay: 1000,
                        maxStack: 50,
                        userOnly: false
                    },
                    imageImport: true,
                    imageResize: {
                        displaySize: true
                    }
                }
            },
            defaultMsg: '这里是UE测试',
            config: {
                initialFrameWidth: null,
                initialFrameHeight: 350
            },
            formValidate: {
                name: '',
                phone: '',
                address: '',
                gender: '',
                paytype: [],
                date: '',
                time: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '客服电话', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '景区地址', trigger: 'blur' }
                ],
                paytype: [
                    { required: true, type: 'array', min: 1, message: '至少选择一种支付方式', trigger: 'change' },
                    { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                ],
                date: [
                    { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                ],
                time: [
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请输入个人介绍', trigger: 'blur' },
                    { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                ]
            }
        };
    },
    components: {
        Breadcrumb,
        quillEditor,
        Ueditor
    },
    computed: {
        editor () {
            return this.$refs.myTextEditor.quillEditor;
        }
    },
    mounted () {
        // 服务端获取数据
        this.getData();
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 禁用收款按钮变文本为正在收款
                    this.loading = true;
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
            this.request('WechatList', params, true).then((res) => {
                if (res.status) {
                    // 列表数据
                    this.lists = res.data.list;
                }
            });
        },
        getUEContent () {
            let content = this.$refs.ue.getUEContent();
            this.$Notice.open({
                title: '获取成功，可在控制台查看！',
                desc: content
            });
            console.log(content);
        }
    }
};
</script>