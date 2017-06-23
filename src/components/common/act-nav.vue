<style>
	
</style>
<template>
    <Menu mode="horizontal" @on-select="routeTo">
        <Menu-item v-for="item in actNavData" :name="item.url">{{item.title}}</Menu-item>
    </Menu>
</template>
<script>
	export default {
        data () {
            return {
            }
        },
        props:['actNavData'],
        methods: {
        	routeTo(e) {
                console.log(e);
                this.$router.push(e);
            }
        }
    }
</script>