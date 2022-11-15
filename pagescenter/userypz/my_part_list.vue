<template>
	<!-- 发布的网约工列表 -->
	<view>
		<cu-custom bgColor=" text-black" :isBack="true">
			<block slot="content">我派单的任务</block>
			<block slot="right">
				<!-- <view class="f24 pr10" @tap='toPage()'>发布</view> -->
			</block>
		</cu-custom>
		<!--导航 -->
		<view class="bg-white nav fixed" :style="[{top: CustomBar+'px'}]">
			<scroll-view scroll-x="true" scroll-with-animation :scroll-left="scrollLeft" style="height: 100%;display: flex;align-items: center;">
				<view class="flex text-center align-center justify-around">
					<block v-for="(item, index) in statusList" :key="index">
						<view class="flex align-center">
							<view class="cu-item  text_999 f30" :class="cur == item.id ? 'select' : ''" @tap="selectStatus(item, index)">{{item.name}}</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 列表 -->
		<mescroll-uni ref="mescrollRef" :top="CustomBar*2+ 100" @init="mescrollInit" @down="downCallback" @up="upCallback"
		 :down="downOption" :up="upOption" :fixed="true">
			<view class="flex column between ptb10 plr15 card brb_e  mb10" v-for="(item, index) in my_part_job_list" :key="index"
			 @tap="navTo(item,index)">
				<view class="flex ">
					<!-- logo -->
					<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
						<image :src="item.job_part_img_url || '/static/images/logo.png'" mode="" class="mr10"></image>
					</view>
					<view class="" style="width: 83%;">
						<view class="flex justify-between ">
							<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ item.title || '无' }}</text>
							<view class="f24 flex_shrink" style="color: #999;">已接单：{{item.nums||0}}人</view>
						</view>
						<!-- 工资 -->
						<view class=" flex align-center justify-between">
							<view class="  f24 text_999  ">工作时长{{item.service_time||''}}</view>
							<view class="  f24 " style="color: #F77858;" v-if="item.part_status==2">已完成</view>
						</view>
						<view class="flex align-center justify-between">
							<view class="flex align-center justify-between " v-if="item.is_pay!=0" style="width: 100%;">
								<view class="">
									<view class="  f24  text_1b9 mtb5" v-if="voucher==0">已向平台支付佣金</view>
									<view class="  f24  " style="color: #F77858;">劳务报酬{{item.commission||0}}元</view>
								</view>
								<view class="btn_blue ml10 txt-theme" @tap.stop='detalOne(item,index)'>删除</view>
							</view>
							<view class="f24 " style="color: #F77858;" v-if="item.is_pay==0 ">{{voucher==1?' ':'还未支付佣金'}}</view>
							<view class=" flex align-center">
								<!-- <view class="btn_blue ml10 txt-theme" v-if="item.is_pay==0" @tap.stop='goPay(item,index)'>去支付</view> -->
								<view class="btn_blue ml10 txt-theme" v-if="item.is_pay==0" @tap.stop='detalOne(item,index)'>删除</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</mescroll-uni>
		
		<view style="width: 60%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 20%; bottom: 50upx; z-index: 98;">
			<view
				style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
				@click="toPage()"
			>
				<i class="text-df cuIcon-add bold" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">派单</text>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
	export default {
		components: {},
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				nowtime: '',
				CustomBar: this.CustomBar,
				scrollLeft: 0,
				cur: 2, // 当前选中订单分类
				// -5=全部0待付款5=已揽件6消毒中7配送中3待评价
				user_type: uni.getStorageSync('USERINFO').user_type, //身份
				IMG_URL:this.IMG_URL,
				statusList: [{
						id: 2,
						name: '临时工'
					},
					{
						id: 1,
						name: '网络兼职'
					}
				],
				my_part_job_list: [], //订单数据
				order_id: '',
				voucher: '', //是否开启支付
			}
		},
		onLoad() {
			uni.showLoading({})
			uni.$on('delPart', item => {
				this.mescroll && this.mescroll.resetUpScroll()
			})
			uni.$on('updateOrderDetail', item => {
				this.mescroll && this.mescroll.resetUpScroll()
			})

			this.get_plant_type()
		},
		onUnload() {
			uni.$off('delPart')
			uni.$off('updateOrderDetail')
		},
		methods: {
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			// 跳转详情
			navTo(item) {
				// uni.navigateTo({
				// 	url: 'pick_up_person?aid=' + item.aid
				// })
				if (item.is_pay == 0) {
					uni.navigateTo({
						// url:'/pagesHome/part_sort?id='+item.aid+'&user_id='+item.user_id
						url: 'order_detail?page=person&id=' + item.aid + '&uid=' + item.user_id
					})
					// this.$Common.toast('您还未向平台支付佣金，请先支付哦')
				} else {
					uni.navigateTo({
						url: 'pick_up_person?aid=' + item.aid
					})
				}


			},
			detalOne(item) { //删除兼职任务
				let that = this
				uni.showModal({
					title: '你确定要删除发布的兼职任务吗',
					content:item.part_status==2?'': '删除后金额自动退还到账户',
					success: function(res) {
						if (res.confirm) {
							that.$Request.post(that.$api.company.delet_part, {
								aid: item.aid
							}).then(res => {
								if (res.code == 1) {
									that.$Common.toast('删除成功')
									that.mescroll && that.mescroll.resetUpScroll()
									setTimeout(() => {
										that.$forceUpdate()
									}, 200)
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									});
								}
							});
						} else if (res.cancel) {}
					}
				})
			},
			toPage() { //发布  checkStatus
				// TODO 两个端不需要实名认证
				// if (this.user_type == 1) {
				// 	this.$Request
				// 		.post(this.$api.common.checkStatus)
				// 		.then(res => {
				// 			if (res.code == 1) {
				// 				uni.navigateTo({
				// 					url: 'fabu_part'
				// 				})
				// 			} else if (res.msg == '认证审核中') {
				// 				this.$Common.toast('实名认证正在审核，审核通过后会展示在系统信息')
				// 			} else {
				// 				this.$Common.toast('请先到个人资料里面实名认证')
				// 				setTimeout(() => {
				// 					uni.navigateTo({
				// 						url: 'online_authencation'
				// 					})
				// 				}, 300)

				// 			}
				// 		})
				// 		.catch(err => {
				// 			console.log('err: ' + JSON.stringify(err));

				// 		});
				// } else {
					uni.navigateTo({
						url: './fabu_part'
					})
				// }


			},
			goPay(item, index) { //未支付，去调取支付
				uni.navigateTo({
					url: '../zhaopinzhe/fabu?title=fabu&order_sn=' + item.order_sn + '&price=' + item.order_money + '&commission=' +
						item.commission,
				});
			},
			// 获取数据
			upCallback(mescroll) {
				var pageNum = mescroll.num;
				var pageSize = mescroll.size;
				let data = {
					page: pageNum,
					limit: 10,
					type: this.cur
				};
				this.$Request
					.post(this.$api.user.my_part_job_list, data)
					.then(res => {
						// console.log('订单数据', res.data.data);
						uni.hideLoading()
						if (res.code == 1) {
							let totalSize = res.data.total;
							let curPageData = res.data.data;
							if (mescroll.num == 1) this.my_part_job_list = [];
							this.my_part_job_list = this.my_part_job_list.concat(curPageData);
							mescroll.endBySize(curPageData.length, totalSize);
						} else {
							mescroll.endErr();
						}
					})
					.catch(err => {
						console.log('err: ' + JSON.stringify(err));
						if (pageNum == 1) {
							mescroll.endBySize(0, 0);
						} else {
							mescroll.endErr();
						}
					});
			},
			// 选择订单状态
			selectStatus(item, index) {
				if (this.cur === item.id) {
					return;
				};
				this.scrollLeft = (index - 1) * 60
				this.cur = item.id;
				this.mescroll && this.downCallback()
			}
		}
	}
</script>

<style lang="scss">
	.min-countdown {
		font-size: 12px;
		color: #f00;
	}

	// .nav{
	// 	padding: 20rpx 0;
	// }
	.nav .cu-item {
		height: 80rpx;
		line-height: 80rpx;

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

	.mt200 {
		margin-top: 200rpx !important;
	}

	.mt100 {
		margin-top: 100rpx !important;
	}

	.buyer-box {
		height: 100rpx;
		// border-bottom: 1px solid #EEEEEE;

		.head-img {
			width: 64rpx;
			height: 64rpx;
			display: block;
			border-radius: 50%;
		}
	}

	.nav-tag {
		position: relative;
	}

	.btn_blue {
		width: 150upx;
		height: 52upx;
		border: 1px solid #1B90FF;
		color: #1B90FF;
		line-height: 52upx;
		text-align: center;
		border-radius: 100upx;
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

	.tag {
		position: absolute;
		top: 12rpx;
		right: -8rpx;
		width: 32rpx;
		height: 32rpx;
		border-radius: 32rpx 32rpx 32rpx 0;
		background: #F64948;
		font-size: 12px;
		color: #FFFFFF;
	}

	.list-item {
		padding: 20rpx;
		background: #FFFFFF;
		margin-top: 20rpx;

		.handle-box {
			border-top: 1px solid #EEEEEE;
			height: 100rpx;
		}

	}

	.goods-img {
		width: 200rpx;
		height: 200rpx;
	}

	.goods-info {
		height: 200rpx;
	}
</style>
