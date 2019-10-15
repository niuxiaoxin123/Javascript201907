import * as Types from "../action-type";
import {getSlider,getLesson} from "../../api/home";
export default {
    changeType(t){
        return {type:Types.CHANGE_TYPE,t}
    },
    getSliderData(){
        // 请求一般在action中发送；异步请求；redux-thunk
        return function (dispatch,getState) {
            // dispatch ==> store的dispatch
            // getState==> store.getState;
            // fetch(url,{methods:"post"}).then(res=>res.json()).then(data=>{return data})
            getSlider("/getSliders").then(function (data) {
                // data就是响应回来的数据；
                dispatch({
                    type:Types.SLIDER_DATA,
                    home:data
                })
            })
        }
    },
    getLesson(){
        return function (dispatch,getState) {
            // getState()获取到store中的state；
            let s = getState().home;
            let category = s.type;
            let offset=s.lesson.offset;
            let limit = s.lesson.limit;
            getLesson(category,offset,limit).then(function (data) {
            console.log(data);
                dispatch({
                    type:Types.LESSON_DATA,
                    data:data
                })
            });
        }
    }
}

