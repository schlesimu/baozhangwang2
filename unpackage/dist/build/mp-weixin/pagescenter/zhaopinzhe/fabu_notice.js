(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagescenter/zhaopinzhe/fabu_notice"],{"0919":function(t,n,e){},"1b1d":function(t,n,e){"use strict";e.r(n);var i=e("7877"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},"534a":function(t,n,e){"use strict";(function(t){e("652a");i(e("66fd"));var n=i(e("7184"));function i(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},7184:function(t,n,e){"use strict";e.r(n);var i=e("dbbb"),o=e("1b1d");for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("9221");var s,u=e("f0c5"),r=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);n["default"]=r.exports},7877:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){e.e("components/ben-upload/ben-upload").then(function(){return resolve(e("df45"))}.bind(null,e)).catch(e.oe)},o={components:{benUpload:i},data:function(){return{content:"",imgOne:[],defaultpic:!1,videoImg:[],video:"",imgList:[],mobeil1:"",mobeil2:"",mobeil3:"",name1:"",name2:"",name3:"",uShow:!1,imgpath:[],max:4,check:"",hidden:!0,title:"",city:"",lon:"",lat:"",open:!1}},computed:{totalMoney:function(){return(this.zhaopin_number*(100*this.priceOne)/100).toFixed(2)}},onLoad:function(n){var e=this;t.removeStorageSync("fuliTag"),setTimeout((function(){e.defaultpic=!0}),300)},onUnload:function(){t.$off("video")},methods:{bannerLive:function(t){this.imgList=t,""!=t&&(this.uShow=!0)},DelImg:function(){this.videoImg="",this.open=!1},getLocation:function(){var n=this;t.chooseLocation({success:function(t){n.company_address=t.address,n.city=t.address,n.lon=t.longitude,n.lat=t.latitude}})},gopay:function(){var n=this;if(!this.title)return this.$Common.toast("请选择通知标题"),!1;if(""==this.imgList)return this.$Common.toast("请选择图片"),!1;if(this.mobeil1&&!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil1))return this.$Common.toast("请填写正确的联系方式1"),!1;if(this.mobeil2&&!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil2))return this.$Common.toast("请填写正确的联系方式2"),!1;if(this.mobeil3&&!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil3))return this.$Common.toast("请填写正确的联系方式3"),!1;if(!this.content)return this.$Common.toast("请输入详细内容"),!1;var e=[];this.imgList&&this.imgList.map((function(t){e.push(t.aid)}));var i={title:this.title,img:e.join(","),content:this.content,company_id:t.getStorageSync("roleinfo").info.aid,recommend:1,driver_name:this.name1||"",driver_phone:this.mobeil1||"",resident_manager_name:this.name2||"",resident_manager_phone:this.mobeil2||"",finance_manager_name:this.name3||"",finance_manager_phone:this.mobeil3||""};this.$Request.post(this.$api.Community.add_notice,i).then((function(e){if(1==e.code){if(n.$Common.toast(e.msg),t.$emit("fabuNotice",{}),0==n.isopen)return;n.isopen=!1,setTimeout((function(){n.isopen=!0}),1500),t.navigateBack({})}else n.$Common.toast(e.msg)}))}}};n.default=o}).call(this,e("543d")["default"])},9221:function(t,n,e){"use strict";var i=e("0919"),o=e.n(i);o.a},dbbb:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}));var i={benUpload:function(){return e.e("components/ben-upload/ben-upload").then(e.bind(null,"df45"))}},o=function(){var t=this,n=t.$createElement;t._self._c},a=[]}},[["534a","common/runtime","common/vendor"]]]);