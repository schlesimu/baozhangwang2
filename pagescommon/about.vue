<template>
	<!-- 关于我们 -->
	<view class="">
		<view class="header " style="">
			<view class="bg-gray radius " style="width: 213upx; height: 233upx;margin: auto;overflow: hidden;">
				<image :src="data.logo" mode="aspectFill"></image>
			</view>
			<view class=" text-df padding" style="color: #666666;">
				<jyf-parser :html="data.introduce" ref="article"></jyf-parser>
			</view>
		</view>
		<view class="footer">
			<view class=" text-df mb20">
				<text> 7*24小时客服电话： </text>
				<text style="color: #FA6B5A;" @tap="call"> {{data.mobile}}</text>
			</view>
			<view class=" text-df">
				客服微信：{{data.qq}}
			</view>
		</view>
	</view>
</template>

<script>
import jyfParser from '@/components/jyf-parser/jyf-parser';
export default {
	components: {
	  jyfParser
	},
		data(){
			return{
				data:{}
			}
		},
		onLoad() {
			this.getMsg()
		},
		onShow() {
			
		},
		methods:{
			getMsg(){
				this.$Request.post(this.$api.common.aboutUs).then(res => {
					this.data = res.data
				
				})
			},
			call(){//拨打电话
				uni.makePhoneCall({
				    phoneNumber: this.data.mobile 
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.header {
		width: 100%;
		height: 100%;
		margin-top: 40upx;
		image {
			width: 213upx;
			height: 233upx;
			margin: auto;
		}
	}
	.footer{
		margin-top:131rpx;
		padding: 0 30upx;
	}
</style>
