<template>
	<!-- 便民信息 -->
	<view class="padding brt_e" style="height: 100%;">
		<view style="height: 100vh; line-height: 100vh; font-weight: 300; font-size: 24upx; text-align: center;" v-if="showLoading">数据加载中...</view>
		<view v-if="!showLoading">
			<view class=" flex align-center justify-between fixed bg-white">
				<view class="flex align-center" v-if="type!=0">
					<text class="lg  cuIcon-location"></text>
					<text class=" bold text-df nowrap mr10" @tap="chooseAddress"> {{ address || '全国' }} </text>
				</view>
			
				<view class="inputBox flex align-center padding" >
					<text class="lg text-gray cuIcon-search margin-right-xs"></text>
					<input type="text" value="" placeholder="请输入关键词" placeholder-style="color:#999999;font-size:24rpx;"
						@confirm="search_input" v-model="keyword" />
				</view>
				<view class="flex_shrink padding-left-sm" @tap='search_input'  >搜索</view>
			</view>
			
			<!-- 走马灯 -->
			<view class="uni-margin-wrap" v-if="noticeList.length">
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
			
			<!-- 本地零工市场有tab -->
			<view class="up_margin" v-if="type == 1">
				<view class="margin-lr ptb10 bg-white margin-top-sm radius-16">
					<view class="margin-top-lg flex justify-between worktime-tab">
						<view
							class="text-center worktime-tab-item"
							:class="currentTab === item.index ? 'current-tab' : ''"
							v-for="(item, index) in tabList"
							:key="item.index"
							@click="currentTab = item.index"
						>
							<view class="text-333 f32 current-tab-font">{{ item.title }}</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 排序 -->
			<view v-if="type == 1">
				<view class="">
					<view class="pb10">
						<view class="flex justify-between  bg-white" style="padding: 20upx 10upx 0upx 0upx;width: 100%;">
							<view class="flex justify-center sort alcenter" @tap="plant_filter" style="position: relative;">
								<text class="f28 text-gray margin-right-sm" :class="choose ? 'text-black' : ''">筛选</text>
								<text :class="choose ? 'kailong' : ' kaiact'"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="pb20" v-if="newsList != ''" :class="type == 1 ? 'pt10' : 'pt20'" :style="{marginTop: type == 1 ? '' : '25px'}">
				<view class="mb20" v-for="(item, index) in newsList" :key="index"
					@tap="navTo('/pagesHome/index/convenience_detail?conven=1&id=' + item.id+'&type='+type+'&category_id='+category_id)">
					<!-- 此处修复了一个bug，某些情况下以下两种条件在原来的条件下都满足，即： -->
					<!-- 第一个：v-show="( item.img_url!='' &&item.img_url.length > 1) || item.img_url==''" -->
					<!-- 第二个：v-if="item.img_url!='' && item.img_url.length < 2" -->
					<view class="" v-if="( item.img_url &&item.img_url.length > 1) || !item.img_url">
						<view class="title overflow-two"><text style="font-weight: 700;" :style="currentTab == 1 ? 'color: #007AFF;' : 'color: #e43d33;'" v-if="type == 1">[{{currentTab === 1 ? '招聘信息' : '求职信息'}}]</text>{{ item.title }}</view>
						<view class="flex  align-center  mb10" v-if="item.img_url != ''"
							:class="item.img_url.length < 3 ? 'justify-start' : 'justify-between'">
							<view class="bg-gray picitem mr10" v-for="(itm, index) in item.img_url" :key="index">
								<image :src="itm" mode="aspectFill"></image>
							</view>
						</view>
						<view class="flex justify-between align-center">
							<text class="text-sm text-gray" v-if="type != 1">{{ item.update_time||'' }}</text>
							<view class="btn_btn" v-if="item.is_top_name">{{item.is_top_name||''}}</view>
						</view>
					</view>
					<view class="" v-if="item.img_url && item.img_url.length < 2">
						<view class="flex justify-start">
							<view class="mr20" style="width: 60%; flex: 1;">
								<view class="title overflow-two"><text style="font-weight: 700;" :style="currentTab == 1 ? 'color: #007AFF;' : 'color: #e43d33;'" v-if="type == 1">[{{currentTab === 1 ? '招聘信息' : '求职信息'}}]</text>{{ item.title ||''}}</view>
								<view class="flex justify-between align-center">
									<text class="text-sm text-gray" v-if="type != 1">{{ item.update_time||'' }}</text>
									<view class="btn_btn" v-if="item.is_top_name">{{item.is_top_name||''}}</view>
								</view>
							</view>
							<view class="bg-gray picitem" style="margin-right: 0;" v-if="item.img_url != ''">
								<image :src="item.img_url[0]" mode="aspectFill"></image>
							</view>
						</view>
					</view>
				</view>
				<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
			</view>
			<u-empty text="暂无相关内容" mode="list" v-if="newsList == ''" style="padding-top: 100upx;"></u-empty>
			<!-- 回到顶部按钮 -->
			<view class="to_top_wrap" v-if="showtop">
				<image :src="IMG_URL + 'static/miniwechat/index/to_top.png'" mode="" class="top_img" @tap="back_top">
				</image>
			</view>
			<uni-popup type="top" ref="shareType" :top="50+'px'" :bordeRadius="'0'">
				<view class="room-list flex bg-white" style="height: 900upx;">
					<scroll-view class="left margin-right-xl bg-gray" scroll-y scroll-with-animation
						style="height: 100%;max-width: 33%;">
						<view v-for="(item, index) in proventList" :key="index">
							<view class="padding-tb padding-lr-sm  fu-fs28"
								:class="[provinceIndex == index ? 'bg-white' : 'text-333']"
								@tap="chooseProvince(item, index)">{{item.shortname}}</view>
						</view>
					</scroll-view>
					<scroll-view class="right flex-sub" scroll-y scroll-with-animation style="height: 100%;">
						<view class="">
							<view v-for="(item, index) in cityList" :key="index">
								<view class="brb_e margin-bottom-sm">
									<view class="padding-bottom-sm " @tap='chooseCity(item,index)'
										:class="[cityIndex == index ? 'txt-theme' : 'text-333']">{{item.shortname}}</view>
									<view class="flex align-center flex-wrap">
										<view v-for="(itm, inx) in item.child" :key="itm.id">
											<view class="padding-tb type_item   fu-fs28 "
												:class="areaIndex ==(index+'-'+ inx)? 'txt-theme' : 'text-333'"
												@tap="chooseArea(itm, inx,index)">{{itm.shortname}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</uni-popup>
			
			<view style="width: 60%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 50upx; z-index: 20190118;" v-if="['1','3'].indexOf(type)>-1">
				<view style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="toAdd(1)">
					<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
					<text style="color: #FFFFFF; font-size: 26upx;" v-if="type == 1">招聘零工</text>
					<text style="color: #FFFFFF; font-size: 26upx;" v-if="type != 1">发布</text>
				</view>
				<view style="width: 128upx; height: 128upx; background-color: #e43d33; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;" @click="toAdd(2)" v-if="type == 1">
					<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
					<text style="color: #FFFFFF; font-size: 26upx;" v-if="type == 1">求职零工</text>
				</view>
			</view>
		</view>
		
		<view class="cu-modal bottom-modal" style="z-index: 999999999;" :class="Modalname == 'plant_filter' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog bg-white plr10 ptb10">
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
	</view>
</template>
<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				is_top: false,
				lat: '',
				lon: '',
				iconType: 'flower',
				page: 1,
				showtop: false, //是否展示返回顶按钮
				distance_y: '',
				newsList: [], //列表
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				IMG_URL:this.IMG_URL,
				proventList: [], //省列表
				cityList: '', //市列表
				areaList: '', //区列表
				provinceIndex: 1, //省索引
				last_page: '', //总页数
				type: '', //类型
				address: '全国', //当前地址
				status: 'loadmore', //加载状态
				keyword: '', //关键词
				city_id: '', //城市id
				area_id: '', //区id
				cityIndex: null, //选择的索引
				areaIndex: null, //选择的区索引
				isSearch:true,//是否展示搜索框
				category_id: null, // 栏目id
				tabList: [
					{
						index: 1,
						title: '招聘零工信息'
					},
					{
						index: 2,
						title: '求职零工信息'
					},
				],
				currentTab: 1,
				showLoading: true,
				noticeList: [],
				t: null,
				left: 0,
				choose: false,
				getpart_type: '', //获取本地零工岗位筛选类型
				Modalname: '',
				online_type: 0,
				jobId: ''
			};
		},
		watch: {
			currentTab(value) {
				// 本地零工市场才有此tab
				if (this.type != 1) return;
				// this.showLoading = true;
				if (value == 1) {
					this.category_id = 13;
				} else {
					this.category_id = 14;
				}
				
				// 获取一次数据
				this.get_list();
			}
		},
		onPageScroll: function(e) {
			this.distance_y = e.scrollTop;
			if (e.scrollTop >= 250) {
				this.showtop = true;
			} else {
				this.showtop = false;
			}
		},
		onReachBottom() {
			let that = this;
			if (that.page >= that.last_page) return;
			that.status = 'loading';
			that.page++;
			that.get_list();
		},
		onLoad(e) {
			this.type = e.type;
			this.category_id = e.id;
			console.log(e);
			this.currentTab = 1; // 为了触发currentTab的watcher对象
			if (this.type == 3) {
				this.city_id = ''
				this.area_id = ''
			}
			if (e.type == 0) {
				uni.setNavigationBarTitle({
					title: '打工头条'
				});
			} else if (e.type == 1) {
				this.get_part_type();
				uni.setNavigationBarTitle({
					title: '本地零工市场'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '黑名单资讯'
				});
			}
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
						cid: '',
						lat: lat
					})
					.then(res => {
						if (res.code == 1) {
							if (this.type == 1) {
								that.address = res.data.name;
								that.area_id = res.data.id;
								this.getNoticeList(res.data.id);
							}
							if (this.type == 3) {
								that.city_id = ''
								that.area_id = ''
							}
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

			// if (this.type == 1) {
			// 	setTimeout(() => {
			// 		this.t = setInterval(() => {
			// 			this.left -= 1;
			// 			if (Math.abs(this.left) > (this.noticeList.length - 1) * 600) {
			// 				this.left = 0;
			// 			}
			// 		}, 1);
			// 	}, 1000)
			// }
		},
		onShow() {
			if (uni.getStorageSync("_REBACK")) {
				if (this.type == 1) {
					this.currentTab = this.category_id == 13 ? 1 : 2;
					uni.removeStorageSync("_REBACK");
				}
				this.get_list();
			}
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
				this.get_list()
			},
			chooseAddress() {
				// console.log(this.proventList);
				if (this.provinceIndex == 0) {
					this.provinceIndex = 1
					this.cityList = this.proventList[1].child
					this.areaIndex = null
					this.cityIndex = null
				}
				this.isSearch=false
				this.$refs.shareType && this.$refs.shareType.open();
			},
			// getAddressList  获取地址列表
			getAddressList() {
				this.$Request.post(this.$api.msg.getAddressList).then(res => {
					// console.log(res);
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
				this.provinceIndex = index
				if (index == 0) {
					this.area_id = ''
					this.city_id = ''
					this.address = item.shortname
					this.get_list();
					this.getNoticeList();
					this.$refs.shareType && this.$refs.shareType.close();
					return
				}
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
				this.getNoticeList(this.city_id);
				this.$refs.shareType && this.$refs.shareType.close();
			},
			chooseArea(item, index, num) {
				// console.log(item)
				this.area_id = item.id
				// 城市id需要置空
				this.city_id = ''
				// 选择的城市需要置空
				this.cityIndex = null
				// 匹配 该市下面的区
				this.areaIndex = num + '-' + index
				this.address = item.shortname
				this.get_list()
				this.getNoticeList(this.area_id);
				this.$refs.shareType && this.$refs.shareType.close();
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
			// 获取便民信息列表
			get_list() {
				let that = this;
				let category_id = this.type == 0 ? 3 : this.type == 1 ? 2 : 4; //2：本地零工市场3：打工头条 4黑名单资讯;
				// 2022年10月15日将本地信息圈改成本地零工市场，分为招聘、求职，在后台加相应的栏目 
				if (this.type == 1) {
					category_id = this.category_id ? this.category_id : 13;
				}
				
				this.$Request
					.post(this.$api.operation.get_art_list, {
						category_id,
						page: this.page,
						city_id: this.type == 0 ? '' : this.area_id, //区id
						pid: this.type == 0 ? '' : this.city_id, //省、市id
						keword: this.keyword || '', //搜索关键字
						jobId: this.jobId || '', // 岗位id
					})
					.then(res => {
						uni.hideLoading();
						this.showLoading = false;
						if (res.code == 1) {
							// uni.hideLoading()
							if (that.page == 1) that.newsList = []
							that.newsList = that.newsList.concat(res.data.data); //追加新数据
							console.log(that.newsList);
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
			navTo(page) {
				//跳转详情，判断是否登录
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: page
				});
			},
			toAdd(index) {
				// 显示两个按钮
				if (this.type == 1) {
					if (index == 1) {
						this.category_id = 13;
					} else {
						this.category_id = 14;
					}
				}
				// type 1为本地信息全 3为坑骗拖欠名单
				let url = '/pagesHome/publishInfo?type=' + this.type + '&category_id=' + this.category_id; 
				uni.navigateTo({
					url: url
				})
			},
			getNoticeList(city_id) {
				city_id = city_id ? city_id : this.city_id;
				this.$Request.get(this.$api.msg.getNoticeList, {
					city_id: city_id ? city_id : 0,
					position: 1
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
			get_part_type() { //获取网约工筛选类型
				this.$Request.post(this.$api.job.get_station_list, {
					type_pid: 261
				}).then(res => {
					console.log(res);
					if (res.code == 1) {
						this.getpart_type = res.data.map(item => {
							return {
								id: item.aid,
								label: item.station_name
							}
						});
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
			//选择网约工筛选类型
			select_online_type(item, index) {
				this.Modalname = null;
				this.online_type = item.id;
				this.jobId = item.id
				setTimeout(() => {
					this.get_list();
				}, 300)
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
		width: 77upx;
		height: 32upx;
		background: #50aeff;
		border: 1px solid #50aeff;
		color: #ffffff;
		text-align: center;
		line-height: 32upx;
		font-size: 11px;
	}

	.picitem:nth-child(3) {
		margin-right: 0;
	}

	.inputBox {
		width: 100%;
		height: 58rpx;
		border-radius: 34rpx;
		border: 1px solid #ddd;
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
		z-index: 100;
		padding: 20upx 30upx;
	}

	.type_item {
		padding: 6upx 20upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(230, 230, 230, 1);
		border-radius: 4rpx;
		margin-right: 20upx;
		margin-bottom: 20upx;
	}
	
	.up_margin {
		margin: auto;
		// margin-top: -84upx;
		width: 686upx;
		// height: 154upx;
		position: relative;
		background-color: #fff;
		z-index: 3;
		border-radius: 16upx;
	}
	
	.worktime-tab {
		text-align: center;
		border-bottom: 1px solid #efefef;
		.worktime-tab-item {
			width: 100%;
			height: 72upx;
		}
		.current-tab {
			border-bottom: 3px solid #50aeff;
			color: #50aeff;
			padding-bottom: 10upx;
			.current-tab-font {
				font-weight: 700;
			}
		}
	}
	
	.uni-margin-wrap {
		width: 150%;
		// height: 72upx;
		position: relative;
		top: 50upx;
		z-index: 99;
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
</style>
