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

var _cartModel = require('./cartModel.js');

var _cartModel2 = _interopRequireDefault(_cartModel);

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
      navigationBarTitleText: '确认订单',
      enablePullDownRefresh: false,
      navigationBarTextStyle: 'white'
    }, _this.components = {
      // loading: loading,
      // login: login
    }, _this.data = {
      showContent: false, //加载动画
      indexData: '', //首页信息
      initNum: 1
    }, _this.computed = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
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
    //   cartModel.getData(query,(res)=>{
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/cart/pay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheS5qcyJdLCJuYW1lcyI6WyJPcmRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImNvbXBvbmVudHMiLCJkYXRhIiwic2hvd0NvbnRlbnQiLCJpbmRleERhdGEiLCJpbml0TnVtIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0IsTUFGakI7QUFHUEMsNkJBQXVCLEtBSGhCO0FBSVBDLDhCQUF3QjtBQUpqQixLLFFBTVRDLFUsR0FBYTtBQUNYO0FBQ0E7QUFGVyxLLFFBSWJDLEksR0FBTztBQUNMQyxtQkFBYSxLQURSLEVBQ2M7QUFDbkJDLGlCQUFXLEVBRk4sRUFFUztBQUNkQyxlQUFTO0FBSEosSyxRQUtQQyxRLEdBQVcsRSxRQXdCWEMsTyxHQUFVLEU7Ozs7OzZCQXJCRCxDQUFFOzs7NkJBQ0YsQ0FFUjtBQURDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0VBdkNpQ0MsZUFBS0MsSTs7a0JBQW5CZCxLIiwiZmlsZSI6InBheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgbG9hZGluZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uTVQuanMnXHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vdXRpbHMvY29uZmlnLmpzJ1xyXG5pbXBvcnQgcGF5TW9kZWwgZnJvbSAnLi9jYXJ0TW9kZWwuanMnXHJcbmltcG9ydCBsb2dpbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xvZ2luJ1xyXG5pbXBvcnQgdmlld01vZGVsIGZyb20gJy4uLy4uL3V0aWxzL3ZpZXdNb2RlbC5qcydcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXIgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gIGNvbmZpZyA9IHtcclxuICAgIG5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3I6IFwiI0Y4Mzc2MFwiLFxyXG4gICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+ehruiupOiuouWNlScsXHJcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxyXG4gICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogJ3doaXRlJ1xyXG4gIH1cclxuICBjb21wb25lbnRzID0ge1xyXG4gICAgLy8gbG9hZGluZzogbG9hZGluZyxcclxuICAgIC8vIGxvZ2luOiBsb2dpblxyXG4gIH1cclxuICBkYXRhID0ge1xyXG4gICAgc2hvd0NvbnRlbnQ6IGZhbHNlLC8v5Yqg6L295Yqo55S7XHJcbiAgICBpbmRleERhdGE6ICcnLC8v6aaW6aG15L+h5oGvXHJcbiAgICBpbml0TnVtOiAxXHJcbiAgfVxyXG4gIGNvbXB1dGVkID0ge1xyXG5cclxuICB9XHJcbiAgb25TaG93KCkge31cclxuICBvbkxvYWQoKSB7XHJcbiAgICAvLyB0aGlzLl9nZXREYXRhKClcclxuICB9XHJcbiAgLy/ojrflj5bpppbpobXkv6Hmga9cclxuICAvLyBfZ2V0RGF0YSgpe1xyXG4gIC8vICAgbGV0IHF1ZXJ5ID0ge1xyXG4gIC8vICAgICBzaG9wSUQ6IENvbmZpZy5zaG9wSURcclxuICAvLyAgIH1cclxuICAvLyAgIGNhcnRNb2RlbC5nZXREYXRhKHF1ZXJ5LChyZXMpPT57XHJcbiAgLy8gICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAvLyAgICAgICBhcGkuc2hvd1RpcHMoJycpXHJcbiAgLy8gICAgICAgdGhpcy5zaG93Q29udGVudCA9IHRydWVcclxuICAvLyAgICAgICB0aGlzLmluZGV4RGF0YSA9IHJlcy5kYXRhXHJcbiAgLy8gICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gIC8vICAgICB9ZWxzZXtcclxuICAvLyAgICAgICB0aGlzLnNob3dDb250ZW50ID0gdHJ1ZVxyXG4gIC8vICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSlcclxuICAvLyB9XHJcbiAgbWV0aG9kcyA9IHtcclxuXHJcbiAgfVxyXG59XHJcblxyXG4iXX0=