<template>
	<view class="contain">
		<view class="choose ">
			<view class="text-center" style="font-size: 32upx;line-height: 120upx;">
				当前所在地区({{positionArea}})
			</view>
		</view>
		<view class="item" style="">
			<view class=" bg-theme" @tap="gomy_work">
				<view class="text-center text-white" style="font-size: 32upx;line-height: 80upx;">
					直达{{positionArea}}
				</view>
			</view>
			<view class="  mt45 line-gray " @tap=" chooseArea">
				<view class="text-center text-333" style="font-size: 32upx;line-height: 80upx;">
					手动选择区域
				</view>
			</view>
		</view>
		<w-picker :visible.sync="region" mode="region" @confirm="addressConfirm" ref="region" themeColor="#2A89FF"></w-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userinfo: '', //用户信息
				region: false, //地区选择
				positionArea: '', //当前所在区域
				address: '', //地址
				area: '', //地区
				city_id: '', //区id
			}
		},
		onLoad() {
			this.get_location()
		},
		onShow() {
			this.userinfo = uni.getStorageSync('USERINFO')

		},
		methods: {
			gomy_work() { // 应聘者
				this.$Request.post(this.$api.user.edit_user_info, {
					city_id: this.city_id
				}).then(res => {
					if (res.code == 1) {
						this.$Common.toast('区域已绑定，请选择身份');
						setTimeout(() => {
							uni.redirectTo({
								url: '../pagesauthen/choose_shenfen'
							});
						}, 200)

					} else {
						this.$Common.toast(res.msg);
					}
				});

			},
			chooseArea() { //招聘者
				this.$data['region'] = true;
			},
			// 获取定位
			get_location() {
				this.$Common.getLocation(e => {
					let that = this;
					//获取经纬度
					this.longitude_const = e.longitude;
					this.latitude_const = e.latitude;
					let lat = [e.longitude, e.latitude];
					this.$Request
						.post(that.$api.msg.cityPosition, {
							user_id: that.user_id || '',
							// #ifdef APP-PLUS
							client_id: plus.device.uuid,
							// #endif
							cid: '',
							lat: lat
						})
						.then(res => {
							if (res.code == 1) {
								that.positionArea = res.data.city_name + res.data.name;
								this.city_id = res.data.id
							} else {
								that.$Common.toast('无法定位，请打开手机定位！！');
							}
						})
						.catch(err => {
							that.$Common.toast('无法定位，请打开手机定位！！');
						});
				});
			},
			addressConfirm(val) {
				//选择地址回调
				this.address = val.obj.province.label + '-' + val.obj.city.label + '-' + val.obj.area.label;
				this.$Request.post(this.$api.user.edit_user_info, {
					hometown: this.address
				}).then(res => {
					if (res.code == 1) {
						this.$Common.toast('区域已绑定，请选择身份');
						setTimeout(() => {
							uni.redirectTo({
								url: '../pagesauthen/choose_shenfen'
							});
						}, 200)
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			retur() {
				// #ifndef MP-WEIXIN
				uni.reLaunch({
					url: 'login'
				});
				// #endif

				// #ifdef MP-WEIXIN
				uni.reLaunch({
					url: '../pagessignup/wechat/wxlog'
				});
				// #endif

			}
		}
	}
</script>

<style lang="scss">
	.contain {
		width: 600upx;
		margin: auto;
	}

	.choose {
		margin-top: 260upx;
		letter-spacing: 2upx;
		margin-bottom: 40upx;
	}

	.item {
		letter-spacing: 2upx;

		.zhaopin {
			position: relative;

			image {
				width: 617rpx;
				height: 180rpx;
				margin-bottom: 45rpx;
			}
		}

		.work {
			position: relative;

			image {
				width: 617rpx;
				height: 185rpx;
				margin-bottom: 35rpx;
			}
		}

		.item_find {
			position: absolute;
			left: 9%;
			bottom: 40%;
		}
	}

	.btn {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;

		.btn_back {
			width: 750upx;
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			color: #666;
			font-size: 32upx;
			background: #F0F0F0;
		}
	}

	.line-gray {
		border: 1px solid #eee;
	}
</style>
