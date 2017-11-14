<style type="text/css" media="screen">


.more-panel{
  background-color: #fff;
  border-radius: @border-radius-sm;
  font-size: @font-size-base;
  position: relative;
  padding: 15px;
  display: flex;
  border: 1px solid #e9e9e9;
  transition: all .3s;

  &:hover {
    box-shadow: @box-shadow-base;
    border-color: #eee;
  }

  &-body{
    flex: 1;
    overflow:hidden;
  }
  &-form{
    position: relative;
    display: inline-block;
  }

  &-control{
      position: absolute;
      right:0;
      top:0;
      padding-top:2px;
  }

  &-btn{
    cursor: pointer;
    border: 1px solid #e9e9e9;
    color: #96A1A7;
    border-radius: @border-radius-sm;
    width: 48px;
    text-align: center;
    line-height: 14px;
    position: absolute;
    left: 50%;
    bottom: -1px;
    margin-left: -1px;
  }
}   
</style>
<template>
    <div class="more-panel">
        <div class="more-panel-body" :style="{height:height}">
            <div class="more-panel-form" ref="panelForm" :style="{paddingRight: panelPR}">
                <slot name="form"></slot>
                <div class="more-panel-control" ref="panelControl" :style="controlStyle">
                    <slot name="control"></slot>
                </div>
            </div>
        </div>
        <slot></slot>
        <div href="javascript:;" class="more-panel-btn'" @click="click" v-show="showBtn">
            <span class="anticon" :class="'anticon-'+btnIcon"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MorePanel',
    data: () => ({
        collapse: true,
        bindResize: false,
        showBtn: false,
        panelPR: 0
    }),
    props: {
        originalHeight: {
            type: [Number, String],
            default: 34
        },
        controlStyle: {
            type: Object,
            default: () => ({})
        }
    },
    watch: {
        showBtn () {
            this.panelPR = `${this.$refs.panelControl.offsetWidth}px`;
        }
    },
    computed: {
        height () {
            return this.collapse ? `${this.originalHeight}px` : 'auto';
        },
        btnIcon () {
            return this.collapse ? 'down' : 'up';
        }
    },
    mounted () {
        this.panelPR = `${this.$refs.panelControl.offsetWidth}px`;
        this.ifShowBtn();
        if (!this.bindResize) {
            window.addEventListener('resize', this.ifShowBtn, false);
            this.bindResize = true;
        }
    },
    methods: {
        ifShowBtn () {
            if (!this.$el) return;
            this.$nextTick(() => {
                this.showBtn = this.$refs.panelForm.offsetHeight > this.originalHeight;
            });
        },
        click () {
            this.collapse = !this.collapse;
        }
    },
    beforeDestroy () {
        if (this.bindResize) {
            window.removeEventListener('resize', this.ifShowBtn);
        }
    }
};
</script>