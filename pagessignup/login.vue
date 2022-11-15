<template>
	<!-- 登录页面 -->
	<view class="header">
		<view class="" style="margin-top:20rpx;">
			<view class="logo">密码登录</view>
			<view class="margin-top text-gray text-df" style="letter-spacing: 1upx;">
				请输入手机号码和密码
			</view>
		</view>
		<!-- 账号密码输入框 -->
		<view class="form">
			<view class="username">
				<input type="number" placeholder="请输入手机号" v-model="mobile" placeholder-style="color: #C2C2C2;font-size:28rpx;" />
			</view>
			<view class="password">
				<input maxlength="12" placeholder="请输入密码(6-12位数字加字母)" v-model="password" password="true" placeholder-style="color: #C2C2C2;font-size:28upx" />
			</view>
			<view class="btn_next" @tap="doLogin">登录</view>
			<view class="res flex justify-between align-center">
				<view @tap="toPage('register')" class=" forget yanzheng">去注册</view>
				<view @tap="toPage('resetpassword')" class=" forget yanzheng">忘记密码?</view>
			</view>
		</view>

		<!-- <view class="res_bom" @tap="quickLogin('weixin')">
			<view class="quick_font">快捷登录</view>
			<image :src="IMG_URL+'static/miniwechat/weixin.png'" mode=""></image>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				password: '',
				isShowOauth: true,
				IMG_URL:this.IMG_URL,
				showProvider: {
					weixin: false,
					qq: false,
					sinaweibo: false,
					xiaomi: false
				},
				client_id: ''
			};
		},
		onShow() {},
		onLoad(options) {
			//APP显示第三方登录
			// #ifdef APP-PLUS
			this.isShowOauth = true;
			// #endif
			this.getProvider();
		},
		methods: {
			userclient() { //push推送
				this.client_id = plus.push.getClientInfo().clientid;
				this.$Request
					.post(this.$api.common.set_client_id, {
						client_id: this.client_id
					})
					.then(res => {
						if (res.code == '1') {
							console.log(this.client_id, '==========push推送更换clientId')
						}
					});
			},
			quickLogin(provider) {
				uni.showLoading({
					title: '请稍等'
				});
				//第三方登录
				uni.login({
					// provider: provider,
					success: loginRes => {
						uni.getUserInfo({
							provider: provider,
							success: infoRes => {
								if (provider == 'weixin') {
									this.$Request
										.post(this.$api.user.user_wechat_login, {
											type: 1,
											wx_unionid: infoRes.userInfo.unionId
										})
										.then(res => {
											if (res.code == 1) {
												uni.hideLoading();
												uni.showToast({
													title: res.msg,
													icon: 'none'
												});
												uni.setStorageSync('USERINFO', res.data.userinfo);
												uni.setStorageSync('userToken', res.data.userinfo.user_token);

												console.log(res.data.userinfo)
												uni.removeStorageSync('PageCur');
												uni.$emit('appLoginSuccess', {});
												uni.reLaunch({
													//这里跳转到登录成功后要去的页面
													url: '../pages/index/index'
												})
											}
											if (res.code == '-999') {
												uni.setStorageSync('wechatinfo', infoRes.userInfo);
												uni.navigateTo({
													//这里跳转到微信账号绑定手机号的页面
													url: 'bind_account'
												});
											}
											// #ifdef APP-PLUS
											this.userclient();
											// #endif
											uni.hideLoading();
										});
								}
							},
							fail: e => {
								uni.hideLoading();
								let filesfrom = e.errMsg.substring(17, 11);
								uni.showToast({
									title: filesfrom,
									icon: 'success'
								});
							},
							complete: () => {
								uni.hideLoading();
							}
						});
					},
				});
			},
			getProvider() {
				//获取第三方登录服务
				uni.getProvider({
					service: 'oauth',
					success: res => {
						let len = res.provider.length;
						for (let i = 0; i < len; i++) {
							//有服务才显示按钮图标
							this.showProvider[res.provider[i]] = true;
						}
						if (res.provider.length == 0) {
							this.isShowOauth = false;
						}
					}
				});
			},
			toPage(page) {
				uni.hideKeyboard();
				if (page == 'resetpassword') {
					uni.navigateTo({
						url: page
					});
				} else {
					uni.redirectTo({
						url: page
					});
				}

			},
			doLogin() { //登录
				uni.hideKeyboard();
				//验证手机号码
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
					uni.showToast(
						!this.mobile ? {
							title: '请输入手机号码',
							icon: 'none'
						} : {
							title: '请填写正确手机号码',
							icon: 'none'
						}
					);
					return false;
				}
				if (!this.password) {
					this.$Common.toast('请输入密码')
					return
				}
				uni.showLoading({
					title: '提交中...'
				});
				const userdata = {
					mobile: this.mobile,
					password: this.password
				};
				this.$Request.post(this.$api.user.user_name_login, userdata).then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					if (res.code == '1') {
						uni.setStorageSync('USERINFO', res.data.userinfo);
						uni.setStorageSync('userToken', res.data.userinfo.user_token);
						uni.$emit('userinfo', {});
						uni.$emit('appLoginSuccess', {});

						// #ifdef APP-PLUS
						this.userclient();
						uni.removeStorageSync('PageCur');
						// #endif
						console.log(res.data);
						if (res.data.userinfo.user_type == 2) {
							uni.reLaunch({
								url: '../pages/index/index'
							})
						} else if (res.data.userinfo.user_type == 1) {
							if (res.data.userinfo.is_personal_profile == 0) {
								uni.navigateTo({
									url: 'chooseCity'
								})
							} else {
								uni.reLaunch({
									url: '../pages/index/index'
								})
							}
						}
					}
				});
			}
		}
	};
</script>
<style lang="scss">
	@font-face {
		font-family: 'HMfont-login';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAVwAAsAAAAACiwAAAUhAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqHTIY+ATYCJAMUCwwABCAFhG0HRhvICBEVpCGR/UgwbhrPeq6LhESdqBKaSN/kw79n/bk3aCYZKO1yZCbTFZBZqLv71CzRPvkPQPDEzrPbAAEEdy/nHLBRL1RJVpMf+cAnKX4Do/NzekpNyAm5/zlmunw+sPy2tUt22QBHAx5Q5EUGHvAdnfOh3DK8OuQd0OlAAIiIQw5IS1uPAgEstFUEAFmxdPFcCDE92AIcgaDigV1ZkBvBQaCH6csAbnB/nnyDIiIAFBwDbePAotYFaAjIY0OMFtTMsBEQdGcFwOwFMAByALAAWQfaV4Dx4zlgIEpRFg2A/DsBFDQgB2oDc8eGgkGQeEFKUZejCznt9o/HQ5OHYmxDggUCskkBBgjUUoAAgbkUoMDYkPDCyDliuQhABkgJQK6yyhT38BIY8CBxYSRMEkkMSSATwkJdISFRxmEK1/vOnrTzXjViHzwz8aKlGEYs2iibpmp+5ratsgWGNWLbfrapGoZCpmU/tfdypWk3P2UpyrXbL9yT7r9NuzXF7fWdOOu/rp+KJfM9J10u24o94tV0yTZj7Q1k2sNGbKz3FE7fJrlO6jZTvS8u0ZhJun8isa0RspKxyKuEe2NZXZZOEuakK+yhNyZTXZI887RY8YQzlSXpoBHeCI5wo155sye1OndEW2qmqrgfekbypF8gtj1yfSpZR24fvUPxWVJPRLG2DHcxzf7n0tWR1+x5R0CV6j3Gds3IOfkK9MdFr5Un3mk4rSddo6/Jd1vEsCbatsu6R7YZUv2mevIuRf9nThs/zvYVz49u+Zw5nLqge+KujIq2hXHLc265lFGtRqxMdB4ZW7GDGxWkhRXLMpfNnaPMmLeT8S2mw3TIt3Ynv5P1TWOGGMW3c6cDCdUbnElHp9An2M7UvfFrl9Se3Mpl2OsC/OPrLn+Z/t+8OYMbyc7EULKrYRH0H8RvBcrsPjrZH/r9uO9DFSlsbnuo+4UQU/18N/9U41O/hEONfOLyA79rcYXtbq65rDorfijy9epSZFw8fEWNBN4peoL0Ll7SS4QBfh0/4Jnj+Jabk3XpkHSMdxxyuKysOZ4BfiuXySHl2UXydcnnx30kioxf/vShfUSnz/oZraNzc1Nu0tJttfyZxEhcTaOb/Ofrls75Pu/7/A/zPvxwpc/TJ34YSpffeeM2qlH/jVhDV9gcvNONnb7ZJePd7ubF++dFqYkkt2sh8dkoHjBpXMs3De/mt/y3dmCZ8424T5Y6B9aQf4r8dxu+imujrYtcywuiBztmF7Bt/yXK7wSmVlUEpshvJ/7HthUAHPDGBa7l2AIACD6yMPolEHyG+Y62A8EXmZ8Xf8adtzCtX+sirIn7vGB2RM1vgnSbRt7WD193ec251eT45BSoLPg221gAwV8Wxoo0A8eK3SZfLOSwDxLwhIWfYccX6Y7Gh90o5crFAIEAOQQKByYDAwEpSBabAxwktBLgCepBlK3eWxLDWSILAZDljYCI9AEq3GPAiPRFstgfcJz+wItsCaKRYg4pSas5NDtkASXwFzSCRmWYwsErPaK+9cxFRS7+is43IUijJJmqcUTXxRb+rrMQFChHA1TobNj3BJOjFkWITAhTHscKeqFI0DA7aOYgJkAS4F5AQyAjZQ8PDqnvP0LaTY9xBT0l9ivkeM34IBVJKiBr+Vip51SqvTstE4ioAhRTTAagIqyo1+METPC8FhKCiGkQneRiYpCqKo+GVw7nWPBn9NWuwEUJQ1jCER7cseG02dIwGppNhOPnjIu1djYDAAAA') format('woff2');
	}

	.active-con {
		color: #fa6b5a !important;
		font-size: 28rpx;
	}

	.icon {
		font-family: 'HMfont-login' !important;

		font-style: normal;
		color: #ffffff;

		&.weixin {
			&:before {
				content: '\e615';
			}
		}

		&.qq {
			&:before {
				content: '\e752';
			}
		}

		&.weibo {
			&:before {
				content: '\e63d';
			}
		}

		&.xiaomi {
			&:before {
				content: '\e661';
			}
		}
	}

	page {
		background: #ffffff;
		height: 100%;
	}

	.header {
		padding: 180upx 40rpx 0;

		.logo {
			font-size: 24px;
			font-weight: 800;
			line-height: 48rpx;
			color: #333333;
			letter-spacing: 1upx;
		}

		.phone {
			color: #c2c2c2;
			font-size: 24rpx;
		}
	}

	.form {
		margin: 60rpx 0 0;
		width: 100%;
		font-size: 30upx;

		.res {
			// padding: 0 170rpx;
			margin: auto;
			margin-top: 40rpx;
			height: 100upx;

			.forget {
				color: #666;
				font-size: 14px;
			}
		}

		.username,
		.password {
			width: calc(100%);
			height: 90upx;
			display: flex;
			align-items: center;
			margin-bottom: 26upx;
			// border-bottom: 1rpx solid #EDEDED;

			input {
				width: 100%;
				height: 90upx;
				font-size: 32rpx;
				letter-spacing: 2upx;
			}

			.icon_phone {
				width: 29rpx;
				height: 38rpx;
			}

			.icon_password {
				width: 30rpx;
				height: 38rpx;
			}
		}

		.yanzheng {
			text-align: center;
			color: #666;
			font-size: 28rpx;
		}
	}

	.oauth {
		position: absolute;
		bottom: 50upx;
		width: 100%;

		.text {
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: rgba($color: #ffffff, $alpha: 0.8);
			font-size: 28upx;
		}

		.list {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20upx 0;

			.icon {
				font-size: 80upx;
				margin: 0 30upx;
			}
		}
	}

	.blue-yy {
		color: #cccccc;
	}

	.res_bom {
		position: absolute;
		bottom: 15%;
		left: 0;
		right: 0;
		// transform: translateX(50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.quick_font {
			display: block;
			font-size: 14px;
			color: #999999;
			margin-bottom: 14upx;
		}

		image {
			width: 100rpx;
			height: 100upx;
		}
	}
</style>
