(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesHome/conpoments/notice_components"],{"3b4f":function(t,n,e){"use strict";e.r(n);var a=e("5731"),o=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=o.a},5731:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=o(e("c5aa"));function o(t){return t&&t.__esModule?t:{default:t}}var i={mixins:[a.default],props:{companyId:{type:[String,Number],default:""}},data:function(){return{dataList:[]}},created:function(){console.log(),this.getNotice()},methods:{godetail:function(n){t.navigateTo({url:"/pagescenter/zhaopinzhe/noticeDetail?aid="+n.aid})},getNotice:function(){var t=this;this.$Request.post(this.$api.Community.noticeList,{company_id:this.companyId,type:1}).then((function(n){console.log(n,"最新通知列表"),1==n.code&&(t.dataList=n.data.data)}))}}};n.default=i}).call(this,e("543d")["default"])},5850:function(t,n,e){},8615:function(t,n,e){"use strict";e.r(n);var a=e("9bf9"),o=e("3b4f");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);e("86b9");var u,c=e("f0c5"),r=Object(c["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=r.exports},"86b9":function(t,n,e){"use strict";var a=e("5850"),o=e.n(a);o.a},"9bf9":function(t,n,e){"use strict";var a;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var o=function(){var t=this,n=t.$createElement;t._self._c},i=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesHome/conpoments/notice_components-create-component',
    {
        'pagesHome/conpoments/notice_components-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8615"))
        })
    },
    [['pagesHome/conpoments/notice_components-create-component']]
]);
