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

var myModel = function (_Base) {
  _inherits(myModel, _Base);

  function myModel() {
    _classCallCheck(this, myModel);

    return _possibleConstructorReturn(this, (myModel.__proto__ || Object.getPrototypeOf(myModel)).call(this));
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


  return myModel;
}(_base2.default);

var MyModel = new myModel();
exports.default = MyModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15TW9kZWwuanMiXSwibmFtZXMiOlsibXlNb2RlbCIsIkJhc2UiLCJNeU1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBQ01BLE87OztBQUNKLHFCQUFjO0FBQUE7O0FBQUE7QUFFYjtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztFQWpDb0JDLGM7O0FBbUN0QixJQUFNQyxVQUFVLElBQUlGLE9BQUosRUFBaEI7a0JBQ2VFLE8iLCJmaWxlIjoibXlNb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gJy4uLy4uL3V0aWxzL2Jhc2UuanMnXHJcbmNsYXNzIG15TW9kZWwgZXh0ZW5kcyBCYXNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKClcclxuICB9XHJcbiAgLy8gLy8g6I635Y+W6aaW6aG15L+h5oGvXHJcbiAgLy8gZ2V0RGF0YShxdWVyeURhdGEsIGNhbGxiYWNrKSB7XHJcbiAgLy8gICBsZXQgcGFyYW0gPSB7XHJcbiAgLy8gICAgIHR5cGU6ICdnZXQnLFxyXG4gIC8vICAgICB1cmw6IGB2MTUvY2F0ZS9jYXRlcz9zaG9wSUQ9JHtxdWVyeURhdGEuc2hvcElEfWAsXHJcbiAgLy8gICAgIGRhdGE6IHtcclxuICAvLyAgICAgfSxcclxuICAvLyAgICAgc0NhbGxiYWNrKFJlc0RhdGEpIHtcclxuICAvLyAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhSZXNEYXRhKVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9XHJcbiAgLy8gICB0aGlzLnJlcXVlc3QocGFyYW0pXHJcbiAgLy8gfVxyXG4gIC8vIC8vIOiOt+WPlumZhOi/kVxyXG4gIC8vIG5lYXJieVNob3AocXVlcnlEYXRhLCBjYWxsYmFjaykge1xyXG4gIC8vICAgbGV0IHBhcmFtID0ge1xyXG4gIC8vICAgICB1cmw6ICd2MTUvbWFsbC9nZXQtbmVhcmJ5LW1hbGxzJyxcclxuICAvLyAgICAgZGF0YToge1xyXG4gIC8vICAgICAgIGxpbWl0OiBxdWVyeURhdGEubGltaXQsXHJcbiAgLy8gICAgICAgcGFnZTogcXVlcnlEYXRhLnBhZ2UsXHJcbiAgLy8gICAgICAgbG9uZzogcXVlcnlEYXRhLmxvbmcsXHJcbiAgLy8gICAgICAgbGF0OiBxdWVyeURhdGEubGF0LFxyXG4gIC8vICAgICAgIGRpc3RhbmNlOiBxdWVyeURhdGEuZGlzdGFuY2UsXHJcbiAgLy8gICAgIH0sXHJcbiAgLy8gICAgIHNDYWxsYmFjayhSZXNEYXRhKSB7XHJcbiAgLy8gICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soUmVzRGF0YSlcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vICAgdGhpcy5yZXF1ZXN0KHBhcmFtKVxyXG4gIC8vIH1cclxufVxyXG5jb25zdCBNeU1vZGVsID0gbmV3IG15TW9kZWwoKVxyXG5leHBvcnQgZGVmYXVsdCBNeU1vZGVsXHJcbiJdfQ==