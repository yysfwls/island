import {config} from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误',
  1005: 'appkey无效',
  3000:'期刊不存在',
}

class HTTP {
  // 给外部调用
  request:(url, data={}, method="GET"){
    return new Promise((resolve, reject)=>{
      this._request(url, resolve, reject, data, method)
    })
  }
  // HTTP内部调用
  _request(url, resolve, reject, data={}, method="GET") {
    wx.request({  //访问api
      url: config.api_base_url + url,
      method: method,
      data:data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }
  _show_error(error_code){
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
};