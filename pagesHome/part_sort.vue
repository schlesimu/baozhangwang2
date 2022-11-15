<template>
	<view class="">
		<!-- 导航栏end -->
		<view class="">
			<!-- 导航栏 -->
			<!-- #ifdef APP-PLUS -->
			<view class="flex align-center bg-white justify-between plr15 topBar ptb10 "
				:style="[{ paddingTop: StatusBar + 'px',height:CustomBar+'px' }]">
				<view class=""><text class="cuIcon-back " @click.stop="back"></text></view>
				<view>详情</view>
				<view class="">
					<view class="share">
						<image class="share" :src="IMG_URL + 'static/miniwechat/new/share_black.png'" mode="aspectFill"
							@tap="share"></image>
					</view>
				</view>
			</view>
			<!-- <view class="flex align-center justify-between plr20 topBar ptb10" :class="topDistance > 0 ? 'bg_theme' : ''"
			 :style="[{ paddingTop: StatusBar + 'px' }]">
				<view class=""><text class="cuIcon-back text-white" @click.stop="back"></text></view>
				<view>
					<view class="share">
						<image class="share" :src="IMG_URL + 'static/miniwechat/share.png'" mode="aspectFill" @tap="share"></image>
					</view>
				</view>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef APP-PLUS -->
			<view class="" :style="[{ marginTop: CustomBar + 'px' }]">
				<!-- #endif -->
				<!-- #ifndef APP-PLUS -->
				<view class="">
					<!-- #endif -->
					<!-- banner图 -->
					<view class=" flex justify-center banner">
						<!-- banner图 -->
						<swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'"
							:indicator-dots="true" :circular="false" :autoplay="false" interval="5000" duration="500"
							style="width: 100%;height: 700upx; background-color: #F7F7F7;">
							<swiper-item v-if="plant_detail.video != '' && plant_detail.video_img != null"
								@tap="toPage()">
								<view class="flex alcenter justify-center" style="position: relative;height: 700upx;">
									<image :src="plant_detail.video_img" mode="aspectFill" class="video_image"></image>
									<view class="play_tag flex justify-center alcenter">
										<!-- <text class="f64  cuIcon-playfill"></text> -->
										<image class="" :src="IMG_URL + 'static/miniwechat/play.png'" mode="aspectFill">
										</image>
									</view>
								</view>
							</swiper-item>
							<swiper-item v-for="(item, index) in plant_detail.img_urls" @tap='yulan(item,index)'
								:key="index" style="height: 700rpx;">
								<image :src="item || IMG_URL + 'static/miniwechat/toppic.png'" mode="aspectFill">
								</image>
							</swiper-item>

							<!-- <swiper-item style="height: 500rpx;"><image :src="IMG_URL+'static/miniwechat/toppic.png'" mode="aspectFill"></image></swiper-item> -->
						</swiper>
					</view>
				</view>
				<!-- 招聘信息 -->
				<view class="brb_e pb20 flex column plr10 mt20">
					<view class="flex between ">
						<view class="mr5">
							<view class="f40 gray3 bold ewrap">{{ plant_detail.title || '----' }}</view>
						</view>
						<view class=" f28 money flex_shrink" style="color:#F77858">劳务报酬{{plant_detail.commission||0}}元
						</view>
						<!-- 工价 -->
						<!-- <view class="returnBox flex column around  alcenter" style="flex-shrink: 0;">
						<text class="f28 top_blue tc">{{ plant_detail.fan_type || '无' }}</text>
						<text class="f28 normal_red ellipsis tc bold plr5" style="width: 100%;">{{ plant_detail.fan_price || 0 }}元</text>
					</view> -->
					</view>
					<view class="f28" style="color: #6B6E77;">{{plant_detail.type_name}}</view>
					<!-- <view class="flex alcenter between">
					<view class="normal_red text-lg money">{{ plant_detail.min_salary || '--' }}~{{ plant_detail.max_salary || '--' }}元/月</view>
					<view class="tc ellipsis" style="width: 160rpx;">
						<text class="text-df gray6  tc mt10">已报名 {{ plant_detail.apply_numbers || 0 }}人</text>
					</view>
				</view>
				<view class="text-sm gray6">
					<text class="cu-tag  label_item" v-for="(itm, index) in plant_detail.welfare" :key="index" v-if="plant_detail.welfare != ''">{{ itm.welfare_name }}</text>
					<text class="cu-tag  label_item" v-if="plant_detail.welfare == ''">暂无相关福利信息</text>
				</view> -->
				</view>
				<!-- end -->
				<view class="line_cut" v-if="plant_detail.type==2"></view>
				<!-- 地图 -->
				<view class="mt20  plr10" v-if="plant_detail.type==2">
					<view class="location gray3 bold text-lg mb5">工作地址</view>
					<!-- <view class="flex between mtb10">
					<text class="gray3 text-df bold">{{ plant_detail.city || '暂无地址' }}</text>
					<text class="gray9 text-sm ml5" style="flex-shrink: 0;">距离我{{ companyInfo.distance || '----' }}公里</text>
				</view> -->
					<view class="flex  justify-between">
						<text
							class="gray6 	text-df ewrap">详细地址：{{ plant_detail.address+plant_detail.district || '暂无详细地址' }}</text>
						<view class="mb10 ml10" @tap="choose_location">
							<!-- <map style="width: 334upx; height: 188rpx;" v-if="latitude" :latitude="latitude" :longitude="longitude" :markers="covers"></map> -->
							<image :src="IMG_URL + 'static/miniwechat/map.png'" mode="aspectFill" class="mapImg">
							</image>
						</view>
					</view>
				</view>
				<!-- end -->
				<view class="line_cut"></view>
				<!-- 公司信息 -->
				<view class=" bg-white ptb10 radius-20 plr15" @tap="godetail()">
					<view class="flex  justify-between align-center pb10" style="width: 100%;">
						<view class="flex align-center">
							<view class="shop_img" style="flex-shrink: 0;">
								<image :src="plant_detail.head_img " mode="aspectFill" class=" mr10 "></image>
							</view>
							<view class="">{{plant_detail.user_name||plant_detail.user_nickname}}</view>
						</view>
						<!-- <view class="">{{plant_detail.user_name||plant_detail.user_nickname}}</view> -->
					</view>
					<view class="">
						<view class="flex   align-center pb10">
							<text class="f28 text-666" style="width: 20%;">结算方式</text>
							<text class="f28 text-666">{{plant_detail.settlement_method_name}}</text>
						</view>
						<view class="flex   align-center pb10">
							<text class="f28 text-666" style="width: 20%;">工作时长</text>
							<text class="f28 text-666">{{plant_detail.service_time}}</text>
						</view>
						<view class="flex   align-center pb10">
							<text class="f28 text-666" style="width: 20%;">接单人数</text>
							<text class="f28 text-666">{{plant_detail.num}}</text>
						</view>
						<view class="flex   align-center pb10">
							<text class="f28 text-666" style="width: 20%;">年龄要求</text>
							<text class="f28 text-666">{{plant_detail.age}}</text>
						</view>
						<view class="flex   align-center pb10">
							<text class="f28 text-666" style="width: 20%;">性别要求</text>
							<text class="f28 text-666">{{plant_detail.sex_name}}</text>
						</view>
						<view class="flex   align-center pb10">
							<text class="f28 text-666" style="width: 20%;">联系电话</text>
							<text class="f28 text-666" @tap='call_phone'>{{((plant_detail.phone && plant_detail.phone) || "").replace(/(\d{4})\d{3}(\d{4})/, '$1****$2')}}</text>
						</view>

					</view>
				</view>
				<!-- 职位描述 -->
				<view class="mt10  pb10 plr15" v-if="plant_detail.describe!=''">
					<view class="location gray3 bold text-lg">工作内容</view>
					<!-- @tap='copy(plant_detail.describe)' -->
					<!-- selectable='true' -->
					<view class="gray6 text-df flex column lh30 mt10 ewrap">{{plant_detail.content}}</view>

				</view>


				<!-- end -->
				<view class="plr15 pb20">
					<view class="pb10">备注</view>
					<view class="f28 mb10 ewrap" style="color: #666;">{{plant_detail.remarks}}</view>
					<view class="f28 text-gray">
						请仔细阅读 <text class="" style="color: #1B90FF;" @tap='goRule'>《接单协议》</text>
					</view>
				</view>
				<!-- #ifndef H5 -->
				<view class=" pb45  ">
					<view class="bom_item flex align-center justify-between plr10" @tap='goComplant'>
						<view class="new_theme f28">投诉举报</view>
						<image style="width: 12upx;height: 24upx;"
							:src="IMG_URL + 'static/miniwechat/new/detail_icon3.png'" mode=""></image>
					</view>
					<view class=" f22 ptb10 plr10 txt-theme">
						保障网向您承诺所有职位不向您收费，如遇变相收费，薪资不实、工资拖欠、人身攻击、色情骚扰、虚假职位等。请立即投诉举报。电话️
						<text class="txt-theme pl5" @tap="call('400—6765—006')"> 400—6765—006</text>
					</view>
				</view>

				<!-- 底部操作按钮 -->
				<view class="handle_footer flex">
					<view class="flex justify-around column alcenter sevirce_btn" @tap="gomessage">
						<text class=" text-gray cuIcon-servicefill"
							style="font-size: 21px;width: 42upx;height: 44upx;"></text>
						<text class=" text-df ">线上客服</text>
					</view>
					<view class="flex justify-around column alcenter sevirce_btn" @tap="colloct_job">
						<text class=" text-gray cuIcon-favor" v-if="is_collection==0"
							style="font-size: 21px;width: 42upx;height: 44upx;"></text>
						<text class=" text-gray cuIcon-favorfill new_theme" v-if="is_collection==1"
							style="font-size: 21px;width: 42upx;height: 44upx;"></text>
						<text class=" text-df ">收藏</text>
					</view>
					<view class="flex justify-center alcenter btn phone_btn" @tap="call_phone">
						<!-- <image src="../../static/images/index/phone.png" class="mr5" mode="widthFix" ></image> -->
						<text>电话沟通</text>
					</view>
					<view class="flex justify-center column alcenter btn apply_btn" @tap="apply_job">
						<view class="">{{plant_detail.is_apply==0?'验证接单':'已接单'}}</view>
						<!-- <text>{{ plant_detail.user_money || 0 }}元</text>
					<text>工资保障服务金</text> -->
					</view>
				</view>
				<!-- #endif -->
			</view>
			<!-- #ifdef H5 -->
			<view class="box_h5 bg-theme text-white f28" @tap='goDownLoad'>
				去下载APP
			</view>
			<!-- #endif -->
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
				title: '',
				like: false, //收藏按钮
				aid: '',
				longitude: '', //经度
				latitude: '', //纬度
				plant_detail: '', //详情
				IMG_URL:this.IMG_URL,
				companyInfo: '', //公司信息
				user_id: '', //招聘者user_id
				topDistance: 0,
				isopen: true, //跳转页面
				service_rules: '', //规则
				inviteinfo: '', //分享链接
				is_collection: 0, //是否收藏
				other_user_id: '', //发布兼职任务的人的uid
				job_collect: false, //收藏职位
				is_full: 0, //单是否接满
				covers: [{
					latitude: '',
					longitude: '',
					iconPath: '../static/images/iconPath.png',
					width: '30',
					height: '30'
				}],
				pageOpen: '', //是否从引导页跳过来的
				type:'',//兼职任务类型 1：网上兼职 2：本地兼职
			};
		},
		onLoad(e) {
			uni.showLoading({})
			this.title = e.name;
			this.aid = e.id;
			this.other_user_id = e.user_id
			this.is_full = e.is_full
			this.type = e.type
			this.pageOpen = e.page
			this.$Common.getLocation(e => {
				//获取经纬度
				this.longitude = e.longitude;
				this.latitude = e.latitude;
				this.$nextTick(() => {
					this.get_detail();
				});
			});

			uni.$on('verification', () => { //验证成功刷新
				this.get_detail();
			});
		},
		onShow() {
			this.$refs.shareType && this.$refs.shareType.close();
		},
		onUnload() {
			uni.$off('verification')
		},
		onPageScroll(e) {
			// console.log(e,'滑动');
			this.topDistance = e.scrollTop;
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
			}
			return {
				title: this.plant_detail.title + ' ' + this.plant_detail.commission + '元',
				path: 'pagesHome/part_sort?id=' + this.aid + '&user_id=' + this.other_user_id + ''
			}
		},
		// 转发至朋友圈
		onShareTimeline() {
			let title = this.plant_detail.title + ' ' + this.plant_detail.commission + '元';
			let imageUrl = '/static/images/logo.png';
			let path = 'id=' + this.aid + '&user_id=' + this.other_user_id + '';
			return {
				title,
				imageUrl,
				query: path
			};
		},
		methods: {
			gomessage() {
				//线上聊天
				let userInfo = uni.getStorageSync('USERINFO');
				if (userInfo.id == this.plant_detail.user_id) {
					this.$Common.toast('此职位为自己发布的任务，不可沟通');
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
						url: '../pagesmessage/userMsg?kfid=' + this.other_user_id + '&userName=' + this
							.plant_detail.user_nickname,
						animationDuration: 300
					});
				}
			},
			// 拨打电话
			call_phone() {
				let userInfo = uni.getStorageSync('USERINFO');
				if (userInfo.id == this.plant_detail.user_id) {
					this.$Common.toast('此职位为自己发布职位，不可沟通');
				} else {
					uni.makePhoneCall({
						phoneNumber: this.plant_detail.phone //仅为示例
					});
				}

			},
			goRule() { //接单规则
				uni.navigateTo({
					url: 'get_order_rule'
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
						this.$Common.toast('网络错误，请稍后重试');
					}
				});
			},
			goDownLoad() { //跳转下载页
				// var tempwindow = window.open('_blank');
				// tempwindow.location = this.inviteinfo.invite_url;
				window.location.href = this.inviteinfo.invite_url;
			},
			// 获取岗位详情
			get_detail() {
				this.$Request
					.post(this.$api.operation.part_job_detail, {
						aid: this.aid, //兼职网约工详情id
						// #ifndef H5
						user_id: uni.getStorageSync('USERINFO').id || 0, //发布兼职任务的用户id,
						// #endif
						// #ifdef H5
						user_id: this.other_user_id,
						// #endif
						type: 2, //1：个人中心 2：首页详情 3：我的接单详情页
					})
					.then(res => {
						if (res.code == 1) {
							console.log(res.data);
							uni.hideLoading()
							this.plant_detail = res.data;

							// this.companyInfo = res.data.company;
							this.is_collection = res.data.is_collection;
							this.user_id = res.data.user_id;
							this.covers[0].latitude = Number(res.data.lat);
							this.covers[0].longitude = Number(res.data.lon);
							this.getagreement();
							this.get_shareUrl();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
			confirm() { //弹框确认
				this.$refs.addPop.close()
			},
			goComplant() { //投诉
				uni.navigateTo({
					url: './complaint?job_id=' + this.aid + '&job_type=2'
				})
			},
			get_shareUrl() {
				//获取分享链接
				this.$Request.post(this.$api.user.get_invite).then(res => {
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
			godetail(item) {
				//跳转公司信息
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				// #ifndef H5
				if (this.plant_detail.user_type == 2) {
					uni.navigateTo({
						url: 'index/job_detail?id=' + this.plant_detail.company_id + '&lon=' + this.plant_detail
							.lon + '&lat=' + this.plant_detail
							.lat + '&follow=' +
							this.is_collection
					});
				}
				// #endif


			},
			//验证接单
			apply_job() {
				if (this.is_full == 1) {
					this.$Common.toast('此单已接满，去看看其他任务')
					return
				}
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				this.$Request.post(this.$api.help_red.is_verification, {
					dask_id: this.aid,
					type: 2, //1报名，2兼职任务接单
				}).then(res => {
					if (res.code == 1) {
						uni.navigateTo({
							url: 'verification?aid=' + this.aid
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				});

			},
			back() {
				if (this.pageOpen == 'open') {
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					uni.navigateBack();
				}
			},
			yulan(pic, index) {
				this.$Common.lookImg(this.plant_detail.img_urls, index)
			},
			colloct_job() {
				//收藏
				// this.is_collection = !this.is_collection
				console.log(this.type,'===========ytpe');
				this.$Request
					.post(this.$api.company.set_collection, {
						collect_id: this.aid,
						type: this.type, // 3临时工 4 网络兼职
					})
					.then(res => {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						});
						if (res.code == 1) {
							this.is_collection = res.data.is_collection;
							uni.$emit('myCollect', {})
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
					if (res.code == 1) {
						uni.navigateTo({
							url: '../../pagescenter/zhaopinzhe/fabu?price=' + this.plant_detail
								.user_money + '&order_sn=' + res.data.order_sn
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
					if (res.code == 1) {
						this.service_rules = res.data.service_rules;
					}
				});
			},

			wefriend() {
				//分享微信好友					path: `pagesHome/index/plant_detail?id=${this.aid}`,
				// console.log(this.plant_detail.imgas_thumb+'?x-oss-process=style/compression');
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5,
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression',
					title: this.plant_detail.title + ' ' + this.plant_detail.commission + '元',
					miniProgram: {
						id: 'gh_66b0749ac265',
						path: 'pagesHome/part_sort?id=' + this.aid + '&user_id=' + this.other_user_id,
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
				// console.log(this.plant_detail.imgas_thumb+'?x-oss-process=style/compression');
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline",
					type: 0,
					href: 'https://app.chongdarenli.com/h5/#/pagesHome/part_sort?id=' + this.aid + '&user_id=' +
						this.other_user_id,
					title: this.plant_detail.title + ' ' + this.plant_detail.commission + '元',
					summary: "我正在使用人民保障网，赶紧跟我一起来体验吧！",
					imageUrl: this.plant_detail.imgas_thumb + '?x-oss-process=style/compression',
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						this.$Common.toast('网络错误，请稍后再试')
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
					url: '../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video
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
				// 		url: '../pagescenter/zhaopinzhe/play_video?url=' + this.plant_detail.video
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

	.box_h5 {
		position: fixed;
		left: 0;
		right: 0;
		margin: auto;
		bottom: 12%;
		width: 200upx;
		height: 70upx;
		line-height: 70upx;
		border-radius: 60upx;
		text-align: center;
	}

	.helpEnvelopes {
		width: 100%;
		height: 59upx;
		background-color: #FFF5E3;

		image {
			width: 38upx;
			height: 38upx;
		}
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
		height: 90rpx;

		.sevirce_btn {
			background: #FFFFFF;
			width: 20%;
			box-shadow: 0 0 3px #cccccc;
			color: #666;
		}

		.btn {
			width: 40%;
			height: 100%;
		}

		image {
			width: 30rpx;
			height: 30rpx;
		}

		.phone_btn {
			background: #50aeff;
			color: #ffffff;
		}

		.apply_btn {
			background: #1b90ff;
			color: #fff;
		}
	}
</style>
