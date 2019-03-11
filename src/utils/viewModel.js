import Base from './base.js'
class View extends Base {
  constructor() {
    super()
  }
  // 更新用户访问量
  postViewData(queryData, callback) {
    let param = {
      url: 'v15/index/update_data',
      data: {
        type: queryData.type
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
  getPlatformData(queryData, callback){
    let param = {
      url: 'v15/index/shop_info',
      data: {
      },
      sCallback(ResData) {
        callback && callback(ResData)
      }
    }
    this.request(param)
  }
}
const ViewModel = new View()
export default ViewModel
