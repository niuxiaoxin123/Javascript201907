import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import state from "./state.js"
 export  default  new  Vuex.Store({
     state,
     getters:{},
     mutations:{
         add_book(state,book){
             let flag=state.collect.some(item=>item.bookId===book.bookId);
            if(!flag){
                 state.collect.push(book);
             }
         }
     },
     actions:{}
 })

