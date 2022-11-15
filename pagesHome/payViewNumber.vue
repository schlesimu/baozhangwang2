<!-- 发布  支付页面 -->
<template>
	<view class="">
		<view class="padding">
			<view class="plr10">
				<view class=" text-df">选择购买查看简历数</view>
				<view class=" text-df">说明:
					<!-- #ifndef MP-WEIXIN -->
					<rich-text :nodes="body"></rich-text>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
					<jyf-parser :html='body'></jyf-parser>
					<!-- #endif -->
				</view>
				<view class=" flex align-center flex-wrap padding-top">
					<view class="margin-right" v-for="(item,index) in resumeNumInfo.ResumeNumData" :key='index'
						@click="choseOne(item)">
						<view class='type_item flex column align-center margin-bottom'
							:class="currentIndex==item.id?'active':''">
							<view class="">{{item.name||''}}</view>
							<view class="">{{item.money||''}}元</view>
						</view>

					</view>
				</view>
			</view>
			<view class="money flex justify-center align-center">
				<view class="flex align-center ">
					<view class="text-bold  text-center margin-right" style="font-size: 36upx;">支付金额</view>
					<view class="text-bold txt_red " style="font-size: 48upx;">￥{{ money||0 }}</view>
				</view>
			</view>
			<view class="padding">
				<view class="flex justify-between align-center  margin-bottom" v-for="(item, index) in payway"
					:key="index" @tap="chosen(index, item.paytype)">
					<view class="flex justify-start align-center">
						<image style="width: 46upx;height: 46upx;" :src="item.payPic" mode="widthFix"></image>
						<text class="margin-top-sm margin-bottom-sm margin-left">{{ item.payname }}</text>
					</view>
					<!-- <image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil.png'" mode="" v-if="index != check"></image> -->
					<image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil.png'" mode=""
						v-if="index != check"></image>
					<image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil2.png'"
						mode="widthFix" v-else></image>
					<!-- <image style="width: 40upx;height: 40upx;" :src="IMG_URL + 'static/miniwechat/chocil2.png'" mode="widthFix" v-else></image> -->
				</view>
			</view>
			<view class="btn_next" style="background-color: #1B90FF;margin-top: 200upx;" @tap="ispay">确认支付</view>
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
				payType: '', //是否显示服务费
				money: 0, //金额
				// #ifndef MP-WEIXIN
				// paytype: 'alipay',
				// #endif
				paytype: 'alipay',
				order_sn: '', //订单
				currentIndex: 1, //选择的简历份数索引
				check: '',
				IMG_URL:this.IMG_URL,
				commission: '', //佣金
				dataList: [{
					name: '1份',
					id: '1'
				}, {
					name: '5份',
					id: '2'
				}, {
					name: '10份',
					id: '3'
				}],
				body: '', //购买说明
				resumeNumInfo: '', //配置信息
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
				page: '', //认证页面不显示服务费
			};
		},
		onLoad(e) {
			this.title = e.title;
			this.getResumeNumInfo()
			console.error(e);
			this.paytype = e.payType ? e.payType : 'wxpay';
			if (e.payType == '认证') {
				uni.$emit('updatePrice')
			}
			this.page = e.page
			this.order_sn = e.order_sn;
			this.commission = e.commission;
			// console.log(this.commission);
		},
		methods: {
			chosen(index, paytype) {
				console.error(paytype);
				//选择支付方式
				this.check = index;
				this.paytype = paytype;
			},
			choseOne(item) {
				this.currentIndex = item.id
				this.money = item.money
			},
			addjob() {
				//保存
				uni.reLaunch({
					url: '../../pages/index/index'
				});
			},
			// 获取购买次数 查看次数
			getResumeNumInfo() {
				this.$Request.post(this.$api.user.getResumeNumInfo, {
					user_id: uni.getStorageSync('USERINFO').id
				}).then(res => {
					if (res.code == 1) {
						this.resumeNumInfo = res.data.resume
						this.money = this.resumeNumInfo.ResumeNumData[0].money
					} else {

					}
				});
			},
			ispay() {
				// 确认支付
				// #ifdef H5
				// uni.navigateTo({
				// 	url: '../pagescommon/pay_success?type=resume'
				// });
				// return
				// #endif
				console.error(this.paytype);
				var _self = this,
					pay_type = this.paytype;
				uni.showLoading({
					title: '请稍等'
				});
				// 获取订单接口
				this.$Request.post(this.$api.common.add_order, {
						order_type: 8,
						order_money:this.money,
						pay_type:pay_type			,
						product_id:this.currentIndex,
						payable_money:this.money
					})
					.then(res => {
						if (res.code == 1) {
							// #ifdef MP-WEIXIN
							_self.requestPayment('wxpay', res.data.order_sn);
							// #endif
							// #ifndef MP-WEIXIN
							if (pay_type == 'wxpay') {
								_self.requestPayment('wxpay', res.data.order_sn);
							} else if (pay_type == 'alipay') {
								_self.requestPayment('alipay', res.data.order_sn);
							}
							// #endif
						}
					})
				// this.order_sn = res.data.order_sn;
				
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
								orderInfo: res.data,
								success: e => {
									uni.hideLoading();
									console.log(e, 'success');
									if (e.errMsg == 'requestPayment:ok') {
										// uni.showModal({
										// 	content: '支付成功 ',
										// 	showCancel: false
										// });
										uni.redirectTo({
											url: '../pagescommon/pay_success?type=resume'
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
								appId: res.data.appId,
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
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
										url: '../pagescommon/pay_success?type=resume'
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

	.type_item {
		padding: 8upx 44upx;
		background: rgba(255, 255, 255, 1);
		border: 1px solid rgba(230, 230, 230, 1);
		opacity: 1;
		border-radius: 4rpx;
	}

	.active {
		background-color: #ecf6ff !important;
		color: #1b90ff !important;
		border: 1px solid #1b90ff;
	}
</style>
