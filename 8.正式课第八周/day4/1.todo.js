
let vm = new Vue({
    el:"#app",
    data:{
        task:[{id:1,isSelected:false,title:"去吃饭"},{id:2,isSelected:false,title:"看电影"}],
        val:"",
        cur:"",
        hash:"#all"
    },
    directives:{
        focus(el){
            // 是原生的DOMinput的获取鼠标焦点的事件，触发了该鼠标焦点事件；
            el.focus();
        }
    },
    created(){
        console.log(window.location.hash);
        this.hash=window.location.hash || "#all";
        window.addEventListener("hashchange",()=>{
            // 当页面的hash发生改变，会触发这个函数
            // window.location.hash:可以直接拿到当前页面的hash值；
            this.hash=window.location.hash;
        })
    },
    updated(){
        console.log(100);
    },
    computed:{
       // 计算属性，当 依赖的hash改变，那么就会触发todo执行；
        todo(){
            // 跟return
                if(this.hash==="#all"){
                    return this.task;
                }else if(this.hash==="#finish"){
                    return this.task.filter(item=>{
                            return item.isSelected
                        }
                    );
                }else if(this.hash==="#unfinish"){
                    return this.task.filter(item=>!item.isSelected);
                }
        },
        count(){
            // 过滤出task中对象的isSelected是true的对象个数；
            return this.task.filter(item=>item.isSelected).length;
        }
    },
    methods:{
        addTodo(){
            let id = this.task[this.task.length-1].id;
            this.task.push({id:id+1,isSelected:false,title:this.val});
            this.val="";
        },
        removeTodo(obj){
            this.task=this.task.filter(item=>item!==obj)
        },
        remember(curItem){
            // 当双击li时，把当前的对象给了data的cur属性；
            this.cur=curItem;
        },
        update(){
            this.cur="";
        },

    }
});