(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesauthen/my_zhaopin"],{"1c2e":function(e,n,o){"use strict";var t;o.d(n,"b",(function(){return a})),o.d(n,"c",(function(){return u})),o.d(n,"a",(function(){return t}));var a=function(){var e=this,n=e.$createElement;e._self._c},u=[]},3996:function(e,n,o){"use strict";o.r(n);var t=o("b04a"),a=o.n(t);for(var u in t)"default"!==u&&function(e){o.d(n,e,(function(){return t[e]}))}(u);n["default"]=a.a},"8bc4":function(e,n,o){"use strict";o.r(n);var t=o("1c2e"),a=o("3996");for(var u in a)"default"!==u&&function(e){o.d(n,e,(function(){return a[e]}))}(u);o("b877");var i,s=o("f0c5"),r=Object(s["a"])(a["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],i);n["default"]=r.exports},9313:function(e,n,o){},"9aa1":function(e,n,o){"use strict";(function(e){o("652a");t(o("66fd"));var n=t(o("8bc4"));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o("543d")["createPage"])},b04a:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;o("6c72");var t=o("5745"),a={data:function(){return{sexIndex:0,sex:["请选择性别","男","女"],user:[],user_type:2,phone:"",city1:null,IMG_URL:this.IMG_URL,company_name:"",fuli:[],company_address:"",lon:"",lat:""}},onLoad:function(n){var o=this;this.getinfo();var t=n.avatar;t&&(this.user.head_img=t),e.$on("upHeadImg",(function(e){console.log(e,"监听图片修改参数"),o.user.head_img=e.avatar,o.$forceUpdate()})),e.$on("changeFuli",(function(e){console.log(e,"监听选择公司福利"),o.fuli=e.arr,console.log(o.fuli)}))},onUnload:function(){e.$off("upHeadImg"),e.$off("changeFuli")},methods:{yulan:function(e){this.$Common.lookImg(e)},nickname:function(e){e.length>6&&this.$Common.toast("姓名不能超过六个字符")},nickblur:function(e){e.length<2&&this.$Common.toast("姓名不能少于2个字符")},selectFuli:function(n){e.navigateTo({url:"../pagescommon/gongsi_fuli?&type="+n})},toggleTab:function(e){this.$data[e]=!0},addressConfirm:function(e){console.log("选择地址",e),this.hometown=e.checkArr.join("-"),this.city1=e},bindPickerChange:function(e){this.sexIndex=e.detail.value},getinfo:function(){this.user=e.getStorageSync("USERINFO"),console.log(this.user)},getLocation:function(){var n=this;e.chooseLocation({success:function(e){console.log("位置名称："+e.name),console.log("详细地址："+e.address),console.log("纬度："+e.latitude),console.log("经度："+e.longitude),n.company_address=e.address+" "+e.name,n.lon=e.longitude,n.lat=e.latitude,console.log("位置："+n.company_address)}})},upload:function(){e.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(n){var o=n.tempFilePaths[0];e.navigateTo({url:"/pagescommon/upload?src="+o})}})},delJob:function(e,n){e.splice(n,1)},formSubmit:function(n){var o=this;console.log(n.detail.value);var a=[{name:"head_img",rule:["required"],msg:["请上传头像"]},{name:"full_name",rule:["required","minLength:2","maxLength:6"],msg:["请输入姓名","姓名必须2个或以上字符","姓名不能超过6个字符"]},{name:"sex",rule:["required","range:[1,2]"],msg:["请选择性别","请选择性别"]},{name:"company_name",rule:["required"],msg:["请输入公司名称"]},{name:"welfare",rule:["required"],msg:["请选择公司福利"]},{name:"company_address",rule:["required"],msg:["请选择公司地址"]}],u=n.detail.value,i=[];this.fuli.map((function(e){i.push(e.aid)})),u.head_img=this.user.head_img,u.phone=this.user.mobile,u.welfare=i.join(","),u.company_address=this.company_address,u.lon=this.lon,u.lat=this.lat,u.user_type=this.user_type;var s=t.validation(u,a);if(console.log(s),s)return this.$Common.toast(s),!1;this.$Request.post(this.$api.user.user_company,u).then((function(n){o.$Common.toast(n.msg),1==n.code&&(o.user.user_type=2,e.setStorageSync("USERINFO",o.user),e.reLaunch({url:"recruit_msg"}))}))}}};n.default=a}).call(this,o("543d")["default"])},b877:function(e,n,o){"use strict";var t=o("9313"),a=o.n(t);a.a}},[["9aa1","common/runtime","common/vendor"]]]);