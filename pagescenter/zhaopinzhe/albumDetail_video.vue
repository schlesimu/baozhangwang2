<template>
	<view>
		<web-view :src="BASEURL+'static/albumdetail/redirect.html?aid='+this.aid+'&user_id='+user_id"></web-view>
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
			show:true,
			user_id:uni.getStorageSync('USERINFO').id
		};
	},
	onLoad(e) {
		this.video_url = e.url;
		this.aid = e.aid;
		// this.getDetail();
		// console.log('地址',this.BASEURL+'static/albumdetail/redirect.html?aid='+this.aid);
	},
	onNavigationBarButtonTap(e) { //导航右侧按钮事件
	let that=this
		uni.showModal({
			title: '确定要删除相册吗',
			success: function(res) {
				if (res.confirm) {
					that.$Request.post(that.$api.Community.delAlbum, {
						aid: that.aid,
					}).then(res => {
						if (res.code == 1) {
							uni.$emit('deletAlbum',{})
						uni.navigateBack({})
						} else {
							that.$Common.toast(res.msg);
						}
					});
				}
			}
		})
	
	},
	methods: {
		isBack() {
			//返回
			uni.navigateBack({});
		},
		getDetail() {
			//获取通知详情  getNoticedetail
			this.$Request.post(this.$api.Community.albumDetail, { aid: this.aid }).then(res => {
				if (res.code == 1) {
					this.info = res.data;
				} else {
					this.$Common.toast(res.msg);
				}
			});
		},
		fullclick(){//点击全屏播放按钮
			this.show=!this.show
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
	word-wrap:break-word;
	white-space:pre-line;
	// white-space: pre-wrap;
}
</style>
