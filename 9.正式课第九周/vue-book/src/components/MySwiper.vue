<template>
    <div>
        <swiper :options="swiperOption">
            <swiper-slide v-for="(slide,index) in sliders" :key="index">
                <img :src="slide" alt="">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>

    import {swiper,swiperSlide} from "vue-awesome-swiper"
    // 默认导出一个对象
    export default {
        name: 'carrousel',
        data(){
            return {
                swiperOption:{
                    autoplay:3000,
                    loop:true,
                    pagination : '.swiper-pagination'
                }
            }
        },
        props:["sliders"],
        methods: {},
        components: {
            swiper,
            swiperSlide
        },
        computed: {}
    }
</script>

<style scoped>
    img{
        width:100%;
    }
</style>
