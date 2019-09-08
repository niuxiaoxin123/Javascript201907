<template>
  <div id="app">
      <Tab></Tab>
      <!--对应路由将要显示的组件-->
      <router-view></router-view>
  </div>
</template>
<script>
    // 当前组件是根组件
  import Tab from "./components/Tab.vue";// 导入tab组件
  export default {
      data(){
          return {};
      },
      components:{
          Tab
      }
  }
</script>
<style lang="less">
  *{
    margin: 0;
    padding:0;
  }
</style>
