(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagescenter/zhaopinzhe/notice"],{"2fc6":function(t,n,e){"use strict";e.d(n,"b",(function(){return c})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return o}));var o={mescrollUni:function(){return Promise.all([e.e("common/vendor"),e.e("components/mescroll-uni/mescroll-uni")]).then(e.bind(null,"d7d1"))}},c=function(){var t=this,n=t.$createElement;t._self._c},i=[]},7613:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e("c5aa"));function c(t){return t&&t.__esModule?t:{default:t}}var i={mixins:[o.default],data:function(){return{dataList:[],CustomBar:this.CustomBar}},onLoad:function(){var n=this;t.$emit("number",{msg:"number"}),this.mescroll&&this.mescroll.resetUpScroll(),console.log("通知"),t.$on("fabuNotice",(function(t){n.mescroll&&n.mescroll.resetUpScroll()}))},onUnload:function(){t.$off("fabuNotice")},methods:{topage:function(){t.navigateTo({url:"fabu_notice"})},delet:function(n){var e=this;t.showModal({content:"确定要删除此条通知吗？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&e.$Request.post(e.$api.Community.del_notice,{aid:n.aid}).then((function(t){1==t.code&&(e.$Common.toast(t.msg),e.mescroll&&e.mescroll.resetUpScroll())}))}})},pushItem:function(n){var e=this;t.showModal({content:"确认推送此通知给已收藏本公司的人？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&e.$Request.post(e.$api.company.noticePush,{aid:n.aid}).then((function(t){1==t.code&&(e.$Common.toast(t.msg),e.mescroll&&e.mescroll.resetUpScroll())}))}})},edit:function(n){t.navigateTo({url:"bianj_notice?aid="+n.aid})},godetail:function(n){t.navigateTo({url:"noticeDetail?aid="+n.aid})},upCallback:function(n){var e=this,o=t.getStorageSync("roleinfo").info.aid;console.log(o);var c=n.num;n.size;this.$Request.post(this.$api.Community.noticeList,{company_id:o,page:c,limit:10}).then((function(t){if(console.log(t,"最新通知列表"),1==t.code){var o=t.data.data,c=t.data.count;1==n.num&&(e.dataList=[]),e.dataList=e.dataList.concat(o),console.log(e.dataList),n.endBySize(o.length,c)}else e.mescroll.endErr()})).catch((function(t){e.mescroll.endErr()}))}}};n.default=i}).call(this,e("543d")["default"])},"93ab":function(t,n,e){"use strict";e.r(n);var o=e("2fc6"),c=e("d928");for(var i in c)"default"!==i&&function(t){e.d(n,t,(function(){return c[t]}))}(i);e("cd9b");var a,u=e("f0c5"),l=Object(u["a"])(c["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);n["default"]=l.exports},b618:function(t,n,e){},cd9b:function(t,n,e){"use strict";var o=e("b618"),c=e.n(o);c.a},d928:function(t,n,e){"use strict";e.r(n);var o=e("7613"),c=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=c.a},dec5:function(t,n,e){"use strict";(function(t){e("652a");o(e("66fd"));var n=o(e("93ab"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])}},[["dec5","common/runtime","common/vendor"]]]);