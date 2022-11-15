<template>
	<view class="plr16">
		<view>
			<view class="pt50 topBg">
				<image :src="IMG_URL + 'static/miniwechat/wechatbg.png'" mode="aspectFill" class="loginBg"></image>
				<view class="logoBox text-white flex align-center justify-center">
					<!-- 保障网 -->
					<image src="../../static/images/logo.png" mode="aspectFill"></image>
				</view>
			</view>


			<view class="footer">
				<button v-if="isUser" open-type="getUserInfo" withCredentials="true" lang="zh_CN"
					@getuserinfo="wxGetUserInfo" style="background:#39b54a;"
					class='btn_normal text-white'>微信一键授权</button>
				<button v-else class="btn_normal text-white" type="primary" open-type="getPhoneNumber"
					withCredentials="true" lang="zh_CN" @getphonenumber="getPhoneNumber"
					style="background:#39b54a;">绑定手机号</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				encryptedData: '',
				iv: '',
				IMG_URL:this.IMG_URL,
				signature: '',
				rawData: '',
				avatar: '',
				nickname: '',
				isUser: true, // 是否获取过用户信息授权
				openId: "",
				userinfo: {},
				goPage: 0,
			};
		},
		onLoad(e) {
			var that = this;
			this.getCode();
			console.log(wx.getUserProfile, 'wx.getUserProfile');
			uni.removeStorageSync('PageCur');
			if (e.page == 'outLogin') {
				this.goPage = 1
			}
		},
		methods: {
			// 获取code
			getCode() {
				uni.login({
					success: res => {
						this.code = res.code;
					}
				});
			},
			// 授权用户信息
			wxGetUserInfo(e) {
				let that = this
				uni.showModal({
					content: '是否授权微信',
					success(res) {
						if (res.confirm) {
							let code = '';
							uni.login({
								success: res => {
									code = res.code;
								}
							})
							uni.getUserProfile({
								desc: '用于完善会员资料',
								success: infoRes => {
									// console.log(code,infoRes,'tttttttttttttttttt');
									// return
									// console.log(code, ' ffffff', encodeURIComponent(infoRes
									// 		.encryptedData), 'ddddd',
									// 	encodeURIComponent(infoRes.iv), 'code1');
									// 允许授权用户登录
									// 请求登录接口
									that.$Request.post(that.$api.wechat.wx_login, {
											encryptedData: encodeURIComponent(infoRes.encryptedData),
											iv: encodeURIComponent(infoRes.iv),
											code: code,
											signature: infoRes.signature,
											rawData:infoRes.rawData,
											avatar:infoRes.userInfo.avatarUrl,
											nickname:infoRes.userInfo.nickName
										})
										.then(result => {
											// console.log('后台返回登录信息', result.code);
											if (result.code == 1) {
												uni.hideLoading();
												console.log(result.data,result.data.result,'result.result');
												// 如果后台返回来的是 result 字段,表示此账号还没有绑定过手机号 跳转到绑定手机号页面
												// 如果后台返回的是 userinfo 字段,表示已经登录成功,把用户信息存到 store 中,并返回跳转来的页面
												if (result.data.result) {
													console.log('后台返回的result',result.data.result);
													that.rawData = result.data.result;
													that.$Common.toast('授权成功，请点击按钮进行手机号授权');
													that.isUser = false;
													that.getCode();
												} else if (result.data.userinfo) {
													console.log(result.data.userinfo,'已绑定手机号');
													let info = that.userinfo = result.data
														.userinfo;
													uni.$emit('appLoginSuccess', {});
													uni.setStorageSync('USERINFO', info);
													uni.setStorageSync('userToken', info
														.user_token);
													uni.removeStorageSync('PageCur');
													uni.removeStorageSync('chooseCity');
													uni.$emit('wechatLogin', {}); //监听微信登录
													if (that.goPage == 1) {
														console.log(result.data,'授权返回的信息');
														if (result.data.userinfo.user_type == 2) {
															uni.reLaunch({
																url: '../../pages/index/index'
															})
														} else if (result.data.userinfo
															.user_type == 1) {
															if (result.data.userinfo
																.is_personal_profile == 0) {
																uni.navigateTo({
																	url: '../../pagesauthen/choose_shenfen'
																})
															} else {
																uni.reLaunch({
																	url: '../../pages/index/index'
																})
															}
														}
													} else {
														setTimeout(() => {
															uni.navigateBack()
														}, 500)
													}
												}
											} else if (result.code == -999) {
												// 服务器解析参数错误
												uni.hideLoading();
												that.$Common.toast(result.msg);
												that.getCode();
											} else {
												uni.hideLoading();
												that.$Common.toast('授权失败，请使用其他方式登录');
											}
										})
										.catch(err => {
											that.getCode();
											console.log('ERROR_catch', err);
											uni.hideLoading();
											that.$Common.toast(err.msg);
										});
								},
								fail: err => {
									console.log('ERROR_fail', err);
									uni.hideLoading();
									that.getCode();
								}
							});
						} else if (res.cancel) {
							uni.showToast({
								title: '授权失败',
								icon: 'none'
							})
							that.getCode();
						}
					}
				})

			},
			// 授权手机号
			getPhoneNumber(e) {
				this.getCode();
				uni.showLoading({
					title: '绑定中'
				});
				if (!this.code) {
					uni.hideLoading();
					this.$Common.toast('授权失败，请稍后重试');
					return;
				}

				if (e.detail.errMsg == "getPhoneNumber:fail:user deny") {
					uni.hideLoading();
					this.$Common.toast('您已经取消授权');
					return;
				}
				let obj = {
					iv: e.detail.iv,
					encryptedData: e.detail.encryptedData,
					code: this.code,
					wxinfo: JSON.stringify(this.rawData),
				};
				console.log(obj,'========obj======');
				this.phoneFn(obj);
			},
			phoneFn(obj) {
				this.$Request.post(this.$api.wechat.wx_info, obj).then(res => {
					this.$Common.toast(res.msg);
					if (res.code == 1) {
						uni.hideLoading()
						let info = res.data.userinfo;
						uni.$emit('appLoginSuccess', {}); //监听websocket连接
						uni.setStorageSync('USERINFO', info);
						uni.setStorageSync('userToken', info.user_token);
						uni.removeStorageSync('PageCur');
						uni.removeStorageSync('chooseCity');
						uni.$emit('wechatLogin', {}); //监听微信登录
						if (this.goPage == 1) {
							console.log(res.data,'绑定手机号返回的信息');
							if (res.data.userinfo.user_type == 2) {
								uni.reLaunch({
									url: '../../pages/index/index'
								})
							} else if (res.data.userinfo.user_type == 1) {
								if (res.data.userinfo.is_personal_profile == 0) {
									uni.navigateTo({
										url: '../../pagesauthen/choose_shenfen'
									})
								} else {
									uni.reLaunch({
										url: '../../pages/index/index'
									})
								}
							}
						} else {
							this.getCode();
							setTimeout(() => {
								uni.navigateBack({})
							}, 500)
						}
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.loginBg {
		width: 100%;
		height: 400rpx;
	}

	.topBg {
		position: relative;
	}

	.logoBox {
		width: 180rpx;
		height: 180rpx;
		overflow: hidden;
		background: linear-gradient(360deg, rgba(249, 159, 71, 1) 0%, rgba(241, 102, 34, 1) 100%);
		border-radius: 50%;
		opacity: 1;
		position: absolute;
		left: 35%;
		top: 20%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	page {
		background: #fff;
	}

	.noLogin {
		background: #708090 !important;
	}

	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #f7f7f7;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
		border: 1px #eee solid;
	}

	.footer {
		position: fixed;
		bottom: 100rpx;
		left: 0;
		right: 0;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
