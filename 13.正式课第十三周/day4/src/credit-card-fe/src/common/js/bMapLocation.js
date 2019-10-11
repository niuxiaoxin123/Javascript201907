/**
 * @file 获取地理定位
 * @author v_wangyaping@baidu.com
 * @date 2018/11/5
 * @return  成功：返回获取到的地理位置信息
 *          失败：返回默认地理位置（天安门）
 */
import BMap from 'BMap';
import {error} from '../../pages/components/tip';

export default (successCb, errCb) => {
    // 获取地理定位
    let geolocation = new BMap.Geolocation({
        maximumAge: 10 // 清除缓存
    });
    geolocation.getCurrentPosition(function (res) {
        if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            return !!successCb && successCb(res);
        } else {
            // error('获取地理位置失败');
            return !!errCb && errCb(res);
        }
    }, {
            enableHighAccuracy: true
        });

};