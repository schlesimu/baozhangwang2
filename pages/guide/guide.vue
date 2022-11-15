<template>
	<view class="content">
		<!-- 图片 -->
		<swiper class="swiper" :autoplay="autoplay" :duration="duration" @change="sliderChange" :infinite="false"
			:forbid-slide-animation="false">
			<swiper-item v-for="(img, index) in imageList" :key="index">
				<view class="swiper-item" @click.stop="launchAppIndex(img)">
					<view class="swiper-item-img">
						<image :src="img.thumb" mode="aspectFill"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="jump-over" @tap.stop="jump">{{count}}s {{jumpover}}</view>
		<!-- 	<view class="flex align-center justify-center column mask-loading" v-if="isShowLoading">
			<image src="../../static/images/logo.jpg" mode="aspectFill"
				style="border-radius: 100rpx;" class="image1"></image>
			<text class="padding-top">人人保障网</text>
		</view> -->
		<!-- 	<video v-if="launchType == 2&&videoInfo&&videoInfo.zip_addr_url" class="ad_video" :src="videoInfo.zip_addr_url"
			:autoplay="true" :muted="isSound" :loop="false" :direction="0" :controls="false"
			:show-center-play-btn="false" :enable-progress-gesture="false" :vslide-gesture-in-fullscreen="false"
			@error="playError" @play="playStart" @ended="ended" id="myVideo" object-fit="cover">
			<cover-view class="jump-over " @tap.stop="jump">{{jumpover}}</cover-view>
			<cover-view class="mask-all " @tap.stop="launchAppIndex(videoInfo)"></cover-view>
		</video> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList: [],
				autoplay: false,
				isSound: false, //是否静音播放
				duration: 500,
				jumpover: '跳过',
				isShowLoading: true,
				experience: '立即体验',
				launchType: '2', //引导图类型
				showModal: false, //协议弹窗
				video: '', //视频
				videoInfo: '', //视频信息
				count: 3,
				timer: null,
			}
		},
		onLoad() {
			this.timer = setInterval(() => {
				this.count--
				if (this.count <= 0) {
					clearInterval(this.timer)
					this.jump()
					this.count = 3
				}
			}, 1000)
			this.$Request.post(this.$api.operation.get_ads, {
				typeid: 2
			}).then(res => {
				if (res.code == 1) {
					if (res.data != '') {
						this.imageList = res.data.image;
						// this.videoInfo = res.data.video[0];
					} else {
						this.launchFlag()
					}
				}
			})
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('myVideo');
			// this.getGuide();
		},
		onUnload() {
			clearInterval(this.timer)
			this.videoContext.pause();
		},
		onHide() {
			this.videoContext.pause();
		},
		methods: {
			sliderChange(e) {
				this.currIndex = e.detail.current;
			},
			closeApp() { //取消弹框
				this.showModal = false;
			},
			// 视频播放结束
			ended() {
				console.log('页面跳转');
				this.launchFlag();
			},
			// 播放失败
			playError(e) {
				console.log('播放失败', e);
			},
			// 开始播放
			playStart(e) {
				console.log('开始播放');
			},
			// 声音操作
			onSound() {
				this.isSound = true;
				console.log(this.isSound);
			},
			offSound() {
				this.isSound = false;
				console.log(this.isSound);
			},
			jump() {
				if (!uni.getStorageSync('USERINFO').user_token) {
					uni.setStorageSync('USERINFO', {
						user_type: 1,
						id: ''
					})
				}
				this.dateJump = 0
				uni.setStorageSync('launchFlag', true)
				uni.reLaunch({
					url: '../index/index'
				});

			},
			launchAppIndex(img) {
				if (img.type == 1) {
					//外链
					// #ifdef APP-PLUS
					setTimeout(function() {
						plus.runtime.openURL(img.href);
					}, 1000);
					return
					// #endif
				} else {
					uni.navigateTo({
						url: '/' + img.href + '&page=open'
					})
					return
				}
				this.videoContext && this.videoContext.pause();
				return
				if (this.imageList && this.imageList.length == this.currIndex + 1) {
					this.launchFlag();
				} else {
					return;
				}
			},
			goxieyi(id) { //查看协议
				uni.navigateTo({
					url: '../../pagescommon/agreement?type=' + id
				})
			},
			launchFlag: function() {			
				if (!uni.getStorageSync('USERINFO').user_token) {
					uni.setStorageSync('USERINFO', {
						user_type: 1,
						id: ''
					})
				}
				this.dateJump = 0
				/**
				 * 向本地存储中设置launchFlag的值，即启动标识；
				 // */
				uni.setStorageSync('launchFlag', true)
				uni.reLaunch({
					url: '../index/index'
				});


			},
			getGuide: function() {
				this.$Request.post(this.$api.operation.get_ads, {
					typeid: 2
				}).then(res => {
					console.log(res, '=====res========');
					if (res.code == 1) {
						if (res.data != '') {
							this.imageList = res.data.image;
							this.videoInfo = res.data.video[0];
						} else {
							this.launchFlag()
						}
						// this.isShowLoading = false
						// if (res.data.video == '') {
						// 	this.launchFlag()
						// } else {}
					}
				})
			}
		}
	}
</script>
<style>
	page,
	.content {
		width: 100%;
		height: 100%;
		background-size: 100% auto;
		padding: 0;
	}

	.mask-loading {
		width: 100%;
		height: 100%;
	}

	.mask-loading .image1 {
		width: 140rpx;
		height: 140rpx;
	}

	.swiper {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		text-align: center;
		position: relative;
		display: flex;
		/* justify-content: center; */
		align-items: flex-end;
		flex-direction: column-reverse
	}

	.swiper-item-img {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}

	.swiper-item-img image {
		width: 100%;
		height: 100%;
	}

	.uniapp-img {
		height: 20%;
		background: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.jump-over,
	.experience {
		position: absolute;
		height: 50upx;
		background: rgba(0, 0, 0, 0.1);
		line-height: 50upx;
		/* padding: 0 20upx; */
		border-radius: 30upx;
		font-size: 26upx;
		padding: 0 15rpx;
		text-align: center;
		color: #FFFFFF;
		border: 1px solid rgba(0, 0, 0, 0.1);
		z-index: 999;
	}

	.jump-over {
		right: 45upx;
		top: 75upx;
	}

	.mask-all {
		width: 100vw;
		height: 90vh;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.experience {
		right: 50%;
		margin-right: -105upx;
		bottom: 0;
	}

	.ad_video {
		position: absolute;
		width: 100%;
		height: 100vh;
	}
</style>
