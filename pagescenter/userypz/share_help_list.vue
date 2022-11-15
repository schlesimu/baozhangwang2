<!-- 分享助力页面 -->
<template>
	<view class="">
		<view class=" ">
			<image :src="IMG_URL + 'static/miniwechat/new/share_bg.png'" mode="" class="contant1"></image>
			<!-- :style="[{ height: 'calc(100vh)' }]" -->
			<view class="cu-custom " :style="[{height: CustomBar+'px'}]">
				<view class="cu-bar fixed "
					:style="{height: CustomBar+'px',paddingTop: StatusBar+'px',background:'rgba(244,95,0,'+opacity+')'}">
					<view class="action" @tap="back" v-if="isBack">
						<text class="cuIcon-back text-white"></text>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<!-- 微信小程序展示home图标 -->
					<view class="action" @tap="goHome()" v-if="!isBack">
						<text class="cuIcon-home f28 text-white"></text>
					</view>
					<!-- #endif -->
					<view class="content text-white" :style="{top:StatusBar + 'px'}">分享</view>
					<view class="" :style="{top:StatusBar + 'px'}" style="z-index: 100000;">
						<!-- #ifndef MP-WEIXIN -->
						<text class="text-sm padding text-white" @tap="help_rule">助力规则</text>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<text class="text-sm  text-white" @tap="help_rule">助力规则</text>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<view class="padding " :style="{top:CustomBar+ 'px'}">
				<!-- 头部展示 -->
				<view class="top_item">
					<image :src="IMG_URL + 'static/miniwechat/new/top.png'" mode="aspectFill"></image>
					<view class="txt_item padding ">
						<view class="flex align-center mb20">
							<view class="bg_img mr10">
								<image :src="helpInfo.head_img||'/static/images/logo.png'" mode="aspectFill"></image>
							</view>
							<view class="">
								<view class="text_line1 f32 bold ewrap">{{helpInfo.user_nickname||''}}</view>
								<view class="f24 text_999">快来帮我助力加薪呦~谢谢啦~~~</view>
							</view>
						</view>
						<view class="flex align-center">
							<view class="bg_img mr10 " style="border-radius: 16upx;">
								<image :src="helpInfo.log_image||'/static/images/logo.png'" mode="aspectFill"></image>
							</view>
							<view class="">
								<view class="text_line1 f32 bold ewrap">{{helpInfo.company_name||''}}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 中间部分-->
				<view class="center_item mt20">
					<image :src="IMG_URL + 'static/miniwechat/new/share_icon2.png'" mode="aspectFill"></image>
					<view class="txt_item padding ">
						<view class="top_box" v-if="helpInfo.red_receive_percentage!='100%'">
							<image :src="IMG_URL + 'static/miniwechat/new/share_icon1.png'" mode=""></image>
							<view class="lastTime  f24 text-center" v-if="helpInfo.effective_end_time<=nowTime">
								助力加薪已结束
							</view>
							<view class="lastTime  f24 text-center flex align-center justify-around" v-else>
								<text style="color: #F77858;" class="">距离失败时间:</text>
								<!-- <minCountdown   :targetTime="1606306522"></minCountdown> -->
								<countdown v-if="helpInfo.effective_end_time" :starttime="helpInfo.effective_start_time"
									:endtime="helpInfo.effective_end_time" :showDay="true"
									:backgroundColor='countdown_bgcolor' :color='countdown_color'></countdown>
							</view>
						</view>
						<view class="text-center" style="position: relative;top: 60upx;">
							<view class="" v-if="helpInfo.red_receive_percentage!='100%'">
								<view class="f28">{{helpInfo.red_envelope_type_name||''}}</view>
								<view class="f48 mtb10" style="color: #F77858;">{{helpInfo.red_envelope_money||0}}元
								</view>
								<view class="f28">距离成功还差{{helpInfo.remaining_percentage||0}}可获得</view>
								<view class="mtb10">
									<view class="progress round margin-right-sm "
										style="height:24rpx;width: 100%;background: #FFFAEA;">
										<view style="height: 100%;" :style="{width:helpInfo.red_receive_percentage}"
											class="round bg-press">
											<!-- {{prop.rate}}% -->
										</view>
									</view>
									<!-- <progress percent="20"  stroke-width="3" border-radius='20' :activeColor="progress_color"/> -->
								</view>
								<view class="" v-if="helpInfo.effective_end_time>=nowTime&&is_status==0">
									<!-- #ifdef MP-WEIXIN -->
									<button class="btn_share mt10" open-type="share" v-if="type==1">分享助力</button>
									<!-- #endif -->
									<!-- #ifndef MP-WEIXIN -->
									<view class="btn_share mt10" @tap='shareFriends' v-if="type==1">分享助力</view>
									<!-- #endif -->
								</view>

							</view>
							<view class="" v-else>
								<view class="" v-if="is_status==2">
									<view class="">助力成功</view>
									<view class="f48 mtb10" style="color: #F77858;" v-if="type==1">
										恭喜获得{{helpInfo.red_envelope_type_name}}{{helpInfo.red_envelope_money}}元</view>
									<view class="f28">助力成功完成100%</view>
								</view>
								<view class="mtb10">
									<view class="progress round margin-right-sm "
										style="height:24rpx;width: 100%;background: #FFFAEA;">
										<view style="height: 100%;" :style="{width:helpInfo.red_receive_percentage}"
											class="round bg-press">
											<!-- {{prop.rate}}% -->
										</view>
									</view>
									<!-- <progress percent="20"  stroke-width="3" border-radius='20' :activeColor="progress_color"/> -->
								</view>

							</view>
							<view class="btn_share mt10" @tap='friend_help' v-if="type==2&&!help_sussess">帮助好友助力加薪
							</view>
							<view class="btn_share mt10" style="color: #333;background: #FFFFFF;"
								v-if="type==2&&help_sussess">助力成功</view>

						</view>
					</view>
				</view>
				<!--  -->
				<view class="bom_item mt20" v-if="helpInfo.child!=''">
					<image :src="IMG_URL + 'static/miniwechat/new/bom.png'" mode="aspectFill"></image>
					<view class="top_box text-white text-center">
						好友助力列表
					</view>
					<view class="list">
						<scroll-view scroll-y class=" " style="height: 430upx;width: 100%;">
							<view class="flex align-center mb15 justify-between" v-for="(item, index) in helpInfo.child"
								:key="index" style="width: 100%;">
								<view class="flex align-center ">
									<view class="bg_img mr10" style="width: 80upx;height: 80upx;">
										<image :src="item.friend_head_img||'/static/images/logo.png'" mode="aspectFill">
										</image>
									</view>
									<view class="text_line1 f28 bold ewrap">{{item.friend_user_nickname||''}}</view>
								</view>
								<view class="f24 text_666">助力成功</view>
							</view>
							<view class="" v-if="helpInfo.child==''">
								暂无好友助力
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<view class="cu-modal" :class="modalName=='Modal'?'show':''">
				<view class="cu-dialog" style="height: 800upx;">
					<view class="cu-bar bg-white justify-end">
						<view class="content">分享规则</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-black"></text>
						</view>
					</view>
					<view class="padding-xl bg-white text-left" style="overflow-y: scroll;height: 700upx;">
						<jyf-parser :html="rules" ref="article"></jyf-parser>
					</view>
				</view>
			</view>
			<uni-popup type='center' ref='rule'>
				<view class="bg-white plr15 pb10"
					style="border-radius: 16upx;width: 540upx;height: 600upx;overflow: auto;position: relative;">
					<view class="text-bold text-md text-center mb10 pt10 bg-white"
						style="position: fixed;width: 480upx;">
						<text>分享规则</text>
						<view class="icon_x" @tap="close">X</view>
					</view>
					<view class="flex justify-around align-center pt50" style="height: auto">
						<!-- <text class="f30" v-html="rules" style="height: 520upx;"></text> -->
						<jyf-parser :html="rules" ref="article"></jyf-parser>
					</view>
				</view>
			</uni-popup>
			<view class="popup_box" v-if="yhqPop">
				<view class="bg_box flex align-center column justify-center">
					<view class="bg-img mb10 flex align-center justify-center column bg-white">
						<image class="  pt20" :src="IMG_URL + 'static/miniwechat/new/icon_success.png'"
							mode="aspectFill" style="width: 220upx;height: 261upx;"></image>
						<view class="text_price pt20 top_box flex align-center justify-center column">
							<text class="f40 " style="color: #FF450C;">助力成功</text>
						</view>
					</view>
					<image class="img-56 " :src="IMG_URL + 'static/miniwechat/new/close.png'" mode="" @tap='closePop'>
					</image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import countdown from '@/pagescenter/countdown/countdown.vue';
	import minCountdown from '@/pagescenter/min-countdown';
	import jyfParser from '@/components/jyf-parser/jyf-parser';
	export default {
		components: {
			countdown,
			minCountdown,
			jyfParser
		},
		data() {
			return {
				PageCur: 'homepage',
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				modalName: null, //规则弹框
				rules: '', //规则
				isopen: true, //跳转页面
				IMG_URL:this.IMG_URL,
				yhqPop: false, //分享弹框
				helpInfo: '', //分享信息
				isBack: true, //是否返回按钮，在小程序里面显示小房子回主页
				envelope_id: '', //报名成功可分享好友红包id
				userInfo: uni.getStorageSync('USERINFO'),
				countdown_bgcolor: 'transparent', //倒计时背景色
				countdown_color: '#FF8327', //文字颜色
				help_sussess: false, //是否助力成功
				type: 1, //1：发起人登录分享的助力页面 2：发起人分享到微信或者朋友圈后，好友登录打开的助力页面（或者助力成功的页面）
				// downOption: {
				// 	//下拉刷新
				// 	auto: false //页面初次加载禁止
				// },
				// upOption: {
				// 	//上拉加载
				// 	auto: false //页面初次加载禁止
				// },
				red_envelope_aid: '', //红包记录id
				max_salary: '', //最高薪资
				min_salary: '', //最低薪资
				job_title: '', //职位标题
				jobImage: '', //职位主图
				salary_money: '', //薪资
				scrollTop: '', // 改动距离
				opacity: '', //透明度
				nowTime: '', //当前时间
				is_status: 0, //助力中  1：助力失败  2：助力成功
			};
		},
		onLoad(e) {
			this.resume_id = e.resume_id
			this.job_title = e.job_title
			this.salary_money = e.salary_money
			this.jobImage = e.jobImage
			if (e.page == 'xcx') {
				this.type = 2
				this.isBack = false
			} else {
				this.type = 1
			}
			this.red_envelope_aid = e.red_envelope_aid
			uni.$on('wechatLogin', () => {
				this.loadData()
			})
			let useroinfo = uni.getStorageSync('USERINFO')
			if (useroinfo.user_token) {
				this.loadData()
			} else {
				this.$Common.toast('请先登录')
				setTimeout(() => {
					uni.navigateTo({
						url: '../../pagessignup/wechat/wxlog'
					})
				}, 300)

			}
			uni.showLoading({})
			let Time = new Date();
			this.nowTime = Time.getTime() / 1000;
			console.log(Time, this.nowTime, '==========') //Mon Jun 24 2019 11:08:48 GMT+0800 (中国标准时间)
		},
		// onNavigationBarButtonTap() {//原生导航右侧按钮  不兼容小程序
		// 	this.$refs.rule.open()
		// },
		onPageScroll(e) {
			let top = e.scrollTop;
			this.scrollTop = top;
			this.opacity = (top / 100).toFixed(2);
		},
		onShareAppMessage() {
			// console.log(this.helpInfo, this.helpInfo.name, this.helpInfo.salary_money, '--------');
			return {
				title: this.job_title + ' ' + this.salary_money + '元/每月' + '   ' + '快来帮我助力加薪呦~,就差你了',
				path: 'pagescenter/userypz/share_help_list?page=xcx&red_envelope_aid=' + this.red_envelope_aid +
					'&job_title=' +
					this.job_title + '&salary_money=' + this.salary_money,
				imageUrl: this.jobImage,
			}
		},
		onShow() {
			uni.hideLoading()
		},
		methods: {
			loadData() {
				this.get_info()
			},
			back() {
				uni.navigateBack({})
			},
			goHome() {
				uni.redirectTo({
					url: '../../pages/index/index'
				})
			},
			close() { //关闭规则弹窗
				this.$refs.rule.close()
			},
			help() { //帮好友助力
				this.yhqPop = true
			},
			help_rule(e) { //助力规则
				this.modalName = 'Modal'
				// this.$refs.rule.open()
			},
			hideModal(e) {
				this.modalName = null
			},
			closePop() { //关闭新人优惠券弹框
				this.yhqPop = false
			},
			getRule() { //获取助力规则
				this.$Request
					.post(this.$api.operation.get_column, {
						category_id: 11, //用户 协议：5 隐私协协议：6 招聘发布规则：7 工资保障服务金规则：8 接单者协议：9 网约工发布协议：10 助力规则：11
					})
					.then(res => {
						if (res.code == 1) {
							this.rules = res.data.content;
						} else {}
					})
			},
			get_info() { //
				this.$Request
					.post(this.$api.operation.help_info, {
						type: this.type,
						red_envelope_id: this.red_envelope_aid || 0, //红包id
					}).then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.helpInfo = res.data;
							this.is_status = res.data.is_status
							this.getRule()
						} else {
							this.$Common.toast(res.data)
							setTimeout(() => {
								// uni.navigateBack()
							}, 300)
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			friend_help() { //好友助力接口 friend_help
				this.$Request
					.post(this.$api.user.friend_help, {
						red_envelope_id: this.helpInfo.aid, //红包id
					}).then(res => {
						if (res.code == 1) {
							this.yhqPop = true
							if (res.msg == '助力成功') {
								this.help_sussess = true
							}
							this.get_info()
						} else {
							this.$Common.toast(res.msg)
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			shareFriends() { //分享到小程序
				console.log(this.jobImage, '======');
				uni.showLoading()
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 5,
					imageUrl: this.jobImage + '?x-oss-process=style/compression',
					title: this.job_title + ' ' + this.salary_money + '元/每月' + '    ' + '快来帮我助力加薪呦~,就差你了',
					miniProgram: {
						id: 'gh_66b0749ac265',
						path: 'pagescenter/userypz/share_help_list?page=xcx&red_envelope_aid=' + this
							.red_envelope_aid + '&job_title=' +
							this.job_title + '&salary_money=' + this.salary_money,
						type: 0,
						webUrl: 'http://uniapp.dcloud.io'
					},
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
						uni.hideLoading()
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
						uni.hideLoading()
						// this.$Common.toast('请使用小程序自带的分享功能分享')
					}
				});
			}

		}
	};
</script>

<style lang="scss">
	page {
		height: 100vh;
		background: linear-gradient(180deg, #FF9844 0%, #FF6B4B 100%);
	}

	.contant {
		height: 100vh;
		width: 100%;
		background-image: url('https://app.chongdarenli.com/static/miniwechat/new/share_bg.png');
		background-size: 100% 100%;

	}

	.contant1 {
		position: fixed;
		z-index: 0;
		height: 100vh;
		width: 100%;

	}

	.top_item {
		width: 100%;
		height: 307upx;
		position: relative;
		z-index: 100;

		image {
			width: 100%;
			height: 100%;
		}

		.txt_item {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
		}
	}

	.center_item {
		width: 100%;
		height: 476upx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.txt_item {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;

			.top_box {
				width: 457upx;
				height: 53upx;
				line-height: 53upx;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				margin: auto;

				image {
					width: 457upx;
					height: 53upx;
				}

				.lastTime {
					position: absolute;
					z-index: 10;
					top: 0;
					left: 0;
					right: 0;
					margin: auto;
				}
			}

		}
	}

	.bom_item {
		width: 100%;
		height: 689upx;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.top_box {
			position: absolute;
			top: 46upx;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 10;
		}

		.list {
			width: 100%;
			height: 459upx;
			padding: 40upx;
			overflow: hidden;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 60upx;
			margin: auto;
			z-index: 10;
		}
	}

	.btn_share {
		width: 612upx;
		height: 88upx;
		background: linear-gradient(180deg, #FF9844 0%, #FF6B4B 100%);
		border-radius: 8upx;
		text-align: center;
		line-height: 88upx;
		color: #FFFFFF;
	}

	.bg-press {
		background: linear-gradient(270deg, #FC7F01 0%, #F95204 100%);
		;
	}

	.bg_img {
		width: 96upx;
		height: 96upx;
		margin-right: 20upx;
		background-color: #f7f7f7;
		border-radius: 50%;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.icon_x {
		position: absolute;
		right: 40upx;
		top: 10upx;
	}

	.popup_box {
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, .5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;

		.bg_box {
			width: 626upx;
			height: 762upx;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;

			.bg-img {
				width: 626upx;
				height: 662upx;
				position: relative;
				background-image: url(https://app.chongdarenli.com/static/miniwechat/new/icon_bg.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				border-radius: 44upx;

				image {
					position: relative;

				}

				.top_box {
					position: relative;
					z-index: 9999;
					// left: 0;
					// right: 0;
					// margin: auto;
				}

				.bom_box {
					position: absolute;
					z-index: 9999;
					bottom: 30upx;
					left: 0;
					right: 0;
					margin: auto;

					.btn {
						width: 320upx;
						height: 80upx;
						margin: 15upx 0;
						text-align: center;
						line-height: 80upx;
						background-size: 100% 100%;
						background-repeat: no-repeat;
					}
				}
			}

		}

	}

	.progress {
		position: relative;

		.rote {
			position: absolute;
			top: -50upx;
			background-color: #ff3235;
			color: #ffffff;
			padding: 2upx 6upx;
			border-radius: 20upx;
			font-size: 10px;
		}
	}
</style>
