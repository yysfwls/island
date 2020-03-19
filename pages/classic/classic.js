import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  //事件处理函数

  onLoad: function(options) {
    classicModel.getLatest((res) => {
      this.setData({
        // ...res 使用扩展运算符class.wxml里不需要写"classic."
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status,
      })
    })
  },

  onLike: function(event) {
    console.log(event);
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },
  onNext: function(event) {
    this._updateClassic('next')
  },
  onPrevious: function() {
    this._updateClassic('previous')
  },
  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFrist(res.index)
      })
    })
  },
  _getLikeStatus: function(artID,category){
    likeModel.getClassicLikeStatus(artID, category,
    (res)=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },


  onReady: function() {

  }
})