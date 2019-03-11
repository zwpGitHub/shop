import Config from './config.js'
import TokenModel from './token.js'
class Base {
  constructor() {
    this.baseRestUrl = Config.resUrl
    this.shopConfig = {
      shopID: Config.shopID,
    }
  }
  request(params, noRefetch) {
    let that = this, url = this.baseRestUrl + params.url
    if(params.type === 'get') {
      // url += '?shopID='+ this.shopConfig.shopID
    }
    if (!params.type) {
      params.type = 'post'
      if(params.data) {
        Object.assign(params.data, this.shopConfig)
      } else {
        params.data = this.shopConfig
      }
    }
    /* 不需要再次组装地址 */
    if (params.sign) {
      delete params.shopID
    }
    if (params.setUpUrl) {
      url = params.url
    }
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token')
      },
      success: function(res) {
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        let code = res.statusCode.toString()
        let startChar = code.charAt(0)
        if (startChar !== '2') {        //不正常访问 
          if(res.data.code == '401' && !noRefetch){  // token问题
            console.log('token无效')
            that._refetch(params)
          } else if(!noRefetch) {
            that._refetch(params)
            console.log(res)
            console.log(params)
          }
        } else {  // 正常访问
          params.sCallback && params.sCallback(res.data)
        }
      },
      fail: function (err) {
        that._processError(err)
        params.fCallback && params.fCallback()
      }
    })
  }

  _processError (err) {
    wx.showToast({
      title:'请求失败，请重试',
      icon: 'none'
    })
    console.log(err)
  }
  _refetch(param) {
    TokenModel.getTokenFromServer((token) => {
      this.request(param, true)
    })
  }
  _toIndex(){
    wx.showModal({
      title: '访问超时',
      content: '点击返回首页',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/index/index'
          })
        }
      }
    })
  }
  /* 获得元素上的绑定的值 */

  getDataSet (event, key) {
    return event.currentTarget.dataset[key]
  }
  // 修改上一个页面的某个状态
  setPrePageState(data,changeData){
    let prevPage = getCurrentPages()[getCurrentPages().length-2]
    prevPage.setData({
      [data]: changeData
    })
  }
  // 时间戳转成日期格式
  getLocalTime(timestamp,isJSTime) { 
    var date = ''
    var Y = ''
    var M = ''
    var D = ''
    var h = ''
    var m = ''
    var s = ''
    if(isJSTime){
      date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + '-';
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      D = date.getDate() + ' ';
      h = date.getHours() + ':';
      m = date.getMinutes() + ':';
      s = date.getSeconds();
    }else{
      // return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
      date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + '-';
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      D = date.getDate() + ' ';
      h = date.getHours() + ':';
      m = date.getMinutes() + ':';
      s = date.getSeconds();
    }
    let timeNow = new Date().getFullYear()
    if(timeNow == date.getFullYear()){
      return M+D+h+m+s;
    }else{
      return Y+M+D+h+m+s;
    }
  }
}

export default Base
