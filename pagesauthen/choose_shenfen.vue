<template>
	<view class="contain">
		<view class="choose">
			<view style="font-size: 48upx;line-height: 120upx;">
				请选择你的身份
			</view>
			<view style="font-size:14px; color: #999999;">
				进入APP后可以在我的页面切换身份
			</view>
		</view>
		<view class="item" style="">
			<view class="zhaopin" @tap="gomy_work">
				<image :src="IMG_URL+'static/miniwechat/findWork.png'" mode=""></image>
				<view class="item_find">
					<view style="font-size: 32upx;line-height: 80upx;">
						我要找工作
					</view>
					<view style="font-size:24upx;">
						为您推荐工作内容
					</view>
				</view>
			</view>
			<view class="work" @tap=" gomyZhaopin">
				<image :src="IMG_URL+'static/miniwechat/findPeople.png'" mode=""></image>
				<view class="item_find">
					<view style="font-size: 32upx;line-height: 80upx;">
						我要招人
					</view>
					<view style="font-size:24upx;">
						为您推荐牛人
					</view>
				</view>

			</view>
		</view>
		<view class="btn" @tap="retur">
			<view class="btn_back">
				退出登录
			</view>
		</view>
		<!-- <w-picker :visible.sync="region" mode="region" @confirm="addressConfirm" ref="region" themeColor="#2A89FF"></w-picker> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: '', //用户信息
				region: false, //地区选择
				address: '', //地址
				IMG_URL:this.IMG_URL,
				
			}
		},
		onShow() {
			this.userinfo = uni.getStorageSync('USERINFO')
		},
		methods: {
			gomy_work() { // 应聘者
				uni.reLaunch({
					url: '../pagescenter/userypz/my_jianli?page=resiter'
				});
			},
			gomyZhaopin() { //招聘者
				let that = this
				//获取认证信息
				uni.showLoading({})
				this.$Request.post(this.$api.user.user_certification_status).then(res => {
					if (res.code == '1') {
						uni.hideLoading()
						if (res.data.status == 1) {
							that.$Request.post(that.$api.common.switch_identity).then(res => {
								that.$Common.toast(res.msg);
								if (res.code == '1') {
									uni.setStorageSync('USERINFO', res.data);
									uni.removeStorageSync('PageCur');
									uni.$emit('userinfo', {});
									uni.reLaunch({
										url: '/pages/index/index'
									}, 300);
								}
							}).catch(err => {
								console.log(err)
							});
						} else if (res.data.status == 4) {
							this.$Common.toast('你的公司正在注销，暂时无法招人')
						} else {
							uni.navigateTo({
								url: "../pagescenter/userypz/zhaopinSort?page=resiter"
							})
						}
					}
				});
			},
			retur() {
				// #ifndef MP-WEIXIN
				uni.reLaunch({
					url: 'login'
				});
				// #endif

				// #ifdef MP-WEIXIN
				uni.reLaunch({
					url: '../pagessignup/wechat/wxlog'
				});
				// #endif

			}
		}
	}
</script>

<style lang="scss">
	.contain {
		width: 600upx;
		margin: auto;
	}

	.choose {
		margin-top: 160upx;
		letter-spacing: 2upx;
		margin-bottom: 40upx;
	}

	.item {
		letter-spacing: 2upx;

		.zhaopin {
			position: relative;

			image {
				width: 617rpx;
				height: 180rpx;
				margin-bottom: 45rpx;
			}
		}

		.work {
			position: relative;

			image {
				width: 617rpx;
				height: 185rpx;
				margin-bottom: 35rpx;
			}
		}

		.item_find {
			position: absolute;
			left: 9%;
			bottom: 40%;
			color: #FFFFFF;
		}
	}

	.btn {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;

		.btn_back {
			width: 750upx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			color: #666;
			font-size: 32upx;
			background: #F0F0F0;
		}
	}
</style>
