<style>
    
</style>
<template>
<div>
    <div class="second-title">
        {{ subtitle }}
    </div>
    <nav>
        <ul>
            <router-link :to="{path:'/layout/content'}" tag="li">商品列表</router-link>
            <router-link :to="{path:'/layout/goods'}" tag="li">添加商品</router-link>
            <li v-for="item in SubNavData" @click="routerChange(item)" class="">{{item.title}}</li>
        </ul>
    </nav> 
</div>
</template>
<script>
    
    export default {
        data () {
            return {
        
            }
        },
        props:['subtitle','SubNavData'],
        methods: {
            routerChange(item)  {
              // 与当前页面路由相等则刷新页面
              if (item.url != this.$route.url) {
                this.$router.push(item.url)
              } else {
                _g.shallowRefresh(this.$route.name)
              }
            }
        }
    }
</script>