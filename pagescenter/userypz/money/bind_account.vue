<template>
	<view>
		<view class="cu-list menu brt_e">
			<!-- #ifndef MP-WEIXIN -->
			<view @tap="toPage(2)" class="cu-item arrow">
				<view class="content">
					<!-- <image class="icon" src="../../../static/images/zhifubao.png" mode=""></image> -->
					<text>支付宝</text>
				</view>
			</view>
			<!-- #endif -->
			
			<view @tap="toPage(1)" class="cu-item arrow">
				<view class="content">
					<!-- <image class="icon" src="../../../static/images/weixin.png" mode=""></image> -->
					<text>微信</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				money:'',//
			};
		},
		onLoad(e) {
			this.money=e.money
		},
		methods:{
			toPage: function(page) { //跳转详情，判断是否登录
				const userInfo = uni.getStorageSync('USERINFO');
				if (!userInfo) {
					
					// #ifndef MP-WEIXIN
					uni.navigateTo({
						url: '../../pagessignup/login'
					});
					// #endif
					
					// #ifdef MP-WEIXIN
					uni.navigateTo({
						url: '/pagescenter/wechat/wxlog'
					});
					// #endif
				} else {
					uni.navigateTo({
						url: 'bind_alipay?type='+page
					});
				}
			},
		}
	}
</script>

<style lang="scss">
.icon{
	width: 50rpx;
	height: 50rpx;
}
</style>
