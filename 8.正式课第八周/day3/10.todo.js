let vm = new Vue({
    el:"#app",
    data:{
        task:[{isSelected:false,title:"去吃饭"},{isSelected:false,title:"看电影"}],
        val:""

    },
    methods:{
        addTodo(){
            this.task.push({isSelected:false,title:this.val});
            this.val="";
        },
        removeTodo(obj){
            this.task=this.task.filter(item=>item!==obj)
        }
    }
});