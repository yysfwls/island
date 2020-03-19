import {
  HTTP
} from '../utils/http.js'

class ClassicModel extends HTTP {
  getLatest(sCallback) { //去服务器加载最新期刊
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  //先去缓存中取 没有的话调api
  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else{
      sCallback(classic)
    }
  }

  isFrist(index) {
    return index == 1 ? true : false
  }
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }
  _setLatestIndex(index) {
    wx.setStorageSync('latest', index) //同步
  }
  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index;
  }
  //  确定key 既能表示那个期刊
  _getKey(index) {
    let key = 'classic-' + index
    return key;
  }
}
export {
  ClassicModel
}