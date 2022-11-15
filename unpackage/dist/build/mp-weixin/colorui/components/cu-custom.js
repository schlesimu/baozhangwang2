(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["colorui/components/cu-custom"],{"54b8":function(t,a,n){"use strict";var e;n.d(a,"b",(function(){return u})),n.d(a,"c",(function(){return c})),n.d(a,"a",(function(){return e}));var u=function(){var t=this,a=t.$createElement;t._self._c},c=[]},6751:function(t,a,n){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n={data:function(){return{StatusBar:this.StatusBar,CustomBar:this.CustomBar}},name:"cu-custom",computed:{style:function(){var t=this.StatusBar,a=this.CustomBar,n=this.bgImage,e="height:".concat(a,"px;padding-top:").concat(t,"px;");return this.bgImage&&(e="".concat(e,"background-image:url(").concat(n,");")),e}},props:{bgColor:{type:String,default:"bg-gradual-theme"},isBack:{type:[Boolean,String],default:!1},isBackText:{type:[Boolean,String],default:!1},isFixed:{type:[Boolean,String],default:!1},bgImage:{type:String,default:""}},methods:{BackPage:function(){t.navigateBack({delta:1})}}};a.default=n}).call(this,n("543d")["default"])},"8a25":function(t,a,n){},a094:function(t,a,n){"use strict";n.r(a);var e=n("6751"),u=n.n(e);for(var c in e)"default"!==c&&function(t){n.d(a,t,(function(){return e[t]}))}(c);a["default"]=u.a},b3ee:function(t,a,n){"use strict";n.r(a);var e=n("54b8"),u=n("a094");for(var c in u)"default"!==c&&function(t){n.d(a,t,(function(){return u[t]}))}(c);n("ca53a");var r,o=n("f0c5"),i=Object(o["a"])(u["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],r);a["default"]=i.exports},ca53a:function(t,a,n){"use strict";var e=n("8a25"),u=n.n(e);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'colorui/components/cu-custom-create-component',
    {
        'colorui/components/cu-custom-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b3ee"))
        })
    },
    [['colorui/components/cu-custom-create-component']]
]);
