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

var _myModel = require('./myModel.js');

var _myModel2 = _interopRequireDefault(_myModel);

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
      navigationBarTitleText: '我的地址',
      enablePullDownRefresh: false,
      navigationBarTextStyle: 'white'
    }, _this.components = {
      // loading: loading,
      // login: login
    }, _this.data = {
      showContent: false, //加载动画
      indexData: '' //首页信息
    }, _this.computed = {}, _this.methods = {
      goEditAddress: function goEditAddress() {
        wx.navigateTo({
          url: './editAddress'
        });
      },
      goNewAddress: function goNewAddress() {
        wx.navigateTo({
          url: './newAddress'
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/my/myAddress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15QWRkcmVzcy5qcyJdLCJuYW1lcyI6WyJPcmRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZW5hYmxlUHVsbERvd25SZWZyZXNoIiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImNvbXBvbmVudHMiLCJkYXRhIiwic2hvd0NvbnRlbnQiLCJpbmRleERhdGEiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb0VkaXRBZGRyZXNzIiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29OZXdBZGRyZXNzIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0IsTUFGakI7QUFHUEMsNkJBQXVCLEtBSGhCO0FBSVBDLDhCQUF3QjtBQUpqQixLLFFBTVRDLFUsR0FBYTtBQUNYO0FBQ0E7QUFGVyxLLFFBSWJDLEksR0FBTztBQUNMQyxtQkFBYSxLQURSLEVBQ2M7QUFDbkJDLGlCQUFXLEVBRk4sQ0FFUztBQUZULEssUUFJUEMsUSxHQUFXLEUsUUF3QlhDLE8sR0FBVTtBQUNSQyxtQkFEUSwyQkFDTztBQUNiQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSztBQURPLFNBQWQ7QUFHRCxPQUxPO0FBTVJDLGtCQU5RLDBCQU1NO0FBQ1pILFdBQUdDLFVBQUgsQ0FBYztBQUNaQyxlQUFLO0FBRE8sU0FBZDtBQUdEO0FBVk8sSzs7Ozs7NkJBckJELENBQUU7Ozs2QkFDRixDQUVSO0FBREM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7RUF0Q2lDRSxlQUFLQyxJOztrQkFBbkJsQixLIiwiZmlsZSI6Im15QWRkcmVzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5pbXBvcnQgbG9hZGluZyBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xvYWRpbmcnXHJcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uTVQuanMnXHJcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vdXRpbHMvY29uZmlnLmpzJ1xyXG5pbXBvcnQgbXlBZGRyZXNzTW9kZWwgZnJvbSAnLi9teU1vZGVsLmpzJ1xyXG5pbXBvcnQgbG9naW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9sb2dpbidcclxuaW1wb3J0IHZpZXdNb2RlbCBmcm9tICcuLi8uLi91dGlscy92aWV3TW9kZWwuanMnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNGODM3NjBcIixcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmiJHnmoTlnLDlnYAnLFxyXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcclxuICB9XHJcbiAgY29tcG9uZW50cyA9IHtcclxuICAgIC8vIGxvYWRpbmc6IGxvYWRpbmcsXHJcbiAgICAvLyBsb2dpbjogbG9naW5cclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHNob3dDb250ZW50OiBmYWxzZSwvL+WKoOi9veWKqOeUu1xyXG4gICAgaW5kZXhEYXRhOiAnJywvL+mmlumhteS/oeaBr1xyXG4gIH1cclxuICBjb21wdXRlZCA9IHtcclxuXHJcbiAgfVxyXG4gIG9uU2hvdygpIHt9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8gdGhpcy5fZ2V0RGF0YSgpXHJcbiAgfVxyXG4gIC8v6I635Y+W6aaW6aG15L+h5oGvXHJcbiAgLy8gX2dldERhdGEoKXtcclxuICAvLyAgIGxldCBxdWVyeSA9IHtcclxuICAvLyAgICAgc2hvcElEOiBDb25maWcuc2hvcElEXHJcbiAgLy8gICB9XHJcbiAgLy8gICBPcmRlck1vZGVsLmdldERhdGEocXVlcnksKHJlcyk9PntcclxuICAvLyAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gIC8vICAgICAgIGFwaS5zaG93VGlwcygnJylcclxuICAvLyAgICAgICB0aGlzLnNob3dDb250ZW50ID0gdHJ1ZVxyXG4gIC8vICAgICAgIHRoaXMuaW5kZXhEYXRhID0gcmVzLmRhdGFcclxuICAvLyAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgLy8gICAgIH1lbHNle1xyXG4gIC8vICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSB0cnVlXHJcbiAgLy8gICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9KVxyXG4gIC8vIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgZ29FZGl0QWRkcmVzcygpe1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuL2VkaXRBZGRyZXNzJ1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdvTmV3QWRkcmVzcygpe1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuL25ld0FkZHJlc3MnXHJcbiAgICAgIH0pXHJcbiAgICB9LFxyXG4gIH1cclxufVxyXG5cclxuIl19