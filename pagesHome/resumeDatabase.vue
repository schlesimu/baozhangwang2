<template>
	<!-- 简历库列表 -->
	<view class=" padding-bottom " style="height: 100%;">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"><text class="text-bold">简历库</text></block>
			<!-- <block slot="right"><view class="padding text-df" style="color: #2A89FF;" @click="updateList">刷新</view></block> -->
		</cu-custom>
		<!-- <view class="cu-custom brb_e bg-white" :style="[{height: CustomBar+'px'}]">
			<view class="cu-bar fixed bg-white" :style="{height: CustomBar+'px',paddingTop: StatusBar+'px'}">
				<view class="action" @tap="isback">
					<text class="cuIcon-back "></text>
				</view>
				<view class="content f32" :style="{top:StatusBar + 'px'}">简历库</view>
				<view class="right f32" :style="{top:StatusBar + 'px'}" @click="updateList">刷新</view>
			</view>
		</view> -->
		<!-- 搜索框 -->
		<view class="  fixed bg-white" :style="[{height:CustomBar+'px'}]">
			<view class="bg-theme w100 text-center text-sm ptb5 text-white">可查看简历{{lookNum}}份</view>
			<view class="flex bg-white search_box align-center plr15 between padding-top-sm">
				<view class="flex alcenter bg-white">
					<text class="lg  cuIcon-location"></text>
					<text class=" bold text-df nowrap mr10" @tap="chooseAddress">
						{{ address || '全国' }}
					</text>
					<view class="inputBox flex align-center padding" >
						<text class="lg text-gray cuIcon-search"></text>
						<input type="text" placeholder="请输入关键字" @confirm="search_input" v-model="keyword" placeholder-style="color:#999999;font-size:24rpx;" />
					</view>
					<view class="flex_shrink padding-left-sm" @tap='search_input'  >搜索</view>
				</view>
			</view>
			<view class="padding-top-sm bg-white" style="position: relative; z-index: 100;">
				<fu-filter @choosePosition="choosePosition" @chooseSalary="chooseSalary" @chooseEducation="chooseEducation"
				 @chooseExperience="chooseExperience" ref="multiLevelMenu"></fu-filter>
			</view>
		</view>
		<view class="padding" v-if="brokerList != ''" style="padding-top: 250upx;">
			<view class="mb20 brb_e padding-bottom" v-for="(item, index) in brokerList" :key="index">
				<view class="flex ">
					<view class="bg-f2f3 job_img mr10 round overHidden" style="flex-shrink: 0;">
						<image :src="item.head_img || '/static/images/logo.png'" mode="aspectFill" class="mr10 round"></image>
					</view>
					<view class="" style="width: 59%;">
						<view class="flex align-center justify-between pb10">
							<view class="overflow-one ewrap  f32 bold text-black">{{item.want_find||''}}</view>
						</view>
						<view class="flex align-center justify-between pb5 w100">
							<view class="text-cut ewrap  text-666 f28">{{item.sex==2?'女':'男'||'保密'}} / {{item.age||'0'}}/
								{{item.work_experience||0}} / {{item.education||'无'}}学历
							</view>
						</view>
						<view class="text-df">
							期望薪资：{{item.salary||'面议'}}
							
						</view>
					</view>
					<view class=" flex  align-center justify-between">
						<text class=" btn_btn" @click.stop="lookResume(item)">查看简历</text>
						<!-- <text class=" btn_btn" v-if="item.is_signup==1">已报名</text> -->
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
		</view>
		<u-empty text="暂无相关内容" mode="list" v-if="brokerList == ''" :style="[{paddingTop:CustomBar*2+ 100 +'rpx'}]">
		</u-empty>
		<!-- 选择地址 -->
		<uni-popup type="top" ref="addressPop" :top="CustomBar+ 70+'px'" :bordeRadius="'0'">
			<view class="room-list flex bg-white" style="height: 800upx;">
				<scroll-view class="left margin-right-xl bg-gray" scroll-y scroll-with-animation style="height: 100%;max-width: 33%;">
					<block v-for="(item, index) in proventList" :key="index">
						<view class="padding-tb padding-lr-sm  fu-fs28" :class="[provinceIndex == index ? 'bg-white' : 'text-333']" @tap="chooseProvince(item, index)">{{item.shortname}}</view>
					</block>
				</scroll-view>
				<scroll-view class="right flex-sub" scroll-y scroll-with-animation style="height: 100%;">
					<view class="">
						<block v-for="(item, index) in cityList" :key="index">
							<view class="brb_e margin-bottom-sm">
								<view class="padding-bottom-sm " @tap='chooseCity(item,index)' :class="[cityIndex == index ? 'txt-theme' : 'text-333']">{{item.shortname}}</view>
								<view class="flex align-center flex-wrap">
									<block v-for="(itm, inx) in item.child" :key="itm.id">
										<view class="padding-tb address_item   fu-fs28 " :class="[areaIndex ==index+'-'+ inx ? 'txt-theme' : 'text-333']"
										 @tap="chooseArea(itm, inx,index)">{{itm.shortname}}</view>
									</block>
								</view>
							</view>				
						</block>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 弹框 -->
		<leePopup :content="'免费次数已用完，去购买查看简历次数'" :confirmTxt="'确认'" @cancel="cancel" @confirm="confirm" ref="leepop"
		 :poptype='2'>
		</leePopup>
		<leePopup :content="'认证成为企业或公司才能查看简历,是否去认证？'" :confirmTxt="'确认'" @cancel="cancelResume" @confirm="confirmResume" ref="leepopResume"
		 :poptype='2'>
		</leePopup>
		
		<view style="width: 60%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 50upx; z-index: 98;">
			<view
				style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
				@click="toPage('/pagescenter/userypz/my_jianli')"
			>
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">创建简历</text>
			</view>
		</view>
	</view>

</template>
<script>
	import leePopup from '@/components/lee-pop.vue';
	import fuFilter from '@/components/fu-filter.vue';
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';

	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			leePopup,
			fuFilter
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				is_top: false,
				isSearch:true,//是否展示搜索框
				longitude_const: '',
				latitude_const: '',
				longitude: '', //
				latitude: '', //
				iconType: 'flower',
				page: 1,
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				address: '', //当前地址
				last_page: '', //总页数
				brokerList: '', //经纪人列表
				keyword: '', //关键词
				voucher: '', //是否开启支付
				user_id: '', //用户ID
				userInfo: '', //用户信息
				city_id: '', //城市id
				lookNum: 3, //查看简历次数
				dataList: [], //查看的简历id
				station: '', //行业职位
				experience: '', //经验
				education: 0, //学历
				salary: '', //薪资
				resumeNumInfo: '', //配置信息
				provinceIndex: 0, // 选中的省索引
				proventList: [], //省列表
				cityList: '', //市列表
				area_id: '', //区id
				cityIndex: null, //选择的索引
				areaIndex: null, //选择的区索引
				station_id:'',//上级职位id
			};
		},

		onLoad() {
			this.userInfo = uni.getStorageSync('USERINFO');
			this.user_id = this.userInfo.id;
			this.dataList = uni.getStorageSync('lookResumNum') || []
			console.log(this.dataList);
			this.getAddressList()
			this.$Common.getLocation(e => {
				let that = this
				//获取经纬度
				this.longitude_const = e.longitude;
				this.latitude_const = e.latitude;
				let lat = [e.longitude, e.latitude];
				this.$Request
					.post(that.$api.msg.cityPosition, {
						user_id: that.user_id || '',
						// #ifdef APP-PLUS
						client_id: plus.device.uuid,
						// #endif
						cid: that.city_id || '',
						lat: lat
					})
					.then(res => {
						if (res.code == 1) {
							that.address = res.data.name;
							that.area_id = res.data.id;
							this.longitude = res.data.lng;
							this.latitude = res.data.lat;
							this.get_list()
							// uni.setStorageSync('cityId', that.city_id);
							// uni.setStorageSync('chooseCity', res.data);
							this.page = 1
						} else {
							that.$Common.toast('无法定位，请打开手机定位！！');
						}
					})
					.catch(err => {
						that.$Common.toast('无法定位，请打开手机定位！！');
					});
			})
		},
		onShow() {
			this.getResumeNumInfo()
		},
		onReachBottom() {
			this.get_list(++this.page, true);
		},
		onUnload() {
			uni.$off('area')
			uni.$off('country')
		},
		methods: {
			// 选择行业职位
			choosePosition(e) {
				// console.log(e, '====');
				this.station = e.aid;
				this.station_id = e.station_id;
				this.get_list()
			},
			// 选择城市
			chooseCity(e) {
				console.log(e, '====');
				this.cityId = e.cityId;
				this.get_list()
			},
			// 选择薪资
			chooseSalary(e) {
				console.log(e, '====');
				this.salary = e;
				this.get_list()
			},
			// 选择学历
			chooseEducation(e) {
				console.log(e, '====');
				this.education = e.id
				this.get_list()
			},
			// 选择经验
			chooseExperience(e) {
				console.log(e, '====');
				this.experience = e.label;
				this.get_list()
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
				this.page = 1; // 每次启动搜索分页都需要重置，否则可能搜不出东西
				this.welfare = '';
				setTimeout(() => {
					this.get_list()
				}, 100)
			},
			cancel() {
				this.$refs.leepop.close()
			},
			// 确定购买简历
			confirm() {
				uni.navigateTo({
					url: 'payViewNumber'
				})
				this.$refs.leepop.close()
			},
			// 确定认证公司
			confirmResume() {
				uni.navigateTo({
					url: '../pagescenter/userypz/zhaopinSort'
				})
				this.$refs.leepopResume.close()
			},
			cancelResume() {
				this.$refs.leepopResume.close()
			},
			isback() {
				uni.navigateBack()
			},
			chooseAddress() {
				if (this.provinceIndex == 0) {
					this.provinceIndex = 1
					this.cityList = this.proventList[1].child
					this.areaIndex = null
					this.cityIndex = null
				}
				this.isSearch=false
				this.$refs.addressPop && this.$refs.addressPop.open();
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
					this.get_list()
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
				this.get_list()
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
				this.get_list()
				this.$refs.addressPop && this.$refs.addressPop.close();
			},
			lookResume(item) {
				//跳转详情，判断是否登录
				if (!uni.getStorageSync('USERINFO').user_token) {
					this.$Common.toast('登录后才能操作哦')
					return
				}
				if (this.resumeNumInfo.is_Company == 0) {
					this.$refs.leepopResume.open()
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				// if (this.dataList.indexOf(item.aid) == -1) {
				// 	this.dataList.push(item.aid)
				// 	uni.setStorageSync('lookResumNum', this.dataList)
				// }
				// console.log(this.dataList, '====');
				// if (this.dataList.length > this.lookNum) {
				// 	this.$refs.leepop.open()
				// 	return
				// }
				if (this.resumeNumInfo.look_num == 0 && this.resumeNumInfo.company_num == 0) {
					this.$refs.leepop.open()
					return
				}
				uni.navigateTo({
					url: 'lookResumeNew?uid=' + item.user_id + '&resume_id=' + item.aid + '&type=0'
				});
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
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			call(item) {
				uni.makePhoneCall({
					phoneNumber: item.phone
				});
			},
			// 获取购买次数 查看次数
			getResumeNumInfo() {
				this.$Request.post(this.$api.user.getResumeNumInfo, {
					user_id: uni.getStorageSync('USERINFO').id
				}).then(res => {
					if (res.code == 1) {
						this.resumeNumInfo = res.data.resume
						this.lookNum=Number(res.data.resume.look_num)+ Number(res.data.resume.company_num)
					} else {

					}
				});
			},
			get_list(page = 1, flow = false) {
				let that = this;
				this.$Request
					.post(this.$api.user.resumeStoreList, {
						work_experience: this.experience || '', //工作经验
						keyword: this.keyword || '',
						education: that.education || '', //学历
						station: that.station || '', //职位类别
						stations_pid: that.station_id || '', //一级职位id
						salary: this.salary || '', //期望薪资
						city_id: this.area_id||'', //城市id
						pid: this.city_id||'', //城市id
						page: page
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 1) {
							// uni.hideLoading()
							if (that.page == 1) that.brokerList = []
							res.data.data.map(item => {
								item.distance = parseFloat(item.distance).toFixed(2)
							})

							that.brokerList = that.brokerList.concat(res.data.data); //追加新数据
							that.last_page = res.data.last_page;
							that.status = res.data.last_page <= that.page ? 'nomore' : 'loading';
							setTimeout(() => {
								that.$emit('getData', 111);
							}, 100);
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
		}
	};
</script>
<style lang="scss">
	.title {
		font-size: 32upx;
		font-weight: bold;
		line-height: 1.2;
		letter-spacing: 1;
		margin-bottom: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		line-clamp: 2;
	}

	.inputBox {
		width: 100%;
		height: 58rpx;
		border-radius: 34rpx;
		border: 1px solid #ddd;
	}

	.picitem {
		width: 215upx;
		height: 152upx;
		border-radius: 20upx;
		overflow: hidden;
		margin-right: 20upx;

		image {
			width: 100%;
			height: 100%;
		}
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

	.picitem:nth-child(3) {
		margin-right: 0;
	}

	.job_img {
		width: 106rpx;
		height: 106rpx;
		border-radius: 8upx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.fixed {
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		z-index: 100;
		height: 100upx;
		width: 100%;
		background-color: #ffffff;
	}
	.address_item {
		padding: 6upx 20upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(230, 230, 230, 1);
		border-radius: 4rpx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
</style>
