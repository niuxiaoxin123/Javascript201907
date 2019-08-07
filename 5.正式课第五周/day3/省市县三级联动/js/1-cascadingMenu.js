let jsonData;
let $province=$("#province");
function formData(level,value) {
    // 通过level来判断当前需要得到第几级的数据
    let result = [];
    let data=null;
    if(level===0){
        $.each(jsonData,function (index,item) {
            result.push(item.name)
        });
    }
    if(level===1){
         $.each(jsonData,function (index,item) {
             if(item.name===value){
                 data=item.city
             }
         })
        if(data){
             $.each(data,function (index,item) {
                 result.push(item.name)
             })
         }
    }
    if(level===2){
        $.each(jsonData,function (index,item) {
            $.each(item.city,function (index,item) {
                if(item.name===value){
                    data=item.area;
                }
            })
        })
        result=data;
    }
    return result;
}
// 仅用于组装新的字符串；
function bindHtml(result) {
    let str=`<option>请选择</option>`;
    $.each(result,function (index,item) {
        str+=`<option>${item}</option>`
    })
    return str;
}
$.ajax({
    url:"json/regionData.json",
    type:"get",
    dateType:"json",
    success:function (data) {
        jsonData=data;
        let result= formData(0);
        let provinceStr=bindHtml(result);
        $province.html(provinceStr);
        // 切换省份；
        $province.change(function () {
            let val= $(this).val();
            let cityStr=bindHtml(formData(1,val))
            $("#city").html(cityStr);
            $("#county").html(bindHtml([]))
        });
        // 切换市
        $("#city").change(function () {
            let val = $(this).val();
            let countyStr=bindHtml(formData(2,val));
            $("#county").html(countyStr);
        })
    }
});
