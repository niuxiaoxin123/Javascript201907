<template>
    <div>
        <MyHeader :back="false">列表页</MyHeader>
        <div class="content">
            <ul>
                <router-link :to="{name:'Detail',params:{id:item.bookId}}" v-for="(item,index) in books" :key="index" tag="li">
                    <img :src="item.bookCover" alt="">
                    <div class="right">
                        <h3>{{item.bookName}}</h3>
                        <p>{{item.bookInfo}}</p>
                        <span class="price">{{item.bookPrice}}</span>
                        <p>
                            <button @click.stop="del(item.bookId)">删除</button>
                            <button @click.stop="addCollect(item)">收藏</button>
                        </p>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    // 默认导出一个对象
    import MyHeader from "../components/MyHeader.vue";
    import {getBooks,delBook,collects} from "../api/index.js";
    export default {
        data(){
            return {
                books:[]
            }
        },
        created(){
            this.getList();
        },
        methods: {
            async getList(){
                this.books = await getBooks();
            },
            del(curId){
                delBook(curId);// 请求是为了删除数据库中的数据
                // 为了删除页面的books中的数据
                this.books=this.books.filter(item=>item.bookId!==curId);
            },
            addCollect(data){
                collects(data);
            }
        },
        updated(){
            this.getList();
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
