<template>
	<view class="plr16">
		<view class="zyby-img-upload-common auth-img-item " :class="{'img-item-special': !videoUrl}" v-if="video_url==''">
			<div @tap="ChooseVideo" class='flex-perfect-center flex alcenter justify-center'>
				<slot name="image">
					<image :src="IMG_URL + 'static/miniwechat/icon-add.png'" style="width: 120rpx;height: 120rpx;"></image>
				</slot>
				<div class="mt10">
					<slot>点击上传</slot>
				</div>
			</div>
			<progress class="upload-progress" v-if="progress > 0" :percent="progress" active stroke-width="3"></progress>
			<!-- <view class="mt10" v-if="progress > 0" >
				上传进度：{{progress}}%
			</view> -->
		</view>
		<!-- 视频 -->
		<view class="videobox mt30" v-if="video_url!=''">
			<video :src="video_url" controls style="width: 100%;"></video>
			<view class="cu-tag bg-red" @tap.stop="DelImg"><text class="cuIcon-close"></text></view>
			<!-- <image src="../../static/images/user/delete.png" class="img-delete" mode="" @tap.stop="DelImg"></image> -->
		</view>
		
		
		<!-- 确认按钮 -->
		<view class="footer mt88">
			<button class="btn_normal " @click="uoload_video">确认</button>
		</view>
		
	</view>
</template>

<script>
	import OSSUtil from '../../common/oss/ossUtil.js'
	import md5 from '../../common/oss/md5.js'
	export default {
		props: {
			authId: String,
			videoUrl: String,
			deleteFlag: Boolean,
		},
		data() {
			return {
				progress: 0,
				IMG_URL:this.IMG_URL,
				imgData: {
					visible: false,
					actions: this.imgActions
				},
				video_url: '',//视频路径
			}
		},
		methods: {
			DelImg(){
				this.progress=0;
				this.video_url = '';
			},
			// 接口获取签名
			get_sign(filemd5, filesize, filename) {
				return new Promise((resolve, reject) => {
					this.$Request.post(this.$api.common.ossVideo, {
						filemd5: filemd5,
						filesize: filesize,
						filename: filename
					}).then(res => {
						if (res.code == 200) {
							resolve(res.data.aliyunData)
						} else {

						}
					})
				})
			},
			// 选择视频
			async ChooseVideo() {
				let imageSrc = await OSSUtil.getVideo();
				let sign = await OSSUtil.get_STS()
				let fileName = OSSUtil.getFileName(imageSrc);
				let filemd5 = md5(fileName);
				let data = await this.get_sign(filemd5, sign.filesize, fileName);
				uni.showLoading({
					title:'上传中...',
					mask:true
				});
				let uploadTask = uni.uploadFile({
					url: sign.host,
					filePath: imageSrc,
					fileType: 'video',
					name: 'file',
					formData: {
						'key': data.key,
						'policy': data.policy,
						'OSSAccessKeyId': data.OSSAccessKeyId,
						'success_action_status': '200', //让服务端返回200,不然，默认会返回204
						'signature': data.signature,
					},
					success: (res) => {
						if(res.statusCode==200){
							uni.showToast({
								title: '上传成功',
								icon: 'none',
								duration: 1000
							});
							this.video_url = sign.host + '/' + data.key;
						};
					},
					fail: (err) => {
						uni.showModal({
							content: err.errMsg,
							showCancel: false
						});
					},
					complete:()=>{
						uni.hideLoading()
					}
				});
				uploadTask.onProgressUpdate((res) => {
					// this.$Common.toast('上传进度'+res.progress+'%')
					this.progress = res.progress;
				});

			},
			// 上传接口
			uoload_video() {
				uni.$emit('video',{msg:this.video_url})
				if(this.video_url){
					uni.navigateBack({})
				}else{
					this.$Common.toast('请选择视频')
				}
			}
		}
	}
</script>

<style  lang="less">
	.videobox{
		position: relative;
		margin: 0 30upx;
	}
	.img-delete{
		position: absolute;
		top: -10rpx;
		right: -10rpx;
	}
	.zyby-img-upload-common {
		margin: 0 30upx;
		height: 450rpx;
		// width: 100%;
		margin-top: 26rpx;
	}

	.auth-img-item {
		position: relative;

		>div:first-child {
			height: 100%;
			flex-direction: column;

			image {
				// .square-hw(46)
			}

			.text-desc {
				margin-top: 20rpx;
				font-family: PingFangSC-Regular;
				font-size: 26rpx;
				// color: @base-finish-color-deep;
			}
		}

		.exist-img {
			width: 100%;
			height: 100%;
		}

		.upload-progress {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
		}


	}

	.img-delete {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 10rpx;
		right: 10rpx;
	}

	.img-item-special {
		border: 1px dashed #CCCCCC;
		border-radius: 6rpx;
	}
	.cu-tag{
		position: absolute;
		bottom: 26upx;
		right: 10upx;
		z-index: 10;
	}
</style>
