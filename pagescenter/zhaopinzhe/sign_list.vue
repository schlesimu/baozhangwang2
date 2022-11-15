<template>
	<!-- 招聘端报名列表 -->
	<view>
		<!--导航 -->
		<view class="fixed " style="width: 100%;">
			<view class="bg-white nav brb_e">
				<view class="flex text-center align-center justify-around">
					<block v-for="(item, index) in statusList" :key="index">
						<view class="flex align-center">
							<view class="cu-item  text_999 f30" :class="cur == index ? 'select' : ''" @tap="selectStatus(item, index)">{{item.name}}</view>
						</view>
					</block>
				</view>
			</view>
		</view>

		<!-- 列表 -->
		<mescroll-uni ref="mescrollRef" :top=" 100" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true">
			<view class="ptb10" v-for="(item, index) in sign_list" :key="index">

				<view class="flex column between  plr15 card   mb10" @tap="navTo(item,index)">
					<view class="flex ">
						<view class="bg-gray job_img mr10" style="flex-shrink: 0;" @tap.stop='goMsg(item)'>
							<image :src="item.head_img || '/static/images/logo.png'" mode="" class="mr10"></image>
						</view>
						<view class="" style="width: 83%;">
							<view class="flex justify-between ">
								<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ item.user_nickname || '无' }}</text>
								<view class="f24 flex_shrink " style="color: #F77858;">{{item.set_up_status_name}}</view>
								<!-- <view class="f24 flex_shrink " v-if="item.status==1" style="color: #F77858;">已同意</view>
								<view class="f24 flex_shrink " v-if="item.status==2" style="color: #F77858;">已拒绝</view> -->
							</view>
							<!-- 工资 -->
							<view class="  f24 text_999  ">{{item.sex}}</view>
							<view class="f24 text_999">报名时间：{{item.create_time}}</view>
						</view>
					</view>
					<view class="flex align-center justify-end pt10">
						<view class="btn_kong " @tap='look_help_list(item,index)' v-if="item.red_envelope_type!=0">查看助力</view>
						<view class="btn_blue ml10 text-white" @tap='look_resume(item,index)'>查看简历</view>
					</view>
				</view>
				<view class="bgc"></view>
			</view>
		</mescroll-uni>
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
				cur: 0, // 当前选中订单分类
				// -5=全部0待付款5=已揽件6消毒中7配送中3待评价
				statusList: [{
						id: 0,
						name: '全部',
						value: 'all'
					},
					{
						id: 1,
						name: '已确认',
						value: 'agree'
					},
					{
						id: 2,
						name: '已拒绝',
						value: 'refuse'
					}
				],
				isopen: true, //跳转页面
				status: 'all',
				order_detail: {}, //订单数据
				job_position_id: '', //职位id
				sign_list: [], //接单人
				downOption: {

				},
				upOption: {

				},
				order_id: ''
			}
			
		},
		onLoad(e) {
			uni.showLoading({})
			if (e.job_id) {
				this.job_position_id = e.job_id;
			}
			uni.$on('change_signStatus', () => {
				this.mescroll && this.mescroll.resetUpScroll()
			})
		},
		onUnload() {
			uni.$off('change_signStatus')
		},
		methods: {
			// 取消订单
			cancelOrder(item) {
				this.order_id = item.id
				this.$refs.cancelPop.open()
			},
			// 跳转详情
			navTo(item) {
				//已确认，无状态可以点击进接单人信息
				if (item.status == 1) {
					uni.navigateTo({
						url: 'person_status'
					})
					return
				}

			},
			goMsg(item) { //跳到聊天页面 沟通
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				uni.navigateTo({
					url: '/pagesmessage/userMsg?kfid=' + item.user_id + '&userName=' + item.user_nickname +
						'&job_position_id=' + item.aid,
					animationDuration: 300
				});
			},
			look_help_list(item, index) { //查看助力列表
				uni.navigateTo({
					url: '../../pagesHome/look_help_list?uid=' + item.user_id + '&aid=' + item.aid + '&job_position_id=' + item.job_position_id
				})
			},
			look_resume(item, index) { //查看简历
				uni.navigateTo({
					url: '/pagesHome/look_resume?uid=' + item.user_id + '&aid=' + item.aid + '&set_up_status=' + item.set_up_status
				})
			},
			// 获取数据
			upCallback(mescroll) {
				var pageNum = mescroll.num;
				var pageSize = mescroll.size;
				this.$Request
					.post(this.$api.company.signUp_list, {
						job_position_id: this.job_position_id, //职位id
						set_up_status: this.status,
						page: pageNum
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							let totalSize = res.data.total;
							let curPageData = res.data.data;
							if (mescroll.num == 1) this.sign_list = [];
							this.sign_list = this.sign_list.concat(curPageData);
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
				if (this.cur === index) {
					return;
				};
				this.cur = index;
				this.status = item.value;
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
		width: 96rpx;
		height: 96rpx;
		border-radius: 50%;
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

	.btn_kong {
		width: 200upx;
		height: 72upx;
		line-height: 72upx;
		text-align: center;
		border: 1px solid #1B90FF;
		color: #1B90FF;
		border-radius: 100upx;
	}

	.btn_blue {
		width: 200upx;
		height: 72upx;
		background: #1B90FF;
		line-height: 72upx;
		text-align: center;
		border-radius: 100upx;
	}

	.nav-tag {
		position: relative;
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
