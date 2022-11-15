<template>
	<!-- 置顶规则 -->
	<view class="pb10">
		<view class="toppic">
			<image :src="pic || ''" mode="aspectFill"></image>
		</view>
		<view class="padding">
			<view class="text-bold padding-tb text-lg">置顶规则</view>
			<!-- <view class="text-df" style="color: #666666;">{{ role }}</view> -->
			<text v-html="role" class="text-666 text-df"></text>
		</view>
		<view class="">
			<view class="btn_next bg-theme" style="font-size: 28upx;margin-top: 20upx;" @tap="applyTop">申请置顶</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: '', //规则
				pic: this.IMG_URL + 'static/miniwechat/toppic.png', //图片
				aid: '', //职位id
			};
		},
		onLoad(e) {
			this.aid = e.aid
			this.getInfomation()

		},
		methods: {
			getInfomation() {
				this.$Request.post(this.$api.common.agreenment).then(res => {
					if (res.code == 1) {
					this.role=res.data.top_rules
					this.pic=res.data.top_rules_img
					}
				});
			},
			applyTop() { //申请置顶   applyTop
				this.$Request.post(this.$api.msg.applyTop, {
					aid: this.aid
				}).then(res => {
					this.$Common.toast(res.msg)
					uni.$emit('applyTop', {})
					if (res.code == 1) {
						setTimeout(() => {
							uni.navigateBack({})
						}, 500)
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.toppic {
		width: 100%;
		height: 423upx;
		background-color: #F7F7F7;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
