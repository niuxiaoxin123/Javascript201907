/**
 * @file 全局变量
 * @author v_wangyaping@baidu.com
 * @date 2019-1-7
 */
import {bdTrackEvent} from './bdTongji';
import eventUpload from './eventUpload';
import {CONSTS} from '../constant';
global.bdTrackEvent = bdTrackEvent;         // 百度统计
global.eventUpload = eventUpload;           // 埋点统计平台
global.CONSTS = CONSTS;                     // 静态资源数据