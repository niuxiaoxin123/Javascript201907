<template>
    <div>
        <MyHeader :back="true">详情页</MyHeader>
        <div class="content">
            <div class="container">
                <li>
                    <h2>书的名称</h2>
                    <input type="text" v-model="currentBook.bookName">
                </li>
                <li>
                    <h2>书的信息</h2>
                    <input type="text" v-model="currentBook.bookInfo">
                </li>
                <li>
                    <h2>书的价格</h2>
                    <input type="text" v-model="currentBook.bookPrice">
                </li>
                <button class="btn" @click="setBook">确认修改</button>
            </div>
        </div>
    </div>
</template>
<script>
    import MyHeader from "../components/MyHeader.vue";
   import {getBook,update} from "../api/index.js"
    // 默认导出一个对象
    export default {
        data(){
            return {
                currentBook:{}
            }
        },
        created(){
           // 通过路由传参，可以通过$route的params来获取参数；
            this.getOne(this.$route.params.id)
        },
        methods: {
            async getOne(id){
                this.currentBook= await getBook(id);
            },
            setBook(){
                update(this.currentBook);
                this.$router.push("/list");
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
        padding-top:40px;
        .container{
            box-sizing: border-box;
            padding-left:20px;
            li{
                list-style: none;
                height:100px;
                input{
                    height:50px;
                    width:300px;
                    background: #eee;
                    border:none;
                    font-size: 24px;
                }
            }
            .btn{
                width:120px;
                height:50px;
                background: red;
                color:white;
                font-size: 24px;
                text-align: center;
                line-height: 30px;
                border: none;
                border-radius: 5px;
                padding:5px;
            }
        }
    }
</style>
