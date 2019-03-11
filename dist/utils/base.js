'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _token = require('./token.js');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base() {
    _classCallCheck(this, Base);

    this.baseRestUrl = _config2.default.resUrl;
    this.shopConfig = {
      shopID: _config2.default.shopID
    };
  }

  _createClass(Base, [{
    key: 'request',
    value: function request(params, noRefetch) {
      var that = this,
          url = this.baseRestUrl + params.url;
      if (params.type === 'get') {
        // url += '?shopID='+ this.shopConfig.shopID
      }
      if (!params.type) {
        params.type = 'post';
        if (params.data) {
          Object.assign(params.data, this.shopConfig);
        } else {
          params.data = this.shopConfig;
        }
      }
      /* 不需要再次组装地址 */
      if (params.sign) {
        delete params.shopID;
      }
      if (params.setUpUrl) {
        url = params.url;
      }
      wx.request({
        url: url,
        data: params.data,
        method: params.type,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token')
        },
        success: function success(res) {
          // 判断以2（2xx)开头的状态码为正确
          // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
          var code = res.statusCode.toString();
          var startChar = code.charAt(0);
          if (startChar !== '2') {
            //不正常访问 
            if (res.data.code == '401' && !noRefetch) {
              // token问题
              console.log('token无效');
              that._refetch(params);
            } else if (!noRefetch) {
              that._refetch(params);
              console.log(res);
              console.log(params);
            }
          } else {
            // 正常访问
            params.sCallback && params.sCallback(res.data);
          }
        },
        fail: function fail(err) {
          that._processError(err);
          params.fCallback && params.fCallback();
        }
      });
    }
  }, {
    key: '_processError',
    value: function _processError(err) {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none'
      });
      console.log(err);
    }
  }, {
    key: '_refetch',
    value: function _refetch(param) {
      var _this = this;

      _token2.default.getTokenFromServer(function (token) {
        _this.request(param, true);
      });
    }
  }, {
    key: '_toIndex',
    value: function _toIndex() {
      wx.showModal({
        title: '访问超时',
        content: '点击返回首页',
        showCancel: false,
        success: function success(res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }
        }
      });
    }
    /* 获得元素上的绑定的值 */

  }, {
    key: 'getDataSet',
    value: function getDataSet(event, key) {
      return event.currentTarget.dataset[key];
    }
    // 修改上一个页面的某个状态

  }, {
    key: 'setPrePageState',
    value: function setPrePageState(data, changeData) {
      var prevPage = getCurrentPages()[getCurrentPages().length - 2];
      prevPage.setData(_defineProperty({}, data, changeData));
    }
    // 时间戳转成日期格式

  }, {
    key: 'getLocalTime',
    value: function getLocalTime(timestamp, isJSTime) {
      var date = '';
      var Y = '';
      var M = '';
      var D = '';
      var h = '';
      var m = '';
      var s = '';
      if (isJSTime) {
        date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
      } else {
        // return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')
        date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
      }
      var timeNow = new Date().getFullYear();
      if (timeNow == date.getFullYear()) {
        return M + D + h + m + s;
      } else {
        return Y + M + D + h + m + s;
      }
    }
  }]);

  return Base;
}();

exports.default = Base;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiXSwibmFtZXMiOlsiQmFzZSIsImJhc2VSZXN0VXJsIiwiQ29uZmlnIiwicmVzVXJsIiwic2hvcENvbmZpZyIsInNob3BJRCIsInBhcmFtcyIsIm5vUmVmZXRjaCIsInRoYXQiLCJ1cmwiLCJ0eXBlIiwiZGF0YSIsIk9iamVjdCIsImFzc2lnbiIsInNpZ24iLCJzZXRVcFVybCIsInd4IiwicmVxdWVzdCIsIm1ldGhvZCIsImhlYWRlciIsImdldFN0b3JhZ2VTeW5jIiwic3VjY2VzcyIsInJlcyIsImNvZGUiLCJzdGF0dXNDb2RlIiwidG9TdHJpbmciLCJzdGFydENoYXIiLCJjaGFyQXQiLCJjb25zb2xlIiwibG9nIiwiX3JlZmV0Y2giLCJzQ2FsbGJhY2siLCJmYWlsIiwiZXJyIiwiX3Byb2Nlc3NFcnJvciIsImZDYWxsYmFjayIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsInBhcmFtIiwiVG9rZW5Nb2RlbCIsImdldFRva2VuRnJvbVNlcnZlciIsInRva2VuIiwic2hvd01vZGFsIiwiY29udGVudCIsInNob3dDYW5jZWwiLCJjb25maXJtIiwic3dpdGNoVGFiIiwiZXZlbnQiLCJrZXkiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImNoYW5nZURhdGEiLCJwcmV2UGFnZSIsImdldEN1cnJlbnRQYWdlcyIsImxlbmd0aCIsInNldERhdGEiLCJ0aW1lc3RhbXAiLCJpc0pTVGltZSIsImRhdGUiLCJZIiwiTSIsIkQiLCJoIiwibSIsInMiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJnZXRTZWNvbmRzIiwidGltZU5vdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7O0lBQ01BLEk7QUFDSixrQkFBYztBQUFBOztBQUNaLFNBQUtDLFdBQUwsR0FBbUJDLGlCQUFPQyxNQUExQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0I7QUFDaEJDLGNBQVFILGlCQUFPRztBQURDLEtBQWxCO0FBR0Q7Ozs7NEJBQ09DLE0sRUFBUUMsUyxFQUFXO0FBQ3pCLFVBQUlDLE9BQU8sSUFBWDtBQUFBLFVBQWlCQyxNQUFNLEtBQUtSLFdBQUwsR0FBbUJLLE9BQU9HLEdBQWpEO0FBQ0EsVUFBR0gsT0FBT0ksSUFBUCxLQUFnQixLQUFuQixFQUEwQjtBQUN4QjtBQUNEO0FBQ0QsVUFBSSxDQUFDSixPQUFPSSxJQUFaLEVBQWtCO0FBQ2hCSixlQUFPSSxJQUFQLEdBQWMsTUFBZDtBQUNBLFlBQUdKLE9BQU9LLElBQVYsRUFBZ0I7QUFDZEMsaUJBQU9DLE1BQVAsQ0FBY1AsT0FBT0ssSUFBckIsRUFBMkIsS0FBS1AsVUFBaEM7QUFDRCxTQUZELE1BRU87QUFDTEUsaUJBQU9LLElBQVAsR0FBYyxLQUFLUCxVQUFuQjtBQUNEO0FBQ0Y7QUFDRDtBQUNBLFVBQUlFLE9BQU9RLElBQVgsRUFBaUI7QUFDZixlQUFPUixPQUFPRCxNQUFkO0FBQ0Q7QUFDRCxVQUFJQyxPQUFPUyxRQUFYLEVBQXFCO0FBQ25CTixjQUFNSCxPQUFPRyxHQUFiO0FBQ0Q7QUFDRE8sU0FBR0MsT0FBSCxDQUFXO0FBQ1RSLGFBQUtBLEdBREk7QUFFVEUsY0FBTUwsT0FBT0ssSUFGSjtBQUdUTyxnQkFBUVosT0FBT0ksSUFITjtBQUlUUyxnQkFBUTtBQUNOLDBCQUFnQixtQ0FEVjtBQUVOLG1CQUFTSCxHQUFHSSxjQUFILENBQWtCLE9BQWxCO0FBRkgsU0FKQztBQVFUQyxpQkFBUyxpQkFBU0MsR0FBVCxFQUFjO0FBQ3JCO0FBQ0E7QUFDQSxjQUFJQyxPQUFPRCxJQUFJRSxVQUFKLENBQWVDLFFBQWYsRUFBWDtBQUNBLGNBQUlDLFlBQVlILEtBQUtJLE1BQUwsQ0FBWSxDQUFaLENBQWhCO0FBQ0EsY0FBSUQsY0FBYyxHQUFsQixFQUF1QjtBQUFTO0FBQzlCLGdCQUFHSixJQUFJWCxJQUFKLENBQVNZLElBQVQsSUFBaUIsS0FBakIsSUFBMEIsQ0FBQ2hCLFNBQTlCLEVBQXdDO0FBQUc7QUFDekNxQixzQkFBUUMsR0FBUixDQUFZLFNBQVo7QUFDQXJCLG1CQUFLc0IsUUFBTCxDQUFjeEIsTUFBZDtBQUNELGFBSEQsTUFHTyxJQUFHLENBQUNDLFNBQUosRUFBZTtBQUNwQkMsbUJBQUtzQixRQUFMLENBQWN4QixNQUFkO0FBQ0FzQixzQkFBUUMsR0FBUixDQUFZUCxHQUFaO0FBQ0FNLHNCQUFRQyxHQUFSLENBQVl2QixNQUFaO0FBQ0Q7QUFDRixXQVRELE1BU087QUFBRztBQUNSQSxtQkFBT3lCLFNBQVAsSUFBb0J6QixPQUFPeUIsU0FBUCxDQUFpQlQsSUFBSVgsSUFBckIsQ0FBcEI7QUFDRDtBQUNGLFNBekJRO0FBMEJUcUIsY0FBTSxjQUFVQyxHQUFWLEVBQWU7QUFDbkJ6QixlQUFLMEIsYUFBTCxDQUFtQkQsR0FBbkI7QUFDQTNCLGlCQUFPNkIsU0FBUCxJQUFvQjdCLE9BQU82QixTQUFQLEVBQXBCO0FBQ0Q7QUE3QlEsT0FBWDtBQStCRDs7O2tDQUVjRixHLEVBQUs7QUFDbEJqQixTQUFHb0IsU0FBSCxDQUFhO0FBQ1hDLGVBQU0sVUFESztBQUVYQyxjQUFNO0FBRkssT0FBYjtBQUlBVixjQUFRQyxHQUFSLENBQVlJLEdBQVo7QUFDRDs7OzZCQUNRTSxLLEVBQU87QUFBQTs7QUFDZEMsc0JBQVdDLGtCQUFYLENBQThCLFVBQUNDLEtBQUQsRUFBVztBQUN2QyxjQUFLekIsT0FBTCxDQUFhc0IsS0FBYixFQUFvQixJQUFwQjtBQUNELE9BRkQ7QUFHRDs7OytCQUNTO0FBQ1J2QixTQUFHMkIsU0FBSCxDQUFhO0FBQ1hOLGVBQU8sTUFESTtBQUVYTyxpQkFBUyxRQUZFO0FBR1hDLG9CQUFZLEtBSEQ7QUFJWHhCLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsY0FBSUEsSUFBSXdCLE9BQVIsRUFBaUI7QUFDZjlCLGVBQUcrQixTQUFILENBQWE7QUFDWHRDLG1CQUFLO0FBRE0sYUFBYjtBQUdEO0FBQ0Y7QUFWVSxPQUFiO0FBWUQ7QUFDRDs7OzsrQkFFWXVDLEssRUFBT0MsRyxFQUFLO0FBQ3RCLGFBQU9ELE1BQU1FLGFBQU4sQ0FBb0JDLE9BQXBCLENBQTRCRixHQUE1QixDQUFQO0FBQ0Q7QUFDRDs7OztvQ0FDZ0J0QyxJLEVBQUt5QyxVLEVBQVc7QUFDOUIsVUFBSUMsV0FBV0Msa0JBQWtCQSxrQkFBa0JDLE1BQWxCLEdBQXlCLENBQTNDLENBQWY7QUFDQUYsZUFBU0csT0FBVCxxQkFDRzdDLElBREgsRUFDVXlDLFVBRFY7QUFHRDtBQUNEOzs7O2lDQUNhSyxTLEVBQVVDLFEsRUFBVTtBQUMvQixVQUFJQyxPQUFPLEVBQVg7QUFDQSxVQUFJQyxJQUFJLEVBQVI7QUFDQSxVQUFJQyxJQUFJLEVBQVI7QUFDQSxVQUFJQyxJQUFJLEVBQVI7QUFDQSxVQUFJQyxJQUFJLEVBQVI7QUFDQSxVQUFJQyxJQUFJLEVBQVI7QUFDQSxVQUFJQyxJQUFJLEVBQVI7QUFDQSxVQUFHUCxRQUFILEVBQVk7QUFDVkMsZUFBTyxJQUFJTyxJQUFKLENBQVNULFNBQVQsQ0FBUCxDQURVLENBQ2lCO0FBQzNCRyxZQUFJRCxLQUFLUSxXQUFMLEtBQXFCLEdBQXpCO0FBQ0FOLFlBQUksQ0FBQ0YsS0FBS1MsUUFBTCxLQUFnQixDQUFoQixHQUFvQixFQUFwQixHQUF5QixPQUFLVCxLQUFLUyxRQUFMLEtBQWdCLENBQXJCLENBQXpCLEdBQW1EVCxLQUFLUyxRQUFMLEtBQWdCLENBQXBFLElBQXlFLEdBQTdFO0FBQ0FOLFlBQUlILEtBQUtVLE9BQUwsS0FBaUIsR0FBckI7QUFDQU4sWUFBSUosS0FBS1csUUFBTCxLQUFrQixHQUF0QjtBQUNBTixZQUFJTCxLQUFLWSxVQUFMLEtBQW9CLEdBQXhCO0FBQ0FOLFlBQUlOLEtBQUthLFVBQUwsRUFBSjtBQUNELE9BUkQsTUFRSztBQUNIO0FBQ0FiLGVBQU8sSUFBSU8sSUFBSixDQUFTVCxZQUFZLElBQXJCLENBQVAsQ0FGRyxDQUUrQjtBQUNsQ0csWUFBSUQsS0FBS1EsV0FBTCxLQUFxQixHQUF6QjtBQUNBTixZQUFJLENBQUNGLEtBQUtTLFFBQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsRUFBcEIsR0FBeUIsT0FBS1QsS0FBS1MsUUFBTCxLQUFnQixDQUFyQixDQUF6QixHQUFtRFQsS0FBS1MsUUFBTCxLQUFnQixDQUFwRSxJQUF5RSxHQUE3RTtBQUNBTixZQUFJSCxLQUFLVSxPQUFMLEtBQWlCLEdBQXJCO0FBQ0FOLFlBQUlKLEtBQUtXLFFBQUwsS0FBa0IsR0FBdEI7QUFDQU4sWUFBSUwsS0FBS1ksVUFBTCxLQUFvQixHQUF4QjtBQUNBTixZQUFJTixLQUFLYSxVQUFMLEVBQUo7QUFDRDtBQUNELFVBQUlDLFVBQVUsSUFBSVAsSUFBSixHQUFXQyxXQUFYLEVBQWQ7QUFDQSxVQUFHTSxXQUFXZCxLQUFLUSxXQUFMLEVBQWQsRUFBaUM7QUFDL0IsZUFBT04sSUFBRUMsQ0FBRixHQUFJQyxDQUFKLEdBQU1DLENBQU4sR0FBUUMsQ0FBZjtBQUNELE9BRkQsTUFFSztBQUNILGVBQU9MLElBQUVDLENBQUYsR0FBSUMsQ0FBSixHQUFNQyxDQUFOLEdBQVFDLENBQVIsR0FBVUMsQ0FBakI7QUFDRDtBQUNGOzs7Ozs7a0JBR1lqRSxJIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29uZmlnIGZyb20gJy4vY29uZmlnLmpzJ1xuaW1wb3J0IFRva2VuTW9kZWwgZnJvbSAnLi90b2tlbi5qcydcbmNsYXNzIEJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJhc2VSZXN0VXJsID0gQ29uZmlnLnJlc1VybFxuICAgIHRoaXMuc2hvcENvbmZpZyA9IHtcbiAgICAgIHNob3BJRDogQ29uZmlnLnNob3BJRCxcbiAgICB9XG4gIH1cbiAgcmVxdWVzdChwYXJhbXMsIG5vUmVmZXRjaCkge1xuICAgIGxldCB0aGF0ID0gdGhpcywgdXJsID0gdGhpcy5iYXNlUmVzdFVybCArIHBhcmFtcy51cmxcbiAgICBpZihwYXJhbXMudHlwZSA9PT0gJ2dldCcpIHtcbiAgICAgIC8vIHVybCArPSAnP3Nob3BJRD0nKyB0aGlzLnNob3BDb25maWcuc2hvcElEXG4gICAgfVxuICAgIGlmICghcGFyYW1zLnR5cGUpIHtcbiAgICAgIHBhcmFtcy50eXBlID0gJ3Bvc3QnXG4gICAgICBpZihwYXJhbXMuZGF0YSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHBhcmFtcy5kYXRhLCB0aGlzLnNob3BDb25maWcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMuZGF0YSA9IHRoaXMuc2hvcENvbmZpZ1xuICAgICAgfVxuICAgIH1cbiAgICAvKiDkuI3pnIDopoHlho3mrKHnu4Too4XlnLDlnYAgKi9cbiAgICBpZiAocGFyYW1zLnNpZ24pIHtcbiAgICAgIGRlbGV0ZSBwYXJhbXMuc2hvcElEXG4gICAgfVxuICAgIGlmIChwYXJhbXMuc2V0VXBVcmwpIHtcbiAgICAgIHVybCA9IHBhcmFtcy51cmxcbiAgICB9XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IHBhcmFtcy5kYXRhLFxuICAgICAgbWV0aG9kOiBwYXJhbXMudHlwZSxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICd0b2tlbic6IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIC8vIOWIpOaWreS7pTLvvIgyeHgp5byA5aS055qE54q25oCB56CB5Li65q2j56GuXG4gICAgICAgIC8vIOW8guW4uOS4jeimgei/lOWbnuWIsOWbnuiwg+S4re+8jOWwseWcqHJlcXVlc3TkuK3lpITnkIbvvIzorrDlvZXml6Xlv5flubZzaG93VG9hc3TkuIDkuKrnu5/kuIDnmoTplJnor6/ljbPlj69cbiAgICAgICAgbGV0IGNvZGUgPSByZXMuc3RhdHVzQ29kZS50b1N0cmluZygpXG4gICAgICAgIGxldCBzdGFydENoYXIgPSBjb2RlLmNoYXJBdCgwKVxuICAgICAgICBpZiAoc3RhcnRDaGFyICE9PSAnMicpIHsgICAgICAgIC8v5LiN5q2j5bi46K6/6ZeuIFxuICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gJzQwMScgJiYgIW5vUmVmZXRjaCl7ICAvLyB0b2tlbumXrumimFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rva2Vu5peg5pWIJylcbiAgICAgICAgICAgIHRoYXQuX3JlZmV0Y2gocGFyYW1zKVxuICAgICAgICAgIH0gZWxzZSBpZighbm9SZWZldGNoKSB7XG4gICAgICAgICAgICB0aGF0Ll9yZWZldGNoKHBhcmFtcylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhcmFtcylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7ICAvLyDmraPluLjorr/pl65cbiAgICAgICAgICBwYXJhbXMuc0NhbGxiYWNrICYmIHBhcmFtcy5zQ2FsbGJhY2socmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRoYXQuX3Byb2Nlc3NFcnJvcihlcnIpXG4gICAgICAgIHBhcmFtcy5mQ2FsbGJhY2sgJiYgcGFyYW1zLmZDYWxsYmFjaygpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIF9wcm9jZXNzRXJyb3IgKGVycikge1xuICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICB0aXRsZTon6K+35rGC5aSx6LSl77yM6K+36YeN6K+VJyxcbiAgICAgIGljb246ICdub25lJ1xuICAgIH0pXG4gICAgY29uc29sZS5sb2coZXJyKVxuICB9XG4gIF9yZWZldGNoKHBhcmFtKSB7XG4gICAgVG9rZW5Nb2RlbC5nZXRUb2tlbkZyb21TZXJ2ZXIoKHRva2VuKSA9PiB7XG4gICAgICB0aGlzLnJlcXVlc3QocGFyYW0sIHRydWUpXG4gICAgfSlcbiAgfVxuICBfdG9JbmRleCgpe1xuICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICB0aXRsZTogJ+iuv+mXrui2heaXticsXG4gICAgICBjb250ZW50OiAn54K55Ye76L+U5Zue6aaW6aG1JyxcbiAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgIHd4LnN3aXRjaFRhYih7XG4gICAgICAgICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgLyog6I635b6X5YWD57Sg5LiK55qE57uR5a6a55qE5YC8ICovXG5cbiAgZ2V0RGF0YVNldCAoZXZlbnQsIGtleSkge1xuICAgIHJldHVybiBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXRba2V5XVxuICB9XG4gIC8vIOS/ruaUueS4iuS4gOS4qumhtemdoueahOafkOS4queKtuaAgVxuICBzZXRQcmVQYWdlU3RhdGUoZGF0YSxjaGFuZ2VEYXRhKXtcbiAgICBsZXQgcHJldlBhZ2UgPSBnZXRDdXJyZW50UGFnZXMoKVtnZXRDdXJyZW50UGFnZXMoKS5sZW5ndGgtMl1cbiAgICBwcmV2UGFnZS5zZXREYXRhKHtcbiAgICAgIFtkYXRhXTogY2hhbmdlRGF0YVxuICAgIH0pXG4gIH1cbiAgLy8g5pe26Ze05oiz6L2s5oiQ5pel5pyf5qC85byPXG4gIGdldExvY2FsVGltZSh0aW1lc3RhbXAsaXNKU1RpbWUpIHsgXG4gICAgdmFyIGRhdGUgPSAnJ1xuICAgIHZhciBZID0gJydcbiAgICB2YXIgTSA9ICcnXG4gICAgdmFyIEQgPSAnJ1xuICAgIHZhciBoID0gJydcbiAgICB2YXIgbSA9ICcnXG4gICAgdmFyIHMgPSAnJ1xuICAgIGlmKGlzSlNUaW1lKXtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXApOy8v5pe26Ze05oiz5Li6MTDkvY3pnIAqMTAwMO+8jOaXtumXtOaIs+S4ujEz5L2N55qE6K+d5LiN6ZyA5LmYMTAwMFxuICAgICAgWSA9IGRhdGUuZ2V0RnVsbFllYXIoKSArICctJztcbiAgICAgIE0gPSAoZGF0ZS5nZXRNb250aCgpKzEgPCAxMCA/ICcwJysoZGF0ZS5nZXRNb250aCgpKzEpIDogZGF0ZS5nZXRNb250aCgpKzEpICsgJy0nO1xuICAgICAgRCA9IGRhdGUuZ2V0RGF0ZSgpICsgJyAnO1xuICAgICAgaCA9IGRhdGUuZ2V0SG91cnMoKSArICc6JztcbiAgICAgIG0gPSBkYXRlLmdldE1pbnV0ZXMoKSArICc6JztcbiAgICAgIHMgPSBkYXRlLmdldFNlY29uZHMoKTtcbiAgICB9ZWxzZXtcbiAgICAgIC8vIHJldHVybiBuZXcgRGF0ZShwYXJzZUludChuUykgKiAxMDAwKS50b0xvY2FsZVN0cmluZygpLnJlcGxhY2UoLzpcXGR7MSwyfSQvLCcgJylcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZSh0aW1lc3RhbXAgKiAxMDAwKTsvL+aXtumXtOaIs+S4ujEw5L2N6ZyAKjEwMDDvvIzml7bpl7TmiLPkuLoxM+S9jeeahOivneS4jemcgOS5mDEwMDBcbiAgICAgIFkgPSBkYXRlLmdldEZ1bGxZZWFyKCkgKyAnLSc7XG4gICAgICBNID0gKGRhdGUuZ2V0TW9udGgoKSsxIDwgMTAgPyAnMCcrKGRhdGUuZ2V0TW9udGgoKSsxKSA6IGRhdGUuZ2V0TW9udGgoKSsxKSArICctJztcbiAgICAgIEQgPSBkYXRlLmdldERhdGUoKSArICcgJztcbiAgICAgIGggPSBkYXRlLmdldEhvdXJzKCkgKyAnOic7XG4gICAgICBtID0gZGF0ZS5nZXRNaW51dGVzKCkgKyAnOic7XG4gICAgICBzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XG4gICAgfVxuICAgIGxldCB0aW1lTm93ID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpXG4gICAgaWYodGltZU5vdyA9PSBkYXRlLmdldEZ1bGxZZWFyKCkpe1xuICAgICAgcmV0dXJuIE0rRCtoK20rcztcbiAgICB9ZWxzZXtcbiAgICAgIHJldHVybiBZK00rRCtoK20rcztcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVxuIl19