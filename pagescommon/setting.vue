<template>
	<view class="">
		<view class="per">
			<!-- <view class="per_row" @tap.stop="switchIdentity" style="border-bottom: 1px solid #EDEDED;">
				<text>切换身份</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view> -->
			<navigator url="resetpassword">
				<view class="per_row" style="border-bottom: 1px solid #EDEDED;">
					<text>修改密码</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</navigator>
			<navigator url="/pagescenter/userypz/money/findPassword">
				<view class="per_row" style="border-bottom: 1px solid #EDEDED;">
					<text>修改提现密码</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</navigator>
			<navigator url="about">
				<view class="per_row" style="border-bottom: 1px solid #EDEDED;">
					<text>关于我们</text>
					<text class="lg text-gray cuIcon-right"></text>
				</view>
			</navigator>
			<view class="per_row" @tap.stop="cancelAcount" style="border-bottom: 1px solid #EDEDED;" v-if="user_type==1">
				<text>注销账号</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<view class="per_row" @tap.stop="cancellation" style="border-bottom: 1px solid #EDEDED;" v-if="user_type==2">
				<text>注销公司</text>
				<text class="lg text-gray cuIcon-right"></text>
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<navigator url="update">
				<view class="per_row" style="border-bottom: 1px solid #EDEDED;">
					<text>当前版本</text>
					<view class="row_right">
						<text class="aa">当前版本{{ version }}</text>
						<text class="lg text-gray cuIcon-right"></text>
					</view>
				</view>
			</navigator>
			<!-- #endif -->

			<view class="per_row" @click="clear" style="border-bottom: 1px solid #EDEDED;">
				<text>清除缓存</text>
				<view class="row_right">
					<text class="aa">{{ currentSize || '0' }}kb</text>
				</view>
			</view>
		</view>
		<view class="flex align-center foo_btn plr15 justify-between">
			<!-- <view class="btn_next" type="primary" @click="cancellation" style="background: #9F2031;">注销公司</view> -->
			<button class="btn_next" type="primary" @click="tuichu">退出登录</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				islogin: 0,
				version: '1.0.0', //版本
				currentSize: '', //缓存
				user_type: uni.getStorageSync("USERINFO").user_type
			};
		},
		onLoad() {
			var user = uni.getStorageSync('USERINFO');
			if (user.id > 0) {
				this.islogin = 1;
			}
			uni.getStorageInfo({
				success: res => {
					this.currentSize = res.currentSize;
				},
				fail: err => {
					console.log(err);
				},
				complete: a => {
					console.log('complete');
				}
			});

			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, widgetInfo => {
				this.version = widgetInfo.version;
			});
			// #endif
		},
		methods: {
			switchIdentity() {
				let that = this;
				//切换身份	1 成功 0失败   101, [], '请填写招聘者信息'  102, [], '请填写应聘者信息'
				uni.showModal({
					title: '切换身份',
					content: '您确定切换身份吗',
					success(res) {
						if (res.confirm) {
							that.$Request.post(that.$api.common.switch_identity).then(res => {
								that.$Common.toast(res.msg);
								if (res.code == '1') {
									// return;
									uni.setStorageSync('USERINFO', res.data);
									uni.removeStorageSync('PageCur');
									uni.$emit('userinfo', {});
									// uni.$emit('appLoginSuccess',{});
									setTimeout(() => {
										uni.reLaunch({
											url: '../pages/index/index'
										}, 300);
									})

								}
							});
						}
					}
				});
			},
			cancellation() { //注销公司
				uni.navigateTo({
					url: '/pagescenter/zhaopinzhe/cancelCompany'
				})
			},
			// 注销账号
			cancelAcount(){
				let that=this
				uni.showModal({
					title: '注销账号',
					content: '您确定要注销账号吗？注销之后不可找回',
					success(res) {
						if (res.confirm) {
							that.$Common.toast('注销申请已提交，等待后台审核')
						}
					}
				});
			},
			tuichu() {
				//退出登录
				let that = this;
				uni.showModal({
					title: '退出登录',
					content: '您确定要退出登录吗？',
					success(res) {
						if (res.confirm) {
							uni.removeStorageSync('USERINFO');
							uni.removeStorageSync('userToken');
							uni.removeStorageSync('PageCur');
							// #ifndef MP-WEIXIN
							uni.reLaunch({
								url: '../pagessignup/login'
							});
							// #endif

							// #ifdef MP-WEIXIN
							uni.reLaunch({
								url: '/pagessignup/wechat/wxlog?page=outLogin'
							});
							// #endif
						}
					}
				});
			},
			clear() {
				//清除缓存
				var user = uni.getStorageSync('USERINFO');
				this.$Common.confirm('确定清除本地缓存？', res => {
					this.currentSize = 0;
					uni.clearStorageSync();
					uni.setStorageSync('USERINFO', user);
					this.$Common.toast('清除成功');
				});
			}
		}
	};
</script>

<style lang="scss">
	.per {
		font-size: 28upx;
		border-top: 1px solid #EEEEEE;

		.per_row {
			background-color: #fff;
			padding: 50upx 20rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			.row_right {
				text-align: right;

				.aa {
					color: #999;
					display: inline-block;
					font-size: 32upx;
					margin-right: 10upx;
				}
			}
		}
	}

	.out_login {
		margin-top: 30%;
		line-height: 88upx;
		background-color: rgb(0, 129, 255);
		color: #fff;
		text-align: center;
		border-radius: 45px;
		margin-left: 25upx;
		margin-right: 25upx;
	}

	.foo_btn {
		position: fixed;
		bottom: 30rpx;
		left: 0;
		width: 100%;
	}

	// .btn_next {
	// 	width: 47%;
	// }
</style>
