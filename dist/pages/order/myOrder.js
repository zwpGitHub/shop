'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _loading = require('./../../components/loading.js');

var _loading2 = _interopRequireDefault(_loading);

var _commonMT = require('./../../utils/commonMT.js');

var _commonMT2 = _interopRequireDefault(_commonMT);

var _config = require('./../../utils/config.js');

var _config2 = _interopRequireDefault(_config);

var _orderModel = require('./orderModel.js');

var _orderModel2 = _interopRequireDefault(_orderModel);

var _login = require('./../../components/login.js');

var _login2 = _interopRequireDefault(_login);

var _viewModel = require('./../../utils/viewModel.js');

var _viewModel2 = _interopRequireDefault(_viewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = function (_wepy$page) {
  _inherits(Order, _wepy$page);

  function Order() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarBackgroundColor: "#F83760",
      navigationBarTitleText: '我的订单',
      enablePullDownRefresh: false,
      navigationBarTextStyle: 'white'
    }, _this.components = {
      // loading: loading,
      // login: login
    }, _this.data = {
      showContent: false, //加载动画
      indexData: '' //首页信息
    }, _this.computed = {}, _this.methods = {
      goDetail: function goDetail() {
        wx.navigateTo({
          url: './orderDetail'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Order, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {}
    // this._getData()

    //获取首页信息
    // _getData(){
    //   let query = {
    //     shopID: Config.shopID
    //   }
    //   OrderModel.getData(query,(res)=>{
    //     if (res.code == 200) {
    //       api.showTips('')
    //       this.showContent = true
    //       this.indexData = res.data
    //       this.$apply()
    //     }else{
    //       this.showContent = true
    //       this.$apply()
    //     }
    //   })
    // }

  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order/myOrder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15T3JkZXIuanMiXSwibmFtZXMiOlsiT3JkZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwiZGF0YSIsInNob3dDb250ZW50IiwiaW5kZXhEYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ29EZXRhaWwiLCJ3eCIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixNQUZqQjtBQUdQQyw2QkFBdUIsS0FIaEI7QUFJUEMsOEJBQXdCO0FBSmpCLEssUUFNVEMsVSxHQUFhO0FBQ1g7QUFDQTtBQUZXLEssUUFJYkMsSSxHQUFPO0FBQ0xDLG1CQUFhLEtBRFIsRUFDYztBQUNuQkMsaUJBQVcsRUFGTixDQUVTO0FBRlQsSyxRQUlQQyxRLEdBQVcsRSxRQXdCWEMsTyxHQUFVO0FBQ1JDLGNBRFEsc0JBQ0U7QUFDUkMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0Q7QUFMTyxLOzs7Ozs2QkFyQkQsQ0FBRTs7OzZCQUNGLENBRVI7QUFEQzs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztFQXRDaUNDLGVBQUtDLEk7O2tCQUFuQmpCLEsiLCJmaWxlIjoibXlPcmRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgbG9hZGluZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uTVQuanMnXHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vdXRpbHMvY29uZmlnLmpzJ1xyXG5pbXBvcnQgb3JkZXJNb2RlbCBmcm9tICcuL29yZGVyTW9kZWwuanMnXHJcbmltcG9ydCBsb2dpbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xvZ2luJ1xyXG5pbXBvcnQgdmlld01vZGVsIGZyb20gJy4uLy4uL3V0aWxzL3ZpZXdNb2RlbC5qcydcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI0Y4Mzc2MFwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aIkeeahOiuouWNlScsXHJcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xyXG4gIH1cclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgLy8gbG9hZGluZzogbG9hZGluZyxcclxuICAgIC8vIGxvZ2luOiBsb2dpblxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2hvd0NvbnRlbnQ6IGZhbHNlLC8v5Yqg6L295Yqo55S7XHJcbiAgICBpbmRleERhdGE6ICcnLC8v6aaW6aG15L+h5oGvXHJcbiAgfVxyXG4gIGNvbXB1dGVkID0ge1xyXG5cclxuICB9XHJcbiAgb25TaG93KCkge31cclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyB0aGlzLl9nZXREYXRhKClcclxuICB9XHJcbiAgLy/ojrflj5bpppbpobXkv6Hmga9cclxuICAvLyBfZ2V0RGF0YSgpe1xyXG4gIC8vICAgbGV0IHF1ZXJ5ID0ge1xyXG4gIC8vICAgICBzaG9wSUQ6IENvbmZpZy5zaG9wSURcclxuICAvLyAgIH1cclxuICAvLyAgIE9yZGVyTW9kZWwuZ2V0RGF0YShxdWVyeSwocmVzKT0+e1xyXG4gIC8vICAgICBpZiAocmVzLmNvZGUgPT0gMjAwKSB7XHJcbiAgLy8gICAgICAgYXBpLnNob3dUaXBzKCcnKVxyXG4gIC8vICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSB0cnVlXHJcbiAgLy8gICAgICAgdGhpcy5pbmRleERhdGEgPSByZXMuZGF0YVxyXG4gIC8vICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAvLyAgICAgfWVsc2V7XHJcbiAgLy8gICAgICAgdGhpcy5zaG93Q29udGVudCA9IHRydWVcclxuICAvLyAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH0pXHJcbiAgLy8gfVxyXG4gIG1ldGhvZHMgPSB7XHJcbiAgICBnb0RldGFpbCgpe1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuL29yZGVyRGV0YWlsJ1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuIl19