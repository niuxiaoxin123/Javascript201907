/**
 * @file 视频播放器
 * @author v_wangyaping(v_wangyaping@baidu.com)
 * @date 2019-1-14
 */
import React, { Component } from 'react';
import styles from './index.scss';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paused: true,
            toolsShow: false
        };
    }
    // 播放时
    timeupdate = () => {
        let vm = this;
        clearTimeout(vm.timeout);
        vm.timeout = setTimeout(function () {
            let currentTime = vm.refs.video.currentTime.toFixed(0);
            let surplusTime = vm.state.duration - currentTime;
            vm.setState({
                toolsShow: true,
                currentTime: surplusTime >= 10 ? surplusTime : '0' + surplusTime
            });
        }, 40);
    }
    // 视频总时长
    durationchange = e => {
        let duration = e.target.duration.toFixed(0);
        // alert(duration)
        this.setState({
            currentTime: duration,
            duration,
            // toolsShow: true
        });
    }

    componentDidMount() {
        this.props.getPauseCb(this.pause);
        this.props.getPlayCb(this.play);
        // let video = this.refs.video;
        // let interval = null;
        // interval = setInterval(()=>{
        //     alert(video.duration + '&' +  !isNaN(video.duration))
        //      if(!isNaN(video.duration)) {
        //          alert('视频总时长获取成功')
        //          let duration = video.duration.toFixed(0);
        //          this.setState({
        //              currentTime: duration,
        //              duration,
        //              toolsShow: true
        //          }, ()=>{
        //              clearInterval(interval)
        //          });
        //      }
        // }, 100)
    }
    render() {
        let {
            paused,
            currentTime,
            toolsShow
        } = this.state;
        let props = this.props;
        return (
            <div className={`${styles.player} ${props.className}`}
                onClick={this.playerClickHandle}>
                <video
                    webkit-playsinline='true'
                    playsInline
                    src={props.src}
                    ref='video'
                    loop
                    poster={props.poster}
                    controls={false}
                    onTimeUpdate={this.timeupdate}
                    onDurationChange={this.durationchange}>
                    您的浏览器不支持video标签
                </video>
                {paused && <div className={styles.tools}>
                    <i className='iconfont play'>&#xe667;</i>
                </div>}
                {toolsShow && <div className={styles.currentTime}>00:{currentTime}</div>}
            </div >
        );
    }
    // 全屏点击
    playerClickHandle = e => {
        console.log('全屏点击', this.refs.video.paused);
        this.setState({
            paused: !this.refs.video.paused
        });
        if (this.refs.video.paused) {
            this.play();
            this.props.trackUpload('video_play');
        } else {
            this.pause();
            this.props.trackUpload('video_pause');
        }
    }
    // 播放
    play = () => {
        this.setState({
            paused: false
        });
        this.refs.video.play();
    }
    // 暂停
    pause = () => {
        this.setState({
            paused: true
        });
        this.refs.video.pause();
    }
}
