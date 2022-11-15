<!-- 招聘者 个人空间 -->
<template>
	<view class="">
		<!-- <cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content">
				<text class="text-md">{{ title == 'fabu' ? '' : '支付订单' }}</text>
			</block>
			<block slot="right"><view class="text-sm"></view></block>
		</cu-custom> -->
		<view class="contant flex align-center justify-center column">
			<view class="pt30">
				<image :src="IMG_URL+'static/miniwechat/success.png'" mode=""></image>
			</view>
			<view class="text-center pt10 mb10" style="font-size: 36upx;">提现成功</view>
			<view class="f24 text-gray mb5">提现方式：{{account_type==2?'支付宝':'微信'}}</view>
			<view class="f24 text-gray">提现金额：￥{{money}}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '' ,//标题
			money:'',//提现金额
			account_type:'',//提现方式
			IMG_URL:this.IMG_URL,
		};
	},
	onLoad(e) {
		this.title = e.type;
		this.money=e.money
		this.account_type=e.account_type
		uni.$emit('withdraw',{})//通知提现成功
	},

	methods: {
		returnIndex(){
			uni.reLaunch({
				url:'../pages/index/index'
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
	width: 520upx;
	height: 100%;
	margin: auto;
	image{
		width: 320upx;
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
		margin: 200upx auto;
	}
}
</style>
