<!-- 招聘者 个人空间 -->
<template>
	<view class="">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content">
				<text class="text-md">{{ title == 'fabu' ? '' : '支付订单' }}</text>
			</block>
			<block slot="right"><view class="text-sm"></view></block>
		</cu-custom>
		<view class="contant">
			<view class="padding-tb">
				<image :src="IMG_URL+'static/miniwechat/success.png'" mode=""></image>
			</view>
			<view class="text-center" style="font-size: 36upx;">付款成功</view>
			<view class="btn_return" style="margin-top: 200upx;" @tap='returnIndex'>				返回首页			</view>
			<view class="btn_return btn1"  @tap='lookResume'>				查看简历			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '' ,//标题
			IMG_URL:this.IMG_URL,
		};
	},
	onLoad(e) {
		this.title = e.type;
	},

	methods: {
		returnIndex(){
			uni.removeStorageSync('PageCur');
			uni.reLaunch({
				url:'../pages/index/index'
			})
		},
		lookResume(){
			uni.redirectTo({
				url:'../pagesHome/resumeDatabase'
			})
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #fff;
}
.contant{
	width: 320upx;
	height: 100%;
	margin: auto;
	image{
		width: 100%;
		height:320upx ;
	}
	.btn_return{
		width:320upx;
		height:88upx;
		border:1px solid #666;
		border-radius:4upx;
		color: #666666;
		font-size: 28upx;
		text-align: center;
		line-height: 88upx;
		margin: 30upx auto;
	}
	.btn1{
		border:1px solid #50AEFF;
		color: #50AEFF;
	}
}

</style>
