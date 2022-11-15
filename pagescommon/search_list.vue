<template>
	<!-- 搜索页 -->
	<view class="search">
		<!-- 头部 -->
		<view class="cu-custom" :style="[{ height: 0 + 'px' }]">
			<view class="cu-bar search fixed" :style="style" style="color: #333;">
				<view class="action" @tap="back"><text class="cuIcon-back text-black"></text></view>
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @confirm="search_input(search_txt, 'search_list')" v-model="search_txt" :adjust-position="false" type="text"
					 placeholder="搜索" confirm-type="search" />
				</view>

				<view @tap="search_input(search_txt, 'search_list')" class="action text-black"><text>搜索</text></view>
			</view>
		</view>
		<mescroll-uni :top="CustomBar * 2" ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true">
			<!--列表-->
			<view class="padding">
				<view class="mb15" v-for="(item, index) in data_list" :key="index">
					<view class="flex  between" v-if="stationType!=1&&stationType!=2" @tap="gozhaopin(item)">
						<view class="flex" style="width: 100%;">
							<!-- logo -->
							<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
								<image :src="item.image||'/static/images/logo.png'" mode="" class="mr10"></image>
							</view>
							<view class="" style="width: 100%;">
								<view class="flex justify-between ">
									<text class="gray3 mb5 bold f32 text_line1" style="font-weight: bold;">{{ item.name || '无' }}</text>
									<text class="normal_red bold mb5 text-right" style="flex-shrink: 0;" v-if="stationType==3||stationType==5">{{ item.min_salary || 0 }}~{{ item.max_salary || 0 }}元/月</text>
									<view class=" bold mb5 text-right" style="flex-shrink: 0;color: #F77858;font-size: 28upx;" v-else>
										劳务报酬{{item.commission}}元</view>
								</view>
								<!-- 工资 -->
								<view class="flex  between" style="width: 100%;">
									<view class="flex column between">
										<text class="text-sm gray9" v-if="stationType==3||stationType==5">{{ item.company_name || '无' }}</text>
										<text class="text-sm gray9" v-else>工作时长{{ item.service_time || '无' }}</text>
										<view class="flex alcenter text-sm gray9" >
											<text class="mr10 mtb5">{{ item.distance || 0 }}km</text>
											<text class="">{{ item.city || '无' }}</text>
										</view>
										<view class=" flex align-center justify-between">
											<view class="" v-if="voucher==0">
												<text class="theme_blue text-sm">已向平台支付保证金{{ item.money || 0 }}元</text>
												<!-- <text class="theme_blue text-sm" v-else>已向平台支付{{ item.pay_money || 0 }}元</text> -->
											</view>											
											<!-- <view class="text-gray text-sm" v-if="stationType==4||stationType==6">{{item.update_time}}</view> -->
										</view>
									</view>
									<view class="flex column align-center" >
										<view class="returnBox flex column around  alcenter" v-if="item.fan_price!=''">
											<text class="f28 top_blue tc">{{ item.fan_type || '无' }}</text>
											<text class="f28 normal_red ellipsis tc bold plr5" style="width: 100%;">{{ item.fan_price || 0 }}元</text>
										</view>
										<view class="text-center text-sm text-red padding-top-sm" @click.stop="lookService(item)"
											v-if="item.server_price!=''">门店情报</view>
									</view>
								</view>
								<view class="flex between " style="" >
									<view class="flex alcenter" style="flex: 1;">
										<view class="">
											<text class="cu-tag text-white bg-theme bold text-sm label_item radius6" v-for="(i, v) in item.welfare" :key="i">{{ i }}</text>
										</view>
									</view>
									<view class="tc ellipsis mt5" style="">
										<text class="text-sm gray3  tc ">已报名 {{ item.apply_numbers || 0 }}人</text>
									</view>
								</view>
							</view>
						</view>
						<!-- 工价 -->
					</view>
					<view class="" v-if="stationType==1||stationType==2" @tap='toPage(item)'>
						<view class="">
							<view class="" v-if="item.img_url.length > 1||item.img_url == ''">
								<view class="title overflow-two">{{ item.title }}</view>
								<view class="flex  align-center  mb10" v-if="item.img_url != ''" :class="item.img_url.length < 3 ? 'justify-start' : 'justify-between'">
									<view class="bg-gray picitem mr10" v-for="(itm, index) in item.img_url" :key="index">
										<image :src="itm" mode="aspectFill"></image>
									</view>
								</view>
								<view class="flex justify-between align-center">
									<text class="text-sm text-gray">{{ item.update_time||'' }}</text>
									<view class="btn_btn" v-if="item.is_top_name">{{item.is_top_name||''}}</view>
								</view>
							</view>
						</view>
						<view class="" v-if="item.img_url != ''">
							<view class="flex justify-start" v-if=" item.img_url.length < 2">
								<view class="mr20" style="width: 60%; flex: 1;">
									<view class="title overflow-two">{{ item.title ||''}}</view>
									<view class="flex justify-between align-center">
										<text class="text-sm text-gray">{{ item.update_time||'' }}</text>
										<view class="btn_btn" v-if="item.is_top_name">{{item.is_top_name||''}}</view>
									</view>
								</view>
								<view class="bg-gray picitem" style="margin-right: 0;" v-if="item.img_url != ''">
									<image :src="item.img_url[0]" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
		<uni-popup type="center" ref="isShow" :bordeRadius="'0'">
			<view class="bg-white">门店劳务报酬服务费：{{server_price||''}}</view>
		</uni-popup>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				StatusBar: this.StatusBar,
				IMG_URL:this.IMG_URL,
				CustomBar: this.CustomBar,
				company_name: '', //公司名
				seach: false, //点击搜索框
				checkAll: false, //全选
				aid: [], //选择的公司id
				seachlist: [], //搜索公司列表
				company_id: [], //要传的参数公司id
				search_txt: '', //搜索的文本
				data_list: [], //数据列表
				mescroll: null, //实例
				server_price: '', //单个门店服务费
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 5 // 每页数据的数量,默认10 （这是在后台配置的）
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关内容'
					}
				},
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				stationType: 3, //搜索的职位类型
				activeTab: '', //1：网上兼职 2：本地兼职
				city: '', //城市
				voucher: '', //是否开启支付
				cityid: '', //城市id
			};
		},
		computed: {
			style() {
				//设置导航兼容
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				return style;
			}
		},
		onLoad: function(options) {
			// 接受参数，调取列表
			// this.stationType = options.stationType
			if (options.stationType == 4 || options.stationType == 6) {
				this.is_part_job_type = 1
			} else {
				this.is_part_job_type = 0
			}
			this.activeTab = options.activeTab
			this.city = options.city
			this.cityid = options.cityid || ''
			this.search_txt = options.keyword || '';
			if (this.search_txt) {
				this.search_input(this.search_txt, 'search_list');
			}
			this.get_plant_type()
		},
		methods: {
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			search_input(info, storagename) {
				//去搜索
				if (!info) {
					this.$Common.toast('请输入搜索内容！');
					return false;
				}
				if (/^\s*(\S+)\s*$/.test(this.search_txt)) {
					this.search_txt = RegExp.$1
				} else {
					this.$Common.toast('请不要输入空格');
					return false;
				}
				// 存储历史搜索
				let storage = uni.getStorageSync(storagename);
				console.log(storage);
				if (storage) {
					let repetition = true;
					for (let i in storage) {
						if (storage[i] == info) {
							storage.splice(i, 1);
							break;
						}
					}
					storage.unshift(info);
					uni.setStorageSync(storagename, storage);
				} else {
					uni.setStorageSync(storagename, [info]);
				}
				this.mescroll && this.mescroll.resetUpScroll();
			},
			back() {
				//返回
				uni.navigateBack({});
			},
			// 点击跳转公司详情
			gozhaopin(item) {
				this.$Common.getLocation(e => {
					//获取经纬度
					if (this.stationType == 3 || this.stationType == 5) {
						uni.navigateTo({
							url: '/pagesHome/index/plant_detail?id=' + item.aid + '&longitude=' + e
								.longitude + '&latitude=' + e.latitude+'&is_servicebroker='+item.is_servicebroker
						});
					} else {
						uni.navigateTo({
							// url: '/pagesHome/index/plant_detail?id=' + aid
							url: '../pagesHome/part_sort?id=' + item.aid + '&user_id=' + item.user_id +
								'&is_full=' + item.is_full + '&longitude=' + e.longitude + '&latitude=' + e
								.latitude,
						});
					}
				});
			},
			// 查看门店情报
			lookService(item) {
				if (item.is_servicebroker == 1) {
					this.$refs.isShow && this.$refs.isShow.open();
					this.server_price = item.server_price
				} else {
					this.$Common.toast('门店服务经纪人才可查看')
				}
			},
			toPage(item) {
				uni.navigateTo({
					url: '/pagesHome/index/convenience_detail?conven=1&id=' + item.id
				});
			},
			upCallback(mescroll) {
				//上拉加载
				let page = mescroll.num; // 页码, 默认从1开始
				let list_rows = mescroll.size; // 页长, 默认每页10条
				let station_type = ''
				let payrt_job_type = ''
				//  1劳务派遣  3企业招工 。
				if (this.stationType == 3) {
					station_type = 1
				} else if (this.stationType == 5) {
					station_type = 3
				} else {
					station_type = ''
				}
				// 1：网上兼职 2：本地兼职
				if (this.stationType == 4) {
					payrt_job_type = 2
				} else if (this.stationType == 6) {
					payrt_job_type = 1
				} else {
					payrt_job_type = ''
				}
				// let url = '',
				// 	data = {};
				// if (this.stationType == 1 || this.stationType == 2) {
				// 	// 便民信息
				// 	url = this.$api.operation.get_art_list
				// 	data = {
				// 		category_id: this.stationType == 1 ? 3 : 2, //2：本地信息圈3：打工头条
				// 		page: page,
				// 		city_id: this.stationType == 1 ? '' : this.cityid,
				// 		keword: this.search_txt, //搜索关键字
				// 	}
				// } else {
				// 	// 职位  兼职任务
				// 	url = this.$api.index.get_job_list
				this.$Common.getLocation(e => {
					// 		data = {
					// 			tab: 2,
					// 			longitude: e.longitude,
					// 			latitude: e.latitude,
					// 			city: this.city,
					// 			page: page,
					// 			list_rows: 10,
					// 			station_type: station_type,
					// 			// is_part_job_type: this.is_part_job_type, //是否网约工
					// 			name: this.search_txt, //搜索关键字
					// 			// payrt_job_type: payrt_job_type, //1：网上兼职 2：本地兼职
					// 		}
					// 	})
					this.$Request.post(this.$api.index.get_job_list, {
							tab: 2,
							longitude: e.longitude,
							latitude: e.latitude,
							city_id: this.cityid,
							page: page,
							list_rows: 10,
							station_type: station_type,
							// is_part_job_type: this.is_part_job_type, //是否网约工
							name: this.search_txt, //搜索关键字
							// payrt_job_type: payrt_job_type, //1：网上兼职 2：本地兼职
							user_id: uni.getStorageSync('USERINFO').id
						})
						.then(res => {
							if (res.code == 1) {
								let curPageData = res.data.data;
								// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
								let totalPage = res.data.total;
								//设置列表数据
								if (mescroll.num == 1) this.data_list = []; //如果是第一页需手动置空列表
								this.data_list = this.data_list.concat(curPageData); //追加新数据
								mescroll.endBySize(curPageData.length, totalPage);
							} else {
								this.mescroll.endErr();
							}
						})
						.catch(err => {
							this.mescroll.endErr();
						});
				})
			}
		}
	};
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.cu-card.article>.cu-item .content .desc {
		min-width: 1px;
	}

	.text-gray {
		font-size: 20upx;
	}

	.returnBox {
		min-width: 97rpx;
		height: 87rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid #cccccc;
		opacity: 1;
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 50%;
			background-color: #50aeff;
			margin-top: -3upx;
			color: #ffffff;
			width: 100%;
		}
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

	.label_item {
		margin-top: 10rpx;
		margin-left: 0;
		margin-right: 4rpx;
	}

	.cu-card.article>.cu-item {
		padding: 0 !important;
	}

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
</style>
