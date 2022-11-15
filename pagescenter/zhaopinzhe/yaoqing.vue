<template>
	<view>
		<!-- <cu-custom bgColor=" text-white" :isBack="true">
			<block slot="content"><view class="text-white text-bold">分享码</view></block>
		</cu-custom> -->
		<view id="list " style="padding-top: 120upx;">
			<view class="my_invite_box">
				<view class="my_invite">
					<view class="qrimg" @longtap="download">
						<image :src="qrcodeUrl" mode=""></image>
					</view>
					<view @tap="shareCompany" class="ewm_share">
						<view>立即分享</view>
					</view>
					<view @tap="saveQrcode" class="ewm_down">
						<view>保存图片到相册</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 分享的弹窗 -->
		<view class="cu-modal bottom-modal" @tap="showScare = false" :class="showScare ? 'show' : ''">
			<view class="cu-dialog" style="border-radius: 50upx 50upx 0 0;">
				<view class="cu-bar bg-white">
					<view class="action text-green"></view>
					<view class="">分享方式</view>
					<view class="action " @tap="showScare = false">
						<image :src="IMG_URL + 'static/miniwechat/cha.png'" style="width: 40upx;height: 40upx;" mode="aspectFill"></image>
					</view>
				</view>
				<view class="">
					<view class="cu-list grid col-2 plr40">
						<view @tap="shareTap(item)" class="cu-item align-center" v-for="(item, index) in providerList" :key="index">
							<image class="share_icon" :src="item.img" mode="aspectFit"></image>
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				TabCur: 1,
				scrollLeft: 0,
				list: [],
				code: 'H2F2T2G',
				lon: '', //
				lat: '', //
				ifShow: true,
				user_nickname: '',
				companyInfo: '', //公司信息
				IMG_URL:this.IMG_URL,
				/* 分享的配置 */
				showScare: false, //是否显示分享弹窗
				image: this.IMG_URL + 'static/miniwechat/logo.png',
				providerList: [{
						name: '微信',
						id: 'weixin',
						img: this.IMG_URL + 'static/miniwechat/weixin.png',
						fSort: 0
					},
					{
						name: '朋友圈',
						id: 'weixin',
						type: 'WXSenceTimeline',
						img: this.IMG_URL + 'static/miniwechat/pengyouquan.png',
						fSort: 1
					}
				],
				qrcodeUrl: ''
			};
		},
		onLoad() {
			uni.showLoading({})
			_self = this;
			this.get_user_info();
			
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: this.companyInfo.company_name,
				path: 'pagesHome/index/job_detail?id=' + uni.getStorageSync('roleinfo').info.aid + '&zhaopin=zhaopin' + '&lon=' +
					this.lon + '&lat=' + this.lat,
			}
		},
		methods: {
			get_user_info() {
				//获取我的邀请码
				this.$Request
					.post(this.$api.operation.getCompanycode, {
						company_id: uni.getStorageSync('roleinfo').info.aid
					})
					.then(res => {
						uni.hideLoading()
						if (res.code == 1) {
							this.companyInfo = res.data.company
							this.qrcodeUrl = res.data.url_Qrcode;
							this.lon = res.data.company.lon
							this.lat = res.data.company.lat
						}
					}).catch(err=>{
						this.$Common.toast('网络错误，请退出重试');
					});
			},
			shareCompany() { //立即分享
				// #ifdef MP-WEIXIN
				uni.showModal({
					title: '请使用右上角按钮进行分享',
					icon: 'none'
				})
				// #endif
				// #ifndef MP-WEIXIN
				this.showScare = true
				// #endif
			},
			saveQrcode() {
				//保存图片到图库
				let that = this;
				uni.downloadFile({
					url: that.qrcodeUrl,
					success: res => {
						let tempFilePath = res.tempFilePath;
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: tempFilePath,
								success: res2 => {
									uni.hideLoading();
									this.$Common.toast('保存成功');
								},
								fail: res => {
									uni.hideLoading();
									this.$Common.toast('保存失败,请确认已授权');
								}
							});
						} else {
							this.$Common.toast('二维码下载失败,请稍后重试');
						}
					},
					fail: err => {
						this.$Common.toast('二维码下载失败,请稍后重试');
						console.log(err);
					}
				});
			},
			shareTap(e) {
				//点击去分享
				if (e.fSort == 0) {
					uni.share({
						provider: 'weixin',
						scene: 'WXSceneSession', //微信
						type: 5,
						imageUrl: this.qrcodeUrl,
						title: this.companyInfo.company_name,
						miniProgram: {
							id: 'gh_66b0749ac265',
							// path: 'pages/index/index',
							// path: `pagesHome/postDetail?aid=${this.aid}`,
							path: 'pagesHome/index/job_detail?id=' + uni.getStorageSync('roleinfo').info.aid + '&zhaopin=zhaopin' +
								'&lon=' + this.lon + '&lat=' + this.lat,
							type: 0,
							webUrl: 'http://uniapp.dcloud.io'
						},
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				} else {
					uni.share({
						provider: "weixin",
						scene: "WXSenceTimeline", //朋友圈
						type: 0,
						href: this.qrcodeUrl,
						title: this.companyInfo.company_name,
						summary: "我正在使用人民保障网，赶紧跟我一起来体验吧！",
						imageUrl: this.qrcodeUrl,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			},
			compress(img) {
				//压缩图片 图文分享要求分享图片大小不能超过20Kb
				console.log('开始压缩');
				return new Promise(res => {
					var localPath = plus.io.convertAbsoluteFileSystem(img.replace('file://', ''));
					console.log('after' + localPath);
					// 压缩size
					plus.io.resolveLocalFileSystemURL(
						localPath,
						entry => {
							entry.file(file => {
								// 可通过entry对象操作图片
								console.log('getFile:' + JSON.stringify(file));
								if (file.size > 20480) {
									// 压缩后size 大于20Kb
									plus.zip.compressImage({
											src: img,
											dst: img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG'),
											width: '10%',
											height: '10%',
											quality: 1,
											overwrite: true
										},
										event => {
											console.log('success zip****' + event.size);
											let newImg = img.replace('.jpg', '2222.jpg').replace('.JPG', '2222.JPG');
											res(newImg);
										},
										function(error) {
											uni.showModal({
												content: '分享图片太大,需要请重新选择图片!',
												showCancel: false
											});
										}
									);
								}
							});
						},
						e => {
							console.log('Resolve file URL failed: ' + e.message);
							uni.showModal({
								content: '分享图片太大,需要请重新选择图片!',
								showCancel: false
							});
						}
					);
				});
			},
			download() {
				uni.showLoading();
				uni.downloadFile({
					url: this.qrcodeUrl,
					success: res => {
						let tempFilePath = res.tempFilePath;
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: tempFilePath,
								success: res2 => {
									uni.hideLoading();
									this.$Common.toast('保存成功');
								},
								fail: res => {
									uni.hideLoading();
									this.$Common.toast('保存失败,请确认已授权');
								}
							});
						} else {
							this.$Common.toast('二维码下载失败,请稍后重试');
						}
					},
					fail: err => {
						this.$Common.toast('二维码下载失败,请稍后重试');
						console.log(err);
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	page {
		width: 100%;
		height: 100%;
	}

	.bg-f9 {
		background-color: #f9f9f9;
	}

	.nav {
		margin-bottom: 20upx;
	}

	.nav .cu-item.cur {
		position: relative;
		border-bottom: 0;
	}

	.nav .cu-item.cur::after {
		content: '';
		display: inline-block;
		width: 80upx;
		height: 8upx;
		border-radius: 4upx;
		background: #f37b1d;
		position: absolute;
		bottom: 2px;
		left: 50%;
		transform: translateX(-50%);
	}

	#list {
		/* background: #fff; */
	}

	.list {
		/* // width: 98%;
		// margin-left: 2%; */
		background: #fff;
		height: 150upx;
		padding: 0upx 25upx;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid #eee;
	}

	.title:nth-of-type(1) {
		color: #333;
		font-size: 28upx;
	}

	.title:nth-of-type(2) {
		font-size: 28upx;
		line-height: 30upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.content {
		font-size: 24upx;
		line-height: 24upx;
		color: #999 !important;
	}

	.qrimg {
		text-align: center;
		width: 100%;
		height: 418upx;
		border-radius: 20upx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.my_invite {
		margin: 0 auto;
		width: 418upx;
	}

	.my_invite_box {
		padding-top: 1upx;
	}

	/* .my_invite image {
		display: block;
		width: 350rpx;
		height: 420rpx;
		margin: 0 auto 20upx;
		padding-top: 70rpx;
	} */

	.my_invite_child {
		text-align: center;
		line-height: 110rpx;
		font-size: 30rpx;
	}

	.my_invite_child>text:nth-of-type(2) {
		margin-left: 30rpx;
		color: #50aeff;
	}

	.ewm_down {
		height: 80upx;
		width: 418upx;
		line-height: 80upx;
		border-radius: 40px;
		text-align: center;
		background: #50aeff;
		color: #fff;
		margin: 0 auto;
	}

	.ewm_share {
		height: 80upx;
		width: 418upx;
		line-height: 80upx;
		border-radius: 40px;
		text-align: center;
		border: 2upx solid #50aeff;
		margin: 80rpx auto 30rpx;
		color: #50aeff;
	}

	.numberCode {
		/* background: #fff; */
		margin: 0 25rpx;
	}

	.numberCode>text {
		color: #999;
		margin-top: 20rpx;
		line-height: 80rpx;
	}

	.code_box {
		height: 70rpx;
		line-height: 70rpx;
		background: #fff;
		flex-shrink: 0;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.code_box>view {
		flex-shrink: 0;
		width: 20%;
		text-align: center;
		background: rgb(236, 84, 19);
		color: #fff !important;
	}

	.code_box>input {
		flex-shrink: 0;
		width: 80%;
		height: 100%;
		padding-left: 30rpx;
	}

	.share_icon {
		width: 88rpx;
		height: 88rpx;
	}

	.cu-list.grid>.cu-item:after {
		content: '';
		width: 0;
		height: 0;
	}
</style>
