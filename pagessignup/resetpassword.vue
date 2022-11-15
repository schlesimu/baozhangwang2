<template>
	<!-- 注册页面 -->
	<view class="padding">
		<view class="title">
			找回密码
		</view>
		<view class="text-gray text-df margin-top">
			请输入手机号码、新密码、短信验证码
		</view>
		<view class="form">
			<view class="username">
				<input type="number" placeholder="请输入手机号" v-model="mobile" placeholder-style="color: #C2C2C2;font-size:32rpx;" />
			</view>
			<view class="password">
				<input maxlength="12" placeholder="请输入密码(6~12位数字加字母)" v-model.trim="password" password="true" placeholder-style="color: #C2C2C2;font-size:32rpx;" />
			</view>
			<view class="code">
				<view class="get-code text-df" :style="{ color: getCodeBtnColor }" @click.stop="getCode()">{{ getCodeText }}</view>
				<input type="number" placeholder="验证码" v-model="code" placeholder-style="color: #C2C2C2;font-size:32rpx;" />
			</view>
			<view class="btn_next" style="margin-top: 200rpx;background-color: #0289FF;" @tap="doReg">重置密码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				password: '',
				getCodeText: '获取验证码',
				getCodeBtnColor: '#50AEFF',
				getCodeisWaiting: false,
				code_id: 0
			};
		},
		onLoad() {},
		methods: {
			getCode() {//获取验证码
				uni.hideKeyboard();
				if (this.getCodeisWaiting) {
					return;
				}
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
					uni.showToast(
						!this.mobile ?
						{
							title: '请输入手机号码',
							icon: 'none'
						} :
						{
							title: '请填写正确手机号码',
							icon: 'none'
						}
					);
					return false;
				}
				
				this.getCodeText = '发送中...';
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = '#999999';
				this.$Request
					.post(this.$api.common.getverifycode, {
						mobile: this.mobile,
						type: 2
					})
					.then(res => {
						if (res.code == 1) {
							this.code_id = 1;
							this.setTimer();
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
							this.getCodeText = '获取验证码';
							this.getCodeBtnColor = '#999';
							this.getCodeisWaiting = false;
						}
					});
			},
			setTimer() {
				let holdTime = 60;
				this.getCodeText = '重新获取(60)';
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = '#999';
						this.getCodeText = '获取验证码';
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = '重新获取(' + holdTime + ')';
					holdTime--;
				}, 1000);
			},
			doReg() {//重置密码
				uni.hideKeyboard();

				//模板示例部分验证规则//按照测试文档手机号为空提示请输入手机号
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
					uni.showToast(
						!this.mobile ?
						{
							title: '请输入手机号码',
							icon: 'none'
						} :
						{
							title: '请填写正确手机号码',
							icon: 'none'
						}
					);
					return false;
				}
				var reg=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
				if (!reg.test(this.password)||this.password.length<6||this.password.length>12) {
					uni.showToast({
						title:'请输入6-12位，字母、数字组合的密码',
						icon:'none'
					});
					return false;
				}
				if (!this.code_id) {
					uni.showToast({
						title: '请先获取验证码',
						icon: 'none'
					});
					return false;
				}
				if (!this.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					});
					return false;
				}
				
				uni.showLoading({
					title: '提交中...'
				});

				this.$Request
					.post(this.$api.user.user_forget_password, {
						mobile: this.mobile,
						code: this.code,
						password: this.password
					})
					.then(res => {
						uni.hideLoading();
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						if (res.code == 1) {
							setTimeout(() => {
								// this.$mRouter.push({
								// 	route: this.$mRoutesConfig.login
								// });
								uni.navigateBack({})
							}, 600);
						}
					});
			},
			toLogin() {
				this.$mRouter.push({
					route: this.$mRoutesConfig.login
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
		height: calc(100%-44upx);
	}


	.title {
		font-size:48rpx;
		margin:52rpx 0 0rpx ;
		font-weight: bold;
		letter-spacing: 1upx;
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
	}

	.form {
		// padding: 0 7%;
		font-size: 30upx;
		margin:60upx auto 0;
		.username,
		.password,
		.code {
			width: calc(100%);
			height: 120upx;
			display: flex;
			align-items: center;
			margin-bottom: 26upx;
			// border-bottom: 1rpx solid #ededed;

			input {
				width: 100%;
				height: 90upx;
				font-size: 32rpx;
				letter-spacing: 2upx;
			}
		}
		.icon_phone{
			width: 29rpx;
			height: 38rpx;
		}
		.icon_password{
			width: 30rpx;
			height: 38rpx;
		}
		.icon_code{
			width: 34rpx;
			height: 38rpx;
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
		color: #CCCCCC
	}
	
</style>
