<template>
	<!-- 重置密码 -->
	<view class="">
		<view class="header"><view class="logo text-bold">绑定手机号</view>
		<view class="margin-top text-gray" style="font-size: 28upx;">
			请输入手机号码
		</view></view>
		<view class="form">
			<view class="username">
				<input type="number" @confirm="getCode" placeholder="手机号" v-model="mobile" placeholder-style="color: #C2C2C2;" />
			</view>
			<view class="btn_next" @tap="doReg">下一步</view>
		</view>
		<view class=" margin-top">
			<view class="userfooter-yy ">
				<checkbox-group class="block" @change="CheckboxChange">
					<view class="flex justify-start align-center" style="padding: 0;">
						<checkbox :class="checkbox[0].checked ? 'checked' : ''" :checked="checkbox[0].checked ? true : false" value="A" style="transform:scale(0.6)"></checkbox>
						<text class="text-df" style="margin-left: 10upx;">我已阅读</text>
						<text class="text-df txt-theme" @tap="useragreement">《用户协议》</text>
					</view>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mobile: '',
			Resetpassword: '',
			code: '',
			checkbox: [
				{
					value: 'A',
					checked: true
				}
			],
			password: '',
			getCodeisWaiting: false,
			code_id: 0
		};
	},
	onLoad() {},
	methods: {
		CheckboxChange(e) {
			//勾选协议
			var items = this.checkbox,
				values = e.detail.value;
			for (var i = 0, lenI = items.length; i < lenI; ++i) {
				items[i].checked = false;
				for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
					if (items[i].value == values[j]) {
						items[i].checked = true;
						break;
					}
				}
			}
		},
		getCode() {
			if (this.getCodeisWaiting) {
				return;
			}
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
				console.log(this.mobile);
				uni.showToast({
					title: '请填写正确手机号码',
					icon: 'none'
				});
				return false;
			}
			this.getCodeisWaiting = true;

			this.$Request
				.post(this.$api.common.getverifycode, {
					mobile: this.mobile,
					type: 5
				})
				.then(res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					if (res.code == 1) {
						this.code_id = 1;
						this.setTimer();
					} else {
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
					clearInterval(this.Timer);
					return;
				}
				this.getCodeText = '重新获取(' + holdTime + ')';
				holdTime--;
			}, 1000);
		},
		useragreement() {
			//跳到用户协议
			uni.navigateTo({
				url: '../pagescommon/agreement'
			});
		},
		doReg() {
			//下一步
			uni.hideKeyboard();
			//模板示例部分验证规则
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
				uni.showToast(
					!this.mobile
						? {
								title: '请输入手机号码',
								icon: 'none'
						  }
						: {
								title: '请填写正确的手机号码',
								icon: 'none'
						  }
				);
				return false;
			}
			console.log(this.checkbox[0].checked);
			if(this.checkbox[0].checked==false){
				this.$Common.toast('请勾选用户协议')
				return
			}
			this.$Request
				.post(this.$api.common.getverifycode, {
					mobile: this.mobile,
					type: 5,
					// is_test: 1
				})
				.then(res => {
					if (res.code == 1) {
						this.code_id = 1;
						this.setTimer();
						// 发送成功 - 跳转验证码页面
						let data = this.$Common.convertObj({
							phone: this.mobile,
							pagetype:'bind',
							type: 5
						});
						uni.navigateTo({
							url:'code?'+data
						});
						uni.removeStorageSync('wechet')
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});			
		}
	}
};
</script>
<style lang="scss">
@font-face {
	font-family: 'HMfont-login';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAVwAAsAAAAACiwAAAUhAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqHTIY+ATYCJAMUCwwABCAFhG0HRhvICBEVpCGR/UgwbhrPeq6LhESdqBKaSN/kw79n/bk3aCYZKO1yZCbTFZBZqLv71CzRPvkPQPDEzrPbAAEEdy/nHLBRL1RJVpMf+cAnKX4Do/NzekpNyAm5/zlmunw+sPy2tUt22QBHAx5Q5EUGHvAdnfOh3DK8OuQd0OlAAIiIQw5IS1uPAgEstFUEAFmxdPFcCDE92AIcgaDigV1ZkBvBQaCH6csAbnB/nnyDIiIAFBwDbePAotYFaAjIY0OMFtTMsBEQdGcFwOwFMAByALAAWQfaV4Dx4zlgIEpRFg2A/DsBFDQgB2oDc8eGgkGQeEFKUZejCznt9o/HQ5OHYmxDggUCskkBBgjUUoAAgbkUoMDYkPDCyDliuQhABkgJQK6yyhT38BIY8CBxYSRMEkkMSSATwkJdISFRxmEK1/vOnrTzXjViHzwz8aKlGEYs2iibpmp+5ratsgWGNWLbfrapGoZCpmU/tfdypWk3P2UpyrXbL9yT7r9NuzXF7fWdOOu/rp+KJfM9J10u24o94tV0yTZj7Q1k2sNGbKz3FE7fJrlO6jZTvS8u0ZhJun8isa0RspKxyKuEe2NZXZZOEuakK+yhNyZTXZI887RY8YQzlSXpoBHeCI5wo155sye1OndEW2qmqrgfekbypF8gtj1yfSpZR24fvUPxWVJPRLG2DHcxzf7n0tWR1+x5R0CV6j3Gds3IOfkK9MdFr5Un3mk4rSddo6/Jd1vEsCbatsu6R7YZUv2mevIuRf9nThs/zvYVz49u+Zw5nLqge+KujIq2hXHLc265lFGtRqxMdB4ZW7GDGxWkhRXLMpfNnaPMmLeT8S2mw3TIt3Ynv5P1TWOGGMW3c6cDCdUbnElHp9An2M7UvfFrl9Se3Mpl2OsC/OPrLn+Z/t+8OYMbyc7EULKrYRH0H8RvBcrsPjrZH/r9uO9DFSlsbnuo+4UQU/18N/9U41O/hEONfOLyA79rcYXtbq65rDorfijy9epSZFw8fEWNBN4peoL0Ll7SS4QBfh0/4Jnj+Jabk3XpkHSMdxxyuKysOZ4BfiuXySHl2UXydcnnx30kioxf/vShfUSnz/oZraNzc1Nu0tJttfyZxEhcTaOb/Ofrls75Pu/7/A/zPvxwpc/TJ34YSpffeeM2qlH/jVhDV9gcvNONnb7ZJePd7ubF++dFqYkkt2sh8dkoHjBpXMs3De/mt/y3dmCZ8424T5Y6B9aQf4r8dxu+imujrYtcywuiBztmF7Bt/yXK7wSmVlUEpshvJ/7HthUAHPDGBa7l2AIACD6yMPolEHyG+Y62A8EXmZ8Xf8adtzCtX+sirIn7vGB2RM1vgnSbRt7WD193ec251eT45BSoLPg221gAwV8Wxoo0A8eK3SZfLOSwDxLwhIWfYccX6Y7Gh90o5crFAIEAOQQKByYDAwEpSBabAxwktBLgCepBlK3eWxLDWSILAZDljYCI9AEq3GPAiPRFstgfcJz+wItsCaKRYg4pSas5NDtkASXwFzSCRmWYwsErPaK+9cxFRS7+is43IUijJJmqcUTXxRb+rrMQFChHA1TobNj3BJOjFkWITAhTHscKeqFI0DA7aOYgJkAS4F5AQyAjZQ8PDqnvP0LaTY9xBT0l9ivkeM34IBVJKiBr+Vip51SqvTstE4ioAhRTTAagIqyo1+METPC8FhKCiGkQneRiYpCqKo+GVw7nWPBn9NWuwEUJQ1jCER7cseG02dIwGppNhOPnjIu1djYDAAAA')
		format('woff2');
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
	height: 100%;
}

.header {
	// padding: 185rpx 55rpx 0;
	width: 686rpx;
	margin: 100upx auto 50upx;
	.logo {
		font-size: 52rpx;
		letter-spacing: 2rpx;
		margin-bottom: 20rpx;
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
}

.form {
	margin-top: 80rpx;
	width: 686rpx;
	font-size: 30upx;
	margin: auto;
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
	width: 706upx;
	margin: auto;
	font-size: 22upx;
	color: #666666;
	text-align: left;
}
</style>
