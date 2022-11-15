<!-- 相册详情 -->
<template>
	<view class="padding">
		<view style="background-color: #F7F7F7;">
			<image @tap='yulan(plant_detail.url)' style="width: 100%;" :src="plant_detail.url" mode="widthFix"></image>
		</view>
		<view class="text-gray text-sm mtb10">{{ plant_detail.update_time }}</view>
		<view class="title overflow-two">{{ plant_detail.title }}</view>
		<view class="text-df mtb10">
			<!-- selectable="true" -->
			<text> {{plant_detail.describe}}</text> </view>
	</view>
</template>

<script>
	// import jyfParser from '@/components/jyf-parser/jyf-parser';
	export default {
		components: {
			// jyfParser
		},
		data() {
			return {
				plant_detail: {},
				id: 17,
				lon: '',
				lat: '',
				user_id: uni.getStorageSync('USERINFO').id
			};
		},
		onLoad(e) {
			uni.showLoading({})
			this.aid = e.aid;
			this.getDetail();
		},
		// onNavigationBarButtonTap(e) { //导航右侧按钮事件  
		// let that=this
		// 	uni.showModal({
		// 		title: '确定要删除相册吗',
		// 		success: function(res) {
		// 			if (res.confirm) {
		// 				that.$Request.post(that.$api.Community.delAlbum, {
		// 					aid: that.aid,
		// 				}).then(res => {
		// 					if (res.code == 1) {
		// 						uni.$emit('deletAlbum',{})
		// 					uni.navigateBack({})
		// 					} else {
		// 						that.$Common.toast(res.msg);
		// 					}
		// 				});
		// 			}
		// 		}
		// 	})

		// },

		methods: {
			getDetail() {
				//获取通知详情  getNoticedetail
				this.$Request.post(this.$api.Community.albumDetail, {
					aid: this.aid,
					user_id: this.id
				}).then(res => {
					uni.hideLoading()
					if (res.code == 1) {
						this.plant_detail = res.data;
					} else {
						this.$Common.toast(res.msg);
					}
				});
			},
			yulan(pic) {
				this.$Common.lookImg(pic)
			},
		}
	};
</script>

<style>
	page,
	body {
		background: #fff !important;
	}

	.title {
		font-size: 32upx;
		font-weight: bold;
		line-height: 1.2;
		letter-spacing: 1;
		margin-bottom: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		line-clamp: 2;
	}
</style>
