'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var loading = function (_wepy$component) {
  _inherits(loading, _wepy$component);

  function loading() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, loading);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = loading.__proto__ || Object.getPrototypeOf(loading)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      load: Boolean
    }, _this.data = {}, _this.computed = {}, _this.components = {}, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(loading, [{
    key: 'onLoad',
    value: function onLoad() {
      wx.hideShareMenu();
    }
  }]);

  return loading;
}(_wepy2.default.component);

exports.default = loading;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRpbmcuanMiXSwibmFtZXMiOlsibG9hZGluZyIsInByb3BzIiwibG9hZCIsIkJvb2xlYW4iLCJkYXRhIiwiY29tcHV0ZWQiLCJjb21wb25lbnRzIiwibWV0aG9kcyIsInd4IiwiaGlkZVNoYXJlTWVudSIsIndlcHkiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFDcUJBLE87Ozs7Ozs7Ozs7Ozs7O3dMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU1DO0FBREEsSyxRQUdSQyxJLEdBQU8sRSxRQUdQQyxRLEdBQVcsRSxRQUdYQyxVLEdBQWEsRSxRQUdiQyxPLEdBQVUsRTs7Ozs7NkJBR0Y7QUFDTkMsU0FBR0MsYUFBSDtBQUNEOzs7O0VBbEJrQ0MsZUFBS0MsUzs7a0JBQXJCWCxPIiwiZmlsZSI6ImxvYWRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGxvYWRpbmcgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgbG9hZDogQm9vbGVhblxyXG4gICAgfVxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRzID0ge1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCl7XHJcbiAgICAgIHd4LmhpZGVTaGFyZU1lbnUoKVxyXG4gICAgfVxyXG4gIH1cclxuIl19