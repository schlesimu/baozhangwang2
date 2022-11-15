<!-- 发布  支付页面 -->
<template>
	<view class="">
		<cu-custom bgColor="text-black bg-white" :isBack="true">
			<block slot="content">
				<text class="text-md">{{ title == 'fabu' ? '发布' : '支付' }}</text>
			</block>
			<block slot="right"><view class="text-sm" style="color: #1B90FF;margin: 0upx 20upx;" @tap="addjob" v-show="title == 'fabu'">保存</view></block>
		</cu-custom>
		<view class="padding">
			<view class="money flex justify-center align-center">
				<view class="fl align-center justify-center">
					<view class="text-bold margin-bottom-sm text-center" style="font-size: 36upx;">{{ title == '发布' ? '缴纳保证金' : '支付金额' }}</view>
					<view class="text-bold txt_red " style="font-size: 48upx;" >￥{{ money }}<text class="f28" v-if="title=='fabu'">(含服务费{{commission||'0'}}元)</text></view>
				</view>
			</view>
			<view class="padding">
				<view class="flex justify-between align-center margin-top margin-bottom" v-for="(item, index) in payway" :key="index" @tap="chosen(index, item.paytype)">
					<view class="flex justify-start align-center">
						<image style="width: 46upx;height: 46upx;" :src="item.payPic" mode="widthFix"></image>
						<text class="margin-top-sm margin-bottom-sm margin-left">{{ item.payname }}</text>
					</view>
					<!-- <image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil.png'" mode="" v-if="index != check"></image> -->
					<image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil.png'" mode="" v-if="index != check"></image>
					<image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil2.png'" mode="widthFix" v-else></image>
					<!-- <image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil2.png'" mode="widthFix" v-else></image> -->
				</view>
			</view>
			<view class="btn_next" style="background-color: #1B90FF;margin-top: 400upx;" @tap="ispay">确认支付</view>
		</view>
	</view>
</template>

<script>
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js';
export default {
	mixins: [MescrollMixin], // 使用mixin
	data() {
		return {
			title: '', //标题
			payType:'',//是否显示服务费
			money: 0, //金额
			// #ifndef MP-WEIXIN
			// paytype: 'alipay',
			// #endif
			paytype: 'alipay',
			order_sn: '', //订单
			check: '',
			commission:'',//佣金
			IMG_URL:this.IMG_URL,
			payway: [
				// #ifndef MP-WEIXIN
				{
					payPic: this.IMG_URL + 'static/miniwechat/zhifubao@2x.png',
					// payPic: this.IMG_URL + 'static/miniwechat/zhifubao.png',
					payname: '支付宝',
					paytype: 'alipay',
					id: 0
				},
				// #endif

				{
					// payPic: this.IMG_URL + 'static/miniwechat/weixinpay.png',
					payPic: this.IMG_URL + 'static/miniwechat/wexin@2x.png',
					payname: '微信',
					paytype: 'wxpay',
					id: 1
				}
			],
			page:'',//认证页面不显示服务费
		};
	},
	onLoad(e) {
		this.title = e.title;
		this.payType = e.payType;
		if(e.payType=='认证'){
			uni.$emit('updatePrice')
		}
		this.page=e.page
		this.money = e.price;
		this.order_sn = e.order_sn;
		this.commission = e.commission;
		// console.log(this.commission);
	},
	methods: {
		chosen(index, paytype) {
			//选择支付方式
			this.check = index;
			this.paytype = paytype;
		},
		addjob() {
			//保存
			uni.reLaunch({
				url: '../../pages/index/index'
			});
		},

		ispay() {
			//确认支付
			// uni.navigateTo({
			// 	url:'../../pagescommon/pay_success?type==fabu'
			// });
			// return
			var _self = this,
				pay_type = this.paytype;
			uni.showLoading({
				title: '请稍等'
			});
			// this.order_sn = res.data.order_sn;
			// #ifdef MP-WEIXIN
			_self.requestPayment('wxpay', this.order_sn);
			// #endif
			// #ifndef MP-WEIXIN
			if (pay_type == 'wxpay') {
				_self.requestPayment('wxpay', this.order_sn);
			} else if (pay_type == 'alipay') {
				_self.requestPayment('alipay', this.order_sn);
			}
			// #endif
		},
		requestPayment(type, order_sn) {
			console.log(type);
			if (type == 'wxpay') {
				var url = this.$api.common.wechatpay;
			} else if (type == 'alipay') {
				var url = this.$api.common.alipay;
			}
			this.$Request
				.post(url, {
					order_sn: order_sn,
					// #ifdef MP-WEIXIN
					ismini: 1
					// #endif
				})
				.then(res => {
					if (res.code == 1) {
						// #ifdef APP-PLUS
						uni.requestPayment({
							provider: type,
							 orderInfo:res.data,
							success: e => {
								uni.hideLoading();
								console.log(e, 'success');
								if (e.errMsg == 'requestPayment:ok') {
									// uni.showModal({
									// 	content: '支付成功 ',
									// 	showCancel: false
									// });
									uni.redirectTo({
										url: '../../pagescommon/pay_success?type==fabu'
									});
								}
							},
							fail: e => {
								uni.hideLoading();
								console.log('fail', e);
								this.$Common.toast('支付失败')
							},
							complete: () => {
								uni.hideLoading();
							}
						});
						// #endif
						// #ifdef MP-WEIXIN
						uni.requestPayment({
							provider: 'wxpay',
							appId:res.data.appId,
							timeStamp: res.data.timeStamp,
							nonceStr: res.data.nonceStr,
							package: res.data.package,
							signType:res.data.signType,
							paySign: res.data.paySign,
							success: e => {
								uni.hideLoading();
								console.log(e, 'success');
								if (e.errMsg == 'requestPayment:ok') {
									// uni.showModal({
									// 	content: '支付成功 ',
									// 	showCancel: false
									// });
									uni.reLaunch({
										url: '../../pagescommon/pay_success?type==fabu'
									});
								}
							},
							fail: e => {
								uni.hideLoading();
								console.log('fail', e);
								this.$Common.toast('支付失败')
							},
							complete: () => {
								uni.hideLoading();
							}
						});
						// #endif
						
					}
				});
		}
	}
};
</script>

<style>
page {
	background-color: #fff;
	height: 100%;
}
.money {
	padding: 100upx 0;
}
</style>
