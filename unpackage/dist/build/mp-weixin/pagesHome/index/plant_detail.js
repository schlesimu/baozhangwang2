(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesHome/index/plant_detail"],{"16f2":function(t,e,i){"use strict";i.r(e);var a=i("f49d"),n=i("dc48");for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("81df");var o,l=i("f0c5"),c=Object(l["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=c.exports},"68f9":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("a34a"));function n(t){return t&&t.__esModule?t:{default:t}}function s(t,e,i,a,n,s,o){try{var l=t[s](o),c=l.value}catch(r){return void i(r)}l.done?e(c):Promise.resolve(c).then(a,n)}function o(t){return function(){var e=this,i=arguments;return new Promise((function(a,n){var o=t.apply(e,i);function l(t){s(o,a,n,l,c,"next",t)}function c(t){s(o,a,n,l,c,"throw",t)}l(void 0)}))}}var l=function(){i.e("components/uni-nav-bar/uni-nav-bar").then(function(){return resolve(i("9cf3"))}.bind(null,i)).catch(i.oe)},c=function(){Promise.all([i.e("common/vendor"),i.e("components/jyf-parser/jyf-parser")]).then(function(){return resolve(i("28cc"))}.bind(null,i)).catch(i.oe)},r={components:{uniNavBar:l,jyfParser:c},data:function(){return{dotStyle:!0,StatusBar:this.StatusBar,title:"",like:!1,aid:"",previewImageUrl:"",showRedBox:!1,longitude:"",latitude:"",plant_detail:"",companyInfo:"",user_id:"",topDistance:0,isopen:!0,IMG_URL:this.IMG_URL,service_rules:"",inviteinfo:"",is_collection:!1,sign_up_page:!0,sign_status:0,job_collect:!1,posterPopup:!1,covers:[{latitude:"",longitude:"",iconPath:"../static/images/iconPath.png",width:"30",height:"30"}],voucher:"",pageOpen:"",cavansW:"",cavansH:"",posterH:"",posterH1:"",cavansH1:"",is_servicebroker:0,fs10:"",fs12:"",fs14:"",fs16:"",fs18:"",user_token:""}},onLoad:function(e){var i=this;this.cavansW=t.upx2px(710),this.cavansH=t.upx2px(1200),this.cavansH1=t.upx2px(800),this.posterH=t.upx2px(1300),this.posterH1=t.upx2px(900),this.fs10=t.upx2px(20),this.fs12=t.upx2px(24),this.fs14=t.upx2px(28),this.fs16=t.upx2px(32),this.fs18=t.upx2px(36),t.showLoading({}),this.title=e.name,this.is_servicebroker=e.is_servicebroker,e.scene?this.aid=e.scene:this.aid=e.id,this.pageOpen=e.page,"signUp"==e.page&&(this.sign_up_page=!1),setTimeout((function(){i.get_detail()}),500),this.get_plant_type()},onShow:function(){var e=this;t.$on("follow",(function(t){e.is_collection=t.msg})),this.$refs.shareType&&this.$refs.shareType.close(),this.user_token=t.getStorageSync("USERINFO").user_token},onUnload:function(){t.$off("follow"),this.$refs.shareType.close()},onPageScroll:function(t){this.topDistance=t.scrollTop},onShareAppMessage:function(t){return"button"===t.from&&console.log(t.target),{title:this.plant_detail.name+" "+this.plant_detail.min_salary+"-"+this.plant_detail.max_salary+"/月 "+this.plant_detail.fan_price+"/"+this.plant_detail.fan_type,path:"pagesHome/index/plant_detail?id="+this.aid+"&longitude="+this.longitude+"&latitude="+this.latitude}},onShareTimeline:function(){var t="/static/images/logo.png";return{title:this.plant_detail.name+" "+this.plant_detail.min_salary+"-"+this.plant_detail.max_salary+"/月 "+this.plant_detail.fan_price+"/"+this.plant_detail.fan_type,imageUrl:t,query:"id="+this.aid+"&longitude="+this.longitude+"&latitude="+this.latitude}},methods:{openPop:function(){this.$refs.txtPopup&&this.$refs.txtPopup.open()},get_plant_type:function(){var t=this;this.$Request.get(this.$api.index.get_fuli_info,{}).then((function(e){1==e.code&&(t.voucher=e.data.voucher)}))},toChat:function(){var e=this,i=t.getStorageSync("USERINFO");if(t.getStorageSync("USERINFO").user_token)if(t.$emit("jump",{}),i.id==this.plant_detail.servicebroker.user_id)this.$Common.toast("您为本区经纪人，不可与自己聊天");else{if(0==this.isopen)return;this.isopen=!1,setTimeout((function(){e.isopen=!0}),3e3),t.navigateTo({url:"../../pagesmessage/userMsg?kfid="+this.plant_detail.servicebroker.user_id+"&userName="+this.plant_detail.servicebroker.agent_name+"&job_position_id="+this.plant_detail.aid,animationDuration:300})}else this.$refs.txtPopup&&this.$refs.txtPopup.close(),this.$Common.toast("登录后才能聊天哦"),setTimeout((function(){t.navigateTo({url:"../../pagessignup/wechat/wxlog"})}),100)},gomessage:function(){var e=this,i=t.getStorageSync("USERINFO");if(t.getStorageSync("userToken")||(this.$Common.toast("请先登录"),setTimeout((function(){t.navigateTo({url:"../../pagessignup/wechat/wxlog"})}),100)),t.$emit("jump",{}),i.id==this.plant_detail.user_id)this.$Common.toast("此职位为自己发布职位，不可沟通");else{if(0==this.isopen)return;this.isopen=!1,setTimeout((function(){e.isopen=!0}),3e3),t.navigateTo({url:"../../pagesmessage/userMsg?kfid="+this.user_id+"&userName="+this.plant_detail.company.company_name+"&job_position_id="+this.plant_detail.aid,animationDuration:300})}},call_phone:function(){var e=t.getStorageSync("USERINFO");e.id==this.plant_detail.user_id?this.$Common.toast("此职位为自己发布职位，不可沟通"):t.makePhoneCall({phoneNumber:this.plant_detail.company.phone})},lookService:function(t){1==this.is_servicebroker?this.$refs.isShow&&this.$refs.isShow.open():this.$Common.toast("门店服务经纪人才可查看")},call:function(e){t.makePhoneCall({phoneNumber:e})},goDownLoad:function(){window.location.href=this.inviteinfo.invite_url},copy:function(e){t.setClipboardData({data:e,showToast:!1,success:function(){t.showToast({title:"已复制",icon:"none",duration:2e3})}})},choose_location:function(){var e=this;t.openLocation({latitude:Number(e.plant_detail.lat),longitude:Number(e.plant_detail.lon),name:e.plant_detail.address,success:function(t){},fail:function(t){this.$Common.toast("网络错误，请稍后重试")}})},get_detail:function(){var e=this;this.$Common.getLocation((function(i){e.$Request.post(e.$api.index.get_job_detail,{aid:e.aid,longitude:i.longitude,latitude:i.latitude,user_id:t.getStorageSync("USERINFO").id||0}).then((function(i){1==i.code?(t.hideLoading(),e.plant_detail=i.data,0!=i.data.red_envelope_type&&(e.showRedBox=!0),0!=i.data.driver_name&&null!=i.data.driver_name||(e.plant_detail.driver_name=""),0!=i.data.finance_manager_name&&null!=i.data.finance_manager_name||(e.plant_detail.finance_manager_name=""),0!=i.data.resident_manager_name&&null!=i.data.resident_manager_name||(e.plant_detail.resident_manager_name=""),0!=i.data.driver_phone&&null!=i.data.driver_name||(e.plant_detail.driver_phone=""),0!=i.data.finance_manager_phone&&null!=i.data.finance_manager_phone||(e.plant_detail.finance_manager_phone=""),0!=i.data.resident_manager_phone&&null!=i.data.resident_manager_phone||(e.plant_detail.resident_manager_phone=""),e.companyInfo=i.data.company,1==i.data.company.is_collection?e.is_collection=!0:e.is_collection=!1,1==i.data.is_collection?e.job_collect=!0:e.job_collect=!1,i.data.is_red_share,e.user_id=i.data.user_id,e.covers[0].latitude=Number(i.data.lat),e.covers[0].longitude=Number(i.data.lon),e.getagreement(),e.get_shareUrl()):t.showToast({title:i.msg,icon:"none"})})).catch((function(t){e.$Common.toast("请登录后重试")}))}))},confirm:function(){this.$refs.addPop.close()},goComplant:function(){t.navigateTo({url:"../complaint?compand_id="+this.aid+"&job_id="+this.plant_detail.company.aid+"&job_type=1"})},toBroker:function(){t.navigateTo({url:"broker_detail?id="+this.plant_detail.servicebroker.user_id+"&lon="+this.plant_detail.lon+"&lat="+this.plant_detail.lat})},posterImage:function(){var e=this;t.showLoading({title:"简章生成中...",mask:!0});this.$Request.post(this.$api.common.postGetPosterCode,{aid:this.plant_detail.aid}).then((function(t){if(console.log("分享二维码",t),1==t.code){var i=t.data.base64;e.$Common.base64ToPath(i).then((function(t){console.log("图片临时路径",t),e.shareCode=t,e.initCanvas()})).catch((function(t){console.log("保存临时二维码失败",t),e.$Common.toast("分享失败")}))}else e.$Common.toast("分享失败")})).catch((function(t){console.log("获取分享二维码失败",t)}))},initCanvas:function(){var e=this;this.ctx=t.createCanvasContext("poster-canvas",this),setTimeout((function(){e.drawBack()}),200)},drawBack:function(){var t=this,e=this.ctx;e.lineJoin="round",e.setFillStyle("#FFFF01"),1==this.plant_detail.station_type?e.fillRect(0,0,this.cavansW,this.cavansH):e.fillRect(0,0,this.cavansW,this.cavansH1),e.setFillStyle("#0201F3"),e.fillRect(0,0,this.cavansW,.065*this.cavansH),e.setFillStyle("#0201F3"),e.fillRect(0,this.cavansH-.065*this.cavansH,this.cavansW,.065*this.cavansH),e.setFillStyle("#FFFF01"),e.textAlign="center",e.font="bold 18px sans-serif",e.fillText("长按图片进入小程序查看更多信息",.5*this.cavansW,this.cavansH-13),e.draw(!1,(function(){console.log("背景绘制成功"),t.drawGoodsImage()}))},drawGoodsImage:function(){var e=this;return o(a.default.mark((function i(){var n;return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n=e.ctx,i.next=3,new Promise((function(i){t.getImageInfo({src:e.IMG_URL+"static/miniwechat/logo.jpg",success:function(t){n.drawImage(t.path,.028*e.cavansW,.08*e.cavansH,.075*e.cavansH,.075*e.cavansH),i()},fail:function(e){t.hideLoading(),console.log("logo图片绘制失败",e)}})}));case 3:n.draw(!0,(function(){console.log("logo图片绘制成功"),e.drawUserInfo()}));case 4:case"end":return i.stop()}}),i)})))()},drawUserInfo:function(){var t=this;return o(a.default.mark((function e(){var i;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=t.ctx,i.setFillStyle("#FFFF01"),i.textAlign="center",i.font="bold "+t.fs16+"px courier",i.fillText("打工就上人人保障网 第三方保障平台人人保障网",.5*t.cavansW,.041*t.cavansH),i.setFillStyle("#000000"),i.font="bold "+t.fs12+"px courier",1==t.is_servicebroker?i.fillText(t.plant_detail.servicebroker_user.agent_name,.5*t.cavansW,.125*t.cavansH):i.fillText(t.plant_detail.company.company_name,.5*t.cavansW,.125*t.cavansH),i.draw(!0,(function(){t.drawGoodsInfo()}));case 9:case"end":return e.stop()}}),e)})))()},drawGoodsInfo:function(){var t=this,e=this.ctx;e.textAlign="left",e.setFillStyle("#ffffff"),e.fillRect(.028*this.cavansW,.166*this.cavansH,.94*this.cavansW,.136*this.cavansH),e.setFontSize(.045*this.cavansW),e.setFillStyle("#000000"),e.font="bold "+this.fs16+"px times",e.fillText(this.plant_detail.name,.056*this.cavansW,.203*this.cavansH),e.setFillStyle("red"),e.font="bold "+.033*this.cavansW+"px times",this.plant_detail.fan_type&&this.plant_detail.fan_price&&(e.setFontSize(.033*this.cavansW),e.fillText(this.plant_detail.fan_type+"："+this.plant_detail.fan_price+"元",.056*this.cavansW,.233*this.cavansH)),e.setFontSize(.033*this.cavansW),e.setFillStyle("red"),e.font="bold "+this.fs12+"px times",e.fillText(this.plant_detail.min_salary+"-"+this.plant_detail.max_salary+"元/月",.507*this.cavansW,.233*this.cavansH),e.setFillStyle("#000000"),e.setFontSize(this.fs12),e.fillText(this.plant_detail.city,.056*this.cavansW,.2581*this.cavansH),e.fillText(this.plant_detail.experience,.323*this.cavansW,.2581*this.cavansH),e.fillText(this.plant_detail.education_name,.563*this.cavansW,.2581*this.cavansH),e.fillText(this.plant_detail.age+"岁",.802*this.cavansW,.2581*this.cavansH),e.fillText("已报名"+this.plant_detail.apply_numbers+"人",.056*this.cavansW,.29*this.cavansH),e.setFillStyle("#0201F3"),e.fillText("已向平台支付保证金"+this.plant_detail.money+"元",.45*this.cavansW,.29*this.cavansH),e.draw(!0,(function(){console.log("职位信息绘制成功"),t.drawAddressInfo()}))},drawAddressInfo:function(){var t=this,e=this.ctx;e.setFillStyle("#000000"),e.font="bold "+this.fs12+"px times";var i="";if(e.fillText("详细地址："+this.plant_detail.address.substr(0,23),.028*this.cavansW,.33*this.cavansH),this.plant_detail.address.length>25?(e.fillText(this.plant_detail.address.substr(23,50),.028*this.cavansW,.354*this.cavansH),i=.354*this.cavansH):i=.33*this.cavansH,1==this.is_servicebroker){e.fillText("经纪人电话：",.028*this.cavansW,i+.025*this.cavansH),e.setFillStyle("#1B90FF"),e.font="bold "+this.fs12+"px times";var a="";a=this.plant_detail.servicebroker_user.phone,e.fillText(a,.217*this.cavansW,i+.025*this.cavansH),e.setFillStyle("#000000");var n="";n=this.plant_detail.servicebroker_user.wx,e.fillText("经纪人微信号：",.507*this.cavansW,i+.025*this.cavansH),e.font="bold "+this.fs12+"px times",e.setFillStyle("#1B90FF"),e.fillText(n,.732*this.cavansW,i+.025*this.cavansH)}else{e.fillText("报名电话：",.028*this.cavansW,i+.025*this.cavansH),e.font="bold "+this.fs12+"px times",e.setFillStyle("#1B90FF");var s="";s=this.plant_detail.company.phone,e.fillText(s,.197*this.cavansW,i+.025*this.cavansH),e.setFillStyle("#000000");var o="";1==this.is_servicebroker&&(o=this.plant_detail.servicebroker.wx,console.log(o),e.fillText("微信号：",.507*this.cavansW,i+.025*this.cavansH),e.font="bold "+this.fs12+"px times",e.setFillStyle("#1B90FF"),e.fillText(wx,.647*this.cavansW,i+.025*this.cavansH))}e.draw(!0,(function(){console.log("职位地址信息绘制成功"),t.drawdetailInfo(i)}))},removeHTMLTag:function(t){return t=t.replace(/<\/?[^>]*>/g,""),t=t.replace(/[ | ]*\n/g,"\n"),t=t.replace(/\n[\s| | ]*\r/g,"\n"),t=t.replace(/ /gi,""),t=t.replace(new RegExp("&nbsp;","g"),""),t},drawdetailInfo:function(t){var e=this,i=this.removeHTMLTag(this.plant_detail.salary_description),a=this.removeHTMLTag(this.plant_detail.accommodation_introduction),n=this.removeHTMLTag(this.plant_detail.employment_conditions),s=this.removeHTMLTag(this.plant_detail.job_description),o=i.length,l=a.length,c=n.length,r=s.length,h=this.ctx;h.setFontSize(this.fs12),h.setFillStyle("#0201F3"),h.font="bold "+this.fs12+"px times",1==this.plant_detail.station_type?h.fillText("薪资说明",.028*this.cavansW,t+.05*this.cavansH):h.fillText("职位描述",.028*this.cavansW,t+.05*this.cavansH),h.setFontSize(this.fs10),h.setFillStyle("#000000");for(var d=Math.ceil(o/36),p=0;p<d;p++)p<5&&1==this.plant_detail.station_type&&h.fillText(i.substr(36*p,36),.028*this.cavansW,t+.075*this.cavansH+p*this.cavansH*.023),3==this.plant_detail.station_type&&h.fillText(i.substr(36*p,36),.028*this.cavansW,t+.075*this.cavansH+p*this.cavansH*.023);d>5&&1==this.plant_detail.station_type&&(h.setFillStyle("red"),h.fillText("更多信息，请扫码查看",.028*this.cavansW,t+.072*this.cavansH+5*this.cavansH*.023));var u="";if(u=d>5?t+.075*this.cavansH+5*this.cavansH*.023+.023*this.cavansH:t+.075*this.cavansH+(d-1)*this.cavansH*.023+.023*this.cavansH,1==this.plant_detail.station_type){var f="",_="";if(a){h.setFillStyle("#0201F3"),h.font="bold "+this.fs12+"px times",h.fillText("食宿介绍",.028*this.cavansW,u),h.setFontSize(this.fs10),h.setFillStyle("#000000");for(var v=Math.ceil(l/36),m=0;m<v;m++)m<5&&h.fillText(a.substr(36*m,36),.028*this.cavansW,u+15+15*m);v>5&&(h.setFillStyle("red"),h.fillText("更多信息，请扫码查看",.028*this.cavansW,u+.028*this.cavansW+5*this.cavansH*.023)),f=v>5&&v>0?u+15+75+.023*this.cavansH:u+15+15*(v-1)+.023*this.cavansH}if(n){h.setFillStyle("#0201F3"),h.font="bold "+this.fs12+"px times",h.fillText("录用条件",.028*this.cavansW,f),h.setFontSize(this.fs10),h.setFillStyle("#000000");for(var g=Math.ceil(c/36),y=0;y<g;y++)o>180||l>180||r>180?y<5&&h.fillText(n.substr(36*y,36),.028*this.cavansW,f+15+15*y):h.fillText(n.substr(36*y,36),.028*this.cavansW,f+15+15*y);g>5&&(o>180||l>180||r>180)&&(h.setFillStyle("red"),h.fillText("更多信息，请扫码查看",.028*this.cavansW,f+.023*this.cavansH+75)),_=g>5&&(o>180||l>180||r>180)?f+15+75+.023*this.cavansH:f+15+15*(g-1)+.023*this.cavansH}if(s){h.setFillStyle("#0201F3"),h.font="bold "+this.fs12+"px times",h.fillText("岗位介绍",.028*this.cavansW,_),h.setFontSize(this.fs10),h.setFillStyle("#000000");for(var x=Math.ceil(r/36),T=0;T<x;T++)o>180||l>180||c>180?T<4&&h.fillText(s.substr(36*T,36),.028*this.cavansW,_+.023*this.cavansH+15*T):h.fillText(s.substr(36*T,36),.028*this.cavansW,_+.023*this.cavansH+15*T);x>4&&(o>180||l>180||c>180)&&(h.setFillStyle("red"),h.fillText("更多信息，请扫码查看",.028*this.cavansW,_+.023*this.cavansH+60))}}h.draw(!0,(function(){console.log("职位其他介绍信息绘制成功"),e.drawCodeInfo()}))},drawCodeInfo:function(){var e=this;return o(a.default.mark((function i(){var n;return a.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return console.log(e.shareCode,"this.shareCode"),n=e.ctx,i.next=4,new Promise((function(i){t.getImageInfo({src:e.shareCode,success:function(t){console.log("二维码信息",t);t.width,t.height,t.path;n.drawImage(t.path,.845*e.cavansW,.08*e.cavansH,.075*e.cavansH,.075*e.cavansH),i()},fail:function(i){console.log("二维码绘制失败",i),t.hideLoading(),e.$Common.toast("获取二维码信息失败")}})}));case 4:n.draw(!0,(function(){console.log("二维码绘制成功"),e.exportImage()}));case 5:case"end":return i.stop()}}),i)})))()},exportImage:function(){var e=this;t.canvasToTempFilePath({canvasId:"poster-canvas",success:function(i){t.hideLoading(),console.log("导出图片成功",i),e.previewImageUrl=i.tempFilePath,e.posterPopup=!0,e.$refs.shareType.close()},fail:function(e){t.hideLoading(),console.log("导出图片失败",e)}},this)},saveImage:function(){var e=this;t.saveImageToPhotosAlbum({filePath:this.previewImageUrl,success:function(t){console.log(t),e.$Common.toast("保存成功"),e.posterPopup=!1,e.close()}})},drawText:function(t,e,i,a,n){var s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:2,o=arguments.length>6&&void 0!==arguments[6]?arguments[6]:"#333333",l=arguments.length>7&&void 0!==arguments[7]?arguments[7]:18;t.setFillStyle(o),t.setFontSize(l);for(var c=e.split(""),r="",h=0,d=0,p=c.length;d<p;d++){var u=r+c[d],f=t.measureText(u),_=f.width;_>n&&d>0&&h<s?(t.fillText(r,i,a),h+=1,r=c[d],a+=1.5*l):r=u}h<s&&t.fillText(r,i,a)},get_shareUrl:function(){var e=this;this.$Request.post(this.$api.user.get_invite).then((function(i){1==i.code?e.inviteinfo=i.data:t.showToast({title:i.msg,icon:"none"})}))},previewImage:function(e){t.previewImage({current:e,urls:[e]})},godetail:function(e){var i=this;0!=this.isopen&&(this.isopen=!1,setTimeout((function(){i.isopen=!0}),3e3),t.navigateTo({url:"job_detail?id="+e+"&lon="+this.plant_detail.lon+"&lat="+this.plant_detail.lat+"&follow="+this.is_collection}))},apply_job:function(){var e=this;if(!t.getStorageSync("userToken"))return this.$Common.toast("登录之后才能报名哦"),void setTimeout((function(){t.navigateTo({url:"../../pagessignup/wechat/wxlog"})}),300);0!=this.isopen&&(this.isopen=!1,setTimeout((function(){e.isopen=!0}),3e3),this.$Request.post(this.$api.help_red.is_verification,{dask_id:this.aid,type:1}).then((function(i){1==i.code?t.navigateTo({url:"../sign_up?company_id="+e.companyInfo.aid+"&job_id="+e.aid+"&red_envelope_type="+e.plant_detail.red_envelope_type}):t.showToast({title:i.msg,icon:"none"})})))},back:function(){"open"==this.pageOpen?t.reLaunch({url:"/pages/index/index"}):t.navigateBack()},yulan:function(t,e){this.$Common.lookImg(this.plant_detail.ads_imgas,e)},collect:function(e,i){this.$Request.post(this.$api.company.set_collection,{collect_id:e,type:i}).then((function(e){console.log(e,""),t.showToast({title:e.msg,icon:"none"}),e.code}))},follow:function(){if(!t.getStorageSync("userToken"))return this.$Common.toast("请先登录"),void setTimeout((function(){t.navigateTo({url:"../../pagessignup/wechat/wxlog"})}),300);this.collect(this.companyInfo.aid,1),t.$emit("myCollect",{}),this.is_collection=!this.is_collection},colloct_job:function(){if(!t.getStorageSync("userToken"))return this.$Common.toast("请先登录"),void setTimeout((function(){t.navigateTo({url:"../../pagessignup/wechat/wxlog"})}),300);this.collect(this.aid,2),t.$emit("myCollect",{}),this.job_collect=!this.job_collect},share:function(){this.$refs.shareType.open()},close:function(){this.$refs.shareType.close(),this.$refs.posterPopup.close()},goPay:function(){var e=this;0!=this.isopen&&(this.isopen=!1,setTimeout((function(){e.isopen=!0}),1500),this.$Request.post(this.$api.common.singupPlay,{company_id:this.plant_detail.company_id,job_position_id:this.plant_detail.aid}).then((function(i){1==i.code?t.navigateTo({url:"../../pagescenter/zhaopinzhe/fabu?price="+e.plant_detail.user_money+"&order_sn="+i.data.order_sn}):e.$Common.toast(i.msg)})))},helpEdd:function(){var e=this;if(3!=this.plant_detail.is_red_share)return t.getStorageSync("userToken")?void(0!=this.isopen&&(this.isopen=!1,setTimeout((function(){e.isopen=!0}),1500),this.$Request.post(this.$api.help_red.help_getHb,{delivery_id:"",job_position_id:this.plant_detail.aid,company_id:this.plant_detail.company.aid}).then((function(i){1==i.code?t.navigateTo({url:"/pagescenter/userypz/share_help_list?red_envelope_aid="+i.data.delivery_id+"&job_title="+i.data.name+"&salary_money="+i.data.salary_money+"&jobImage="+i.data.image}):e.$refs.addPop.open()})))):(this.$Common.toast("登录之后才能报名哦"),void setTimeout((function(){t.navigateTo({url:"../../pagessignup/wechat/wxlog"})}),300));this.$Common.toast("红包已过期，请重新报名领取")},getagreement:function(){var t=this;this.$Request.post(this.$api.common.agreenment).then((function(e){1==e.code&&(t.service_rules=e.data.service_rules)}))},sharePop:function(){t.share({provider:"weixin",scene:"WXSceneSession",type:2,imageUrl:this.previewImageUrl,success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){this.$Common.toast("网络错误，请稍后再试"),console.log("fail:"+JSON.stringify(t))}})},wefriend:function(){t.share({provider:"weixin",scene:"WXSceneSession",type:5,imageUrl:this.plant_detail.imgas_thumb+"?x-oss-process=style/compression",title:this.plant_detail.name+" "+this.plant_detail.min_salary+"-"+this.plant_detail.max_salary+"/月 "+this.plant_detail.fan_price+"/"+this.plant_detail.fan_type,miniProgram:{id:"gh_66b0749ac265",path:"pagesHome/index/plant_detail?id="+this.aid+"&longitude="+this.longitude+"&latitude="+this.latitude,type:0,webUrl:"http://uniapp.dcloud.io"},success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){this.$Common.toast("网络错误，请稍后再试")}})},wecircle:function(){t.share({provider:"weixin",scene:"WXSenceTimeline",type:0,href:"https://app.chongdarenli.com/h5/#/pagesHome/index/plant_detail?id="+this.aid+"&longitude="+this.longitude+"&latitude="+this.latitude,title:this.plant_detail.name+" "+this.plant_detail.min_salary+"-"+this.plant_detail.max_salary+"/月 "+this.plant_detail.fan_price+"/"+this.plant_detail.fan_type,summary:"我正在使用人民保障网，赶紧跟我一起来体验吧！",imageUrl:this.plant_detail.imgas_thumb+"?x-oss-process=style/compression",success:function(t){console.log("success:"+JSON.stringify(t))},fail:function(t){this.$Common.toast("网络错误，请稍后再试")}})},toPage:function(){var e=this;0!=this.isopen&&(this.isopen=!1,setTimeout((function(){e.isopen=!0}),1500),t.navigateTo({url:"../../pagescenter/zhaopinzhe/play_video?url="+this.plant_detail.video}))}}};e.default=r}).call(this,i("543d")["default"])},"699ba":function(t,e,i){"use strict";(function(t){i("652a");a(i("66fd"));var e=a(i("16f2"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},"81df":function(t,e,i){"use strict";var a=i("ad14"),n=i.n(a);n.a},ad14:function(t,e,i){},dc48:function(t,e,i){"use strict";i.r(e);var a=i("68f9"),n=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},f49d:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var a={jyfParser:function(){return Promise.all([i.e("common/vendor"),i.e("components/jyf-parser/jyf-parser")]).then(i.bind(null,"28cc"))},uniPopup:function(){return i.e("components/uni-popup/uni-popup").then(i.bind(null,"b7f7"))}},n=function(){var t=this,e=t.$createElement,i=(t._self._c,t.plant_detail.servicebroker&&t.plant_detail.servicebroker?(t.plant_detail.servicebroker.wx||"0").replace(/[\W\d\w]/g,"*"):null),a=t.plant_detail.servicebroker&&t.plant_detail.servicebroker?(t.plant_detail.servicebroker.phone||"0").replace(/(\d{4})\d{3}(\d{4})/,"$1****$2"):null;t._isMounted||(t.e0=function(e){t.posterPopup=!1}),t.$mp.data=Object.assign({},{$root:{g0:i,g1:a}})},s=[]}},[["699ba","common/runtime","common/vendor"]]]);