(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesHome/index/broker_detail"],{1027:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return o}));var o={jyfParser:function(){return Promise.all([e.e("common/vendor"),e.e("components/jyf-parser/jyf-parser")]).then(e.bind(null,"28cc"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,(t.personInfo.phone||"").replace(/(\d{4})\d{3}(\d{4})/,"$1****$2")),o=t.showWechat?(t.personInfo.wx||"").replace(/[\W\d\w]/g,"*"):null;t.$mp.data=Object.assign({},{$root:{g0:e,g1:o}})},s=[]},"1a69":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){e.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(e("9cf3"))}.bind(null,e)).catch(e.oe)},i={components:{uniNavBar:o},data:function(){return{dotStyle:!0,StatusBar:this.StatusBar,IMG_URL:this.IMG_URL,title:"",aid:"",person_detail:"",personInfo:"",user_id:"",topDistance:0,status:"",isopen:!0,service_rules:"",inviteinfo:"",is_collection:0,job_collect:!1,lon:"",lat:"",showWechat:!1}},onLoad:function(n){t.showLoading({}),this.id=n.id,this.lon=Number(n.lon),this.lat=Number(n.lat),this.get_detail(),this.showWechat=!!t.getStorageSync("is_contact")},methods:{gomessage:function(){var n=this;t.getStorageSync("userToken")?0!=this.isopen&&(this.isopen=!1,setTimeout((function(){n.isopen=!0}),3e3),t.$emit("jump",{}),t.navigateTo({url:"/pagesmessage/userMsg?kfid="+this.personInfo.user_id+"&userName="+this.personInfo.agent_name,animationDuration:300})):this.$Common.toast("登录后才能操作哦")},call_phone:function(){t.getStorageSync("USERINFO");t.makePhoneCall({phoneNumber:this.personInfo.phone})},get_detail:function(){var n=this;this.$Request.post(this.$api.job.brokerDetail,{userid:this.id,user_id:t.getStorageSync("USERINFO").id||0,lon:this.lon,lat:this.lat}).then((function(e){t.hideLoading(),1==e.code?n.personInfo=e.data:n.$Common.toast("网络错误，请重试")})).catch((function(t){n.$Common.toast("网络错误，请重试")}))},copy:function(n){var e=this;t.setClipboardData({data:n,success:function(){e.$Common.toast("复制成功")}})},goComplant:function(){t.navigateTo({url:"../complaint"})},get_shareUrl:function(){var n=this;this.$Request.post(this.$api.user.get_invite).then((function(e){console.log(e.data,"分享链接"),1==e.code?n.inviteinfo=e.data:t.showToast({title:e.msg,icon:"none"})}))},goSign_up:function(){var n=this;t.getStorageSync("userToken")?0!=this.isopen&&(this.isopen=!1,setTimeout((function(){n.isopen=!0}),3e3),t.redirectTo({url:"signUp_morker?id="+this.personInfo.user_id})):this.$Common.toast("登录后才能操作哦")},choose_location:function(){var n=this;t.openLocation({latitude:Number(n.personInfo.lat),longitude:Number(n.personInfo.lon),name:n.personInfo.address,success:function(t){},fail:function(t){this.$Common.toast("网络错误，请稍后重试")}})},follow:function(){var n=this;this.$Request.post(this.$api.company.set_collection,{collect_id:this.companyInfo.aid,type:1}).then((function(e){console.log(e,""),t.showToast({title:e.msg,icon:"none"}),1==e.code&&(n.is_collection=e.data.is_collection)}))},share:function(){this.$refs.shareType.open()},close:function(){this.$refs.shareType.close()}}};n.default=i}).call(this,e("543d")["default"])},"2a6b":function(t,n,e){},"3be0":function(t,n,e){"use strict";(function(t){e("652a");o(e("66fd"));var n=o(e("f6de"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},9457:function(t,n,e){"use strict";e.r(n);var o=e("1a69"),i=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,(function(){return o[t]}))}(s);n["default"]=i.a},a2bd:function(t,n,e){"use strict";var o=e("2a6b"),i=e.n(o);i.a},f6de:function(t,n,e){"use strict";e.r(n);var o=e("1027"),i=e("9457");for(var s in i)"default"!==s&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("a2bd");var a,r=e("f0c5"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=c.exports}},[["3be0","common/runtime","common/vendor"]]]);