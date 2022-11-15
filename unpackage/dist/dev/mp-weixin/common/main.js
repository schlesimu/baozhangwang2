(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/main"],{

/***/ 0:
/*!**************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/main.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, createApp) {__webpack_require__(/*! uni-pages */ 5);

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ 6));
var _httpLbApi = _interopRequireDefault(__webpack_require__(/*! ./common/httpLbApi */ 14));
var _httpRequest = _interopRequireDefault(__webpack_require__(/*! ./common/httpRequest */ 15));
var _cache = _interopRequireDefault(__webpack_require__(/*! ./common/cache */ 17));
var _vueI18n = _interopRequireDefault(__webpack_require__(/*! vue-i18n */ 24));
var _router = _interopRequireDefault(__webpack_require__(/*! ./common/router */ 25));
var _routes = _interopRequireDefault(__webpack_require__(/*! ./common/routes.config */ 23));
var _lbframe = _interopRequireDefault(__webpack_require__(/*! ./common/lbframe */ 18));
var _common = _interopRequireDefault(__webpack_require__(/*! ./common/common */ 26));
var _util = _interopRequireDefault(__webpack_require__(/*! ./common/util */ 27));
var _jiguang_jim = __webpack_require__(/*! ./js_sdk/jiguang_jim.js */ 28);



__webpack_require__(/*! @/common/filter.js */ 31);
var _uviewUi = _interopRequireDefault(__webpack_require__(/*! uview-ui */ 32));










var _worktimeindex = _interopRequireDefault(__webpack_require__(/*! pages/tabbar/worktimeindex.vue */ 55));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} // @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;_vue.default.use(new _jiguang_jim.JjimWidget());_vue.default.use(_uviewUi.default);_vue.default.use(_vueI18n.default);var homepage = function homepage() {__webpack_require__.e(/*! require.ensure | pages/tabbar/homepage */ "pages/tabbar/homepage").then((function () {return resolve(__webpack_require__(/*! pages/tabbar/homepage.vue */ 959));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};_vue.default.component('homepage', homepage);var message = function message() {Promise.all(/*! require.ensure | pages/tabbar/message */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/tabbar/message")]).then((function () {return resolve(__webpack_require__(/*! pages/tabbar/message.vue */ 966));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};_vue.default.component('message', message); // 首页记工时模块
_vue.default.component('worktime', _worktimeindex.default);var user = function user() {__webpack_require__.e(/*! require.ensure | pages/tabbar/user */ "pages/tabbar/user").then((function () {return resolve(__webpack_require__(/*! pages/tabbar/user.vue */ 973));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};

_vue.default.component('user', user);var homepageTwo = function homepageTwo() {Promise.all(/*! require.ensure | pages/tabbar/homepageTwo */[__webpack_require__.e("common/vendor"), __webpack_require__.e("pages/tabbar/homepageTwo")]).then((function () {return resolve(__webpack_require__(/*! pages/tabbar/homepageTwo.vue */ 980));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};


_vue.default.component('homepageTwo', homepageTwo);var zhaopinzhe = function zhaopinzhe() {__webpack_require__.e(/*! require.ensure | pages/tabbar/zhaopinzhe */ "pages/tabbar/zhaopinzhe").then((function () {return resolve(__webpack_require__(/*! @/pages/tabbar/zhaopinzhe.vue */ 987));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};


_vue.default.component('zhaopinzhe', zhaopinzhe);
// 职位列表
var plantList = function plantList() {__webpack_require__.e(/*! require.ensure | components/plantList */ "components/plantList").then((function () {return resolve(__webpack_require__(/*! @/components/plantList.vue */ 994));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};
_vue.default.component('plantList', plantList);
// // 全国服务经纪人
var serviceBroker = function serviceBroker() {Promise.all(/*! require.ensure | components/serviceBroker */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/serviceBroker")]).then((function () {return resolve(__webpack_require__(/*! @/components/serviceBroker.vue */ 1001));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};
_vue.default.component('serviceBroker', serviceBroker);
// // 兼职任务
// import partList from '@/components/partList.vue'
// Vue.component('partList', partList)
// // 资讯头条
// import convenience from '@/components/convenience.vue'
// Vue.component('convenience', convenience)
var MescrollBody = function MescrollBody() {Promise.all(/*! require.ensure | components/mescroll-uni/mescroll-body */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/mescroll-uni/mescroll-body")]).then((function () {return resolve(__webpack_require__(/*! @/components/mescroll-uni/mescroll-body.vue */ 1008));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};var MescrollUni = function MescrollUni() {Promise.all(/*! require.ensure | components/mescroll-uni/mescroll-uni */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/mescroll-uni/mescroll-uni")]).then((function () {return resolve(__webpack_require__(/*! @/components/mescroll-uni/mescroll-uni.vue */ 1020));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};



_vue.default.component('mescroll-body', MescrollBody);
_vue.default.component('mescroll-uni', MescrollUni);var cuCustom = function cuCustom() {__webpack_require__.e(/*! require.ensure | colorui/components/cu-custom */ "colorui/components/cu-custom").then((function () {return resolve(__webpack_require__(/*! ./colorui/components/cu-custom.vue */ 1029));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};

_vue.default.component('cu-custom', cuCustom);
_vue.default.config.productionTip = false;
var currentVersion = {
  id: 100, //APP版本号，每次更新需要更改
  version: '1.0.0' };

var i18n = new _vueI18n.default({
  locale: 'zh-Hans',
  messages: {
    'ch': '', // 中文语言包
    'en': '' // 英文语言包
  } });


_vue.default.prototype.$api = _httpLbApi.default;
_vue.default.prototype.$Request = _httpRequest.default;
_vue.default.prototype.$Config = _httpRequest.default.config;
_vue.default.prototype.$Cache = _cache.default;
_vue.default.prototype.$mRouter = _router.default;
_vue.default.prototype.$mRoutesConfig = _routes.default;
_vue.default.prototype.$Lbframe = _lbframe.default;
_vue.default.prototype.$Common = _common.default;
_vue.default.prototype.$current = currentVersion;
_vue.default.prototype.$util = _util.default; // 引入帮助函数
_App.default.mpType = 'app';

_router.default.beforeEach(function (navType, to) {
  if (to.route === undefined) throw "路由钩子函数中没有找到to.route对象，路由信息:" + JSON.stringify(to);

  // 过滤需要权限的页面
  if (to.route.requiresAuth) {
    var userInfo = uni.getStorageSync('USERINFO');
    var userToken = userInfo.user_token;
    if (userToken) {
      // 已经登录
      uni[navType]({
        url: _lbframe.default.objParseUrlAndParam(to.route.path, to.query) });

    } else {
      // 登录成功后的重定向地址和参数
      var query = _objectSpread({
        redirectUrl: to.route.path },
      to.query);

      // 没有登录 是否强制登录?
      if (false) {} else {
        uni.navigateTo({
          url: _lbframe.default.objParseUrlAndParam(_routes.default.login.path, query) });

      }
    }
  } else {
    uni[navType]({
      url: _lbframe.default.objParseUrlAndParam(to.route.path, to.query) });

  }
});

uni.onNetworkStatusChange(function (res) {
  // console.log(res,'监听网络状态');
  if (!res.isConnected) {
    uni.showToast({
      title: "网络信号弱，请检查您的网络状态……",
      icon: 'none' });

    return;
  } else {
    // uni.$emit('appLoginSuccess',{});
  }
});
var app = new _vue.default(_objectSpread({},
_App.default));

_vue.default.prototype.IMG_URL = _httpRequest.default.config('DOMAIN');
_vue.default.prototype.BASEURL = _httpRequest.default.config('BASEURL');
var IMG_URL = _httpRequest.default.config('DOMAIN');
var click = false;
/* 全局混入 start */
_vue.default.mixin({
  data: function data() {
    return {
      IMG_URL: IMG_URL };

  },
  methods: {
    navTo: function navTo(url) {
      if (click) return;
      click = true;
      uni.navigateTo({
        url: url });

      setTimeout(function () {
        click = false;
      }, 200);
    },
    head_img: function head_img(src) {
      return src.indexOf('http') == -1 ? IMG_URL + src : src;
    } },

  filters: {
    card_img: function card_img(src) {
      if (src == '../../static/user/card2.png' || src == '../../static/user/card1.png') return src;
      if (src == '../../static/user/card3.png' || src == '../../static/user/up.png') return src;
      return src.indexOf('/static') == 0 ? IMG_URL + src : src;
    },
    head_img: function head_img(src) {
      return src.indexOf('http') == -1 ? IMG_URL + src : src;
    },
    sub_str: function sub_str(name) {
      name = name.toString();
      return name.length > 12 ? name.substr(0, 12) + '...' : name;
    } } });


/* 全局混入 end */

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 11:
/*!************************************************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/App.vue?vue&type=style&index=0&lang=scss& ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */ 12);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 12:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/schlesimu/Desktop/baozhangwang-master/App.vue?vue&type=style&index=0&lang=scss& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 55:
/*!*************************************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/pages/tabbar/worktimeindex.vue ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./worktimeindex.vue?vue&type=template&id=0d9ed688& */ 56);
/* harmony import */ var _worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./worktimeindex.vue?vue&type=script&lang=js& */ 58);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _worktimeindex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./worktimeindex.vue?vue&type=style&index=0&lang=scss& */ 60);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__["render"],
  _worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/tabbar/worktimeindex.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 56:
/*!********************************************************************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/pages/tabbar/worktimeindex.vue?vue&type=template&id=0d9ed688& ***!
  \********************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./worktimeindex.vue?vue&type=template&id=0d9ed688& */ 57);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_template_id_0d9ed688___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 57:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/schlesimu/Desktop/baozhangwang-master/pages/tabbar/worktimeindex.vue?vue&type=template&id=0d9ed688& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uniIcons: function() {
      return Promise.all(/*! import() | components/uni-icons/uni-icons */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/uni-icons/uni-icons")]).then(__webpack_require__.bind(null, /*! @/components/uni-icons/uni-icons.vue */ 1036))
    },
    notebooklist: function() {
      return Promise.all(/*! import() | components/notebooklist/notebooklist */[__webpack_require__.e("common/vendor"), __webpack_require__.e("components/notebooklist/notebooklist")]).then(__webpack_require__.bind(null, /*! @/components/notebooklist/notebooklist.vue */ 1044))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function($event, index) {
      var _temp = arguments[arguments.length - 1].currentTarget.dataset,
        _temp2 = _temp.eventParams || _temp["event-params"],
        index = _temp2.index

      var _temp, _temp2

      _vm.currentTab = index
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 58:
/*!**************************************************************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/pages/tabbar/worktimeindex.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./worktimeindex.vue?vue&type=script&lang=js& */ 59);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 59:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/schlesimu/Desktop/baozhangwang-master/pages/tabbar/worktimeindex.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      user: {
        id: 1 },
      //用户信息
      img: this.IMG_URL + 'static/miniwechat/logo.png',
      IMG_URL: this.IMG_URL,
      isopen: true,
      userinfo: uni.getStorageSync('USERINFO'), //缓存的用户信息
      StatusBar: this.StatusBar,
      tabList: [
      {
        index: 1,
        title: '小时工' },

      {
        index: 2,
        title: '正式工' },

      {
        index: 3,
        title: '计件工' }],


      currentTab: -1,
      currentHourStr: '当月工时(小时)',
      currentSalaryStr: '当前收入(元)',
      currentSalarySettingRoute: '/pagesworktime/salarysettings',
      currentStatisticsRoute: '/pagesworktime/worktimestatistics',
      recordnotebook: '/pagesworktime/recordnotebook',
      worktimerecord: '/pagesworktime/worktimerecord',
      currentUnitStr: '当月数量',
      showLoading: true,
      workcount: 0, // 工时或者件数
      worksalary: 0, // 总收入
      countUnit: '' // 单位
    };
  },
  watch: {
    currentTab: function currentTab(current) {
      // console.error(current);
      this.requestData();
    } },

  beforeCreate: function beforeCreate() {
    // 解析vue生命周期
    // https://blog.csdn.net/hkduan/article/details/115822619
    // https://blog.csdn.net/m0_70477767/article/details/124684195
    // 调用之前，做事件和生命周期函数初始化
  },
  created: function created() {
    // 调用之前，做inject/provide初始化以及响应式数据、方法准备

    var tab = uni.getStorageSync('history_page');
    console.error(tab);
    this.currentTab = tab !== '' ? tab : 1; // 默认选中正式工，如果缓存有上次页面使用上次页面
    uni.removeStorageSync('history_page');
    //这是要刷新的数据
    //console.error(this.userinfo);
    if (this.userinfo.user_token) {
      this.get_usrInfo();
    }
  },
  beforeMount: function beforeMount() {
    // 调用之前做模板解析
    // console.error('beforeMount');
  },
  mounted: function mounted() {
    // 渲染后的dom挂在完毕
    // console.error('mounted');
  },
  beforeUpdate: function beforeUpdate(e, v) {
    // 数据更新前
    // console.error('beforeUpdate');
    // 此处不off的话会请求n多次接口，且次数是不断累加的
    uni.$off();
  },
  updated: function updated() {var _this = this;
    // 数据更新完毕
    // navigateTo会执行
    // console.error('updated');
    uni.$on('change', function (data) {
      console.log(data);
      if (data.msg == 1) {
        setTimeout(function () {
          _this.get_usrInfo();
        });
      }
    });
    uni.$on('wechatLogin', function () {
      //监听微信登录成功
      // console.log('微信登录  个人中心');
      _this.get_usrInfo();
    });
    // 在记录工时返回后刷新数据
    uni.$on('update', function () {
      _this.requestData();
    });
    // 从统计页面返回，因为在统计页面可能会编辑或者新增记录
    uni.$on('updateOn', function () {
      _this.requestData();
    });
    // 更新配置返回
    uni.$on('updateSetting', function () {
      _this.requestData();
    });
  },
  beforeDestroy: function beforeDestroy() {
    // switchTab会执行
    uni.$off();
    uni.setStorageSync('history_page', this.currentTab);
    console.error('beforeDestroy...');
  },
  destroyed: function destroyed() {
    console.error('destroing...');
  },
  methods: {
    get_usrInfo: function get_usrInfo() {var _this2 = this;
      //获取用户信息
      this.$Request.
      post(this.$api.user.get_user_info, {
        user_id: this.userinfo.id }).

      then(function (res) {
        _this2.user = res.data;
      });
    },
    toPage: function toPage(page) {var _this3 = this;
      //console.error(page);
      //防抖
      if (this.isopen == false) {
        return;
      }
      //console.error(page);
      this.isopen = false;
      setTimeout(function () {
        _this3.isopen = true;
      }, 500);
      //跳转详情，判断是否登录
      if (!this.userinfo.user_token) {
        uni.removeStorageSync('PageCur');
        this.$Common.toast('您还没有登录，请先登录');







        uni.navigateTo({
          url: '../../pagessignup/wechat/wxlog?page=outLogin' });


      } else {
        uni.navigateTo({
          url: page });

      }
    },
    requestData: function requestData() {var _this4 = this;
      // 请求接口数据
      this.$Request.
      get(this.$api.worktime.get_current_month_info, {
        salaryType: this.currentTab }).

      then(function (res) {
        // console.error(res.data);
        if (_this4.currentTab === 2) {
          _this4.workcount = res.data.count;
          _this4.countUnit = res.data.unit;
        } else {
          _this4.workcount = res.data.hour.toFixed(2);
        }

        _this4.worksalary = res.data.salary.toFixed(2);
        setTimeout(function () {
          _this4.showLoading = false;
        }, 200);
      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!**************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/App.vue ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ 7);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 11);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 13);
var render, staticRenderFns, recyclableRender, components
var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null,
  false,
  components,
  renderjs
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 60:
/*!***********************************************************************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/pages/tabbar/worktimeindex.vue?vue&type=style&index=0&lang=scss& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./worktimeindex.vue?vue&type=style&index=0&lang=scss& */ 61);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_worktimeindex_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 61:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/schlesimu/Desktop/baozhangwang-master/pages/tabbar/worktimeindex.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ }),

/***/ 7:
/*!***************************************************************************************!*\
  !*** C:/Users/schlesimu/Desktop/baozhangwang-master/App.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */ 8);
/* harmony import */ var _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_3_6_4_20220922_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 8:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/Users/schlesimu/Desktop/baozhangwang-master/App.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));

var _checkUpdater = __webpack_require__(/*! @/common/checkUpdater */ 9);


var _Permissions = __webpack_require__(/*! @/common/Permissions.js */ 10);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入检查更新模块


var that;
var pushMessage = [];var _default =
{
  onLaunch: function onLaunch() {var _this = this;
    that = this;
    uni.removeStorageSync('PageCur');
    uni.removeStorageSync('chooseCity');
    // 清除缓存的本地定位
    uni.removeStorageSync('position_const');
    // 微信登录获取的unionid
    // uni.removeStorageSync('unionid');

    uni.setStorageSync('istoken', true);
    uni.setStorageSync('openHomePop', 1);
    // app打开时先检查是否有更新记录（更新记录会被保存在storage中）
    // 更新记录的内容为 { 更新标记, 安装包位置 }

    // 如果存在更新记录，且更新标记（complete=true）则删除上次使用过的安装包，达到存储释放空间的目的

    // 如果存在更新记录，且更新标记（complete=false）则进行安装更新 - 2019年3月27日 新增强制更新内容
    var _self = this;






















































































































































































    // 读取系统信息，设置全局导航高度
    uni.getSystemInfo({
      success: function success(e) {










        _vue.default.prototype.StatusBar = e.statusBarHeight;
        var custom = wx.getMenuButtonBoundingClientRect();
        _vue.default.prototype.Custom = custom;
        _vue.default.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;






      } });

    // 监听登录，更新websocket链接
    // this.initializeSocket();
    // uni.$on('appLoginSuccess', () => {
    // 	console.log('appLoginSuccess，接收链接通知');
    //   // uni.closeSocket()
    //   // this.initializeSocket()
    // })
    this.initializeSocket();
    // 监听登录
    uni.$on('appLoginSuccess', function () {
      console.log('微信登录，通知开启websocket');
      uni.closeSocket();
      _this.initializeSocket();
    });
    // 监听进入聊天页面
    uni.$on('jump', function (res) {
      uni.closeSocket();
      console.log('关闭');
    });
    // 监听退出聊天页面
    uni.$on('openAll', function () {
      uni.closeSocket();
      _this.initializeSocket();
    });

    this.$Request.get(this.$api.common.fetchAppSetting).then(function (res) {
      console.log(res);
      uni.setStorageSync('is_contact', res.data.is_contact * 1);
    });
  },
  onShow: function onShow() {
    console.log('App Show');



    uni.$emit('openPage', {}); //开启页面  打开定位返回页面刷新数据
    this.initializeSocket();
    setTimeout(function () {
      (0, _Permissions.permissions)();
    }, 200);
    uni.hideLoading();
  },
  onHide: function onHide() {
    console.log('App Hide');
    uni.removeStorageSync('chooseCity');
    // 下面的方法都要写上


    uni.closeSocket();
    uni.onSocketOpen(function () {
      uni.closeSocket();
    });
    if (uni.getStorageSync('wechet')) {

    } else {
      uni.removeStorageSync('launchFlag');
    }
    uni.onSocketClose(function (res) {
      console.log('WebSocket 已关闭全局！');
    });
  },
  methods: {
    initializeSocket: function initializeSocket() {
      var userToKen = uni.getStorageSync('USERINFO');
      if (userToKen.user_token) {
        // 链接socket

        uni.connectSocket({
          // url: this.$Request.config('WS_HOST')
          url: 'wss://websocket.chongdarenli.com?from_id=' + userToKen.id + '&to_id=0' });







        // 链接成功
        uni.onSocketOpen(function (res) {
          // 登录
          // var login_data =
          // 	'{"type":"userInit", "uid": ' +
          // 	userToKen.id +
          // 	', "from_name" : "' +
          // 	userToKen.user_name +
          // 	'", "from_avatar" : "' +
          // 	userToKen.head_img +
          // 	'", "group" : ' +
          // 	1 +
          // 	', "user_type" : ' +
          // 	1 +
          // 	'}';
          // that.sendSocketMessage(login_data);
          setInterval(function () {
            uni.sendSocketMessage({
              data: 'pong',
              success: function success(res) {} });

          }, 10000);
        });
        uni.onSocketError(function (res) {
          console.log('WebSocket连接打开失败，请检查！');

        });
        // 监听收到消息
        uni.onSocketMessage(function (res) {
          // 非心跳
          console.log(res, '========'); //心跳
          if (res.data != 'success') {
            var arr = JSON.parse(res.data);
            if (!arr) {
              return;
            };
            // 接收消息
            if (arr.event == 'saveMessage') {
              console.log('在全局接收到信息');
              setTimeout(function () {
                uni.$emit('receiveMsg', '接收消息');
              }, 200);
              uni.setStorageSync('sevice', true);
              var routes = getCurrentPages(); // 获取当前打开过的页面路由数组
              if (routes != '') {
                var curRoute = routes[routes.length - 1].route; //获取当前页面路由
                if (curRoute != 'pagesmessage/userMsg') {
                  uni.vibrateLong();
                  uni.$emit('updata', {}); //刷新聊天列表
                }
              }
            }
          };
          // var data;
          // try{
          // 	data = JSON.parse(res.data);
          // }catch(e){//TODO handle the exception
          // }
          // if( data && data.message_type ){
          // 	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
          // 	console.log( routes , '路由' );
          // 	if(routes!=''){
          // 		let curRoute = routes[routes.length - 1].route //获取当前页面路由
          // 		if(data.message_type=='chatMessage' && curRoute!='pagesmessage/userMsg'){
          // 			uni.vibrateLong();
          // 		}
          // 	}
          // 	switch (data.message_type) {
          // 		// 服务端ping客户端
          // 		case 'ping':
          // 			that.sendSocketMessage('{"type":"ping"}');
          // 			break;
          // 		default:
          // 			uni.$emit('onSocketMessage_detail',data);
          // 			uni.$emit('onSocketMessage_list',data);
          // 			break;
          // 	}
          // }
        });
        // socket 断开链接后尝试重新链接
        uni.onSocketError(function (res) {
          uni.closeSocket();
          console.log('WebSocket 已关闭！');
          // setTimeout(()=>{
          // this.initializeSocket();
          // },1000)
        });
      }
    },
    sendSocketMessage: function sendSocketMessage(msg) {//发送消息
      var that = this;
      uni.sendSocketMessage({
        data: msg,
        success: function success(res) {} });

    },
    // 判断是否有引导图
    getGuide: function getGuide() {
      this.$Request.post(this.$api.operation.get_ads, {
        typeid: 2 }).
      then(function (res) {
        if (res.code == 1) {
          if (res.data.video == '') {
            if (!uni.getStorageSync('USERINFO').user_token) {
              uni.setStorageSync('USERINFO', {
                user_type: 1,
                id: '' });

            }
            uni.reLaunch({
              url: '/pages/guide/guide' });

          }
        }
      });
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map