'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _commonMT = require('./../utils/commonMT.js');

var _commonMT2 = _interopRequireDefault(_commonMT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var login = function (_wepy$component) {
  _inherits(login, _wepy$component);

  function login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = login.__proto__ || Object.getPrototypeOf(login)).call.apply(_ref, [this].concat(args))), _this), _this.props = {}, _this.data = {
      showLoginBtn: true
    }, _this.computed = {}, _this.components = {}, _this.methods = {
      getUserInfo: function getUserInfo(res) {
        var _this2 = this;

        wx.showLoading({
          title: '登录中...'
        });
        _commonMT2.default.getUser(res, function () {
          wx.hideLoading();
          _commonMT2.default.showTips("登录成功");
          _this2.showLoginBtn = false;
          _this2.$apply();
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(login, [{
    key: 'onLoad',
    value: function onLoad() {
      var info = wx.getStorageSync('userInfo');
      if (info) {
        this.showLoginBtn = false;
        this.$apply();
      }
    }
  }]);

  return login;
}(_wepy2.default.component);

exports.default = login;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImxvZ2luIiwicHJvcHMiLCJkYXRhIiwic2hvd0xvZ2luQnRuIiwiY29tcHV0ZWQiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsImdldFVzZXJJbmZvIiwicmVzIiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwiYXBpIiwiZ2V0VXNlciIsImhpZGVMb2FkaW5nIiwic2hvd1RpcHMiLCIkYXBwbHkiLCJpbmZvIiwiZ2V0U3RvcmFnZVN5bmMiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsSyxHQUFRLEUsUUFFUkMsSSxHQUFPO0FBQ0xDLG9CQUFjO0FBRFQsSyxRQUdQQyxRLEdBQVcsRSxRQUdYQyxVLEdBQWEsRSxRQUdiQyxPLEdBQVU7QUFDUkMsaUJBRFEsdUJBQ0lDLEdBREosRUFDUTtBQUFBOztBQUNkQyxXQUFHQyxXQUFILENBQWU7QUFDYkMsaUJBQU87QUFETSxTQUFmO0FBR0FDLDJCQUFJQyxPQUFKLENBQVlMLEdBQVosRUFBZ0IsWUFBSTtBQUNsQkMsYUFBR0ssV0FBSDtBQUNBRiw2QkFBSUcsUUFBSixDQUFhLE1BQWI7QUFDQSxpQkFBS1osWUFBTCxHQUFvQixLQUFwQjtBQUNBLGlCQUFLYSxNQUFMO0FBQ0QsU0FMRDtBQU1EO0FBWE8sSzs7Ozs7NkJBYUY7QUFDTixVQUFJQyxPQUFPUixHQUFHUyxjQUFILENBQWtCLFVBQWxCLENBQVg7QUFDQSxVQUFHRCxJQUFILEVBQVE7QUFDTixhQUFLZCxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsYUFBS2EsTUFBTDtBQUNEO0FBQ0Y7Ozs7RUEvQmdDRyxlQUFLQyxTOztrQkFBbkJwQixLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBpbXBvcnQgYXBpIGZyb20gJy4uL3V0aWxzL2NvbW1vbk1ULmpzJ1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGxvZ2luIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICB9XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzaG93TG9naW5CdG46IHRydWVcclxuICAgIH1cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZ2V0VXNlckluZm8ocmVzKXtcclxuICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICB0aXRsZTogJ+eZu+W9leS4rS4uLidcclxuICAgICAgICB9KVxyXG4gICAgICAgIGFwaS5nZXRVc2VyKHJlcywoKT0+e1xyXG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxyXG4gICAgICAgICAgYXBpLnNob3dUaXBzKFwi55m75b2V5oiQ5YqfXCIpXHJcbiAgICAgICAgICB0aGlzLnNob3dMb2dpbkJ0biA9IGZhbHNlXHJcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXHJcbiAgICAgICAgfSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgIGxldCBpbmZvID0gd3guZ2V0U3RvcmFnZVN5bmMoJ3VzZXJJbmZvJylcclxuICAgICAgaWYoaW5mbyl7XHJcbiAgICAgICAgdGhpcy5zaG93TG9naW5CdG4gPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuJGFwcGx5KClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19