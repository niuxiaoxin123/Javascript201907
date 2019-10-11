/**
 * @file 城市选择 js
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2017/6/15
 */
import * as services from './services';

export const CITY_LIST = 'CITY_LIST';
export const CITY_INDEX = 'CITY_INDEX';

export const fetch = (index, needFetch = true, itemIndex) => function (dispatch) {
    if (needFetch) {
        services.fetch().then(
            res => {
                dispatch({
                    type: CITY_LIST,
                    data: res.data.content
                });
            }
        ).catch(
            function (err) {
                console.log(err);
            }
        );
    } else {
        dispatch({
            type: CITY_INDEX,
            index: index,
            itemIndex: itemIndex
        });
    }

};
