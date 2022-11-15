<template>
	<!-- 网约工 -->
	<view class="padding solid-top">
		<view class="fixed bg-white">
			<view class=" flex align-center justify-between ">
				<view class="flex align-center" v-if="type==5">
					<text class="lg  cuIcon-location"></text>
					<text class=" bold text-df nowrap mr10" @tap="chooseAddress">						{{ address || '全国' }}					</text>
				</view>
				<view class="inputBox flex align-center padding">
					<text class="lg text-gray cuIcon-search margin-right-xs"></text>
					<input type="text" value="" placeholder="请输入关键词" placeholder-style="color:#999999;font-size:24rpx;" @confirm="search_input"
					 v-model="keyword" />
				</view>
				<view class="flex_shrink padding-left-sm" @tap='search_input'>搜索</view>
			</view>
			
			<!-- 走马灯 -->
			<view class="uni-margin-wrap" v-if="type == 5 && noticeList.length">
				<!-- <view :style="{width: noticeList.length*600 + 'px', left: left + 'px'}" style="position: absolute; top: 0; display: flex; align-items: center; height: 72upx;">
					<view v-for="(item, index) in noticeList" :key="item.id" @click="toNoticeDetails(item.id)" style="width: 600px;">
						<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="!item.path"><text style="margin-right: 12upx;">♨</text>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
						<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="item.path"><image :src="item.path" style="margin-right: 12upx; width: 36upx; height: 36upx; line-height: 36upx; border-radius: 50%;"></image>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
					</view>
				</view>
				
				<view class="line_cut" style="position: absolute; top: 72upx;"></view> -->
				
				<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="5000" :duration="5000" easing-function="linear">
					<swiper-item v-for="(item, index) in noticeList" :key="item.id" @click="toNoticeDetails(item.id)">
						<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="!item.path"><text style="margin-right: 12upx;">♨</text>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
						<view class="swiper-item" :style="{color: item.system_notice_title_color, fontSize: item.system_notice_title_size/2 + 'px'}" v-if="item.path"><image :src="item.path" style="margin-right: 12upx; width: 36upx; height: 36upx; line-height: 36upx; border-radius: 50%;"></image>{{item.system_notice_title.length > 35 ? item.system_notice_title.substr(0, 35) + '...' : item.system_notice_title}}</view>
						</swiper-item>
				</swiper>
				
				<view class="line_cut"></view> 
			</view>
			
			<!-- 排序 -->
			<view>
				<view class="">
					<view class="pb10">
						<view class="flex justify-between  bg-white" style="padding: 20upx 10upx 0upx 0upx;width: 100%;">
							<view class="flex alcenter " v-for="(item, index) in sort_list" :key="index" @tap="check_sort(item, index)"
							 style="position: relative;">
								<text class="text-df margin-right-sm text-gray" :class="sorttype == index + 1 ? ' text-black' : ''">{{ item.name }}</text>
								<text :class="sorttype == index + 1 ? 'kailong' : ' kaiact'"></text>
							</view>
							<view class="flex justify-center sort alcenter" @tap="plant_filter" style="position: relative;">
								<text class="f28 text-gray margin-right-sm" :class="choose ? 'text-black' : ''">筛选</text>
								<text :class="choose ? 'kailong' : ' kaiact'"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pb20" v-if="partList != ''" style="padding-top: 220upx;">
			<view class="flex column between ptb15  card brb_c  mb10" v-for="(item, index) in partList" :key="index" @tap="navTo(item,index)">
				<view class="flex ">
					<view class="bg-gray job_img mr10 flex_shrink">
						<image :src="item.image || '/static/images/logo.png'" mode="aspectFill" class="mr10"></image>
					</view>
					<view class="" style="width: 83%;">
						<view class="flex justify-between align-center">
							<view class=" flex align-center mb5">
								<text class="gray3  bold f32 overflow-one mr5" style="font-weight: bold;max-width: 280upx;">{{ item.name || '无' }}</text>
								<text class="text-white bg-theme   f24 " style="padding: 0 4upx;">{{item.is_top_name||''}}</text>
							</view>
							<view class=" bold mb5 text-right overflow-one f28 flex_shrink" style="color: #F77858;">
								劳务报酬{{item.commission||0}}元</view>
						</view>
						<!-- 工资 -->
						<view class="flex  between">
							<view class="flex column between" style="height: 90%;">
								<view class="">
									<view class="flex   justify-between" v-if="item.is_full==1">
										<text class="text-sm gray9">工作时长{{ item.service_time || '无' }}</text>
										<text class="text-sm normal_red pl5">接单人已满</text>
									</view>
									<text class="text-sm gray9" v-else>工作时长{{ item.service_time || '无' }}</text>
								</view>
								<view class="flex alcenter text-sm gray9" v-if="type==5">
									<text class="mr10 mtb5" >{{ item.distance || 0 }}km</text>
									<text class="text_line1">{{ item.city || item.address }}</text>
								</view>
							</view>
						</view>
						<view class=" flex align-center justify-between">
							<view class="" v-if="voucher==0">
								<text class="theme_blue text-sm">已向平台支付{{ item.pay_money || 0 }}元</text>
							</view>
							<view class="text-gray text-sm">{{item.update_time}}</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
		</view>
		<u-empty text="暂无相关内容" mode="list" v-if="partList == ''" style="padding-top: 170upx;"></u-empty>
		<!-- 福利待遇筛选框 -->
		<view class="cu-modal bottom-modal" :class="Modalname == 'plant_filter' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog bg-white plr10 ptb10" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="gray3 text-df mb20 bold mt10">类型</view>
						<view class="flex alcenter flex-wrap">
							<view class="type_item flex align-center justify-center mr10 mb10" v-for="(item, index) in getpart_type" :class="online_type == item.id ? 'active' : ''"
							 :key="index" @tap="select_online_type(item, index)">
								{{ item.label }}
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
		<uni-popup type="top" ref="shareType" :top="50+'px'" :bordeRadius="'0'">
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
								<!-- #ifdef MP-WEIXIN -->
								<block v-for="(itm, inx) in item.child" :key="itm.pid">
									<view class="padding-tb address_item   fu-fs28 " :class="[areaIndex ==index+'-'+ inx ? 'txt-theme' : 'text-333']"
									 @tap.stop="chooseArea(itm, inx,index)">{{itm.shortname}}</view>
								</block>
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<block v-for="(itm, inx) in item.child" :key="inx+9999">
									<view class="padding-tb address_item   fu-fs28 " :class="[areaIndex ==index+'-'+ inx ? 'txt-theme' : 'text-333']"
									 @tap.stop="chooseArea(itm, inx,index)">{{itm.shortname}}</view>
								</block>
								<!-- #endif -->
							
							</view>
						</view>		
						</block>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		
		<view style="width: 60%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 50upx; z-index: 98;">
			<view
				style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
				@click="toPage('/pagescenter/userypz/fabu_part')"
			>
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">派单</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				job_list: [],
				job_type: '', //网约工类型 4网上兼职 3：本地兼职
				page: 1,
				isload: false, //子组件是否加载完毕
				iconType: 'flower',
				plant_type: [],
				IMG_URL:this.IMG_URL,
				userInfo: '', //用户缓存信息
				activeTab: 0, //选择网约工类型
				showtop: false, //是否展示返回顶按钮
				distance_y: '',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				last_page: '', //总页数
				voucher: '', //是否开启支付
				partList: '', //网约工列表
				status: 'loadmore', //加载状态
				Modalname: null,
				choose: false, //是否点击筛选
				keyword: '', //关键词
				payrt_job_type: '', //网约工类型 1：网上兼职 2：本地兼职
				settlement_method: 0, //网约工 筛选条件
				is_part_job_type: 0, //0不是网约工 1是网约工
				getpart_type: '', //获取网约工筛选类型
				sorttype: 1, //选择排序
				online_type: 0, //选择的网约工类型
				sort_type: 1, //排序方式
				address: '全国', //当前地址
				city_name: '全国', //传参的参数名
				city_id: '', //城市id
				proventList: [], //省列表
				cityList: '', //市列表
				areaList: '', //区列表
				provinceIndex: 1, //省索引
				cityIndex: '', //选择的索引
				sort_list: [{
						id: 1,
						name: ' 最新发布',
					},{
						id: 2,
						name: '距离排序',
					},
					
					{
						id: 3,
						name: '工资排序',
					}
				],
				type: '5', //页面类型
				longitude: '',
				latitude: '',
				area_id: '', //区id
				cityIndex: null, //选择的索引
				areaIndex: null, //选择的区索引
				noticeList: [], // 通知列表
				t: null,
				left: 0
			};
		},
		onPageScroll: function(e) {
			this.distance_y = e.scrollTop;
			if (e.scrollTop >= 250) {
				this.showtop = true;
			} else {
				this.showtop = false;
			}
		},
		onLoad(e) {
			let that = this;
			if (e.type == 5) {
				uni.setNavigationBarTitle({
					title: '本地临时工派单'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '网络兼职派单'
				});
			}
			this.type = e.type
			this.getAddressList()
			if (e.type == 7) {
				this.sort_list = [{
						id: 1,
						name: ' 最新发布',
					},
					{
						id: 3,
						name: '工资排序',
					}
				]
				this.sort_type = 1
			} else {
				this.sort_list = [{
						id: 1,
						name: ' 最新发布',
					},{
						id: 2,
						name: '距离排序',
					},					
					{
						id: 3,
						name: '工资排序',
					}
				]
				this.sort_type = 1
			}
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
						// console.error(8888);
						if (res.code == 1) {
							if (this.type == 7) {
								that.address = ''
								that.area_id = '';
							} else {
								that.address = res.data.name || '全国';
								that.area_id = res.data.id;
							}
							this.longitude = res.data.lng;
							this.latitude = res.data.lat;
							this.get_part_list()
							this.getNoticeList(this.area_id)
							this.page = 1
						} else {
							that.$Common.toast('无法定位，请打开手机定位！！');
						}
					})
					.catch(err => {
						that.$Common.toast('无法定位，请打开手机定位！！' );
					});
			})
			uni.$on('to_bottom', res => {
				let that = this;
				if (res) {
					if (that.page >= that.last_page) return;
					that.status = 'loading';
					that.page++;
					that.get_part_list();
				}
			});

		},
		onShow() {
			this.userInfo = uni.getStorageSync('USERINFO');
			this.get_plant_type()
			this.get_part_type()
			// clearInterval(this.t); // 清空组件的定时器
			// this.t = setInterval(() => {
			// 	this.left -= 1;
			// 	if (Math.abs(this.left) > (this.noticeList.length - 1) * 600) {
			// 		this.left = 0;
			// 	}
			// }, 50);

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
				this.settlement_method = 0
				setTimeout(() => {
					this.get_part_list()
				}, 100)
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
			chooseAddress() {
				if (this.provinceIndex == 0) {
					this.provinceIndex = 1
					this.cityList = this.proventList[1].child
					this.areaIndex=null
					this.cityIndex=null
				}
				this.$refs.shareType && this.$refs.shareType.open();
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
			// 选择左侧的省列表
			chooseProvince(item, index) {
				this.provinceIndex = index
				if (index == 0) {
					this.area_id = ''
					this.city_id = ''
					this.address = item.shortname
					this.get_part_list()
					this.getNoticeList()
					this.$refs.shareType && this.$refs.shareType.close();
					return
				}
				this.cityList = this.proventList[index].child
				if(this.cityList[0].child){
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
				console.log(item,'-------------');
				this.cityIndex = index
				this.city_id = item.id
				this.area_id = ''
				this.areaIndex = null
				this.address = item.shortname
				this.get_part_list()
				this.getNoticeList(item.id)
				this.$refs.shareType && this.$refs.shareType.close();
			},
			chooseArea(item, index, num) {
				console.log(item,'-------------');
				this.area_id = item.id
				// 城市id需要置空
				this.city_id = ''
				// 选择的城市需要置空
				this.cityIndex = null
				// 匹配 该市下面的区
				this.areaIndex = num + '-' + index
				this.address = item.shortname
				this.get_part_list()
				this.getNoticeList(item.id)
				this.$refs.shareType && this.$refs.shareType.close();
			},
			RadioChange(e) {},
			get_part_type() { //获取网约工筛选类型
				this.$Request
					.post(this.$api.company.getpart_type)
					.then(res => {
						if (res.code == 1) {
							this.getpart_type = res.data;
							this.getpart_type.unshift({
								id: 0,
								label: '全部'
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
			// 选择工厂排序类型
			check_sort(item, index) {
				this.choose = false;
				if (this.longitude == '') {
					this.$Common.toast('定位失败,请确认已打开定位权限或刷新页面后重试');
					return false;
				}
				this.sort_type = item.id;
				this.sorttype = index + 1;
				// 点击排序不清空筛选状态
				// this.fan_type = 0;
				// this.welfare = '';

				this.dataList()

			},
			//点击筛选按钮
			plant_filter() {
				this.choose = true;
				// this.sort_type = 2;
				this.Modalname = 'plant_filter';
			},
			hideModal() {
				this.Modalname = null;
			},
			//选择网约工筛选类型
			select_online_type(item, index) {
				this.Modalname = null;
				this.online_type = item.id;
				this.settlement_method = item.id
				console.log(item.id, this.settlement_method);
				setTimeout(() => {
					this.dataList();
				}, 300)
			},
			dataList() {
				this.page = 1
				this.status = 'more'
				this.partList = []
				this.get_part_list()
			},
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			navTo(item) {
				//跳转详情，判断是否登录
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '/pagesHome/part_sort?id=' + item.aid + '&user_id=' + item.user_id + '&is_full=' +
						item.is_full + '&longitude=' + this.longitude + '&latitude=' + this.latitude + '&type=' +
						this.job_type,
				})
			},
			//获取兼职任务列表
			get_part_list() {
				let that = this;
				if (this.city_name == '全国') {
					this.city_name = ''
				}
				this.$Request
					.post(this.$api.index.get_job_list, {
						tab: that.sort_type, //1最新发布 2距离排序 3工资排序
						longitude: that.type == 5 ? that.longitude : '' || '',
						latitude: that.type == 5 ? that.latitude : '' || '',
						page: that.page,
						list_rows: 25,
						settlement_method: that.settlement_method || 0, //网约工筛选条件
						payrt_job_type: that.type == 5 ? 2 : 1 || '', //网约工类型
						is_part_job_type: 1, //1 网约工，0不是网约工
						name: this.keyword, //搜索
						city: '',
						city_id: this.area_id || '',
						pid: this.city_id || '',
					})
					.then(res => {
						uni.hideLoading();
						if (res.code == 1) {
							if (that.page == 1) that.partList = []
							that.partList = that.partList.concat(res.data.data); //追加新数据
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
					});
			},
			getNoticeList(city_id) {
				// 只限于本地临时工派单
				if (this.type != 5) return;
				city_id = city_id ? city_id : this.city_id;
				this.$Request.get(this.$api.msg.getNoticeList, {
					city_id: city_id ? city_id : 0,
					position: 2
				}).then(res => {
					if (res.code == 1) {
						this.noticeList = res.data;
					}
				});
			},
			toNoticeDetails(id) {
				// 导航到通知详情页面
				console.error(id);
				uni.navigateTo({
					url: '/pagesHome/index/notice_detail?id=' + id + '&type=20221015'
				})
			}
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

	.active {
		background-color: #ecf6ff !important;
		color: #1b90ff !important;
		border: 1px solid #1b90ff;
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
		top: 100upx;
		/* #endif */
		width: 100%;
		left: 0;
		right: 0;
		margin: auto;
		padding: 20upx 30upx;
		z-index: 100;
	}

	.address_item {
		padding: 6upx 20upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(230, 230, 230, 1);
		border-radius: 4rpx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
	
	.uni-margin-wrap {
		width: 150%;
		// height: 72upx;
	}
	
	.swiper {
		height: 80rpx;
	}
	
	.swiper-item {
		display: flex;
		height: 80rpx;
		line-height: 80rpx;
		text-align: left;
		// padding:  0 30rpx;
		justify-content: flex-start;
		align-items: center;
	}
</style>
