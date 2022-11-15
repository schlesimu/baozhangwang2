<template>
	<!-- 找回支付密码 -->
	<view class="warp brt_e">
		<!-- background pic end -->

		<!-- 验证码login start -->
		<view class="form-wapper">
			<view class="ptb15 brb_e">
				<input type="number" placeholder="请输入手机号" v-model="mobile" maxlength="11"
					placeholder-style="color: #999" />
			</view>
			<view class="code brb_e flex align-center justify-between">
				<input type="number" placeholder="请输入验证码" v-model="code" maxlength="6"
					placeholder-style="color: #999" />
				<view class="get-code flex_shrink" :style="{'color':getCodeBtnColor}" @click.stop="getCode()">{{getCodeText}}</view>
			</view>
		</view>
		<!-- 验证码login end -->

		<!-- 立即登录按钮 start -->
		<view class="login-btn" @click="doReset"> 查询 </view>
		<!-- 立即登录按钮 end -->
	</view>
</template>
<script>
	// 引入验证方法
	export default {
		data() {
			return {
				mobile: "", // 手机号,@String
				code: '',
				password: "",
				getCodeText: '获取验证码',
				getCodeBtnColor: "#1B90FF",
				getCodeisWaiting: false,
				code_id: 0,
				page:'',//页面类型  user  我的工资查询
			};
		},
		onUnload() {
		
			// 页面关闭时清除计时器，优化性能
			clearInterval(this.timer);
		},
		onLoad(e) {
				this.page=e.page
		},
		methods: {
			/**
			 * @event 立即登录按钮点击事件
			 */
			doReset() {
				uni.hideKeyboard()
				//验证手机号码
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
					uni.showToast(
						!this.mobile ?
						{
							title: '请输入手机号',
							icon: 'none'
						} :
						{
							title: '请填写正确手机号',
							icon: 'none'
						}
					);
					return false;
				}
				//模板示例部分验证规则				
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
				let data = {
					mobile: this.mobile,
					code: this.code
				}
				if(this.page=='user'){
					uni.$emit('phoneCode', data)
					uni.redirectTo({
						url:'../../pagescenter/userypz/mySalary?mobile='+this.mobile+'&code='+this.code
					})
				}else{
					uni.$emit('phoneCode', data)
					uni.navigateBack({
						delta: 1,
					});
				}
				
			},
			/**
			 * @event 返回上一页
			 */
			BackPage() {
				uni.navigateBack({
					delta: 1,
				});
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
			/**
			 * @event 发送验证码
			 */
			getCode() {
				if (this.getCodeisWaiting) {
					return;
				}
				//验证手机号码
				if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.mobile)) {
					uni.showToast(
						!this.mobile ?
						{
							title: '请输入手机号',
							icon: 'none'
						} :
						{
							title: '请填写正确手机号',
							icon: 'none'
						}
					);
					return false;
				}
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "#1B90FF"

				this.$Request.post(this.$api.common.getverifycode, {
					mobile: this.mobile,
					type: 7
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


		},
	};
</script>
<style lang="scss">
	// 头部返回键 start
	.cu-bar .action {
		position: relative;
		z-index: 5;
	}

	// 头部返回键 end

	// 主体 start
	.warp {
		background: #fff;
		min-height: 100vh;

		// 验证码 start
		.login_tit {
			margin-top: 28rpx;
			font-size: 30rpx;
			color: #333;
			font-weight: 700;
		}

		// 验证码 end

		// background pic start
		.bg_img {
			width: 100%;
			height: 441rpx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 2;
		}

		.login-title {
			position: relative;
			z-index: 9;

			.logo {
				padding-top: 128rpx;
				padding-left: 75rpx;
				font-size: 56rpx;
				font-weight: 500;
			}
		}

		// background pic end

		// 验证码login start
		.form-wapper,
		.logo {
			width: 100%;
			box-sizing: border-box;
		}

		.form-wapper {
			position: relative;
			padding: 30rpx 30rpx 80rpx;
			border-radius: 10rpx;
			z-index: 99;


			.password,
			.code {
				width: calc(100%);
				height: 90upx;
				display: flex;
				align-items: center;
				padding: 60upx 0upx;

				.get-code {

					display: flex;
					align-items: center;
					justify-content: center;
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
				color: #1B90FF;
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

		// 验证码login end

		// 立即登录按钮 start
		.login-btn {
			display: block;
			line-height: 88rpx;
			text-align: center;
			margin: 0 30rpx;
			height: 88rpx;
			font-size: 32rpx;
			color: #fff;
			background: #1B90FF;
			border-radius: 50rpx;
			background-blend-mode: normal, normal;

			&:after {
				border: 0;
			}
		}

		// 立即登录end

		// 快捷登录 start
		.quick {
			text-align: center;

			.quick-title {
				margin: 120rpx 0 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				.txt {
					font-size: 28rpx;
					color: #999;
					padding: 0 20rpx;
				}

				.line {
					display: block;
					width: 160rpx;
					position: relative;

					&:after {
						content: "";
						position: absolute;
						z-index: 0;
						bottom: 0;
						left: 0;
						width: 100%;
						border-bottom: 1px solid #eee;
						transform: scaleY(0.5);
						transform-origin: 0 0;
					}
				}
			}

			image {
				width: 80rpx;
				height: 80rpx;
				margin: 0 35rpx;
			}
		}

		// 快捷登录 end
	}

	// 主体 end
</style>
