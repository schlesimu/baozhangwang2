<template>
	<view>
		<view class="content">
			<!-- <view>
				<image class="imgs" v-for="(item, index) in info.images" :key="index" :src="item" mode="" v-if="info.type && info.type == 1"></image>
			</view> -->
			<video class="controls-play videos" :src="video_url" controls autoplay></video>
			<!-- <view class="cons" v-if="info.type && info.type == 3">
				<rich-text :nodes="info.content"></rich-text>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				info: {},
				video_url:''
			}
		},
		onLoad(e) {
			this.video_url = e.url
		},
		methods:{
			getDetail(id) {
				this.$Request.post(this.$api.user.get_teachDetail,{
					aid: id
				}).then(res => {
					if (res.code == 1) {
						this.info = res.data.list;
						// if (this.info.type == 3) {
						// 	this.info.content = this.info.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;"');
						// }
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		min-height: 100%;
		background: #FFFFFF;
	}
	.imgs{
		max-width:100%;
		height:auto;
		display:block;
	}
	.videos{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.cons{
		padding: 32rpx;
	}
</style>
