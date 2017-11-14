<style>
/*用户信息区*/
.store-board {
    position: relative;
    height: 70px;
    margin-bottom: 15px;
}
.store-board .store-board-logo {
    float: left;
    width: 70px;
    height: 70px;
}
.store-board .store-board-logo a {
    display: block;
    width: 70px;
    height: 70px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto 70px;
}
.store-board .store-board-desc {
    float: left;
    margin-left: 20px;
}
.store-board .store-board-desc>h2 {
    margin: 0;
    height: 42px;
    font-size: 16px;
    line-height: 33px;
    font-weight: bold;
}
.store-board .store-board-desc ul.icon {
    position: relative;
}
.store-board .store-board-desc ul.icon>li {
    color: #ccc;
    position: relative;
    margin-right: 20px;
    display: inline-block;
    float: left;
}
.store-board .store-board-desc ul.icon>li:last-child {
    margin-right: 0;
}
.store-board .store-board-desc ul.icon>li.active {
    color: black;
}
.store-board .store-board-desc ul.icon>li {
    color: #ccc;
    position: relative;
    margin-right: 20px;
    display: inline-block;
    float: left;
}
.store-board .btn-group {
    position: absolute;
    right: 0;
    bottom: 10px;
}
/*公告版*/
.overview {
    background-color: #f8f8f8;
    padding: 12px;
    margin-bottom: 15px;
}
.overview>ul{ display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
}
.overview>ul>li:first-of-type {
    border-left: none;
}
.overview>ul>li {
    display: inline-block;
    height: 61px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -moz-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    border-left: 1px dotted #ccc;
}
.overview>ul>li>h5 {
    margin: 11px 0 0 0;
    margin-top: 11px;
    font-size: 22px;
    font-weight: 400;
    line-height: 18px;
}
.overview>ul>li>h6 {
    margin: 10px 0 0 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 18px;
}
/*页面分割标题栏*/
.block{
    margin-bottom: 20px;
}
.block-head {
    position: relative;
    overflow: visible;
    height: 40px;
    padding: 10px;
    line-height: 20px;
    margin-bottom: 15px;
    background: #f8f8f8;
}
.block-head>.block-title {
    display: inline-block;
    margin: 0 12px 0 0;
    padding: 0 0 0 10px;
    line-height: 20px;
    font-size: 14px;
    border-left: 4px solid #f70;
}
.block-head>.block-link {
    font-size: 12px;
    display: inline-block;
    vertical-align: baseline;
}
.block-head>.block-link>li {
    display: inline-block;
}
.block-help {
    position: absolute;
    top: 10px;
    right: 14px;
}
.block-help>a {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 18px;
    border-radius: 8px;
    font-size: 12px;
    text-align: center;
    background: #bbb;
    color: #fff;
}
.block-body {
    min-height: 150px;
}
.block-body.has-border {
    border: 1px solid #e5e5e5;
}
.block-body.has-padding {
    padding: 9px;
}
.block-body-inner {
    height: 277px;
}
.height{
    height: 550px;
}
</style>
<template>

<div class="page">
<Row>
    <div class="main-info">
        <div class="overview box">
            <ul>
                <li>
                    <h6>昨日访客数</h6>
                    <h5>0</h5>
                </li>
                <li>
                    <h6>上周新用户</h6>
                    <h5><a href="//www.youzan.com/v2/showcase/goods">1</a></h5>
                </li>
                <li>
                    <h6>总用户数</h6>
                    <h5>0</h5>
                </li>
            </ul>
        </div>
        <Row :gutter="23">
            <Col span="12">
                <div class="block">
                    <div class="block-head">
                        <h3 class="block-title">客户属性</h3>
                        <div class="block-help">
                            <a href="javascript:void(0);" class="js-help-notes"></a>
                            <div class="js-notes-cont hide">
                                <p><strong>浏览量：</strong>统计时间内，店铺所有页面（包括店铺主页、单品页、会员主页等）被访问的次数，一个人在统计时间内访问多次记为多次；</p>
                                <p><strong>访客数：</strong>统计时间内，店铺所有页面（包括店铺主页、单品页、会员主页等）被访问的去重人数，一个人在统计时间范围内访问多次只记为一个；</p>
                                <p><strong>商品浏览量：</strong>统计时间内，商品详情页被访问的次数，一个人在统计时间内访问多次记为多次 。</p>
                                <p><strong>商品访客数：</strong>统计时间内，商品详情页被访问的去重人数，一个人在统计时间范围内访问多次只记为一个；</p>
                            </div>
                        </div>
                    </div>
                    <div class="block-body has-border has-padding">
                        <div class="block-body-inner">
                            <IEcharts :option="pie" theme="shine"></IEcharts>
                        </div>
                    </div>
                </div>
            </Col>
            <Col span="12">
                <div class="block">
                    <div class="block-head">
                        <h3 class="block-title">会员卡</h3>
                   
                        
                        <div class="block-help">
                            <a href="javascript:void(0);" class="js-help-notes"></a>
                            <div class="js-notes-cont hide">
                                <p><strong>浏览量：</strong>统计时间内，店铺所有页面（包括店铺主页、单品页、会员主页等）被访问的次数，一个人在统计时间内访问多次记为多次；</p>
                                <p><strong>访客数：</strong>统计时间内，店铺所有页面（包括店铺主页、单品页、会员主页等）被访问的去重人数，一个人在统计时间范围内访问多次只记为一个；</p>
                                <p><strong>商品浏览量：</strong>统计时间内，商品详情页被访问的次数，一个人在统计时间内访问多次记为多次 。</p>
                                <p><strong>商品访客数：</strong>统计时间内，商品详情页被访问的去重人数，一个人在统计时间范围内访问多次只记为一个；</p>
                            </div>
                        </div>
                    </div>
                    <div class="block-body has-border has-padding">
                        <div class="block-body-inner">
                            <IEcharts :option="bar" theme="shine" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <div class="block">
            <div class="block-head">
                <h3 class="block-title">客户分布</h3>
                
                <div class="block-help">
                    <a href="javascript:void(0);" class="js-help-notes"></a>
                    <div class="js-notes-cont hide">
                        <p><strong>浏览量：</strong>统计时间内，店铺所有页面（包括店铺主页、单品页、会员主页等）被访问的次数，一个人在统计时间内访问多次记为多次；</p>
                        <p><strong>访客数：</strong>统计时间内，店铺所有页面（包括店铺主页、单品页、会员主页等）被访问的去重人数，一个人在统计时间范围内访问多次只记为一个；</p>
                        <p><strong>商品浏览量：</strong>统计时间内，商品详情页被访问的次数，一个人在统计时间内访问多次记为多次 。</p>
                        <p><strong>商品访客数：</strong>统计时间内，商品详情页被访问的去重人数，一个人在统计时间范围内访问多次只记为一个；</p>
                    </div>
                </div>
            </div>
            <div class="block-body has-border has-padding">
                <div class="block-body-inner height">
                    <IEcharts :option="map" theme="shine"></IEcharts>
                </div>
            </div>
        </div>
    </div>
</Row>
</div>
</template>
<script>
// 引入图表
import IEcharts from 'vue-echarts-v3/src/lite.vue';
import 'echarts/theme/shine.js';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/visualMap';
import 'echarts/map/js/china.js';
// 图表标题
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
// 工具
import 'echarts/lib/component/toolbox';

export default {
    data () {
        return {
            tomall: false,
            loading: false,
            bar: {
                title: {
                    text: 'ECharts Hello World'
                },
                tooltip: {},
                xAxis: {
                    data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
                },
                yAxis: {},
                series: [{
                    name: 'Sales',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            },
            pie: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: ['男', '女', '未知']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true
                            }
                        },
                        data: [
                            {value: 335, name: '男'},
                            {value: 310, name: '女'},
                            {value: 234, name: '未知'}
                        ]
                    }
                ]
            },
            map: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['iphone3', 'iphone4', 'iphone5']
                },
                visualMap: {
                    min: 0,
                    max: 2800,
                    left: 'left',
                    top: 'bottom',
                    text: ['高', '低'],           // 文本，默认为数值文本
                    calculable: true
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name: 'iphone3',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: [
                            { name: '北京', value: this.randomData() },
                            { name: '天津', value: this.randomData() },
                            { name: '上海', value: this.randomData() },
                            { name: '重庆', value: this.randomData() },
                            { name: '河北', value: this.randomData() },
                            { name: '河南', value: this.randomData() },
                            { name: '云南', value: this.randomData() },
                            { name: '辽宁', value: this.randomData() },
                            { name: '黑龙江', value: this.randomData() },
                            { name: '湖南', value: this.randomData() },
                            { name: '安徽', value: this.randomData() },
                            { name: '山东', value: this.randomData() },
                            { name: '新疆', value: this.randomData() },
                            { name: '江苏', value: this.randomData() },
                            { name: '浙江', value: this.randomData() },
                            { name: '江西', value: this.randomData() },
                            { name: '湖北', value: this.randomData() },
                            { name: '广西', value: this.randomData() },
                            { name: '甘肃', value: this.randomData() },
                            { name: '山西', value: this.randomData() },
                            { name: '内蒙古', value: this.randomData() },
                            { name: '陕西', value: this.randomData() },
                            { name: '吉林', value: this.randomData() },
                            { name: '福建', value: this.randomData() },
                            { name: '贵州', value: this.randomData() },
                            { name: '广东', value: this.randomData() },
                            { name: '青海', value: this.randomData() },
                            { name: '西藏', value: this.randomData() },
                            { name: '四川', value: this.randomData() },
                            { name: '宁夏', value: this.randomData() },
                            { name: '海南', value: this.randomData() },
                            { name: '台湾', value: this.randomData() },
                            { name: '香港', value: this.randomData() },
                            { name: '澳门', value: this.randomData() }
                        ]
                    },
                    {
                        name: 'iphone4',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: [
                            { name: '北京', value: this.randomData() },
                            { name: '天津', value: this.randomData() },
                            { name: '上海', value: this.randomData() },
                            { name: '重庆', value: this.randomData() },
                            { name: '河北', value: this.randomData() },
                            { name: '安徽', value: this.randomData() },
                            { name: '新疆', value: this.randomData() },
                            { name: '浙江', value: this.randomData() },
                            { name: '江西', value: this.randomData() },
                            { name: '山西', value: this.randomData() },
                            { name: '内蒙古', value: this.randomData() },
                            { name: '吉林', value: this.randomData() },
                            { name: '福建', value: this.randomData() },
                            { name: '广东', value: this.randomData() },
                            { name: '西藏', value: this.randomData() },
                            { name: '四川', value: this.randomData() },
                            { name: '宁夏', value: this.randomData() },
                            { name: '香港', value: this.randomData() },
                            { name: '澳门', value: this.randomData() }
                        ]
                    },
                    {
                        name: 'iphone5',
                        type: 'map',
                        mapType: 'china',
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data: [
                            { name: '北京', value: this.randomData() },
                            { name: '天津', value: this.randomData() },
                            { name: '上海', value: this.randomData() },
                            { name: '广东', value: this.randomData() },
                            { name: '台湾', value: this.randomData() },
                            { name: '香港', value: this.randomData() },
                            { name: '澳门', value: this.randomData() }
                        ]
                    }
                ]
            }

        };
    },
    methods: {
        del () {
            this.$Modal.remove();
        },
        doRandom () {
            const that = this;
            let data = [];
            for (let i = 0, min = 5, max = 99; i < 6; i++) {
                data.push(Math.floor(Math.random() * (max + 1 - min) + min));
            }
            that.loading = !that.loading;
            that.bar.series[0].data = data;
        },
        onReady (instance) {
            console.log(instance);
        },
        onClick (event, instance, echarts) {
            console.log(arguments);
        },
        randomData () {
            return Math.round(Math.random() * 1000);
        }
    },
    components: {
        IEcharts
    }
};
</script>