<template>
    <div>
        <MyHeader :back="false">首页</MyHeader>
        <div class="content">
            <!--content是放置的是中间部分-->
            <MySwiper :sliders="sliders"></MySwiper>
            <div  class="container">
                <h2>热门图书</h2>
                <ul>
                    <li v-for="(item,index) in books" :key="index">
                        <img :src="item.bookCover" alt="">
                        <p>{{item.bookName}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    // 默认导出一个对象
    import MyHeader from "../components/MyHeader.vue";
    import {getSlider,getHot} from "../api/index.js";
    import MySwiper from "../components/MySwiper.vue"
    export default {
        data(){
            return {
                sliders:[],
                books:[]
            }
        },
        created(){
            // 在created发送请求；
            this.slider();
            this.hot();
        },
        methods: {
            /*slider(){
                getSlider().then((data)=>{
                    this.sliders=data;
                })
            }*/
            async slider(){
                //   await getSlider() 函数的返回值就是异步请求回来的数据；就是then的data数据
                this.sliders = await  getSlider();
            },
            // 请求热门图书数据；
            async hot(){
                this.books = await getHot();
            }

        },
        components: {
            MyHeader,
            MySwiper
        },
        computed: {}
    }
</script>

<style scoped lang="less">
    .content ul{
        overflow: hidden;
    }
    .content ul li{
        width:50%;
        float:left;
        list-style: none;
    }
    .content ul li img{
        width:160px;
        height:160px;
    }

</style>
