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

var commonMT = function (_Base) {
  _inherits(commonMT, _Base);

  function commonMT() {
    _classCallCheck(this, commonMT);

    return _possibleConstructorReturn(this, (commonMT.__proto__ || Object.getPrototypeOf(commonMT)).call(this));
  }
  //打电话


  _createClass(commonMT, [{
    key: 'makePhoneCall',
    value: function makePhoneCall(phoneNumber) {
      if (phoneNumber) {
        wx.makePhoneCall({
          phoneNumber: phoneNumber
        });
      } else {
        wx.showToast({
          title: '未设置电话号码',
          icon: 'none',
          duration: 1500
        });
      }
    }
    //打开地图

  }, {
    key: 'openMap',
    value: function openMap(longitude, name, address) {
      if (longitude && longitude.split(",").length == 2) {
        var arr = longitude.split(",");
        var lat = arr[0];
        var lng = arr[1];
        wx.openLocation({
          latitude: Number(lat),
          longitude: Number(lng),
          scale: 18,
          name: name,
          address: address
        });
      } else {
        wx.showToast({
          title: '未设置地理坐标',
          icon: 'none',
          duration: 1500
        });
      }
    }
    //验证手机号格式

  }, {
    key: 'verifyPhoneNumber',
    value: function verifyPhoneNumber(phoneNumber) {
      if (Number(phoneNumber.length) === 0) {
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return false;
      }
      if (Number(phoneNumber.length) <= 10) {
        wx.showToast({
          title: '手机长度不足',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return false;
      }
      if (!/^1[123456789]\d{9}$/.test(phoneNumber)) {
        wx.showToast({
          title: '手机格式错误',
          icon: 'none',
          duration: 1000,
          mask: true
        });
        return false;
      }
      return true;
    }
    // 判断是否为数字

  }, {
    key: 'isRealNum',
    value: function isRealNum(val) {
      // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除  
      if (val === "" || val == null) {
        return false;
      }
      if (!isNaN(val)) {
        return true;
      } else {
        return false;
      }
    }
    // 路径参数转换

  }, {
    key: '_encode',
    value: function _encode(json) {
      if (!json) {
        return '';
      }
      var tmps = [];
      for (var key in json) {
        tmps.push(key + '=' + json[key]);
      }
      return '?' + tmps.join('&');
    }
    //弹出提示信息

  }, {
    key: 'showTips',
    value: function showTips(tips) {
      wx.showToast({
        title: tips,
        icon: 'none',
        duration: 1500
      });
    }
    // 设置导航栏标题

  }, {
    key: 'setNavTitle',
    value: function setNavTitle(title) {
      wx.setNavigationBarTitle({
        title: title
      });
    }
    //获取用户信息并更新

  }, {
    key: 'getUser',
    value: function getUser(res, sCallBack, fCallBack) {
      var userInfo = res.detail.userInfo;
      if (userInfo) {
        //用户点了确定授权或者已经授权
        var value = wx.getStorageSync('userInfo');
        if (value) {
          sCallBack && sCallBack();
          return false;
        } else {
          var postdata = {
            wechat_name: userInfo.nickName,
            area: userInfo.country + userInfo.province + userInfo.city,
            portrait: userInfo.avatarUrl,
            encryptedData: res.detail.encryptedData,
            iv: res.detail.iv,
            versions: "vip5"
          };
          this._postUserInfo(postdata, function () {
            sCallBack && sCallBack();
            wx.setStorageSync('userInfo', userInfo);
          });
        }
      } else {
        wx.showToast({
          title: '需要您的授权才能继续使用哦~',
          icon: 'none',
          duration: 3000
        });
        fCallBack && fCallBack();
      }
    }
    // 更新用户数据到后端

  }, {
    key: '_postUserInfo',
    value: function _postUserInfo(postdata, callback) {
      var param = {
        url: 'v1/token/update_wechat_info',
        type: 'post',
        data: postdata,
        sCallback: function sCallback(ResData) {
          callback && callback(ResData);
        }
      };
      this.request(param);
    }
    //获取地理位置

  }, {
    key: 'getGeoAndUserInfo',
    value: function getGeoAndUserInfo(sCallBack) {
      var _this2 = this;

      this._getLocation(function (ResData) {
        wx.setStorageSync('GeographyData', ResData);
        sCallBack && sCallBack(ResData);
      }, function (ResData) {
        _this2.showTips('无法获取您的位置信息');
        sCallBack && sCallBack(ResData);
      });
    }
  }, {
    key: '_getLocation',
    value: function _getLocation(_success, _fail) {
      wx.getLocation({
        type: 'wgs84',
        success: function success(res) {
          _success && _success(res);
        },

        fail: function fail(res) {
          _fail && _fail();
        }
      });
    }
  }]);

  return commonMT;
}(_base2.default);

var api = new commonMT();
exports.default = api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbk1ULmpzIl0sIm5hbWVzIjpbImNvbW1vbk1UIiwicGhvbmVOdW1iZXIiLCJ3eCIsIm1ha2VQaG9uZUNhbGwiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImxvbmdpdHVkZSIsIm5hbWUiLCJhZGRyZXNzIiwic3BsaXQiLCJsZW5ndGgiLCJhcnIiLCJsYXQiLCJsbmciLCJvcGVuTG9jYXRpb24iLCJsYXRpdHVkZSIsIk51bWJlciIsInNjYWxlIiwibWFzayIsInRlc3QiLCJ2YWwiLCJpc05hTiIsImpzb24iLCJ0bXBzIiwia2V5IiwicHVzaCIsImpvaW4iLCJ0aXBzIiwic2V0TmF2aWdhdGlvbkJhclRpdGxlIiwicmVzIiwic0NhbGxCYWNrIiwiZkNhbGxCYWNrIiwidXNlckluZm8iLCJkZXRhaWwiLCJ2YWx1ZSIsImdldFN0b3JhZ2VTeW5jIiwicG9zdGRhdGEiLCJ3ZWNoYXRfbmFtZSIsIm5pY2tOYW1lIiwiYXJlYSIsImNvdW50cnkiLCJwcm92aW5jZSIsImNpdHkiLCJwb3J0cmFpdCIsImF2YXRhclVybCIsImVuY3J5cHRlZERhdGEiLCJpdiIsInZlcnNpb25zIiwiX3Bvc3RVc2VySW5mbyIsInNldFN0b3JhZ2VTeW5jIiwiY2FsbGJhY2siLCJwYXJhbSIsInVybCIsInR5cGUiLCJkYXRhIiwic0NhbGxiYWNrIiwiUmVzRGF0YSIsInJlcXVlc3QiLCJfZ2V0TG9jYXRpb24iLCJzaG93VGlwcyIsInN1Y2Nlc3MiLCJmYWlsIiwiZ2V0TG9jYXRpb24iLCJCYXNlIiwiYXBpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFDTUEsUTs7O0FBQ0osc0JBQWM7QUFBQTs7QUFBQTtBQUViO0FBQ0Q7Ozs7O2tDQUNjQyxXLEVBQVk7QUFDeEIsVUFBR0EsV0FBSCxFQUFlO0FBQ2JDLFdBQUdDLGFBQUgsQ0FBaUI7QUFDZkYsdUJBQWFBO0FBREUsU0FBakI7QUFHRCxPQUpELE1BSU87QUFDTEMsV0FBR0Us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Q0ExQixxQkFBYUEsVUFBVTBCLE9BQVYsQ0FBYjtBQUNELE9BSEQsRUFHRSxVQUFDQSxPQUFELEVBQVc7QUFDWCxlQUFLRyxRQUFMLENBQWMsWUFBZDtBQUNBN0IscUJBQWFBLFVBQVUwQixPQUFWLENBQWI7QUFDRCxPQU5EO0FBT0Q7OztpQ0FDWUksUSxFQUFTQyxLLEVBQUs7QUFDekI3RCxTQUFHOEQsV0FBSCxDQUFlO0FBQ2JULGNBQU0sT0FETztBQUViTyxlQUZhLG1CQUVML0IsR0FGSyxFQUVEO0FBQ1YrQixzQkFBV0EsU0FBUS9CLEdBQVIsQ0FBWDtBQUNELFNBSlk7O0FBS2JnQyxjQUFNLGNBQVVoQyxHQUFWLEVBQWM7QUFDbEJnQyxtQkFBUUEsT0FBUjtBQUNEO0FBUFksT0FBZjtBQVNEOzs7O0VBMUtvQkUsYzs7QUE0S3ZCLElBQU1DLE1BQU0sSUFBSWxFLFFBQUosRUFBWjtrQkFDZWtFLEciLCJmaWxlIjoiY29tbW9uTVQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tICcuL2Jhc2UuanMnXHJcbmNsYXNzIGNvbW1vbk1UIGV4dGVuZHMgQmFzZSB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpXHJcbiAgfVxyXG4gIC8v5omT55S16K+dXHJcbiAgbWFrZVBob25lQ2FsbChwaG9uZU51bWJlcil7XHJcbiAgICBpZihwaG9uZU51bWJlcil7XHJcbiAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xyXG4gICAgICAgIHBob25lTnVtYmVyOiBwaG9uZU51bWJlclxyXG4gICAgICB9KVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+acquiuvue9rueUteivneWPt+eggScsXHJcbiAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8v5omT5byA5Zyw5Zu+XHJcbiAgb3Blbk1hcChsb25naXR1ZGUsbmFtZSxhZGRyZXNzKXtcclxuICAgIGlmKGxvbmdpdHVkZSAmJiBsb25naXR1ZGUuc3BsaXQoXCIsXCIpLmxlbmd0aCA9PSAyKXtcclxuICAgICAgbGV0IGFyciA9IGxvbmdpdHVkZS5zcGxpdChcIixcIilcclxuICAgICAgbGV0IGxhdCA9IGFyclswXVxyXG4gICAgICBsZXQgbG5nID0gYXJyWzFdXHJcbiAgICAgIHd4Lm9wZW5Mb2NhdGlvbih7XHJcbiAgICAgICAgbGF0aXR1ZGU6IE51bWJlcihsYXQpLFxyXG4gICAgICAgIGxvbmdpdHVkZTogTnVtYmVyKGxuZyksXHJcbiAgICAgICAgc2NhbGU6IDE4LFxyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgYWRkcmVzczphZGRyZXNzXHJcbiAgICAgIH0pXHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6ICfmnKrorr7nva7lnLDnkIblnZDmoIcnLFxyXG4gICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICBkdXJhdGlvbjogMTUwMFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuICAvL+mqjOivgeaJi+acuuWPt+agvOW8j1xyXG4gIHZlcmlmeVBob25lTnVtYmVyKHBob25lTnVtYmVyKXtcclxuICAgIGlmKE51bWJlcihwaG9uZU51bWJlci5sZW5ndGgpID09PSAwKXtcclxuICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICB0aXRsZTogJ+ivt+i+k+WFpeaJi+acuuWPt+eggScsXHJcbiAgICAgICAgaWNvbjonbm9uZScsXHJcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXHJcbiAgICAgICAgbWFzazogdHJ1ZSxcclxuICAgICAgfSlcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBpZihOdW1iZXIocGhvbmVOdW1iZXIubGVuZ3RoKSA8PSAxMCl7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6ICfmiYvmnLrplb/luqbkuI3otrMnLFxyXG4gICAgICAgIGljb246J25vbmUnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgaWYoISgvXjFbMTIzNDU2Nzg5XVxcZHs5fSQvLnRlc3QocGhvbmVOdW1iZXIpKSl7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6ICfmiYvmnLrmoLzlvI/plJnor68nLFxyXG4gICAgICAgIGljb246J25vbmUnLFxyXG4gICAgICAgIGR1cmF0aW9uOiAxMDAwLFxyXG4gICAgICAgIG1hc2s6IHRydWUsXHJcbiAgICAgIH0pXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbiAgfVxyXG4gIC8vIOWIpOaWreaYr+WQpuS4uuaVsOWtl1xyXG4gIGlzUmVhbE51bSh2YWwpeyAgXHJcbiAgICAvLyBpc05hTigp5Ye95pWwIOaKiuepuuS4siDnqbrmoLwg5Lul5Y+KTlVsbCDmjInnhacw5p2l5aSE55CGIOaJgOS7peWFiOWOu+mZpCAgXHJcbiAgICBpZih2YWwgPT09IFwiXCIgfHwgdmFsID09bnVsbCl7ICBcclxuICAgICAgICByZXR1cm4gZmFsc2U7ICBcclxuICAgIH0gIFxyXG4gICAgaWYoIWlzTmFOKHZhbCkpeyAgXHJcbiAgICAgICAgcmV0dXJuIHRydWU7ICBcclxuICAgIH1lbHNleyAgXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlOyAgXHJcbiAgICB9ICBcclxuICB9ICAgXHJcbiAgLy8g6Lev5b6E5Y+C5pWw6L2s5o2iXHJcbiAgX2VuY29kZShqc29uKXtcclxuICAgIGlmICghanNvbikgeyAgXHJcbiAgICAgICAgcmV0dXJuICcnOyAgXHJcbiAgICB9ICBcclxuICAgIHZhciB0bXBzID0gW107ICBcclxuICAgIGZvciAodmFyIGtleSBpbiBqc29uKSB7ICBcclxuICAgICAgICB0bXBzLnB1c2goa2V5ICsgJz0nICsganNvbltrZXldKTsgIFxyXG4gICAgfSBcclxuICAgIHJldHVybiAnPycgKyB0bXBzLmpvaW4oJyYnKTtcclxuICB9XHJcbiAgLy/lvLnlh7rmj5DnpLrkv6Hmga9cclxuICBzaG93VGlwcyh0aXBzKXtcclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgIHRpdGxlOiB0aXBzLFxyXG4gICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgIGR1cmF0aW9uOiAxNTAwXHJcbiAgICB9KVxyXG4gIH1cclxuICAvLyDorr7nva7lr7zoiKrmoI/moIfpophcclxuICBzZXROYXZUaXRsZSh0aXRsZSl7XHJcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoe1xyXG4gICAgICB0aXRsZTogdGl0bGVcclxuICAgIH0pXHJcbiAgfVxyXG4gIC8v6I635Y+W55So5oi35L+h5oGv5bm25pu05pawXHJcbiAgZ2V0VXNlcihyZXMsc0NhbGxCYWNrLGZDYWxsQmFjayl7XHJcbiAgICBsZXQgdXNlckluZm8gPSByZXMuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICBpZih1c2VySW5mbyl7ICAvL+eUqOaIt+eCueS6huehruWumuaOiOadg+aIluiAheW3sue7j+aOiOadg1xyXG4gICAgICBsZXQgdmFsdWUgPSB3eC5nZXRTdG9yYWdlU3luYygndXNlckluZm8nKVxyXG4gICAgICBpZih2YWx1ZSl7XHJcbiAgICAgICAgc0NhbGxCYWNrICYmIHNDYWxsQmFjaygpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGV0IHBvc3RkYXRhID0ge1xyXG4gICAgICAgICAgd2VjaGF0X25hbWU6IHVzZXJJbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgYXJlYTogdXNlckluZm8uY291bnRyeSArIHVzZXJJbmZvLnByb3ZpbmNlICsgdXNlckluZm8uY2l0eSxcclxuICAgICAgICAgIHBvcnRyYWl0OiB1c2VySW5mby5hdmF0YXJVcmwsXHJcbiAgICAgICAgICBlbmNyeXB0ZWREYXRhOnJlcy5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcclxuICAgICAgICAgIGl2OnJlcy5kZXRhaWwuaXYsXHJcbiAgICAgICAgICB2ZXJzaW9uczogXCJ2aXA1XCIsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3Bvc3RVc2VySW5mbyhwb3N0ZGF0YSwoKT0+e1xyXG4gICAgICAgICAgc0NhbGxCYWNrICYmIHNDYWxsQmFjaygpXHJcbiAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndXNlckluZm8nLCB1c2VySW5mbylcclxuICAgICAgICB9KVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2V7XHJcbiAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6ICfpnIDopoHmgqjnmoTmjojmnYPmiY3og73nu6fnu63kvb/nlKjlk6Z+JyxcclxuICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgZHVyYXRpb246IDMwMDBcclxuICAgICAgfSlcclxuICAgICAgZkNhbGxCYWNrICYmIGZDYWxsQmFjaygpXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8vIOabtOaWsOeUqOaIt+aVsOaNruWIsOWQjuerr1xyXG4gIF9wb3N0VXNlckluZm8ocG9zdGRhdGEsIGNhbGxiYWNrKSB7XHJcbiAgICBsZXQgcGFyYW0gPSB7XHJcbiAgICAgIHVybDogJ3YxL3Rva2VuL3VwZGF0ZV93ZWNoYXRfaW5mbycsXHJcbiAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgZGF0YTogcG9zdGRhdGEsXHJcbiAgICAgIHNDYWxsYmFjayhSZXNEYXRhKXtcclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhSZXNEYXRhKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlcXVlc3QocGFyYW0pXHJcbiAgfVxyXG4gIC8v6I635Y+W5Zyw55CG5L2N572uXHJcbiAgZ2V0R2VvQW5kVXNlckluZm8oc0NhbGxCYWNrKXtcclxuICAgIHRoaXMuX2dldExvY2F0aW9uKChSZXNEYXRhKT0+e1xyXG4gICAgICB3eC5zZXRTdG9yYWdlU3luYygnR2VvZ3JhcGh5RGF0YScsIFJlc0RhdGEpXHJcbiAgICAgIHNDYWxsQmFjayAmJiBzQ2FsbEJhY2soUmVzRGF0YSlcclxuICAgIH0sKFJlc0RhdGEpPT57XHJcbiAgICAgIHRoaXMuc2hvd1RpcHMoJ+aXoOazleiOt+WPluaCqOeahOS9jee9ruS/oeaBrycpXHJcbiAgICAgIHNDYWxsQmFjayAmJiBzQ2FsbEJhY2soUmVzRGF0YSlcclxuICAgIH0pXHJcbiAgfVxyXG4gIF9nZXRMb2NhdGlvbihzdWNjZXNzLCBmYWlsKXtcclxuICAgIHd4LmdldExvY2F0aW9uKHtcclxuICAgICAgdHlwZTogJ3dnczg0JyxcclxuICAgICAgc3VjY2VzcyhyZXMpe1xyXG4gICAgICAgIHN1Y2Nlc3MgJiYgc3VjY2VzcyhyZXMpXHJcbiAgICAgIH0sXHJcbiAgICAgIGZhaWw6IGZ1bmN0aW9uIChyZXMpe1xyXG4gICAgICAgIGZhaWwgJiYgZmFpbCgpXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcbmNvbnN0IGFwaSA9IG5ldyBjb21tb25NVCgpXHJcbmV4cG9ydCBkZWZhdWx0IGFwaSJdfQ==