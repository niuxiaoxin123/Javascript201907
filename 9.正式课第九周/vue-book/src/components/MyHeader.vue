<template>
    <div class="header">
        <slot></slot>
    </div>
</template>

<script>
    // 默认导出一个对象
    export default {
        data(){
            return {}
        },
        methods: {},
        components: {},
        computed: {}
    }
</script>

<style scoped lang="less">
    .header{
        width:100%;
        position: fixed;
        background: #00a8e6;
        text-align: center;
        height:40px;
        line-height: 40px;
        font-size: 20px;
        color:white;
    }
</style>
