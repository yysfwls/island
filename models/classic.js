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
  //getClassic这个方法是寻找index期刊的上一期还是下一期
  getClassic(index, nextOrPrevious, sCallback) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious == 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    // 去缓存中寻找
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(
            this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
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
  //  确定key 私有的方法_开头，既能表示那个期刊，还能表示是哪期的期刊
  _getKey(index) {
    let key = 'classic-' + index
    return key;
  }
}
export {
  ClassicModel
}