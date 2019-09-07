<template>
    <div class="footer">
        <router-link to="/home">
            <i class="iconfont icon-home"></i>
            <span>首页</span>
        </router-link>
        <router-link to="/list">
            <i class="iconfont icon-chazhaobiaodanliebiao"></i>
            <span>列表</span>
        </router-link>
        <router-link to="collect">
            <i class="iconfont icon-shoucang"></i>
            <span>收藏</span>
        </router-link>
        <router-link to="/add">
            <i class="iconfont icon-tianjia-xue"></i>
            <span>添加</span>
        </router-link>
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
    .footer{
        width:100%;
        position: fixed;
        bottom: 0;
        display: flex;
        border-top:1px solid #cc99cc;
        a{
            flex:1;// 平分父元素
            flex-direction: column;
            align-items: center;
            display: flex;
            text-decoration: none;
            font-size: 20px;
            i{
                font-size: 25px;
            }
            &.router-link-active{
                color: red;
            }
        }
    }
</style>
