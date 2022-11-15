<template>
	<!-- 接单人列表 -->
	<view>
		<!--导航 -->
		<view class="fixed " style="width: 100%;">
			<view class="flex justify-between brb_e padding" style="width: 100%;" @tap='goDetail()'>
				<!-- logo -->
				<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
					<image :src="person_list.head_img || '/static/images/logo.png'" mode="" class="mr10"></image>
				</view>
				<view class="" style="width: 83%;">
					<view class="flex justify-between ">
						<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ person_list.title || '无' }}</text>
						<view class="f24 flex_shrink" style="color: #999;">已接单：{{person_list.nums||0}}人</view>
					</view>
					<!-- 工资 -->
					<view class="  ">
						<view class="  f24  " style="color: #F77858;">劳务报酬{{person_list.commission||0}}元</view>
						<view class="  f24  text_1b9 mtb5">{{person_list.settlement_method_name||''}}</view>
						<view class="  f24 text_999  ">{{person_list.content||''}}</view>
					</view>
				</view>
			</view>
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
		<!-- <mescroll-uni ref="mescrollRef" :top=" 360" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true"> -->
		<view class="" style="padding-top: 360upx;">
			<!-- person_list.children -->
			<view class="flex column between ptb10 plr15 card brb_e  mb10" v-for="(item, index) in person_list.children " :key="index"
			 @tap="navTo(item,index)">
				<view class="flex ">
					<view class="bg-gray job_img mr10" style="flex-shrink: 0;">
						<image :src="item.head_img || '/static/images/logo.png'" mode="" class="mr10"></image>
					</view>
					<view class="" style="width: 83%;">
						<view class="flex justify-between ">
							<text class="gray3 mb5 bold f32 overflow-one" style="font-weight: bold;">{{ item.user_name || '无' }}</text>
							<view class="f24 flex_shrink " style="color: #F77858;">{{item.is_status_title}}</view>
							<!-- <view class="f24 flex_shrink " v-if="item.status==1" style="color: #F77858;">等待确认取消</view>
							<view class="f24 flex_shrink " v-if="item.status==2" style="color: #F77858;">已取消</view>
							<view class="f24 flex_shrink " v-if="item.status==3" style="color: #F77858;">已完成</view> -->
						</view>
						<!-- 工资 -->
						<view class="  f24 text_999  ">{{item.sex_name}}</view>
					</view>
				</view>
				<view class="flex align-center justify-end pt10">
					<view class="btn_kong " v-if="item.is_status==0" @tap.stop='cancelOrder(item)'>取消接单</view>
					<view class="btn_kong " style="width: 310upx;" v-if="item.is_status==1" @tap.stop='cancelOrder(item)'>(未完成)取消任务</view>
					<!-- <view class="btn_kong" v-if="item.is_status==4" @tap='refuse(item)'>拒绝</view> -->
					<view class="btn_blue ml10 text-white" v-if="item.is_status==1" @tap.stop='complate(item)'>已完成</view>
					<view class="btn_blue ml10 text-white" v-if="item.is_status==0" @tap.stop='agree(item)'>确认接单</view>
				</view>
			</view>
			<view class=" plr40" v-if="person_list.children==''">
				暂无内容
			</view>
		</view>
		<!-- </mescroll-uni> -->
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
						id: 3,
						name: '全部'
					},
					{
						id: 1,
						name: '已确认'
					},
					{
						id: 2,
						name: '已完成'
					}
				],
				status: '', //设置订单状态
				orderStatus: 3, //选择订单状态
				order_detail: {}, //订单数据
				person_list: [], //接单人
				downOption: {

				},
				upOption: {

				},
				aid: '', //兼职任务id
			}
		},
		onLoad(e) {
			if (e.aid) {
				this.aid = e.aid;
			}
			this.getInfo()
			uni.$on('update_status', () => {
				this.getInfo()
			})
			if(e.pushMsg==1){
				this.getInfo()
			}
		},
		onUnload() {
			uni.$off('update_status')
		},
		methods: {
			// 取消订单
			cancelOrder(item) {
				let that=this
				uni.showModal({
					title: '确认取消此任务?',
					success: function(res) {
						if (res.confirm) {
							if (item.is_status == 0) {
								that.status = 0
								that.cancel = 1

							} else if (item.is_status == 1) {
								that.status = 1
								that.cancel = 1
							}
							// that.aid=item.aid
							that.userid = item.user_id
							that.setStatus()
						}
					}
				})

			},
			complate(item) { //完成
			let that=this
				uni.showModal({
					title: '确认此任务已完成?',
					success: function(res) {
						if (res.confirm) {
							that.status = 1
							// that.aid=item.aid
							that.userid = item.user_id
							// that.cancel = 1
							that.setStatus()
						}
					}
				})

			},
			agree(item) { //确认接单
				this.status = 0
				// this.aid=item.aid
				this.userid = item.user_id
				this.setStatus()
				
			},
			// 跳转详情
			navTo(item) {
				//已确认，无状态可以点击进接单人信息
				uni.navigateTo({
					url: 'person_status?id=' + item.dask_id + '&user_id=' + item.user_id
				})

			},
			goDetail() { //兼职任务详情
				uni.redirectTo({
					url: 'order_detail?page=person&id=' + this.aid + '&uid=' + this.person_list.user_id
				})
			},
			setStatus() { //set_part_status
				this.$Request
					.post(this.$api.user.set_part_status, {
						aid: this.aid,
						type: 1, //发布人
						is_status: this.status,
						userid: this.userid, //接单人id
						cancel: this.cancel || '',
					})
					.then(res => {
						if (res.code == 1) {
							this.person_list = res.data;
							this.getInfo()
						} else {
							this.$Common.toast('网络错误，请稍后再试')
						}
					})
			},
			// 获取数据
			getInfo() {
				uni.showLoading({				})
				this.$Request
					.post(this.$api.user.partDetail_jobList, {
						aid: this.aid,
						is_status: this.orderStatus
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.person_list = res.data;
						} else {
							this.$Common.toast('网络错误，请稍后再试')
						}
					})
			},
			// 选择订单状态
			selectStatus(item, index) {
				if (this.cur === index) {
					return;
				};
				this.cur = index;
				this.orderStatus = item.id;
				this.getInfo()
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
