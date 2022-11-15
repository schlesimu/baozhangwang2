<template>
	<!-- 注册页面 -->
	<view class="header">
		<view class="" style="margin:120rpx 0;">
			<view class="logo">登录/注册</view>
		</view>
		<view class="form">
			<view class="username flex justify-start">
				<!-- <view class="codestart">+86</view> -->
				<input type="number" placeholder="请输入手机号" v-model="mobile" maxlength="11"
					placeholder-style="color: #C2C2C2;font-size:28upx" />
			</view>
			<view class="username">
				<input type="password" placeholder="请输入新密码(6-12位数字加字母)" v-model="password"
					placeholder-style="color: #C2C2C2;font-size:28upx" />
			</view>
			<view class="btn_next" @tap="getCode">下一步</view>
		</view>
		<view class="flex align-center justify-between margin-top">
			<view class="userfooter-yy flex_shrink">
				<checkbox-group class="block" @change="CheckboxChange">
					<view class="cu-form-group" style="padding: 0;">
						<checkbox :class="checkbox[0].checked ? 'checked' : ''"
							:checked="checkbox[0].checked ? true : false" value="A" style="transform:scale(0.6)">
						</checkbox>
						<text class="text-df" style="margin-left: 10upx;">我已阅读</text>
						<text class="text-df" @tap="useragreement(1)" style="color: #0289FF;">《用户协议》</text>
						<text class="text-df" @tap="useragreement(2)" style="color: #0289FF;">《隐私协议》</text>
					</view>
				</checkbox-group>
			</view>
			<view @tap="toPage('login')" class="text-df" style="color: #666;">账号密码登录</view>
		</view>
		<view class="res_bom" @tap="quickLogin('weixin')" v-if="voucher==0">
			<image :src="IMG_URL+'static/miniwechat/weixin.png'" mode=""></image>
			<view class="quick_font">微信登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 复选框
				checkbox: [{
					value: 'A',
					checked: false
				}],
				mobile: '',
				code: '',
				IMG_URL: this.IMG_URL,
				password: '', //密码
				rspassword: '',
				code_id: 0,
				isopen: true, //跳转节流
				voucher: '', //是否开启支付 登录
			};
		},
		onLoad() {
			this.get_plant_type()
		},
		methods: {
			CheckboxChange(e) { //勾选协议
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			get_plant_type() { //获取支付是否开启
				this.$Request.get(this.$api.index.get_fuli_info, {}).then(res => {
					if (res.code == 1) {
						this.voucher = res.data.voucher
					} else {}
				});
			},
			userclient() {
				this.client_id = plus.push.getClientInfo().clientid;
				this.$Request
					.post(this.$api.common.set_client_id, {
						client_id: this.client_id
					})
					.then(res => {
						if (res.code == '1') {
							this.content = res.data;
							// console.log(this.bannerList)
						}
					});
			},
			getCode() { //下一步
				uni.hideKeyboard(); //隐藏软键盘
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
					uni.showToast(
						!this.mobile ? {
							title: '请输入手机号码',
							icon: 'none'
						} : {
							title: '请填写正确的手机号码',
							icon: 'none'
						}
					);
					return false;
				}
				if (!this.password) {
					this.$Common.toast('请输入密码')
					return
				}
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
				if (!reg.test(this.password) || this.password.length < 6 || this.password.length > 12) {
					uni.showToast({
						title: '请输入6-12位数字加字母',
						icon: 'none'
					});
					return false;
				}
				if (this.checkbox[0].checked == false) {
					this.$Common.toast('请勾选用户协议')
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				this.$Request
					.post(this.$api.common.getverifycode, {
						mobile: this.mobile,
						type: 3,
						is_test: 1
					})
					.then(res => {
						if (res.code == 1) {
							this.$Common.toast(res.msg)
							this.code_id = 1;
							// 发送成功 - 跳转验证码页面
							let data = this.$Common.convertObj({
								phone: this.mobile,
								password: this.password,
								type: 3
							});

							uni.navigateTo({
								url: 'code?' + data
							});

						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});

			},
			useragreement(id) { //跳到用户协议
				uni.navigateTo({
					url: '../pagescommon/agreement?type=' + id
				})
				// this.$mRouter.push({ route: this.$mRoutesConfig.useragreement });
			},
			toPage(page) { //跳到密码登录
				uni.hideKeyboard();
				uni.redirectTo({
					url: page
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
						// console.log(loginRes);
						uni.getUserInfo({
							provider: 'weixin',
							success: infoRes => {
								// console.log(infoRes);
								// if (provider == 'weixin') {
								// uni.setStorageSync('unionid', infoRes.userInfo.openId)
								// 微信登录时直接绑定企业微信提现账号  start  需要登录验证
								// this.$Request
								// 	.post(this.$api.money.bind_withdraw_account, {
								// 		true_name: infoRes.userInfo.nickName,
								// 		qrcode: infoRes.userInfo.avatarUrl || '',
								// 		account_type: 1, //账户类型 1 微信 2 支付宝 3 银行卡
								// 		is_default: 0,
								// 		account_id: infoRes.userInfo.openId, //支付宝账号  微信openid
								// 	})
								// 	.then(res => {
								// 		console.log(res, '=========res====微信提现账号==');
								// 		if (res.code == 1) {}
								// 	});
								//end
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
											uni.setStorageSync('userToken', res.data.userinfo
												.user_token);

											uni.removeStorageSync('PageCur');
											uni.$emit('appLoginSuccess', {});
											// uni.setStorageSync('wechet')
											uni.reLaunch({
												//这里跳转到登录成功后要去的页面
												url: '/pages/index/index'
											})
										}
										if (res.code == '-999') {
											uni.hideLoading();
											uni.setStorageSync('wechatinfo', infoRes.userInfo);
											uni.navigateTo({
												//这里跳转到微信账号绑定手机号的页面
												url: 'bind_account'
											});
										}
									});
								// }							
							},
							fail: e => {
								uni.hideLoading();
								let filesfrom = e.errMsg.substring(17, 11);
								uni.showToast({
									title: filesfrom,
									icon: 'success'
								});
								console.log(e, 'err失败');
							},
							complete: () => {
								console.log('完成');
							}
						});
					},
				});
			},
		}
	};
</script>
<style lang="scss">
	@font-face {
		font-family: 'HMfont-login';
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAVwAAsAAAAACiwAAAUhAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqHTIY+ATYCJAMUCwwABCAFhG0HRhvICBEVpCGR/UgwbhrPeq6LhESdqBKaSN/kw79n/bk3aCYZKO1yZCbTFZBZqLv71CzRPvkPQPDEzrPbAAEEdy/nHLBRL1RJVpMf+cAnKX4Do/NzekpNyAm5/zlmunw+sPy2tUt22QBHAx5Q5EUGHvAdnfOh3DK8OuQd0OlAAIiIQw5IS1uPAgEstFUEAFmxdPFcCDE92AIcgaDigV1ZkBvBQaCH6csAbnB/nnyDIiIAFBwDbePAotYFaAjIY0OMFtTMsBEQdGcFwOwFMAByALAAWQfaV4Dx4zlgIEpRFg2A/DsBFDQgB2oDc8eGgkGQeEFKUZejCznt9o/HQ5OHYmxDggUCskkBBgjUUoAAgbkUoMDYkPDCyDliuQhABkgJQK6yyhT38BIY8CBxYSRMEkkMSSATwkJdISFRxmEK1/vOnrTzXjViHzwz8aKlGEYs2iibpmp+5ratsgWGNWLbfrapGoZCpmU/tfdypWk3P2UpyrXbL9yT7r9NuzXF7fWdOOu/rp+KJfM9J10u24o94tV0yTZj7Q1k2sNGbKz3FE7fJrlO6jZTvS8u0ZhJun8isa0RspKxyKuEe2NZXZZOEuakK+yhNyZTXZI887RY8YQzlSXpoBHeCI5wo155sye1OndEW2qmqrgfekbypF8gtj1yfSpZR24fvUPxWVJPRLG2DHcxzf7n0tWR1+x5R0CV6j3Gds3IOfkK9MdFr5Un3mk4rSddo6/Jd1vEsCbatsu6R7YZUv2mevIuRf9nThs/zvYVz49u+Zw5nLqge+KujIq2hXHLc265lFGtRqxMdB4ZW7GDGxWkhRXLMpfNnaPMmLeT8S2mw3TIt3Ynv5P1TWOGGMW3c6cDCdUbnElHp9An2M7UvfFrl9Se3Mpl2OsC/OPrLn+Z/t+8OYMbyc7EULKrYRH0H8RvBcrsPjrZH/r9uO9DFSlsbnuo+4UQU/18N/9U41O/hEONfOLyA79rcYXtbq65rDorfijy9epSZFw8fEWNBN4peoL0Ll7SS4QBfh0/4Jnj+Jabk3XpkHSMdxxyuKysOZ4BfiuXySHl2UXydcnnx30kioxf/vShfUSnz/oZraNzc1Nu0tJttfyZxEhcTaOb/Ofrls75Pu/7/A/zPvxwpc/TJ34YSpffeeM2qlH/jVhDV9gcvNONnb7ZJePd7ubF++dFqYkkt2sh8dkoHjBpXMs3De/mt/y3dmCZ8424T5Y6B9aQf4r8dxu+imujrYtcywuiBztmF7Bt/yXK7wSmVlUEpshvJ/7HthUAHPDGBa7l2AIACD6yMPolEHyG+Y62A8EXmZ8Xf8adtzCtX+sirIn7vGB2RM1vgnSbRt7WD193ec251eT45BSoLPg221gAwV8Wxoo0A8eK3SZfLOSwDxLwhIWfYccX6Y7Gh90o5crFAIEAOQQKByYDAwEpSBabAxwktBLgCepBlK3eWxLDWSILAZDljYCI9AEq3GPAiPRFstgfcJz+wItsCaKRYg4pSas5NDtkASXwFzSCRmWYwsErPaK+9cxFRS7+is43IUijJJmqcUTXxRb+rrMQFChHA1TobNj3BJOjFkWITAhTHscKeqFI0DA7aOYgJkAS4F5AQyAjZQ8PDqnvP0LaTY9xBT0l9ivkeM34IBVJKiBr+Vip51SqvTstE4ioAhRTTAagIqyo1+METPC8FhKCiGkQneRiYpCqKo+GVw7nWPBn9NWuwEUJQ1jCER7cseG02dIwGppNhOPnjIu1djYDAAAA') format('woff2');
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
		background: #fff;
		height: calc(100%-StatusBar);
	}

	.header {
		// padding: 55rpx;
		width: 686rpx;
		margin: auto;

		.logo {
			font-size: 48rpx;
			letter-spacing: 3rpx;
			margin-bottom: 20rpx;
			font-weight: bold;
		}

		.phone {
			color: #c2c2c2;
			font-size: 24rpx;
		}
	}

	.form {
		.code {
			position: relative;

			.get-code {
				position: absolute;
				height: 90upx;
				display: flex;
				align-items: center;
				justify-content: center;
				right: 0;
				z-index: 3;
			}
		}

		.codestart {
			padding: 0 40upx 0 0;
			position: relative;

		}

		.codestart::after {
			position: absolute;
			right: -16upx;
			top: 16upx;
			width: 0;
			height: 0;
			border-right: 14upx solid transparent;
			border-left: 14upx solid transparent;
			border-top: 14upx solid #666;
		}

	}

	.form {
		margin-top: 0rpx;
		width: 686rpx;
		font-size: 30upx;
		margin: auto;

		.username,
		.password,
		.code {
			width: calc(100%);
			height: 90upx;
			display: flex;
			align-items: center;
			margin-bottom: 26upx;

			// border-bottom: 1rpx solid #ededed;
			input {
				width: 100%;
				height: 90upx;
				font-size: 32rpx;
				letter-spacing: 2rpx;
			}

			.icon_phone {
				width: 29rpx;
				height: 38rpx;
			}
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

	.userfooter-yy {
		font-size: 22upx;
		color: #666666;
		// text-align: center;
	}

	.res_bom {
		position: absolute;
		bottom: 20%;
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
			margin-top: 14upx;
		}

		image {
			width: 100rpx;
			height: 100upx;
		}
	}
</style>
