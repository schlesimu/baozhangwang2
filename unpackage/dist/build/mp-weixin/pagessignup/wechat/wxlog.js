(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagessignup/wechat/wxlog"],{4317:function(e,t,o){},5916:function(e,t,o){"use strict";o.r(t);var n=o("a8b7"),a=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=a.a},"9e42":function(e,t,o){"use strict";var n=o("4317"),a=o.n(n);a.a},a8b7:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{code:"",encryptedData:"",iv:"",IMG_URL:this.IMG_URL,signature:"",rawData:"",avatar:"",nickname:"",isUser:!0,openId:"",userinfo:{},goPage:0}},onLoad:function(t){this.getCode(),console.log(wx.getUserProfile,"wx.getUserProfile"),e.removeStorageSync("PageCur"),"outLogin"==t.page&&(this.goPage=1)},methods:{getCode:function(){var t=this;e.login({success:function(e){t.code=e.code}})},wxGetUserInfo:function(t){var o=this;e.showModal({content:"是否授权微信",success:function(t){if(t.confirm){var n="";e.login({success:function(e){n=e.code}}),e.getUserProfile({desc:"用于完善会员资料",success:function(t){o.$Request.post(o.$api.wechat.wx_login,{encryptedData:encodeURIComponent(t.encryptedData),iv:encodeURIComponent(t.iv),code:n,signature:t.signature,rawData:t.rawData,avatar:t.userInfo.avatarUrl,nickname:t.userInfo.nickName}).then((function(t){if(1==t.code){if(e.hideLoading(),console.log(t.data,t.data.result,"result.result"),t.data.result)console.log("后台返回的result",t.data.result),o.rawData=t.data.result,o.$Common.toast("授权成功，请点击按钮进行手机号授权"),o.isUser=!1,o.getCode();else if(t.data.userinfo){console.log(t.data.userinfo,"已绑定手机号");var n=o.userinfo=t.data.userinfo;e.$emit("appLoginSuccess",{}),e.setStorageSync("USERINFO",n),e.setStorageSync("userToken",n.user_token),e.removeStorageSync("PageCur"),e.removeStorageSync("chooseCity"),e.$emit("wechatLogin",{}),1==o.goPage?(console.log(t.data,"授权返回的信息"),2==t.data.userinfo.user_type?e.reLaunch({url:"../../pages/index/index"}):1==t.data.userinfo.user_type&&(0==t.data.userinfo.is_personal_profile?e.navigateTo({url:"../../pagesauthen/choose_shenfen"}):e.reLaunch({url:"../../pages/index/index"}))):setTimeout((function(){e.navigateBack()}),500)}}else-999==t.code?(e.hideLoading(),o.$Common.toast(t.msg),o.getCode()):(e.hideLoading(),o.$Common.toast("授权失败，请使用其他方式登录"))})).catch((function(t){o.getCode(),console.log("ERROR_catch",t),e.hideLoading(),o.$Common.toast(t.msg)}))},fail:function(t){console.log("ERROR_fail",t),e.hideLoading(),o.getCode()}})}else t.cancel&&(e.showToast({title:"授权失败",icon:"none"}),o.getCode())}})},getPhoneNumber:function(t){if(this.getCode(),e.showLoading({title:"绑定中"}),!this.code)return e.hideLoading(),void this.$Common.toast("授权失败，请稍后重试");if("getPhoneNumber:fail:user deny"==t.detail.errMsg)return e.hideLoading(),void this.$Common.toast("您已经取消授权");var o={iv:t.detail.iv,encryptedData:t.detail.encryptedData,code:this.code,wxinfo:JSON.stringify(this.rawData)};console.log(o,"========obj======"),this.phoneFn(o)},phoneFn:function(t){var o=this;this.$Request.post(this.$api.wechat.wx_info,t).then((function(t){if(o.$Common.toast(t.msg),1==t.code){e.hideLoading();var n=t.data.userinfo;e.$emit("appLoginSuccess",{}),e.setStorageSync("USERINFO",n),e.setStorageSync("userToken",n.user_token),e.removeStorageSync("PageCur"),e.removeStorageSync("chooseCity"),e.$emit("wechatLogin",{}),1==o.goPage?(console.log(t.data,"绑定手机号返回的信息"),2==t.data.userinfo.user_type?e.reLaunch({url:"../../pages/index/index"}):1==t.data.userinfo.user_type&&(0==t.data.userinfo.is_personal_profile?e.navigateTo({url:"../../pagesauthen/choose_shenfen"}):e.reLaunch({url:"../../pages/index/index"}))):(o.getCode(),setTimeout((function(){e.navigateBack({})}),500))}}))}}};t.default=o}).call(this,o("543d")["default"])},acdd:function(e,t,o){"use strict";o.r(t);var n=o("f663"),a=o("5916");for(var i in a)"default"!==i&&function(e){o.d(t,e,(function(){return a[e]}))}(i);o("9e42");var s,r=o("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=c.exports},bb3c:function(e,t,o){"use strict";(function(e){o("652a");n(o("66fd"));var t=n(o("acdd"));function n(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(t.default)}).call(this,o("543d")["createPage"])},f663:function(e,t,o){"use strict";var n;o.d(t,"b",(function(){return a})),o.d(t,"c",(function(){return i})),o.d(t,"a",(function(){return n}));var a=function(){var e=this,t=e.$createElement;e._self._c},i=[]}},[["bb3c","common/runtime","common/vendor"]]]);