import {
  classicBeh
} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()  
// 背景音乐方法

Component({
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
  },
  attached:function(event){ 
    // 每次页面时判断播放图标的样式

  },
  detached: function(event){
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
          playing: true
        })
        mMgr.src = this.properties.src
      } else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    }
  }
})