<template>
	<view class="my bg-white" :style="[{ height: 'calc(100vh)' }]">
		<view class="top_section">
			<view class="bg_color" style="background: linear-gradient(90deg,rgba(51,143,255,1) 0%,rgba(62,149,255,1) 100%);width: 100%;height: 386upx;">
				<image :src="IMG_URL + 'static/miniwechat/my1.png'" mode=""></image>
			</view>
			<!-- 用户信息 -->
			<view v-if="user.id > 0" style="position: relative;z-index: 100; top: 100upx;">
				<view class="userInfo">
					<view class="tui-msg-box">
						<view @tap="toPage()" class="flex  align-center" style="width: 100%;">
							<view class="bg-gray mr10" style="width:100upx;height: 100upx; border-radius: 50%;overflow: hidden;flex-shrink: 0;">
								<image :src="(user.image && user.image.url) || IMG_URL + 'static/miniwechat/logo.png'" class="tui-msg-pic"
								 mode="aspectFill"></image>
							</view>
							<view class="tui-msg-item">
								<view class=" text-white text-bold mb5 f40 text_line1">{{ user.company_name || '未设置' }}</view>
								<view class="flex align-center">
									<view class="cu-tag radius " @tap="authen.stop(statius)">
										<image :src="IMG_URL + 'static/miniwechat/vipPic.png'" mode="aspectFill"></image>
										营业执照({{ status }})
									</view>
									<view class="f24 ml10 txt_name1" v-if="voucher==0">已缴纳保证金{{user.money||'0.00'}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="position: relative;z-index: 100;top: 100upx" v-else>
				<view class="userInfo">
					<view class="tui-msg-box">
						<view class="text-center flex align-center" @tap="login">
							<view class="bg-gray " style="width: 100upx;height: 100upx; border-radius: 50%;overflow: hidden;margin: auto;">
								<image :src="IMG_URL + 'static/miniwechat/logo.png'" class="tui-msg-pic" mode="aspectFill"></image>
							</view>
							<view class="tui-msg-item ml10">
								<view class="tui-msg-item">
									<view class="tui-msg-name">登录/注册</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu contant" style="margin-top: 160upx;">
				<view @tap="toPage('/pagescenter/userypz/my_part_list')" class="cu-item arrow flex align-center justify-start">
					<image :src="IMG_URL + 'static/miniwechat/new/wangyueg.png'" mode="" style="width:36upx ;height: 42upx;"></image>
					<view class="content"><text class="text-black">我发布的临时工和网络兼职</text></view>
				</view>
				<view @tap="toPage('../../pagescenter/zhaopinzhe/companyAdmin')" class="cu-item arrow">
					<image :src="IMG_URL + 'static/miniwechat/my_jianli.png'" mode="" style="width:38upx ;height: 38upx;"></image>
					<view class="content"><text class="text-black">公司管理</text></view>
				</view>
				<view @tap="toPage('../../pagescenter/zhaopinzhe/yaoqing')" class="cu-item arrow">
					<image :src="IMG_URL + 'static/miniwechat/my_jianli.png'" mode="" style="width:38upx ;height: 38upx;"></image>
					<view class="content"><text class="text-black">公司分享码</text></view>
				</view>
				<view @tap="toPage('../../pagescenter/zhaopinzhe/notice')" class="cu-item arrow">
					<image :src="IMG_URL + 'static/miniwechat/view.png'" mode="" style="width:44upx ;height: 44upx;"></image>
					<view class="content"><text class="text-black">最新通知</text></view>
				</view>
				<view @tap="toPage('../../pagescenter/zhaopinzhe/album')" class="cu-item arrow">
					<image :src="IMG_URL + 'static/miniwechat/view.png'" mode="" style="width:44upx ;height: 44upx;"></image>
					<view class="content"><text class="text-black">相册</text></view>
				</view>
				<view @tap="changeIdentify" class="cu-item arrow">
					<image :src="IMG_URL + 'static/miniwechat/find.png'" mode="" style="width:38upx ;height: 38upx;"></image>
					<view class="content"><text class="text-black">切换到求职端</text></view>
				</view>
				<view @tap="toPage('../../pagescenter/userypz/feedback')" class="cu-item arrow">
					<image :src="IMG_URL + 'static/miniwechat/view.png'" mode="" style="width:44upx ;height: 44upx;"></image>
					<view class="content"><text class="text-black">意见反馈</text></view>
				</view>
				<view @tap.stop="toPage('../../pagescommon/setting')" class="cu-item arrow">
					<image :src="IMG_URL + 'static/miniwechat/setting.png'" mode="" style="width:38upx ;height: 34upx;"></image>
					<view class="content"><text class="text-black">设置</text></view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
		
				user: [],
				img: this.IMG_URL + 'static/miniwechat/logo.png',
				IMG_URL:this.IMG_URL,
				status: '已认证', //认证状态
				isopen: true ,//切换身份
				voucher:'',//是否开启支付
			};
		},
		created() {
			uni.$on('change', data => {
				console.log(data);
				if (data.msg == 1) {
					this.get_userinfo();
				}
			});
			this.user = uni.getStorageSync('USERINFO');
			if (this.user.user_token) {
				this.get_userinfo();
			}
			uni.$on('companyInfo', data => {
				console.log('更新信息');
				this.get_userinfo();
			});
			this.get_plant_type()
		},
		destroyed() {
			uni.$off('change');
			uni.$off('companyInfo');
		},
		
		methods: {
			get_plant_type() {//获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher=res.data.voucher
					} else {}
				});
			},
			login() {
				//登录注册
				uni.removeStorageSync('PageCur');
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '../../pagessignup/login'
				});
				// #endif

				// #ifdef MP-WEIXIN
				uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
					url: '../../pagessignup/wechat/wxlog'
				});
				// #endif
			},
			get_userinfo() {
				this.$Request.post(this.$api.company.companyInfo).then(res => {
					if (res.code == 1) {
						this.user = res.data.info;
						this.user.id = res.user.id;

						uni.setStorageSync('roleinfo', res.data);
					}
				});
			},
			changeIdentify() { //我要招人
				let that = this
				const userInfo = uni.getStorageSync('USERINFO');
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				if (!userInfo.user_token) {
					uni.removeStorageSync('PageCur');
					this.$Common.toast('您还没有登录，请先登录');
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif

					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/wechat/wxlog?page=outLogin'
					});
					// #endif
				} else {
					uni.showLoading({					})
					that.$Request.post(that.$api.common.switch_identity).then(res => {
						that.$Common.toast(res.msg);
						uni.hideLoading()
						if (res.code == '1') {
							uni.setStorageSync('USERINFO', res.data);
							uni.removeStorageSync('PageCur');
							uni.$emit('userinfo', {});
							uni.reLaunch({
								url: '../index/index'
							}, 300);

						}
					});
				}
			},
			toPage: function(page) {
				//跳转，判断是否登录
				const userInfo = uni.getStorageSync('USERINFO');
				if (!userInfo) {
					uni.removeStorageSync('PageCur');
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif

					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pagessignup/wechat/wxlog'
					});
					// #endif
				} else {
					uni.navigateTo({
						url: page
					});
				}
			}
		}
	};
</script>
<style lang="scss">
	page {
		background-color: #f7f7f7 !important;
		// height: calc(100%-100upx)!important;
	}

	.my {
		position: relative;
		background: #f7f7f7;
		height: 100%;
	}

	.radius {
		border-radius: 20rpx;
		overflow: hidden;
	}

	.top_section {
		min-height: 385rpx;
		padding-bottom: 90rpx;

		.bg_color {
			width: 100%;
			height: 375upx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
		}
	}

	.bg_color>image {
		width: 100%;
		height: 100%;
	}

	.up_margin {
		margin: auto;
		margin-top: -64upx;
		width: 686upx;
		height: 154upx;
		border-radius: 20upx;

		position: relative;
		background-color: #fff;
		z-index: 3;
	}

	.userInfo {
		padding: 20rpx 30rpx 0;

		.cu-tag {
			border-radius: 4px;
			color: #5a4015;
			height: 36upx;
			background: #ffb417;

			image {
				width: 23upx;
				height: 24upx;
				margin-right: 10upx;
			}
		}
	}

	.dir {
		color: #999999;
	}

	.tui-msg-box {
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
	}

	.tui-msg-pic {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		border: 1px solid #fff;
		// display: block;
		// margin-right: 24upx;
	}

	.tui-msg-item {
		color: #ffffff;
	}

	.contant {
		width: 686upx;
		margin: auto;
		border-radius: 16upx;
		background-color: #ffffff;

		image {
			margin-right: 10upx;
		}
	}

	.nav_btns {
		padding: 20rpx 30rpx;
		position: relative;
		z-index: 3;

		.item {
			font-size: 48rpx;
			margin-left: 40rpx;
			margin-top: 40upx;

			image {
				width: 42upx;
				height: 38upx;
			}
		}

		.cu-avatar {
			background: transparent;
		}

		/* #ifdef MP-WEIXIN */
		padding-right: 240upx;
		/* #endif */
		/* #ifdef MP-ALIPAY */
		padding-right: 170upx;
		/* #endif */
	}

	.userMsg {
		.cu-item {
			background-color: transparent;
		}
	}

	/* 浮动导航 */
	.float-nav {
		// padding: 30rpx 0;
		background: #fff;

		image {
			width: 45rpx;
			height: 45rpx;
		}

		.txt {
			margin-top: 10rpx;
			font-size: 14px;
		}
	}

	.myOrder {
		.title {
			padding: 0 30rpx;
			margin-bottom: 20rpx;
		}

		image {
			width: 50rpx;
			height: 50rpx;
		}

		.dir {
			font-size: 12px;
		}
	}

	.fonticon {
		font-size: 34rpx;
	}

	// 等级
	.grade {
		margin-right: -30rpx;
		background: #fff;
		padding: 12rpx;
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;

		.dengji {
			width: 44rpx;
			height: 50rpx;
			display: inline-block;
			vertical-align: middle;
		}

		&.level1 {
			color: #52eccb;
			font-size: 12px;
		}
	}

	.path_list {
		padding-top: 0;

		.text-grey {
			font-size: 30rpx;
		}
	}

	.gongsi {
		width: 686rpx;
		height: 273rpx;
		border-radius: 30rpx;
		background-color: #fff;
		margin: -63rpx 32rpx 0rpx;

		.user_img {
			width: 143rpx;
			height: 143rpx;
			margin: 30rpx 24rpx 0 0;
			border-radius: 10rpx;

			image {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}

		.btn {
			padding: 5rpx 15rpx;
			background-color: #fa6b5a;
			border-radius: 22rpx;
			color: #fff;
		}

		.user_box {
			width: 143rpx;
			height: 143rpx;
			border-radius: 10rpx;
			border: 1rpx solid #999999;
			text-align: center;
			margin-top: 30rpx;
			padding: 23rpx 0;
		}
	}

	.cu-list.menu>.cu-item .content>uni-image {
		width: 98rpx;
		height: 98rpx;
	}
</style>
