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
</style>
<template>

<div class="page">
<Row>
    <div class="main-info">
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
                <div class="block-body-inner">
                    <IEcharts :option="line" theme="shine"></IEcharts>
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
            line: {
                title: {
                    text: '折线图堆叠'
                },
                tooltip: {trigger: 'axis'},
                legend: {
                    data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '联盟广告',
                        type: 'line',
                        stack: '总量',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]

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