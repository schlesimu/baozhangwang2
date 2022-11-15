<template>
	<view class="index">
		<!-- 应聘者-全职 -->
		<homepage ref="homepage" v-if="PageCur == 'homepages'" :scrollDistance="distance_y" :showTop="showtop"></homepage>
		<!-- 招聘者-全职 -->
		<homepageTwo v-if="PageCur == 'homepageTwo'"></homepageTwo>
		<!-- 消息 -->
		<message v-if="PageCur == 'message'"></message>
		<!-- 记工时模块 -->
		<worktime v-if="PageCur == 'worktime'"></worktime>
		<!-- 应聘者-个人中心 -->
		<user v-if="PageCur == 'user'" :scrollDistance="distance_y"></user>
		<!-- 招聘者-个人中心 -->
		<zhaopinzhe v-if="PageCur == 'zhaopinzhe'"></zhaopinzhe>

		<!-- tabbar -->
		<view class="cu-bar tabbar bg-white shadow foot">
			<!--  应聘者-全职  -->
			<view v-if="user_type == 1" class="action" @click="NavChange" data-cur="homepages">
				<view class="cuIcon-cu-image">
					<image v-if="PageCur == 'homepages'" :src="IMG_URL + 'static/miniwechat/tabbar/home_blue.png'"></image>
					<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/home.png'"></image>
					<!-- <image :src="'/static/tabbar/home' + [PageCur=='homepages'?'_blue':''] + '.png'"></image> -->
				</view>
				<view class="text-df" :style="PageCur == 'homepages' ? 'color:#333;font-weight: bold;' : 'color:#999'"><text>首页</text></view>
			</view>
			<!-- 招聘者-全职 -->
			<view v-if="user_type == 2" class="action" @click="NavChange" data-cur="homepageTwo">
				<view class="cuIcon-cu-image">
					<image v-if="PageCur == 'homepageTwo'" :src="IMG_URL + 'static/miniwechat/tabbar/home_blue.png'"></image>
					<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/home.png'"></image>
					<!-- <image :src="'/static/tabbar/home' + [PageCur == 'homepageTwo'?'_blue':''] + '.png'"></image> -->
				</view>
				<view class="text-df" :style="PageCur == 'homepageTwo' ? 'color:#333;font-weight: bold;' : 'color:#999'">招聘</view>
			</view>

			<!-- 消息 -->
			<view class="action" @click="NavChange" data-cur="message" style="position: relative;">
				<view class="">
					<view class="cuIcon-cu-image">
						<image v-if="PageCur == 'message'" :src="IMG_URL + 'static/miniwechat/tabbar/news_blue.png'"></image>
						<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/news.png'"></image>
						<!-- <image :src="'/static/tabbar/news' + [PageCur == 'message'?'_blue':''] + '.png'"></image> -->
					</view>
					<view class="text-df" :style="PageCur == 'message' ? 'color:#333;font-weight: bold;' : 'color:#999'">消息</view>
				</view>
				<text class="masgnum" v-if="count > 0">{{ count }}</text>
			</view>
			
			<!-- 添加招聘、求职切换 -->
			<view class="action" @click="switchZpJob" data-cur="message" style="position: relative;" v-if="user_type == 1">
				<view>
					<view class="cuIcon-cu-image" style="width: 96upx; height: 96upx; background-color: #1a79ff; line-height: 96upx; border-radius: 50%; box-shadow: 2px 2px 8px 2px #1a79ff; text-align: center;">
						<i class="text-df bold cuIcon-add" style="color: #fff; font-size: 64upx;"></i>
					</view>
				</view>
			</view>
			
			<!-- 记工时-只有应聘者才有此功能 -->
			<view class="action" v-if="user_type == 1" @click="NavChange" data-cur="worktime" style="position: relative;">
				<view class="">
					<view class="cuIcon-cu-image">
						<image v-if="PageCur == 'worktime'" :src="IMG_URL + 'static/miniwechat/tabbar/worktime_blue.png'"></image>
						<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/worktime.png'"></image>
					</view>
					<view class="text-df" :style="PageCur == 'worktime' ? 'color:#333;font-weight: bold;' : 'color:#999'">记工时</view>
				</view>
			</view>
			<view class="action" v-if="isShow&&user_type==2"  @click="pageChange(1,13)" data-cur="worktime" style="position: relative;">
				<view class="">
					<view class="cuIcon-cu-image">
						<image v-if="PageCur == 'worktime'" :src="IMG_URL + 'static/miniwechat/tabbar/worktime_blue.png'"></image>
						<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/worktime.png'"></image>
					</view>
					<view class="text-df" :style="PageCur == 'worktime' ? 'color:#333;font-weight: bold;' : 'color:#999'">本地零工</view>
				</view>
			</view>
			<view class="action" v-if="isShow&&user_type==2"  @click="pageChange(2,3)" data-cur="worktime" style="position: relative;">
				<view class="">
					<view class="cuIcon-cu-image">
						<image v-if="PageCur == 'worktime'" :src="IMG_URL + 'static/miniwechat/tabbar/worktime_blue.png'"></image>
						<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/worktime.png'"></image>
					</view>
					<view class="text-df" :style="PageCur == 'worktime' ? 'color:#333;font-weight: bold;' : 'color:#999'">求职者信息</view>
				</view>
			</view>
			
			<!-- 应聘者-个人中心 -->
			<view v-if="user_type == 1" class="action" @click="NavChange" data-cur="user">
				<view class="cuIcon-cu-image">
					<image v-if="PageCur == 'user'" :src="IMG_URL + 'static/miniwechat/tabbar/my_blue.png'"></image>
					<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/my.png'"></image>
					<!-- <image :src="'/static/tabbar/my' + [PageCur == 'user'?'_blue':''] + '.png'"></image> -->
				</view>
				<view class="text-df" :style="PageCur == 'user' ? 'color:#333;font-weight: bold;' : 'color:#999'">我的</view>
			</view>
			<!-- 招聘者-个人中心 -->
			<view v-if="user_type == 2" class="action" @click="NavChange" data-cur="zhaopinzhe">
				<view class="cuIcon-cu-image">
					<image v-if="PageCur == 'zhaopinzhe'" :src="IMG_URL + 'static/miniwechat/tabbar/my_blue.png'"></image>
					<image v-else :src="IMG_URL + 'static/miniwechat/tabbar/my.png'"></image>
					<!-- <image :src="'/static/tabbar/my' + [PageCur == 'zhaopinzhe'?'_blue':''] + '.png'"></image> -->
				</view>
				<view class="text-df" :style="PageCur == 'zhaopinzhe' ? 'color:#333;font-weight: bold;' : 'color:#999'">我的</view>
			</view>
		</view>
		
		<!-- PageCur === 'homepages' || -->
		<view style="width: 30%; height: 128upx; display: flex; justify-content: space-around; align-items: center; position: fixed; left: 50%; bottom: 120upx; z-index: 98;" v-if="PageCur === 'homepageTwo'">
			<view
				style="width: 128upx; height: 128upx; background-color: #007AFF; border-radius: 50%; box-shadow: 0 2px 10px 2px rgba(0,0,0,0.4); text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center;"
				@click="changeIdentify"
			>
				<i class="text-df bold" :class="PageCur === 'homepages' ? 'cuIcon-friend' : 'cuIcon-home'" style="color: #FFFFFF; font-size: 48upx;"></i>
				<text style="color: #FFFFFF; font-size: 26upx;">{{PageCur === 'homepages' ? '我要招人' : '返回首页'}}</text>
			</view>
		</view>
		
		<uni-popup type="center" ref="popup">
			<view style="width: 100%; display: flex; justify-content: space-around; align-items: center;">
				<view style="background-color: #1a79ff; border-radius: 50%; width: 140upx; height: 140upx; color: #FFFFFF; display: flex; justify-content: center; align-items: center; box-shadow: 2px 2px 8px 2px #ccc;" @click="confirm">我要求职</view>
				<view style="background-color: #1a79ff; border-radius: 50%; width: 140upx; height: 140upx; color: #FFFFFF; display: flex; justify-content: center; align-items: center; box-shadow: 2px 2px 8px 2px #ccc;" @click="changeIdentify">我要招人</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
		    pageArray:['homepages','homePageTwo','message','user'],
			PageCur: 'homepages',
			user_type: 1, //1=应聘者， 2=招聘者
			distance_y: '',
			IMG_URL: this.IMG_URL,
			showtop: false, //是否展示返回顶按钮
			userInfo: '', //获取用户缓存信息
			count: 0 //消息数量
		};
	},
	onLoad() {
		this.$Common.checkOpenGPSServiceByAndroid();
		this.$forceUpdate();
		if (!uni.getStorageSync('USERINFO').user_token) {
			uni.setStorageSync('USERINFO', {
				user_type: 1,
				id: ''
			});
		}
		// this.$Request.post(this.$api.operation.get_ads, {
		// 	typeid: 2
		// }).then(res => {
		// 	if (res.code == 1) {
		// 		if(res.data!=''){
		// 			this.imageList = res.data.image;
		// 			if(this.imageList.length>0){
		// 				console.log(uni.getStorageSync('launchFlag'),'=============');
		// 				if(uni.getStorageSync('launchFlag')){

		// 				}else{
		// 					uni.reLaunch({
		// 						url: '../guide/guide'
		// 					});
		// 				}

		// 			}
		// 			// this.videoInfo = res.data.video[0];
		// 		}else{
		// 			if (!uni.getStorageSync('USERINFO').user_token) {
		// 				uni.setStorageSync('USERINFO', {
		// 					user_type: 1,
		// 					id: ''
		// 				})
		// 			}
		// 			uni.reLaunch({
		// 				url: '../index/index'
		// 			});
		// 		}
		// 	}
		// })
		this.userInfo = uni.getStorageSync('USERINFO');
		this.user_type = this.userInfo.user_type;
		if (this.userInfo.user_token) {
			this.getMessageNumber();
		}
		uni.$on('number', data => {
			//系统消息更新角标
			// console.log('系统消息更新角标','==========');
			if (this.userInfo.user_token) {
				this.getMessageNumber();
			}
		});
		uni.$on('updata', data => {
			//收到信息刷新页面
			// console.log('收到信息刷新页面','==========');
			if (this.userInfo.user_token) {
				this.getMessageNumber();
			}
		});

		this.initTabber(); //切换身份、初始身份
		if (this.user_type == 0) {
			this.user_type = 1;
		}
		// #ifdef MP-WEIXIN
		uni.$on('wechatLogin', () => {
			//通知成功
			this.PageCur = 'homepages';
			uni.setStorageSync('PageCur', this.PageCur);
		});
		// #endif
		uni.$on('openPage', data => {
			//退出应用再打开应用刷新接口
			if (this.userInfo.user_token) {
				this.getMessageNumber();
			}
			this.$forceUpdate();
		});
	},
	onShow() {
		console.error(12345);
		if (uni.getStorageSync('sevice')) {
			setTimeout(() => {
				if (this.userInfo.user_token) {
					this.getMessageNumber();
				}
			}, 2000);
		}
		uni.$on('openPage', data => {
			if (this.userInfo.user_token) {
				this.getMessageNumber();
			}
		});

		uni.$on('receiveMsg', data => {
			//全局接收消息
			if (this.userInfo.user_token) {
				this.getMessageNumber();
			}
		});
		
		// console.error(this.PageCur);
		
		// 进入次级页面回到当前页面
		let ref = this.$refs.homepage;
		if (this.PageCur == 'homepages' && ref.t == null) {
			// console.error(8888);
			ref.t = setInterval(() => {
				ref.left -= 1;
				if (Math.abs(ref.left) > (ref.noticeList.length - 1) * 600) {
					ref.left = 0;
				}
			}, 50);
		}
	},
	onUnload() {
		uni.$off('wechatLogin');
		uni.$off('updata');
	},
	onPageScroll: function(e) {
		this.distance_y = e.scrollTop;
		if (e.scrollTop >= 250) {
			this.showtop = true;
		} else {
			this.showtop = false;
		}
	},
	// 微信小程序右上角分享
	onShareAppMessage() {
		let title = this.$Config.APPNAME;
		let imageUrl = '/static/images/logo.png';
		let path = 'pages/index/index';
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
		let path = 'pages/index/index';
		return {
			title,
			imageUrl,
			query: path
		};
	},
	onReachBottom() {
		uni.$emit('to_bottom', '触底事件');
	},
	computed:{
		isShow(){
			return this.pageArray.indexOf(this.PageCur)
		}
	},
	
	methods: {
		//点击切换
		pageChange(index,id){
			let params = '&id=' + id;
			if(index === 2){
				uni.navigateTo({
					url: '../../pagesHome/resumeDatabase'
				});
			}else{
			uni.navigateTo({
				url: '../../pagesHome/convenience?type=' + index + params
			});
			}
		},
		initTabber() {
			//切换身份
			if (this.userInfo.user_type == 1) {
				this.PageCur = uni.getStorageSync('PageCur') || 'homepages'; //读取默认显示项
			} else if (this.userInfo.user_type == 2) {
				this.PageCur = uni.getStorageSync('PageCur') || 'homepageTwo'; //读取默认显示项
			}
		},
		NavChange: function(e) {
			//点击tabbar
			this.PageCur = e.currentTarget.dataset.cur;
			if (this.userInfo.user_token) {
				this.getMessageNumber();
			}
			uni.setStorageSync('PageCur', this.PageCur);
		},
		getMessageNumber() {
			//获取信息数量  messageNumber
			this.$Request
				.post(this.$api.msg.messageNumber, {
					user_id: this.userInfo.id
				})
				.then(res => {
					if (res.code == 1) {
						this.count = res.data.count;
					} else {
						this.$Common.toast(res.msg);
					}
				});
		},
		changeIdentify() { //我要招人
			let that = this;
			const userInfo = uni.getStorageSync('USERINFO');
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
		switchZpJob(e) {
			// console.error(e);
			this.$refs.popup.open();
		},
		// 确定填写简历
		confirm() {
			if (!this.userInfo.user_token) {
				this.$Common.toast('您还没有登录，请先登录');
				setTimeout(() => {
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif
		
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						//微信授权后直接返回上一级不能使用 redirectTo
						url: '/pagessignup/wechat/wxlog?page=outLogin'
					});
					// #endif
				}, 500);
			} else {
				uni.navigateTo({
					url: '/pagescenter/userypz/my_jianli'
				});
				this.$refs.leepop.close();
				uni.removeStorageSync('openHomePop');
			}
		},
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
	min-height: 100%;
	width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
}

.index {
	height: 100%;
}

.text-col {
	color: #fa6b5a;
}

.masgnum {
	position: absolute;
	top: -6upx;
	right: 80upx;
	z-index: 100;
	width: 32upx;
	height: 32upx;
	background: #ff5656;
	border-radius: 50%;
	font-size: 22upx;
	color: #fff;
	text-align: center;
	line-height: 28upx;
}

.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box {
	max-width: auto!important;
	max-height: auto!important;
	width: 100%!important;
	border-radius: 28upx!important;
}
</style>
