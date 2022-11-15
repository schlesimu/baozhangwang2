<!-- 报名状态 -->
<template>
	<view class="">
		<!--导航 -->
		<view class="bg-white nav fixed">
			<view class="flex text-center align-center justify-around">
				<block v-for="(item, index) in statusList" :key="index">
					<view class="flex align-center">
						<view class="cu-item  text_999 f30" :class="current == index ? 'select' : ''"
							@tap="selectStatus(item, index)">{{item.name}}</view>
					</view>
				</block>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" :top="80" @init="mescrollInit" @down="downCallback" @up="upCallback"
			:down="downOption" :up="upOption" :fixed="true">
			<view class="padding" v-for="(item, index) in dataList" :key="index" @tap='godetail(item)'>
				<view class="flex justify-start padding-tb ">
					<view class="bg_img" style="flex-shrink: 0;">
						<image :src="item.image||'/static/images/logo.png'" mode="aspectFill"></image>
					</view>
					<view class="" style="flex: 1;">
						<view class="flex justify-between  " style="margin-bottom: 10upx;">
							<text class="text-bold ewrap text_line1" style="font-size: 32upx;">{{item.name||''}} </text>
							<text class="text-df txt_red" style="flex-shrink: 0;">{{item.salary_money}}元/月</text>
						</view>
						<view class="flex justify-between align-center">
							<view class="text-left " style="font-size: 12px;">
								<view class="text-gray text-sm">{{item.company_name||''}}</view>
								<view class="text-gray text-sm" style="padding: 10upx 0;">{{item.distance||''}}km
									{{item.city||''}}
								</view>
								<view class="text-sm" style="color:#1B90FF ;" v-if="voucher==0">
									已向平台支付保证金{{item.money||0}}元</view>
							</view>
							<view class="returnBox flex column around  alcenter" style="flex-shrink: 0;" v-if="item.fan_price!=''">
								<text class="f28 top_blue tc plr5">{{ item.fan_type || '无' }}</text>
								<text class="f28 normal_red ellipsis tc bold plr5"
									style="width: 100%;">{{ item.fan_price || 0 }}元</text>
							</view>
						</view>
						<view class="flex align-center justify-between">
							<view class=" text-gray overflow-one" style="font-size: 12px;margin-top: 10upx;">
								报名时间：{{item.create_time}}
							</view>
							<view class=" text-gray flex_shrink pl5" style="font-size: 12px;margin-top: 10upx;">
								已报名{{item.apply_numbers}}人
							</view>
						</view>

					</view>
				</view>
				<view class="" v-if="item.set_up_status!=2">
					<view class="btn_help" @tap.stop='goShare(item,index)' v-if="item.red_envelope_type!=0"> 邀请好友助力加薪
					</view>
					<!-- <view class="btn_help" @tap.stop='goShare(item,index)' v-if="item.red_envelope_type!=0" >						红包助力活动已结束		</view> -->
				</view>

			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				dataList: [],
				lat: '', //纬度
				isopen: true, //跳转页面
				lon: '', //经度
				current: 0, //选择分类
				statusList: [{
						id: -5,
						name: '全部',
						value: 'all'
					},
					{
						id: 0,
						name: '待确认',
						value: 'unconfirmed'
					},
					{
						id: 5,
						name: '已确认',
						value: 'agree'
					},
					{
						id: 6,
						name: '已拒绝',
						value: 'refuse'
					}
				],
				downOption: {
					//下拉刷新
					auto: false //页面初次加载禁止
				},
				upOption: {
					//上拉加载
					auto: false //页面初次加载禁止
				},
				set_up_status: 'all', //状态
				voucher: '', //是否开启支付
			};
		},
		onLoad() {
			uni.showLoading({})
			this.$Common.getLocation(e => {
				//获取经纬度
				console.log(e);
				this.lon = e.longitude;
				this.lat = e.latitude;
				this.$nextTick(() => {
					// 	this.downCallback();
					this.mescroll && this.mescroll.resetUpScroll()
				});
			});
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
			godetail(item) { //跳转详情页
				if (this.isopen == false) {
					return;
				};
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true
				}, 3000);
				this.$Common.getLocation(e => {
					//获取经纬度
					uni.navigateTo({
						url: '../../pagesHome/index/plant_detail?page=signUp&id=' + item.job_position_id +
							'&longitude=' + e.longitude + '&latitude=' + e.latitude
					});
				})
			},
			// 选择报名状态
			selectStatus(item, index) {
				if (this.current === index) {
					return;
				};
				this.current = index;
				this.set_up_status = item.value
				this.mescroll && this.mescroll.resetUpScroll()
			},
			goShare(item, index) { //去分享页面
				if (this.isopen == false) {
					return;
				};
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true
				}, 3000);
				if (item.is_receive == 0) { // 未领取红包
					this.$Request
						.post(this.$api.help_red.help_getHb, {
							delivery_id: item.aid, //报名主键id
							job_position_id: item.job_position_id, //职位id
							company_id: item.company_id,
						})
						.then(res => {
							if (res.code == 1) {
								uni.navigateTo({
									url: 'share_help_list?red_envelope_aid=' +item.aid + '&job_title=' +
										item.name + '&salary_money=' + item.salary_money + '&jobImage=' + item
										.image
								})
							} else {}
						})
					// return
				} else {
					console.log();
					uni.navigateTo({
						url: 'share_help_list?red_envelope_aid=' + item.aid + '&job_title=' +
							item.name + '&salary_money=' + item.salary_money + '&jobImage=' + item
							.image
					})
				}
				// uni.navigateTo({
				// 	url: 'share_help_list?red_envelope_aid=' + item.red_envelope_type
				// })
			},
			upCallback(mescroll) {
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num; // 页码, 默认从1开始
				let pageSize = mescroll.size; // 页长, 默认每页10条
				this.$Request
					.post(this.$api.user.get_singup_list, {
						page: pageNum,
						pageSize: 10,
						longitude: this.lon,
						latitude: this.lat,
						set_up_status: this.set_up_status
					})
					.then(res => {
						// console.log(res, '22');
						uni.hideLoading()
						if (res.code == 1) {
							let curPageData = res.data.data;
							// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
							let totalPage = res.data.total;
							//设置列表数据
							if (mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
							this.dataList = this.dataList.concat(curPageData); //追加新数据
							mescroll.endBySize(curPageData.length, totalPage);
						} else {
							this.mescroll.endErr();
						}
					})
					.catch(err => {
						this.mescroll.endErr();
					});
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}

	.bg_img {
		width: 106upx;
		height: 106upx;
		margin-right: 20upx;
		background-color: #EEEEEE;

		image {
			width: 100%;
			height: 100%;
			border-radius: 16upx;
		}
	}

	.btn_help {
		width: 686upx;
		height: 88upx;
		background: linear-gradient(261deg, #1B90FF 0%, #50AEFF 100%);
		border-radius: 4upx;
		margin: auto;
		color: #FFFFFF;
		line-height: 88upx;
		text-align: center;
	}

	.returnBox {
		min-width: 97rpx;
		height: 89rpx;
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

	.box_sort {
		width: 97upx;
		height: 90upx;
		border: 1px solid #CCCCCC;
		text-align: center;
		line-height: 45upx;

		view {
			font-size: 12px;
		}
	}

	.select {
		color: #1B90FF;
		// height: 50rpx;
		// line-height: 50rpx;
		padding: 0 20rpx 0upx;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			width: 54upx;
			height: 6upx;
			z-index: 9999;
			background-color: #1B90FF;
		}
	}

	/* .cu-list.menu-avatar>.cu-item:after{
		width: 180%;
		right: 0;
		margin: auto;
	} */
</style>
