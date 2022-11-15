<!-- 提现 -->
<template>
	<view class="tixian_box">
		<view class="padding ">
			<view class="bg-white box ">
				<view class="">
					<view class="">提现金额</view>
					<view class="flex align-center input_box">
						<text style="margin-right:22upx">￥</text>
						<input type="number" placeholder="请输入" v-model="money"
							placeholder-style="color:#BFBFBF;font-size:32upx;">
					</view>
				</view>
				<view class="pt10 flex align-center justify-between">
					<view class="f24 text_999">
						当前金额：<text class="text_1b9">￥{{total_money}}</text>
					</view>
					<view class="f24 text_999" @tap='all'>全部提现</view>
				</view>
				<view class="f24 text_1b9 pt10">					每次提现不能低于一元哦				</view>
			</view>

		</view>
		<view class="padding">
			<view class=" bg-white plr15">
				<view class="cu-list menu">
					<radio-group class="block" @change="RadioChange" color='#1B90FF'>
						<view class="cu-item cu-form-group">
							<view class="flex align-center wxpay">
								<image class="png" :src="IMG_URL+'static/miniwechat/wexin@2x.png'" mode=""></image>
								<view class="">微信</view>
							</view>
							<view class="content"
								style="display: flex;justify-content: space-between;align-items: center;">
								<radio :class="paytype == 'wxpay' ? 'checked' : ''"
									:checked="paytype == 'wxpay' ? true : false" value="wxpay"
									style="transform:scale(0.7)" color="#1B90FF"></radio>
							</view>
						</view>
						<view class="cu-item cu-form-group">
							<view class="flex align-center alipay">
								<image class="png" :src="IMG_URL+'static/miniwechat/zhifubao@2x.png'" mode=""></image>
								<view class="">支付宝</view>
							</view>
							<view class="content"
								style="display: flex;justify-content: space-between;align-items: center;">
								<radio :class="paytype == 'alipay' ? 'checked' : ''"
									:checked="paytype == 'alipay' ? true : false" value="alipay"
									style="transform:scale(0.7);color:#1B90FF"></radio>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
		</view>

		<view class="btn_next bg_1b9" style="position: absolute;bottom: 10%;left: 0 ;right: 0;margin: auto;"
			@tap="goPage">提交</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				money: '', //输入的金额
				paytype: 'wxpay',
				IMG_URL:this.IMG_URL,
				account_type: 1,
				rule: {},
				bind_account: 0, //未绑定提现账号
				total_money: 0, //全部余额
				devicetype: 0, //0代表安卓1代表苹果
			};
		},
		// computed: {
		// 	i18n() {
		// 		return this.$t('Recharge')
		// 	}
		// },
		onLoad(option) {
			_self = this;
			const res = uni.getSystemInfoSync();
			if (res.platform != "android") {
				_self.devicetype = 1
			}
			console.log(_self.devicetype)
			this.get_wallet_info();
			this.acount()
			uni.$on('withdraw', () => { //监听提现成功
				this.get_wallet_info();
			})
		},
		onUnload() {
			uni.$off('withdraw')
		},
		methods: {
			RadioChange(e) {
				//切换支付方式
				this.paytype = e.detail.value;
				if (this.paytype == 'alipay') {
					this.account_type = 2
				} else if (this.paytype == 'wxpay') {
					this.account_type = 1
				}
				this.acount()
			},
			// 获取金额信息
			get_wallet_info() {
				this.$Request
					.get(this.$api.money.get_my_money)
					.then(res => {
						if (res.code == 1) {
							this.total_money = res.data.user_money;
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							});
						}
					});
			},
			acount() { //获取绑定的提现账号
				this.$Request
					.get(this.$api.money.get_withdraw_account, {
						account_type: this.account_type
					})
					.then(res => {
						if (res.code == 1) {
							console.log(res.data);
							this.bind_account = 1

						} else {
							this.bind_account = 0

						}
					});
			},
			get_recharge_rule() {
				this.$Request.get(this.$api.money.get_recharge_rule, {
					group: this.devicetype
				}).then(res => {
					if (res.code == 1) {
						res.data.map(item => {
							item['checked'] = false
							item['hot'] = false
						})
						_self.rule = res.data;
						if (this.devicetype == 1) {
							_self.ChooseCheckboxs(_self.rule[0], 0)
						}
					}
				});
			},
			ChooseCheckboxs(item, index) {
				_self.rule.map((item, indexs) => {
					if (index == indexs) {
						item.checked = item.checked ? false : true
						item.hot = item.hot ? false : true
					} else {
						item.checked = false
						item.hot = false
					}
				})
				console.log(item)
				this.money = item.money;
			},
			all() { //全部提现
				if (this.total_money == 0) {
					this.$Common.toast('您当前无余额')
					return
				}
				this.money = this.total_money
			},
			goPage() {
				var _self = this,
					pay_type = this.paytype;
				if (this.money <= 0) {
					uni.showToast({
						title: '请输入正确金额',
						icon: 'none'
					});
					return false;
				}
				const total_money = parseFloat(this.total_money)
				if (this.money > total_money) {
					uni.showToast({
						title: '余额不足',
						icon: 'none'
					});
					return false;
				}
				if(this.money<1){
					return this.$Common.toast('提现金额不能小于一元')
				}
				if (this.bind_account == 0) {
					this.$Common.toast('请先绑定提现账号')
					setTimeout(() => {
						uni.redirectTo({
							url: 'bind_alipay?type=' + this.account_type
						})
					}, 300)
					return false;
				}
				this.$Request.post(this.$api.money.chack_pay_pass).then(res => {
					if (res.code == 1) {
						uni.$emit('updateMoney')
						let withdrawInfo = {
							money: this.money,
							type: this.account_type
						}
						uni.setStorageSync('withdraw_money', withdrawInfo)
						if (res.data == 0) {
							uni.redirectTo({
								url: 'pay_pwd?type=setpwd'
							})
						} else {
							uni.redirectTo({
								url: 'pay_pwd'
							})
						}
					} else {
						this.$Common.toast(res.msg)
					}
				});
			},
		}
	};
</script>

<style lang="scss">
	page {
		background: #F6F7F9;
	}

	.box {
		padding: 32upx;
		border-radius: 24upx;
	}

	.input_box {
		font-size: 48upx;
		margin-top: 24upx;
		padding-bottom: 24upx;
		border-bottom: 1upx solid #EDEDED;
	}

	.cuIcon-roundcheckfill {
		font-size: 50upx;
	}

	.margin-top {
		margin-top: 20upx;
	}

	.active {
		color: #1B90FF;
	}

	.left_line {
		width: 8upx;
		background: #353A63;
		height: 32upx;
		margin-right: 24upx;
		border-radius: 4upx;
	}

	// .select_title{
	// 	border-left: 8upx solid #353A63;
	// }
	.pay_item {
		padding: 20upx 0;
		// border-bottom: 1upx solid #EDEDED;
	}

	.png {
		width: 48upx;
		height: 48upx;
		margin-right: 24upx;
	}

	.btn {
		background: #353A63;
		color: #FFFFFF;
		line-height: 88upx;
		border-radius: 44upx;
		text-align: center;
		width: 686upx;
		font-size: 32upx;
		font-weight: bold;
		position: absolute;
		bottom: 90upx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
