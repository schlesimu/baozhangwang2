<template>
	<!-- 接单人状态 -->
	<view class="brt_e">
		<!-- 导航栏end -->
		<view class="">
			<!-- 公司信息 -->
			<view class=" bg-white ptb15  plr15">
				<view class="flex  align-center " style="width: 100%;">
					<view class="shop_img" style="flex-shrink: 0;">
						<image :src="personInfo.head_img " mode="aspectFill" class=" mr10 "></image>
					</view>
					<view class="text-bold text-black">{{personInfo.agent_name||''}}</view>
				</view>
			</view>
			<view class="plr15  " >
				<view class="pb5 text-bold f30">经纪人地址：</view>
				<view class="pb5 f28">
					{{personInfo.province||''}}-{{personInfo.city||''}}-{{personInfo.district||''}}
				</view>
				<view class="pb5 text-bold f30 pt10" v-if="personInfo.address" >详细地址：</view>
				<view class="txt-theme" @tap='choose_location' v-if="personInfo.address" >{{personInfo.address||''}}</view>
			</view>
			<view class="plr15 pt10" v-if="personInfo.content">
				<view class="pb5 text-bold f30">经纪人服务内容：</view>
				<!-- #ifndef MP-WEIXIN -->
				<rich-text class="f28" :nodes="personInfo.content"></rich-text>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="f28">
					<jyf-parser :html='personInfo.content'></jyf-parser>
				</view>
				<!-- #endif -->
			</view>
			<view class="bg-f2f3 mt10"></view>
			<view class=" plr15 padding-top pb100" >
				<view class="flex align-center justify-between brb_e mb10 pb10">
					<text class="">联系方式：{{(personInfo.phone||'').replace(/(\d{4})\d{3}(\d{4})/, '$1****$2')}}</text>
					<image :src="IMG_URL + 'static/miniwechat/new/phone_icon.png'" mode="aspectFill"
						style=";width: 40upx;height: 40upx;" @tap="call_phone"></image>
				</view>
				<view class="flex align-center justify-between brb_e mb10 pb10" v-if="showWechat">
					<text class="">微信号：{{(personInfo.wx||'').replace(/[\W\d\w]/g, '*')}}</text>
					<text class="cuIcon-copy f40" @tap='copy(personInfo.wx)'></text>
				</view>
				<view class="flex align-center justify-between  pb10 brb_e">
					<text>在线沟通</text>
					<text class=" text_666 cuIcon-servicefill " style="font-size: 21px;" @tap="gomessage"></text>
				</view>
		
			</view>

			<!-- 底部操作按钮 -->
			<view class="handle_footer flex justify-around" v-if="personInfo.is_signup==0">
				<view class="flex justify-center column alcenter btn apply_btn" @tap="goSign_up()">
					<view class="">报名</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				dotStyle: true,
				StatusBar: this.StatusBar,
				IMG_URL:this.IMG_URL,
				title: '',
				aid: '',
				person_detail: '', //详情
				personInfo: '', //经济人信息
				user_id: '', //招聘者user_id
				topDistance: 0,
				status: '', //接单状态  0：待确认 1：发布人确认已确认 进行中 2：发布人点击完成任务   3：取消任务 接单人待确认，
				isopen: true, //跳转页面
				service_rules: '', //规则
				inviteinfo: '', //分享链接
				is_collection: 0, //是否收藏
				job_collect: false, //收藏职位
				lon: '', //经度
				lat: '', //纬度
				showWechat: false, // 显示微信
			};
		},
		onLoad(e) {
			uni.showLoading({})
			this.id = e.id;
			this.lon = Number(e.lon);
			this.lat = Number(e.lat);
			this.get_detail();
			this.showWechat = !!uni.getStorageSync('is_contact');
		},
		methods: {
			gomessage() {
				//线上聊天
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('登录后才能操作哦')
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				uni.$emit('jump', {})
				uni.navigateTo({
					url: '/pagesmessage/userMsg?kfid=' + this.personInfo.user_id + '&userName=' + this
						.personInfo.agent_name,
					animationDuration: 300
				});

			},
			// 拨打电话
			call_phone() {
				let userInfo = uni.getStorageSync('USERINFO');
				uni.makePhoneCall({
					phoneNumber: this.personInfo.phone
				});
			},
			// 获取经纪人详情
			get_detail() { //set_part_status
				this.$Request.post(this.$api.job.brokerDetail, {
						userid: this.id, //经纪人id
						user_id: uni.getStorageSync('USERINFO').id || 0, //登录者id
						lon: this.lon,
						lat: this.lat
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.personInfo = res.data

						} else {
							this.$Common.toast('网络错误，请重试');
						}
					}).catch(err => {
						this.$Common.toast('网络错误，请重试');
					})
			},
			//复制微信号
			copy(body) {
				let that = this;
				uni.setClipboardData({
					data: body,
					success: function() {
						that.$Common.toast('复制成功');
					}
				});
			},
			goComplant() { //投诉
				uni.navigateTo({
					url: '../complaint'
				})
			},
			get_shareUrl() {
				//获取分享链接
				this.$Request.post(this.$api.user.get_invite).then(res => {
					console.log(res.data, '分享链接');
					if (res.code == 1) {
						this.inviteinfo = res.data;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});
			},
			// 去报名
			goSign_up() {
				if (!uni.getStorageSync('userToken')) {
					this.$Common.toast('登录后才能操作哦')
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				uni.redirectTo({
					url: 'signUp_morker?id=' + this.personInfo.user_id
				});
			},
			//详细地址放大地图 导航
			choose_location() {
				let that = this;
				uni.openLocation({
					latitude: Number(that.personInfo.lat),
					longitude: Number(that.personInfo.lon),
					name: that.personInfo.address,
					// address: that.plant_detail.address,
					success: function(res) {
						// console.log('地图', res);
					},
					fail(res) {
						this.$Common.toast('网络错误，请稍后重试');
					}
				});
			},
			follow() {
				//收藏
				this.$Request
					.post(this.$api.company.set_collection, {
						collect_id: this.companyInfo.aid,
						type: 1
					})
					.then(res => {
						console.log(res, '');
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						if (res.code == 1) {
							this.is_collection = res.data.is_collection;
						} else {}
					});
			},
			share() {
				//分享
				this.$refs.shareType.open();
			},
			close() {
				this.$refs.shareType.close();
			},
		}
	};
</script>
<style lang="scss">
	.mapImg {
		width: 334rpx;
		height: 188rpx;
	}

	.bg_theme {
		background: #50aeff;
	}

	.topBar {
		position: fixed;
		top: 0;
		z-index: 9950;
		width: 100%;
	}

	.helpEnvelopes {
		width: 100%;
		height: 130upx;
		background-color: #1B90FF;
		color: #FFFFFF;


		image {
			width: 38upx;
			height: 38upx;
		}
	}

	.line_center {
		width: 2upx;
		height: 26upx;
		background: #999999;
	}

	.video_image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 10;
	}

	.play_tag {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 80upx;
		height: 80upx;
		right: 0;
		margin: auto;
		z-index: 100;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.theme_tag {
		width: 120rpx;
		height: 64rpx;
		background: rgba(80, 174, 255, 1);
		opacity: 1;
		border-radius: 32rpx;
	}

	.shop_img {
		width: 96rpx;
		background-color: #f7f7f7;
		margin-right: 16upx;
		height: 96rpx;
		border-radius: 50%;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.bom_item {
		background-color: #F4F5F7;
		width: 100%;
		height: 68upx;
	}

	.returnBox {
		min-width: 97rpx;
		height: 87rpx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid #cccccc;
		opacity: 1;
		border-radius: 4rpx;
		box-sizing: border-box;

		.top_blue {
			height: 50%;
			background-color: #50aeff;
			margin-top: -3upx;
			color: #ffffff;
			width: 100%;
		}
	}

	page {
		background: #fff;
	}

	.like_select {
		color: #ff9e3e;
	}

	.hotImg {
		width: 32rpx;
		height: 40rpx;
	}

	.station_img {
		width: 128rpx;
		height: 128rpx;
	}

	.plant_top {
		border-radius: 12rpx;
		border: 1px solid #ff9e3e;
		height: 176rpx;
		margin-top: 20rpx;
	}

	.left_tody {
		margin-right: 50rpx;
		width: 80rpx;
		height: 100%;
		background: #ff9e3e;
		/* border-radius: 12rpx; */
	}

	.label_item {
		margin-top: 10rpx;
		margin-left: 0;
		margin-right: 10rpx;
		background-color: #50aeff !important;
		color: #ffffff;
	}

	.money {
		line-height: 80rpx;
		color: #f77858;
		font-weight: 800;
	}

	.location {
		position: relative;
		z-index: 99;
	}

	// .location::after{
	// 	content:"";
	// 	position: absolute;
	// 	left: 0;
	// 	bottom: 10rpx;
	// 	width:126rpx;
	// 	height:8rpx;
	// 	background:rgba(255,158,62,1);
	// 	z-index: -2;
	// }
	.share {
		width: 38upx;
		height: 38upx;
	}

	.pictype {
		image {
			width: 88upx;
			height: 88upx;
		}
	}

	.baozhang {
		background-color: #ffffff;
		font-size: 30upx;
		border-radius: 16upx;

		.btn_canbao {
			text-align: center;
			width: 320upx;
			height: 72upx;
			line-height: 2.2;
			border-radius: 100upx;
			color: #ffffff;
			background-color: #1b90ff;
			margin-top: 20upx;
		}
	}

	.icon_x {
		position: absolute;
		right: 40upx;
		top: 2upx;
	}

	.handle_footer {
		z-index: 99;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		height: 150rpx;
		padding-top: 30upx;

		view {
			width: 686upx;
			height: 78upx;
			line-height: 78upx;
			text-align: center;
			border-radius: 39upx;
		}

		.sevirce_btn {
			background: #FFFFFF;
			border: 1px solid #EEEEEE;
			color: #666;
		}

		.btn {
			background-color: #1B90FF;
			color: #FFFFFF;
		}
	}
</style>
