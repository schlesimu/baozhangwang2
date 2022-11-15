<template>
	<!-- 接单验证 -->
	<view>

		<view class="form">
			<view class="username text-black">
				<input type="text" placeholder="请输入手机号" v-model="mobile" disabled  style="color: #333;"/>
			</view>
			<view class="code">
				<input type="number" placeholder="请输入验证码" v-model="code" placeholder-style="color: #999" :style="code ? 'color:#333;' : 'color:#999'"
				 :placeholder-style="code ? 'color:#333;' : 'color:#999'" />
				<view class="get-code" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
			</view>
			<view class="btn_next" style="position: absolute;bottom: 10%;left: 0;right: 0;margin: auto;background-color: #0289FF;"
			 @tap="doReset">确认接单</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: "",
				code: '',
				getCodeText: '获取验证码',
				getCodeBtnColor: "#1B90FF",
				getCodeisWaiting: false,
				code_id: 0,
				aid: '', //兼职id
				is_red: 1, //是否已读规则
				user_id: uni.getStorageSync('USERINFO').id
			}
		},
		onLoad(e) {
			this.aid = e.aid
			uni.$on('is_red', (data) => {
				this.is_red = 1
			})
			this.get_usrInfo()
		},
		methods: {
			Timer() {},
			get_usrInfo() {
				//获取用户信息
				this.$Request.post(this.$api.user.get_user_info, {
					user_id: uni.getStorageSync('USERINFO').id
				}).then(res => {
					this.mobile = res.data.mobile;
				});
			},
			getCode() {
				if (this.getCodeisWaiting) {
					return;
				}
				if (!this.mobile) {
					uni.showToast({
						title: '请先填写手机号码',
						icon: "none"
					});
					return false;
				}
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '请填写正确的手机号码',
						icon: "none"
					});
					return false;
				}
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "#1B90FF"

				this.$Request.post(this.$api.common.getverifycode, {
					mobile: this.mobile,
					type: 6,
					user_id: this.user_id,
					// is_test: 1
				}).then(res => {
					uni.showToast({
						title: res.msg,
						icon: "none"
					});
					if (res.code == 1) {
						this.$Common.toast(res.msg)
						this.code_id = 1;
						this.setTimer();
					} else {
						this.getCodeText = '获取验证码';
						this.getCodeBtnColor = "#1B90FF";
						this.getCodeisWaiting = false;
					}
				})
			},
			setTimer() {
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#1B90FF";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer);
						return;
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;

				}, 1000)
			},
			doReset() {
				uni.hideKeyboard()
				//模板示例部分验证规则
				if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile))) {
					uni.showToast(!this.mobile ? {
						title: '请输入手机号码',
						icon: "none"
					} : {
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}

				if (!this.code_id) {
					uni.showToast({
						title: '请先获取验证码',
						icon: "none"
					});
					return false;
				}

				if (!this.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: "none"
					});
					return false;
				}
				uni.showLoading({
					title: '提交中...'
				})

				this.$Request.post(this.$api.operation.verification, {
					mobile: this.mobile,
					code: this.code,
					type: 6,
					is_red: this.is_red, //0未读兼职规则 1：已读兼职规则
					aid: this.aid //兼职任务id
				}).then(res => {
					uni.hideLoading();
					if (res.code == 1) {
						uni.$emit('verification', {})
						this.$Common.toast(res.msg)
						setTimeout(function() {
							uni.navigateBack();
						}, 600)
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
						// setTimeout(function() {
						// 	uni.navigateTo({
						// 		url:'../pagescenter/userypz/online_authencation'
						// 	});
						// }, 600)
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.icon {
		// font-family: 'HMfont-login' !important;

		font-style: normal;
		// color: #ffffff;
	}

	page {
		background: #FFFFFF;
		height: 100%;
	}

	.form {
		.username {
			position: relative;

		}

		.res {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100upx;
		}
	}

	.form {
		.res {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
		}

		width: 100%;
		// padding: 0 7%;
		font-size: 30upx;

		.username,
		.password,
		.code {
			width: calc(100%);
			height: 90upx;
			display: flex;
			align-items: center;
			padding: 0 30upx;
			margin-bottom: 26upx;

			.get-code {
				position: absolute;
				height: 90upx;
				display: flex;
				align-items: center;
				justify-content: center;
				right: 0;
				padding: 0 40upx;
				// border-left: solid 1upx #fff;
				z-index: 3;

				&:after {
					content: " ";
					width: 1upx;
					height: 50upx;
					background-color: #fff;
					position: absolute;
					z-index: 3;
					margin-right: 100%;
					left: 0;
					top: 20upx;
				}
			}

			input {
				width: 70%;
				height: 50upx;
				font-weight: 200;
			}
		}

		.btn {
			color: #EC5413;
			width: 100%;
			height: 90upx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			// border: solid 1upx #fffefe;
			font-size: 40upx;
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
</style>
