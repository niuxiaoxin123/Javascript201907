<template>
    <div>
        <MyHeader>首页</MyHeader>
        Home
    </div>
</template>

<script>
    // 默认导出一个对象
    import MyHeader from "../components/MyHeader.vue";
    import {getSlider} from "../api/index.js";
    export default {
        data(){
            return {

            }
        },
        created(){
            this.slider();
        },
        methods: {
            slider(){
                getSlider().then(function (data) {
                    console.log(data);
                })
            }

        },
        components: {
            MyHeader
        },
        computed: {}
    }
</script>

<style scoped>
</style>
