'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_Base) {
  _inherits(View, _Base);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this));
  }
  // 更新用户访问量


  _createClass(View, [{
    key: 'postViewData',
    value: function postViewData(queryData, callback) {
      var param = {
        url: 'v15/index/update_data',
        data: {
          type: queryData.type
        },
        sCallback: function sCallback(ResData) {
          callback && callback(ResData);
        }
      };
      this.request(param);
    }
  }, {
    key: 'getPlatformData',
    value: function getPlatformData(queryData, callback) {
      var param = {
        url: 'v15/index/shop_info',
        data: {},
        sCallback: function sCallback(ResData) {
          callback && callback(ResData);
        }
      };
      this.request(param);
    }
  }]);

  return View;
}(_base2.default);

var ViewModel = new View();
exports.default = ViewModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZpZXdNb2RlbC5qcyJdLCJuYW1lcyI6WyJWaWV3IiwicXVlcnlEYXRhIiwiY2FsbGJhY2siLCJwYXJhbSIsInVybCIsImRhdGEiLCJ0eXBlIiwic0NhbGxiYWNrIiwiUmVzRGF0YSIsInJlcXVlc3QiLCJCYXNlIiwiVmlld01vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFDTUEsSTs7O0FBQ0osa0JBQWM7QUFBQTs7QUFBQTtBQUViO0FBQ0Q7Ozs7O2lDQUNhQyxTLEVBQVdDLFEsRUFBVTtBQUNoQyxVQUFJQyxRQUFRO0FBQ1ZDLGFBQUssdUJBREs7QUFFVkMsY0FBTTtBQUNKQyxnQkFBTUwsVUFBVUs7QUFEWixTQUZJO0FBS1ZDLGlCQUxVLHFCQUtBQyxPQUxBLEVBS1M7QUFDakJOLHNCQUFZQSxTQUFTTSxPQUFULENBQVo7QUFDRDtBQVBTLE9BQVo7QUFTQSxXQUFLQyxPQUFMLENBQWFOLEtBQWI7QUFDRDs7O29DQUNlRixTLEVBQVdDLFEsRUFBUztBQUNsQyxVQUFJQyxRQUFRO0FBQ1ZDLGFBQUsscUJBREs7QUFFVkMsY0FBTSxFQUZJO0FBSVZFLGlCQUpVLHFCQUlBQyxPQUpBLEVBSVM7QUFDakJOLHNCQUFZQSxTQUFTTSxPQUFULENBQVo7QUFDRDtBQU5TLE9BQVo7QUFRQSxXQUFLQyxPQUFMLENBQWFOLEtBQWI7QUFDRDs7OztFQTNCZ0JPLGM7O0FBNkJuQixJQUFNQyxZQUFZLElBQUlYLElBQUosRUFBbEI7a0JBQ2VXLFMiLCJmaWxlIjoidmlld01vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSAnLi9iYXNlLmpzJ1xyXG5jbGFzcyBWaWV3IGV4dGVuZHMgQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG4gIC8vIOabtOaWsOeUqOaIt+iuv+mXrumHj1xyXG4gIHBvc3RWaWV3RGF0YShxdWVyeURhdGEsIGNhbGxiYWNrKSB7XHJcbiAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgIHVybDogJ3YxNS9pbmRleC91cGRhdGVfZGF0YScsXHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICB0eXBlOiBxdWVyeURhdGEudHlwZVxyXG4gICAgICB9LFxyXG4gICAgICBzQ2FsbGJhY2soUmVzRGF0YSkge1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKFJlc0RhdGEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVxdWVzdChwYXJhbSlcclxuICB9XHJcbiAgZ2V0UGxhdGZvcm1EYXRhKHF1ZXJ5RGF0YSwgY2FsbGJhY2spe1xyXG4gICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICB1cmw6ICd2MTUvaW5kZXgvc2hvcF9pbmZvJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICB9LFxyXG4gICAgICBzQ2FsbGJhY2soUmVzRGF0YSkge1xyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKFJlc0RhdGEpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMucmVxdWVzdChwYXJhbSlcclxuICB9XHJcbn1cclxuY29uc3QgVmlld01vZGVsID0gbmV3IFZpZXcoKVxyXG5leHBvcnQgZGVmYXVsdCBWaWV3TW9kZWxcclxuIl19