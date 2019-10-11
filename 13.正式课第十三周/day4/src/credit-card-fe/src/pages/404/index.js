/**
 * @file 404
 * @author luoxiaolan(luoxiaolan@baidu.com)
 * @date 2018/6/21
 */
import React from 'react';
import {Link} from 'react-router';
import styles from './index.scss';
import _404_ from './404.jpg';
import hyphenate from '../../common/js/hyphenate';
hyphenate.setDocumentTitle('404');

export default function NotFound() {
    return (
        <article className={styles.box}>
            <figure>
                <img src={_404_} alt="图片丢失啦~" title="页面丢失啦~ "/>
                <p className={styles.textBox}>
                    你貌似来到了没有内容的荒原~
                </p>
                <Link to={hyphenate.concatChnQuery('/bkrcredit/')}>
                    跳转到首页
                </Link>
            </figure>
        </article>
    );
}
