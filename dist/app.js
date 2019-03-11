"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function r(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(e,t,a){if(t)r(e.prototype,t);if(a)r(e,a);return e}}();var _wepy=require("./npm/wepy/lib/wepy.js");var _wepy2=_interopRequireDefault(_wepy);var _token=require("./utils/token.js");var _token2=_interopRequireDefault(_token);var _viewModel=require("./utils/viewModel.js");var _viewModel2=_interopRequireDefault(_viewModel);var _commonMT=require("./utils/commonMT.js");var _commonMT2=_interopRequireDefault(_commonMT);var _config=require("./utils/config.js");var _config2=_interopRequireDefault(_config);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(e,t){if(!e){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return t&&(typeof t==="object"||typeof t==="function")?t:e}function _inherits(e,t){if(typeof t!=="function"&&t!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof t)}e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:false,writable:true,configurable:true}});if(t)Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t}var _default=function(e){_inherits(t,e);function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));e.config={pages:["pages/index/index","pages/my/my","pages/cart/pay","pages/order/orderDetail","pages/order/myOrder","pages/my/editAddress","pages/my/newAddress","pages/my/myAddress","pages/my/myCollect","pages/cart/cart","pages/index/classList"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#fff",navigationBarTitleText:"",navigationBarTextStyle:"black"},tabBar:{borderStyle:"black",list:[{pagePath:"pages/index/index",iconPath:"images/tabbar/home.png",selectedIconPath:"images/tabbar/homeAct.png",text:"首页"},{pagePath:"pages/cart/cart",iconPath:"images/tabbar/cart.png",selectedIconPath:"images/tabbar/cartAct.png",text:"购物车"},{pagePath:"pages/my/my",iconPath:"images/tabbar/my.png",selectedIconPath:"images/tabbar/myAct.png",text:"个人中心"}],color:"#9e9e9e",selectedColor:"#fd4751",backgroundColor:"#ffffff"}};e.globalData={userInfo:null,phoneWidth:"",phoneHeight:"",pxRadio:"",shopInfo:""};return e}_createClass(t,[{key:"onShow",value:function e(){}},{key:"onLaunch",value:function e(){_token2.default.verify();var t=wx.getSystemInfoSync();this.globalData.phoneWidth=t.windowWidth;this.globalData.phoneHeight=t.windowHeight;this.globalData.pxRadio=this.globalData.phoneWidth/750;var a=wx.getUpdateManager();a.onUpdateReady(function(){wx.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function e(t){if(t.confirm){a.applyUpdate()}}})})}}]);return t}(_wepy2.default.app);App(require("./npm/wepy/lib/wepy.js").default.$createApp(_default,{noPromiseAPI:["createSelectorQuery"]}));require("./_wepylogs.js");