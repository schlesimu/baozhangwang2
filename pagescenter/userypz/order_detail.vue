<template>
	<view class="">
		<!-- 导航栏end -->
		<view class="pb50">
			<view class="topBox">
				<!-- 导航栏 -->
				<!-- #ifdef APP-PLUS -->
				<view class="flex align-center bg-white justify-between plr15 topBar ptb10 " :style="[{ paddingTop: StatusBar + 'px',height:CustomBar+'px' }]">
					<view class=""><text class="cuIcon-back " @click.stop="backPage"></text></view>
					<view>详情</view>
					<view class="">
						<view class="share">
							<image class="share" :src="IMG_URL + 'static/miniwechat/new/share_black.png'" mode="aspectFill" @tap="share"></image>
						</view>
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view class="" :style="[{ marginTop: CustomBar + 'px' }]">
					<!-- #endif -->
					<!-- #ifndef APP-PLUS -->
					<view class="">
						<!-- #endif -->
						<!-- banner图 -->
						<view class=" flex justify-center banner">
							<view class="" v-if="person_page">
								<view class="helpEnvelopes flex align-center plr15 justify-between"> {{order_detail.is_status_name}}</view>
								<!-- <view class="helpEnvelopes flex align-center plr15 justify-between" v-if="order_detail.part_status==0">待确认</view>
						<view class="helpEnvelopes flex align-center plr15 justify-between" v-if="order_detail.part_status==3">已取消</view>
						<view class="helpEnvelopes flex align-center plr15 justify-between" v-if="order_detail.part_status==2">已完成</view> -->
							</view>
							<!-- banner图 -->
							<swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :indicator-dots="true" :circular="false"
							 :autoplay="false" interval="5000" duration="500" style="width: 100%;height: 700upx; background-color: #F7F7F7;">
								<swiper-item v-if="order_detail.video != '' && order_detail.video_img != null" @tap="toPage()">
									<view class="flex alcenter justify-center" style="position: relative;height: 700upx;">
										<image :src="order_detail.video_img" mode="aspectFill" class="video_image"></image>
										<view class="play_tag flex justify-center alcenter">
											<!-- <text class="f64  cuIcon-playfill"></text> -->
											<image class="" :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill"></image>
										</view>
									</view>
								</swiper-item>
								<swiper-item v-for="(item, index) in order_detail.img_urls" @tap='yulan(item,index)' :key="index" style="height: 700rpx;">
									<image :src="item || IMG_URL + 'static/miniwechat/toppic.png'" mode="aspectFill"></image>
								</swiper-item>

								<!-- <swiper-item style="height: 500rpx;"><image :src="IMG_URL+'static/miniwechat/toppic.png'" mode="aspectFill"></image></swiper-item> -->
							</swiper>

						</view>
					</view>
				</view>
				<!-- 招聘信息 -->
				<view class="brb_e pb20 flex column plr10 mt10">
					<view class="flex between align-center">
						<view class="mr5">
							<view class="f40 gray3 bold ewrap">{{ order_detail.title || '----' }}</view>
						</view>
						<view class=" f28 money flex_shrink" style="color:#F77858" v-if="person_page">劳务报酬{{order_detail.commission}}元</view>
					</view>
					<view class="f28" style="color: #6B6E77;">{{order_detail.type_name}}</view>
				</view>
				<!-- end -->
				<view class="line_cut" v-if="order_detail.type==2"></view>
				<!-- 地图 -->
				<view class="mt20  plr10" v-if="order_detail.type==2">
					<view class="location gray3 bold text-lg mb5">工作地址</view>
					<view class="flex  justify-between">
						<text class="gray6 	text-df">详细地址：{{ order_detail.address+order_detail.district || '暂无详细地址' }}</text>
						<view class="mb10 ml10" @tap="choose_location">
							<image :src="IMG_URL + 'static/miniwechat/map.png'" mode="aspectFill" class="mapImg"></image>
						</view>
					</view>
				</view>
				<!-- end -->
				<view class="line_cut" v-if="person_page"></view>
				<!-- 公司信息 -->
				<view class=" bg-white ptb10 radius-20 plr15">
					<view class="flex  justify-between align-center pb10" style="width: 100%;">
						<view class="flex align-center">
							<view class="shop_img" style="flex-shrink: 0;">
								<image :src="order_detail.head_img " mode="aspectFill" class=" mr10 "></image>
							</view>
							<view class="">{{order_detail.user_nickname}}</view>
						</view>
						<!-- <view class="">{{order_detail.user_nickname}}</view> -->
					</view>
					<view class="">
						<view class="mtb10 text-lg bold gray3" v-if="person_page">
							兼职类型
						</view>
						<view class="flex   align-center pb10">
							<text class="f28 text-666" style='width:20%'>结算方式</text>
							<text class="f28 text-666">{{order_detail.settlement_method_name}}</text>
						</view>
						<view class="" v-if="!person_page">
							<view class="flex   align-center pb10">
								<text class="f28 text-666" style='width:20%'>工作时长</text>
								<text class="f28 text-666">{{order_detail.service_time}}</text>
							</view>
							<view class="flex   align-center pb10">
								<text class="f28 text-666" style='width:20%'>接单人数</text>
								<text class="f28 text-666">{{order_detail.nums}}</text>
							</view>
							<view class="flex   align-center pb10">
								<text class="f28 text-666" style='width:20%'>年龄要求</text>
								<text class="f28 text-666">{{order_detail.age}}</text>
							</view>
							<view class="flex   align-center pb10">
								<text class="f28 text-666" style='width:20%'>联系电话</text>
								<text class="f28 text-666">{{order_detail.phone}}</text>
							</view>
						</view>


					</view>
				</view>
				<!-- 职位描述 -->
				<view class="mt10  pb10 plr15">
					<view class="location gray3 bold text-lg">工作内容</view>
					<view class="gray6 text-df flex column lh30 mt10 ewrap">
						{{order_detail.content}}
					</view>
				</view>
				<!-- end -->
				<view class="plr15 pb20 brb_e">
					<view class="pb10">备注</view>
					<view class="f28 gray6 flex align-center ">
						<view class="f28 ewrap">
							{{order_detail.remarks}}
						</view>
					</view>
				</view>
				<view class="flex align-center justify-around" v-if="person_page">
					<view class="flex align-center justify-center" style="width: 50%;height: 37upx;" @tap="gomessage">
						<text class=" text_666 cuIcon-servicefill mr10" style="font-size: 21px;"></text>
						<text>在线沟通</text>
					</view>
					<view class="line_center"></view>
					<view class="flex align-center justify-center" style="width: 50%;height: 100upx;line-height: 100upx;" @tap="call_phone">
						<image :src="IMG_URL + 'static/miniwechat/new/phone_icon.png'" mode="aspectFill" style=";width: 40upx;height: 40upx;"></image>
						<text class="ml10">电话沟通</text>
					</view>
				</view>
				<view class="  " style="padding-bottom: 150upx;" v-if="person_page">
					<view class="bom_item flex align-center justify-between plr10" @tap='goComplant'>
						<view class="new_theme f28">投诉举报</view>
						<image style="width: 12upx;height: 24upx;" :src="IMG_URL + 'static/miniwechat/new/detail_icon3.png'" mode=""></image>
					</view>
					<view class=" f22 ptb10 plr10 txt-theme">
						保障网向您承诺所有职位不向您收费，如遇变相收费，薪资不实、工资拖欠、人身攻击、色情骚扰、虚假职位等。请立即投诉举报。电话️
						<text class="txt-theme pl5" @tap="call('400—6765—006')"> 400—6765—006</text>
					</view>
				</view>

				<!-- 底部操作按钮 -->
				<view class="" v-if="person_page">
					<view class="handle_footer flex justify-around" v-if="order_detail.is_status==3">
						<view class="flex justify-around column alcenter sevirce_btn" @tap="refuse_cancel">
							<text class=" text-df ">拒绝取消</text>
						</view>
						<view class="flex justify-center column alcenter btn apply_btn" @tap="confirm_cancel">
							<view class="">确认取消</view>
						</view>
					</view>
				</view>

			</view>
			<view class="fixed flex align-center" v-if="pageType!='order'">
				<view class="edit" @tap="editPost">编辑</view>
				<view class="open" @tap="del_part">删除</view>
			</view>
			<uni-popup type="bottom" ref="shareType">
			<view class="bg-white ptb20" style="border-radius: 20upx 20upx 0 0;">
				<view class="text-bold text-md text-center mb30 posRelt">
					分享
					<view class="icon_x" @tap="close">X</view>
				</view>
				<view class="flex justify-around align-center">
					<view class="pictype" @tap="wefriend">
						<image :src="IMG_URL + 'static/miniwechat/weixin.png'" mode="aspectFill"></image>
						<view class="text-df">微信好友</view>
					</view>
					<view class="pictype" @tap="wecircle">
						<image :src="IMG_URL + 'static/miniwechat/pengyouquan.png'" mode="aspectFill"></image>
						<view class="text-df">朋友圈</view>
					</view>
				</view>
			</view>
		</uni-popup>

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
				like: false, //收藏按钮
				aid: '',
				longitude: '', //经度
				latitude: '', //纬度
				order_detail: '', //详情信息
				companyInfo: '', //公司信息
				user_id: '', //招聘者user_id
				topDistance: 0,
				isopen: true, //跳转页面
				service_rules: '', //规则
				inviteinfo: '', //分享链接
				is_collection: 0, //是否收藏
				job_collect: false, //收藏职位
				person_page: true, //接单人详情
				userId: '', //发布任务的人的id
				type: 3, //3 接单详情 1我发布的兼职任务兼职详情
				status: '', //拒绝、确认取消接单
				covers: [{
					latitude: '',
					longitude: '',
					iconPath: '../static/images/iconPath.png',
					width: '30',
					height: '30'
				}],
				pageType: '', //我的接单进入不展示编辑
				userInfo: uni.getStorageSync('USERINFO'),
			};
		},
		onLoad(e) {
			uni.showLoading({})
			this.aid = e.id;
			this.userId = e.uid
			this.pageType = e.pageType
			if (e.page == 'person') {
				this.person_page = false
				this.type = 1
			}
			this.get_detail();
			uni.$on('updateOrderDetail', (data) => {
				// 编辑网约工更新详情
				this.get_detail();
			})
			this.userInfo = uni.getStorageSync('USERINFO');
		},
		onShow() {
			this.$refs.shareType&&this.$refs.shareType.close();
		},
		onPageScroll(e) {
			// console.log(e,'滑动');
			this.topDistance = e.scrollTop;
		},
		// 微信小程序右上角分享
		onShareAppMessage() {
			let title = this.title;
			let imageUrl = '/static/images/logo.png';
			let path = 'pagescenter/userypz/order_detail?page=person&id=' + this.aid + '&uid=' + this.user_id;
			return {
				title,
				imageUrl,
				query: path
			};
		},
		// 转发至朋友圈
		onShareTimeline() {
			let title = this.title;
			let imageUrl = '/static/images/logo.png';
			let path = 'pagescenter/userypz/order_detail?page=person&id=' + this.aid + '&uid=' + this.user_id;
			return {
				title,
				imageUrl,
				query: path
			};
		},
		onUnload() {
			uni.$off('updateOrderDetail')
		},
		methods: {
			gomessage() {
				//线上聊天
				if (this.userInfo.id == this.order_detail.user_id) {
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
						url: '/pagesmessage/userMsg?kfid=' + this.order_detail.user_id + '&userName=' + this.order_detail.user_nickname,
						animationDuration: 300
					});
				}
			},
			// 拨打电话
			call_phone() {
				if (this.userInfo.id == this.order_detail.user_id) {
					this.$Common.toast('此职位为自己发布职位，不可沟通');
				} else {
					uni.makePhoneCall({
						phoneNumber: this.order_detail.phone
					});
				}

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
				let that = this;
				uni.openLocation({
					latitude: Number(that.order_detail.lat),
					longitude: Number(that.order_detail.lon),
					name: that.order_detail.address,
					// address: that.plant_detail.address,
					success: function(res) {
						// console.log('地图', res);
					},
					fail(res) {
						console.log(res);
					}
				});
			},
			// 获取岗位详情
			get_detail() {
				let that = this
				this.$Request
					.post(this.$api.user.part_job_detail, {
						aid: that.aid,
						user_id: that.userInfo.id || 0, //发布者id
						type: that.type
					})
					.then(res => {
						if (res.code == 1) {
							uni.hideLoading()
							that.order_detail = res.data;
							that.get_shareUrl();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
			refuse_cancel() { //拒绝取消
				this.status = 3
				this.cancel = 2
				this.setOrder_status()
			},
			confirm_cancel() { //确认取消
				let that = this
				uni.showModal({
					title: '确认取消吗?',
					success: function(res) {
						if (res.confirm) {
							that.status = 3
							that.cancel = 1
							that.setOrder_status()
						}
					}
				})

			},
			goComplant() { //投诉
				uni.navigateTo({
					url: '../../pagesHome/complaint?job_id=' + this.aid
				})
			},
			setOrder_status() { //设置接单状态
				this.$Request
					.post(this.$api.user.set_part_status, {
						aid: this.aid,
						type: 2, //接单人
						is_status: this.status,
						userid: this.userId, //发布者id
						cancel: this.cancel || '',
					})
					.then(res => {
						console.log('订单数据', res.data);
						if (res.code == 1) {
							uni.$emit('update_status', {})
							setTimeout(() => {
								uni.navigateBack({

								})
							})
							// this.person_list = res.data;
						} else {
							this.$Common.toast(res.msg)
						}
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
			// 返回上一页
			backPage(){
				uni.navigateBack({})
			},
			// 申请参保/报名
			apply_job() {
				uni.navigateTo({
					url: 'verification'
				})
			},
			yulan(pic, index) {
				this.$Common.lookImg(this.order_detail.img_urls, index)
			},
			share() {
				//分享
				this.$refs.shareType.open();
			},
			close() {
				this.$refs.shareType.close();
			},

			editPost() { //编辑网约工
				uni.navigateTo({
					// url: '../pagescenter/zhaopinzhe/bianji_zhiwei?aid=' + this.aid
					url: './edit_part?aid=' + this.aid + '&other_user_id=' + this.order_detail.user_id
				});
			},
			del_part() { //删除  接口判断是否有人接单
				let that = this
				uni.showModal({
					title: '你确定要删除发布的兼职任务吗',
					success: function(res) {
						if (res.confirm) {
							uni.$emit('delPart', {})
							that.$Request.post(that.$api.company.delet_part, {
								aid: that.aid
							}).then(res => {
								if (res.code == 1) {
									that.$Common.toast('删除成功')
									setTimeout(() => {
										uni.navigateBack({})
									}, 500)
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									});
								}
							});
						} else if (res.cancel) {}
					}
				})
			},
			wefriend() {
				//分享微信好友					path: `pagesHome/index/plant_detail?id=${this.aid}`,
				// console.log(this.plant_detail.imgas_thumb+'?x-oss-process=style/compression');
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5,
					imageUrl: this.order_detail.imgas_thumb + '?x-oss-process=style/compression',
					title: this.order_detail.title + ' ' + this.order_detail.commission + '元',
					miniProgram: {
						id: 'gh_66b0749ac265',
						path: 'pagesHome/part_sort?id=' + this.aid + '&user_id=' + this.order_detail.user_id,
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			wecircle() {
				//分享微信朋友圈
				// console.log(this.order_detail.imgas_thumb+'?x-oss-process=style/compression');
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: 'https://app.chongdarenli.com/h5/#/pagesHome/part_sort?id=' + this.aid + '&user_id=' + this.order_detail.user_id,
					title: this.order_detail.title + ' ' + this.order_detail.commission + '元',
					summary: "我正在使用人民保障网，赶紧跟我一起来体验吧！",
					imageUrl: this.order_detail.imgas_thumb + '?x-oss-process=style/compression',
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
					}
				});
			},
			toPage() {
				const userInfo = uni.getStorageSync('USERINFO');
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				if (!userInfo) {
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../login/login'
					});
					// #endif

					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pagessignup/wechat/wxlog'
					});
					// #endif
				} else {
					uni.navigateTo({
						url: '../../pagescenter/zhaopinzhe/play_video?url=' + this.order_detail.video
					});
				}
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
		height: 104upx;
		background-color: #1B90FF;
		position: absolute;
		color: #FFFFFF;
		top: 0;
		z-index: 666;

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
		width: 106rpx;
		background-color: #f7f7f7;
		margin-right: 16upx;
		height: 106rpx;
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

	.banner {
		/* width: 100%; */
		height: 700rpx;
		position: relative;
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

	.fixed {
		position: fixed;
		bottom: 0;
		z-index: 99;
		left: 0;
		width: 100%;
		height: 100upx;
		font-size: 32upx;

		.edit {
			background-color: #e2f1ff;
			color: #1b90ff;
			width: 50%;
			text-align: center;
			line-height: 100upx;
		}

		.open {
			background-color: #1b90ff;
			color: #ffffff;
			text-align: center;
			line-height: 100upx;
			width: 50%;
		}
	}
</style>
