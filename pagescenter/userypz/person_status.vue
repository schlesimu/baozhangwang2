<template>
	<!-- 接单人状态 -->
	<view class="">
		<!-- 导航栏end -->
		<view class="">
			<view class=" flex justify-center">
				<view class="helpEnvelopes flex align-center plr15 justify-between"> {{personInfo.is_status_title||''}}</view>
			</view>
			<!-- 公司信息 -->
			<view class=" bg-white ptb20  plr15" @tap="godetail(personInfo.aid)">
				<view class="flex  align-center pb10" style="width: 100%;">
					<view class="shop_img" style="flex-shrink: 0;">
						<image :src="personInfo.head_img " mode="aspectFill" class=" mr10 "></image>
					</view>
					<view class="">{{personInfo.user_nickname||''}}</view>
				</view>
			</view>
			<view class=" plr15">
				<view class="flex align-center justify-between brb_e mb10 pb10" @tap="call_phone">
					<text class="">联系方式：{{personInfo.phone||''}}</text>
					<image :src="IMG_URL + 'static/miniwechat/new/phone_icon.png'" mode="aspectFill" style=";width: 40upx;height: 40upx;"></image>
				</view>
				<view class="flex align-center justify-between  pb10 brb_e" @tap="gomessage">
					<text>在线沟通</text>
					<text class=" text_666 cuIcon-servicefill " style="font-size: 21px;"></text>
				</view>
			</view>

			<!-- 底部操作按钮 -->
			<view class="handle_footer flex justify-around" v-if="personInfo.is_status==1">
				<view class="flex justify-around column alcenter sevirce_btn" @tap="refuse_cancel">
					<text class=" text-df ">(未完成)取消任务</text>
				</view>
				<view class="flex justify-center column alcenter btn apply_btn" @tap="complate">
					<view class="">已完成</view>
				</view>
			</view>
			<view class="handle_footer flex justify-around" v-if="personInfo.is_status==0">
				<view class="flex justify-around column alcenter sevirce_btn" @tap="refuse_cancel">
					<text class=" text-df ">取消接单</text>
				</view>
				<view class="flex justify-center column alcenter btn apply_btn" @tap="agree">
					<view class="">确认接单</view>
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
				title: '',
				aid: '',
				person_detail: '', //详情
				personInfo: '', //接单人信息
				user_id: '', //招聘者user_id
				topDistance: 0,
				status: '', //接单状态  0：待确认 1：发布人确认已确认 进行中 2：发布人点击完成任务   3：取消任务 接单人待确认，
				isopen: true, //跳转页面
				service_rules: '', //规则
				inviteinfo: '', //分享链接
				is_collection: 0, //是否收藏
				job_collect: false, //收藏职位
				person_page: true, //接单人详情
				userId: '', //接单人id
				IMG_URL:this.IMG_URL,
				covers: [{
					latitude: '',
					longitude: '',
					iconPath: '../static/images/iconPath.png',
					width: '30',
					height: '30'
				}]
			};
		},
		onLoad(e) {
			uni.showLoading({})
			this.title = e.name;
			this.aid = e.id;
			this.userId = e.user_id
			if (e.page == 'person') {
				this.person_page = false
			}
			this.$Common.getLocation(e => {
				//获取经纬度
				console.log(e);
				this.longitude = e.longitude;
				this.latitude = e.latitude;
				this.$nextTick(() => {
					this.get_detail();
				});
			});
		},
		methods: {
			gomessage() {
				//线上聊天
				let userInfo = uni.getStorageSync('USERINFO');
				if (userInfo.id == this.personInfo.user_id) {
					this.$Common.toast('此职位为自己发布职位，不可沟通');
				} else {
					if (this.isopen == false) {
						return;
					}
					this.isopen = false;
					setTimeout(() => {
						this.isopen = true;
					}, 3000);
					uni.$emit('jump', {})
					uni.navigateTo({
						url: '/pagesmessage/userMsg?kfid=' + this.personInfo.user_id + '&userName=' + this.personInfo.user_nickname,
						animationDuration: 300
					});
				}
			},
			// 拨打电话
			call_phone() {
				let userInfo = uni.getStorageSync('USERINFO');
				if (userInfo.id == this.personInfo.user_id) {
					this.$Common.toast('此职位为自己发布职位，不可沟通');
				} else {
					uni.makePhoneCall({
						phoneNumber: this.personInfo.phone //仅为示例
					});
				}

			},
			// 取消订单
			refuse_cancel(item) {
				let that = this
				uni.showModal({
					title: '确认取消吗?',
					success: function(res) {
						if (res.confirm) {
							that.status = 1
							// that.aid=item.aid
							that.userid = item.user_id
							that.cancel = 1
							that.setStatus()
						}
					}
				})

			},
			complate(item) { //完成
				console.log(item);
				this.status = 1
				// this.aid=item.aid
				this.userid = item.user_id
				// this.cancel = 1
				this.setStatus()
			},
			agree() { //同意接单
				this.status = 0
				this.setStatus()
			},
			setStatus() { //set_part_status
				this.$Request
					.post(this.$api.user.set_part_status, {
						aid: this.aid,
						type: 1, //发布人
						is_status: this.status,
						userid: this.userId, //接单人id
						cancel: this.cancel || '',
					})
					.then(res => {
						console.log('订单数据', res.data);
						if (res.code == 1) {
							uni.$emit('update_status', {})
							setTimeout(() => {
								uni.navigateBack({})
							})
						} else {
							console.log(res.msg);
							// this.
						}
					})
			},

			copy(body) {
				//复制文字到剪切板
				uni.setClipboardData({
					data: body,
					success: function() {
						this.$Common.toast('复制成功');
					}
				});
			},
			choose_location() {
				//详细地址放大地图
				console.log(this.plant_detail.lon);
				let that = this;
				uni.openLocation({
					latitude: Number(that.plant_detail.lat),
					longitude: Number(that.plant_detail.lon),
					name: that.plant_detail.address,
					// address: that.plant_detail.address,
					success: function(res) {
						console.log('地图', res);
					},
					fail(res) {
						console.log(res);
					}
				});
			},
			// 获取岗位详情
			get_detail() {
				this.$Request
					.post(this.$api.user.person_detail, {
						aid: this.aid,
						user_id: this.userId,
					})
					.then(res => {
						console.log(res.data, '获得职位详情');
						uni.hideLoading()
						if (res.code == 1) {
							this.personInfo = res.data;
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
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
			godetail(aid) {
				//跳转公司信息
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 3000);
				uni.navigateTo({
					url: 'job_detail?id=' + aid + '&lon=' + this.plant_detail.lon + '&lat=' + this.plant_detail.lat + '&follow=' +
						this.is_collection
				});
			},
			// 申请参保/报名
			apply_job() {
				uni.navigateTo({
					url: 'verification'
				})
			},
			colloct_job() { //收藏职位
				this.job_collect = !this.job_collect
			},
			back() {
				uni.navigateBack();
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
			goPay() {
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				this.$Request.post(this.$api.common.singupPlay, {
					company_id: this.plant_detail.company_id,
					job_position_id: this.plant_detail.aid
				}).then(res => {
					console.log(res, '');
					if (res.code == 1) {
						uni.navigateTo({
							url: '../../pagescenter/zhaopinzhe/fabu?price=' + this.plant_detail.user_money + '&order_sn=' + res.data.order_sn
						});
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			helpEdd() { //助力加薪
				this.$refs.addPop.open()
			},
			getagreement() {
				//获取协议  保证金规则
				this.$Request.post(this.$api.common.agreenment).then(res => {
					console.log(res, '');
					if (res.code == 1) {
						this.service_rules = res.data.service_rules;
					}
				});
			},

			toPage() {
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.navigateTo({
					url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video||""
				});
				// const userInfo = uni.getStorageSync('USERINFO');
				// if (this.isopen == false) {
				// 	return;
				// }
				// this.isopen = false;
				// setTimeout(() => {
				// 	this.isopen = true;
				// }, 1500);
				// if (!userInfo) {
				// 	// #ifndef MP-WEIXIN
				// 	uni.navigateTo({
				// 		url: '../login/login'
				// 	});
				// 	// #endif

				// 	// #ifdef MP-WEIXIN
				// 	uni.navigateTo({
				// 		url: '/pagessignup/wechat/wxlog'
				// 	});
				// 	// #endif
				// } else {
				// 	uni.navigateTo({
				// 		url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video
				// 	});
				// }
			}
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
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
		height: 150rpx;
		padding-top: 30upx;

		view {
			width: 307upx;
			height: 78upx;
			line-height: 78upx;
			text-align: center;
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
