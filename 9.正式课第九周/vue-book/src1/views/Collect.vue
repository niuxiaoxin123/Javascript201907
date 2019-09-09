<template>
    <div>
        <MyHeader :back="false">收藏页</MyHeader>
        <div class="content">
            <ul>
                <li v-for="(item,index) in collect" :key="index">
                    <img :src="item.bookCover" alt="">
                    <div class="right">
                        <h3>{{item.bookName}}</h3>
                        <p>{{item.bookInfo}}</p>
                        <span class="price">{{item.bookPrice}}</span>
                        <p>
                            <button>删除</button>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    // 默认导出一个对象
    import MyHeader from "../components/MyHeader.vue"
    import {getCollect} from "../api/index.js";
    export default {
        data(){
            return {
                collect:[]
            }
        },
        created(){
            this.getCollectBook();
        },
        methods: {
            async getCollectBook(){
                this.collect=await  getCollect();
            }
        },
        components: {
            MyHeader
        },
        computed: {}
    }
</script>

<style scoped lang="less">
    .content{
        padding-top: 40px;
        box-sizing: border-box;
        padding-bottom: 53px;
    }
    .content ul li{
        list-style: none;
        padding:10px;
        img{
            width:160px;
            height:160px;
        }
        .right{
            float: right;
        }
        .price{
            color:red;
            font-size: 30px;
        }
        p button{
            width:60px;
            height:30px;
            line-height: 30px;
            text-align: center;
            background: red;
            color:white;
            border-radius: 10px;
            border: none;
            font-size: 16px;
            margin-right: 15px;
        }
    }
</style>
