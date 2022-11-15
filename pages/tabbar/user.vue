<template>
	<!-- #ifdef MP-WEIXIN -->
	<scroll-view scroll-y style="padding-bottom: 10rpx;background-color: #F6F7F9;" :style="[{ height: 'calc(100vh-100upx)' }]">
		<!-- #endif -->
		<view class="my " style="height: 100%;">
			<view class="top_section">
				<view class="bg_color" style="background: linear-gradient(90deg,rgba(51,143,255,1) 0%,rgba(62,149,255,1) 100%);width: 100%;height: 417rpx;">
					<image :src="IMG_URL + 'static/miniwechat/my1.png'" mode="aspectFill"></image>
				</view>
				<!-- 消息按钮 -->
				<!-- <view class="nav_btns flex align-center plr15" :style="{paddingTop:StatusBar+'px'}">
				<view class="item" @tap="toMessage">
					<image :src="IMG_URL + 'static/miniwechat/message.png'" mode="aspectFill"></image>
				</view>
			</view> -->
				<!-- 用户信息 -->
				<view v-if="userinfo.id > 0" style="position: relative;z-index: 100;" :style="{paddingTop:StatusBar*2+80+'rpx'}">
					<view class="userInfo">
						<view class="tui-msg-box">
							<view @tap="toPage('/pagesauthen/my_editInfo')" class="flex  align-center" style="width: 100%;">
								<view class="bg-gray mr10" style="width:160upx;height: 160upx; border-radius: 50%;overflow: hidden;flex-shrink: 0;">
									<image :src="  user.head_img || '/static/images/logo.png'" class="tui-msg-pic" mode="aspectFill"></image>
								</view>
								<view class="tui-msg-item">
									<view class=" text-white text-bold mb5 f40 text_line1">{{ user.user_name || '昵称' }}</view>
									<view class=" text-white f32 " @tap.stop="wallect()">
										我的钱包:{{user.user_money||0}}元
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="" style="position: relative;z-index: 100;top: 0upx" v-else :style="{paddingTop:StatusBar*2+80+'rpx'}">
					<view class="userInfo">
						<view class="tui-msg-box">
							<view class=" flex align-center" @tap="login">
								<view class="bg-gray flex_shrink" style="width: 160upx;height: 160upx; border-radius: 50%;overflow: hidden;">
									<image src="/static/images/logo.png" class="tui-msg-pic" mode="aspectFill" style="width: 100%;height: 100%;"></image>
								</view>
								<view class="tui-msg-item ml10">
									<view class="tui-msg-item">
										<view class="tui-msg-name text-white">登录/注册</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class=" up_margin">
					<view class="margin-lr ptb10 bg-white margin-top-sm radius-16">
						<view class="flex align-center justify-between">
							<view class="text-bold text-333 f32">我的接单</view>
							<!-- 我的购买查看全部 -->
							<view class="text-999 f24" @tap="toPage('/pagescenter/userypz/my_order')">
								<text class="">查看更多</text>
								<text class="cuIcon-right"></text>
							</view>
						</view>
						<view class="margin-top-lg flex justify-between">
							<view class="text-center" v-for="(item1, index) in shopList" :key="index" @tap="toPage(item1.path)">
								<image class="order" :src="item1.img" mode="aspectFill"></image>
								<view class=" text-333 f24">{{ item1.title }}</view>
							</view>
						</view>
					</view>


				</view>
			</view>
			<!-- 浮动导航 -->
			<view class=" path_list margin-top ">
				<!-- 列表导航 -->
				<view class=" color-gray radius ">
					<view class="cu-list menu mb10">
						<view @tap="toPage('/pagescenter/userypz/my_part_list')" class="cu-item arrow flex align-center justify-start">
							<image :src="IMG_URL + 'static/miniwechat/new/wangyueg.png'" mode="" style="width:36upx ;height: 42upx;"></image>
							<view class="content"><text class="text-black">我派单的临时工和网络兼职</text></view>
						</view>
						<view @tap.stop="toPage('../../pagescommon/UserInfo/UserInfo?type=1')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/new/wangyueg.png'" mode="" style="width:38upx ;height: 38upx;"></image>
							<!-- 我发布的本地信息（宣传广告） -->
							<view class="content"><text class="text-black">我发布的本地零工信息</text></view>
						</view>
						<view @tap.stop="toPage('../../pagescommon/UserInfo/UserInfo?type=3')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/new/wangyueg.png'" mode="" style="width:38upx ;height: 38upx;"></image>
							<view class="content"><text class="text-black">我发布的坑骗拖欠名单</text></view>
						</view>
						<view @tap="toPage('../../pagescenter/userypz/singUpStatus')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/new/bm.png'" mode="" style="width:38upx ;height: 45upx;"></image>
							<view class="content"><text class="text-black">我的报名</text></view>
						</view>
						<view @tap="toPage('../../pagescenter/userypz/my_envelopes')" class="cu-item arrow flex align-center justify-start">
							<image :src="IMG_URL + 'static/miniwechat/new/hb.png'" mode="" style="width:36upx ;height: 42upx;"></image>
							<view class="content"><text class="text-black">我的助力红包</text></view>
						</view>
						<!-- <view @tap="toPage('../../pagescenter/userypz/my_jianli')" class="cu-item arrow flex align-center justify-start">
						<image :src="IMG_URL + 'static/miniwechat/new/wangyueg.png'" mode="" style="width:36upx ;height: 42upx;"></image>
						<view class="content"><text class="text-black">我的简历</text></view>
					</view> -->
						<view @tap="toPage('../../pagescenter/userypz/my_jianli')" class="cu-item arrow flex align-center justify-start">
							<image :src="IMG_URL + 'static/miniwechat/new/jianli.png'" mode="" style="width:36upx ;height: 42upx;"></image>
							<view class="content"><text class="text-black">我的简历</text></view>
						</view>
						<view @tap="toPage('../../pagesHome/index/code_check?page=user')" class="cu-item arrow flex align-center justify-start">
							<image :src="IMG_URL + 'static/miniwechat/new/jianli.png'" mode="" style="width:36upx ;height: 42upx;"></image>
							<view class="content"><text class="text-black">工资查询</text></view>
						</view>
						<!-- <view @tap="toPage('../../pagesworktime/notebooklist')" class="cu-item arrow flex align-center justify-start">
							<i class="text-df cuIcon-edit bold" style="font-size: 42upx; margin-right: 20upx;"></i>
							<view class="content"><text class="text-black">我的记事本</text></view>
						</view> -->
						<view @tap="toPage('../../pagescenter/userypz/my_shoucang')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/collection.png'" mode="aspectFill" style="width:38upx ;height: 44upx;"></image>
							<view class="content"><text class="text-black">我的收藏</text></view>
						</view>
						<view @tap="toPage('../../pagescenter/userypz/my_collectResume')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/collection.png'" mode="aspectFill" style="width:38upx ;height: 44upx;"></image>
							<view class="content"><text class="text-black">我收藏的简历</text></view>
						</view>
						<view @tap="changeIdentify" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/find.png'" mode="" style="width:38upx ;height: 38upx;"></image>
							<view class="content"><text class="text-black">我要招人</text></view>
						</view>
						<view @tap="toPage('../../pagescenter/userypz/feedback')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/view.png'" mode="" style="width:38upx ;height: 38upx;"></image>
							<view class="content"><text class="text-black">意见反馈</text></view>
						</view>
						<view @tap.stop="toPage('../../pagescommon/setting')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/setting.png'" mode="" style="width:38upx ;height: 38upx;"></image>
							<view class="content"><text class="text-black">设置</text></view>
						</view>
						<view @tap.stop="toPage('../../pagescommon/agreement?type=2')" class="cu-item arrow">
							<image :src="IMG_URL + 'static/miniwechat/setting.png'" mode="" style="width:38upx ;height: 38upx;"></image>
							<view class="content"><text class="text-black">隐私政策</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
	</scroll-view>
	<!-- #endif -->
</template>
<script>
	export default {
		props: {
			scrollDistance: {
				type: [String, Number]
			},
		},
		data() {
			return {
				user: {
					id: 1
				}, //用户信息
				// ifOnShow:false,//定义是否刷新页面
				img: this.IMG_URL + 'static/miniwechat/logo.png',
				attestation: '', //认证状态
				IMG_URL:this.IMG_URL,
				isopen: true, //切换身份
				userinfo: uni.getStorageSync('USERINFO'), //缓存的用户信息
				StatusBar: this.StatusBar,
				shopList: [{
						img: this.IMG_URL + 'static/miniwechat/new/all.png',
						path: '/pagescenter/userypz/my_order?tab=0&status=all',
						title: '全部'
					},
					{
						img: this.IMG_URL + 'static/miniwechat/new/ing.png',
						path: '/pagescenter/userypz/my_order?tab=1&status=unconfirmed',
						title: '待确认'
					},
					{
						img: this.IMG_URL + 'static/miniwechat/new/wait.png',
						path: '/pagescenter/userypz/my_order?tab=2&status=uncompleted',
						title: '待完成'
					},
					{
						img: this.IMG_URL + 'static/miniwechat/new/complate.png',
						path: '/pagescenter/userypz/my_order?tab=3&status=completed',
						title: '已完成'
					}
				]
			};
		},
		created: function() {
			//这是要刷新的数据
			this.userinfo = uni.getStorageSync('USERINFO')
			if (this.userinfo.user_token) {
				this.get_usrInfo();
			}
			uni.$on('change', data => {
				console.log(data);
				if (data.msg == 1) {
					setTimeout(() => {
						this.get_usrInfo();
					})
				}
			});
			uni.$on('wechatLogin', () => { //监听微信登录成功
				// console.log('微信登录  个人中心');
				this.get_usrInfo();
			})
			uni.$on('withdraw', () => { //监听提现成功
				this.get_usrInfo();
			})
			uni.$on('updateMoney', () => {
				// 提现之后刷新页面
				this.get_usrInfo();
			})

		},
		destroyed() {
			uni.$off('change');
			uni.$off('wechatLogin');
			uni.$off('withdraw');
			uni.$off('updateMoney');
		},
		methods: {
			login() {
				//登录注册
				uni.removeStorageSync('PageCur');
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: '../../pagessignup/login'
				});
				// #endif

				// #ifdef MP-WEIXIN
				uni.navigateTo({ //微信授权后直接返回上一级不能使用 redirectTo
					url: '../../pagessignup/wechat/wxlog?page=outLogin'
				});
				// #endif
			},
			get_usrInfo() {
				//获取用户信息
				this.$Request.post(this.$api.user.get_user_info, {
					user_id: this.userinfo.id
				}).then(res => {
					this.user = res.data;
				});
			},
			wallect() { //我的钱包
				uni.navigateTo({
					url: '../../pagescenter/userypz/money/wallet'
				})
			},
			toPage: function(page) {
				//跳转详情，判断是否登录
				const userInfo = uni.getStorageSync('USERINFO');
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 500);
				if (!userInfo.user_token) {
					uni.removeStorageSync('PageCur');
					this.$Common.toast('您还没有登录，请先登录');
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif

					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/wechat/wxlog?page=outLogin'
					});
					// #endif
				} else {
					uni.navigateTo({
						url: page
					});
				}
			},
			changeIdentify() { //我要招人
				let that = this
				const userInfo = uni.getStorageSync('USERINFO');
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				if (!userInfo.user_token) {
					uni.removeStorageSync('PageCur');
					this.$Common.toast('您还没有登录，请先登录');
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif

					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/wechat/wxlog?page=outLogin'
					});
					// #endif
				} else {
					//获取认证信息
					uni.showLoading({})
					this.$Request.post(this.$api.user.user_certification_status).then(res => {
						if (res.code == '1') {
							uni.hideLoading()
							if (res.data.status == 1) {
								that.$Request.post(that.$api.common.switch_identity).then(res => {
									that.$Common.toast(res.msg);
									if (res.code == '1') {
										uni.setStorageSync('USERINFO', res.data);
										uni.removeStorageSync('PageCur');
										uni.$emit('userinfo', {});
										uni.reLaunch({
											url: '/pages/index/index'
										}, 300);

									}
								});
							} else if (res.data.status == 4) {
								this.$Common.toast('你的公司正在注销，暂时无法招人')
							} else {
								uni.navigateTo({
									url: '/pagescenter/userypz/zhaopinSort'
								});
							}


						}
					});

				}
			},
			toMessage() {
				//跳到消息列表页
				uni.setStorageSync('PageCur', 'message');
				if (this.isopen == false) {
					return;
				}
				this.isopen = false;
				setTimeout(() => {
					this.isopen = true;
				}, 1500);
				uni.redirectTo({
					url: '../index/index'
				});
				uni.setStorageSync('PageCur', 'message');
			}
		}
	};
</script>
<style lang="scss">
	page {
		background-color: #f7f7f7 !important;
		// height: 100%;
		/* #ifdef MP-WEIXIN */
		// height: 100vh;
		/* #endif */
	}

	.my {
		position: relative;
		// height: calc(100%-100upx);
		height: 100%;
		background: #f7f7f7;
		padding-bottom: 100upx;
	}

	.radius {
		border-radius: 16rpx;
	}

	.top_section {
		height: 510rpx;
		width: 100%;
		padding-bottom: 90rpx;
		// position: fixed;
		// top: 0;
		// z-index: 1000;
		// left: 0;

		.bg_color {
			width: 100%;
			height: 417rpx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 0;
		}
	}

	.bg_color>image {
		width: 100%;
		height: 100%;
	}

	.up_margin {
		margin: auto;
		// margin-top: -84upx;
		width: 686upx;
		// height: 154upx;
		position: relative;
		background-color: #fff;
		z-index: 3;
		border-radius: 16upx;
	}

	.cu-list.menu {
		border-radius: 16upx;
	}

	.userInfo {
		padding: 20rpx 30rpx 0;

		.cu-tag {
			border-radius: 6px;
			color: #fff;
			height: 36upx;
			background: linear-gradient(136deg, rgba(252, 227, 143, 1) 0%, rgba(242, 164, 87, 1) 100%);
		}
	}

	.dir {
		color: #999999;
	}

	.tui-msg-box {
		image {
			width: 160upx;
			height: 160upx;
		}
	}

	.tui-msg-pic {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		// border: 1px solid #fff;
		display: block;
		margin-right: 24upx;
	}

	.tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 40upx;
		// line-height: 1;
		font-weight: bold;
		// margin-top: 20upx;
		// color: #333;
	}

	.my_bgImg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 431rpx;
	}

	.cu-item {
		padding: 30upx 30upx;
		font-size: 32upx;

		image {
			margin-right: 20upx;
		}
	}

	.nav_btns {
		padding: 36rpx 30rpx 0;
		position: relative;
		z-index: 3;
		/* #ifndef MP-WEIXIN */
		justify-content: flex-end;
		/* #endif */

		.item {
			font-size: 48rpx;
			margin-top: 40upx;
			margin-left: 20rpx;

			image {
				width: 42upx;
				height: 42upx;
			}
		}

		/* #ifdef MP-WEIXIN */
		padding-right: 240upx;
		/* #endif */
		/* #ifdef MP-ALIPAY */
		padding-right: 170upx;
		/* #endif */
	}

	.order {
		width: 44upx;
		height: 44upx;
	}

	.path_list {
		padding-top: 0;
		position: relative;
		z-index: 999;
		width: 686upx;
		margin: auto;
		border-radius: 16upx;
		margin-top: 60upx;
		// padding-bottom: 100upx;
		margin-bottom: 140upx;
		background-color: #fff;

		.text-grey {
			font-size: 30rpx;
		}
	}
</style>
