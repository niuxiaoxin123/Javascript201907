let vm = new Vue({
    el: '#app',
    data: {
        task:[{isSelected:true,title:"睡觉"},{isSelected:false,title:"看电影"}],
        title:"",
        cur:"",
        hash:"#all"// 用于存储当前页面的hash值；
    },
    // 自定义指令
    directives:{
        focus(el){// el: 当前的元素；
            el.focus();// 自动获取鼠标焦点的方法；
        }
    },
    created(){
        // 给window绑定一个hashchange事件；当页面的hash值发生改变时，会触发这个函数；
        //this.hash="#all";
        this.hash=window.location.hash;
        console.log(this.hash);
        /*window.addEventListener("hashchange",()=>{
            // window.location.hash :获取页面的hash值；
            this.hash=window.location.hash;
        },false)*/
        window.onhashchange=()=>{
            // window.location.hash :获取页面的hash值；
            this.hash=window.location.hash;
        }
    },
    methods:{
        // 存储的是事件或者方法；当键盘抬起并且是enter键时，向数组task中新增一个对象；
        addTodo(){
            this.task.push({isSelected:false,title:this.title});
            // 新增完成之后，清空input中的内容；
            this.title="";
        },
        remove(val){
            // val : 是点击时传递的item；
            // 过滤，如果不相等就留下，相等的删除；
            this.task=this.task.filter(item=>item!==val);
        },
        remember(val){
            // 当双击li时，把当前li所对应的todo的对象赋值给cur;
            this.cur = val;
        },
        update(){
            this.cur="";
        }
    },
    computed:{
        filterTodo(){
            // 默认走get方法；
            if(this.hash==="#all"||this.hash==="")return this.task;
            if(this.hash==="#finish")return this.task.filter(item=>item.isSelected);
            if(this.hash==="#unfinish")return this.task.filter(item=>!item.isSelected);
        },
        count(){
            // 把数组成员中属性名是true的过滤出来；获取这个数组的length属性；
            return this.task.filter(item=>item.isSelected).length;
        }
    }
});