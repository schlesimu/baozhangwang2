(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesHome/sign_up"],{"14d6":function(e,n,t){"use strict";(function(e){t("652a");i(t("66fd"));var n=i(t("50f6"));function i(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t("543d")["createPage"])},"150d":function(e,n,t){"use strict";t.r(n);var i=t("4184"),o=t.n(i);for(var s in i)"default"!==s&&function(e){t.d(n,e,(function(){return i[e]}))}(s);n["default"]=o.a},2178:function(e,n,t){"use strict";var i=t("84d7"),o=t.n(i);o.a},4184:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=function(){t.e("components/ben-upload/ben-upload").then(function(){return resolve(t("df45"))}.bind(null,t)).catch(t.oe)},o=t("5745"),s={components:{benUpload:i},data:function(){return{sexIndex:1,sex:[{value:1,label:"男"},{value:2,label:"女"}],IMG_URL:this.IMG_URL,img:[{pic:"",id:"",content:"上传身份证照片",desc:"上传身份证照片正面"},{pic:"",id:"",content:"上传身份证照片",desc:"上传身份证照片反面"}],isopen:!0,color:"#0289FF",user_type:1,nickname:"",company_id:"",job_id:"",phone:"",isDefault:1,checked:!0,red_envelope_type:""}},onLoad:function(n){this.company_id=n.company_id,this.job_id=n.job_id,this.red_envelope_type=n.red_envelope_type,this.phone=e.getStorageSync("USERINFO").mobile},methods:{chooseImg:function(e){var n=this;this.$Request.uploadImg((function(t){n.$Common.toast(t.msg),1==t.code&&(n.img[e].pic=t.data[0].path,n.img[e].id=t.data[0].id)}))},yulan:function(e){this.$Common.lookImg(e)},nicknameInput:function(e){e&&e.length>6&&this.$Common.toast("姓名不能超过六个字符")},nickblur:function(e){e&&e.length<2&&this.$Common.toast("姓名不能少于2个字符")},chooseSex:function(e,n){this.sexIndex=e.value,console.log(this.sexIndex)},bindPickerChange:function(e){this.sexIndex=e.detail.value},switch1Change:function(e){e.target.value?(this.isDefault=1,this.checked=!0):(this.isDefault=0,this.checked=!1)},formSubmit:function(n){var t=this;console.log(n.detail.value);var i=[{name:"user_nickname",rule:["required","minLength:2","maxLength:6"],msg:["请输入姓名","姓名必须2个或以上字符","姓名不能超过6个字符"]},{name:"phone",rule:["required"],msg:["请输入手机号"]}],s=n.detail.value,a=o.validation(s,i);return a?(this.$Common.toast(a),!1):/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone)?void(0!=this.isopen&&(this.isopen=!1,setTimeout((function(){t.isopen=!0}),1500),this.$Request.post(this.$api.common.singupPlay,{company_id:this.company_id,job_position_id:this.job_id,username:this.nickname,sex:this.sexIndex,phone:this.phone,card_front_id:this.img[0].id,card_side_id:this.img[1].id,is_uplode:this.isDefault}).then((function(n){1==n.code?0==t.red_envelope_type?(t.$Common.toast("报名成功"),setTimeout((function(){e.navigateBack({})}),300)):e.redirectTo({url:"sign_success?company_id="+t.company_id+"&job_id="+t.job_id+"&delivery_id="+n.data.delivery_id}):t.$Common.toast(n.msg)})))):(this.$Common.toast("请输入正确的手机号"),!1)}}};n.default=s}).call(this,t("543d")["default"])},"50f6":function(e,n,t){"use strict";t.r(n);var i=t("6fd3"),o=t("150d");for(var s in o)"default"!==s&&function(e){t.d(n,e,(function(){return o[e]}))}(s);t("2178");var a,u=t("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);n["default"]=c.exports},"6fd3":function(e,n,t){"use strict";var i;t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return i}));var o=function(){var e=this,n=e.$createElement;e._self._c},s=[]},"84d7":function(e,n,t){}},[["14d6","common/runtime","common/vendor"]]]);