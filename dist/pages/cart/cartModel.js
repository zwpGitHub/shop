'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./../../utils/base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var orederModel = function (_Base) {
  _inherits(orederModel, _Base);

  function orederModel() {
    _classCallCheck(this, orederModel);

    return _possibleConstructorReturn(this, (orederModel.__proto__ || Object.getPrototypeOf(orederModel)).call(this));
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


  return orederModel;
}(_base2.default);

var OrederModel = new orederModel();
exports.default = OrederModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnRNb2RlbC5qcyJdLCJuYW1lcyI6WyJvcmVkZXJNb2RlbCIsIkJhc2UiLCJPcmVkZXJNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUNNQSxXOzs7QUFDSix5QkFBYztBQUFBOztBQUFBO0FBRWI7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7RUFqQ3dCQyxjOztBQW1DMUIsSUFBTUMsY0FBYyxJQUFJRixXQUFKLEVBQXBCO2tCQUNlRSxXIiwiZmlsZSI6ImNhcnRNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL3V0aWxzL2Jhc2UuanMnXHJcbmNsYXNzIG9yZWRlck1vZGVsIGV4dGVuZHMgQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG4gIC8vIC8vIOiOt+WPlummlumhteS/oeaBr1xyXG4gIC8vIGdldERhdGEocXVlcnlEYXRhLCBjYWxsYmFjaykge1xyXG4gIC8vICAgbGV0IHBhcmFtID0ge1xyXG4gIC8vICAgICB0eXBlOiAnZ2V0JyxcclxuICAvLyAgICAgdXJsOiBgdjE1L2NhdGUvY2F0ZXM/c2hvcElEPSR7cXVlcnlEYXRhLnNob3BJRH1gLFxyXG4gIC8vICAgICBkYXRhOiB7XHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIHNDYWxsYmFjayhSZXNEYXRhKSB7XHJcbiAgLy8gICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soUmVzRGF0YSlcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vICAgdGhpcy5yZXF1ZXN0KHBhcmFtKVxyXG4gIC8vIH1cclxuICAvLyAvLyDojrflj5bpmYTov5FcclxuICAvLyBuZWFyYnlTaG9wKHF1ZXJ5RGF0YSwgY2FsbGJhY2spIHtcclxuICAvLyAgIGxldCBwYXJhbSA9IHtcclxuICAvLyAgICAgdXJsOiAndjE1L21hbGwvZ2V0LW5lYXJieS1tYWxscycsXHJcbiAgLy8gICAgIGRhdGE6IHtcclxuICAvLyAgICAgICBsaW1pdDogcXVlcnlEYXRhLmxpbWl0LFxyXG4gIC8vICAgICAgIHBhZ2U6IHF1ZXJ5RGF0YS5wYWdlLFxyXG4gIC8vICAgICAgIGxvbmc6IHF1ZXJ5RGF0YS5sb25nLFxyXG4gIC8vICAgICAgIGxhdDogcXVlcnlEYXRhLmxhdCxcclxuICAvLyAgICAgICBkaXN0YW5jZTogcXVlcnlEYXRhLmRpc3RhbmNlLFxyXG4gIC8vICAgICB9LFxyXG4gIC8vICAgICBzQ2FsbGJhY2soUmVzRGF0YSkge1xyXG4gIC8vICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKFJlc0RhdGEpXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuICAvLyAgIHRoaXMucmVxdWVzdChwYXJhbSlcclxuICAvLyB9XHJcbn1cclxuY29uc3QgT3JlZGVyTW9kZWwgPSBuZXcgb3JlZGVyTW9kZWwoKVxyXG5leHBvcnQgZGVmYXVsdCBPcmVkZXJNb2RlbFxyXG4iXX0=