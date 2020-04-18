import {
  classicBeh
} from "../classic-beh.js";

const mMgr = wx.getBackgroundAudioManager();
console.log(mMgr);
// 背景音乐方法

Component({
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: "images/player@pause.png",
    playSrc: "images/player@play.png",
  },

  // 只有wx:if才能触发声明周期函数
  attached: function(event) {
    // 每次切换页面时判断播放图标的样式
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached: function(event) {
    // mMgr.stop()
    // 没用   page hidden不会触发detach
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        });
        mMgr.src = this.properties.src;
        mMgr.title = "123";
      } else {
        this.setData({
          playing: false,
        });
        mMgr.pause();
      }
    },
    // 图标状态
    _recoverStatus: function() {
      if (mMgr.paused) {
        this.setData({
          playing: false,
        });
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true,
        });
      }
    },
    _monitorSwitch: function() {
      mMgr.onPlay(() => {
        // 播放
        this._recoverStatus()
      });
      mMgr.onPause(() => {
        // 暂停
        this._recoverStatus()
      });
      mMgr.onStop(() => {
        // 总控×掉
        this._recoverStatus()
      });
      mMgr.onEnded(() => {
        //自然播放完成
        this._recoverStatus()
      });
    },
  },
});