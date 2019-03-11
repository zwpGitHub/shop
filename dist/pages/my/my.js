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
      navigationBarTitleText: '我的',
      enablePullDownRefresh: false,
      navigationBarTextStyle: 'white'
    }, _this.components = {
      // loading: loading,
      // login: login
    }, _this.data = {
      showContent: false, //加载动画
      indexData: '' //首页信息
    }, _this.computed = {}, _this.methods = {
      goMyCollect: function goMyCollect() {
        wx.navigateTo({
          url: './myCollect'
        });
      },
      goMyAddress: function goMyAddress() {
        wx.navigateTo({
          url: './myAddress'
        });
      },
      goMyOrder: function goMyOrder() {
        wx.navigateTo({
          url: '../order/myOrder'
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
    //   MyModel.getData(query,(res)=>{
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


Page(require('./../../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/my/my'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm15LmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvciIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJlbmFibGVQdWxsRG93blJlZnJlc2giLCJuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlIiwiY29tcG9uZW50cyIsImRhdGEiLCJzaG93Q29udGVudCIsImluZGV4RGF0YSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvTXlDb2xsZWN0Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiZ29NeUFkZHJlc3MiLCJnb015T3JkZXIiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsb0NBQThCLFNBRHZCO0FBRVBDLDhCQUF3QixJQUZqQjtBQUdQQyw2QkFBdUIsS0FIaEI7QUFJUEMsOEJBQXdCO0FBSmpCLEssUUFNVEMsVSxHQUFhO0FBQ1g7QUFDQTtBQUZXLEssUUFJYkMsSSxHQUFPO0FBQ0xDLG1CQUFhLEtBRFIsRUFDYztBQUNuQkMsaUJBQVcsRUFGTixDQUVTO0FBRlQsSyxRQUlQQyxRLEdBQVcsRSxRQXdCWEMsTyxHQUFVO0FBQ1JDLGlCQURRLHlCQUNLO0FBQ1hDLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyxlQUFLO0FBRE8sU0FBZDtBQUdELE9BTE87QUFNUkMsaUJBTlEseUJBTUs7QUFDWEgsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGVBQUs7QUFETyxTQUFkO0FBR0QsT0FWTztBQVdSRSxlQVhRLHVCQVdHO0FBQ1RKLFdBQUdDLFVBQUgsQ0FBYztBQUNaQyxlQUFLO0FBRE8sU0FBZDtBQUdEO0FBZk8sSzs7Ozs7NkJBckJELENBQUU7Ozs2QkFDRixDQUVSO0FBREM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7RUF0Q2lDRyxlQUFLQyxJOztrQkFBbkJuQixLIiwiZmlsZSI6Im15LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmltcG9ydCBsb2FkaW5nIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbG9hZGluZydcclxuaW1wb3J0IGFwaSBmcm9tICcuLi8uLi91dGlscy9jb21tb25NVC5qcydcclxuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi91dGlscy9jb25maWcuanMnXHJcbmltcG9ydCBNeU1vZGVsIGZyb20gJy4vbXlNb2RlbC5qcydcclxuaW1wb3J0IGxvZ2luIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbG9naW4nXHJcbmltcG9ydCB2aWV3TW9kZWwgZnJvbSAnLi4vLi4vdXRpbHMvdmlld01vZGVsLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjRjgzNzYwXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oiR55qEJyxcclxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXHJcbiAgfVxyXG4gIGNvbXBvbmVudHMgPSB7XHJcbiAgICAvLyBsb2FkaW5nOiBsb2FkaW5nLFxyXG4gICAgLy8gbG9naW46IGxvZ2luXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzaG93Q29udGVudDogZmFsc2UsLy/liqDovb3liqjnlLtcclxuICAgIGluZGV4RGF0YTogJycsLy/pppbpobXkv6Hmga9cclxuICB9XHJcbiAgY29tcHV0ZWQgPSB7XHJcblxyXG4gIH1cclxuICBvblNob3coKSB7fVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIC8vIHRoaXMuX2dldERhdGEoKVxyXG4gIH1cclxuICAvL+iOt+WPlummlumhteS/oeaBr1xyXG4gIC8vIF9nZXREYXRhKCl7XHJcbiAgLy8gICBsZXQgcXVlcnkgPSB7XHJcbiAgLy8gICAgIHNob3BJRDogQ29uZmlnLnNob3BJRFxyXG4gIC8vICAgfVxyXG4gIC8vICAgTXlNb2RlbC5nZXREYXRhKHF1ZXJ5LChyZXMpPT57XHJcbiAgLy8gICAgIGlmIChyZXMuY29kZSA9PSAyMDApIHtcclxuICAvLyAgICAgICBhcGkuc2hvd1RpcHMoJycpXHJcbiAgLy8gICAgICAgdGhpcy5zaG93Q29udGVudCA9IHRydWVcclxuICAvLyAgICAgICB0aGlzLmluZGV4RGF0YSA9IHJlcy5kYXRhXHJcbiAgLy8gICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gIC8vICAgICB9ZWxzZXtcclxuICAvLyAgICAgICB0aGlzLnNob3dDb250ZW50ID0gdHJ1ZVxyXG4gIC8vICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfSlcclxuICAvLyB9XHJcbiAgbWV0aG9kcyA9IHtcclxuICAgIGdvTXlDb2xsZWN0KCl7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4vbXlDb2xsZWN0J1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdvTXlBZGRyZXNzKCl7XHJcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgIHVybDogJy4vbXlBZGRyZXNzJ1xyXG4gICAgICB9KVxyXG4gICAgfSxcclxuICAgIGdvTXlPcmRlcigpe1xyXG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICB1cmw6ICcuLi9vcmRlci9teU9yZGVyJ1xyXG4gICAgICB9KSAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4iXX0=