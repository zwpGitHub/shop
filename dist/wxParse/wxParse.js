'use strict';

var _showdown = require('./showdown.js');

var _showdown2 = _interopRequireDefault(_showdown);

var _html2json = require('./html2json.js');

var _html2json2 = _interopRequireDefault(_html2json);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
} /**
   * author: Di (微信小程序开发工程师)
   * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
   *               垂直微信小程序开发交流社区
   *
   * github地址: https://github.com/icindy/wxParse
   *
   * for: 微信小程序富文本解析
   * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
   */

/**
 * utils函数引入
 **/

/**
 * 配置及公有属性
 **/
var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
  success: function success(res) {
    realWindowWidth = res.windowWidth;
    realWindowHeight = res.windowHeight;
  }
});
/**
 * 主函数入口区
 **/
function wxParse() {
  var bindName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'wxParseData';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'html';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '<div class="color:red;">数据不能为空</div>';
  var target = arguments[3];
  var imagePadding = arguments[4];

  var that = target;
  var transData = {}; //存放转化后的数据
  if (type == 'html') {
    transData = _html2json2.default.html2json(data, bindName);
  } else if (type == 'md' || type == 'markdown') {
    var converter = new _showdown2.default.Converter();
    var html = converter.makeHtml(data);
    transData = _html2json2.default.html2json(html, bindName);
  }
  transData.view = {};
  transData.view.imagePadding = 0;
  if (typeof imagePadding != 'undefined') {
    transData.view.imagePadding = imagePadding;
  }
  var bindData = {};
  bindData[bindName] = transData;
  that.setData(bindData);
  that.wxParseImgLoad = wxParseImgLoad;
  that.wxParseImgTap = wxParseImgTap;
}
// 图片点击事件
function wxParseImgTap(e) {
  var that = this;
  var nowImgUrl = e.target.dataset.src;
  var tagFrom = e.target.dataset.from;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    wx.previewImage({
      current: nowImgUrl, // 当前显示图片的http链接
      urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
    });
  }
}

/**
 * 图片视觉宽高计算函数区
 **/
function wxParseImgLoad(e) {
  var that = this;
  var tagFrom = e.target.dataset.from;
  var idx = e.target.dataset.idx;
  if (typeof tagFrom != 'undefined' && tagFrom.length > 0) {
    calMoreImageInfo(e, idx, that, tagFrom);
  }
}
// 假循环获取计算图片视觉最佳宽高
function calMoreImageInfo(e, idx, that, bindName) {
  var _that$setData;

  var temData = that.data[bindName];
  if (!temData || temData.images.length == 0) {
    return;
  }
  var temImages = temData.images;
  //因为无法获取view宽度 需要自定义padding进行计算，稍后处理
  var recal = wxAutoImageCal(e.detail.width, e.detail.height, that, bindName);
  // temImages[idx].width = recal.imageWidth;
  // temImages[idx].height = recal.imageheight;
  // temData.images = temImages;
  // var bindData = {};
  // bindData[bindName] = temData;
  // that.setData(bindData);
  var index = temImages[idx].index;
  var key = '' + bindName;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = index.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;
      key += '.nodes[' + i + ']';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var keyW = key + '.width';
  var keyH = key + '.height';
  that.setData((_that$setData = {}, _defineProperty(_that$setData, keyW, recal.imageWidth), _defineProperty(_that$setData, keyH, recal.imageheight), _that$setData));
}

// 计算视觉优先的图片宽高
function wxAutoImageCal(originalWidth, originalHeight, that, bindName) {
  //获取图片的原始长宽
  var windowWidth = 0,
      windowHeight = 0;
  var autoWidth = 0,
      autoHeight = 0;
  var results = {};
  var padding = that.data[bindName].view.imagePadding;
  windowWidth = realWindowWidth - 2 * padding;
  windowHeight = realWindowHeight;
  //判断按照那种方式进行缩放
  // console.log("windowWidth" + windowWidth);
  if (originalWidth > windowWidth) {
    //在图片width大于手机屏幕width时候
    autoWidth = windowWidth;
    // console.log("autoWidth" + autoWidth);
    autoHeight = autoWidth * originalHeight / originalWidth;
    // console.log("autoHeight" + autoHeight);
    results.imageWidth = autoWidth;
    results.imageheight = autoHeight;
  } else {
    //否则展示原来的数据
    results.imageWidth = originalWidth;
    results.imageheight = originalHeight;
  }
  return results;
}

function wxParseTemArray(temArrayName, bindNameReg, total, that) {
  var array = [];
  var temData = that.data;
  var obj = null;
  for (var i = 0; i < total; i++) {
    var simArr = temData[bindNameReg + i].nodes;
    array.push(simArr);
  }

  temArrayName = temArrayName || 'wxParseTemArray';
  obj = JSON.parse('{"' + temArrayName + '":""}');
  obj[temArrayName] = array;
  that.setData(obj);
}

/**
 * 配置emojis
 *
 */

function emojisInit() {
  var reg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var baseSrc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/wxParse/emojis/";
  var emojis = arguments[2];

  _html2json2.default.emojisInit(reg, baseSrc, emojis);
}

module.exports = {
  wxParse: wxParse,
  wxParseTemArray: wxParseTemArray,
  emojisInit: emojisInit
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4UGFyc2UuanMiXSwibmFtZXMiOlsicmVhbFdpbmRvd1dpZHRoIiwicmVhbFdpbmRvd0hlaWdodCIsInd4Iiwic3VjY2VzcyIsInJlcyIsImJpbmROYW1lIiwidHlwZSIsImRhdGEiLCJ0YXJnZXQiLCJpbWFnZVBhZGRpbmciLCJ0aGF0IiwidHJhbnNEYXRhIiwiY29udmVydGVyIiwiaHRtbCIsImJpbmREYXRhIiwibm93SW1nVXJsIiwiZSIsInRhZ0Zyb20iLCJjdXJyZW50IiwidXJscyIsImlkeCIsImNhbE1vcmVJbWFnZUluZm8iLCJ0ZW1EYXRhIiwidGVtSW1hZ2VzIiwicmVjYWwiLCJ3eEF1dG9JbWFnZUNhbCIsImluZGV4Iiwia2V5Iiwia2V5VyIsImtleUgiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd0hlaWdodCIsImF1dG9XaWR0aCIsImF1dG9IZWlnaHQiLCJyZXN1bHRzIiwicGFkZGluZyIsIm9yaWdpbmFsV2lkdGgiLCJhcnJheSIsIm9iaiIsImkiLCJzaW1BcnIiLCJiaW5kTmFtZVJlZyIsInRlbUFycmF5TmFtZSIsIkpTT04iLCJyZWciLCJiYXNlU3JjIiwiZW1vamlzIiwibW9kdWxlIiwid3hQYXJzZSIsInd4UGFyc2VUZW1BcnJheSIsImVtb2ppc0luaXQiXSwibWFwcGluZ3MiOiI7O0FBY0EsSUFBQSxZQUFBLFFBQUEsZUFBQSxDQUFBOzs7O0FBQ0EsSUFBQSxhQUFBLFFBQUEsZ0JBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7RUFmQTs7Ozs7Ozs7Ozs7QUFXQTs7OztBQUtBOzs7QUFHQSxJQUFJQSxrQkFBSixDQUFBO0FBQ0EsSUFBSUMsbUJBQUosQ0FBQTtBQUNBQyxHQUFBQSxhQUFBQSxDQUFpQjtBQUNmQyxXQUFTLFNBQUEsT0FBQSxDQUFBLEdBQUEsRUFBZTtBQUN0Qkgsc0JBQWtCSSxJQUFsQkosV0FBQUE7QUFDQUMsdUJBQW1CRyxJQUFuQkgsWUFBQUE7QUFDRDtBQUpjLENBQWpCQztBQU1BOzs7QUFHQSxTQUFBLE9BQUEsR0FBMEg7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RUFBOEI7QUFDNUIsUUFBSUMsU0FBU2xCLFFBQVFtQixjQUFSbkIsQ0FBQUEsRUFBYixLQUFBO0FBQ0FlLFVBQUFBLElBQUFBLENBQUFBLE1BQUFBO0FBQ0Q7O0FBRURLLGlCQUFlQSxnQkFBZkEsaUJBQUFBO0FBQ0FKLFFBQU1LLEtBQUFBLEtBQUFBLENBQVcsT0FBQSxZQUFBLEdBQWpCTCxPQUFNSyxDQUFOTDtBQUNBQSxNQUFBQSxZQUFBQSxJQUFBQSxLQUFBQTtBQUNBNUIsT0FBQUEsT0FBQUEsQ0FBQUEsR0FBQUE7QUFDRDs7QUFFRDs7Ozs7QUFLQSxTQUFBLFVBQUEsR0FBNkQ7QUFBQSxNQUF6Q2tDLE1BQXlDLFVBQUEsTUFBQSxHQUFBLENBQUEsSUFBQSxVQUFBLENBQUEsTUFBQSxTQUFBLEdBQUEsVUFBQSxDQUFBLENBQUEsR0FBckMsRUFBcUM7QUFBQSxNQUFsQ0MsVUFBa0MsVUFBQSxNQUFBLEdBQUEsQ0FBQSxJQUFBLFVBQUEsQ0FBQSxNQUFBLFNBQUEsR0FBQSxVQUFBLENBQUEsQ0FBQSxHQUExQixrQkFBMEI7QUFBQSxNQUFQQyxTQUFPLFVBQUEsQ0FBQSxDQUFBOztBQUMxRCxjQUFBLE9BQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBO0FBQ0Y7O0FBRURDLE9BQUFBLE9BQUFBLEdBQWlCO0FBQ2ZDLFdBRGUsT0FBQTtBQUVmQyxtQkFGZSxlQUFBO0FBR2ZDLGNBQVdBO0FBSEksQ0FBakJIIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBhdXRob3I6IERpICjlvq7kv6HlsI/nqIvluo/lvIDlj5Hlt6XnqIvluIgpXG4gKiBvcmdhbml6YXRpb246IFdlQXBwRGV2KOW+ruS/oeWwj+eoi+W6j+W8gOWPkeiuuuWdmykoaHR0cDovL3dlYXBwZGV2LmNvbSlcbiAqICAgICAgICAgICAgICAg5Z6C55u05b6u5L+h5bCP56iL5bqP5byA5Y+R5Lqk5rWB56S+5Yy6XG4gKlxuICogZ2l0aHVi5Zyw5Z2AOiBodHRwczovL2dpdGh1Yi5jb20vaWNpbmR5L3d4UGFyc2VcbiAqXG4gKiBmb3I6IOW+ruS/oeWwj+eoi+W6j+WvjOaWh+acrOino+aekFxuICogZGV0YWlsIDogaHR0cDovL3dlYXBwZGV2LmNvbS90L3d4cGFyc2UtYWxwaGEwLTEtaHRtbC1tYXJrZG93bi8xODRcbiAqL1xuXG4vKipcbiAqIHV0aWxz5Ye95pWw5byV5YWlXG4gKiovXG5pbXBvcnQgc2hvd2Rvd24gZnJvbSAnLi9zaG93ZG93bi5qcyc7XG5pbXBvcnQgSHRtbFRvSnNvbiBmcm9tICcuL2h0bWwyanNvbi5qcyc7XG4vKipcbiAqIOmFjee9ruWPiuWFrOacieWxnuaAp1xuICoqL1xudmFyIHJlYWxXaW5kb3dXaWR0aCA9IDA7XG52YXIgcmVhbFdpbmRvd0hlaWdodCA9IDA7XG53eC5nZXRTeXN0ZW1JbmZvKHtcbiAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgIHJlYWxXaW5kb3dXaWR0aCA9IHJlcy53aW5kb3dXaWR0aFxuICAgIHJlYWxXaW5kb3dIZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XG4gIH1cbn0pXG4vKipcbiAqIOS4u+WHveaVsOWFpeWPo+WMulxuICoqL1xuZnVuY3Rpb24gd3hQYXJzZShiaW5kTmFtZSA9ICd3eFBhcnNlRGF0YScsIHR5cGU9J2h0bWwnLCBkYXRhPSc8ZGl2IGNsYXNzPVwiY29sb3I6cmVkO1wiPuaVsOaNruS4jeiDveS4uuepujwvZGl2PicsIHRhcmdldCxpbWFnZVBhZGRpbmcpIHtcbiAgdmFyIHRoYXQgPSB0YXJnZXQ7XG4gIHZhciB0cmFuc0RhdGEgPSB7fTsvL+WtmOaUvui9rOWMluWQjueahOaVsOaNrlxuICBpZiAodHlwZSA9PSAnaHRtbCcpIHtcbiAgICB0cmFuc0RhdGEgPSBIdG1sVG9Kc29uLmh0bWwyanNvbihkYXRhLCBiaW5kTmFtZSk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PSAnbWQnIHx8IHR5cGUgPT0gJ21hcmtkb3duJykge1xuICAgIHZhciBjb252ZXJ0ZXIgPSBuZXcgc2hvd2Rvd24uQ29udmVydGVyKCk7XG4gICAgdmFyIGh0bWwgPSBjb252ZXJ0ZXIubWFrZUh0bWwoZGF0YSk7XG4gICAgdHJhbnNEYXRhID0gSHRtbFRvSnNvbi5odG1sMmpzb24oaHRtbCwgYmluZE5hbWUpO1xuICB9XG4gIHRyYW5zRGF0YS52aWV3ID0ge307XG4gIHRyYW5zRGF0YS52aWV3LmltYWdlUGFkZGluZyA9IDA7XG4gIGlmKHR5cGVvZihpbWFnZVBhZGRpbmcpICE9ICd1bmRlZmluZWQnKXtcbiAgICB0cmFuc0RhdGEudmlldy5pbWFnZVBhZGRpbmcgPSBpbWFnZVBhZGRpbmdcbiAgfVxuICB2YXIgYmluZERhdGEgPSB7fTtcbiAgYmluZERhdGFbYmluZE5hbWVdID0gdHJhbnNEYXRhO1xuICB0aGF0LnNldERhdGEoYmluZERhdGEpXG4gIHRoYXQud3hQYXJzZUltZ0xvYWQgPSB3eFBhcnNlSW1nTG9hZDtcbiAgdGhhdC53eFBhcnNlSW1nVGFwID0gd3hQYXJzZUltZ1RhcDtcbn1cbi8vIOWbvueJh+eCueWHu+S6i+S7tlxuZnVuY3Rpb24gd3hQYXJzZUltZ1RhcChlKSB7XG4gIHZhciB0aGF0ID0gdGhpcztcbiAgdmFyIG5vd0ltZ1VybCA9IGUudGFyZ2V0LmRhdGFzZXQuc3JjO1xuICB2YXIgdGFnRnJvbSA9IGUudGFyZ2V0LmRhdGFzZXQuZnJvbTtcbiAgaWYgKHR5cGVvZiAodGFnRnJvbSkgIT0gJ3VuZGVmaW5lZCcgJiYgdGFnRnJvbS5sZW5ndGggPiAwKSB7XG4gICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgIGN1cnJlbnQ6IG5vd0ltZ1VybCwgLy8g5b2T5YmN5pi+56S65Zu+54mH55qEaHR0cOmTvuaOpVxuICAgICAgdXJsczogdGhhdC5kYXRhW3RhZ0Zyb21dLmltYWdlVXJscyAvLyDpnIDopoHpooTop4jnmoTlm77niYdodHRw6ZO+5o6l5YiX6KGoXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIOWbvueJh+inhuinieWuvemrmOiuoeeul+WHveaVsOWMulxuICoqL1xuZnVuY3Rpb24gd3hQYXJzZUltZ0xvYWQoZSkge1xuICB2YXIgdGhhdCA9IHRoaXM7XG4gIHZhciB0YWdGcm9tID0gZS50YXJnZXQuZGF0YXNldC5mcm9tO1xuICB2YXIgaWR4ID0gZS50YXJnZXQuZGF0YXNldC5pZHg7XG4gIGlmICh0eXBlb2YgKHRhZ0Zyb20pICE9ICd1bmRlZmluZWQnICYmIHRhZ0Zyb20ubGVuZ3RoID4gMCkge1xuICAgIGNhbE1vcmVJbWFnZUluZm8oZSwgaWR4LCB0aGF0LCB0YWdGcm9tKVxuICB9XG59XG4vLyDlgYflvqrnjq/ojrflj5borqHnrpflm77niYfop4bop4nmnIDkvbPlrr3pq5hcbmZ1bmN0aW9uIGNhbE1vcmVJbWFnZUluZm8oZSwgaWR4LCB0aGF0LCBiaW5kTmFtZSkge1xuICB2YXIgdGVtRGF0YSA9IHRoYXQuZGF0YVtiaW5kTmFtZV07XG4gIGlmICghdGVtRGF0YSB8fCB0ZW1EYXRhLmltYWdlcy5sZW5ndGggPT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgdGVtSW1hZ2VzID0gdGVtRGF0YS5pbWFnZXM7XG4gIC8v5Zug5Li65peg5rOV6I635Y+Wdmlld+WuveW6piDpnIDopoHoh6rlrprkuYlwYWRkaW5n6L+b6KGM6K6h566X77yM56iN5ZCO5aSE55CGXG4gIHZhciByZWNhbCA9IHd4QXV0b0ltYWdlQ2FsKGUuZGV0YWlsLndpZHRoLCBlLmRldGFpbC5oZWlnaHQsdGhhdCxiaW5kTmFtZSk7XG4gIC8vIHRlbUltYWdlc1tpZHhdLndpZHRoID0gcmVjYWwuaW1hZ2VXaWR0aDtcbiAgLy8gdGVtSW1hZ2VzW2lkeF0uaGVpZ2h0ID0gcmVjYWwuaW1hZ2VoZWlnaHQ7XG4gIC8vIHRlbURhdGEuaW1hZ2VzID0gdGVtSW1hZ2VzO1xuICAvLyB2YXIgYmluZERhdGEgPSB7fTtcbiAgLy8gYmluZERhdGFbYmluZE5hbWVdID0gdGVtRGF0YTtcbiAgLy8gdGhhdC5zZXREYXRhKGJpbmREYXRhKTtcbiAgdmFyIGluZGV4ID0gdGVtSW1hZ2VzW2lkeF0uaW5kZXhcbiAgdmFyIGtleSA9IGAke2JpbmROYW1lfWBcbiAgZm9yICh2YXIgaSBvZiBpbmRleC5zcGxpdCgnLicpKSBrZXkrPWAubm9kZXNbJHtpfV1gXG4gIHZhciBrZXlXID0ga2V5ICsgJy53aWR0aCdcbiAgdmFyIGtleUggPSBrZXkgKyAnLmhlaWdodCdcbiAgdGhhdC5zZXREYXRhKHtcbiAgICBba2V5V106IHJlY2FsLmltYWdlV2lkdGgsXG4gICAgW2tleUhdOiByZWNhbC5pbWFnZWhlaWdodCxcbiAgfSlcbn1cblxuLy8g6K6h566X6KeG6KeJ5LyY5YWI55qE5Zu+54mH5a696auYXG5mdW5jdGlvbiB3eEF1dG9JbWFnZUNhbChvcmlnaW5hbFdpZHRoLCBvcmlnaW5hbEhlaWdodCx0aGF0LGJpbmROYW1lKSB7XG4gIC8v6I635Y+W5Zu+54mH55qE5Y6f5aeL6ZW/5a69XG4gIHZhciB3aW5kb3dXaWR0aCA9IDAsIHdpbmRvd0hlaWdodCA9IDA7XG4gIHZhciBhdXRvV2lkdGggPSAwLCBhdXRvSGVpZ2h0ID0gMDtcbiAgdmFyIHJlc3VsdHMgPSB7fTtcbiAgdmFyIHBhZGRpbmcgPSB0aGF0LmRhdGFbYmluZE5hbWVdLnZpZXcuaW1hZ2VQYWRkaW5nO1xuICB3aW5kb3dXaWR0aCA9IHJlYWxXaW5kb3dXaWR0aC0yKnBhZGRpbmc7XG4gIHdpbmRvd0hlaWdodCA9IHJlYWxXaW5kb3dIZWlnaHQ7XG4gIC8v5Yik5pat5oyJ54Wn6YKj56eN5pa55byP6L+b6KGM57yp5pS+XG4gIC8vIGNvbnNvbGUubG9nKFwid2luZG93V2lkdGhcIiArIHdpbmRvd1dpZHRoKTtcbiAgaWYgKG9yaWdpbmFsV2lkdGggPiB3aW5kb3dXaWR0aCkgey8v5Zyo5Zu+54mHd2lkdGjlpKfkuo7miYvmnLrlsY/luZV3aWR0aOaXtuWAmVxuICAgIGF1dG9XaWR0aCA9IHdpbmRvd1dpZHRoO1xuICAgIC8vIGNvbnNvbGUubG9nKFwiYXV0b1dpZHRoXCIgKyBhdXRvV2lkdGgpO1xuICAgIGF1dG9IZWlnaHQgPSAoYXV0b1dpZHRoICogb3JpZ2luYWxIZWlnaHQpIC8gb3JpZ2luYWxXaWR0aDtcbiAgICAvLyBjb25zb2xlLmxvZyhcImF1dG9IZWlnaHRcIiArIGF1dG9IZWlnaHQpO1xuICAgIHJlc3VsdHMuaW1hZ2VXaWR0aCA9IGF1dG9XaWR0aDtcbiAgICByZXN1bHRzLmltYWdlaGVpZ2h0ID0gYXV0b0hlaWdodDtcbiAgfSBlbHNlIHsvL+WQpuWImeWxleekuuWOn+adpeeahOaVsOaNrlxuICAgIHJlc3VsdHMuaW1hZ2VXaWR0aCA9IG9yaWdpbmFsV2lkdGg7XG4gICAgcmVzdWx0cy5pbWFnZWhlaWdodCA9IG9yaWdpbmFsSGVpZ2h0O1xuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5mdW5jdGlvbiB3eFBhcnNlVGVtQXJyYXkodGVtQXJyYXlOYW1lLGJpbmROYW1lUmVnLHRvdGFsLHRoYXQpe1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgdmFyIHRlbURhdGEgPSB0aGF0LmRhdGE7XG4gIHZhciBvYmogPSBudWxsO1xuICBmb3IodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKyl7XG4gICAgdmFyIHNpbUFyciA9IHRlbURhdGFbYmluZE5hbWVSZWcraV0ubm9kZXM7XG4gICAgYXJyYXkucHVzaChzaW1BcnIpO1xuICB9XG5cbiAgdGVtQXJyYXlOYW1lID0gdGVtQXJyYXlOYW1lIHx8ICd3eFBhcnNlVGVtQXJyYXknO1xuICBvYmogPSBKU09OLnBhcnNlKCd7XCInKyB0ZW1BcnJheU5hbWUgKydcIjpcIlwifScpO1xuICBvYmpbdGVtQXJyYXlOYW1lXSA9IGFycmF5O1xuICB0aGF0LnNldERhdGEob2JqKTtcbn1cblxuLyoqXG4gKiDphY3nva5lbW9qaXNcbiAqXG4gKi9cblxuZnVuY3Rpb24gZW1vamlzSW5pdChyZWc9JycsYmFzZVNyYz1cIi93eFBhcnNlL2Vtb2ppcy9cIixlbW9qaXMpe1xuICAgSHRtbFRvSnNvbi5lbW9qaXNJbml0KHJlZyxiYXNlU3JjLGVtb2ppcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3eFBhcnNlOiB3eFBhcnNlLFxuICB3eFBhcnNlVGVtQXJyYXk6d3hQYXJzZVRlbUFycmF5LFxuICBlbW9qaXNJbml0OmVtb2ppc0luaXRcbn1cblxuXG4iXSwiZmlsZSI6Ind4UGFyc2UuanMifQ==