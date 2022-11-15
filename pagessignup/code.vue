<template>
	<view class="">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"><text class="text-bold"></text></block>
			<block slot="right">
				<view class="padding" style="color: #333;" @tap="passlogin">账号密码登录</view>
			</block>
		</cu-custom>
		<view class="header">
			<view class="" style="margin-bottom: 120rpx;">
				<view class="logo text-bold">输入验证码</view>
				<view class="phone margin-tb">4位验证码已发送至 <text class="text-black" style="margin-left: 10upx;"> +86 {{ mobile }}</text></view>
			</view>
			<!-- 插件市场 地址：https://ext.dcloud.net.cn/plugin?id=703 -->
			<view class="code-box">
				<view class="flex-box">
					<input type="number" focus="true" :maxlength="maxlength" class="hide-input" @input="getVal" />
					<block v-for="(item, index) in ranges" :key="index">
						<view :class="['item', { active: codeIndex === item, middle: type === 'middle', bottom: type === 'bottom', box: type === 'box' }]">
							<view class="line" v-if="type !== 'middle'"></view>
							<view v-if="type === 'middle' && codeIndex <= item" class="bottom-line"></view>
							<block v-if="isPwd && codeArr.length >= item"><text class="dot">.</text></block>
							<block v-else>{{ codeArr[index] ? codeArr[index] : '' }}</block>
						</view>
					</block>
				</view>
			</view>

			<view class="refrash text-df " @click.stop="getCode()" :style="{ color: getCodeBtnColor }">{{ getCodeText }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: null,
				propType: '', //1=注册(未注册手机号),2=忘记密码(已经注册的手机号),3=短信登录,4修改手机号5绑定手机号
				pagetype: '', //微信登录绑定手机号页面
				// 到计时
				getCodeisWaiting: true,
				// 输入框
				codeIndex: 1,
				getCodeBtnColor: '',
				getCodeText: '',
				codeArr: [],
				ranges: [1, 2, 3, 4],
				maxlength: 4, // 4/6
				isPwd: false,
				type: '',
				bindtype: '',
				password: '', //密码
			};
		},
		watch: {
			maxlength: {
				immediate: true,
				handler: function(newV) {
					if (newV === 6) {
						this.ranges = [1, 2, 3, 4, 5, 6];
					} else {
						this.ranges = [1, 2, 3, 4];
					}
				}
			}
		},
		onLoad(page) {
			this.mobile = page.phone;
			this.propType = page.type;
			this.password = page.password
			this.pagetype = page.pagetype || '' //绑定手机号页面
			this.setTimer();

		},

		methods: {
			passlogin() { //使用密码登录
				uni.navigateTo({
					url: 'login'
				});
			},
			getVal(e) { //输入验证码
				let {
					value
				} = e.detail;
				let arr = value.split('');
				this.codeIndex = arr.length + 1;
				this.codeArr = arr;
				if (this.codeIndex > Number(this.maxlength)) {
					// this.$emit('finish',this.codeArr.join(''));
					this.submit(); //完成输入
				}
			},
			userclient() {
				let client_id = plus.push.getClientInfo().clientid;
				this.$Request
					.post(this.$api.common.set_client_id, {
						client_id: client_id
					})
					.then(res => {
						if (res.code == '1') {
							this.content = res.data;
						}
					});
			},
			submit() {
				//提交
				uni.showLoading({
					title: '提交中...'
				});
				let wechatinfo = uni.getStorageSync("wechatinfo")
				// #ifdef APP-PLUS
				let client_id = plus.push.getClientInfo().clientid;
				// #endif
				if (this.pagetype == 'bind') {
					let data = {
						mobile: this.mobile,
						type: this.propType,
						code: this.codeArr.join(''),
						openId: wechatinfo.openId,
						unionId: wechatinfo.unionId,
						// #ifdef APP-PLUS
						client_id: client_id,
						// #endif
						nickName: wechatinfo.nickName
					};
					this.$Request
						.post(this.$api.user.bind_wechat_account, {
							mobile: this.mobile,
							type: this.propType,
							code: this.codeArr.join(''),
							openId: wechatinfo.openId,
							unionId: wechatinfo.unionId,
							// #ifdef APP-PLUS
							client_id: client_id,
							// #endif
							nickName: wechatinfo.nickName
						})
						.then(res => {
							uni.hideLoading();
							if (res.code == 1) {
								//存入本地
								uni.removeStorageSync('wechatinfo');
								uni.setStorageSync('USERINFO', res.data.userinfo);
								uni.setStorageSync('userToken', res.data.userinfo.user_token);
								uni.removeStorageSync('PageCur');
								uni.$emit('userinfo', {});
								uni.$emit('appLoginSuccess', {});
								console.log(res.data);
								if (res.data.userinfo.user_type == 2) {
									uni.reLaunch({
										url: '../pages/index/index'
									})
								} else if (res.data.userinfo.user_type == 1) {
									if (res.data.userinfo.is_personal_profile == 0) {
										uni.navigateTo({
											url: './chooseCity'
										})
									} else {
										uni.reLaunch({
											url: '../pages/index/index'
										})
									}
								}
								// #ifdef APP-PLUS
								this.userclient();
								// #endif
							} else {
								this.$Common.toast(res.msg);
							}
						});
				} else { //注册
					this.$Request
						.post(this.$api.user.user_mobile_login, {
							mobile: this.mobile,
							type: this.propType,
							code: this.codeArr.join(''),
							password: this.password
						})
						.then(res => {
							uni.hideLoading();
							if (res.code == 1) {
								//存入本地
								// res.data.userinfo.user_type=1
								uni.setStorageSync('USERINFO', res.data.userinfo);
								uni.setStorageSync('userToken', res.data.userinfo.user_token);
								uni.$emit('userinfo', {});
								uni.removeStorageSync('PageCur');
								uni.$emit('appLoginSuccess', {});
								// #ifdef APP-PLUS
								this.userclient();
								// #endif
								uni.navigateTo({
									url: './chooseCity'
								})
							} else {
								this.$Common.toast(res.msg);
							}
						});
				}
			},
			getCode() { //重新获取验证码
				uni.hideKeyboard();
				if (this.getCodeisWaiting) {
					return;
				}
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
				this.getCodeText = '发送中...';
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = '#2A89FF';

				this.$Request
					.post(this.$api.common.getverifycode, {
						mobile: this.mobile,
						type: this.propType
					})
					.then(res => {
						this.$Common.toast(res.msg)
						if (res.code == 1) {
							this.setTimer();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
							this.getCodeText = '获取验证码';
							this.getCodeBtnColor = '#2A89FF';
							this.getCodeisWaiting = false;
						}
					});
			},
			setTimer() {
				//执行倒计时
				let holdTime = 60;
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = '#2A89FF';
						this.getCodeText = '重新发送';
						clearInterval(this.Timer);
						return;
					}
					this.getCodeBtnColor = '#666666';
					this.getCodeText = '重新发送' + '(' + holdTime + 's)';
					holdTime--;
				}, 1000);
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.header {
		padding: 115rpx 80upx 55rpx 40upx;

		.logo {
			font-size: 52rpx;
		}

		.phone {
			color: #c2c2c2;
			font-size: 32rpx;
			letter-spacing: 2upx;
		}
	}

	/* 输入框样式 */
	@keyframes twinkling {
		0% {
			opacity: 0.2;
		}

		50% {
			opacity: 0.5;
		}

		100% {
			opacity: 0.2;
		}
	}

	.code-box {
		text-align: center;
	}

	.flex-box {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		position: relative;
	}

	.flex-box .hide-input {
		position: absolute;
		top: 0;
		left: -100%;
		width: 200%;
		height: 100%;
		text-align: left;
		z-index: 9;
		opacity: 1;
	}

	.flex-box .item {
		position: relative;
		width: 88upx;
		height: 88upx;
		margin-right: 56upx;
		font-size: 48upx;
		font-weight: 400;
		color: #333333;
		line-height: 88upx;
		background: #ffffff;
		border: 1px solid rgba(153, 153, 153, .3);
	}

	.flex-box .item:last-child {
		margin-right: 0;
	}

	.flex-box .middle {
		// border: none;
	}

	.flex-box .box {
		box-sizing: border-box;
		border: 2upx solid #cccccc;
		border-radius: 6rpx;
	}

	.flex-box .bottom {
		box-sizing: border-box;
		border-bottom: 8rpx solid #212121;
	}

	.flex-box .active {
		border-color: #0289FF;
	}

	.flex-box .active .line {
		display: block;
	}

	.flex-box .line {
		display: none;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 2upx;
		height: 40upx;
		background: #333333;
		animation: twinkling 1s infinite ease;
	}

	.flex-box .dot {
		font-size: 80upx;
		line-height: 40upx;
	}

	.flex-box .bottom-line {
		height: 4px;
		background: #f6f6f6;
		width: 80%;
		position: absolute;
		border-radius: 2px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.refrash {
		color: #2a89ff;
		margin-top: 40upx;
	}
</style>
