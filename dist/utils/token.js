'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
  function Token() {
    _classCallCheck(this, Token);

    this.verifyUrl = _config2.default.resUrl + 'v1/token/verify_token';
    this.tokenUrl = _config2.default.resUrl + 'v1/token/get_token';
    this.shopConfig = {
      shopID: _config2.default.shopID
    };
  }
  /*
  *   验证token有没有过期
  * */


  _createClass(Token, [{
    key: 'verify',
    value: function verify() {
      var token = wx.getStorageSync('token');
      if (!token) {
        this.getTokenFromServer();
      } else {
        this._veirfyFromServer();
      }
    }
    /*
    *   验证token是否过期
    * */

  }, {
    key: '_veirfyFromServer',
    value: function _veirfyFromServer(token) {
      var that = this;
      wx.request({
        url: that.verifyUrl,
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': wx.getStorageSync('token')
        },
        success: function success(res) {
          if (!res.data) {
            that.getTokenFromServer();
          }
        }
      });
    }

    /*   
    *   用code去换取 token
    * */

  }, {
    key: 'getTokenFromServer',
    value: function getTokenFromServer(callBack) {
      var that = this;
      wx.login({
        success: function success(res) {
          wx.request({
            url: that.tokenUrl,
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              code: res.code,
              shopID: that.shopConfig.shopID,
              versions: 'vip5'
            },
            success: function success(res) {
              if (Number(res.data.code) === 10) {
                that.goNot();
                return false;
              }
              wx.setStorageSync('token', res.data.token);
              callBack && callBack(res.data.token);
            }
          });
        }
      });
    }
  }, {
    key: 'goNot',
    value: function goNot() {
      // wx.reLaunch({
      //   url: '/pages/404/index'
      // })
    }
  }]);

  return Token;
}();

var TokenModel = new Token();
exports.default = TokenModel;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuLmpzIl0sIm5hbWVzIjpbIlRva2VuIiwidmVyaWZ5VXJsIiwiQ29uZmlnIiwicmVzVXJsIiwidG9rZW5VcmwiLCJzaG9wQ29uZmlnIiwic2hvcElEIiwidG9rZW4iLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0VG9rZW5Gcm9tU2VydmVyIiwiX3ZlaXJmeUZyb21TZXJ2ZXIiLCJ0aGF0IiwicmVxdWVzdCIsInVybCIsIm1ldGhvZCIsImhlYWRlciIsInN1Y2Nlc3MiLCJyZXMiLCJkYXRhIiwiY2FsbEJhY2siLCJsb2dpbiIsImNvZGUiLCJ2ZXJzaW9ucyIsIk51bWJlciIsImdvTm90Iiwic2V0U3RvcmFnZVN5bmMiLCJUb2tlbk1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUNNQSxLO0FBQ0osbUJBQWM7QUFBQTs7QUFDWixTQUFLQyxTQUFMLEdBQWlCQyxpQkFBT0MsTUFBUCxHQUFjLHVCQUEvQjtBQUNBLFNBQUtDLFFBQUwsR0FBaUJGLGlCQUFPQyxNQUFQLEdBQWMsb0JBQS9CO0FBQ0EsU0FBS0UsVUFBTCxHQUFrQjtBQUNoQkMsY0FBU0osaUJBQU9JO0FBREEsS0FBbEI7QUFHRDtBQUNEOzs7Ozs7OzZCQUdTO0FBQ1AsVUFBSUMsUUFBUUMsR0FBR0MsY0FBSCxDQUFrQixPQUFsQixDQUFaO0FBQ0EsVUFBSSxDQUFDRixLQUFMLEVBQVk7QUFDVixhQUFLRyxrQkFBTDtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUtDLGlCQUFMO0FBQ0Q7QUFDRjtBQUNEOzs7Ozs7c0NBR2tCSixLLEVBQU87QUFDdkIsVUFBSUssT0FBTyxJQUFYO0FBQ0FKLFNBQUdLLE9BQUgsQ0FBVztBQUNUQyxhQUFLRixLQUFLWCxTQUREO0FBRVRjLGdCQUFRLE1BRkM7QUFHVEMsZ0JBQVE7QUFDTiwwQkFBZ0IsbUNBRFY7QUFFTixtQkFBVVIsR0FBR0MsY0FBSCxDQUFrQixPQUFsQjtBQUZKLFNBSEM7QUFPVFEsaUJBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixjQUFJLENBQUNBLElBQUlDLElBQVQsRUFBZTtBQUNiUCxpQkFBS0Ysa0JBQUw7QUFDRDtBQUNGO0FBWFEsT0FBWDtBQWFEOztBQUVEOzs7Ozs7dUNBR21CVSxRLEVBQVU7QUFDM0IsVUFBSVIsT0FBTyxJQUFYO0FBQ0FKLFNBQUdhLEtBQUgsQ0FBUztBQUNQSixpQkFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCVixhQUFHSyxPQUFILENBQVc7QUFDVEMsaUJBQUtGLEtBQUtSLFFBREQ7QUFFVFcsb0JBQVEsTUFGQztBQUdUQyxvQkFBUTtBQUNOLDhCQUFnQjtBQURWLGFBSEM7QUFNVEcsa0JBQU07QUFDSkcsb0JBQU1KLElBQUlJLElBRE47QUFFSmhCLHNCQUFRTSxLQUFLUCxVQUFMLENBQWdCQyxNQUZwQjtBQUdKaUIsd0JBQVU7QUFITixhQU5HO0FBV1ROLHFCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckIsa0JBQUlNLE9BQU9OLElBQUlDLElBQUosQ0FBU0csSUFBaEIsTUFBMEIsRUFBOUIsRUFBa0M7QUFDaENWLHFCQUFLYSxLQUFMO0FBQ0EsdUJBQU8sS0FBUDtBQUNEO0FBQ0RqQixpQkFBR2tCLGNBQUgsQ0FBa0IsT0FBbEIsRUFBMkJSLElBQUlDLElBQUosQ0FBU1osS0FBcEM7QUFDQWEsMEJBQVlBLFNBQVNGLElBQUlDLElBQUosQ0FBU1osS0FBbEIsQ0FBWjtBQUNEO0FBbEJRLFdBQVg7QUFvQkQ7QUF0Qk0sT0FBVDtBQXdCRDs7OzRCQUNPO0FBQ047QUFDQTtBQUNBO0FBQ0Q7Ozs7OztBQUVILElBQU1vQixhQUFhLElBQUkzQixLQUFKLEVBQW5CO2tCQUNlMkIsVSIsImZpbGUiOiJ0b2tlbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25maWcgZnJvbSAnLi9jb25maWcuanMnXG5jbGFzcyBUb2tlbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudmVyaWZ5VXJsID0gQ29uZmlnLnJlc1VybCsndjEvdG9rZW4vdmVyaWZ5X3Rva2VuJ1xuICAgIHRoaXMudG9rZW5VcmwgPSAgQ29uZmlnLnJlc1VybCsndjEvdG9rZW4vZ2V0X3Rva2VuJ1xuICAgIHRoaXMuc2hvcENvbmZpZyA9IHtcbiAgICAgIHNob3BJRCA6IENvbmZpZy5zaG9wSURcbiAgICB9XG4gIH1cbiAgLypcbiAgKiAgIOmqjOivgXRva2Vu5pyJ5rKh5pyJ6L+H5pyfXG4gICogKi9cbiAgdmVyaWZ5KCkge1xuICAgIGxldCB0b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdGhpcy5nZXRUb2tlbkZyb21TZXJ2ZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl92ZWlyZnlGcm9tU2VydmVyKClcbiAgICB9XG4gIH1cbiAgLypcbiAgKiAgIOmqjOivgXRva2Vu5piv5ZCm6L+H5pyfXG4gICogKi9cbiAgX3ZlaXJmeUZyb21TZXJ2ZXIodG9rZW4pIHtcbiAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIHVybDogdGhhdC52ZXJpZnlVcmwsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcjoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICAgICAgICd0b2tlbic6ICB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxuICAgICAgfSxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKCFyZXMuZGF0YSkge1xuICAgICAgICAgIHRoYXQuZ2V0VG9rZW5Gcm9tU2VydmVyKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgXG4gIC8qICAgXG4gICogICDnlKhjb2Rl5Y675o2i5Y+WIHRva2VuXG4gICogKi9cbiAgZ2V0VG9rZW5Gcm9tU2VydmVyKGNhbGxCYWNrKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHd4LmxvZ2luKHtcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiB0aGF0LnRva2VuVXJsLFxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBjb2RlOiByZXMuY29kZSxcbiAgICAgICAgICAgIHNob3BJRDogdGhhdC5zaG9wQ29uZmlnLnNob3BJRCxcbiAgICAgICAgICAgIHZlcnNpb25zOiAndmlwNSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgaWYgKE51bWJlcihyZXMuZGF0YS5jb2RlKSA9PT0gMTApIHtcbiAgICAgICAgICAgICAgdGhhdC5nb05vdCgpXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgcmVzLmRhdGEudG9rZW4pXG4gICAgICAgICAgICBjYWxsQmFjayAmJiBjYWxsQmFjayhyZXMuZGF0YS50b2tlbilcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBnb05vdCgpIHtcbiAgICAvLyB3eC5yZUxhdW5jaCh7XG4gICAgLy8gICB1cmw6ICcvcGFnZXMvNDA0L2luZGV4J1xuICAgIC8vIH0pXG4gIH1cbn1cbmNvbnN0IFRva2VuTW9kZWwgPSBuZXcgVG9rZW4oKVxuZXhwb3J0IGRlZmF1bHQgVG9rZW5Nb2RlbFxuIl19