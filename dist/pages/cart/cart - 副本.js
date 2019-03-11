'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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
      navigationBarTitleText: '购物车',
      enablePullDownRefresh: false,
      navigationBarTextStyle: 'white'
    }, _this.components = {
      // loading: loading,
      // login: login
    }, _this.data = {
      showContent: false, //加载动画
      indexData: '', //首页信息
      initNum: 1
    }, _this.computed = {}, _this.methods = {
      goodsNum: function goodsNum(e) {
        console.log(this.initNum);
        if (e.detail.value == 0 || e.detail.value == '') {
          this.initNum = 1;
          this.$apply();
        } else {
          this.initNum = e.detail.value;
          this.$apply();
        }
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

exports.default = Order;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQgLSDlia/mnKwuanMiXSwibmFtZXMiOlsiT3JkZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImVuYWJsZVB1bGxEb3duUmVmcmVzaCIsIm5hdmlnYXRpb25CYXJUZXh0U3R5bGUiLCJjb21wb25lbnRzIiwiZGF0YSIsInNob3dDb250ZW50IiwiaW5kZXhEYXRhIiwiaW5pdE51bSIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvb2RzTnVtIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJkZXRhaWwiLCJ2YWx1ZSIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyxvQ0FBOEIsU0FEdkI7QUFFUEMsOEJBQXdCLEtBRmpCO0FBR1BDLDZCQUF1QixLQUhoQjtBQUlQQyw4QkFBd0I7QUFKakIsSyxRQU1UQyxVLEdBQWE7QUFDWDtBQUNBO0FBRlcsSyxRQUliQyxJLEdBQU87QUFDTEMsbUJBQWEsS0FEUixFQUNjO0FBQ25CQyxpQkFBVyxFQUZOLEVBRVM7QUFDZEMsZUFBUztBQUhKLEssUUFLUEMsUSxHQUFXLEUsUUF3QlhDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxDQURELEVBQ0c7QUFDVEMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLTixPQUFqQjtBQUNBLFlBQUdJLEVBQUVHLE1BQUYsQ0FBU0MsS0FBVCxJQUFrQixDQUFsQixJQUF1QkosRUFBRUcsTUFBRixDQUFTQyxLQUFULElBQWtCLEVBQTVDLEVBQStDO0FBQzdDLGVBQUtSLE9BQUwsR0FBZSxDQUFmO0FBQ0EsZUFBS1MsTUFBTDtBQUNELFNBSEQsTUFHSztBQUNILGVBQUtULE9BQUwsR0FBZUksRUFBRUcsTUFBRixDQUFTQyxLQUF4QjtBQUNBLGVBQUtDLE1BQUw7QUFDRDtBQUNGO0FBVk8sSzs7Ozs7NkJBckJELENBQUU7Ozs2QkFDRixDQUVSO0FBREM7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7RUF2Q2lDQyxlQUFLQyxJOztrQkFBbkJyQixLIiwiZmlsZSI6ImNhcnQgLSDlia/mnKwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuaW1wb3J0IGxvYWRpbmcgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9sb2FkaW5nJ1xyXG5pbXBvcnQgYXBpIGZyb20gJy4uLy4uL3V0aWxzL2NvbW1vbk1ULmpzJ1xyXG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZy5qcydcclxuaW1wb3J0IGNhcnRNb2RlbCBmcm9tICcuL2NhcnRNb2RlbC5qcydcclxuaW1wb3J0IGxvZ2luIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbG9naW4nXHJcbmltcG9ydCB2aWV3TW9kZWwgZnJvbSAnLi4vLi4vdXRpbHMvdmlld01vZGVsLmpzJ1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgY29uZmlnID0ge1xyXG4gICAgbmF2aWdhdGlvbkJhckJhY2tncm91bmRDb2xvcjogXCIjRjgzNzYwXCIsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6LSt54mp6L2mJyxcclxuICAgIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogZmFsc2UsXHJcbiAgICBuYXZpZ2F0aW9uQmFyVGV4dFN0eWxlOiAnd2hpdGUnXHJcbiAgfVxyXG4gIGNvbXBvbmVudHMgPSB7XHJcbiAgICAvLyBsb2FkaW5nOiBsb2FkaW5nLFxyXG4gICAgLy8gbG9naW46IGxvZ2luXHJcbiAgfVxyXG4gIGRhdGEgPSB7XHJcbiAgICBzaG93Q29udGVudDogZmFsc2UsLy/liqDovb3liqjnlLtcclxuICAgIGluZGV4RGF0YTogJycsLy/pppbpobXkv6Hmga9cclxuICAgIGluaXROdW06IDFcclxuICB9XHJcbiAgY29tcHV0ZWQgPSB7XHJcblxyXG4gIH1cclxuICBvblNob3coKSB7fVxyXG4gIG9uTG9hZCgpIHtcclxuICAgIC8vIHRoaXMuX2dldERhdGEoKVxyXG4gIH1cclxuICAvL+iOt+WPlummlumhteS/oeaBr1xyXG4gIC8vIF9nZXREYXRhKCl7XHJcbiAgLy8gICBsZXQgcXVlcnkgPSB7XHJcbiAgLy8gICAgIHNob3BJRDogQ29uZmlnLnNob3BJRFxyXG4gIC8vICAgfVxyXG4gIC8vICAgY2FydE1vZGVsLmdldERhdGEocXVlcnksKHJlcyk9PntcclxuICAvLyAgICAgaWYgKHJlcy5jb2RlID09IDIwMCkge1xyXG4gIC8vICAgICAgIGFwaS5zaG93VGlwcygnJylcclxuICAvLyAgICAgICB0aGlzLnNob3dDb250ZW50ID0gdHJ1ZVxyXG4gIC8vICAgICAgIHRoaXMuaW5kZXhEYXRhID0gcmVzLmRhdGFcclxuICAvLyAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgLy8gICAgIH1lbHNle1xyXG4gIC8vICAgICAgIHRoaXMuc2hvd0NvbnRlbnQgPSB0cnVlXHJcbiAgLy8gICAgICAgdGhpcy4kYXBwbHkoKVxyXG4gIC8vICAgICB9XHJcbiAgLy8gICB9KVxyXG4gIC8vIH1cclxuICBtZXRob2RzID0ge1xyXG4gICAgZ29vZHNOdW0oZSl7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuaW5pdE51bSlcclxuICAgICAgaWYoZS5kZXRhaWwudmFsdWUgPT0gMCB8fCBlLmRldGFpbC52YWx1ZSA9PSAnJyl7XHJcbiAgICAgICAgdGhpcy5pbml0TnVtID0gMVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfWVsc2V7XHJcbiAgICAgICAgdGhpcy5pbml0TnVtID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbiJdfQ==