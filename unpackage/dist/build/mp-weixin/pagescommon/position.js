(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagescommon/position"],{"64ac":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return a})),e.d(i,"a",(function(){return n}));var o=function(){var t=this,i=t.$createElement;t._self._c},a=[]},"66d4":function(t,i,e){"use strict";(function(t){e("652a");n(e("66fd"));var i=n(e("6eb5"));function n(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(i.default)}).call(this,e("543d")["createPage"])},"6eb5":function(t,i,e){"use strict";e.r(i);var n=e("64ac"),o=e("b35f");for(var a in o)"default"!==a&&function(t){e.d(i,t,(function(){return o[t]}))}(a);e("dde3");var s,u=e("f0c5"),c=Object(u["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);i["default"]=c.exports},"97c2":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;n(e("60a2"));function n(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar,IMG_URL:this.IMG_URL,hidden:!1,listCurID:"",list:[],listCur:"A",getFromList:[],city:"",user_id:t.getStorageSync("USERINFO").id,addressName:"",items:"",type:0,isFalse:!1,city_id:"",cityId:"",positioncity:"",lon:"",lat:"",longitude:"",latitude:"",page:""}},onLoad:function(t){this.positioncity=t.city||"全国",this.page=t.page,this.city_id=t.cityid,this.longitude=t.longitude,this.latitude=t.latitude,"undefined"==this.positioncity&&(this.positioncity=this.addressName);for(var i=[],e=0;e<26;e++)i[e]={},i[e].name=String.fromCharCode(65+e);this.list=i,this.listCur=i[0],this.getCitylist(),this.getlatlong()},onReady:function(){var i=this;t.createSelectorQuery().select(".indexBar-box").boundingClientRect((function(t){i.boxTop=t.top})).exec(),t.createSelectorQuery().select(".indexes").boundingClientRect((function(t){i.barTop=t.top})).exec()},methods:{getCitylist:function(){var t=this;this.$Request.post(this.$api.msg.getCity,{shortname:this.city,type:this.type}).then((function(i){1==i.code?(t.getFromList=i.data,t.list=t.getFromList,t.listCur=t.getFromList[0]):t.$Common.toast(i.msg)})).catch((function(i){t.$Common.toast("网络错误，请稍后重试")}))},cityinput:function(){""!=this.city?this.type=1:this.type=0,this.getCitylist()},input:function(){this.cityinput()},getlatlong:function(){var t=this;this.$Common.getLocation((function(i){var e=[i.longitude,i.latitude];t.lat=i.latitude,t.lon=i.longitude,console.log(i,"========"),t.$Request.post(t.$api.msg.cityPosition,{user_id:t.user_id,cid:"",lat:e}).then((function(i){t.addressName=i.data.name,t.cityId=i.data.id,t.longitude=i.data.lng,t.latitude=i.data.lat}))}))},setDaty:function(t,i){this.isFalse=!0,this.position_dity(t,i)},changeCity:function(i,e){var n={id:i,name:e,lng:this.longitude,lat:this.latitude};"homePage"==this.page?t.$emit("countryHome",n):t.$emit("country",n),this.$Common.toast("切换成功"),setTimeout((function(){t.navigateBack({})}),500)},chooseCity:function(i,e){var n={id:i,name:e,lng:this.longitude,lat:this.latitude};"homePage"==this.page?t.$emit("countryHome",n):t.$emit("country",n),this.$Common.toast("切换成功"),setTimeout((function(){t.navigateBack({})}),500)},position_dity:function(i,e){var n=this;this.isFalse&&this.$Common.confirm("是否切换？",(function(){t.navigateTo({url:"area_list?city_id="+i+"&page="+n.page})}))},CustomBars:function(i){var e=this;i.level<3?e.$Common.confirm("是否切换？",(function(){t.navigateTo({url:"area_list?city_id="+i.areaId+"&page="+e.page})})):("homePage"==this.page?t.$emit("areaHome",i):t.$emit("area",i),this.$Common.toast("切换成功"),setTimeout((function(){t.navigateBack({delta:1})}),500))},getCur:function(t){this.hidden=!1,this.listCur=this.list[t.target.id].name},setCur:function(t){var i=this;this.hidden=!0,setTimeout((function(){i.hidden=!1}),1500),this.listCur=this.listCur},tMove:function(t){var i=t.touches[0].clientY,e=this.boxTop,n=this;if(i>e){var o=parseInt((i-e)/20);this.listCur=n.list[o].name}},tStart:function(){this.hidden=!1},tEnd:function(){this.hidden=!0,this.listCurID=this.listCur},indexSelect:function(t){for(var i=this,e=this.barHeight,n=this.list,o=Math.ceil(n.length*t.detail.y/e),a=0;a<n.length;a++)if(o<a+1)return i.listCur=n[a].name,i.movableY=20*a,!1}}};i.default=o}).call(this,e("543d")["default"])},b35f:function(t,i,e){"use strict";e.r(i);var n=e("97c2"),o=e.n(n);for(var a in n)"default"!==a&&function(t){e.d(i,t,(function(){return n[t]}))}(a);i["default"]=o.a},ddbf:function(t,i,e){},dde3:function(t,i,e){"use strict";var n=e("ddbf"),o=e.n(n);o.a}},[["66d4","common/runtime","common/vendor"]]]);