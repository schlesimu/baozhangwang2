<template>
	<view>
		<!-- <web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/web-view.html"></web-view> -->
		<view class="content">
			<video class="controls-play videos" :src="info.video" :show-mute-btn="true" controls autoplay :muted="vioceOff"
			 @fullscreenchange='fullclick'>
				<cover-view class="text-white text-sm mtb10 info" v-show="show">{{ info.update_time }}</cover-view>
				<cover-view class=" text-white info ptb10" v-show='show'>{{ info.title }}</cover-view>
				<cover-view class="text-df mtb10  text-white info" v-show='show'>{{ info.describe }}.</cover-view>
				<!-- <cover-image :src="IMG_URL + 'static/miniwechat/return.png'" mode="" class="isback ml10" @tap="isBack" :style="{ top: CustomBar + 'upx' }"></cover-image>
				<cover-image
					v-if="!vioceOff"
					:src="IMG_URL + 'static/miniwechat/voiceon.png'"
					mode=""
					class="voices margin-right-sm"
					@tap="contralVoice"
					:style="{ top: CustomBar + 'upx' }"
				></cover-image>
				<cover-image
					v-else
					:src="IMG_URL + 'static/miniwechat/voiceoff.png'"
					mode=""
					class="voices margin-right-sm"
					@tap="contralVoice"
					:style="{ top: CustomBar + 'upx' }"
				></cover-image> -->

			</video>
			<!-- <view class="">
				<view class="text-gray text-sm mtb10">{{ info.update_time }}</view>
				<view class="title overflow-two">{{ info.title }}</view>
				<view class="text-df mtb10">{{info.describe}}	</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				video_url: '',
				vioceOff: false, //静音
				IMG_URL:this.IMG_URL,
				CustomBar: this.CustomBar, //头部导航
				show: true,
				pages: '', //zhaopin 招聘端显示删除
			};
		},
		onLoad(e) {
			this.video_url = e.url;
			this.aid = e.aid;
			this.user_id = e.user_id
			this.pages = e.pages
			this.getDetail();
		},

		methods: {
			isBack() {
				//返回
				uni.navigateBack({});
			},
			getDetail() {
				//获取通知详情  getNoticedetail
				this.$Request.post(this.$api.Community.albumDetail, {
					aid: this.aid,
					user_id: this.user_id
				}).then(res => {
					if (res.code == 1) {
						this.info = res.data;
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			fullclick() { //点击全屏播放按钮
				this.show = !this.show
			},
			contralVoice() {
				//控制声音
				this.vioceOff = !this.vioceOff;
			}
		}
	};
</script>

<style lang="scss">
	page {
		min-height: 100%;
		background: #ffffff;
	}

	.content {
		position: relative;
	}

	.imgs {
		max-width: 100%;
		height: auto;
		display: block;
	}

	.videos {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.isback {
		width: 40upx;
		height: 40upx;
		position: absolute;
		left: 20upx;
	}

	.cons {
		padding: 32rpx;
	}

	.voices {
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 20upx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.info {
		position: relative;
		bottom: -79%;
		left: 0upx;
		right: 0;
		z-index: 9999;
		width: 686upx;
		margin: auto;
		height: auto;
		word-break: break-all;
		word-wrap: break-word;
		white-space: pre-line;
		// white-space: pre-wrap;
	}
</style>
