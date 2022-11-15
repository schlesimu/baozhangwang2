<template>
	<view class="padding solid-top">
		<view class="fixed bg-white">
			<view class=" flex align-center justify-between ">
				<view class="flex align-center">
					<text class="lg  cuIcon-location"></text>
					<text class=" bold text-df nowrap mr10" @tap="chooseAddress">
						{{ address || '全国' }}
					</text>
				</view>
				<view class="inputBox flex align-center padding">
					<text class="lg text-gray cuIcon-search margin-right-xs"></text>
					<input type="text" value="" placeholder="请输入关键词" placeholder-style="color:#999999;font-size:24rpx;"
						@confirm="search_input" v-model="keyword" />
				</view>
				<view class="flex_shrink padding-left-sm" @tap='search_input'>搜索</view>
			</view>
			<!-- 排序 -->
			<view class=" padding-top">
				<view class="" :style="type==4&&activeTab==0?'height:170upx':'70upx'">
					<view class="">
						<!-- 劳务派遣  服务经纪人-->
						<view class="">
							<view class="box flex align-center justify-around plr10 pb10 " v-if="type==4">
								<block v-for="(item, index) in tabList" :key="item.id">
									<view class="box_item " :class="activeTab ==index?'box_left':'' "
										@click="tabSelect(item, index)">{{ item.name }}</view>
								</block>
							</view>
							<!-- 排序 -->
							<view class="flex justify-between  bg-white"
								style="padding: 20upx 0upx 0upx 0upx;width: 100%;" v-if="activeTab==0">
								<view class="flex alcenter " v-for="(item, index) in sort_list" :key="index"
									@tap="check_sort(item, index)" style="position: relative;">
									<text class="text-df margin-right-sm text-gray"
										:class="sorttype == index + 1 ? ' text-black' : ''">{{ item.name }}</text>
									<text :class="sorttype == index + 1 ? 'kailong' : ' kaiact'"></text>
								</view>
								<view class="flex justify-center sort alcenter" @tap="plant_filter"
									style="position: relative;">
									<text class="f28 text-gray margin-right-sm"
										:class="choose ? 'text-black' : ''">筛选</text>
									<text :class="choose ? 'kailong' : ' kaiact'"></text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pb20" v-if="jobList != ''">
			<view class="" v-if="activeTab==0" :style="type==6?'padding-top:170rpx':'padding-top:270rpx;'">
				<view class="flex column between ptb15  card brb_c  mb10" v-for="(item, index) in jobList" :key="index">
					<!-- 劳务派遣 -->
					<view class="flex " @tap="navTo('/pagesHome/index/plant_detail?id=' + item.aid + '&longitude=' + longitude +
							'&latitude=' + latitude+'&is_servicebroker='+item.is_servicebroker)">
						<!-- logo -->
						<view class="">
							<view class="bg-gray job_img mr10 flex column" style="flex-shrink: 0;">
								<image :src="item.image || '/static/images/logo.png'" mode="aspectFill" class="mr10">
								</image>
							</view>
							<view class="text-sm padding-top-sm normal_red" style="width: 106upx;"
								v-if="item.red_envelope_type!=0">已开启助力加薪活动
								<image :src="IMG_URL + 'static/miniwechat/new/detail_icon2.png'" mode="aspectFill"
									class="ml5" style="width: 23upx; height: 23upx;"></image>
							</view>
						</view>
						<view class="" style="width: 83%;">
							<view class="flex justify-between align-center">
								<view class=" flex align-center mb5">
									<text class="gray3  bold f32 overflow-one mr5"
										style="font-weight: bold;max-width: 280upx;">{{ item.name || '无' }}</text>
									<text class="text-white bg-theme f24 flex_shrink" style="padding: 0 4upx;"
										v-if="item.is_top==1">推广</text>
								</view>
								<view class="normal_red bold mb5 text-right overflow-one">
									{{ item.min_salary || 0 }}~{{ item.max_salary || 0 }}元/<text>月</text>
								</view>
							</view>
							<!-- 工资 -->
							<view class="flex  between">
								<view class="flex column between" style="height: 90%;">
									<text class="text-sm gray9">{{ item.company_name || '无' }}</text>
									<view class="flex alcenter text-sm gray9">
										<text class="mr10 mtb5">{{ item.distance || 0 }}km</text>
										<text class="text_line1">{{ item.city || item.address||'' }}</text>
										<text class="text_line1" v-if="item.city">{{item.district||''}}</text>
									</view>
								</view>
								<view class="flex column align-end" v-if="item.fan_price!=''">
									<view class="returnBox flex column around  alcenter">
										<text class="f28 top_blue tc">{{ item.fan_type || '无' }}</text>
										<text class="f28 normal_red ellipsis tc bold plr5"
											style="width: 100%;">{{ item.fan_price || 0 }}元</text>
									</view>
								</view>
							</view>
							<view class=" flex align-center justify-between" style="position: relative;">
								<view class="" v-if="voucher==0">
									<text class="theme_blue text-sm">已向平台支付保证金{{ item.money || 0 }}元</text>
								</view>
								<view class="text-right text-sm text-red" @click.stop="lookService(item)"
									v-if="item.server_price!=''">门店情报</view>
								<!-- <view class="boxservice text-df" v-if="item.isShow">
									门店劳务报酬服务费：{{item.server_price||''}}
								</view> -->
							</view>
							<view class="flex between " style="">
								<view class="flex alcenter" style="flex: 1;">
									<view class="">
										<text class="cu-tag text-white bg-theme bold text-sm label_item radius6"
											v-for="(i, v) in item.welfare" :key="i">{{ i }}</text>
									</view>
								</view>
								<view class="tc ellipsis" style="">
									<text class="text-sm gray3  tc mt10">已报名 {{ item.apply_numbers || 0 }}人</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" v-if="type==4&&activeTab==1" style="padding-top: 170rpx;">
				<view class="flex column between ptb15  card brb_c  mb10" v-for="(item, index) in jobList" :key="index">
					<!-- 经纪人 -->
					<view class=""
						@tap="navTo('/pagesHome/index/broker_detail?id=' + item.user_id+'&lon='+item.lon+'&lat='+item.lat)">
						<view class="flex ">
							<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
								<image :src="item.head_img || '/static/images/logo.png'" mode="aspectFill" class="mr10">
								</image>
							</view>
							<view class="" style="width: 82%;">
								<view class="flex align-center justify-between pb10">
									<view class="overflow-one ewrap  f32 bold text-black">{{item.agent_name||''}}</view>
									<view class="align-center flex ">
										<text class="cuIcon-servicefill  mr10 " style="font-size: 21px;"
											@tap.stop="navTo('/pagesmessage/userMsg?kfid='+item.user_id+'&userName='+item.agent_name+'&friendId='+item.user_id,0)"></text>
										<image :src="IMG_URL + 'static/miniwechat/new/phone_icon.png'" mode="aspectFill"
											style=";width: 40upx;height: 40upx;" @tap.stop='call(item)'></image>
										<!-- <text class="cuIcon-phone f40 txt-theme" ></text> -->
									</view>

								</view>
								<view class="flex align-center justify-between pb5 w100">
									<view class="text-cut ewrap  text-666 f28">
										{{item.province}}-{{item.city}}-{{item.district}}
									</view>
								</view>

								<view class=" flex  align-center justify-between">
									<view class="">
										<text class="mr5 ewrap text-cut f28">{{item.distance||0}}km</text>
									</view>
									<text class=" btn_btn"
										@click.stop="navTo('/pagesHome/index/signUp_morker?id='+item.user_id,0)"
										v-if="item.is_signup==0">报名</text>
									<text class=" btn_btn" v-if="item.is_signup==1">已报名</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
			</view>
		</view>
		<view class="" v-if="jobList == ''" :style="activeTab==0?'padding-top:270rpx;':'padding-top:180rpx'">
			<u-empty text="暂无相关内容" mode="list"></u-empty>
		</view>
		<!-- 选择职位分类 -->
		<uni-popup type="top" ref="shareType" :top="type==4 ? '150px':'100px'" :bordeRadius="'0'" v-if="">
			<view class="room-list flex bg-white" style="height: 800upx;">
				<scroll-view class="left margin-right-xl bg-gray" scroll-y scroll-with-animation
					style="height: 100%;width: 37%;">
					<block v-for="(item, index) in positionList" :key="index">
						<view class="padding-tb padding-left  fu-fs28"
							:class="[stationIndex == index ? 'bg-white' : 'text-333']"
							@tap="chooseStation(item, index)">{{item.station_name}}</view>
					</block>
				</scroll-view>
				<scroll-view class="right flex-sub" scroll-y scroll-with-animation style="height: 100%;">
					<block v-for="(item, index) in slist" :key="index">
						<view class="padding-tb   fu-fs28" :class="[jobIndex == index ? 'txt-theme' : 'text-333']"
							@tap="choosePosition(item, index)">{{item.station_name}}</view>
					</block>
					<view class="ptb15" v-if="slist==''&&stationIndex!=0"> 暂无数据 </view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 选择地址 -->
		<uni-popup type="top" ref="addressPop" :top="'50px'" :bordeRadius="'0'">
			<view class="room-list flex bg-white" style="height: 800upx;">
				<scroll-view class="left margin-right-xl bg-gray" scroll-y scroll-with-animation
					style="height: 100%;max-width: 33%;">
					<block v-for="(item, index) in proventList" :key="index">
						<view class="padding-tb padding-lr-sm  fu-fs28"
							:class="[provinceIndex == index ? 'bg-white' : 'text-333']"
							@tap="chooseProvince(item, index)">{{item.shortname}}</view>
					</block>
				</scroll-view>
				<scroll-view class="right flex-sub" scroll-y scroll-with-animation style="height: 100%;">
					<view class="">
						<block v-for="(item, index) in cityList" :key="index">
							<view class="brb_e margin-bottom-sm">
								<view class="padding-bottom-sm " @tap='chooseCity(item,index)'
									:class="[cityIndex == index ? 'txt-theme' : 'text-333']">{{item.shortname}}</view>
								<view class="flex align-center flex-wrap">
									<block v-for="(itm, inx) in item.child" :key="itm.id">
										<view class="padding-tb address_item   fu-fs28 "
											:class="[areaIndex ==index+'-'+ inx ? 'txt-theme' : 'text-333']"
											@tap="chooseArea(itm, inx,index)">{{itm.shortname}}</view>
									</block>
								</view>
							</view>
						</block>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup type="center" ref="isShow" :bordeRadius="'0'">
			<view class="bg-white">门店劳务报酬服务费：{{server_price||''}}</view>
		</uni-popup>

		<!-- 福利待遇筛选框 -->
		<view class="cu-modal bottom-modal" :class="Modalname == 'plant_filter' ? 'show' : ''" @tap="hideModal"
			:style="[{height:'calc(100% - ' + CustomBar + 'px-50px)' ,top:CustomBar+10+'px'}]">
			<view class="cu-dialog bg-white plr10 ptb10" @tap.stop=""
				:style="[{height:'calc(100% - ' + CustomBar + 'px-50px)',top:CustomBar+50+'px'}]">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="gray3 text-df mb20 bold mt10">类型</view>
						<view class="flex alcenter flex-wrap">
							<view class="type_item flex align-center justify-center mr10 mb10"
								v-for="(item, index) in plant_type.type" :class="fan_type == index ? 'active' : ''"
								:key="index" @tap="select_plant_type(item, index)">
								{{ item }}
							</view>
						</view>
						<view class="">
							<view class="gray3 text-df mb20 mt10 bold">福利</view>
							<view class="flex alcenter flex-wrap">
								<view class="type_item flex align-center justify-center mr10 mb10"
									v-for="(item, index) in plant_type.welfare" :key="index"
									:class="welfare == item.aid ? 'active' : ''" @tap="select_fuli_type(item, index)">
									{{ item.welfare_name }}
								</view>
							</view>
						</view>
						<view class="">
							<view class="gray3 text-df mb20 mt10 bold">经验</view>
							<view class="flex alcenter flex-wrap">
								<view class="type_item flex align-center justify-center mr10 mb10"
									v-for="(item, index) in experience" :key="index"
									:class="currentIndexExp == index ? 'active' : ''"
									@tap="chooseExperience(item, index)">
									{{ item.label }}
								</view>
							</view>
						</view>
						<view class="">
							<view class="gray3 text-df mb20 mt10 bold">学历</view>
							<view class="flex alcenter flex-wrap">
								<view class="type_item flex align-center justify-center mr10 mb10"
									v-for="(item, index) in degree_list" :key="index"
									:class="currentIndexEdu == item.id ? 'active' : ''"
									@tap="chooseEducation(item, index)">
									{{ item.label }}
								</view>
							</view>
						</view>
					</view>
				</radio-group>
			</view>
		</view>
		<!-- 回到顶部按钮 -->
		<view class="to_top_wrap" v-if="showtop">
			<image :src="IMG_URL + 'static/miniwechat/index/to_top.png'" mode="" class="top_img" @tap="back_top">
			</image>
		</view>
	</view>
</template>

<script>
	import {
		experience2
	} from '@/common/js/mockData.js';
	export default {
		data() {
			return {
				jobList: [], //职位列表
				showtop: false, //是否展示返回顶按钮
				experience: experience2, //经验
				distance_y: '',
				page: 1,
				IMG_URL:this.IMG_URL,
				total_page: '',
				server_price: '', //单个门店服务费
				iconType: 'flower',
				sorttype: 1, //选择排序
				sort_type: 1, //排序方式
				fan_type: 0, //选中的补贴
				welfare: 0, //选中的福利
				currentIndexExp: 0, // 选中的经验
				currentIndexEdu: 0, // 选中的学历
				plant_type: [],
				proventList: [], //省列表
				cityList: '', //市列表
				areaList: '', //区列表
				stationIndex: 1, //省索引
				jobIndex: 0, //选择的区索引
				is_part_job_type: 0, //1：网约工 0：不是网约工
				payrt_job_type: '', //网约工类型 1：网上兼职 2：本地兼职
				settlement_method: '', //网约工 筛选条件

				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				last_page: '', //总页数
				voucher: '', //是否开启支付
				status: 'loadmore', //加载状态
				keyword: '', //关键词
				markHeight: '0px', // 蒙版高度，需要计算
				choose: false, //是否点击筛选
				type: '4', //页面类型
				activeTab: 0, //选择网约工类型
				Modalname: null,
				address: '', //当前地址
				city_name: '', //传参的参数名
				city_id: '', //城市id
				positionList: [], //职位列表
				slist: '', //二级职位
				provinceList: [], // 省列表
				provinceIndex: 0, // 选中的省索引
				cityIndex: null, // 市区索引
				isShow: false, //是否展示服务费
				popOpen: false, // 是否显示筛选弹窗
				tabList: [{ //劳务派遣分类
					name: '派遣企业',
					id: 2
				}, {
					name: '全国门店服务经纪人',
					id: 1
				}],
				sort_list: [{
					id: 1,
					name: ' 最新',
				}, {
					id: 2,
					name: '距离',
				}, {
					id: 3,
					name: '工资',
				}, {
					id: 4,
					name: '行业职位',
				}],
				degree_list: '', //学历列表
				longitude: '',
				latitude: '',
				stations: '', //行业类别
				area_id: '', //区id
				cityIndex: null, //选择的索引
				areaIndex: null, //选择的区索引
			};
		},

		onLoad(e) {
			let that = this;
			if (e.type == 4) {
				uni.setNavigationBarTitle({
					title: '劳务派遣直聘'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '本地企业直聘'
				});
				this.activeTab = 0
			}
			this.type = e.type
			this.getAddressList()
			this.$Common.getLocation(e => {
				let that = this
				//获取经纬度
				let lat = [e.longitude, e.latitude];
				this.$Request.post(that.$api.msg.cityPosition, {
						user_id: that.user_id || '',
						// #ifdef APP-PLUS
						client_id: plus.device.uuid,
						// #endif
						cid: '',
						lat: lat
					})
					.then(res => {
						if (res.code == 1) {
							if (this.type == 4) {
								that.address = '全国'
								that.area_id = '';
							} else {
								that.address = res.data.name || '全国';
								that.area_id = res.data.id;
							}
							this.longitude = res.data.lng;
							this.latitude = res.data.lat;
							this.page = 1
							this.get_job_list()
						} else {
							that.$Common.toast('无法定位，请打开手机定位！！');
						}
					})
					.catch(err => {
						that.$Common.toast('无法定位，请打开手机定位！！');
					});
			})
			this.getPosition()
			this.getDegree()
		},
		onShow() {
			this.get_plant_type()
			this.get_is_pay()
		},
		onPageScroll: function(e) {
			let that = this;
			this.distance_y = e.scrollTop;
			if (e.scrollTop >= 250) {
				that.showtop = true;
			} else {
				that.showtop = false;
			}
		},
		onReachBottom() {
			let that = this;
			if (that.page >= that.last_page) return;
			that.status = 'loading';
			that.page++;
			that.get_job_list();
		},
		methods: {
			// 回到顶部
			back_top() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			search_input() {
				//去搜索
				if (/^\s*(\S+)\s*$/.test(this.search_txt)) {
					this.search_txt = RegExp.$1
				} else {
					this.$Common.toast('请不要输入空格');
					return false;
				}
				this.fan_type = 0;
				this.welfare = '';
				setTimeout(() => {
					this.dataList()
				}, 100)
			},
			// 查看门店情报
			lookService(item) {
				if (item.is_servicebroker == 1) {
					this.$refs.isShow && this.$refs.isShow.open();
					this.server_price = item.server_price
				} else {
					this.$Common.toast('门店服务经纪人才可查看')
				}
				this.$refs.shareType && this.$refs.shareType.close();
				
			},
			// 加载数据
			dataList() {
				this.page = 1
				this.jobList = []
				this.status = 'more'
				this.get_job_list()
			},
			// 选择经验
			chooseExperience(item, index) {
				this.currentIndexExp = index;
				if (index == 0) {
					item = ''
				}
				this.Modalname = null;
				setTimeout(() => {
					this.dataList()
				}, 300)
				console.log(item);
			},
			/* @param {Object} item 选中的学历
			 * @param {Number} index 选中的索引
			 */
			chooseEducation(item, index) {
				this.currentIndexEdu = item.id;
				this.Modalname = null;
				setTimeout(() => {
					this.dataList()
				}, 300)
			},
			getPosition(id) {
				//获取职位标签
				this.$Request.post(this.$api.job.get_station_list, {
					// user_id: uni.getStorageSync('USERINFO').id,
					seach: '',
					type_pid: id || ''
				}).then(res => {
					if (res.code == '1') {
						if (id) {
							if (res.data != '') {
								res.data.unshift({
									aid: 0,
									station_name: "全部"
								})
							}
							this.slist = res.data
						} else {
							res.data.unshift({
								aid: 0,
								station_name: "全部"
							})
							this.positionList = res.data;
						}
					}
				});
			},
			/**
			 * @param {Object} item 选中的一级职位分类
			 * @param {Number} index 选中的索引
			 */
			chooseStation(item, index) {
				if (this.stationIndex === index) {
					return;
				}
				if (index == 0) {
					this.stations = ''
					this.stations_pid = ''
					this.dataList()
					this.$refs.shareType && this.$refs.shareType.close();
				}
				this.stationIndex = index
				this.getPosition(item.aid)
			},
			/**
			 * @param {Object} item 选中的职位
			 * @param {Number} index 选中的索引
			 */
			choosePosition(item, index) {
				console.log(index, this.jobIndex);
				this.jobIndex = index
				if (index == 0) {
					this.stations = ''
					this.stations_pid = this.positionList[this.stationIndex].aid
				} else {
					this.stations_pid = ''
					this.stations = this.slist[index]
				}
				this.dataList()
				this.$refs.shareType && this.$refs.shareType.close();
			},
			// 关闭弹窗
			close() {
				this.popOpen = false;
			},
			get_is_pay() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			chooseAddress() {
				this.Modalname = null;
				if (this.provinceIndex == 0) {
					this.provinceIndex = 1
					this.cityList = this.proventList[1].child
					this.areaIndex = null
					this.cityIndex = null
				}
				this.$refs.addressPop && this.$refs.addressPop.open();
				this.$refs.shareType && this.$refs.shareType.close();
			},
			// getAddressList  获取地址列表
			getAddressList() {
				this.$Request.post(this.$api.msg.getAddressList).then(res => {
					if (res.code == '1') {
						this.proventList = res.data
						this.proventList.unshift({
							shortname: '全国',
							id: ''
						})
						this.cityList = this.proventList[1].child

					}
				})
			},
			chooseProvince(item, index) {
				if (this.provinceIndex == index) {
					return
				}
				if (index == 0) {
					this.area_id = ''
					this.city_id = ''
					this.address = item.shortname
					this.dataList()
					this.$refs.addressPop && this.$refs.addressPop.close();
					return
				}
				this.provinceIndex = index
				this.cityList = this.proventList[index].child
				if (this.cityList[0].child) {
					this.cityList.unshift({
						shortname: '全' + this.proventList[index].shortname,
						id: this.proventList[index].id
					})
				}

				console.log(this.cityList, '=======');
				this.cityIndex = null
				this.areaIndex = null
			},
			chooseCity(item, index) {
				this.cityIndex = index
				this.city_id = item.id
				this.area_id = ''
				this.areaIndex = null
				this.address = item.shortname
				this.dataList()
				this.$refs.addressPop && this.$refs.addressPop.close();
			},
			chooseArea(item, index, num) {
				this.area_id = item.id
				// 城市id需要置空
				this.city_id = ''
				// 选择的城市需要置空
				this.cityIndex = null
				// 匹配 该市下面的区
				this.areaIndex = num + '-' + index
				this.address = item.shortname
				this.dataList()
				this.$refs.addressPop && this.$refs.addressPop.close();
			},
			toPage(url) {
				//跳转详情，判断是否登录
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('登录后才能操作哦')
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: url
				});
			},
			// 选择工厂排序类型
			check_sort(item, index) {
				this.choose = false;
				// if (this.longitude == '') {
				// 	this.$Common.toast('定位失败,请确认已打开定位权限或刷新页面后重试');
				// 	return false;
				// }
				this.sort_type = item.id;
				this.sorttype = index + 1;
				this.Modalname = null;
				// 点击排序不清空筛选状态
				// this.fan_type = 0;
				// this.welfare = '';
				if (index == 3) {
					if (this.stationIndex == 0 || this.stationIndex == 1) {
						this.stationIndex = 1
						let aid = this.positionList[1].aid
						this.getPosition(aid)
					}

					this.$refs.shareType && this.$refs.shareType.open();
				} else {
					this.dataList()
				}

			},
			// 获取筛选条件
			get_plant_type() {
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.plant_type = res.data;
					} else {}
				});
			},
			//点击筛选按钮
			plant_filter() {
				this.choose = true;
				// this.sort_type = 2;
				this.$refs.shareType.close()
				setTimeout(() => {
					this.Modalname = 'plant_filter';
				}, 300)

			},
			hideModal() {
				this.Modalname = null;
			},
			//选择福利筛选
			select_fuli_type(item, index) {
				this.Modalname = null;
				this.welfare = item.aid;
				setTimeout(() => {
					this.dataList()
				}, 300)
			},
			// 选择工价类型筛选
			select_plant_type(item, index) {
				this.Modalname = null;
				this.fan_type = index;
				setTimeout(() => {
					this.dataList()
				}, 300)
			},
			RadioChange(e) {},
			// tab切换  劳务派遣下面切换
			tabSelect(item, index) {
				if (this.isloading) return;
				uni.showLoading({
					mask: true
				}) //不展示
				this.isloading = true;
				this.Modalname = null;
				setTimeout(() => {
					this.isloading = false;
				}, 1000)
				this.$refs.shareType && this.$refs.shareType.close();
				// 最新排序
				this.sort_type = 1
				this.activeTab = index
				this.dataList()
			},
			navTo(url) {
				//跳转详情，判断是否登录
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: url
				})
			},
			getDegree() {
				//获取学历
				this.$Request.post(this.$api.user.user_degree).then(res => {
					if (res.code == '1') {
						res.data.unshift({
							id: 0,
							label: "全部"
						})
						this.degree_list = res.data;
					}
				});
			},
			//获取职位列表
			get_job_list() {
				let that = this;
				let user_id = uni.getStorageSync('USERINFO').id || ''
				let url = ''
				let data = {}
				this.$Common.getLocation(e => {
					this.longitude = e.longitude;
					this.latitude = e.latitude;
					//获取经纬度
					if (this.activeTab == 0) {
						// 劳务派遣
						url = this.$api.index.get_job_list
						let stations = ''
						let experience_pac = this.experience[this.currentIndexExp].label
						if (this.experience[this.currentIndexExp].label == '全部') {
							experience_pac = ''
						}
						if (this.stations && this.stations.aid) {
							stations = this.stations.aid
						} else {
							stations = ''
						}
						console.log(e.longitude, e.latitude);
						data = {
							tab: that.sort_type, //1最新发布 2距离排序 3工资排序
							longitude: e.longitude || '',
							latitude: e.latitude || '',
							page: that.page,
							list_rows: 50,
							station_type: that.type == 4 ? 1 : 3,
							fan_type: that.fan_type, //工价类型
							welfare: that.welfare, //福利
							name: this.keyword, //搜索关键字
							is_recommend:0,//不推荐职位
							city: '',
							city_id: this.area_id || '', //区id
							pid: this.city_id || '', //省、市id
							is_part_job_type: 0, //1 网约工，0不是网约工
							stations: stations || '',
							stations_pid: this.stations_pid || '', //职位选择全部时候的上级id
							education: this.currentIndexEdu,
							experience: experience_pac,
							user_id: user_id

						}
					} else if (this.activeTab == 1) {
						// 经纪人
						url = this.$api.job.serviceBrokerList
						data = {
							tab: 2, //距离排序
							page: that.page,
							longitude: e.longitude,
							latitude: e.latitude,
							page: that.page,
							list_rows: 50,
							user_id: user_id, //
							name: this.keyword,
							is_recommend:0,//不推荐
							city_id: this.area_id || '', //区id
							pid: this.city_id || '', //省、市id
						}
					}
					this.$Request.post(url, data).then(res => {
						uni.hideLoading();
						if (res.code == 1) {
							if (that.page == 1) that.jobList = []
							if (this.activeTab == 1) {
								res.data.data.map(item => {
									item.distance = parseFloat(item.distance).toFixed(2)
								})
							}
							res.data.data.map(item => {
								item.isShow = false
							})

							that.jobList = that.jobList.concat(res.data.data); //追加新数据
							that.last_page = res.data.last_page;
							that.status = res.data.last_page <= that.page ? 'nomore' : 'loading';
							setTimeout(() => {
								that.$emit('getData');
							}, 100);
							this.isloading = false
						} else {
							this.isloading = false
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					}).catch(err => {
						console.log(err);
					});
				})
			},
		}
	};
</script>

<style scoped lang="scss">
	page {
		overflow-x: hidden;
	}

	.job_img {
		width: 106rpx;
		height: 106rpx;
		border-radius: 8rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.card {
		min-height: 212rpx;
	}

	.label_item {
		margin-top: 10rpx;
		margin-left: 0;
		margin-right: 4rpx;
		padding: 4upx 10upx;
	}

	.type_item {
		width: 201rpx;
		height: 66rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(230, 230, 230, 1);
		opacity: 1;
		border-radius: 4rpx;
	}

	.tag_bg {
		width: 160rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
		color: #f37b1d;
		background-color: rgba(255, 158, 62, 0.2);
	}

	.tag_gray {
		width: 160rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 10rpx;
		color: #333;
		background-color: rgba(153, 153, 153, 0.2);
	}

	.activity {
		width: 100%;
		// height: 310upx;
		background: transparent;
		position: relative;
		z-index: 2;
		overflow: hidden; //防止after里面的宽度140%出现滚动条
		/* #ifndef MP-WEIXIN */
		padding-top: 40rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		padding-top: 200rpx;
		/* #endif */
		// top: 160rpx;
	}

	.active {
		background-color: #ecf6ff !important;
		color: #1b90ff !important;
		border: 1px solid #1b90ff;
	}

	.head_img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.info {
		flex: 1;
		line-height: 60rpx;
	}

	.returnBox {
		min-width: 97rpx;
		height: 87rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid #cccccc;
		opacity: 1;
		overflow: hidden;
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 45upx;
			background-color: #50aeff;
			line-height: 45upx;
			margin-top: -4upx;
			color: #ffffff;
			width: 100%;
		}
	}

	.cu-tag {
		height: auto;
	}

	.inputBox {
		width: 100%;
		height: 58rpx;
		border-radius: 34rpx;
		border: 1px solid #ddd;
	}

	.box_item {
		// width: 50%;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		// padding-bottom: 20upx;
	}

	.box_left {
		color: #1B90FF;
		position: relative;
	}

	.box_left::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		width: 54upx;
		height: 6upx;
		z-index: 99;
		background-color: #1B90FF;
	}

	.kailong {
		position: absolute;
		right: -16upx;
		top: 16upx;
		width: 0;
		height: 0;
		border-right: 14upx solid transparent;
		border-left: 14upx solid transparent;
		border-top: 14upx solid #333;
	}

	.kaiact {
		position: absolute;
		right: -16upx;
		top: 16upx;
		width: 0;
		height: 0;
		border-right: 14upx solid transparent;
		border-left: 14upx solid transparent;
		border-top: 14upx solid #999;
	}

	.btn_btn {
		width: 154upx;
		height: 64upx;
		background: #50aeff;
		border: 1px solid #50aeff;
		color: #ffffff;
		text-align: center;
		line-height: 64upx;
		font-size: 11px;
		border-radius: 45upx;
	}

	.top_img {
		position: fixed;
		right: 40rpx;
		bottom: 140rpx;
		width: 88rpx;
		height: 88rpx;
	}

	.fixed {
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 90upx;
		/* #endif */
		width: 100%;
		left: 0;
		right: 0;
		margin: auto;
		padding: 20upx 30upx;
		z-index: 100;
	}

	.filter-wrap {
		position: relative;
		z-index: 1100;
		top: 0;
		height: 100%;
	}

	.filter-pop {
		position: absolute;
		width: 100%;
		top: 90%;
		left: 0;
		right: 0;
		z-index: 10000;

		.filter-pop-mark {
			background: rgba(0, 0, 0, 0.3);
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 3000;
		}

		.filter-pop-mark1 {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 3000;
		}

		.filter-content {
			position: relative;
			z-index: 9900;
		}

		.room-list {
			position: relative;
			z-index: 9900;

			.left {
				position: relative;
				z-index: 9900;
				width: 255rpx;
				background: #eeeeee;
			}
		}
	}

	.address_item {
		padding: 6upx 20upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(230, 230, 230, 1);
		border-radius: 4rpx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}

	.boxservice {
		position: absolute;
		padding: 30upx;
		box-shadow: 0px 0px 24px rgba(153, 153, 153, 0.16);
		right: 0upx;
		top: 60upx;
		z-index: 10;
		padding-bottom: 60upx;
		background-color: #FFFFff;
	}
</style>
