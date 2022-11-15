<template>
	<!-- 招聘端报名列表 -->
	<view>
		<view class="padding bold f36" >
			{{dataList.red_envelope_info}}
		</view>
		<!-- <mescroll-uni ref="mescrollRef" :top='100' @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" :fixed="true"> -->
			<view class="ptb10" v-for="(item, index) in dataList.data" :key="index">
				<view class="flex column between  plr15 card  ">
					<view class="flex align-center justify-between">
						<view class=" flex align-center">
							<view class="bg-gray job_img mr10 flex_shrink" >
								<image :src="item.friend_head_img || '/static/images/logo.png'" mode="" class="mr10"></image>
							</view>
							<text class="gray3 mb5 bold f32  bold" >{{ item.friend_user_nickname || '无' }}</text>
						</view>
						<view class="f24 flex_shrink " >助力成功</view>

					</view>
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
				job_position_id:'',//职位id
				userId: '', //求职者id
				aid: '', //简历id
				dataList: [], //好友列表
			}
		},
		onLoad(e) {
			this.aid = e.aid
			this.userId = e.uid
			this.job_position_id=e.job_position_id
			this.getList()
			uni.showLoading({			})
		},
		methods: {
			// 获取数据
			getList() {
				this.$Request
					.post(this.$api.company.lookFriend_list,{
						job_position_id: this.job_position_id,//职位id
						aid: this.aid,//投递简历id
						user_id:this.userId,//求职者用户id
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.dataList = res.data;
							
						} else {
							console.log(res.msg);
						}
					})
					.catch(err => {
						console.log(res.msg);
					});
			},
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
