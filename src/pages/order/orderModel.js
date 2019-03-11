import Base from '../../utils/base.js'
class myModel extends Base {
  constructor() {
    super()
  }
  // // 获取首页信息
  // getData(queryData, callback) {
  //   let param = {
  //     type: 'get',
  //     url: `v15/cate/cates?shopID=${queryData.shopID}`,
  //     data: {
  //     },
  //     sCallback(ResData) {
  //       callback && callback(ResData)
  //     }
  //   }
  //   this.request(param)
  // }
  // // 获取附近
  // nearbyShop(queryData, callback) {
  //   let param = {
  //     url: 'v15/mall/get-nearby-malls',
  //     data: {
  //       limit: queryData.limit,
  //       page: queryData.page,
  //       long: queryData.long,
  //       lat: queryData.lat,
  //       distance: queryData.distance,
  //     },
  //     sCallback(ResData) {
  //       callback && callback(ResData)
  //     }
  //   }
  //   this.request(param)
  // }
}
const MyModel = new myModel()
export default MyModel
