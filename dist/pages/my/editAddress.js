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
      navigationBarTitleText: '编辑地址',
      enablePullDownRefresh: false,
      navigationBarTextStyle: 'white'
    }, _this.components = {
      // loading: loading,
      // login: login
    }, _this.data = {
      showContent: false, //加载动画
      indexData: '' //首页信息
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/my/editAddress'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVkaXRBZGRyZXNzLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiY29tcG9uZW50cyIsImRhdGEiLCJzaG93Q29udGVudCIsImluZGV4RGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyxvQ0FBOEIsU0FEdkI7QUFFUEMsOEJBQXdCLE1BRmpCO0FBR1BDLDZCQUF1QixLQUhoQjtBQUlQQyw4QkFBd0I7QUFKakIsSyxRQU1UQyxVLEdBQWE7QUFDWDtBQUNBO0FBRlcsSyxRQUliQyxJLEdBQU87QUFDTEMsbUJBQWEsS0FEUixFQUNjO0FBQ25CQyxpQkFBVyxFQUZOLENBRVM7QUFGVCxLLFFBSVBDLFEsR0FBVyxFLFFBd0JYQyxPLEdBQVUsRTs7Ozs7NkJBckJELENBQUU7Ozs2QkFDRixDQUVSO0FBREM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7RUF0Q2lDQyxlQUFLQyxJOztrQkFBbkJiLEsiLCJmaWxlIjoiZWRpdEFkZHJlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL3V0aWxzL2NvbW1vbk1ULmpzJ1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy5qcydcclxuaW1wb3J0IGVkaXRBZGRyZXNzTW9kZWwgZnJvbSAnLi9teU1vZGVsLmpzJ1xyXG5pbXBvcnQgbG9naW4gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9sb2dpbidcclxuaW1wb3J0IHZpZXdNb2RlbCBmcm9tICcuLi8uLi91dGlscy92aWV3TW9kZWwuanMnXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICBjb25maWcgPSB7XHJcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNGODM3NjBcIixcclxuICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnvJbovpHlnLDlnYAnLFxyXG4gICAgZW5hYmxlUHVsbERvd25SZWZyZXNoOiBmYWxzZSxcclxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcclxuICB9XHJcbiAgY29tcG9uZW50cyA9IHtcclxuICAgIC8vIGxvYWRpbmc6IGxvYWRpbmcsXHJcbiAgICAvLyBsb2dpbjogbG9naW5cclxuICB9XHJcbiAgZGF0YSA9IHtcclxuICAgIHNob3dDb250ZW50OiBmYWxzZSwvL+WKoOi9veWKqOeUu1xyXG4gICAgaW5kZXhEYXRhOiAnJywvL+mmlumhteS/oeaBr1xyXG4gIH1cclxuICBjb21wdXRlZCA9IHtcclxuXHJcbiAgfVxyXG4gIG9uU2hvdygpIHt9XHJcbiAgb25Mb2FkKCkge1xyXG4gICAgLy8gdGhpcy5fZ2V0RGF0YSgpXHJcbiAgfVxyXG4gIC8v6I635Y+W6aaW6aG15L+h5oGvXHJcbiAgLy8gX2dldERhdGEoKXtcclxuICAvLyAgIGxldCBxdWVyeSA9IHtcclxuICAvLyAgICAgc2hvcElEOiBDb25maWcuc2hvcElEXHJcbiAgLy8gICB9XHJcbiAgLy8gICBPcmRlck1vZGVsLmdldERhdGEocXVlcnksKHJlcyk9PntcclxuICAvLyAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gIC8vICAgICAgIGFwaS5zaG93VGlwcygnJylcclxuICAvLyAgICAgICB0aGlzLnNob3dDb250ZW50ID0gdHJ1ZVxyXG4gIC8vICAgICAgIHRoaXMuaW5kZXhEYXRhID0gcmVzLmRhdGFcclxuICAvLyAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgLy8gICAgIH1lbHNle1xyXG4gIC8vICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSB0cnVlXHJcbiAgLy8gICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9KVxyXG4gIC8vIH1cclxuICBtZXRob2RzID0ge1xyXG5cclxuICB9XHJcbn1cclxuXHJcbiJdfQ==