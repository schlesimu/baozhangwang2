(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/fu-filter"],{"0dc8":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n=e("6c72"),s={name:"fu-filter",data:function(){return{experience:n.experience1,degree_list:"",activeFilter:null,filterTypeList:[{id:1,name:"行业职位"},{id:2,name:"经验"},{id:3,name:"学历"},{id:4,name:"薪资"}],orderTypeList:[{id:1,name:"综合"},{id:2,name:"评分"},{id:3,name:"服务数"}],popOpen:!1,markHeight:"0px",orderType:1,jobtitleList:[],currentIndexExp:0,currentIndexEdu:0,currentIndexSal:0,departmentList:[],departmentsIndex:0,illnessIndex:null,provinceList:[],provinceIndex:0,cityIndex:0,salaryList:"",positionList:[],slist:""}},watch:{popOpen:function(t){}},computed:{illnessList:function(){return this.departmentList[this.departmentsIndex]?this.departmentList[this.departmentsIndex].sub:""},cityList:function(){return this.provinceList[this.provinceIndex]?this.provinceList[this.provinceIndex].child:""}},created:function(){this.getDegree(),this.getWantSalary(),this.getPosition()},methods:{selectFilter:function(i){var e=this;if(this.activeFilter===i)return this.activeFilter=null,void(this.popOpen=!1);if(t.createSelectorQuery().in(this).select(".filter-wrap").boundingClientRect((function(t){e.$nextTick((function(){e.markHeight="calc(100vh - ".concat(t.top+t.height+40,"px)")}))})).exec(),this.activeFilter=i,this.$parent.page=1,this.$parent.keyword="",0==i){var n=this.station_id=this.positionList[this.provinceIndex].aid,s=this.station=this.slist.length?this.slist[this.cityIndex].aid:0;this.getPosition(n,2),this.$emit("choosePosition",{aid:s,station_id:n})}this.popOpen=!0},getWantSalary:function(){var t=this;this.$Request.post(this.$api.user.getWantSalary).then((function(i){"1"==i.code&&(i.data.unshift("全部"),t.salaryList=i.data)}))},close:function(){this.activeFilter=null,this.popOpen=!1},chooseEducation:function(t,i){var e=this;this.currentIndexEdu=t.id,this.$parent.page=1,this.$emit("chooseEducation",t),setTimeout((function(){e.close()}),200)},chooseSalary:function(t,i){var e=this;this.currentIndexSal=i,this.$parent.page=1,0==i&&(t=""),this.$emit("chooseSalary",t),setTimeout((function(){e.close()}),200)},getPosition:function(t){var i=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1;this.$Request.post(this.$api.job.get_station_list,{seach:this.content||"",type_pid:t||""}).then((function(n){if("1"==n.code)if(t)""!=n.data&&n.data.unshift({aid:0,station_name:"全部"}),i.slist=n.data;else{if(2==e)return void(i.slist=[{aid:0,station_name:"全部"}]);n.data.unshift({aid:0,station_name:"全部"}),i.positionList=n.data}}))},chooseProvince:function(t,i){if(this.provinceIndex!==i){this.provinceIndex=i,this.cityIndex=0,this.getPosition(t.aid,2),this.$parent.page=1,this.$parent.keyword="";var e=this.station_id=t.aid,n=this.station=this.slist.length?this.slist[this.cityIndex].aid:0;this.$emit("choosePosition",{aid:n,station_id:e})}},choosePosition:function(t,i){var e=this;if(this.cityIndex!==i||0===this.cityIndex){this.cityIndex=i,this.$parent.page=1;var n=this.station_id=this.positionList.length?this.positionList[this.provinceIndex].aid:0;this.station=t.aid,this.$parent.keyword="",this.$emit("choosePosition",{aid:t.aid,station_id:n}),setTimeout((function(){e.close()}),200)}},chooseRoom:function(t,i){this.departmentsIndex!==i&&(this.departmentsIndex=i,this.illnessIndex=null)},chooseIllness:function(t,i){var e,n=this;this.illnessIndex!==i&&(this.illnessIndex=i,0==t.id?(this.filterTypeList[2].name=this.departmentList[this.departmentsIndex].name,e=t.id):(this.filterTypeList[2].name=t.name,e=t.id),this.$emit("chooseIllness",{departmentId:this.departmentList[this.departmentsIndex].id,diseaseId:e}),setTimeout((function(){n.close()}),200))},chooseExperience:function(t,i){var e=this;this.currentIndexExp=t.value,this.$parent.page=1,0==i&&(t=""),console.log(t),this.$emit("chooseExperience",t),setTimeout((function(){e.close()}),200)},getDegree:function(){var t=this;this.$Request.post(this.$api.user.user_degree,{type:1}).then((function(i){"1"==i.code&&(i.data.unshift({id:0,label:"全部"}),t.degree_list=i.data)}))}}};i.default=s}).call(this,e("543d")["default"])},2434:function(t,i,e){"use strict";e.r(i);var n=e("0dc8"),s=e.n(n);for(var o in n)"default"!==o&&function(t){e.d(i,t,(function(){return n[t]}))}(o);i["default"]=s.a},"6f46":function(t,i,e){},"94ce":function(t,i,e){"use strict";var n;e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return o})),e.d(i,"a",(function(){return n}));var s=function(){var t=this,i=t.$createElement;t._self._c},o=[]},b155:function(t,i,e){"use strict";e.r(i);var n=e("94ce"),s=e("2434");for(var o in s)"default"!==o&&function(t){e.d(i,t,(function(){return s[t]}))}(o);e("b5f2");var a,r=e("f0c5"),c=Object(r["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],a);i["default"]=c.exports},b5f2:function(t,i,e){"use strict";var n=e("6f46"),s=e.n(n);s.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/fu-filter-create-component',
    {
        'components/fu-filter-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("b155"))
        })
    },
    [['components/fu-filter-create-component']]
]);
