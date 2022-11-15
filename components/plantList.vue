<template>
	<view>
		<view class="pb20" v-if="jobList != ''">
			<view class="flex column between ptb10 plr15 card brb_c  mb10" v-for="(item, index) in jobList" :key="index"
				@tap="navTo(item,index)">
				<view class="flex ">
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
								{{ item.min_salary || 0 }}~{{ item.max_salary || 0 }}元/
								<text>月</text>
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
						<view class=" flex align-center justify-between padding-top-xs padding-bottom-xs"
							style="position: relative;">
							<view class="flex justify-between alcenter" v-if="voucher==0">
								<text class="theme_blue text-sm">已向平台支付保证金{{ item.money || 0 }}元</text>
							</view>
							<view class="text-right text-sm text-red" @click.stop="lookService(item)"
								v-if="item.server_price!=''">门店情报</view>
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
			<u-loadmore :status="status" icon-type="iconType" :load-text="loadText" />
		</view>
		<uni-popup type="center" ref="isShow" :bordeRadius="'0'">
			<view class="bg-white">门店劳务报酬服务费：{{server_price||''}}</view>
		</uni-popup>
		<u-empty text="暂无相关内容" mode="list" v-if="jobList == ''"></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				jobList: [], //职位列表
				job_type: 1,
				page: 1,
				order: 'asc',
				IMG_URL:this.IMG_URL,
				// longitude:'',
				// latitude:'',
				total_page: '',
				company_type: '',
				lat: '',
				server_price: '', //单个门店服务费
				lon: '',
				isload: false, //子组件是否加载完毕
				iconType: 'flower',
				fan_type: '', //工价类型
				welfare: '', //福利选择
				userInfo: '', //用户缓存信息
				isShow: false, //是否展示服务费
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
				companyType: 1, // 1劳务派遣  3企业直聘
			};
		},
		props: {
			// // 排序
			sort_type: {
				type: [String, Number]
			},
			// 福利
			Welfare: {
				type: [String, Number]
			},
			// 工价类型
			fanType: {
				type: [Number]
			},
			// 定位城市
			city_id: {
				type: [String, Number]
			},
		},
		created() {
			let that = this;
			// uni.$on('getLocation', res => {
			// 	that.lat = res.latitude;
			// 	that.lon = res.longitude;
			// 	that.job_list = [];
			// });
			uni.$on('to_bottom', res => {
				let that = this;
				if (res) {
					if (that.page >= that.last_page) return;
					that.status = 'loading';
					that.page++;
					that.get_job_list();
				}
			});
		},
		mounted() {
			if (this.company_type == 2) {
				this.is_part_job_type = 1
			} else {
				this.is_part_job_type = 0
			}
			// this.sort_type = this.$props.sortType;
			this.payrt_job_type = this.$props.partJobType
			this.settlement_method = this.$props.settlemenMethod
			this.userInfo = uni.getStorageSync('USERINFO');
			console.log(this.userInfo, 'this.userInfo ');
			this.get_plant_type()
		},
		destroyed() {
			// uni.$off('to_bottom')
		},
		methods: {
			// 加载数据
			dataList() {
				this.page = 1
				this.jobList = []
				this.status = 'more'
				this.get_job_list()
			},
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
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
			navTo(item) {
				//跳转详情，判断是否登录
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				this.$Common.getLocation(e => {
					uni.navigateTo({
						url: '/pagesHome/index/plant_detail?id=' + item.aid + '&longitude=' + e
							.longitude + '&latitude=' + e.latitude+'&is_servicebroker='+item.is_servicebroker
					})
				})
				// if (this.companyType == 2) {
				// 	uni.navigateTo({
				// 		url: '/pagesHome/part_sort?id=' + item.aid + '&user_id=' + item.user_id + '&is_full=' +
				// 			item.is_full,
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url: '/pagesHome/index/plant_detail?id=' + item.aid + '&longitude=' + this.longitude + '&latitude=' + this.latitude
				// 	})
				// }

			},
			//获取职位列表
			get_job_list() {
				let that = this;
				//获取经纬度
				this.$Common.getLocation(e => {
					this.$Request
						.post(this.$api.index.get_job_list, {
							tab: that.sort_type, //1最新发布 2距离排序 3工资排序
							longitude: e.longitude || '',
							latitude: e.latitude || '',
							page: that.page,
							list_rows: 25,
							station_type: 1,
							fan_type: that.fanType, //工价类型
							welfare: that.Welfare, //福利
							is_recommend:1,//首页推荐职位
							city: '',
							city_id: that.city_id || '',
							is_part_job_type: 0, //1 网约工，0不是网约工
							user_id: this.userInfo&&this.userInfo.id||0
						})
						.then(res => {
							uni.hideLoading();
							if (res.code == 1) {
								if (that.page == 1) that.jobList = []
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
						})
				});
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
