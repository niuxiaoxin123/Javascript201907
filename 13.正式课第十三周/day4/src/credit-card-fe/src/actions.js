/**
 * @file 公共actions-多页面通用
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2018/8/16
 */
import * as services from './services';

export const PERSONAL_DYNAMIC_FETCH = 'PERSONAL_DYNAMIC_FETCH';
export const CACAH_SEARCH = 'CACAH_SEARCH';
export const BANNER_LIST_FETCH = 'BANNER_LIST_FETCH';
export const FETCH_BANNER_CACHE = 'FETCH_BANNER_CACHE';
export const RECOMMEND_CARD = 'RECOMMEND_CARD';
export const RECOMMEND_LOAN = 'RECOMMEND_LOAN';



// 获取个人动态
export const fetchPersonalDynamic = data => function (dispatch) {
    services.fetchPersonalDynamic(data).then(
        res => {
            dispatch({
                type: PERSONAL_DYNAMIC_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
// 存储url ? 后面的参数--用于切换优惠tab时不刷新页面
export const cacheSearch = data => function (dispatch) {
    dispatch({
        type: CACAH_SEARCH,
        data: data
    });
};

// 请求广告位banner图
export const fetchBannerPic = (data = {}, cb) => function (dispatch) {

    services.fetchBannerPic(data).then(
        res => {
            console.log();
            cb && cb(res);
            dispatch({
                type: BANNER_LIST_FETCH,
                data: res.data.content.mateList
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

// 清空bannerList清缓存
export const fetchBannerCache = () => function (dispatch) {
    dispatch({
        type: FETCH_BANNER_CACHE
    });
};

// 推荐卡
export const fetchCardRecommend = (data = {}, cb) => function (dispatch) {
    services.fetchCardRecommend(data).then(
        res => {
            dispatch({
                type: RECOMMEND_CARD,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

// 推荐贷款产品
export const fetchProductRecommend = (data = {}, cb) => function (dispatch) {
    services.fetchProductRecommend(data).then(
        res => {
            dispatch({
                type: RECOMMEND_LOAN,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};

// 产品申请跳转
export const fetchProductApply = (data = {}, cb) => function (dispatch) {
    services.fetchProductApply(data).then(
        res => {
            window.location.href = res.data.content.jumpUrl;
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};