<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<!-- <cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content"><text class="" style="font-size: 36upx;">播放视频</text></block>
			<block slot="right" >
				<view class="voices margin-right-sm" @tap="contralVoice">
					<image v-if="!vioceOff" :src="IMG_URL + 'static/miniwechat/camera_video_vioceon.png'" mode=""></image>
					<image v-else :src="IMG_URL + 'static/miniwechat/camera_video_vioceoff.png'" mode=""></image>
				</view>
			</block>
		</cu-custom> -->
		<!-- #endif -->
		<view class="content">
			<video class="controls-play videos" :src="video_url" :show-mute-btn="true" controls autoplay :muted="vioceOff">
				<!-- <cover-view class="voices margin-right-sm" @tap="contralVoice" :style="{ top: CustomBar * 2 + 'upx' }"> -->
					<cover-image  :src="IMG_URL + 'static/miniwechat/return.png'" mode="" class="isback ml10" @tap="isBack" :style="{ top: CustomBar + 'rpx' }"></cover-image>
					<!-- #ifndef MP-WEIXIN -->
					<cover-image v-if="!vioceOff" :src="IMG_URL + 'static/miniwechat/voiceon.png'" mode="" class="voices margin-right-sm" @tap="contralVoice" :style="{ top: CustomBar + 'upx' }"></cover-image>
					<cover-image v-else :src="IMG_URL + 'static/miniwechat/voiceoff.png'" mode="" class="voices margin-right-sm" @tap="contralVoice" :style="{ top: CustomBar + 'upx' }"></cover-image>
				<!-- </cover-view> -->
				<!-- #endif -->
			</video>
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
			CustomBar: this.CustomBar ,//头部导航
			IMG_URL:this.IMG_URL,
		};
	},
	onLoad(e) {
		this.video_url = e.url;
		console.log(e);
	},
	methods: {
		isBack(){//返回
			uni.navigateBack({
				
			})
		},
		getDetail(id) {
			this.$Request
				.post(this.$api.user.get_teachDetail, {
					aid: id
				})
				.then(res => {
					if (res.code == 1) {
						this.info = res.data.list;
						// if (this.info.type == 3) {
						// 	this.info.content = this.info.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
						// }
					}
				});
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
.isback{
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
</style>
