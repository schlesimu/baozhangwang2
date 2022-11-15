<template>
	<view class="content"></view>
</template>

<script>
	export default {
		onLoad() {
			this.$Request.post(this.$api.operation.get_ads, {
				typeid: 2
			}).then(res => {
				console.log(res,'res');
				if (res.code == 1&&res.data!='') {
					this.imageList = res.data.image;
					this.videoInfo = res.data.video[0];
					if (res.data.video == '') {
						uni.reLaunch({
							url: '../index/index'
						});
					}else{
						this.checkGuide();
					}
				}else{
					uni.reLaunch({
						url: '../index/index'
					});
				}
			})
		},
		methods: {
			checkGuide() {
				// 思路： 检测是否有启动缓存，如果没有，就是第一次启动，第一次启动就去 启动介绍页面
				// #ifndef MP-WEIXIN
				// const launchFlag = uni.getStorageSync('launchFlag');
				// if (launchFlag) {
				// 	uni.redirectTo({
				// 		url: '../index/index'
				// 	})
				// 	if(!uni.getStorageSync('USERINFO').user_token){
				// 		uni.setStorageSync('USERINFO',{user_type:1,id:''})
				// 	}

				// } else {
				uni.redirectTo({
					url: '/pages/guide/guide'
				});
				// }
				// #endif
				// #ifdef MP-WEIXIN
				uni.redirectTo({
					url: '../index/index'
				});
				// #endif
			}
		}
	};
</script>

<style></style>
