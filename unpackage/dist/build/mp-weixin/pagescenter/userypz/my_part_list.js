(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagescenter/userypz/my_part_list"],{3088:function(t,e,n){"use strict";var o=n("46a8"),a=n.n(o);a.a},"46a8":function(t,e,n){},"4e68":function(t,e,n){"use strict";n.r(e);var o=n("8278"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},"51a4":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={mescrollUni:function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(n.bind(null,"d7d1"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"6ed2":function(t,e,n){"use strict";(function(t){n("652a");o(n("66fd"));var e=o(n("aa1b"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=n,t(e.default)}).call(this,n("543d")["createPage"])},8278:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("c5aa"));function a(t){return t&&t.__esModule?t:{default:t}}var i={components:{},mixins:[o.default],data:function(){return{nowtime:"",CustomBar:this.CustomBar,scrollLeft:0,cur:2,user_type:t.getStorageSync("USERINFO").user_type,IMG_URL:this.IMG_URL,statusList:[{id:2,name:"临时工"},{id:1,name:"网络兼职"}],my_part_job_list:[],order_id:"",voucher:""}},onLoad:function(){var e=this;t.showLoading({}),t.$on("delPart",(function(t){e.mescroll&&e.mescroll.resetUpScroll()})),t.$on("updateOrderDetail",(function(t){e.mescroll&&e.mescroll.resetUpScroll()})),this.get_plant_type()},onUnload:function(){t.$off("delPart"),t.$off("updateOrderDetail")},methods:{get_plant_type:function(){var t=this;this.$Request.get(this.$api.index.get_fuli_info,{}).then((function(e){1==e.code&&(t.voucher=e.data.voucher)}))},navTo:function(e){0==e.is_pay?t.navigateTo({url:"order_detail?page=person&id="+e.aid+"&uid="+e.user_id}):t.navigateTo({url:"pick_up_person?aid="+e.aid})},detalOne:function(e){var n=this;t.showModal({title:"你确定要删除发布的兼职任务吗",content:2==e.part_status?"":"删除后金额自动退还到账户",success:function(o){o.confirm?n.$Request.post(n.$api.company.delet_part,{aid:e.aid}).then((function(e){1==e.code?(n.$Common.toast("删除成功"),n.mescroll&&n.mescroll.resetUpScroll(),setTimeout((function(){n.$forceUpdate()}),200)):t.showToast({title:e.msg,icon:"none"})})):o.cancel}})},toPage:function(){t.navigateTo({url:"./fabu_part"})},goPay:function(e,n){t.navigateTo({url:"../zhaopinzhe/fabu?title=fabu&order_sn="+e.order_sn+"&price="+e.order_money+"&commission="+e.commission})},upCallback:function(e){var n=this,o=e.num,a=(e.size,{page:o,limit:10,type:this.cur});this.$Request.post(this.$api.user.my_part_job_list,a).then((function(o){if(t.hideLoading(),1==o.code){var a=o.data.total,i=o.data.data;1==e.num&&(n.my_part_job_list=[]),n.my_part_job_list=n.my_part_job_list.concat(i),e.endBySize(i.length,a)}else e.endErr()})).catch((function(t){console.log("err: "+JSON.stringify(t)),1==o?e.endBySize(0,0):e.endErr()}))},selectStatus:function(t,e){this.cur!==t.id&&(this.scrollLeft=60*(e-1),this.cur=t.id,this.mescroll&&this.downCallback())}}};e.default=i}).call(this,n("543d")["default"])},aa1b:function(t,e,n){"use strict";n.r(e);var o=n("51a4"),a=n("4e68");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("3088");var r,u=n("f0c5"),c=Object(u["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);e["default"]=c.exports}},[["6ed2","common/runtime","common/vendor"]]]);