import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({
  data: {

  },
  //事件处理函数

  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
      })

    })
  },

  onLike: function (event) {
    console.log(event);
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id,this.data.classic.type)
  },

  onReady: function () {

  }
})