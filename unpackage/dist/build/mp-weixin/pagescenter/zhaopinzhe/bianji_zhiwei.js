(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagescenter/zhaopinzhe/bianji_zhiwei"],{"2ac3":function(t,e,i){},"3ad2":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("6c72"),n=i("6cf1"),o=function(){i.e("components/ben-upload/ben-upload").then(function(){return resolve(i("df45"))}.bind(null,i)).catch(i.oe)},s=(i("5745"),""),r={components:{benUpload:o},data:function(){return{experience:a.experience,act_experience:"",price:!1,experi:!1,education:"",defaultpic:!1,agechoose:!1,age_list:a.age_list,salaryDescription:"",requirements:"",jobDescription:"",iwant:"",IMG_URL:this.IMG_URL,uShow:!0,enterpriseIntroduction:"",age2_list:JSON.parse(JSON.stringify(n.age2_list)),age_inx:[0,0],age_act:"",hidden:!0,zhiwei:s,zhiwei_id:"",pay_status:"",degree_list:[],degree_act:"",busort:"",price_butie:"",factory_pay:"",server_price:"",subsidy:"",subsidy_remarks:"",car_subsidy:"",receiving_subsidy_date:"",content:"",fabu_money:"",fuli:[],zhaopin_number:"",company_address:"",imgOne:[],videoImg:"",video:"",imgList:[],hb_sort:[],hbSort:"",hbSort_id:"",hb_title:"",add_price:"",share_num:"",imgpath:[],max:4,check:"",mobeil1:"",mobeil2:"",mobeil3:"",name1:"",name2:"",name3:"",title:"",isopen:!0,priceOne:"",aid:"",checked:!1,min_salary:"",max_salary:"",zhiwei_list:[{id:1,label:"劳务派遣"},{id:3,label:"企业直招"}],price_sort:[{id:1,label:"小时"},{id:2,label:"返费"},{id:3,label:"差价/小时"},{id:4,label:"同工同酬"},{id:5,label:"计件"},{id:6,label:"底薪加提成"},{id:7,label:"日结"},{id:8,label:"周结"}],city:"",lon:"",lat:"",open:!1,longitude:"",latitude:""}},computed:{totalMoney:function(){return(this.zhaopin_number*(100*this.priceOne)/100).toFixed(2)}},onLoad:function(e){var i=this;t.showLoading({}),this.aid=e.aid,this.getDegree(),this.getPrice(),this.gethb_sort(),this.$Common.getLocation((function(t){i.longitude=t.longitude,i.latitude=t.latitude,i.get_detail()})),t.$on("changeFuli",(function(e){i.fuli=e.arr,""!=i.fuli&&t.setStorageSync("fuliTag",i.fuli)})),t.$on("changeFuli",(function(t){i.fuli=t.arr})),t.$on("position",(function(e){console.log(e,"监听我选择我想找"),i.iwant=e,console.log(i.iwant),""!=i.iwant&&t.setStorageSync("jobTag",i.iwant)})),t.$on("video",(function(t){i.video=t.msg,i.videoImg=t.msg+"?x-oss-process=video/snapshot,t_10000,f_jpg,w_800,h_600,m_fast",i.open=!0}))},onUnload:function(){t.$off("changeFuli"),t.$off("video"),t.$off("position"),t.$emit("update","更新列表")},methods:{focusCom:function(){1==this.pay_status&&this.$Common.toast("不可更改")},gethb_sort:function(){var t=this;this.$Request.post(this.$api.index.get_fuli_info,{jobposition_id:this.aid}).then((function(e){1==e.code&&(t.hb_sort=e.data.red_envelope_type)}))},get_detail:function(){var e=this;this.$Request.post(this.$api.company.positionInfo,{aid:this.aid,longitude:this.longitude,latitude:this.latitude}).then((function(i){if(t.hideLoading(),1==i.code){e.title=i.data.job.name,e.imgOne=i.data.job.image,e.imgOne&&e.imgOne.map((function(t){t.loading="100%"})),e.videoImg=i.data.job.video_id,e.video=i.data.job.video,e.imgList=i.data.job.ads_imgas||"",e.imgList&&e.imgList.map((function(t){t.loading="100%"})),e.defaultpic=!0;var a=i.data.job.station_type;1==a?e.zhiwei="劳务派遣":2==a?e.zhiwei="日结工作":3==a&&(e.zhiwei="企业直招"),e.zhiwei_id=i.data.job.station_type,e.zhaopin_number=i.data.job.numbers,e.min_salary=i.data.job.min_salary,e.max_salary=i.data.job.max_salary,e.busort=i.data.job.fan_type,e.busort_id=i.data.job.fan_type_id,e.price_butie=i.data.job.fan_price||0,e.factory_pay=i.data.job.factory_pay||"",e.server_price=i.data.job.server_price,e.subsidy=i.data.job.subsidy||"",e.subsidy_remarks=i.data.job.subsidy_remarks||"",e.car_subsidy=i.data.job.car_subsidy||"",e.receiving_subsidy_date=i.data.job.receiving_subsidy_date||"",e.act_experience=i.data.job.experience,e.education=i.data.job.education,e.degree_act=i.data.job.education_name,e.age_act=i.data.job.age,e.content=i.data.job.accommodation_introduction,e.salaryDescription=i.data.job.salary_description,e.requirements=i.data.job.employment_conditions,e.enterpriseIntroduction=i.data.job.enterprise_introduction,e.jobDescription=i.data.job.job_description,e.company_address=i.data.job.address,e.city=i.data.job.city,e.fuli=i.data.job.welfare_id,e.pay_status=i.data.job.pay_status,e.name1=i.data.job.driver_name,e.name3=i.data.job.finance_manager_name,e.name2=i.data.job.resident_manager_name,e.mobeil1=i.data.job.driver_phone,e.mobeil3=i.data.job.finance_manager_phone,e.mobeil2=i.data.job.resident_manager_phone,e.share_num=i.data.job.red_envelope_num,e.add_price=i.data.job.red_envelope_money,e.hbSort_id=i.data.job.red_envelope_type,e.iwant={aid:i.data.job.stations,station_name:i.data.job.stations_name},e.hb_sort&&e.hbSort_id&&(console.log(e.hb_sort,"==="),e.hbSort=e.hb_sort[e.hbSort_id].label),e.hb_title=i.data.job.red_envelope_theme,0==i.data.driver_name&&(e.name1=""),0==i.data.finance_manager_name&&(e.name2=""),0==i.data.resident_manager_name&&(e.name3=""),0==i.data.driver_phone&&(e.mobeil1=""),0==i.data.finance_manager_phone&&(e.mobeil2=""),0==i.data.resident_manager_phone&&(e.mobeil3=""),1==e.pay_status?e.checked=!0:e.checked=!1}else t.showToast({title:i.msg,icon:"none"})}))},chooseLive:function(e){this.imgOne=e,""!=e&&(this.uShow=!0,t.hideLoading())},goSelectJob:function(e){t.navigateTo({url:"../../pagescommon/my_search?jobtype=1&request=1&type="+e})},bannerLive:function(e){this.imgList=e,""!=e&&(this.uShow=!0,t.hideLoading())},ChooseImage:function(){t.navigateTo({url:"upload_video"})},DelImg:function(){this.videoImg="",this.video="",this.open=!1},getDegree:function(){var t=this;this.$Request.post(this.$api.user.user_degree).then((function(e){"1"==e.code&&(t.degree_list=e.data)}))},getPrice:function(){var t=this;this.$Request.post(this.$api.company.companyInfo).then((function(e){"1"==e.code&&(t.priceOne=parseFloat(e.data.info.money))}))},getLocation:function(){var e=this;t.chooseLocation({success:function(t){e.company_address=t.address,e.city=t.address,e.lon=t.longitude,e.lat=t.latitude}})},selectFuli:function(e){t.setStorageSync("fuliTag",this.fuli),t.navigateTo({url:"../../pagescommon/gongsi_fuli"})},leavePrice:function(){if(!/^[1-9]/.test(this.price_butie))return this.$Common.toast("请输入不以0开头的工价金额"),this.price_butie="",!1},leavePerson:function(){if(!/^[1-9]\d*$/.test(this.zhaopin_number))return this.$Common.toast("请输入不以0开头并且为整数的招聘人数"),this.zhaopin_number="",!1},leaveCon:function(){return/^[1-9]/.test(this.min_salary)?/^[1-9]/.test(this.max_salary)?void(Number(this.max_salary)<Number(this.min_salary)&&(this.$Common.toast("薪资要求不合理"),this.max_salary="")):(this.$Common.toast("请输入不以0开头的薪资要求"),this.max_salary="",!1):(this.$Common.toast("请输入不以0开头的薪资要求"),this.min_salary="",!1)},savePost:function(){var e=this;if(!this.title)return this.$Common.toast("请选择职位标题"),!1;if(""!=this.iwant){if(!this.zhiwei)return this.$Common.toast("请选择职位类型"),!1;if(!this.min_salary&&!this.max_salary)return this.$Common.toast("请输入薪资要求"),!1;if(Number(this.max_salary)<Number(this.min_salary))return this.$Common.toast("薪资要求不合理"),!1;if(!this.act_experience)return this.$Common.toast("请选择经验要求"),!1;if(!this.degree_act)return this.$Common.toast("请选择学历要求"),!1;if(!this.age_act)return this.$Common.toast("请选择年龄要求"),!1;if(this.mobeil1&&!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil1))return(this.zhiwei="企业直招")?this.$Common.toast("请填写正确的联系方式"):this.$Common.toast("请填写正确的联系方式1"),!1;if(this.mobeil2&&!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil2))return this.$Common.toast("请填写正确的联系方式2"),!1;if(this.mobeil3&&!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobeil3))return this.$Common.toast("请填写正确的联系方式3"),!1;if(!this.company_address)return this.$Common.toast("请选择工作地点"),!1;var i=[],a="";if(this.fuli.map((function(t){i.push(t.aid)})),a=i.join(","),!a)return this.$Common.toast("请选择福利标签"),!1;var n=[],o="";""!=this.imgList&&this.imgList.map((function(t){n.push(t.aid)})),""!=this.imgOne&&(o=this.imgOne[0].aid);var s={aid:this.aid,name:this.title,image:o||"",video:this.video||0,ads_imgas:n.join(",")||"",station_type:this.zhiwei_id,fan_type:this.busort_id,fan_price:Number(this.price_butie),factory_pay:this.factory_pay||"",server_price:this.server_price||"",subsidy:this.subsidy||"",subsidy_remarks:this.subsidy_remarks||"",car_subsidy:this.car_subsidy||"",receiving_subsidy_date:this.receiving_subsidy_date||"",experience:this.act_experience,education:this.education,age:this.age_act,min_salary:this.min_salary,max_salary:this.max_salary,accommodation_introduction:this.content||"",salary_description:this.salaryDescription||"",employment_conditions:this.requirements||"",job_description:this.jobDescription||"",enterprise_introduction:this.enterpriseIntroduction||"",address:this.company_address||"",welfare:a,numbers:this.zhaopin_number||"",stations:this.iwant.aid,city:this.city,lon:this.lon,lat:this.lat,driver_name:this.name1||"",driver_phone:this.mobeil1||"",resident_manager_name:this.name2||"",resident_manager_phone:this.mobeil2||"",finance_manager_name:this.name3||"",finance_manager_phone:this.mobeil3||"",red_envelope_num:this.share_num,red_envelope_money:this.add_price||0,red_envelope_type:this.hbSort_id,red_envelope_theme:this.hb_title};0!=this.isopen&&(this.isopen=!1,setTimeout((function(){e.isopen=!0}),1500),this.$Request.post(this.$api.user.user_edit_job,s).then((function(i){1==i.code?(e.$Common.toast("更新成功"),t.$emit("updateList"),setTimeout((function(){t.navigateBack({})}),1500)):e.$Common.toast(i.msg)})))}else this.$Common.toast("请选择职位类别")},gorule:function(){t.navigateTo({url:"../../pagescommon/post_recruitment"})},playVideo:function(){t.navigateTo({url:"play_video?url="+this.video})},delPost:function(){var e=this;t.showModal({title:"提示",content:"您确定要删除职位吗",success:function(i){1==i.confirm&&e.$Request.post(e.$api.user.user_delet_job,{aid:e.aid}).then((function(i){e.$Common.toast(i.msg),1==i.code?setTimeout((function(){t.reLaunch({url:"../../pages/index/index"})}),400):e.$Common.toast(i.msg)}))},fail:function(t){e.$Common.toast("网络错误，请稍后重试")}})},toggleTab:function(t){this.$data[t]=!0},experienceConfirm:function(t){var e=t.detail.value;this.act_experience=this.experience[e].label},degreeConfirm:function(t){var e=t.detail.value;this.degree_act=this.degree_list[e].label,this.education=this.degree_list[e].id},zhiweiConfirm:function(t){var e=t.detail.value;this.zhiwei=this.zhiwei_list[e].label,this.zhiwei_id=this.zhiwei_list[e].id},sortConfirm:function(t){var e=t.detail.value;this.busort=this.price_sort[e].label,this.busort_id=this.price_sort[e].id},hbConfirm:function(t){var e=t.detail.value;this.hbSort=this.hb_sort[e].label,this.hbSort_id=this.hb_sort[e].id},ageappConfirm:function(t){this.age_act=t.value[0]+"-"+t.value[1]},ageConfirm:function(t){this.age_inx=t.detail.value,this.age_act=this.age2_list[0][this.age_inx[0]]+"-"+this.age2_list[1][this.age_inx[1]]},ageChange:function(t){var e=t.detail;0==e.column&&(this.age2_list[1]=n.age2_list[1].slice(e.value),this.age_inx[1]=0)}}};e.default=r}).call(this,i("543d")["default"])},"9a06":function(t,e,i){"use strict";i.r(e);var a=i("d8cc"),n=i("ea20");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("a425");var s,r=i("f0c5"),d=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],s);e["default"]=d.exports},a425:function(t,e,i){"use strict";var a=i("2ac3"),n=i.n(a);n.a},d125:function(t,e,i){"use strict";(function(t){i("652a");a(i("66fd"));var e=a(i("9a06"));function a(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=i,t(e.default)}).call(this,i("543d")["createPage"])},d8cc:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={benUpload:function(){return i.e("components/ben-upload/ben-upload").then(i.bind(null,"df45"))}},n=function(){var t=this,e=t.$createElement;t._self._c},o=[]},ea20:function(t,e,i){"use strict";i.r(e);var a=i("3ad2"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a}},[["d125","common/runtime","common/vendor"]]]);