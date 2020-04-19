import { HTTP } from "../utils/http-p.js";

class KeywordModel extends HTTP{
  key = "q";
  maxLength = 10;
  //  历史搜索 缓存原理
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return [];
    }
    return words;
  }

  //  从服务器获取数据
  getHot() {
    return this.request({
      url:'/book/hot_keyword'
    })
  }

  //   把关键字写入缓存
  addToHistory(keyword) {
    let words = this.getHistory();
    const has = words.includes(keyword);
    if (!has) {
      const length = words.length;
      if (length >= this.maxLength) {
        //   数组末尾元素先删除掉pop，再把新的添加到第一位unshift。队列
        words.pop();
      }
      words.unshift(keyword);
      wx.setStorageSync(this.key, words);
    }
  }
}

export { KeywordModel };
