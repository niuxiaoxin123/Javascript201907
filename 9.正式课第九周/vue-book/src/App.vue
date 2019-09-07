<template>
  <div id="app">
      <Tab></Tab>
      <router-view></router-view>
  </div>
</template>
<script>
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
