<!-- 绑定支付宝、微信 -->
<template>
	<view>
		<cu-custom bgColor="" :isBack="true" class="brb_e">
			<block slot="content">{{paytype ==2 ? '支付宝' : '微信'}}</block>
			<!-- <block slot="content" v-if="paytype ==1">微信</block> -->
			<block slot="right" v-if="paytype==2">
				<!-- #ifndef MP-WEIXIN -->
				<view @tap="confir" class="text-black padding-lr">确定</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view @tap="confir" class="text-black ">确定</view>
				<!-- #endif -->
			</block>
		</cu-custom>
		<!-- 中间表单 -->
		<view class="bind_box " v-if="paytype==2">
			<view class="cu-form-group brb_e" style="padding: 0;">
				<view class="title text-bold">姓名</view>
				<input class="text-df" type="text" v-model="content" placeholder-class="text-md text-gray" placeholder="请输入真实姓名，需与认证信息一致" />
			</view>
			<view class="padding-top padding-bottom brb_e flex align-center" style="" v-if="paytype == 2">
				<view class="title text-bold pr10">支付宝账号</view>
				<input class="text-df" type="text" v-model="account_id" placeholder-class="text-md text-gray" placeholder="请输入支付宝账号" />
			</view>

		</view>
		<view class="plr15 padding-top" v-if="paytype==1">
			<view class="  " style="padding: 0;">
				<view class="title text-bold w100">绑定的微信信息</view>
				<view class="flex align-center padding-top" v-if="wechatInfo">
					<text>{{wechatInfo.nickName}}</text>
					<image :src="wechatInfo.avatarUrl" mode="" class="img-100 round margin-left"></image>
				</view>
				<view class="padding-top" v-if="!wechatInfo">
					暂未绑定微信
				</view>
			</view>
			<view class="">
				<view class=" wx_btn text-center bg-theme text-white" @tap='getOpenid'>
					{{wechatInfo?'切换绑定的授权微信':'微信授权'}}</view>
				<!-- <view class=" wx_btn text-center  text-333" v-if="wechatInfo!=''" style="width: 600upx;">已进行微信授权,可以发起微信提现了哟 -->
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				imgList: '',
				imgList2: '',
				paytype: 2,
				account_id: '', //绑定的账号
				wechatInfo: '', //微信授权信息

			};
		},
		onLoad(e) {
			uni.showLoading({})
			this.paytype = e.type;
			this.getmsg()
			// if (e.type == 1) {
			// 	// 微信  获取微信openid
			// 	if (uni.getStorageSync('wechatInfo')) {
			// 		this.wechatInfo = uni.getStorageSync('wechatInfo')
			// 		console.log(this.wechatInfo, '==========this.wechatInfo ');
			// 		return
			// 	}
			// }
		},

		methods: {
			lookImg(url) { //图片预览
				this.$Common.lookImg(url);
			},
			getmsg() {
				this.$Request
					.get(this.$api.money.get_withdraw_account, {
						account_type: this.paytype
					})
					.then(res => {
						uni.hideLoading()
						console.log(res, '获取绑定数据');
						if (res.code == 1) {
							if (this.paytype == 2) {
								this.content = res.data.true_name
								this.account_id = res.data.account_id
								this.imgList = res.data.qrcode
								this.imgList2 = res.data.qrcode[0].aid
							} else {
								this.wechatInfo = {
									nickName: res.data.true_name,
									avatarUrl: res.data.qrcode
								}
							}

							// console.log(this.imgList2)
						} else {
							// this.$Common.toast(res.msg);
						}
					});
			},
			DelImg() {
				uni.showModal({
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList = '';
							this.imgList2 = '';
							console.log(this.imgList);
						}
					}
				});
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: res => {
						uni.showLoading();
						for (var i in res.tempFilePaths) {
							uni.uploadFile({
								url: this.$Config('APIHOST') + this.$api.common.upload,
								filePath: res.tempFilePaths[i],
								name: 'file[]',
								success: uploadFileRes => {
									uni.hideLoading();
									let imgs = JSON.parse(uploadFileRes.data);
									this.imgList = imgs.data[0].path
									console.log(this.imgList)
									this.imgList2 = imgs.data[0].id
									// console.log('this.imglist2', this.imgList2);
								}
							});
						}
					}
				});
			},
			getOpenid() {
				uni.login({
					success: (res) => {
						uni.getUserInfo({
							provider: 'weixin',
							success: infoRes => {
								console.log(res, infoRes, '=========');
								this.wechatInfo = infoRes.userInfo
								this.$Request
									.post(this.$api.money.bind_withdraw_account, {
										true_name: this.wechatInfo.nickName,
										qrcode: infoRes.userInfo.avatarUrl || '',
										account_type: this.paytype, //账户类型 1 微信 2 支付宝 3 银行卡
										is_default: 0,
										account_id: this.paytype == 2 ? this.account_id : this.wechatInfo.openId, //支付宝账号  微信openid
									})
									.then(res => {
										// console.log(this.imgList,'图片');
										if (res.code == 1) {
											this.$Common.toast(res.msg);
											setTimeout(() => {
												uni.navigateBack({});
											}, 1000)

										} else {
											this.$Common.toast(res.msg);
										}
									});
								// uni.setStorageSync('wechatInfo', infoRes.userInfo)
							},
						})
					}
				})
			},
			confir() {
				//点击确定
				if (this.paytype == 2) {
					if (!this.content) {
						this.$Common.toast('请输入姓名')
						return
					}
					// if (this.imgList == '') {
					// 	console.log(this.imgList);
					// 	this.$Common.toast('请上传收款二维码')
					// 	return
					// }
				}
				if (this.paytype == 2) {
					if (!this.account_id) {
						this.$Common.toast('请填写支付宝账号')
						return
					}
				}
				this.$Request
					.post(this.$api.money.bind_withdraw_account, {
						true_name: this.content || '',
						qrcode: this.imgList || '',
						account_type: this.paytype, //账户类型 1 微信 2 支付宝 3 银行卡
						is_default: 0,
						account_id: this.account_id || this.uniopenid || '', //支付宝账号  微信openid
					})
					.then(res => {
						// console.log(this.imgList,'图片');
						if (res.code == 1) {
							this.$Common.toast(res.msg);
							setTimeout(() => {
								uni.navigateBack({});
							}, 1000)

						} else {
							this.$Common.toast(res.msg);
						}
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
		background: #ffffff;
	}

	.bind_box {
		background: #fff;
		width: 686rpx;
		height: 791rpx;
		margin: 30rpx auto;
		border-radius: 30rpx;
		overflow: hidden;
	}

	.erweima_box {
		position: relative;
		text-align: center;

		.kuang {
			width: 150rpx;
			height: 150rpx;
		}

		.erweima {
			padding: 0;
		}

		.erweima_img {
			width: 150rpx;
			height: 150rpx;
		}
	}

	.solids::after {
		content: '';
		border: 0;
	}

	.wx_btn {
		width: 300upx;
		height: 88upx;
		line-height: 88upx;
		margin: 200upx auto 0;
		border-radius: 999upx;

	}
</style>
