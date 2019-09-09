<template>
    <div class="header">
        <slot></slot>
        <i class="iconfont icon-fanhui goBack" v-if="back" @click="go"></i>
    </div>
</template>

<script>
    // 默认导出一个对象
    export default {
        data(){
            return {

            }
        },
        props:["back"],
        methods: {
            go(){
                this.$router.back();
            }
        },
        components: {},
        computed: {}
    }
</script>

<style scoped lang="less">
    .header{
        z-index:100;
        width:100%;
        position: fixed;
        background: #00a8e6;
        text-align: center;
        height:40px;
        line-height: 40px;
        font-size: 20px;
        color:white;
        .goBack{
            float:left;
            margin-left:10px;
        }
    }
</style>
