<template>
    <div id="app">
        <div @click="fn">{{msg}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                msg:"你很好"
            }
        },
        methods:{
            fn(){
                console.log(100);
            }
        }
    }
</script>
<style>
    div{
        font-size: 40px;
        color:red;
    }
</style>