(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagescenter/userypz/resume_attachment"],{"0c29":function(t,i,n){"use strict";var e=n("1f9f"),a=n.n(e);a.a},"1f9f":function(t,i,n){},"38a0":function(t,i,n){"use strict";var e;n.d(i,"b",(function(){return a})),n.d(i,"c",(function(){return o})),n.d(i,"a",(function(){return e}));var a=function(){var t=this,i=t.$createElement;t._self._c},o=[]},"98b1":function(t,i,n){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n={data:function(){return{imgList:[],maxNum:9,imgList_path:[],IMG_URL:this.IMG_URL}},onLoad:function(){this.user=t.getStorageSync("USERINFO"),t.showLoading({}),this.getInfo(),this.imgList_path=[]},methods:{getInfo:function(){var i=this;this.$Request.post(this.$api.company.upload_resume,{type:0}).then((function(n){if("1"==n.code){if(t.hideLoading(),""==n.data)return void(i.imgList=[]);i.imgList=n.data.resume_id_url,i.imgList.map((function(t){i.imgList_path.push(t.path)}))}}))},chooseImg:function(){var t=this;this.$Request.uploadImg((function(i){if(t.$Common.toast(i.msg),1==i.code){var n=[];n=i.data,t.imgList_path=[],t.imgList=t.imgList.concat(n),t.imgList.map((function(i){t.imgList_path.push(i.path)})),console.log(t.imgList,"图片")}}),this.maxNum)},yulan:function(t,i){this.$Common.lookImg(this.imgList_path,i)},DelImg:function(i,n){var e=this;t.showModal({content:"确定要删除吗？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&e.imgList.splice(n,1)}})},sub:function(){var i=this;if(""==this.imgList)return this.$Common.toast("请先上传简历照片"),!1;var n=[];this.imgList&&this.imgList.map((function(t){n.push(t.id)})),this.$Request.post(this.$api.company.upload_resume,{type:1,resume_id:n}).then((function(n){i.$Common.toast(n.msg),"1"==n.code&&(t.$emit("authen",{}),setTimeout((function(){t.navigateBack({})}),600))}))}}};i.default=n}).call(this,n("543d")["default"])},a66a:function(t,i,n){"use strict";n.r(i);var e=n("38a0"),a=n("cab3");for(var o in a)"default"!==o&&function(t){n.d(i,t,(function(){return a[t]}))}(o);n("0c29");var s,u=n("f0c5"),c=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],s);i["default"]=c.exports},cab3:function(t,i,n){"use strict";n.r(i);var e=n("98b1"),a=n.n(e);for(var o in e)"default"!==o&&function(t){n.d(i,t,(function(){return e[t]}))}(o);i["default"]=a.a},db09:function(t,i,n){"use strict";(function(t){n("652a");e(n("66fd"));var i=e(n("a66a"));function e(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("543d")["createPage"])}},[["db09","common/runtime","common/vendor"]]]);