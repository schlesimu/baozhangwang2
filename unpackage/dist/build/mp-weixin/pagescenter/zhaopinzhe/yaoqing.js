(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagescenter/zhaopinzhe/yaoqing"],{"114c":function(o,n,e){"use strict";e.r(n);var t=e("d192"),i=e("bd29");for(var a in i)"default"!==a&&function(o){e.d(n,o,(function(){return i[o]}))}(a);e("755e");var c,s=e("f0c5"),l=Object(s["a"])(i["default"],t["b"],t["c"],!1,null,null,null,!1,t["a"],c);n["default"]=l.exports},"23c2":function(o,n,e){"use strict";(function(o){e("652a");t(e("66fd"));var n=t(e("114c"));function t(o){return o&&o.__esModule?o:{default:o}}wx.__webpack_require_UNI_MP_PLUGIN__=e,o(n.default)}).call(this,e("543d")["createPage"])},3279:function(o,n,e){"use strict";(function(o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{TabCur:1,scrollLeft:0,list:[],code:"H2F2T2G",lon:"",lat:"",ifShow:!0,user_nickname:"",companyInfo:"",IMG_URL:this.IMG_URL,showScare:!1,image:this.IMG_URL+"static/miniwechat/logo.png",providerList:[{name:"微信",id:"weixin",img:this.IMG_URL+"static/miniwechat/weixin.png",fSort:0},{name:"朋友圈",id:"weixin",type:"WXSenceTimeline",img:this.IMG_URL+"static/miniwechat/pengyouquan.png",fSort:1}],qrcodeUrl:""}},onLoad:function(){o.showLoading({}),this,this.get_user_info()},onShareAppMessage:function(n){return"button"===n.from&&console.log(n.target),{title:this.companyInfo.company_name,path:"pagesHome/index/job_detail?id="+o.getStorageSync("roleinfo").info.aid+"&zhaopin=zhaopin&lon="+this.lon+"&lat="+this.lat}},methods:{get_user_info:function(){var n=this;this.$Request.post(this.$api.operation.getCompanycode,{company_id:o.getStorageSync("roleinfo").info.aid}).then((function(e){o.hideLoading(),1==e.code&&(n.companyInfo=e.data.company,n.qrcodeUrl=e.data.url_Qrcode,n.lon=e.data.company.lon,n.lat=e.data.company.lat)})).catch((function(o){n.$Common.toast("网络错误，请退出重试")}))},shareCompany:function(){o.showModal({title:"请使用右上角按钮进行分享",icon:"none"})},saveQrcode:function(){var n=this,e=this;o.downloadFile({url:e.qrcodeUrl,success:function(e){var t=e.tempFilePath;200===e.statusCode?o.saveImageToPhotosAlbum({filePath:t,success:function(e){o.hideLoading(),n.$Common.toast("保存成功")},fail:function(e){o.hideLoading(),n.$Common.toast("保存失败,请确认已授权")}}):n.$Common.toast("二维码下载失败,请稍后重试")},fail:function(o){n.$Common.toast("二维码下载失败,请稍后重试"),console.log(o)}})},shareTap:function(n){0==n.fSort?o.share({provider:"weixin",scene:"WXSceneSession",type:5,imageUrl:this.qrcodeUrl,title:this.companyInfo.company_name,miniProgram:{id:"gh_66b0749ac265",path:"pagesHome/index/job_detail?id="+o.getStorageSync("roleinfo").info.aid+"&zhaopin=zhaopin&lon="+this.lon+"&lat="+this.lat,type:0,webUrl:"http://uniapp.dcloud.io"},success:function(o){console.log("success:"+JSON.stringify(o))},fail:function(o){console.log("fail:"+JSON.stringify(o))}}):o.share({provider:"weixin",scene:"WXSenceTimeline",type:0,href:this.qrcodeUrl,title:this.companyInfo.company_name,summary:"我正在使用人民保障网，赶紧跟我一起来体验吧！",imageUrl:this.qrcodeUrl,success:function(o){console.log("success:"+JSON.stringify(o))},fail:function(o){console.log("fail:"+JSON.stringify(o))}})},compress:function(n){return console.log("开始压缩"),new Promise((function(e){var t=plus.io.convertAbsoluteFileSystem(n.replace("file://",""));console.log("after"+t),plus.io.resolveLocalFileSystemURL(t,(function(t){t.file((function(t){console.log("getFile:"+JSON.stringify(t)),t.size>20480&&plus.zip.compressImage({src:n,dst:n.replace(".jpg","2222.jpg").replace(".JPG","2222.JPG"),width:"10%",height:"10%",quality:1,overwrite:!0},(function(o){console.log("success zip****"+o.size);var t=n.replace(".jpg","2222.jpg").replace(".JPG","2222.JPG");e(t)}),(function(n){o.showModal({content:"分享图片太大,需要请重新选择图片!",showCancel:!1})}))}))}),(function(n){console.log("Resolve file URL failed: "+n.message),o.showModal({content:"分享图片太大,需要请重新选择图片!",showCancel:!1})}))}))},download:function(){var n=this;o.showLoading(),o.downloadFile({url:this.qrcodeUrl,success:function(e){var t=e.tempFilePath;200===e.statusCode?o.saveImageToPhotosAlbum({filePath:t,success:function(e){o.hideLoading(),n.$Common.toast("保存成功")},fail:function(e){o.hideLoading(),n.$Common.toast("保存失败,请确认已授权")}}):n.$Common.toast("二维码下载失败,请稍后重试")},fail:function(o){n.$Common.toast("二维码下载失败,请稍后重试"),console.log(o)}})}}};n.default=e}).call(this,e("543d")["default"])},"755e":function(o,n,e){"use strict";var t=e("8d96"),i=e.n(t);i.a},"8d96":function(o,n,e){},bd29:function(o,n,e){"use strict";e.r(n);var t=e("3279"),i=e.n(t);for(var a in t)"default"!==a&&function(o){e.d(n,o,(function(){return t[o]}))}(a);n["default"]=i.a},d192:function(o,n,e){"use strict";var t;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return t}));var i=function(){var o=this,n=o.$createElement;o._self._c;o._isMounted||(o.e0=function(n){o.showScare=!1},o.e1=function(n){o.showScare=!1})},a=[]}},[["23c2","common/runtime","common/vendor"]]]);