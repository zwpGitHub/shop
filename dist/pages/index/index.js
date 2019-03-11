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

var _indexModel = require('./indexModel.js');

var _indexModel2 = _interopRequireDefault(_indexModel);

var _login = require('./../../components/login.js');

var _login2 = _interopRequireDefault(_login);

var _viewModel = require('./../../utils/viewModel.js');

var _viewModel2 = _interopRequireDefault(_viewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarBackgroundColor: "#F83760",
      navigationBarTitleText: '首页',
      enablePullDownRefresh: false,
      navigationBarTextStyle: 'white'
    }, _this.components = {
      // loading: loading,
      // login: login
    }, _this.data = {
      showContent: false, //加载动画
      indexData: '' //首页信息
    }, _this.computed = {}, _this.methods = {
      goClassList: function goClassList() {
        wx.navigateTo({
          url: './classList'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
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
    //   IndexModel.getData(query,(res)=>{
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

  return Index;
}(_wepy2.default.page);


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiY29tcG9uZW50cyIsImRhdGEiLCJzaG93Q29udGVudCIsImluZGV4RGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvQ2xhc3NMaXN0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLG9DQUE4QixTQUR2QjtBQUVQQyw4QkFBd0IsSUFGakI7QUFHUEMsNkJBQXVCLEtBSGhCO0FBSVBDLDhCQUF3QjtBQUpqQixLLFFBTVRDLFUsR0FBYTtBQUNYO0FBQ0E7QUFGVyxLLFFBSWJDLEksR0FBTztBQUNMQyxtQkFBYSxLQURSLEVBQ2M7QUFDbkJDLGlCQUFXLEVBRk4sQ0FFUztBQUZULEssUUFJUEMsUSxHQUFXLEUsUUF1QlhDLE8sR0FBVTtBQUNSQyxpQkFEUSx5QkFDSztBQUNYQyxXQUFHQyxVQUFILENBQWM7QUFDWkMsZUFBSztBQURPLFNBQWQ7QUFHRDtBQUxPLEs7Ozs7OzZCQXJCRCxDQUFFOzs7NkJBQ0YsQ0FFUjtBQURDOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0VBckNpQ0MsZUFBS0MsSTs7a0JBQW5CakIsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbG9hZGluZydcbmltcG9ydCBhcGkgZnJvbSAnLi4vLi4vdXRpbHMvY29tbW9uTVQuanMnXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy5qcydcbmltcG9ydCBJbmRleE1vZGVsIGZyb20gJy4vaW5kZXhNb2RlbC5qcydcbmltcG9ydCBsb2dpbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xvZ2luJ1xuaW1wb3J0IHZpZXdNb2RlbCBmcm9tICcuLi8uLi91dGlscy92aWV3TW9kZWwuanMnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gIGNvbmZpZyA9IHtcbiAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNGODM3NjBcIixcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6aaW6aG1JyxcbiAgICBlbmFibGVQdWxsRG93blJlZnJlc2g6IGZhbHNlLFxuICAgIG5hdmlnYXRpb25CYXJUZXh0U3R5bGU6ICd3aGl0ZSdcbiAgfVxuICBjb21wb25lbnRzID0ge1xuICAgIC8vIGxvYWRpbmc6IGxvYWRpbmcsXG4gICAgLy8gbG9naW46IGxvZ2luXG4gIH1cbiAgZGF0YSA9IHtcbiAgICBzaG93Q29udGVudDogZmFsc2UsLy/liqDovb3liqjnlLtcbiAgICBpbmRleERhdGE6ICcnLC8v6aaW6aG15L+h5oGvXG4gIH1cbiAgY29tcHV0ZWQgPSB7XG4gIH1cbiAgb25TaG93KCkge31cbiAgb25Mb2FkKCkge1xuICAgIC8vIHRoaXMuX2dldERhdGEoKVxuICB9XG4gIC8v6I635Y+W6aaW6aG15L+h5oGvXG4gIC8vIF9nZXREYXRhKCl7XG4gIC8vICAgbGV0IHF1ZXJ5ID0ge1xuICAvLyAgICAgc2hvcElEOiBDb25maWcuc2hvcElEXG4gIC8vICAgfVxuICAvLyAgIEluZGV4TW9kZWwuZ2V0RGF0YShxdWVyeSwocmVzKT0+e1xuICAvLyAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xuICAvLyAgICAgICBhcGkuc2hvd1RpcHMoJycpXG4gIC8vICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSB0cnVlXG4gIC8vICAgICAgIHRoaXMuaW5kZXhEYXRhID0gcmVzLmRhdGFcbiAgLy8gICAgICAgdGhpcy4kYXBwbHkoKVxuICAvLyAgICAgfWVsc2V7XG4gIC8vICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSB0cnVlXG4gIC8vICAgICAgIHRoaXMuJGFwcGx5KClcbiAgLy8gICAgIH1cbiAgLy8gICB9KVxuICAvLyB9XG4gIG1ldGhvZHMgPSB7XG4gICAgZ29DbGFzc0xpc3QoKXtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcuL2NsYXNzTGlzdCdcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbiJdfQ==