<template>
    <div>
        <MyHeader :back="true">添加页</MyHeader>
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
                <li>
                    <h2>书的封面</h2>
                    <input type="text" v-model="currentBook.bookCover">
                </li>
                <button class="btn" @click="add">添加图书</button>
            </div>
        </div>
    </div>
</template>
<script>
    import MyHeader from "../components/MyHeader.vue";
    import {addBook} from "../api/index.js"
    // 默认导出一个对象
    export default {
        data(){
            return {
                currentBook:{}
            }
        },
        created(){

        },
        methods: {
            add(){
                addBook(this.currentBook);
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
